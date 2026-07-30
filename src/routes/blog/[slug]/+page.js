import { error } from '@sveltejs/kit'

export async function load({ params }) {
  try {
    const post = await import(`../../../posts/${params.slug}.md`)
    return { content: post.default, ...post.metadata, date: String(post.metadata.date).slice(0, 10) }
  } catch {
    error(404, 'post not found')
  }
}
