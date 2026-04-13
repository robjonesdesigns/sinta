# Builder UI Patterns: Pipeline/Flow/Step Assembly Interfaces

**Date:** 2026-04-12
**Purpose:** Inform Sinta Interview Builder redesign

---

## Products Researched

### Screener/Survey/Test Builders
- **Maze** -- usability test builder (block-based vertical list)
- **Typeform** -- form builder (left outline + center preview + right config)
- **Notion** -- block system (six-dot handle, slash commands, drop indicators)

### Workflow/Pipeline Builders
- **Greenhouse** -- interview plan builder (vertical stage list, two-tier hierarchy)
- **Ashby** -- interview pipeline builder (sectioned stages)
- **Monday.com** -- workflow automation canvas (open canvas, block-based)
- **Retool Workflows** -- visual builder (infinite canvas, node graph)
- **Zapier** -- zap builder (vertical steps + right config panel + plus-between-steps)
- **Linear** -- workflow configuration (minimal vertical list within categories)

---

## Three Dominant Patterns

### Pattern A: Vertical Block List (Maze, Zapier, Linear)
Best for linear sequences. Vertical stack of cards, each representing a step. Add between via + buttons. Configure via right drawer or inline expansion. Drag to reorder.

### Pattern B: Three-Panel Builder (Typeform)
Left outline (numbered list) + center canvas/preview + right configuration panel. Best when preview of the end result matters during construction.

### Pattern C: Open Canvas / Node Graph (Monday.com, Retool)
Infinite 2D canvas with blocks connected by lines. Best for complex branching logic. Overkill for linear sequences. Retool notes canvas becomes hard to navigate with many nodes.

**Recommendation for Sinta: Pattern A (vertical block list) with a right configuration drawer.** Interview pipelines are inherently linear. No branching, no 2D canvas needed. The vertical list naturally shows order (top to bottom = first to last).

---

## Eight Key Patterns to Adopt

### 1. Six-Dot Drag Handle on Hover (Notion)
- Handle invisible at rest, appears on hover at left edge of block
- Cursor: default > grab (handle hover) > grabbing (during drag)
- Handle area minimum 24x32px for comfortable clicking
- Dual purpose: (1) drag to reorder, (2) click for context menu

### 2. Plus Button Between Cards (Zapier)
- + icon appears on the vertical connector line between two steps
- Persistent (Zapier) or on-hover (cleaner)
- Click opens popover/dropdown with available step types
- Smooth opacity transition (0 to 1, ~150ms)
- Connector line uses subtle dashed or solid style

### 3. Right-Side Configuration Drawer (Zapier, Typeform)
- Card stays collapsed in list; full config opens in right drawer
- Preserves list overview during deep configuration
- Width 320-400px for form-heavy config
- Clear header with step type icon + name + close button
- Tab organization for complex config (Zapier: Setup/Configure/Test)
- Transition under 300ms with consistent easing
- Touch targets minimum 48x48px within drawer

### 4. Stage Card Collapsed State (Synthesized)
Shows at a glance:
- Stage type icon (left, colored by type)
- Stage name/title (primary text, 14-16px medium weight)
- Key metadata: duration + interviewer count (12-13px, muted)
- Status indicator: configured (checkmark) vs needs setup (warning dot)
- Drag handle (left, on hover)
- Overflow menu (right, on hover): Edit, Duplicate, Delete
- 3px left border accent in stage type color (like Kanban category indicator)

### 5. Drop Indicator Feedback (Notion)
- 2px solid line in primary brand color at insertion point
- Full width of drop zone
- Surrounding items shift with transform: translateY() + 200ms ease transition
- Dragged card becomes semi-transparent (opacity ~0.5) with subtle shadow

### 6. Empty State (NN/g, Carbon Design System)
Three elements required:
1. Clear message ("No interview stages yet")
2. Learning cue ("Build your interview pipeline by adding stages")
3. Action pathway ("+ Add your first stage" as prominent button)

