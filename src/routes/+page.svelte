<script>
  import { onMount } from 'svelte'

  let { data } = $props()
  let showAllJobs = $state(false)

  let visits = $state(null)
  let time = $state('')
  const clockFmt = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Kathmandu',
  })

  onMount(() => {
    time = clockFmt.format(new Date())
    const clock = setInterval(() => (time = clockFmt.format(new Date())), 10000)
    fetch('https://abacus.jasoncameron.dev/hit/s4way-serveros/portfolio')
      .then((r) => r.json())
      .then((d) => (visits = d.value))
      .catch(() => {})
    return () => clearInterval(clock)
  })

  let denied = $state(false)
  let typed = ''

  function shortcuts(e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return
    if (e.key.length === 1) {
      typed = (typed + e.key).slice(-10)
      if (typed.endsWith('rm -rf')) {
        denied = true
        setTimeout(() => (denied = false), 3000)
        return
      }
    }
    if (e.key === 'g') window.open('https://github.com/wrrfsub', '_blank')
    else if (e.key === 's') window.open('https://serveros.com/', '_blank')
    else if (e.key === 'd') window.open('https://discord.com/users/1338099754080665651', '_blank')
    else if (e.key === 'e') location.href = 'mailto:saktirimala@gmail.com'
  }

  function onVisibility() {
    document.title = document.hidden ? 'come back 👀' : 's4way'
  }

  const jobs = [
    {
      role: 'junior software engineer & support',
      company: 'serveros',
      url: 'https://serveros.com/',
      period: '08/2026 – present',
      points: [
        'build and maintain custom features for the game server management panel, across the interface and the systems behind it.',
        'hands-on support: troubleshooting, walking users through setup, resolving technical queries.',
        'work with the engineering team on platform features, feeding recurring user problems back into what gets prioritised and fixed.',
      ],
    },
    {
      role: 'admin & support',
      company: 'mcsets',
      period: '12/2025 – 06/2026',
      points: [
        'guided users through store setup, resolving configuration problems and questions along the way.',
        'managed user accounts and day-to-day admin tasks across the platform.',
        'identified friction in existing processes and proposed workflow improvements to cut repeat support requests.',
      ],
    },
    {
      role: 'founder & freelance developer',
      company: 'subwaystudios',
      period: '02/2024 – present',
      points: [
        'founded and run a small freelance studio delivering custom development work for clients.',
        'handle projects independently from first brief through build, delivery, and after-launch support.',
        'single point of contact for clients throughout.',
      ],
    },
  ]

  const tools = [
    { group: 'development', items: [
      { name: 'laravel', icon: '/tools/laravel.svg', url: 'https://laravel.com' },
      { name: 'react', icon: '/tools/react.svg', url: 'https://react.dev' },
      { name: 'svelte', icon: '/tools/svelte.svg', url: 'https://svelte.dev' },
      { name: 'tailwind css', icon: '/tools/tailwindcss.svg', url: 'https://tailwindcss.com' },
    ]},
    { group: 'infrastructure', items: [
      { name: 'docker', icon: '/tools/docker.svg', url: 'https://www.docker.com' },
      { name: 'mysql', icon: '/tools/mysql.svg', url: 'https://www.mysql.com' },
      { name: 'cloudflare', icon: '/tools/cloudflare.svg', url: 'https://www.cloudflare.com' },
      { name: 'linux', icon: '/tools/linux.svg', url: 'https://kernel.org' },
      { name: 'vercel', icon: '/tools/vercel.svg', invert: true, url: 'https://vercel.com' },
    ]},
    { group: 'game servers', items: [
      { name: 'pterodactyl', icon: '/tools/pterodactyl.svg', url: 'https://pterodactyl.io' },
      { name: 'serveros', icon: '/tools/serveros.png', zoom: true, url: 'https://serveros.com' },
    ]},
    { group: 'editor & terminal', items: [
      { name: 'zed', icon: '/tools/zedindustries.svg', url: 'https://zed.dev' },
      { name: 'zsh', icon: '/tools/zsh.svg', url: 'https://www.zsh.org' },
    ]},
    { group: 'os', items: [
      { name: 'cachyos', icon: '/tools/cachyos.svg', url: 'https://cachyos.org' },
      { name: 'kde plasma', icon: '/tools/kde.svg', url: 'https://kde.org/plasma-desktop' },
    ]},
    { group: 'daily drivers', items: [
      { name: 'discord', icon: '/tools/discord.svg', url: 'https://discord.com' },
      { name: 'github', icon: '/tools/github.svg', invert: true, url: 'https://github.com' },
      { name: 'claude', icon: '/tools/claude.svg', url: 'https://claude.ai' },
    ]},
  ]
</script>

<svelte:window onkeydown={shortcuts} />
<svelte:document onvisibilitychange={onVisibility} />

