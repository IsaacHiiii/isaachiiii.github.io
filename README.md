# isaachiiii.github.io

My personal website: **[isaachiiii.github.io](https://isaachiiii.github.io)**

## Why I built it

I'm a second-year Biomedical Sciences student at Newcastle University Medicine Malaysia, slowly teaching myself data science. I wanted two things from this project:

1. **A link I can share** on my CV, LinkedIn and applications, so people can see what I study, what I've done and how to reach me.
2. **A first real build with an AI coding agent.** I'm using Claude Code to go through the whole process myself: planning, prompting, reviewing what the agent writes, fixing what breaks, and putting it online. The rule is that I have to be able to explain every file in this repo.

The full plan is in [docs/PRD.md](docs/PRD.md).

## What I learned

<!-- Add a line or two after each phase. -->

### Phase 0: planning and setup

- **Plan first, then question the plan.** Having my spec reviewed before writing any code caught gaps early, such as an accessibility issue and a step that would have meant doing the same work twice.
- **Choose tools for the goal.** I picked Astro over plain HTML because it keeps the content separate from the layout without hurting search or link previews.
- **Ship early.** I put a bare page online on day one, so hosting problems show up now rather than at the end.
- **A public repo is part of how I present myself.** I rewrote the README for the people who might read it, and checked what personal details Git and GitHub make public.
- **Understand, don't just accept.** I asked for plain-English comments in the code so I learn from reading it, not only from running it.

### Phase 1: building the layout

- **Check every screen size, not just mine.** A layout that looks right on a laptop can feel cramped on a phone. I used media queries to give each its own spacing and type sizes.
- **Small details decide whether a design feels right.** Tight letter spacing suits big headings but crowds small ones, and lines longer than about 75 characters are tiring to read.
- **Alignment makes a page feel calm.** I lined headings up with the text in their boxes and matched the boxes to the nav bar, so the edges run straight down the page.
- **When a style doesn't apply, find out why.** Two CSS rules were competing, and the later one won. Fixing it taught me how the cascade and specificity decide which rule applies.
- **Give specific feedback.** Screenshots with a clear "this looks off because…" got better results from the agent than general requests.

## How it's built

- [Astro](https://astro.build) builds the site into plain HTML
- Plain CSS in one stylesheet, `src/styles/global.css`, with the colours set once as design tokens. A separate set of rules handles phones
- Geist and Geist Mono fonts, bundled with the site rather than loaded from Google
- All the text lives in one file, `src/content.json`, so I can edit it without touching the layout
- Hosted on GitHub Pages, and every push to `main` goes live automatically

## Running it locally

You need [Node.js](https://nodejs.org) installed.

```sh
npm install      # install the tools, once
npm run dev      # preview at http://localhost:4321
npm run build    # build the final site into dist/
```
