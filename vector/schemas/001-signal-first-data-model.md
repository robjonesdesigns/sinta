# SCHEMA-001: The Signal-First Data Model

**Date:** 2026-04-13
**Status:** PROPOSED
**Author:** Sinta Lead Architect / Data Engineer

---

## 1. Core Philosophy: The Signal is the Product
In Sinta, **Stages** are just time-blocks. **Competencies** are the goals. **Signals** are the evidence. Our data model must reflect this hierarchy to support the **Matrix Builder** and the **Decision Lab**.

---

## 2. Entity Relationship Diagram (Conceptual)

```
JobPosting 
  ├── Template (The "Loop")
  │     └── StageInstance[] (Screening, Panel, etc.)
  │           ├── Interviewers[]
  │           └── SignalAssignments[] <───┐
  └── CompetencyRequirement[] ────────────┘ (The Matrix Link)

Candidate
  └── InterviewResult[]
        ├── VideoURL (Evidence)
        ├── Transcript[] (High-Resolution Text)
        ├── SignalTags[] (The "Live" timestamps)
        └── Scorecard[] (The "Verdict")
```

---

## 3. The "Signal" Definition
This is the **"Expert Genius"** differentiator. A signal is a specific, observable piece of evidence.

```json
{
  "id": "logic-leap",
  "label": "Logic Leap",
  "category": "Technical",
  "description": "Ability to troubleshoot cascading failures with intuition.",
  "persona": "SRE / Reliability",
  "ui": {
    "icon": "BrainCircuit",
    "color": "#67ABA1",
    "shortcut": "L"
  }
}
```

---

## 4. The "Decision Lab" (Review) Data Contract
To support the **Tufte Sparkline** and **Sync-Scroll**, the data must be highly granular.

```json
{
  "interviewId": "int-789-abc",
  "candidateId": "cand-456",
  "recording": {
    "url": "https://sinta.video/stream/789",
    "duration": 3600, // seconds
    "sentimentMap": [
      { "time": 120, "score": 0.8, "speaker": "candidate" },
      { "time": 240, "score": -0.2, "speaker": "candidate" }
    ]
  },
  "transcript": [
    {
      "time": 12.5,
      "speaker": "Shoaib Knott (EM)",
      "text": "Tell me about the last time your system hit a cascading failure."
    },
    {
      "time": 18.2,
      "speaker": "Candidate",
      "text": "It was 3 AM on a Tuesday...",
      "signals": ["logic-leap", "calm-under-fire"] // The "Live Tag"
    }
  ],
  "tags": [
    { "type": "logic-leap", "time": 18.2, "author": "Shoaib Knott" },
    { "type": "red-flag", "time": 1450.5, "note": "Defensive about test coverage." }
  ]
}
```

---

## 5. The "Matrix Builder" Data Structure
How we store the grid for the **Vignelli-inspired** Builder.

```json
{
  "matrixId": "matrix-pm-standard",
  "rows": ["strategic-vision", "prioritization", "narrative-clarity"], // Competencies
  "columns": ["screening", "case-study", "panel"], // Stages
  "assignments": {
    "strategic-vision": ["case-study", "panel"],
    "prioritization": ["case-study"],
    "narrative-clarity": ["screening", "panel"]
  }
}
```

---

## 6. Implementation Plan: The "Realistic" Mock Data
I will now create `src/data/mockData.js` following this schema. This will populate:
1.  **Dashboard:** With "Signal Leak" metrics.
2.  **Builder:** With "Competency Matrix" presets for all 5 personas (EM, PM, Design, GTM, Ops).
3.  **Review:** With a full "Tufte-Dark" dataset (Transcript, Signals, Video Markers).
