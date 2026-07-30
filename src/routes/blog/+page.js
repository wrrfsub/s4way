export function load() {
  const modules = import.meta.glob('/src/posts/*.md', { eager: true })
  const posts = Object.entries(modules)
    .map(([path, m]) => ({
      slug: path.split('/').pop().replace('.md', ''),
      title: m.metadata.title,
      date: String(m.metadata.date).slice(0, 10),
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  return { posts }
}
