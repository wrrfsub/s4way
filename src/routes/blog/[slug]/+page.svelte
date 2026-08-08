<script>
  let { data } = $props()
  const Content = $derived(data.content)
</script>

<svelte:head>
  <title>{data.title} · s4way</title>
  <meta name="description" content={data.description} />
</svelte:head>

<main class="pb-16">
  <a class="text-xs text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white" href="/blog/">← blog</a>
  <h1 class="mt-4 text-2xl font-semibold tracking-tight">{data.title}</h1>
  <p class="mt-1.5 text-xs text-neutral-400 dark:text-neutral-500">{data.dateNice} · {data.minutes} min read</p>
  <article class="post mt-6">
    <Content />
  </article>

  {#if data.older || data.newer}
    <nav class="mt-12 flex justify-between gap-4 border-t border-black/5 pt-6 text-sm dark:border-white/5">
      <div>
        {#if data.older}
          <a class="group block" href={`/blog/${data.older.slug}/`}>
            <span class="text-xs text-neutral-400 dark:text-neutral-500">← older</span>
            <span class="mt-0.5 block font-medium group-hover:underline group-hover:underline-offset-2">{data.older.title}</span>
          </a>
        {/if}
      </div>
      <div class="text-right">
        {#if data.newer}
          <a class="group block" href={`/blog/${data.newer.slug}/`}>
            <span class="text-xs text-neutral-400 dark:text-neutral-500">newer →</span>
            <span class="mt-0.5 block font-medium group-hover:underline group-hover:underline-offset-2">{data.newer.title}</span>
          </a>
        {/if}
      </div>
    </nav>
  {/if}
</main>
