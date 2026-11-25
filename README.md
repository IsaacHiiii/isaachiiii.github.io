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
- **Small details decide whether a design feels right.** Letter spacing, line length and alignment all mattered. Lining the boxes up with the nav bar, and the headings with the text inside them, made the page feel calm.
- **When a style doesn't apply, find out why.** Two CSS rules were competing, and the later one won. Fixing it taught me how the cascade and specificity decide which rule applies.
- **Try it, then decide.** Some ideas only showed they didn't fit once I saw them on the page. Because the text lives in one file, trying something and undoing it cost very little. Screenshots with a clear "this looks off because…" got the best results from the agent.

### Phase 2: animations

- **Decide where the work happens.** The letter grid is made once when the site is built, so visitors download finished HTML. Only the glitches, which really do change over time, need a script in the browser.
- **The spec can change when the result says so.** A grid filling the whole screen felt too heavy once I saw it, so I switched to random patches. I updated the PRD as well, so the plan still describes what the site actually does.
- **Motion is optional, and that's a design choice too.** Every effect checks the "reduce motion" setting. The background stays visible, because it doesn't move, while anything that flickers switches off.
- **What looks right on screen isn't always what a screen reader hears.** The glitch copies of my name are hidden from screen readers, so VoiceOver reads my name once, not three times.
- **The dev server isn't the live site.** One animation worked in development but was silently removed when the site was built for production. Testing the real build caught it before it went live.

### Phase 3: components

- **Pulling something out makes it easier to judge.** Once the button was a single component, the arrow icons stood out, and I saw they didn't fit the calm look. I removed them everywhere with one change.
- **Not everything needs to be a component.** The heading with my name and the one-off rows stayed as plain HTML. A component only helps where the same pattern really repeats.
- **A rule only works if it has no exceptions.** The button labels were still written in the layout code, which went against my rule that all wording lives in one file. Moving them changed nothing on screen, but it means I always know where to look.
- **"It looks the same" can be proven.** After each change I compared the built page with the version before it. Matching HTML was stronger evidence than looking at it by eye.

## How it's built

- [Astro](https://astro.build) builds the site into plain HTML
- Plain CSS in one stylesheet, `src/styles/global.css`, with the colours set once as design tokens. A separate set of rules handles phones
- Geist and Geist Mono fonts, bundled with the site rather than loaded from Google
- All the text lives in one file, `src/content.json`, so I can edit it without touching the layout
- The parts that repeat are components in `src/components/`: `Button`, `Heading` (the two-tone section headings), `Card` (the black boxes) and `Entry` (a label, a title and a detail). The page itself, `src/pages/index.astro`, puts them together
- Animations:
  - The background of A, C, G and T letters, shown in random patches, is generated when the site is built.
  - The name glitch and the blinking cursor are plain CSS.
  - One small script, `src/scripts/atgc-glitches.js`, adds the flickering background glitches.
  - All the motion switches off when a visitor has "reduce motion" turned on.
- Hosted on GitHub Pages, and every push to `main` goes live automatically

## Running it locally

You need [Node.js](https://nodejs.org) installed.

```sh
npm install      # install the tools, once
npm run dev      # preview at http://localhost:4321
npm run build    # build the final site into dist/
```
