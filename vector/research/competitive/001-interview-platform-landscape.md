# Competitive Landscape: Interview Management Platforms

**Date:** 2026-04-12
**Category:** Interview management, ATS interview modules, interview intelligence

---

## Market Context

The recruitment software market is projected at ~$3.77B in 2026 (~7.85% CAGR). The video interview sub-segment alone was $511M in 2024. The category fragments into three layers:

1. **Full ATS with interview modules** -- Greenhouse, Lever, Ashby
2. **Standalone interview intelligence** -- BrightHire, Metaview, Pillar (acquired)
3. **Specialized point solutions** -- Karat (technical interviews), Guide (scheduling), HireVue (assessments)

---

## Platform Analysis

### Greenhouse
- **Position:** Industry standard for structured hiring methodology
- **Interview features:** Structured interview kits, mandatory 5-point scorecards, focus attributes per competency, auto-generated scorecards by role
- **Video:** Integration only (Zoom, Meet). No native recording/transcription.
- **Post-interview:** Interviewers submit scorecards with ratings + written feedback. Aggregated view for hiring managers.
- **Pricing:** Custom. ~$5K/yr small teams, $12-18K mid-market, $70K+ enterprise.
- **Moat:** Deepest structured hiring methodology. 400+ integrations. Enormous switching cost once configured.
- **UX note:** Functional but not modern. Often criticized as cluttered. Traditional sidebar nav.

### Lever (Employ)
- **Position:** Combined ATS + CRM for candidate nurturing
- **Interview features:** Interview kits, automated scheduling, AI Interview Companion (from Pillar acquisition, March 2025), interviewer effectiveness analytics
- **Video:** Integration-based. Pillar acquisition added native AI recording/transcription.
- **Post-interview:** Feedback forms, interviewer effectiveness compared to hire outcomes.
- **Pricing:** Custom. ~$6K/yr small, up to $144K enterprise.
- **Moat:** CRM + ATS in one. Pillar acquisition gives native interview intelligence. Part of Employ (also Jobvite, JazzHR).
- **UX note:** Historically praised for clean design. Candidate-centric view.

### Ashby
- **Position:** All-in-one for data-driven hiring teams, modern UX
- **Interview features:** Native AI Notetaker (Sept 2025), advanced scheduling, bias controls (hidden feedback until submitted), fraudulent candidate detection
- **Video:** Native. Built-in recording + AI summaries. Key differentiator vs. Greenhouse.
- **Post-interview:** AI summaries, bias-prevented feedback, analytics layer.
- **Pricing:** $400/mo base. Per-employee pricing.
- **Moat:** Modern UX + native analytics + all-in-one. Startup darling.
- **UX note:** Most visually polished ATS. But complexity growing -- 14 tabs in scheduling settings alone.

### BrightHire
- **Position:** Interview intelligence layer (record, transcribe, analyze)
- **Interview features:** Real-time interview guides during live calls, AI notes/highlights, compensation redaction, Ask Assistant (search all interview data), Interview Coaching Agent
- **Video:** Records via Zoom/Teams integration. Not a video platform itself.
- **Post-interview:** AI summaries, full transcript search, team review without attending.
- **Pricing:** $15K/yr small teams to $100K+ enterprise.
- **Moat:** Depth of intelligence. Coaching features. Zoom partnership (strategic investment Nov 2025).
- **UX note:** Overlay/companion model -- sits alongside video tool as side panel.

### HireVue
- **Position:** Enterprise video interviewing + AI assessment at scale
- **Interview features:** One-way (async) video, live video, AI assessment (25K data points per interview), 1,000+ I-O psychologist-built interview guides, game-based evaluations
- **Video:** Core product. Both live and async. Async is their signature.
- **Post-interview:** AI scoring and ranking. Asynchronous review.
- **Pricing:** $35K-$145K+/yr. Multi-year contracts required.
- **Moat:** 75.7% enterprise market share. One-way video inventor. But faces EU AI Act pressure (emotion recognition banned Feb 2025).

