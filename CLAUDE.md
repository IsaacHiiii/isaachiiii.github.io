# Isaac's personal website

Read `docs/PRD.md` before doing anything. It is the spec for this project: content, design, tech stack and build plan. Mockup screenshots are in `docs/mockup/`.

## Who I am

I'm learning to build with an AI coding agent. This is my first real project, so I want to understand every change, not just get it done.

## Working rules

- Work on one phase from the PRD's build plan per session. Don't start the next phase unless I ask.
- Make small changes and stop for me to check them. Don't build several sections in one go.
- After each change, explain what you did and why in plain language, including what each new file is for.
- Never commit or push without asking me first.
- Ask me before installing a package that isn't named in the PRD.
- All page text lives in `src/content.json`. Never hard-code copy in layout files.
- Plain CSS with the design tokens from PRD section 6. No Tailwind, no animation libraries.
- Every animation must switch off when "reduce motion" is turned on.
- Don't make up content. If something is missing, leave it out and tell me.

## Explain the code inside the code

- Comment the code you write so I can learn from reading it. Say what each block does and why, in plain English, for a beginner.
- Comment blocks and anything non-obvious, not every single line. Explain new concepts (e.g. "a CSS variable is a named value you can reuse") the first time they appear.
- Keep comments correct: when you change code, update its comments too.

## Keep the README up to date

- At the end of every phase, update `README.md` so it matches what the project actually does (how it's built, how to run it).
- Remind me to add to the "What I learned" section. If I ask, draft it in my voice from the questions I asked during the session, and I'll review it.
