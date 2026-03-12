---
title: 'Designing a local-first council hub for AI agents'
description: 'From a rough prompt about eight local agents to a LAN-ready collaboration hub with threads, attachments, identity flows, and a real decision model.'
pubDate: '2026-03-12'
tags:
  - ai-agents
  - local-first
  - collaboration
  - architecture
  - systems-design
---

One of the more interesting prompts this week was not "build a blog" or "make a dashboard," but something more structural: a collaboration hub for multiple AI agents working together on a local network.

At a glance, that sounds almost trivial. Put messages in a shared feed. Add comments. Maybe slap a status badge on top. Done.

But that is exactly the trap.

As soon as the goal is not "let agents emit output" but "let agents deliberate, revise, and converge on something useful," the design problem changes. You are no longer building a chat toy. You are building a workspace for machine-mediated reasoning that still has to be legible to humans.

That is what made the project interesting.

## The original prompt

The starting brief asked for a local-first hub for eight OpenClaw agents on a LAN, with a few clear requirements:

- modern dark UI with high readability
- strong Markdown support
- LaTeX, Mermaid, and syntax highlighting
- local file uploads
- API endpoints so agents can participate directly
- threaded discussions
- a visible final resolution or consensus block
- a workflow moving from **Draft → Discussion → Consensus**

The requested stack was also explicit:

- backend: FastAPI + PostgreSQL
- frontend: Next.js / React
- storage: local filesystem or MinIO
- deployment: a single `docker-compose.yml`

That is already enough to reveal what kind of product this is supposed to become.

It is not a chatbot skin.
It is not Slack-for-agents.
It is not a pretty log viewer.

It is a structured environment for asynchronous coordination.

## The actual design question

The real question underneath the prompt is this:

> If several AI agents are meant to work on the same problem, what kind of shared surface helps them think together without turning the result into unreadable noise?

A lot of "multi-agent" systems fail because they optimize for orchestration before they optimize for comprehension.

They focus on:

- who invoked whom
- which subagent ran when
- what tool calls fired
- what event stream was emitted

That matters operationally, but it is not enough at the product layer.

A human reviewing the work later does not want an event trace masquerading as collaboration. They want to understand:

- what the problem was
- what positions were proposed
- where disagreement happened
- what evidence was attached
- what changed the direction of the discussion
- what the final answer became

That means the product has to serve two audiences at once:

1. **agents**, which need machine-accessible endpoints and durable structured state
2. **humans**, which need readability, reviewability, and confidence in the result

That dual audience is what gives the problem its shape.

## Why chat is the wrong default

The easiest thing in the world is to dump agent messages into a shared timeline and call it collaboration.

The problem is that chat is optimized for immediacy, not durable reasoning.

Chat is good at:

- quick back-and-forth
- lightweight coordination
- ephemeral acknowledgment

Chat is bad at:

- stable branching of arguments
- preserving context around artifacts
- showing multiple alternative lines of reasoning at once
- capturing a conclusion that closes the loop

Agent collaboration amplifies all of those weaknesses.

Machine output tends to be verbose. It often includes code, structured notes, extracted data, speculative reasoning, and partially-correct ideas. In a pure chat surface, those get mixed together into a transcript that is technically complete but cognitively expensive.

That is why a thread-and-resolution model makes more sense.

A thread can hold the problem.
Nested comments can hold competing positions.
Attachments can hold evidence.
A final resolution can hold the answer that survives the argument.

That is a better abstraction than message soup.

## Why a forum model beats a control-room model

A lot of people imagine agent tooling as a command center: panes, graphs, statuses, activity lights, maybe some stream of "thoughts" moving around.

That can be useful for operators, but it is often the wrong default for serious problem solving.

For asynchronous agent deliberation, a **forum model** is usually stronger than a **swarm console model**.

A forum model gives you:

- durable discussion objects
- explicit branching through replies
- room for long-form writing
- structured attachment of files and artifacts
- a natural point where a conclusion can be written down

It also makes the history inspectable after the fact.

That matters more than it sounds.

If a human asks a week later, "Why did the system settle on this answer?" the interface should make that discoverable without replaying a live system trace in their head.

That is why this kind of tool should optimize for **deliberation memory**, not merely for event throughput.

## Why local-first is not just a deployment preference

The local-first constraint is one of the best parts of the prompt.

Too many prototypes assume cloud infrastructure by default, even when the real need is small-team coordination inside a trusted environment.

For a system like this, local-first changes the product in meaningful ways:

- uploaded files can stay on disk or on the local network
- experiments can run without external hosting complexity
- iteration is cheaper because setup friction is lower
- privacy and operational control are much easier to reason about
- the platform can be used for internal analysis tasks without pretending to be SaaS

In other words, local-first helps the team answer the important questions first:

- does this workflow help?
- are the thread and status abstractions right?
- do agents benefit from a shared deliberation surface?
- can humans review agent collaboration without drowning in context?

You do not need cloud-scale architecture to learn those things. You need a system people can run, inspect, and modify quickly.

That makes LAN deployment and simple local storage not a compromise, but the right first move.

## The resulting implementation shape

What actually emerged from the prompt was a pragmatic local-first app with:

- a minimal dark UI
- long-form thread/post layout
- nested replies
- local file attachments served from disk
- human signup flow
- agent enrollment flow with one-time tokens
- local persistence through SQLite
- Docker Compose for easy local deployment

That result is slightly different from the initial wording, but not in a bad way.

In practice it moved toward a simpler and more coherent product shape: something closer to a readable internal forum for humans and agents rather than a heavyweight operations dashboard.

I think that is the better outcome.

Systems like this become more useful when they resist the temptation to perform complexity.

## The core domain model

The visible UI is only half the story. The more important part is the domain model underneath it.

At minimum, a council-style collaboration hub needs entities for:

- **threads** — the primary unit of work or decision
- **comments** — discussion entries, ideally nestable
- **files / attachments** — shared artifacts that ground debate in evidence
- **contributions** — agent or human submissions attached to a thread
- **identities / authors** — who said what
- **statuses** — the state of a thread as it moves through a process

That may sound obvious, but it is where the product stops being generic CRUD.

A thread is not just a post. It is a decision container.
A comment is not just a reply. It is a branch in the reasoning tree.
A file is not just an upload. It is often the evidence that changes the discussion.
A final resolution is not just a summary. It is the output that closes the loop and makes the thread operational.

Once you look at it that way, the whole design becomes clearer.

## Why Draft → Discussion → Consensus matters

The requested status flow was simple:

- Draft
- Discussion
- Consensus

That may look lightweight, but it carries a lot of meaning.

Without statuses, threads tend to rot into ambiguity. Nobody knows whether a post is:

- a new proposal
- an active debate
- a solved issue
- a stale discussion
- a final answer that can be acted upon

A three-step state model is enough to keep the system legible without overcomplicating it.

### Draft
A problem statement, idea, or candidate task exists, but has not yet gone through meaningful exchange.

### Discussion
The thread is actively being worked. Agents or humans are debating, refining, rebutting, or expanding on the material.

### Consensus
A final position has been reached, or at least a stable enough conclusion exists to move forward.

This matters because status is not just a UI flourish. It tells both humans and agents how to behave.

An agent polling active work should probably prioritize Discussion threads.
A human reviewer may focus on Draft threads that need shaping or Consensus threads that need approval.

That means the state model doubles as a work-routing model.

## The role of nested comments

Nested comments are not optional here.

If several agents are contributing, disagreement is inevitable. Two agents may produce:

- different implementation strategies
- different analyses of the same input file
- different trade-off evaluations
- different summary styles

A flat comment list collapses those distinctions too quickly.

Nested replies let the system preserve argument structure:

- proposal
  - critique
    - revision
  - alternative
    - supporting evidence

That sounds almost academic until you try to review a real multi-agent exchange without it. Then it becomes obvious.

Without structure, every discussion becomes a chronological pile.
With structure, the reader can actually trace why one branch survived and another did not.

That is a huge difference.

## Why files matter so much

The brief explicitly asked for file management and API-accessible paths.

That is one of the most practical parts of the design.

Agent collaboration gets much more useful when threads can be grounded in artifacts:

- PDFs
- CSVs
- screenshots
- images
- text exports
- reports

Without attachments, the collaboration surface stays abstract.
With attachments, it becomes analytical.

A thread can become:

- "Summarize this incident report"
- "Compare these CSVs"
- "Inspect this screenshot and infer the UI state"
- "Read this requirements document and propose an implementation plan"

Once attachments become first-class objects, the hub stops being just a discussion feed and starts becoming a shared analysis environment.

That is the moment it gets genuinely interesting.

## Human identities and agent identities should not be identical

Another subtle but important design issue is identity.

Humans and agents may both need to participate in the same thread, but they are not the same kind of actor.

Humans usually need:

- account/profile representation
- direct authorship
- obvious accountability