<main class="pb-16">
  <section class="py-10">
    <img src="/img/s4way.webp" alt="s4way" class="h-16 w-16 rounded-full" />
    <h1 class="mt-5 text-2xl font-semibold tracking-tight">s4way</h1>
    <p class="mt-2 leading-7 text-neutral-600 dark:text-neutral-400">
      engineer (developer) at
      <a class="inline-flex items-baseline gap-1 font-medium text-neutral-900 underline underline-offset-2 dark:text-white" href="https://serveros.com/">
        <img src="/tools/serveros.png" alt="" class="h-4 w-4 scale-150 self-center" />serveros</a>.
      i build and break things on servers.
    </p>
    <p class="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
      support focused developer. i work directly with users, diagnose issues, and ship custom features
      with react, node.js, and laravel. i like turning recurring problems into workflow fixes that last.
    </p>
    <p class="mt-1 text-sm text-neutral-500 dark:text-neutral-500">
      off the clock: doomscrolling, discord, and zed.
    </p>
    <p class="mt-4 leading-7 text-neutral-600 dark:text-neutral-400">
      you can find me on
      <a class="inline-flex items-baseline gap-1 font-medium text-neutral-900 underline underline-offset-2 dark:text-white" href="https://github.com/wrrfsub">
        <img src="/tools/github.svg" alt="" class="h-4 w-4 self-center dark:invert" />github</a>
      and
      <a class="inline-flex items-baseline gap-1 font-medium text-neutral-900 underline underline-offset-2 dark:text-white" href="https://discord.com/users/1338099754080665651">
        <img src="/tools/discord.svg" alt="" class="h-4 w-4 self-center" />discord</a>,
      or reach me by
      <a class="font-medium text-neutral-900 underline underline-offset-2 dark:text-white" href="mailto:saktirimala@gmail.com">email</a>.
    </p>
  </section>

  <section class="py-8">
    <h2 class="text-sm font-medium text-neutral-400 dark:text-neutral-500">experience</h2>
    <div class="relative mt-4">
      <div class="space-y-8 {showAllJobs ? '' : 'max-h-80 overflow-hidden'}">
      {#each jobs as job}
        <div>
          <div class="flex items-baseline justify-between gap-4">
            <p class="font-medium">{job.role}</p>
            <span class="shrink-0 text-xs text-neutral-400 dark:text-neutral-500">{job.period}</span>
          </div>
          <p class="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
            {#if job.url}<a class="hover:underline" href={job.url}>{job.company}</a>{:else}{job.company}{/if} · remote
          </p>
          <ul class="mt-2 list-disc space-y-1 pl-4 text-sm leading-6 text-neutral-600 marker:text-neutral-300 dark:text-neutral-400 dark:marker:text-neutral-700">
            {#each job.points as point}
              <li>{point}</li>
            {/each}
          </ul>
        </div>
      {/each}
      </div>
      {#if !showAllJobs}
        <div class="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/60 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black,transparent)] dark:from-[#0d0d0d] dark:via-[#0d0d0d]/60"></div>
      {/if}
    </div>
    <div class="mt-3 flex justify-center">
      <button
        onclick={() => (showAllJobs = !showAllJobs)}
        class="text-sm text-blue-500 hover:underline"
      >
        {showAllJobs ? 'view less' : 'view more'}
      </button>
    </div>
  </section>

  <section class="py-8">
    <h2 class="text-sm font-medium text-neutral-400 dark:text-neutral-500">tools</h2>
    <div class="mt-4 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      {#each tools as t}
        <div>
          <p class="text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500">{t.group}</p>
          <ul class="mt-2 space-y-1">
            {#each t.items as item}
              <li>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  class="flex items-center gap-2.5 py-1 text-sm text-neutral-700 hover:text-neutral-900 hover:underline dark:text-neutral-300 dark:hover:text-white"
                >
                  <img src={item.icon} alt="" class="h-4 w-4 {item.invert ? 'dark:invert' : ''} {item.zoom ? 'scale-125' : ''}" loading="lazy" />
                  {item.name}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </section>

  <section class="py-8">
    <h2 class="text-sm font-medium text-neutral-400 dark:text-neutral-500">blog</h2>
    <div class="mt-2">
      {#each data.posts as post}
        <a href={`/blog/${post.slug}/`} class="group -mx-3 block rounded-lg px-3 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-900/60">
          <div class="flex items-baseline justify-between gap-4">
            <p class="font-medium group-hover:underline group-hover:underline-offset-2">{post.title}</p>
            <span class="shrink-0 text-xs text-neutral-400 dark:text-neutral-500">{post.dateNice}</span>
          </div>
          {#if post.description}
            <p class="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">{post.description}</p>
          {/if}
        </a>
      {/each}
    </div>
    <a href="/blog/" class="mt-3 inline-block text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">all posts →</a>
  </section>

  {#if denied}
    <div class="fixed bottom-10 left-1/2 -translate-x-1/2 rounded-lg border border-red-400/40 bg-white px-4 py-2 font-mono text-xs text-red-500 shadow-sm dark:bg-neutral-900">
      rm: cannot remove '/': permission denied. nice try.
    </div>
  {/if}

  <footer class="border-t border-black/5 pt-6 text-xs text-neutral-400 dark:border-white/5 dark:text-neutral-500">
    chitwan, nepal · {time}{#if visits} · {visits} visits{/if} · © 2026
    <a href="/Shakti_Rimal_Resume.pdf" target="_blank" class="hover:text-neutral-900 hover:underline dark:hover:text-white">s4way</a>
  </footer>
</main>
