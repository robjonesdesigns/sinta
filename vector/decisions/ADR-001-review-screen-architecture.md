# ADR-001: The Tufte-Inspired "Decision Lab" Review Screen

**Date:** 2026-04-12
**Status:** PROPOSED
**Author:** Rob Jones (Design Director)

---

## Context
The "Review" phase is the highest-stakes moment for an interviewer. They are exhausted, facing cognitive load from the interview they just conducted, and tasked with making a high-stakes decision. The current standard (switching between video, notes, and a separate scorecard) fragments their memory and introduces bias.

## Decision
Implement a three-column **"Decision Lab"** layout that prioritizes **Co-located Context** and **Data Density**.

### Column 1: The Evidence (Left - 30%)
- **Top:** Video Player (Resizable/Expandable).
- **Bottom:** **Reaction Timeline**. A high-resolution Tufte-style sparkline that maps "Sentiment" and "Competency Tags" across the interview duration. Clicking a tag jumps the video and the transcript to that moment.

### Column 2: The Logic (Center - 40%)
- **Top:** **Context Tabs** (Job Description, Candidate Profile, Salary/Equity expectations).
- **Main Area:** **Question & Note Lab**. Each question from the interview is a "card." It shows the question, the AI-generated summary of the answer, and the interviewer's live notes.
- **Interaction:** One-click to "Refine" an AI note or add a manual "Deep Reflection."

### Column 3: The Verdict (Right - 30%)
- **Top:** **Transcript & Search**. A searchable, speaker-identified transcript.
- **Bottom:** **The Decision Matrix**.
    - Aggregated Star Ratings per competency.
    - **Yes / No / Review Later** buttons.
    - **The "Skip" Logic:** A "Skip for now" button that moves the candidate to a "Follow-up" bucket.

---

## Design Principles Applied

1. **Maximize Data-Ink Ratio (Tufte):** Remove all unnecessary borders and decorative space. Use 1px dividers and semantic background shifts (`bg` vs `bg-subtle`) to define boundaries.
2. **"To Clarify, Add Detail" (Tufte):** Don't hide the transcript. Keep it visible alongside the video. The more evidence is visible at once, the less the brain has to "fetch" from memory.
3. **Professional Density (Vignelli):** Use a tight grid. 8px base units. **Satoshi** for high-resolution headers, **Inter** for readability in notes and transcripts.
4. **Frictionless Decision:** The "Yes/No" buttons should be the only "colored" elements in the bottom-right of the Verdict column, using our brand `teal` and `accent` colors.

---

## Color Scheme: "Tufte-Dark" (Draft)
To reduce eye strain during long review sessions, we will introduce a "High-Resolution Dark" palette:
- **Ink:** #090A0B (Deepest background)
- **Paper:** #111315 (Surface background)
- **Ghost:** #1C1F22 (Subtle insets/borders)
- **Active:** #67ABA1 (Teal - Primary)
- **Highlight:** #FFC802 (Gold - Accents/Selection)
- **Text:** #E6E8EB (High readability off-white)
