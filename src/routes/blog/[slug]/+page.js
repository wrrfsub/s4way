import { error } from '@sveltejs/kit'

export async function load({ params }) {
  try {
    const post = await import(`../../../posts/${params.slug}.md`)
    return { content: post.default, ...post.metadata }
  } catch {
    error(404, 'post not found')
  }
}
