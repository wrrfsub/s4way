export function load() {
  const modules = import.meta.glob('/src/posts/*.md', { eager: true })
  const posts = Object.entries(modules)
    .map(([path, m]) => ({
      slug: path.split('/').pop().replace('.md', ''),
      title: m.metadata.title,
      date: m.metadata.date,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  return { posts }
}
