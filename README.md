# isaachiiii.github.io

My personal website: **[isaachiiii.github.io](https://isaachiiii.github.io)**

## Why I built it

I'm a second-year Biomedical Sciences student at Newcastle University Medicine Malaysia, slowly teaching myself data science. I wanted two things from this project:

1. **A link I can share** on my CV, LinkedIn and applications, so people can see what I study, what I've done and how to reach me.
2. **A first real build with an AI coding agent.** I'm using Claude Code to go through the whole process myself: planning, prompting, reviewing what the agent writes, fixing what breaks, and putting it online. The rule is that I have to be able to explain every file in this repo.

The full plan is in [docs/PRD.md](docs/PRD.md).

## What I learned

<!-- Add a line or two after each phase. -->

- *Phase 0:*

## How it's built

- [Astro](https://astro.build) builds the site into plain HTML
- Plain CSS, monochrome design with small terminal touches
- All the text lives in one file, `src/content.json`, so I can edit it without touching the layout
- Hosted on GitHub Pages, and every push to `main` goes live automatically

## Running it locally

You need [Node.js](https://nodejs.org) installed.

```sh
npm install      # install the tools, once
npm run dev      # preview at http://localhost:4321
npm run build    # build the final site into dist/
```
