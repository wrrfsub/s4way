---
title: pterodactyl vs calagopus
date: 2026-08-08
description: the panel everyone runs vs the rust newcomer with a 245k req/s benchmark. real numbers, real differences.
titleHtml: 'pterodactyl <img src="/tools/pterodactyl.svg" alt="" style="height:1.05em;width:1.05em;display:inline;vertical-align:-0.15em"> vs calagopus <img src="/tools/calagopus-logo.svg" alt="" style="height:1.05em;width:1.05em;display:inline;vertical-align:-0.15em">'
---

i babysit game panels for a living, so when people ask which panel to run, i actually have opinions. here is <a href="https://pterodactyl.io/">pterodactyl</a> vs <a href="https://calagopus.com/">calagopus</a>, with real numbers pulled from their official pages, docs and github.

## pterodactyl, the classic <img src="/tools/pterodactyl.svg" alt="pterodactyl logo" style="height:26px;display:inline;vertical-align:-5px;margin:0 0 0 6px" />

around since 2015. free, open source, mit licensed. the panel is php and react, the wings daemon is go, currently at version 1.14.1. every game server runs in its own isolated docker container, and security is decent out of the box with bcrypt hashing, aes-256 encryption and https.

the numbers show its weight: over 9,100 stars on github for the panel alone, and a decade of production use behind it. and it is a complete product, not just a pretty console:

- subusers with per permission access, 2fa, and separate client and application apis
- schedules, cron style tasks per server: restarts, commands, automatic backups
- backups to local disk or s3 compatible storage, and live server transfers between nodes
- database hosts so users get their own mysql databases from the panel
- eggs with variables and install scripts that run in throwaway install containers, so any linux game just works
- mounts for sharing data between servers

its real superpower is the ecosystem though. after ten years there is an egg, a theme, a blueprint addon or a forum answer for everything. most hosting companies you know run it or run a fork of it. pelican, one of the panels in the benchmark below, is literally a fork of pterodactyl started by its former maintainers. that is how big its shadow is.

## calagopus, the rust newcomer <img src="/tools/calagopus-logo.svg" alt="calagopus logo" style="height:30px;display:inline;vertical-align:-7px;margin:0 0 0 6px" />

open source panel where everything is rust: the panel, the wings daemon, even their discord bot. currently at 1.1.0, sitting around 500 stars on github, so it is young. but the feature list is not young at all:

- a real extension api built on rust traits: theming, events, custom routes, permissions, cli commands, background tasks, even email templates
- a separate db agent that manages mysql/mariadb, postgresql and mongodb database hosts
- oauth login with github, google and discord out of the box
- billing integrations for paymenter, whmcs and blesta, plus a vs code integration
- installs via docker, plain binary, package manager or even truenas scale, and wings can run under podman
- disk limiting with fusequota, btrfs subvolumes, zfs datasets or xfs quotas
- migration guides from pterodactyl and pelican, which tells you exactly who they are hunting

it also uses an egg system and docker isolation, so the mental model is the same if you come from pterodactyl.

## under the hood

this is where the difference actually comes from.

pterodactyl is a laravel app. php-fpm spins up the framework for every request, the frontend is react, data lives in mysql/mariadb with redis for cache and queues. it also needs a queue worker and a cron entry running every minute for schedules, which is very laravel. wings is a go daemon on each node that talks directly to the docker api: it runs the containers, streams the console over websockets, serves the file manager, runs its own sftp server on port 2022, and handles backups and node to node transfers. the panel talks to wings over https with signed jwt tokens. eggs are just json: a docker image, a startup command and some config file parsing rules.

calagopus is one compiled rust binary. no interpreter, no framework bootstrapping per request, just an async runtime that keeps everything hot. it stores data in postgresql instead of mysql, and runs two cache layers: a local in-memory cache with short ttl for hot data, and a redis style distributed cache for sessions and rate limiting. that second layer is what lets you run multiple panel backends behind a load balancer, horizontal scaling is an actual supported setup, not a hack. wings is rust too, and databases are managed by a separate db agent instead of living inside the panel.

