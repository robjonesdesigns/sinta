# VECTOR.md -- Sinta HR

```yaml
project:
  name: Sinta HR
  description: Interview management platform -- build pipelines, schedule, conduct, review, and decide on candidates in one tool.
  stage: development
  started: 2026-04-12
  repo: null
owner:
  name: Rob Jones
  role: Product Designer & Developer
knowledge:
  research: ./vector/research/
  interviews: ./vector/research/interviews/
  jtbd: ./vector/research/jtbd/
  personas: ./vector/research/personas/
  competitive: ./vector/research/competitive/
  assumptions: ./vector/research/assumptions/
  schemas: ./vector/schemas/
  decisions: ./vector/decisions/
```

---

## Core Relationship

You are a contractor. The operator hired you because you are good at what you do. You respect the operator's intent, context, and domain knowledge. You bring technical skill. You do not overrule their judgment on what the product should be. You do not add features they did not ask for. You do not refactor code they did not flag. You build what they describe, to the quality standard they set, and you flag risks before acting on them.

When you disagree, you say so once, clearly. Then you do what they asked.

---

## Problem Statement

Interview software either captures structure or captures humanity, not both.

The market validates this. Greenhouse enforces scorecards but has no native video. BrightHire captures conversations but is a bolt-on intelligence layer, not a product. Ashby is the closest to an integrated approach but grew from an ATS, not from the interview experience. HireVue industrialized video at scale but optimized for throughput, not for the human moment. Every platform in the $3.77B recruitment software market (2026) solves one side of this tension and bolts on the other.

Sinta was designed from the interview outward. The 2022 engagement with two founders produced five interconnected flows -- builder, scheduling, live interview, review, scorecard -- all designed from scratch in one month. The core insight: give interviewers a way to capture structured data during a live call without breaking eye contact with the candidate, then surface everything in one place for review.

This build is a showcase implementation: real code, real architecture, production-quality frontend. It demonstrates that Rob can design a complete product from first principles and ship it. The audience is hiring managers, engineering directors, and design leaders evaluating Rob's portfolio. The code is the artifact, not a prototype.

If the product direction shifts toward commercial viability, the architecture supports it -- the data layer is structured as loader-shaped functions that swap from static JSON to a real backend without changing the component layer.

---

## Target Audience

**Primary (portfolio audience):** Recruiters, UX managers, engineering directors, CEOs, and engineers evaluating Rob's ability to design and build production-quality software. They will inspect the code, navigate the flows, and judge the architecture.

**Secondary (hypothetical end user):** Hiring teams at small-to-mid companies (10-500 employees) who need structured interviewing without enterprise ATS overhead. Companies currently duct-taping Zoom + Google Docs + spreadsheets, or using Greenhouse/Lever but frustrated by the fragmentation between interview and evaluation.

---

## Core Value Proposition

Five interconnected flows designed from scratch and implemented as a real application. Not a component library demo, not a design system exercise -- a product that solves a real problem end-to-end.

The competitive landscape shows that no single tool owns the full interview experience with the design quality of a modern SaaS product. Greenhouse is powerful but visually dated. Ashby is modern but grew from ATS outward. BrightHire is intelligence-only. Sinta was designed from the interview moment outward -- the live call, the real-time annotation, the review where all evidence lives in one glance.

---

## What This Is Not

- Not a live production SaaS (no backend, no auth, no real data)
- Not a Honeywell APM recreation or Keytrn clone -- distinct product, distinct design system
- Not a design-only case study -- the code is the artifact
- Not a framework demo -- the framework serves the product
- Not a video conferencing tool -- Sinta would integrate with Zoom/Meet, not replace them
- Not an ATS -- Sinta focuses on the interview experience, not the full hiring pipeline

---

## Origin Story

Rob Jones designed Sinta in 2022 as a freelance engagement found on Upwork. Two founders, one month, $35/hr part-time, zero existing screens. The founders had a clear vision but no visual language, no flows, no product to reference.

Rob worked directly from founder conversations. No user research. Each flow started as a discussion and became screens the founders could react to. The live interview screen took the most iteration -- the challenge was input density during a live video call.

