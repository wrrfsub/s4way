<script>
  let { data } = $props()
  const Content = $derived(data.content)
</script>

<svelte:head>
  <title>{data.title} · s4way</title>
</svelte:head>

<main class="mx-auto max-w-[65ch] px-4 py-16 font-sans">
  <a class="text-xs no-underline text-faint hover:text-accent" href="/blog/">← blog</a>
  <h1 class="mt-4 font-mono text-3xl font-bold tracking-tight">{data.title}</h1>
  <p class="mt-1 text-xs text-faint">{data.date}</p>
  <article class="post mt-6">
    <Content />
  </article>
</main>
