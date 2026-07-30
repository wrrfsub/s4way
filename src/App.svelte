<script>
  import { onMount } from 'svelte'

  const words = ['engineer', 'developer', 'server breaker', 'panel shipper', '3am batman']
  let text = $state('')

  const NAME = 's4way'
  const glyphs = '!<>-_\\/[]{}=+*^?#01'
  let name = $state(NAME)
  let scrambling = false

  function scramble() {
    if (scrambling) return
    scrambling = true
    let frame = 0
    const id = setInterval(() => {
      frame++
      name = NAME.split('')
        .map((c, idx) => (frame / 3 > idx ? c : glyphs[Math.floor(Math.random() * glyphs.length)]))
        .join('')
      if (frame / 3 >= NAME.length) {
        clearInterval(id)
        name = NAME
        scrambling = false
      }
    }, 45)
  }

  let visits = $state(null)
  fetch('https://abacus.jasoncameron.dev/hit/s4way-serveros/portfolio')
    .then((r) => r.json())
    .then((d) => (visits = d.value))
    .catch(() => {})

  let time = $state('')
  const clockFmt = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Kathmandu',
  })

  onMount(() => {
    scramble()
    time = clockFmt.format(new Date())
    const clock = setInterval(() => (time = clockFmt.format(new Date())), 10000)
    let i = 0, pos = 0, dir = 1, wait = 0
    const tick = setInterval(() => {
      if (wait > 0) { wait--; return }
      const word = words[i % words.length]
      pos += dir
      text = word.slice(0, pos)
      if (pos === word.length) { dir = -1; wait = 18 }
      else if (pos === 0) { dir = 1; i++; wait = 4 }
    }, 75)
    return () => { clearInterval(tick); clearInterval(clock) }
  })

  function shortcuts(e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return
    if (e.key === 'g') window.open('https://github.com/wrrfsub', '_blank')
    else if (e.key === 's') window.open('https://serveros.com/', '_blank')
    else if (e.key === 'e') location.href = 'mailto:subway@serveros.com'
  }
</script>

<svelte:window onkeydown={shortcuts} />

<main class="min-h-screen grid content-center justify-items-center gap-1.5 p-4 text-center font-sans">
  <p class="text-muted"><span class="inline-block animate-wave">👋</span> hi, my name is</p>
  <h1 class="name-shimmer cursor-default font-mono text-5xl font-bold tracking-tight" onmouseenter={scramble}>{name}</h1>
  <p class="text-soft">
    <span class="text-bright">{text}</span><span class="animate-blink inline-block h-[1em] w-0.5 translate-y-[2px] bg-accent"></span>
    at <a href="https://serveros.com/">serveros</a>
  </p>
  <p class="mt-4 max-w-[32ch] leading-relaxed text-muted">i build and break things on servers.</p>
  <section class="mt-7 max-w-[36ch]">
    <h2 class="mb-1.5 text-xs uppercase tracking-[0.15em] text-faint">what i do</h2>
    <p class="leading-relaxed text-soft">keep servers running, ship panels, and fix the things i broke.</p>
    <p class="mt-1 leading-relaxed text-soft">most days: writing code. some nights: fighting with ghost at 3am.</p>
  </section>
  <section class="mt-7 max-w-[36ch]">
    <h2 class="mb-1.5 text-xs uppercase tracking-[0.15em] text-faint">currently</h2>
    <p class="leading-relaxed text-soft">breaking prod panels at <a href="https://serveros.com/">serveros</a>, on purpose (mostly).</p>
  </section>
  <nav class="mt-6 flex gap-6">
    <a class="border-b border-accent/30 pb-0.5 no-underline hover:border-accent" href="https://github.com/wrrfsub">github</a>
    <a class="border-b border-accent/30 pb-0.5 no-underline hover:border-accent" href="https://serveros.com/">serveros</a>
    <a class="border-b border-accent/30 pb-0.5 no-underline hover:border-accent" href="mailto:subway@serveros.com">email</a>
  </nav>
  <footer class="mt-12 flex items-center gap-1.5 text-xs text-faint">
    <span class="h-2 w-2 rounded-full bg-[#7dd87d]"></span> probably online · kathmandu, nepal {time}{#if visits} · {visits} visits{/if} · © 2026 s4way
  </footer>
</main>