The founders implemented the designs and were actively pitching investors when Rob left for Honeywell. A design agency (arounda.agency) was later brought in to build on Rob's foundation. Sinta is still operating as of early 2026.

Rob's self-critique: "I designed entirely from founder conversations, no user research. The live interview screen especially would have benefited from watching real interviewers run sessions. Instinct isn't evidence."

This build is the version Rob would have built if he had the time, the research, and the development capability in 2022.

---

## Seven Principles

These are Investiture defaults. They are non-negotiable within the skill chain.

### 1. Intent Before Implementation
Read VECTOR.md before writing code. Understand what the project is, who it serves, and what constraints exist. Code that contradicts intent is wrong regardless of how clean it is.

### 2. Doctrine is Source of Truth
VECTOR.md defines what to build and why. ARCHITECTURE.md defines how. CLAUDE.md defines working context. When code and doctrine disagree, doctrine wins -- update the code or update the doctrine, but never let them drift apart.

### 3. Explicit Over Implicit
State your conventions. Declare your layers. Name your constraints. A principle that exists only in the operator's head is a principle that will be violated.

### 4. Evidence Over Instinct
Research artifacts live in `/vector/`. Decisions reference evidence. "I thought it would be better" is not a rationale. "Competitive analysis showed X" is. This principle is personally meaningful to this project -- Rob's original Sinta engagement had no user research, and he identified that as the one thing he would change.

### 5. Minimal Viable Surface
Do not build what was not asked for. Do not abstract what is used once. Do not add configurability that has one configuration. The right amount of code is the least that works.

### 6. Reversible Defaults
Prefer choices that can be changed later. Hardcoded values over premature config files. Direct imports over indirection layers. Simple state over state management libraries. Escalate complexity only when simple fails.

### 7. Compound Knowledge
Every research artifact, decision record, and audit improves the next one. The `/vector/` directory is not busywork -- it is the project's memory. Skip it and you restart from zero every session.

---

## Design Principles

These are informed by competitive analysis of Greenhouse, Ashby, Lever, BrightHire, and current SaaS design trends (Linear, Superhuman, GitHub). See `/vector/research/competitive/` for evidence.

### 1. Professional density over decorative space
This is a tool people sit in for hours reviewing candidates. Every pixel earns its place. No frosted glass, no gradient backgrounds, no pill-shaped everything. The 2022 Sinta designs used warm gradients, frosted glass cards, and 40px border radii -- that visual language reads as 2020 startup, not 2026 professional tool. The competitive landscape (Ashby, Linear) has moved toward clean surfaces, semantic color, and tight spacing.

### 2. Semantic color only
The primary teal is for actions and active states. Green, amber, red are for status. Everything else is neutral. Color means something or it is not used. This follows the LCH/OKLCH trend in modern design systems (Linear reduced 98 color variables to 3 by using semantic naming). Competency categories and question types get distinct but muted tints -- the same approach BrightHire uses for category badges.

### 3. Dark and light from day one
Extended-session tools require both modes. CSS custom properties swap on `.dark` class. No mode is an afterthought. Linear and Superhuman are dark-first; Ashby and Greenhouse are light-first. Sinta supports both equally with a persistent dark sidebar (same as Linear, Notion).

### 4. Component classes over inline styles
Reusable patterns live in `@layer components` in global.css. Tailwind utilities compose around them. This follows the shadcn architecture pattern -- separate structure from styling, use CSS layers for systematic customization. Not a utility-only project.

### 5. The layout is the product
Sidebar navigation, sticky headers, two-panel and three-panel layouts communicate what Sinta is before a single label is read. The information architecture does the work. This is the design principle that differentiates Sinta from tools that bolt interview features onto a generic dashboard shell. The three-column review screen, the timeline builder, the video + questions + competencies layout -- these are the product.

### 6. The live moment is sacred
From the original design decision: "The live moment is the moment that can't be recovered. Anything that interrupts it is a cost." The live interview screen prioritizes the video call and provides one-tap shortcut buttons for annotation. No forms, no typing, no tab-switching during the call. All detail gets added during post-interview review. This aligns with where BrightHire and Pillar are heading -- real-time guides that minimize interviewer cognitive load.

