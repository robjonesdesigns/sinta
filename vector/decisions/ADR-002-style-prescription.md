# ADR-002: Style Prescription (High-Craft Product Design)

**Date:** 2026-04-12 (Updated 2026-04-13)
**Status:** ACCEPTED
**Author:** Rob Jones (Design Director) / Sinta Lead Architect

---

## The Vision
Sinta is a **Professional Instrument**, not a "simple" app. It should feel like a high-performance tool (e.g., Linear, Superhuman) that respects the user's intelligence and time. We are building for "Expert Users" who require high-density information without the cognitive noise of traditional HR software.

---

## 1. The "Third Way" Aesthetic (Light & Dark)
We are moving beyond "Standard White" and "Pure Black."

- **Light Theme:** We use a **"Warm Paper"** base (#FDFDFC) to reduce the clinical feel of HR software. It should feel approachable and human.
- **Dark Theme (Original):** We use a **"Deep Charcoal/Ink"** base (#0B0C0E). This creates a "shadow-capable" environment where subtle depth and hierarchy are possible.
- **The "Endurance Dark" Refinement (2026-04-13):** To support 8-hour "Batch-Review" sessions, we have desaturated and deepened the palette further to minimize pupil strain.

### The "Endurance" Palette Tokens

| Token | Value | Role |
| :--- | :--- | :--- |
| **Ink** | `#090A0B` | Deepest background (The Canvas) |
| **Paper** | `#111315` | Surface background (Cards/Sections) |
| **Ghost** | `#1C1F22` | Subtle borders/dividers (1px only) |
| **Active** | `#67ABA1` | Sinta Teal (Primary Action/Selection - Refined from #204C53) |
| **Highlight** | `#FFC802` | Sinta Gold (Human Moments / Signal Markers) |
| **Text** | `#E6E8EB` | Off-white (High Readability) |
| **Muted** | `#8B95A3` | Secondary text (Metadata/Labels) |

---

## 2. Professional Density (The Tufte/Vignelli Balance)

### Tufte Principles (Data-Ink Ratio)
*   **High Data-Ink Ratio:** 1px borders only. No decorative borders. Use background color shifts (`Ink` vs `Paper`) to define zones.
*   **Smallest Effective Difference:** Hierarchy is established through layering and subtle value shifts, not heavy shadows.
*   **Micro/Macro Readings:** The UI must provide a high-level "Hiring Health" view (Macro) while allowing instant access to a specific transcript line (Micro).

### Vignelli Principles (Information Architecture)
*   **The 8px Grid:** All spacing (padding, gaps, margins) must be a multiple of 8px (8, 16, 24, 32, 64). Everything is mathematically aligned.
*   **Typography:**
    *   **Satoshi (Display):** 700 weight for headers, stats, and "Decision" labels. Geometric, authoritative, high-resolution.
    *   **Inter (Body):** 400/500 weight for transcripts, notes, and secondary data. Maximum readability.
*   **Intentional Contrast:** Use color only for **Signal**. A "Red Flag" or a "Logic Leap" should be the only vivid elements in an otherwise neutral field.

---

## 3. The "Decision Lab" Review Screen (Tufte-Led)
*   **Co-located Context:** The video, notes, and scorecard live in a three-column layout. No tab-switching.
*   **Visual Sparklines:** Use "Reaction Heatmaps" and "Sentiment Bars" on the timeline instead of simple lists.
*   **Interactive Timelines (Sync-Scroll):** Clicking any word in the transcript or any tag in the timeline instantly updates the video playback and the scorecard focus.

---

## 4. The Builder Experience (Vignelli-Led)
*   **Split-Pane Architecture:** The pipeline stays fixed on the left; the "Stage Anatomy" (config) lives on the right. 
*   **Signal Matrix (Horizontal):** A high-density grid where competencies (Rows) are mapped to Stages (Columns).
*   **Visual "Signatures":** Each stage type (Screening, Panel, Presentation) has a distinct color/icon signature that is consistent across the entire platform.

---

## 5. Performance Ethics
*   **Zero-Latency Interactions:** Transitions must be sub-200ms.
*   **Keyboard-First:** Every Vignelli-structured section must have an associated Ashby-style keyboard shortcut.
*   **Defensible Design:** The UI is not arbitrary; every element exists to provide evidence for a hiring decision.
