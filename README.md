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

- **Plan before building.** I wrote a PRD first and had the agent question it. That caught problems I hadn't noticed, like a text colour that was too faint to pass accessibility checks, and a plan that had me writing all the text twice.
- **Why Astro over plain HTML.** Plain HTML has fewer files, but it can't keep my text in a separate file without extra JavaScript, which hurts search engines and link previews. Astro does that when it builds the site.
- **Deploy early, not last.** Putting a bare page online on day one means any hosting problem shows up now, not after weeks of work.
- **A README is the repo's front page.** The one that came with Astro was a generic template. Mine should say what the project is and why I built it, since people may find my GitHub from my CV.
- **`.DS_Store` is macOS junk.** Finder creates it in every folder to remember view settings. `.gitignore` tells Git never to save it.
- **`gh auth login` signs the GitHub CLI in to my account** through the browser, so tools can create repos and push for me without ever seeing my password.
- **Every commit records an author and an email, and both are public.** Git had made up an email from my Mac's name. I switched to GitHub's private "noreply" address so commits link to my profile without exposing my real email.
- **Code should explain itself.** I asked for plain-English comments in every file so I can learn by reading the code, not just by running it.

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
