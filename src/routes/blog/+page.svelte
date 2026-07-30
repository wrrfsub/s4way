<script>
  let { data } = $props()
</script>

<svelte:head>
  <title>blog · s4way</title>
</svelte:head>

<main class="min-h-screen grid content-center justify-items-center gap-1.5 p-4 text-center font-sans">
  <h1 class="name-shimmer font-mono text-4xl font-bold tracking-tight">blog</h1>
  {#if data.posts.length}
    <ul class="mt-4">
      {#each data.posts as post}
        <li class="mt-2">
          <a class="no-underline border-b border-accent/30 pb-0.5 hover:border-accent" href={`/blog/${post.slug}/`}>{post.title}</a>
          <span class="ml-2 text-xs text-faint">{post.date}</span>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="mt-2 max-w-[36ch] leading-relaxed text-muted">nothing here yet. i'm busy breaking prod.</p>
  {/if}
  <nav class="mt-6">
    <a class="border-b border-accent/30 pb-0.5 no-underline hover:border-accent" href="/">← back home</a>
  </nav>
</main>
