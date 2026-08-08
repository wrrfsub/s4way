<script>
  import '@fontsource-variable/inter'
  import '../style.css'
  import { onMount } from 'svelte'
  import { injectAnalytics } from '@vercel/analytics/sveltekit'

  injectAnalytics()

  let { children } = $props()
  let dark = $state(false)

  onMount(() => {
    dark = document.documentElement.classList.contains('dark')

    const barks = ['woof!', 'bork!', 'grrr', 'awoo!', '...🦴?']
    function onClick(e) {
      const dog = document.getElementById('oneko')
      if (!dog) return
      // oneko has pointer-events: none, so hit-test by distance instead
      const dx = e.clientX - (dog.offsetLeft + 16)
      const dy = e.clientY - (dog.offsetTop + 16)
      if (dx * dx + dy * dy > 32 * 32) return
      const bark = document.createElement('span')
      bark.className = 'bark'
      bark.textContent = barks[Math.floor(Math.random() * barks.length)]
      bark.style.left = `${dog.offsetLeft + 8}px`
      bark.style.top = `${dog.offsetTop - 24}px`
      document.body.appendChild(bark)
      setTimeout(() => bark.remove(), 900)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  })

  function toggleTheme(e) {
    const run = () => {
      dark = document.documentElement.classList.toggle('dark')
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    }
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduced) return run()
    const x = e.clientX
    const y = e.clientY
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    document.startViewTransition(run).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 450, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
      )
    })
  }
</script>

<div class="mx-auto max-w-xl px-6 font-sans">
  <header class="flex items-center justify-between py-8">
    <a href="/" class="font-semibold">s4way</a>
    <nav class="flex items-center gap-5 text-sm text-neutral-500 dark:text-neutral-400">
      <a class="hover:text-neutral-900 dark:hover:text-white" href="/blog/">blog</a>
      <a class="hover:text-neutral-900 dark:hover:text-white" href="https://github.com/wrrfsub">github</a>
      <a class="hover:text-neutral-900 dark:hover:text-white" href="https://discord.com/users/1338099754080665651">discord</a>
      <a class="hover:text-neutral-900 dark:hover:text-white" href="/Shakti_Rimal_Resume.pdf" target="_blank">resume</a>
      <button
        onclick={toggleTheme}
        aria-label="Toggle theme"
        class="flex h-8 w-8 items-center justify-center rounded-full border border-black/5 bg-neutral-100 text-neutral-500 hover:text-neutral-900 dark:border-white/5 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:text-white"
      >
        {#if dark}
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.3 11.3 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.3-11.3 1.4-1.4" />
          </svg>
        {:else}
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          </svg>
        {/if}
      </button>
    </nav>
  </header>

  {@render children()}
</div>