that is the whole benchmark story in one sentence: php pays framework boot cost on every request, rust pays it once at startup. add rust's memory safety and no garbage collector pauses, and the latency graphs stop being surprising.

## the benchmark numbers

calagopus publishes benchmarks against five other panels, all running their official latest docker images on identical hardware. their own numbers, so salt accordingly, but at 8 cpus:

- peak throughput: calagopus 245,000 req/s, pufferpanel 177,000, featherpanel 1,431, pterodactyl 1,170, hydrodactyl 799, pelican 381
- average response: calagopus 1.6 ms, pufferpanel 2.2 ms, featherpanel 270 ms, pterodactyl 333 ms, pelican over a second
- peak memory: pufferpanel 77 mib, calagopus 92 mib, pterodactyl 148 mib, pelican 358 mib

that is roughly 200x the throughput of pterodactyl at a fraction of the response time, while using less ram. even if the real world number is half of that, it is not close. to be fair, nobody's panel is serving 245k requests per second, your bottleneck is the game servers themselves. but snappy is snappy.

## security, the real record

both panels run every game server in its own docker container. but marketing pages are one thing, the cve list is another, so i pulled pterodactyl's actual github security advisories. the panel has around 25 published advisories since 2019, wings has 13, and some of them were genuinely nasty:

- cve-2025-49132, critical: unauthenticated remote code execution on the panel. no login needed. this one had every host scrambling to patch the same night
- cve-2023-32080, critical: escape to the host from the installation container
- cve-2023-25168, critical: wings could be tricked into deleting files and directories on the host
- cve-2024-27102, critical: symlink race in the server filesystem, and cve-2024-34066, arbitrary file read/write in wings
- cve-2026-52855, critical: wings leaking node configuration secrets through egg config templating
- cve-2024-49762: the panel logged user passwords in plain text when 2fa was off
- plus a recurring theme of sftp lifecycle bugs: sessions staying alive after account deletion, access not revoked when a server is deleted

to be fair, that is what a decade in production with thousands of hosts and researchers poking at it looks like. they got reported, they got patched. but notice the pattern in the wings ones: almost every critical is some variation of "the root daemon got tricked into touching the host". symlinks, install containers, path resolution, over and over.

that pattern is exactly what calagopus's security model is built against. their docs publish an actual threat model: a game server is untrusted code, and wings must never be coerced outside a server's own directory even by an authenticated user. every container gets no-new-privileges, eleven dropped linux capabilities, an in kernel seccomp profile, a read only root filesystem with a nosuid /tmp, and cgroup limits on memory, cpu, pids and io, so a fork bomb dies at the kernel. user namespace remapping and full rootless mode are there if you want wings itself off root. the point their docs make: all of it is enforced by the kernel, not by wings code, so it holds even if a server is fully compromised.

calagopus currently has zero published advisories. before you call it the safe one, remember it is version 1.1 and barely anyone has attacked it yet. an empty cve list on a young project means unaudited, not invincible. the honest read: pterodactyl has scars and patches, calagopus has a better blueprint and no battle history.

## the actual differences

- stack: php + react + go vs rust everywhere
- age: a decade of production use vs version 1.1
- community: 9,100+ stars and endless forum history vs about 500 stars and a growing discord
- speed: benchmarked at ~200x throughput and 1.6 ms responses, per calagopus's own tests
- extensions: pterodactyl addons usually patch the panel source, calagopus has a proper extension api
- extras: calagopus ships db agent, oauth and billing integrations built in, pterodactyl leaves that to the ecosystem

## verdict

if you already run servers for actual customers on pterodactyl, it is still a safe place to be. but be honest about why: it is safe because it is old and everyone uses it, not because it is better. the docs and the decade of forum answers are the whole advantage.

otherwise calagopus is just the better panel. faster, lighter, extension api instead of source patches, db agent, oauth and billing built in. if you are starting a host today, i would go calagopus without thinking twice.

personally? i like calagopus nowadays. once you feel a panel respond in 1.6 ms, going back is hard.

me? i break both, professionally.