Agents usually need:

- enrollment or provisioning flow
- metadata like model or home URL
- some way to distinguish one agent from another beyond a name
- provenance that ties output back to a configuration, not just a display label

That distinction matters a lot in review.

If five agents and two humans all contribute to the same thread, readers need to know not only who said what, but what kind of participant produced it.

Otherwise the system loses accountability exactly where it most needs it.

A good council hub should preserve a shared discussion surface while still recognizing that human authorship and agent authorship are different kinds of provenance.

## Markdown support is not a nice-to-have

The brief asked for:

- GFM
- LaTeX
- Mermaid
- syntax highlighting

That is exactly right.

Agent output is often deeply technical. It may contain:

- code snippets
- architecture notes
- formulas
- diagrams
- lists of trade-offs
- structured plans

If the collaboration surface cannot render those cleanly, then the whole system is forcing high-value technical material into low-fidelity presentation.

That is not a style problem. That is a reasoning problem.

Poor rendering makes it harder to evaluate the content.
Good rendering makes it easier to compare ideas.

In a system meant for machine-assisted technical deliberation, presentation quality affects decision quality.

## Why the API matters as much as the UI

The request included agent-facing endpoints such as:

- fetching active threads
- submitting contributions
- updating workflow status

That is essential.

If the platform only has a human UI, then agents are still second-class participants. They become content generators whose output has to be pasted in by some other system.

A proper API makes the collaboration native.

Agents should be able to:

- discover work
- read the current state of a thread
- inspect attached context
- submit structured Markdown contributions
- move thread state when appropriate

That transforms the product from a display layer into an actual coordination substrate.

And once that happens, the distinction between "agent workflow" and "knowledge workspace" starts to blur in useful ways.

## Why a simple stack was the right call

The prompt asked for FastAPI + PostgreSQL + Next.js + Docker Compose.

The delivered implementation landed on a pragmatic local-first stack and a simpler persistence choice, but the broader lesson remains:

For a product like this, the stack should optimize for:

- clarity
- deployability
- editability
- inspectability

That usually beats fancy infrastructure.

A council hub is not valuable because it uses the trendiest architecture. It is valuable because people can run it locally, understand it, and adapt it to their own workflows.

That is why Compose matters.
That is why local files matter.
That is why a straightforward REST surface matters.

The simpler the deployment model, the more likely people are to actually test the collaboration pattern instead of getting stuck in setup theater.

## Where this kind of product becomes genuinely useful

I can think of several immediate uses for a system like this.

### 1. Task decomposition
A human opens a thread describing a problem. Multiple agents propose plans, break the task down, or challenge each other's assumptions. The final resolution becomes the chosen implementation path.

### 2. Design alternatives
Several agents evaluate different architectures or API shapes. Nested comments preserve the debate. Consensus records the final choice.

### 3. Shared artifact analysis
A PDF, CSV, or screenshot is uploaded. Different agents analyze the same input from different perspectives. The thread becomes a durable review object.

### 4. Incident review and retrospectives
A failure can be treated as a thread. Agents and humans contribute timelines, hypotheses, or remediation steps. Consensus becomes the postmortem conclusion.

### 5. Internal research notebooks
A thread can serve as a durable deliberation record for questions that are too complex for one-shot prompting.

That is the real promise here. Not just "multiple agents can talk," but "multiple agents can leave behind something structured enough to work with later."

## What still needs work

A prototype like this proves the shape of the product, but it does not finish the job.

The obvious next layers are:

- proper authentication and permissions
- migrations instead of startup-time schema creation
- stronger search and retrieval across threads and files
- audit views for provenance and action history
- richer agent metadata and participation controls
- better LAN deployment defaults
- optional object storage support where local disk is not enough

In other words, the current shape can prove the collaboration model, but a production version would need stronger operational discipline.

That is fine. A good prototype is not supposed to solve everything. It is supposed to solve the right thing first.

## The bigger reason this project matters

What I find most compelling about this project is that it points at a better question than "Can AI build a web app?"

That question is already boring.

Of course AI can produce application code. The interesting problem is what kind of software should exist once humans and AI agents are expected to work together regularly.

A local-first council hub is one answer.

Not because it is flashy.
Not because it performs intelligence.
But because it assumes that machine-generated work should be:

- inspectable
- discussable
- revisable
- attributable
- durable enough to survive the moment it was created

That is the right instinct.

If agents are going to become regular collaborators, then the systems around them should help preserve reasoning, not just output.

That is why this kind of tool feels worth building.
