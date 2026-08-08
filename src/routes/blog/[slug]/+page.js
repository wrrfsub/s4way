import { error } from '@sveltejs/kit'
import { getPosts } from '$lib/posts.js'

export async function load({ params }) {
  const posts = getPosts()
  const i = posts.findIndex((p) => p.slug === params.slug)
  if (i === -1) error(404, 'post not found')
  try {
    const mod = await import(`../../../posts/${params.slug}.md`)
    return {
      content: mod.default,
      ...posts[i],
      newer: posts[i - 1] ?? null,
      older: posts[i + 1] ?? null,
    }
  } catch {
    error(404, 'post not found')
  }
}
