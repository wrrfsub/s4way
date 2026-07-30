# s4way

my personal portfolio page. sveltekit + tailwind, fully static.

## run

```bash
npm install
npm run dev
```

dev server runs at http://localhost:5173

## build

```bash
npm run build     # static site output in build/
npm run preview   # serve the build locally
```

## writing a blog post

drop a markdown file in `src/posts/`, e.g. `src/posts/my-post.md`:

```md
---
title: my post
date: 2026-08-01
---

post content in markdown.
```

it shows up on /blog automatically at /blog/my-post/. that's it.

## editing

- text/sections/links: `src/routes/+page.svelte`
- typewriter words: the `words` array at the top of the same file
- usage bar numbers: bar widths + legend in the same file
- colors: `tailwind.config.js`
