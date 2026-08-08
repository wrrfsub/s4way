const modules = import.meta.glob('/src/posts/*.md', { eager: true })
const sources = import.meta.glob('/src/posts/*.md', { eager: true, query: '?raw', import: 'default' })

function niceDate(iso) {
  return new Date(`${iso}T00:00:00`)
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .toLowerCase()
}

export function getPosts() {
  return Object.entries(modules)
    .map(([path, m]) => {
      const date = String(m.metadata.date).slice(0, 10)
      const words = (sources[path] ?? '').split(/\s+/).length
      return {
        slug: path.split('/').pop().replace('.md', ''),
        title: m.metadata.title,
        date,
        dateNice: niceDate(date),
        minutes: Math.max(1, Math.round(words / 200)),
        description: m.metadata.description ?? '',
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}