### 7. Visual Polish Details
- Transitions: 150-200ms for hover/active/drag/expand. Under 300ms feels responsive.
- Shadows: Soft, layered, only during drag elevation. Borders or bg at rest.
- Spacing: 8px between cards, 16px internal card padding (Linear's 8px grid)
- Borders: 1px solid neutral at rest. 2px solid primary for selected/active.
- Typography: Title (14-16px, medium weight) + metadata (12-13px, regular, muted)
- Connector lines: 1px neutral vertical line between cards with + centered on it

### 8. Configuration vs Quick Setup Tension
- Default to quick: clicking a stage type from the + popover creates it with sensible defaults
- Deep config is opt-in: click the created card to open the right drawer
- Status indicators show which stages need attention vs which are fully configured
- Templates (pre-built stage configurations) eliminate setup for common patterns

---

## Recommended Layout for Sinta

Two-panel: vertical stage list (main) + right configuration drawer (on demand).

No left palette needed -- with only 6 stage types, a popover from the + button is sufficient and eliminates an unnecessary panel.

```
+------------------------------------+--------------------+
|         STAGE LIST                 |  CONFIG DRAWER     |
|         (main area)                |  (right, on click) |
|                                    |                    |
|  [::] Screening Call     60m  2p   |  Stage Name        |
|         |                          |  Duration          |
|        [+]                         |  Interviewers      |
|         |                          |  Questions         |
|  [::] Technical Interview 90m 3p  |  Scorecard         |
|         |                          |                    |
|        [+]                         |                    |
|         |                          |                    |
|  [::] Panel Interview   60m  4p   |                    |
|         |                          |                    |
|        [+]                         |                    |
|         |                          |                    |
|  [::] Debrief           30m  3p   |                    |
|                                    |                    |
|  [+ Add stage]                     |                    |
+------------------------------------+--------------------+
```

---

## Accessibility Requirements for Drag-and-Drop (from earlier research)

These are non-negotiable for a production-quality showcase:

- **Keyboard alternatives:** Tab to navigate between cards, Enter/spacebar to select, arrow keys to move position, Escape to cancel
- **ARIA attributes:** `aria-grabbed="true"` on the dragged item, `aria-dropeffect="move"` on drop zones
- **Screen reader announcements:** Text explanations for all drag actions ("Screening Call moved to position 2 of 4")
- **Non-drag fallback:** Up/down buttons or a right-click "Move to position" menu for users who cannot drag
- **Touch support:** Minimum 44px touch targets on drag handles. Visible drag handles required (unlike desktop where hover-reveal is acceptable). Avoid conflicts with scroll gestures.

Source: Pencil & Paper DnD Best Practices, Eleken DnD UI Examples

---

## Greenhouse Two-Tier Hierarchy Detail (from earlier research)

Greenhouse's interview plan has a critical structural insight: stages contain interviews. This is a two-level hierarchy:

- **Stage** = a broad process phase (e.g., "Technical Assessment")
  - **Interview** = a specific evaluation step within that stage (e.g., "Coding Exercise with Diana", "System Design with Shoaib")

Each stage starts with Application Review and ends with Offer (these are structural and cannot be removed). Everything in between is customizable. You can:
- Create a custom stage
- Select from Greenhouse's stage library
- Copy a stage from another job

Each stage has its own scorecard configuration with focus attributes mapped to competencies. Spring 2025 added auto-fill scorecards with relevant skills/qualifications.

**Implication for Sinta:** Consider whether stages should support sub-steps (multiple interviewers with different scorecards within a single stage). The current flat model (one card = one stage) may be too simple for realistic pipelines.

---

## Maze Block Nesting Insight (from agent research)

Maze's original design forced users to create separate blocks for follow-up configuration. This created confusion. Their redesign moved toward **nesting follow-up questions within mission blocks**, reducing cognitive overhead.

**Direct parallel to Sinta:** Don't separate "stage" and "stage configuration" into different UI elements. The configuration (interviewers, questions, scorecard) should nest within the stage card, accessible via the right drawer. One card = one stage = one configuration surface.

---

## Implementation Library Recommendations (from earlier research)

**Drag-and-drop:**
- `@hello-pangea/dnd` -- maintained fork of react-beautiful-dnd. Best for vertical lists with reorder. Handles keyboard accessibility and screen reader announcements out of the box.
- `dnd-kit` -- more flexible, lower-level. Better if we need complex drop zones or multiple drag types. Used by shadcn projects.

**Resizable panels (for the config drawer):**
- `react-resizable-panels` -- lightweight, supports autoSaveId for localStorage persistence of panel widths, collapsible panels with min/max constraints. Used by shadcn's Resizable component.

**Recommendation:** Start with `@hello-pangea/dnd` for the stage list reorder (simpler API, built-in a11y). Use CSS transitions for the config drawer (no library needed -- just width/transform animation on a fixed-position panel). Only add `react-resizable-panels` if we need user-resizable drawer width.

---

## Connector Line Design Detail

The vertical connector between stage cards serves three purposes:
1. **Visual sequence** -- communicates order without numbering
2. **Plus-button anchor** -- the + appears centered on the line
3. **Drop indicator host** -- the blue drop line replaces the connector at the insertion point during drag

**CSS implementation:**
- `::before` pseudo-element on each card (except first): 1px wide, neutral-300 color, positioned absolutely from top of card extending upward to the bottom of the previous card
- Or: a dedicated `<div>` between cards acting as the connector, with the + button as a child centered via `position: absolute; left: 50%; transform: translateX(-50%)`
- The + button sits at `opacity: 0` by default, `opacity: 1` on connector hover, with a 150ms ease transition

---

## What Makes a Builder Feel "Premium" vs. "Bare Bones" (Synthesized)

**Bare bones (what we have now):**
- Static cards with no state indicators
- No visual connections between items
- No hover-reveal affordances
- Configuration opens as a separate component below the list
- No empty state guidance
- No transitions or animation

**Premium (what to build):**
- Progressive disclosure: handles, menus, and + buttons appear on hover
- Visual connections (connector lines) between cards showing sequence
- State indicators (configured vs. needs setup) on every card
- Right drawer for configuration preserving list context
- Smooth transitions on all state changes (150-200ms)
- Thoughtful empty state with illustration + CTA
- Drag feedback: ghost card, drop indicator line, surrounding cards shift
- Keyboard navigable throughout
- Consistent spacing on 8px grid
- Typography hierarchy within cards (title + metadata)
- Left color bar accent per stage type for quick scanning

---

## Sources

- Greenhouse Interview Plan: https://support.greenhouse.io/hc/en-us/articles/115002194903
- Ashby ATS Platform: https://www.ashbyhq.com/platform/recruiting/ats
- Maze Test Builder: https://maze.co/
- Typeform UI Patterns: https://www.saasui.design/application/typeform
- Monday.com Workflow Builder: https://support.monday.com/hc/en-us/articles/11065311570066
- Retool Workflows: https://retool.com/workflows
- Notion Block System: https://medium.com/@yolu.x0918/a-breakdown-of-notion
- Drag and Drop UX (Eleken): https://www.eleken.co/blog-posts/drag-and-drop-ui
- Drag & Drop Best Practices (Pencil & Paper): https://www.pencilandpaper.io/articles/ux-pattern-drag-and-drop
- SaaS Side Panel Patterns: https://www.saasframe.io/patterns/side-panel
- Greenhouse Scorecard Overview: https://support.greenhouse.io/hc/en-us/articles/4414777492891
- Greenhouse Structured Hiring Guide: https://support.greenhouse.io/hc/en-us/articles/360039539772
- Greenhouse Interview Kit: https://support.greenhouse.io/hc/en-us/articles/115002226746
- Maze Reviews (UXtweak): https://blog.uxtweak.com/maze-reviews/
- dnd-kit Discussion: https://github.com/clauderic/dnd-kit/discussions/639
- React Flow (node-based UIs): https://reactflow.dev/
- SaaS UI Workflow Patterns (GitHub): https://gist.github.com/mpaiva-cc/d4ef3a652872cb5a91aa529db98d62dd
- Notion Help - Writing and Editing: https://www.notion.com/help/writing-and-editing-basics
- Notion Block Drag Handle (Obsidian plugin): https://github.com/wepee/obsidian-block-drag-drop
