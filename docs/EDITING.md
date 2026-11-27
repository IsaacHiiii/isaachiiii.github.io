# How to edit the site

Nearly every change to the site is a change to one file: **`src/content.json`**. It holds all the words on the page. The layout reads them from there when the site is built, so you never need to touch the code to change what the site says.

## Where each section lives

| On the site | In `content.json` |
| --- | --- |
| Tab title, search description, logo text | `site` |
| Instagram, LinkedIn and GitHub addresses | `links` |
| Button and icon labels | `buttons` |
| Links in the top bar | `nav` |
| Prompt, name and intro at the top | `hero` |
| A bit about me, and the three small facts | `about` |
| Experience | `experience` → `entries` |
| Poster and skills | `research` → `poster`, `skills` |
| Projects (hidden until it has one project) | `projects` → `entries` |
| Hackathons | `hackathons` → `entries`, `next` |
| Learning log | `learning` → `log` |
| Say hello | `contact` |
| Footer | `footer` |

Your email address isn't in this file on purpose. It's kept scrambled in `src/scripts/email.js`, so bots can't read it from the page.

## Common changes

**Change some wording.** Edit the text between the quotes. Leave the name before the colon (the "key", like `"title"`) as it is: the layout looks the text up by that name.

**Add an item to a list.** Lists are the parts in square brackets `[ ]`. Copy an existing item, from its `{` to its `}`, paste it where you want it, and change the text. The page makes one row per item, in the order they're listed. Newest first reads best for experience.

```json
"entries": [
  {
    "when": "Jan 2027 – now",
    "title": "My new role",
    "detail": "One line about what I do."
  },
  {
    "when": "Apr 2026 – now",
    "title": "President, National Biomedical Science Gathering",
    "detail": "…"
  }
]
```

**Remove an item.** Delete it from its `{` to its `}`, and the comma that goes with it.

**Learning log tags.** Each line has a `tag`. Use `"now"` for things in progress (shown white) or `"done"` for finished ones (shown grey).

## Adding a project

The Projects section stays hidden, along with its link in the top bar, until `projects.entries` has at least one project in it. Add one like this:

```json
"entries": [
  {
    "path": "projects/blood-test-analysis",
    "title": "Exploring blood test results in R",
    "text": "One or two sentences: what the question was and what I found.",
    "tools": "R, tidyverse, ggplot2",
    "link": "https://github.com/IsaacHiiii/blood-test-analysis"
  }
]
```

- `path` is the small grey label above the title. A made-up folder path matches the rest of the site.
- `tools` and `link` are optional. Leave either line out and that part simply doesn't show. A link shows as "View the code", and you can change that wording in `projects.linkText`.
- The heading and grey second line are `projects.heading` and `projects.subheading`.

## The punctuation rules

JSON is strict. Most mistakes are one of these:

- Text goes inside **straight double quotes**: `"like this"`. Curly quotes from a phone keyboard or Word (`“ ”`) break it.
- Items are separated by **commas**, but there's **no comma after the last one** in a list or block.
- To use a double quote inside your text, write it as `\"`. Apostrophes (`I'm`) are fine as they are.

VS Code underlines a mistake in red as soon as you make it. Check for red before you publish.

## Check it before publishing (optional)

In the VS Code terminal, run `npm run dev` and open http://localhost:4321. The preview updates each time you save. Press `Ctrl + C` in the terminal to stop it.

## Publishing

Pick either way. The live site updates about a minute after you commit.

**In VS Code:** save the file, open the Source Control panel (the branch icon on the left), type a short message like `Add new role to experience`, click **Commit**, then **Sync Changes**.

**On the GitHub website** (works on a phone): open the repo, go to `src/content.json`, click the pencil icon, make your edit, then click **Commit changes**.

## If something goes wrong

If a mistake gets published, **the live site doesn't break**. The build fails, the old version stays online, and GitHub emails you. Find the mistake (usually a comma or a quote), fix it and commit again. You can see each build's result in the repo's **Actions** tab.

## What needs code

Text and list items never do. These do:

- A whole **new section**, with its own heading and layout. It needs a few lines in `src/pages/index.astro`, and a nav link pointing to its `id`.
- A **new field** on an item. For example, adding a `"grade"` to experience entries does nothing until the layout is told to show it.
- Changing how something **looks**, in `src/styles/global.css`.
