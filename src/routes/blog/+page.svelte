<script>
  let { data } = $props()
</script>

<svelte:head>
  <title>blog · s4way</title>
</svelte:head>

<main class="pb-16">
  <h1 class="py-6 text-2xl font-semibold tracking-tight">blog</h1>
  {#if data.posts.length}
    <div>
      {#each data.posts as post}
        <a href={`/blog/${post.slug}/`} class="group -mx-3 block rounded-lg px-3 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-900/60">
          <div class="flex items-baseline justify-between gap-4">
            <p class="font-medium group-hover:underline group-hover:underline-offset-2">{post.title}</p>
            <span class="shrink-0 text-xs text-neutral-400 dark:text-neutral-500">{post.dateNice} · {post.minutes} min</span>
          </div>
          {#if post.description}
            <p class="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">{post.description}</p>
          {/if}
        </a>
      {/each}
    </div>
  {:else}
    <p class="text-neutral-600 dark:text-neutral-400">nothing here yet. i'm busy breaking prod.</p>
  {/if}
</main>
