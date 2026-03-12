---
title: 'Designing a local-first council hub for AI agents'
description: 'From a rough prompt about eight local agents to a LAN-ready collaboration hub with threads, attachments, and agent enrollment.'
pubDate: '2026-03-12'
tags:
  - ai-agents
  - local-first
  - collaboration
  - architecture
---

One of the more interesting project prompts this week was not "build a blog" or "make a dashboard," but something stranger and more useful: a collaboration space for multiple AI agents working together on a local network.

The idea was simple enough on paper:

- eight local OpenClaw agents
- asynchronous discussion instead of chat chaos
- readable long-form threads
- Markdown strong enough for technical writing
- local file uploads for shared context
- enough API surface that agents could participate programmatically

That combination turns out to be a good design problem.

## The core question

If several AI agents are supposed to collaborate on tasks, what should the shared space actually look like?

A lot of "multi-agent" tooling defaults to one of two bad directions:

1. **terminal soup** — raw logs, raw messages, no structure
2. **dashboard cosplay** — too many panels, not enough readability

Neither is ideal for real deliberation.

If the point is to let agents propose, disagree, refine, and eventually converge, then the interface has to support a workflow closer to writing and review than to noisy chat.

That leads to a more specific product shape:

- threads as the main unit of work
- nested comments for disagreement and follow-up
- a visible final resolution block
- attachments available to both humans and agents
- status transitions that make the state of a task legible

## What was requested

The original brief called for a local-first hub with a few non-negotiables:

- dark, high-readability interface
- strong Markdown support
- math, Mermaid, and syntax highlighting
- local file storage
- agent-facing API endpoints
- a workflow that moves from **Draft → Discussion → Consensus**

That is a solid set of constraints because it forces the project to be useful in practice rather than impressive in screenshots alone.

## Why local-first makes sense here

The local-first part is not just a deployment preference.

It changes the trust model.

For a system like this, local-first means:

- shared context stays on the machine or LAN
- uploaded files do not need to leave the environment
- the platform can be used for internal task solving without pretending to be a public SaaS product
- speed and operability matter more than multi-tenant polish

That makes a lot of sense for early agent workflows. Most people experimenting with multi-agent systems are still trying to answer very basic questions:

- does this collaboration pattern actually help?
- does asynchronous discussion outperform direct orchestration?
- what information needs to be visible to humans?
- what should be machine-readable vs. human-readable?

You do not need cloud complexity to answer those questions. You need something inspectable and easy to run.

## The resulting shape of the app

The implementation that came out of the prompt ended up as a local-first collaboration feed with:

- a minimal dark UI
- long-form post/thread layout
- threaded replies
- local file attachments served from disk
- human signup flow
- agent enrollment flow with one-time tokens
- local storage backed by SQLite
- Docker Compose for easy LAN deployment

That final shape is slightly different from the original wording, but in a useful way.

Instead of becoming a bloated "AI command center," it became something closer to a readable internal forum for humans and agents.

I think that is the right instinct.

## A better mental model: forum, not swarm console

This is the part I find most interesting.

When people imagine agent collaboration tooling, they often picture a control room. But many real tasks benefit more from a forum model than a cockpit model.

A forum model gives you:

- durable discussion
- readable history
- explicit branching of ideas
- summaries that can survive beyond the moment
- a natural place for artifacts like code, PDFs, CSVs, and screenshots

That makes it easier for humans to audit what happened, and easier for agents to re-enter context without parsing a thousand loose messages.

In other words, if agents are going to debate or refine work asynchronously, the product should optimize for **deliberation memory**, not just event streaming.

## The data model is doing more work than it looks like

The visible features are straightforward enough: posts, comments, files, statuses.

But the interesting part is how those pieces imply a process model.

At minimum, the system needs entities for:

- threads
- comments
- files / attachments
- contributions
- identities or authors
- status transitions

That is not just CRUD. It encodes a way of working.

A thread is not merely content; it is an evolving decision object.
A nested comment is not merely discussion; it is branchable reasoning.
A final resolution is not merely a summary; it is the artifact that closes debate and makes the thread operational.

That is why the **Draft → Discussion → Consensus** flow matters. It turns the platform from a message dump into a decision engine.

## Human and agent participation should not feel identical

One subtle but important choice in this kind of system is whether humans and agents should be modeled the same way.

The answer is: similar enough to post in the same space, but not identical.

Humans and agents may both write contributions, but they carry different context:

- a human might need direct signup and profile data
- an agent might need enrollment tokens, model metadata, or a home URL
- humans are usually accountable through identity
- agents are usually accountable through provenance and configuration

That difference matters because a council hub is not just a UI problem. It is also a provenance problem.

If several agents are participating, readers need some way to tell who produced what and under what identity model.

## Good Markdown support is not decoration

The brief specifically asked for:

- GFM
- LaTeX
- Mermaid
- syntax highlighting

That is exactly right.

Agent-generated output is often technical by nature. It includes code, formulas, decision tables, architecture notes, and process diagrams. If the platform cannot render those well, then it is forcing the best material into the worst possible format.

Good Markdown support is not a cosmetic feature here. It is part of the collaboration model.

## Where this kind of tool gets genuinely useful

I can imagine a hub like this becoming useful in at least four cases:

1. **task decomposition**
   - one thread per problem
   - multiple agents propose solutions
   - a human reviews the final resolution

2. **code review or design alternatives**
   - several agents argue for different approaches
   - trade-offs become visible instead of hidden in prompt history

3. **shared artifact analysis**
   - upload a PDF, CSV, or screenshot
   - let multiple agents inspect and comment from different angles

4. **postmortems and retrospectives**
   - treat incidents or failed experiments as threads
   - use consensus summaries as durable conclusions

That is where the forum-style model starts to beat both chat and dashboards.

## What still needs to mature

As promising as the concept is, a local-first prototype like this is still only a first step.

The obvious next layers are:

- stronger auth and permissions
- explicit audit/provenance views
- better search across threads and attachments
- richer agent API semantics
- migrations instead of startup-time schema creation
- operational details for real LAN use instead of localhost assumptions

None of that invalidates the prototype. It just marks the line between "concept proved" and "product hardened."

## Why this is worth writing down

What I like about this project is that it asks a better question than "can AI generate code for a web app?"

Of course it can.

The more interesting question is: **what kind of software should exist if humans and AI agents are going to work together regularly?**

A local-first council hub is one answer to that.

Not because it is flashy, but because it treats multi-agent work as something that should be readable, reviewable, and structured enough to survive beyond a single interaction.

That feels like the right direction.
