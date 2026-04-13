# SPEC-002: The 6-Screen Technical Blueprint

**Date:** 2026-04-13
**Status:** DRAFT
**Author:** Sinta Lead Architect

---

## 1. Dashboard (The Hiring Health Command)
*   **Goal:** Surface "Pipeline Friction" and "Signal Gaps."
*   **Key Components:**
    *   `SignalHealthWidget`: Shows % of pipeline stages with assigned competencies.
    *   `SubmissionVelocity`: Chart showing time from interview to scorecard.
    *   `ActiveHiresTable`: Dense Vignelli grid of candidates with "Signal Heatmap" sparks.

## 2. Matrix Builder (The Signal Architect)
*   **Goal:** Map competencies to the interview loop.
*   **Key Components:**
    *   `SignalMatrixGrid`: Horizontal scrollable grid. Rows = Desired Signals; Cols = Stages.
    *   `StageAnatomyPanel`: (Right Pane) Detailed config for the selected stage.
    *   `TemplateLibrary`: One-click loading of `personaTemplates`.

## 3. Scheduling (The Frictionless Bridge)
*   **Goal:** Minimize time-to-offer.
*   **Key Components:**
    *   `CandidatePrepCard`: Preview of the automated brief sent to the candidate.
    *   `SlotOptimizedPicker`: Highlight slots that minimize "Interviewer fatigue."

## 4. Live Interview (The Reflex Bar)
*   **Goal:** Zero-distraction capture.
*   **Key Components:**
    *   `VideoNexus`: Centered video feed with minimal chrome.
    *   `ReflexBar`: Semi-transparent footer with keyboard shortcuts for `signals` (e.g., [L] for Logic Leap).
    *   `QuestionFeed`: Auto-scrolling list of questions based on the current stage.

## 5. Decision Lab (The Tufte Evidence Engine)
*   **Goal:** Evidence-based verdict.
*   **Key Components:**
    *   `EvidenceTimeline`: Tufte-style sparkline showing sentiment + signal spikes.
    *   `SyncScrollEngine`: Technical logic to link Column 1 (Video), Column 2 (Notes), and Column 3 (Transcript).
    *   `TranscriptSearch`: High-speed filter that transports video to the result.

## 6. Scorecard (The Verdict)
*   **Goal:** Defensible "Yes/No."
*   **Key Components:**
    *   `SignalDensityChart`: Radar or bar chart showing competency ratings vs. role requirements.
    *   `EvidenceLinker`: UI that allows the author to "attach" a transcript snippet to a rating.
    *   `FinalDecisionModule`: Clear, bold "Yes / No / Follow-up" selectors.
