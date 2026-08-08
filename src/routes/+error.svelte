<script>
  import { page } from '$app/state'
</script>

<svelte:head>
  <title>{page.status} · s4way</title>
</svelte:head>

<main class="flex min-h-[70vh] flex-col items-center justify-center pb-16 text-center">
  <p class="glitch font-mono text-8xl font-bold tracking-tight" data-text={page.status}>{page.status}</p>
  {#if page.status === 404}
    <img
      src="/404.gif"
      alt="confused john travolta looking around an empty room"
      class="mt-8 w-full max-w-md rounded-xl border border-black/5 dark:border-white/10"
    />
    <p class="mt-4 font-mono text-sm text-neutral-500 dark:text-neutral-400">looking for the page? so is he.</p>
  {:else}
    <p class="mt-4 font-mono text-sm text-neutral-500 dark:text-neutral-400">something broke. probably my fault.</p>
  {/if}
  <a href="/" class="mt-8 text-sm text-neutral-500 underline underline-offset-2 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">← back home</a>
</main>
