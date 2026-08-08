import { getPosts } from '$lib/posts.js'

export function load() {
  return { posts: getPosts().slice(0, 3) }
}
