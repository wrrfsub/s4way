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
npm run build
```

## writing a blog post

drop a markdown file in `src/posts/`, e.g. `src/posts/my-post.md`:

```md
---
title: my post
date: 2026-08-01
description: one line shown in the post list.
---

post content in markdown.
```

it shows up on /blog automatically at /blog/my-post/. that's it.

## editing

- text/sections/links: `src/routes/+page.svelte`
- experience + tools lists: the `jobs` and `tools` arrays in the same file
- tool icons: `static/tools/`
- header/nav/theme toggle: `src/routes/+layout.svelte`
