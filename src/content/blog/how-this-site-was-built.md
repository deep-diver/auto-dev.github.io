---
title: 'How this site was built: from empty repo to AI-assisted dev blog'
description: 'A detailed walkthrough of how auto-dev.github.io was created with OpenClaw, GitHub CLI, Astro, and a browser relay.'
pubDate: '2026-03-12'
tags:
  - astro
  - github-pages
  - openclaw
  - ai-assisted-development
---

This site was created as a small but very literal example of the thing it is meant to document: software built through collaboration between a human and an AI agent.

In this case, the human provided the goal and taste constraints:

- create a public GitHub repository for a static blog
- make it good for development writing
- support light and dark themes
- make it look clean and a little more polished than a default starter

The AI agent handled the setup work, tool usage, and a good chunk of the implementation.

## Step 1: create the repository

The first step was verifying that GitHub CLI was available in the agent's terminal environment. It was not, so `gh` was installed and checked with `gh auth status`.

After that, the repository was created as a public repo:

```bash
gh repo create deep-diver/auto-dev.github.io --public --description "Static dev blog" --clone
```

That immediately gave the project a home on GitHub and a local clone to work in.

## Step 2: choose a site engine

For this kind of blog, Astro was the easiest good choice.

Why Astro:

1. It is static-first, which is perfect for GitHub Pages.
2. It is fast by default.
3. Markdown and MDX support are straightforward.
4. It is easy to keep the design minimal without fighting a heavyweight framework.

The initial project was scaffolded from Astro's blog template.

## Step 3: fight the boring setup problems

The setup did not go through perfectly on the first try.

A dependency issue showed up around `sharp`, which is often used for image processing in Astro projects. Rather than treating that as drama, it was handled like most real build issues are handled:

- inspect the failing dependency
- simplify the setup
- remove what was unnecessary
- confirm the site still builds cleanly

That led to a lighter configuration that still fits the project's purpose.

This is a useful reminder that AI-assisted development is not magic. A lot of the value comes from turning small failures into quick decisions.

## Step 4: reshape the starter into a real blog

The default template did its job, but it still looked like a starter template.

So the site was rewritten to better match the brief:

- monochrome visual style
- theme toggle for light and dark mode
- cleaner typography for long-form technical writing
- home page with a stronger editorial identity
- blog archive designed around readable post cards
- About page intended to explain the site's purpose

The design choice was intentionally restrained. A black/white/gray interface makes code snippets, diagrams, screenshots, and product UI stand out more when they appear inside posts.

## Step 5: wire up GitHub Pages

A GitHub Actions workflow was added so that pushes to `main` build and deploy the site automatically.

That keeps the publishing model simple:

1. write a post
2. commit it
3. push to GitHub
4. let Pages deploy the result

The site is published as a project Pages site, which means the final URL lives under the repository path rather than the root account domain.

## Step 6: verify the site in a real browser

This part is important because it reflects the broader purpose of the project.

The build was not only generated in the terminal. The local dev server was opened in a browser through OpenClaw's Chrome relay integration, and the resulting page was checked visually.

Here is the first captured home-page view during setup:

![Initial home page screenshot](/auto-dev.github.io/images/auto-dev-home.jpg)

That screenshot matters more than it might seem. A lot of AI-generated code looks acceptable in a diff but falls apart in an actual browser. Verification in a real tab closes that gap.

## What this build says about AI-assisted development

The interesting part is not that an AI generated files quickly. Template generators can already do that.

The interesting part is the workflow:

- the human set the direction
- the AI used tools to create the repo, edit files, and configure deployment
- the AI adjusted when build issues appeared
- the human reviewed the result and asked for changes
- the final output became something concrete, inspectable, and publishable

That is closer to what practical AI-assisted software development actually looks like: not pure autonomy, not pure manual coding, but iterative delegation with judgment layered on top.

## What comes next

The site now has a decent base for the kind of writing it was made for:

- build logs
- technical essays
- postmortems
- AI workflow notes
- examples of code or products made through human/AI collaboration

Which is fitting, because this post is both documentation and proof of concept.
