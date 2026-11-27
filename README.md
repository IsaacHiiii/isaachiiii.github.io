# isaachiiii.github.io

My personal website: **[isaachiiii.github.io](https://isaachiiii.github.io)**

## Why I built it

I'm a second-year Biomedical Sciences student at Newcastle University Medicine Malaysia, slowly teaching myself data science. I wanted two things from this project:

1. **A link I can share** on my CV, LinkedIn and applications, so people can see what I study, what I've done and how to reach me.
2. **A first real build with an AI coding agent.** I'm using Claude Code to go through the whole process myself: planning, prompting, reviewing what the agent writes, fixing what breaks, and putting it online. The rule is that I have to be able to explain every file in this repo.

The full plan is in [docs/PRD.md](docs/PRD.md).

## How it came together

**1. Plan before code.** I started with a written spec ([docs/PRD.md](docs/PRD.md)): who the site is for, the exact copy, the design tokens and a build plan in phases. I had it reviewed before any code existed, and I kept it up to date as the site changed, so it always describes what the site really does.

**2. Live from day one.** Phase 0 was a bare Astro page deployed to GitHub Pages. Every push to `main` has gone live automatically since then, so hosting was never a last-minute surprise.

**3. Layout, then motion, then structure (Phases 1–3).** Phase 1 built the whole page from one content file, checked on phone and laptop side by side. Phase 2 added the motion: a DNA letter background generated at build time, flickering glitches, a glitching name and a blinking cursor, all of which switch off for visitors who ask for reduced motion. Phase 3 turned the repeated parts into components without changing a single pixel, which I checked by comparing the built HTML before and after.

**4. Redesigning the hero.** After Phase 3, I wanted the first screen to feel special without losing the calm design. I tried it on a separate branch first, so the live site stayed safe while I explored. I made a bigger, gradient title, letters that appear around the cursor, buttons that react, and sections that slide in. My first attempt at an intro became a separate cover page, which wasn't what I meant, so I threw it away. Showing the agent a reference site I liked fixed the misunderstanding at once. That led to the centrepiece: a 3D DNA helix drawn on a canvas, running through my name, which untwists and dissolves into the background as you scroll.

**5. Making it feel right.** This took the most rounds. Holding the scene in place while scrolling looked good but felt sticky, especially on a phone. I kept it on laptops and dropped it on phones, and I moved the fades onto CSS scroll-driven animations so they move exactly with the scroll. A short glide now finishes the opening if you stop halfway, and it always follows the direction you were scrolling. Several bugs only showed up with real scrolling, not in screenshots, so I started testing with real mouse-wheel input.

**6. Content and polish.** Then I cut what didn't earn its place: the tagline under my name, the CV download, an extra fact and the arrow icons. The links became quiet icon buttons with a small label that pops up on hover. My email is put together in the browser, so it never appears in the page's HTML for scrapers to find. I also gave every section more room to breathe.

**7. Checking the real thing (Phase 4).** Finally I checked the live site, not just my laptop's copy: automated checks for every file, screen size and link, then my own laptop and phone for how it feels, with reduce motion and VoiceOver turned on.

**8. Ready to share (Phase 5).** A Lighthouse audit showed the site was already fast and accessible, so I fixed the one gap it found and focused on how the link looks when shared: a preview card made from the real hero, a small helix tab icon and a clear description for search results.

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

### Redesigning the hero (between Phases 3 and 4)

- **A reference beats a description.** I described the effect I wanted in my own words and got a cover page I didn't want. Sharing a site I liked made the idea clear in seconds. Now I start with an example and say which part of it I'm after.
- **Knowing the names helps.** Terms like scroll pinning, scroll-linked animation and mouse parallax let me ask for exactly what I mean.
- **Inspired by, not copied.** I took the technique from a site I admired (a living visual that changes as you scroll) and made it my own: a DNA helix that dissolves into the background my site already had.
- **A branch makes experiments safe.** All of this was built on a separate branch, so I could try bold ideas, throw one away completely, and leave the live site untouched until I was sure.
- **Feel matters as much as looks.** How long the scroll lasts and when the next section arrives changed how the page felt more than any colour or size did.

### Making it feel right

- **How it feels decides it, not how it looks in a screenshot.** The pinned scroll looked right in every screenshot and still felt sticky in my hand. I judged by using it on my laptop and my phone.
- **The same idea doesn't suit every device.** Pinning the scene worked with a trackpad but fought a finger on a phone, so each gets its own behaviour.
- **Test the way people really use it.** Jumping straight to a scroll position passed every check. Real wheel scrolling found the glide fighting itself. Interrupting it halfway, in both directions, found the rest.
- **Simpler often wins.** Several fixes removed code: no pinning on phones, no CSS snapping, no CV button. The site got better and smaller at the same time.
- **Privacy is a design decision too.** My email works with one click but never sits in the page for bots to collect.

### Phase 4: checking the live site

- **"It works on my laptop" isn't the finish line.** The live site is a separate copy, built and hosted elsewhere. I confirmed it matched my latest build exactly before trusting it.
- **Split the checking between machine and person.** Automated checks covered what's tedious to do by hand: every file loading, no sideways scrolling at five screen sizes, the email never appearing in the page. I kept for myself what only a real device can tell: how scrolling feels, whether links open the right app, and what a screen reader says.
- **A failed check isn't always a failure.** LinkedIn refused the automated link check because it blocks bots, so I confirmed that link by hand instead.
- **Test the settings other people use.** I turned on reduce motion and VoiceOver and opened the site in a second browser, because the people visiting won't all browse the way I do.

### Phase 5: polish

- **Measure before you fix.** I ran a Lighthouse audit before changing anything. The site already scored 100 almost everywhere, so instead of optimising what was fine, I fixed the one real gap: a missing robots.txt.
- **The share preview is the first impression.** Most people will meet the site as a link in a message, so I gave it a proper preview card. I made it from a picture of the real hero, so the preview and the site look the same.
- **Small sizes need simple shapes.** The tab icon is a few strokes of a double helix. My name in a fancy font would have been unreadable at 16 pixels.
- **Some checks only I can tick.** The automated checks confirm the site works. Whether every line is accurate, and whether I can explain each file, is mine to answer.

## How it's built

- [Astro](https://astro.build) builds the site into plain HTML
- Plain CSS in one stylesheet, `src/styles/global.css`, with the colours set once as design tokens. A separate set of rules handles phones
- Geist and Geist Mono fonts, bundled with the site rather than loaded from Google
- All the text lives in one file, `src/content.json`, so I can edit it without touching the layout. [docs/EDITING.md](docs/EDITING.md) explains how to change text, add items and publish
- The parts that repeat are components in `src/components/`: `Button`, `Heading` (the two-tone section headings), `Card` (the black boxes), `Entry` (a label, a title and a detail, used for experience, hackathons and projects) and `SocialLinks` (the Instagram, LinkedIn, GitHub and email icon buttons, with Phosphor icons in `src/icons/`). The page itself, `src/pages/index.astro`, puts them together
- My email address is never written in the page's HTML, so spam bots can't scrape it. `src/scripts/email.js` joins it from two scrambled pieces in the visitor's browser and fills in the mail links
- Animations:
  - The hero's centrepiece is a 3D DNA double helix of A, C, G and T letters, drawn on a canvas by `src/scripts/helix.js`. It turns, tilts towards the mouse and pulses on click. The page opens on a full-screen scene with no nav. As you scroll, the text fades, the helix untwists and its letters scatter into the background, and the nav fades in. On laptops the scene holds still while this happens; on phones it scrolls away. The fades use CSS scroll-driven animations, so they move exactly with the scroll. If you stop halfway, `src/scripts/intro-snap.js` glides on in the direction you were scrolling, so the opening never gets stuck.
  - The background of A, C, G and T letters, shown in random patches, is generated when the site is built. On a laptop, letters also appear in a circle around the mouse (`src/scripts/cursor-reveal.js`).
  - `src/scripts/atgc-glitches.js` adds the flickering background glitches, and `src/scripts/scroll-reveal.js` fades each section in as it scrolls into view.
  - The name glitch, the blinking cursor and the button hover and press states are plain CSS.
  - No animation libraries: everything is plain CSS and JavaScript. All the motion switches off when a visitor has "reduce motion" turned on.
- Hosted on GitHub Pages, and every push to `main` goes live automatically

## Running it locally

You need [Node.js](https://nodejs.org) installed.

```sh
npm install      # install the tools, once
npm run dev      # preview at http://localhost:4321
npm run build    # build the final site into dist/
```
