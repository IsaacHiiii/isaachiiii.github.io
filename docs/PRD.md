# PRD: Personal Website

Nov 20, 2026 (updated Nov 25, 2026) · @Isaac

## 1. Overview

A personal website for me, Isaac Hii Nian Hong, a Stage 2 BSc (Hons) Biomedical Sciences student at Newcastle University Medicine Malaysia (NUMed).

The site has two jobs:

1. **A link I can share.** Something to put on my CV, LinkedIn and applications for placements or research projects, so people can see what I study, what I've done and how to reach me.
2. **A learning project.** My first real build with an AI coding agent. The point is to go through the whole loop myself: planning, prompting, reviewing what the agent writes, fixing things when they break, and putting it online.

Because of the second job, this PRD is written so I can hand it straight to a coding agent (for example Claude Code) and build it one phase at a time.

## 2. Goals and non-goals

**Goals**

- The site is live on a public URL from the end of Phase 0, and complete by the end of Phase 5.
- A visitor can tell who I am within about 10 seconds: name, what I study, what I'm interested in.
- I can update it myself by editing a text file and pushing, without asking the agent every time.
- I can explain what every file in the project does. If I can't, I ask the agent until I can.
- It looks fine on a phone, since most people will open the link there.

**Non-goals (for now)**

- No login, database or backend.
- No content management system.
- No blog at launch (it's a stretch goal).
- No extra pages at launch. Everything lives on one page, in the order set out in section 4.
- No photo of me.
- No Chinese name anywhere on the site. English name only.

## 3. Audience

| Who | Why they visit | What they need to find quickly |
| --- | --- | --- |
| Researchers and supervisors | Deciding whether to take me on for a project | Research interests, skills, CV |
| Placement coordinators and recruiters | Checking my background | Experience, education, contact |
| Peers and collaborators (e.g. NBSG partners) | Seeing what I'm involved in | Current roles, how to reach me |
| Me | Learning to build with an agent | A codebase small enough to fully understand |

## 4. Pages and content

**One page**, with the sections in the order below. This is the exact copy from the chosen mockup (option H, see section 6). All of it lives in `src/content.json` from Phase 1 onwards, never in the layout code, so I can reword anything later. Fuller details (grades, awards, older roles) stay in my CV, which the site links to.

| Section | Exact content |
| --- | --- |
| Hero | Pill: `~/isaac-hii $ whoami` with a blinking cursor. Heading line 1 (white): **Isaac Hii Nian Hong** (no full stop) Heading line 2 (grey): **Biohacker in the making.** Intro: "I'm a biomedical sciences student at NUMed, slowly teaching myself data science and joining hackathons when I can." Buttons: **Download CV** (white) and **LinkedIn** (outline), plain text, no icons |
| A bit about me | Heading: "A bit about me." Paragraph: "I'm in my second year of Biomedical Sciences at Newcastle University Medicine Malaysia, based in Johor Bahru. I enjoy lab work, and I've been getting curious about what happens to the data afterwards. That's what pulled me towards bioinformatics and data science." Then four facts, each a small mono label above a value: `studying` BSc Biomedical Sciences, NUMed · `currently` President, National Biomedical Science Gathering · `learning` Python and R · `off the clock` Volleyball and chess |
| Experience | Heading: "Experience." / grey: "What I've been doing so far." Four entries (mono date, title, detail), current roles first, then finished ones newest first (President, Vice President, Research Intern, Clinical Laboratory Intern): **Jun – Aug 2026**, Research Intern, Institute for Medical Research: "Bacteriology Unit. Bacterial identification, MALDI-TOF MS, 16S rRNA PCR, and sequence analysis with MEGA and CLC." **May – Jun 2026**, Clinical Laboratory Intern, Premier Integrated Labs: "Haematology, urinalysis, blood grouping, rapid diagnostics, automated analysers and QC." **Apr 2026 – now**, President, National Biomedical Science Gathering: "Working with a committee of 30+ students to organise a national event for biomedical science students." **Jul 2026 – now**, Vice President, NUMed Bioscience Society: "Previously Publicity and Event Officer." |
| Research and skills | Heading: "Research and skills." Poster entry: mono label "Poster, Aug 2026", title "Hormonal changes during menopause and their effects on cognitive function", line "MAAFIM 6th International Conference". Then a terminal block: `~/isaac-hii $ cat skills.txt`, then `code` Python, R, MEGA, CLC Genomics Workbench, BLAST · `lab` PCR, gel electrophoresis, sequencing, MALDI-TOF MS, microscopy · `speak` English, Malay, Chinese |
| Hackathons | Heading: "Hackathons." / grey: "Learning by building, with people from other fields." Entry 1: mono path `hackathons/diabetes-x_2026-11`, title "Diabetes X Hackathon, MIT Hacking Medicine Malaysia", text "My first hackathon. I worked with a team from different backgrounds to build and pitch an idea for diabetes care. \[WHAT WE BUILT, IN ONE LINE\]". Entry 2: mono path `hackathons/next` (dimmer), text "Hoping to join more. If you're forming a team for a health or bio hackathon, I'd be glad to hear from you." ("hear from you" links to Contact) |
| Learning data science | Heading: "Learning data science." / grey: "Still early. Here's what I'm working through." Terminal block headed `~/isaac-hii $ tail learning.log`, lines: `[now]` Python for data analysis \[COURSE OR BOOK\] · `[now]` R and RStudio \[COURSE OR BOOK\] · `[now]` Building this website with an AI coding agent · `[done]` Sequence analysis with MEGA, CLC and BLAST (IMR), in grey · `[next]` \[NEXT TOPIC\], dimmest |
| Contact | Centred card. Heading: "Say hello." / grey: "I'd love to hear what you're working on." Text: "Whether it's a hackathon team, a research project or just a question, feel free to reach out." Buttons: **Email me** (white) and **LinkedIn** (outline) |
| Footer | Left: "© 2026 Isaac Hii". Right, in mono, two lines: `>>> print("Hello, world!")  · 23 Nov 2026` (my first line of Python, as a quiet signature), then "Built while learning to code with AI." |

**Links:** LinkedIn `https://www.linkedin.com/in/isaachiinh` · GitHub `https://github.com/IsaacHiiii`.

**Placeholders still to fill in:** what my team built at Diabetes X, the course or book for Python and for R, my next learning topic, my email address.

**Placeholders don't block launch.** Any placeholder still unknown at launch is removed, not shown:

- Lines with a missing detail are shortened, e.g. `[now] Python for data analysis` without the course name.
- The `[next]` line and the Diabetes X "what we built" sentence are left out until I have them.

## 5. Features

**MVP (must have at launch)**

- One page that works on phone, tablet and laptop (see the responsive rules in section 6)
- Sticky floating navigation bar linking to each section, plus GitHub and Get in touch buttons
- Hero with the DNA helix and scroll journey, the ATGC background, background glitches and name glitch (spec in section 6)
- Every animation switches off for visitors with "reduce motion" turned on
- Links to email, LinkedIn and GitHub
- **Email is hidden from scrapers.** The address is never written in the HTML. A small script puts it together from pieces when the page loads and sets the "Email me" button's `mailto:` link. Visitors without JavaScript still have the LinkedIn button.
- **Public downloadable CV** as a PDF, with phone number and home address removed. Check the PDF's metadata (author, file properties) and remove anything private before uploading.
- Basic SEO: page title, meta description, and a preview image for when the link is shared on WhatsApp or LinkedIn
- Basic accessibility: readable contrast, visible keyboard focus, real links and buttons
- **Screen readers:** the ATGC grid, the helix canvas and both glitch copies of the name are hidden with `aria-hidden="true"`, so the name is read once. Test with VoiceOver on Mac.

**Later (stretch goals)**

- Project cards for things I build in Python or R, generated from a data file
- A notes or blog section written in Markdown
- Custom domain
- Simple, privacy-friendly visit counter
- Contact form

## 6. Design spec (option H)

**Reference mockup:** [option H on my style canvas](https://claude.ai/artifact/8KoQvhgSU1AiHhAZrcEgba#artboard-Refined). Screenshots are in `docs/mockup/`. Open it full-screen next to the dev server and compare section by section. The feel is inspired by the calm, monochrome look of myresearchguide.org, with small biohacker touches. Inspired by, not copied: no borrowed logos, wording or graphics.

**Principles**

- Monochrome only: black, white and greys. No accent colour.
- Calm and humble. The loud moments all live in the hero: the DNA helix and its scroll journey, and the name glitch. Everything below it stays quiet.
- Biohacker touches stay small: a terminal prompt, mono file paths, log and skills blocks.
- Big two-tone headings: a white line, then a grey line.

**Design tokens** (set these up as CSS variables first)

| Token | Value | Used for |
| --- | --- | --- |
| `--bg` | `#0d0d0d` | Page background |
| `--surface` | `#000000` | Hero frame, cards, contact card |
| `--border` | `#262626` | Card and nav borders |
| `--border-strong` | `#333333` | Outline buttons |
| `--divider` | `#1f1f1f` | Lines between rows inside cards, hero frame border |
| `--text` | `#ededed` | Main text, white button background |
| `--text-2` | `#c2c2c2` | Hero intro, About paragraph |
| `--muted` | `#a3a3a3` | Details, nav links |
| `--label` | `#8f8f8f` | Mono labels, dates, prompts |
| `--heading-grey` | `#8a8a8a` | Second line of two-tone headings |
| `--faint` | `#7a7a7a` | Placeholders, `[next]`, footer (changed from `#6b6b6b` to pass 4.5:1 contrast on `--bg`) |
| Fonts | **Geist** 400/500/600/700 for everything; **Geist Mono** 400/500 for prompts, paths, dates, logs and skills. Bundled with the site via Fontsource (`@fontsource/geist`, `@fontsource/geist-mono`), not loaded from Google Fonts |  |
| Radius | 24px hero and contact card · 16px cards and nav bar · 10px buttons · 999px prompt pill |  |

**Type scale**

| Element | Size / line height | Weight | Letter spacing |
| --- | --- | --- | --- |
| H1 (hero) | Up to 6rem / 1, sized so "Biohacker in the making." always fits on one line: `min(6rem, calc((100vw - 80px) / 11.5))` (2.5rem cap on phones). The name has a left to right gradient, `#ffffff` → `#9b9b9b` | 700 | −0.04em |
| H2 (section) | 2.5rem / 1.1 (about 2rem on phones) | 600 | −0.035em |
| H3 (entry title) | 1.15–1.25rem | 600 | normal |
| Body | 1rem–1.15rem / 1.65–1.75 | 400 | normal |
| Mono labels | 0.85rem | 400 | normal |

**Layout, top to bottom**

1. **Navigation bar.** Sticky, 12px from the top, max width 1180px, rounded 16px, 1px `--border`, background `rgba(17,17,17,0.85)` with a 12px backdrop blur. Left: "isaac.hii" in bold. Right: grey links (Experience, Research, Hackathons, Learning), a **GitHub** outline button, and a white **Get in touch** button. Buttons are plain text, with no arrow icons. Every link and button is at least 44px tall.
2. **Hero.** No frame or box: the hero sits directly on the page background, max width 1180px. Content centred: the prompt pill, the two-line H1, the intro (max about 36rem wide), then the two buttons. Behind it, a DNA helix runs diagonally through the title (see Animations). With the animation on, the hero is pinned for a short scroll journey and the next section slides up over it; with reduce motion on, it's a normal hero with about 8rem padding above and 7.5rem below.
3. **Sections.** One centred column with the same width as the nav bar (max 1180px, 1rem side padding), so the boxes line up with the nav bar's edges. 6rem between sections. Section headings are indented to line up with the text inside the boxes. On laptops, Experience entries and the poster put the date or label in a 10rem left column, beside the title and detail. Each section has a two-tone H2 and then a black card (1px `--border`, rounded 16px, padding 0.5rem by 2rem). Rows inside a card have 1.5rem padding above and below, separated by 1px `--divider` lines. Terminal blocks use Geist Mono, a header line with the prompt, then the lines at line height about 2.
4. **Contact.** Centred card, rounded 24px, 4rem padding, two-tone heading, short text, two buttons.
5. **Footer.** Small `--faint` text, left and right, wrapping on phones.

**Animations** (all off when the visitor has "reduce motion" on)

- **ATGC background.** A grid of random A, C, G and T letters, Geist Mono 14px, line height 20px, letter spacing 0.35em, `--text` at 16% opacity, covering the **whole page background** (not just the hero), fixed behind all content. The letters show only in **8 random soft patches**, fading to nothing between them; each patch is a radial gradient with a random position and size, picked at build time. On top of that, a radial mask (ellipse 75% wide, 70% tall, centred) keeps it faint behind the text (about 18% visible in the middle, 60% at 45%, fully visible from 80%). **The grid and its patches are generated by Astro at build time** and arrives already in the HTML. It doesn't move and needs no script. With reduce motion on, the grid still shows; only the glitches stop. The whole grid is `aria-hidden="true"`.
- **Background glitches.** Every 110ms there's an 18% chance of a new glitch, with at most 3 on screen. 70% are small: 3 to 9 white letters (90% opacity) on a black background, nudged 4–13px sideways, re-scrambled every tick, lasting 2–4 ticks. 30% are streaks: 24–53 grey (`--heading-grey`, 55% opacity) letters lasting 2 ticks. They sit on the same grid as the background letters, and only appear inside the patches (fading out at a patch's edge, like the letters). The script doesn't start at all with reduce motion on.
- **Name glitch.** Every 6.5s (first at 1.2s), the first line of the H1 glitches for about 0.2s: two copies of the name (one white, one grey, each on black) show thin horizontal slices using `clip-path`, shifted between −7px and +6px over three quick steps, then disappear. Built with `::before` and `::after` using `content: attr(data-text)`. The copies must not be read by screen readers: the visible name is read once (e.g. the glitch layer is `aria-hidden="true"` and the real text stays in the H1).
- **Cursor.** A block cursor in the prompt pill blinks every 1.1s: one character wide, a full character cell tall, one space after the text.
- **DNA helix hero.** A 3D double helix of A/C/G/T base pairs (A–T, C–G), drawn on a `<canvas>` by `src/scripts/helix.js` with plain JavaScript (no library). It runs diagonally (about 18°) through the title: two backbone curves, faint rungs, letters bigger and brighter at the front, fading at the screen edges. It turns slowly, tilts towards the mouse with eased movement, and a click on empty hero space sends a pulse of light along the strands. It pauses when off screen. The canvas is `aria-hidden="true"`.
- **Scroll journey.** The hero sits in a box 1.7 screens tall with a sticky, one-screen pinned layer. Scroll progress (0 to 1, eased) drives: the hero text drifting up and fading (gone by a third), the helix untwisting into a flat ladder and stretching (15–60%), then its lines vanishing and letters scattering into the background (55–100%). The page content overlaps the journey (70% of a screen on laptops, 55% on phones), so "A bit about me" starts sliding up over the scene at about 45%. Keyboard focus inside the hero always shows the hero text. With reduce motion on: a still helix, no pinning. Without JavaScript: the normal hero.
- **Cursor reveal.** On devices with a mouse, the ATGC letters show in a soft 180px circle around the pointer, added to the background's masks. Updates at most once per frame.
- **Scroll reveals.** Each section below the hero fades in and slides 32px into place every time it scrolls into view (`IntersectionObserver`, 15% visible), rising when scrolling down and sliding down when scrolling back up. It hides again only once fully off screen.
- **Button states.** Hover (mouse only): lift 1px, solid buttons go pure white, outline buttons get a lighter border and `#181818` background. Press: scale to 98%. All transitions 300ms on `cubic-bezier(0.22, 1, 0.36, 1)`. With reduce motion on, colours still change but nothing moves.

**Responsive rules**

- Nothing scrolls sideways at 375px wide, including the terminal blocks: long lines wrap under their own value, with the labels kept in a column.
- On phones (640px and narrower) the nav stays on one row: the four section links are hidden, and the logo, GitHub and Get in touch stay. No menu button.
- Inside entries, the date and title stack on narrow screens.
- Buttons wrap and stay at least 44px tall.

## 7. Tech stack and hosting

| Part | Choice | Why |
| --- | --- | --- |
| Framework | Astro | Builds a plain static site, reads copy from a data file at build time, easy to add a blog later |
| Styling | Plain CSS with the CSS variables from section 6. No Tailwind | The design is mostly exact values, which are easiest to keep in one stylesheet |
| Fonts | Geist and Geist Mono via Fontsource, bundled with the site | Faster first load and no request to Google |
| Animations | Plain CSS for the cursor, name glitch and button states. ATGC grid generated at build time. Small plain scripts for the background glitches, the cursor reveal, the scroll reveals and the DNA helix (canvas) | No animation library needed |
| Content | `src/content.json`, holding all the copy in section 4, from Phase 1 | I can reword anything without touching layout code |
| Version control | Git and GitHub. The project is its own repo in `Documents/VS Code/isaachiiii.github.io` | Every working step is saved, so I can undo anything the agent breaks |
| Hosting | GitHub Pages, repo `IsaacHiiii/isaachiiii.github.io`, deployed with Astro's official GitHub Actions workflow | Deploys automatically on every push. URL: `https://isaachiiii.github.io` |
| Domain | Free GitHub Pages URL. Custom domain is a stretch goal | Can be added later without rebuilding anything |
| Coding agent | Claude Code | Reads and edits the project files directly, runs commands, explains what it did |

## 8. Build plan

**How I'll work with the agent**

- One phase per session. Small tasks get better results than "build my whole website".
- This PRD lives at `docs/PRD.md`. A short `CLAUDE.md` at the project root holds the working rules and tells the agent to read this PRD first.
- Commit to Git after every step that works.
- After each change, ask the agent to explain what it did and why. Read the diff before accepting.
- When something breaks, paste the full error message and describe what I expected to happen.

**Phases**

1. **Phase 0: Setup and first deploy.** Install VS Code, Node.js, Git and Claude Code. Create the repo `isaachiiii.github.io` on GitHub and connect this folder to it. Take full-page screenshots of option H into `docs/mockup/`. Set up a bare Astro project with a "hello" page and deploy it to GitHub Pages, so `https://isaachiiii.github.io` works from day one. *Learning goal:* the tools, the terminal, commits, pushes and automatic deploys. *Starter prompt:* "Read docs/PRD.md. Set up a new Astro project in this folder with plain CSS, then walk me through deploying it to GitHub Pages step by step. Explain each file and folder you create, and wait for me after each step."
2. **Phase 1: Static layout.** Build the whole page from section 6, with no animations yet. All copy goes into `src/content.json` from the start, and the page reads from it. Start with the design tokens and fonts, then the nav, the hero and each section. *Learning goal:* how the agent edits files, running a dev server, comparing against a mockup. *Starter prompt:* "Read docs/PRD.md and look at docs/mockup/. Set up the design tokens from section 6 as CSS variables and install the fonts with Fontsource. Put all the copy from section 4 in src/content.json, then build the page section by section reading from it. Stop after the hero so I can check it."
3. **Phase 2: Animations.** Generate the ATGC grid at build time, then add the background glitches, the name glitch and the cursor exactly as specified, and make sure they turn off with reduce motion. *Learning goal:* CSS animations, a small script, accessibility settings. *Starter prompt:* "Implement the Animations part of section 6, one effect at a time. After each one, tell me how to test it, including with reduce motion turned on and with VoiceOver."
4. **Phase 3: Components.** Turn repeated parts (cards, entries, buttons, two-tone headings) into components. *Learning goal:* components. *Starter prompt:* "Build reusable components for the repeated parts of the page. The page should look exactly the same afterwards."
5. **Phase 4: Check the live site.** Deploys have been running since Phase 0. Open the live URL on my phone and laptop and check that the latest push is live and everything works there, not just on the dev server. *Learning goal:* the difference between the dev server and the live build.
6. **Phase 5: Polish.** Phone layout, SEO tags, preview image, CV download, hidden email script, keyboard and contrast check, a Lighthouse audit, and filling in or removing the placeholders. *Learning goal:* testing and auditing the agent's work.
7. **Phase 6: Stretch.** Pick from the stretch list in section 5.

## 9. Done criteria

- [ ] Site is live at `https://isaachiiii.github.io`
- [ ] Side by side with option H, the colours, fonts, spacing and section order match
- [ ] The ATGC background, glitches, cursor, DNA helix and scroll journey work, and all motion stops with reduce motion on
- [ ] VoiceOver reads my name once, and skips the ATGC grid
- [ ] My email address doesn't appear anywhere in the HTML source, but the Email me button works
- [ ] Looks right on my phone (375px wide) and laptop, with no sideways scrolling
- [ ] All MVP features in section 5 work
- [ ] Lighthouse scores of 90+ for performance, accessibility and SEO
- [ ] No placeholder text left anywhere (filled in, or removed as described in section 4)
- [ ] I've checked every line of content myself for accuracy
- [ ] I can change a line of text, push, and see it live without help
- [ ] I can explain what each file in the project does