---

## Constraints

- JavaScript only (no TypeScript) -- reduces friction for a showcase project
- No backend -- static JSON through loader-shaped functions, swappable if commercial
- No auth -- the app demonstrates the interview flow, not a login screen
- Same stack as Keytrn and APM (React 19, React Router 7, Vite, Tailwind v4) -- consistency across portfolio
- Inter font family -- professional, dominant SaaS typeface, no licensing risk
- Lucide icons -- consistent stroke weight, tree-shakeable, MIT license
- 8px base border radius -- matches modern SaaS trend (shadcn default), not the 20-40px pills from 2022
- No new dependencies without justification -- the dep list is intentionally minimal

---

## Three Original Design Decisions

These are from the 2022 engagement and remain the product's architectural backbone. See `INTERVIEW-001-sinta-engagement.md` for full context.

### 1. Shortcut buttons over forms for live annotation
**Problem:** Interviewers need to capture structured notes during a live call without breaking eye contact.
**Decision:** One-tap shortcut buttons to timestamp a competency or reaction instantly. No typing during the call.
**Why:** "The live moment is the moment that can't be recovered. Anything that interrupts it is a cost. The shortcuts had to feel like a reflex, not a tool."
**Market validation:** BrightHire's real-time interview guides and Pillar's live coaching overlay confirm this direction. The industry is converging on "less UI during the call, more intelligence after."

### 2. Three columns: everything in one screen
**Problem:** Post-interview review requires three reference points: video, transcript + JD, and evaluation form. Switching tabs fragments the review.
**Decision:** Three-column layout. Video/timestamps left, transcript/JD center, evaluation/candidate right.
**Why:** "Reviewers make better evaluations when they can see the evidence and the scorecard in the same glance."
**Market validation:** GitHub's PR review added docked side panels (2025-2026) for the same reason -- co-located context reduces errors. Superhuman uses a similar density approach.

### 3. Modular stages over fixed templates
**Problem:** Hiring pipelines vary by company and role. Fixed templates force workarounds.
**Decision:** Stage-based builder where each type has its own configuration. Teams build the pipeline they actually run.
**Why:** "Making pipeline structure visible and editable upfront differentiated Sinta from ATS tools where customization is buried in settings."
**Market validation:** Every ATS (Greenhouse, Ashby, Lever) has a pipeline builder now. The differentiation is in how visible and direct the building experience is.

---

## Quality Gates

- [ ] Interview Builder: drag-and-drop stages, template presets, stage configuration panel, interviewer assignment, reorderable pipeline, responsive
- [ ] Scheduling: calendar date picker, time slot selection, interviewer/candidate assignment, timezone handling, meeting details
- [ ] Live Interview: video layout with PiP, questions panel with categories, competency shortcut buttons, recording indicator, reaction capture, control bar
- [ ] Post-Interview Review: three-column resizable layout, video replay with timestamps, transcript with speaker identification, question-by-question rating, notes area, back/next navigation, hire/no-hire decision
- [ ] Scorecard: data table with interview rounds, star ratings, reaction counts, competency grids, interviewer avatars, candidate profile sidebar, pass/fail actions
- [ ] Dashboard: stat cards, recent activity table, status badges
- [ ] Cross-flow: consistent design system tokens, dark/light mode, sidebar navigation, flow stepper context, keyboard navigation, screen reader accessible

---

## Research Status

| Category | Location | Status |
|----------|----------|--------|
| Interviews | ./vector/research/interviews/ | Complete -- INTERVIEW-001 documents full engagement context |
| JTBD | ./vector/research/jtbd/ | Not started |
| Personas | ./vector/research/personas/ | Not started |
| Competitive | ./vector/research/competitive/ | Complete -- 001 (9-platform landscape), 002 (SaaS UX patterns) |
| Assumptions | ./vector/research/assumptions/ | Not started |
| Decisions | ./vector/decisions/ | Not started |
