# ADR-003: Categorical Color System -- Saturation Split Strategy

**Status:** Accepted
**Date:** 2026-04-13
**Decision makers:** Rob Jones

## Context

Sinta has two overlapping categorical color systems that coexist in the Interview Builder:

1. **Stage type colors** -- 7 interview stage types (Screening, Single, Panel, Debrief, Assessment, Presentation, Case Study) that appear as left-bar accents on pipeline cards and icon tints.

2. **Signal category colors** -- 4 competency signal categories (Technical, Behavioral, Values, Risk) that appear as dots in the Signal Matrix, icon tints in signal lists, and badges in pickers.

Both systems previously abused semantic tokens (`--color-primary`, `--color-warning`, `--color-success`, `--color-danger`), causing visual collisions where the same color meant "Panel Interview" in one context and "Risk flag" in another. Multiple stage types shared the same color (Single, Presentation, and Case Study all used `--color-primary`).

## Decision

**Saturation split strategy:** Stage type colors use muted saturation (~30% HSV). Signal category colors use vivid saturation (~70% HSV). The 30-50 point saturation gap creates two distinct visual registers that are instantly distinguishable even when both appear in the same view.

This follows the pattern used by Linear, Asana, and Notion where structural/categorical colors are desaturated and semantic/status colors are vivid.

### Stage Type Colors (muted/structural)

| Stage | Token | Dark hex | Light hex |
|---|---|---|---|
| Screening | `--color-stage-screening` | #b6c17d | #8a9644 |
| Single Interview | `--color-stage-single` | #94bc80 | #5e9348 |
| Panel Interview | `--color-stage-panel` | #7dc1bf | #4a9795 |
| Debrief | `--color-stage-debrief` | #8b8bc6 | #6060a3 |
| Assessment | `--color-stage-assessment` | #ab8bc1 | #7d5a9e |
| Presentation | `--color-stage-presentation` | #c18bbd | #9e5a98 |
| Case Study | `--color-stage-case-study` | #c68fa6 | #a3607e |

### Signal Category Colors (vivid/semantic)

| Category | Token | Dark hex | Light hex |
|---|---|---|---|
| Technical | `--color-signal-technical` | #47AAED | #2d7ec0 |
| Behavioral | `--color-signal-behavioral` | #F0A030 | #c07d1a |
| Values | `--color-signal-values` | #42C78A | #2a9e6a |
| Risk | `--color-signal-risk` | #E85555 | #c43c3c |

## Research basis

- NNG: Practical limit for categorical color coding is 6-8 hues. 11 total requires a second visual dimension (saturation).
- Okabe-Ito/Wong palette (Nature Methods, 2011): Vary hue AND lightness. Red-zone and green-zone must differ in luminance by 1.5x+.
- Dark mode guidance: Reduce saturation ~20 HSL points vs light mode to prevent optical vibration on dark backgrounds.
- All pairs pass WCAG 3:1 contrast for graphical elements on #111315.
- All red/green pairs have 1.8x+ luminance ratio (colorblind safe).

## Consequences

- Semantic tokens (`--color-success`, `--color-danger`, etc.) return to their proper job: form validation, toast messages, system status.
- Each stage type is now visually unique (no more three types sharing teal).
- Signal categories carry through consistently: blue dots = Technical, amber dots = Behavioral, green dots = Values, red dots = Risk.
- Brand gold (#ffc802) remains exclusive to CTAs and the sidebar active bar.
