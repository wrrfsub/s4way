---
title: why i shifted to cachyos from windows
date: 2026-07-30
---

i finally dumped windows and moved to [cachyos](https://cachyos.org/). should have done it years ago.

## windows is bloated

fresh install and there's already copilot, onedrive, xbox stuff, widgets and ads in the start menu. i didn't ask for any of it. the os is busy doing its own things instead of mine.

## the ram situation

windows eats 4-5gb of ram doing literally nothing. cachyos sits under 1gb after boot. same laptop, feels like a new one.

## it just sucks

updates reboot whenever they want. settings are split across two menus since forever. everything nags you. i was tired.

## the real reason: dev environment

this is the big one. on windows every dev setup is a fight. wsl, path issues, slow file io, tools that half work.

on cachyos:

```bash
sudo pacman -S nodejs npm
```

that's it. real terminal, real package manager, everything native. my servers run linux anyway, so now my laptop and prod speak the same language. setup that took a whole evening on windows takes minutes here.

## verdict

fast, arch based, leaves me alone. not going back.