### Metaview
- **Position:** AI interview notes and recruiting intelligence
- **Interview features:** Hiring-specific AI transcription, notes organized by question (not timestamp), customizable output, AI Reports across all conversations
- **Video:** Not a video platform. Integrates with Zoom/Meet/Teams.
- **Post-interview:** AI notes synced to ATS. Question-by-question comparison across candidates.
- **Pricing:** Free (5 interviews), $20/user/mo Core, $50/user/mo Pro. Unusually transparent.
- **Moat:** Cheapest entry point in interview intelligence. Question-organized notes are genuinely useful.

### Karat
- **Position:** Technical interviewing as a service
- **Interview features:** Live technical interviews conducted by Karat's trained Interview Engineers. NextGen Interviews (Dec 2025): human-led, AI-enabled, candidates work on multi-file projects with AI assistant.
- **Video:** Live video is delivery mechanism. Karat conducts the interviews.
- **Pricing:** $200-$450/interview. $150K-$350K/yr for mid-size companies.
- **Moat:** Only platform that conducts interviews for you. 600K+ interview dataset.

### Guide (formerly Resource.io)
- **Position:** AI scheduling + candidate experience
- **Interview features:** Aria AI scheduling agent, interviewer load balancing, skill-based matching, automated training path tracking, candidate self-service portal
- **Video:** Not a video platform. Schedules on Zoom/Meet.
- **Pricing:** Three tiers, custom. Unlimited users.
- **Moat:** Pure scheduling specialization. Customers include MongoDB, Duolingo, Klaviyo.

---

## Emerging Trends

1. **AI transcription + structured notes is table stakes.** Every major platform has it natively or acquired it. Greenhouse is the holdout.
2. **Interview coaching via AI.** BrightHire and Pillar offer automated interviewer feedback from real analysis.
3. **Bias detection.** AI detecting patterns (women interrupted 3x more). Hidden-feedback-until-submitted (Ashby). Properly implemented AI reduces bias 56-61%.
4. **Regulatory pressure.** EU AI Act banned emotion recognition in hiring (Feb 2025). NYC Law 144 requires bias audits. Reshaping HireVue's model.
5. **Fraudulent candidates.** #1 anticipated hiring challenge in 2026. Ashby added detection Sept 2025.
6. **Consolidation.** Employ acquired Pillar. Zoom invested in BrightHire. Standalone intelligence being absorbed.
7. **Async video declining.** Mid-market trending toward live + AI capture over one-way recording. Candidate experience push works against async.

---

## Common Pain Points

1. **Scheduling is the #1 operational bottleneck.** Teams using automated scheduling are 1.6x more likely to hit hiring goals.
2. **Tool fragmentation.** Sourcing, assessment, scheduling, CRM, ATS in separate tools.
3. **Time-to-hire increasing.** 60% of companies reported increases in 2025.
4. **Candidate communication gaps.** Over 50% of candidates cite lack of communication as primary frustration.
5. **Tools feel limiting.** Even tech-forward orgs feel constrained.

---

## Standard UX Patterns in Category

- **Navigation:** Left sidebar dominant (Greenhouse, Ashby, Lever). Top-level: Jobs, Candidates, Pipeline, Reports, Settings.
- **Pipeline:** Kanban board with drag-and-drop candidate cards between stages.
- **Candidate detail:** Centralized profile aggregating resume, interview history, feedback, notes. Split-pane common.
- **Scorecard:** Dedicated submission flow post-interview. 4-5 point scales. Written feedback per competency. Aggregate view showing all interviewer ratings side by side.
- **Scheduling:** Calendar integration, availability matching, self-service booking links.
- **Analytics:** Pipeline funnel, time-in-stage, source effectiveness, interviewer performance.

---

## Where Sinta Fits

Sinta's original insight -- capturing structured data during a live call without breaking eye contact -- aligns with where the market is heading (BrightHire's real-time guides, Pillar's live coaching, Ashby's native recording). The difference: Sinta designed the entire experience as one cohesive product rather than bolting intelligence onto an existing ATS.

The competitive landscape validates the five-flow architecture: builder, scheduling, live interview, review, scorecard. Every major platform has versions of these. Sinta's differentiation is the interaction design within each flow -- particularly the shortcut-based live annotation and the three-column review density.
