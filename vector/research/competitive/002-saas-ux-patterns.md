# Modern SaaS UX Patterns for Interview Platforms

**Date:** 2026-04-12
**Purpose:** Inform Sinta's design system and interaction patterns

---

## Sidebar Navigation

**Linear's approach (2025-2026 redesign):**
- Rebuilt sidebar to reduce noise, increase hierarchy and density
- "Inverted L-shape" for global chrome
- Color system migrated from HSL to LCH: 3 variables instead of 98
- Typography: Inter Display for headings, Inter for body

**Standard dimensions:**
- Collapsed: 56-72px (icon-only)
- Expanded: 220-260px (icons + labels)
- Transition: 200-300ms ease
- Collapsed state requires tooltips
- User preference persisted via localStorage

**States:**
- Hover: 5-10% opacity background shift
- Active: filled background or left border indicator
- Focus: 2-3px outline ring (WCAG 2.1 AA)

**Mobile:** Sidebar fails on mobile. Use bottom tab bar (max 5 items), slide-over drawer, or hidden below 768px.

**Cmd+K command palette** as sidebar complement is universal SaaS (Linear, Slack, Notion, Figma, Superhuman, GitHub). Reduces sidebar clutter by stashing infrequent items.

---

## Data-Dense Tables

**Row density levels:**
- Condensed: 40px
- Regular: 48px
- Relaxed: 56px
- User toggles via icon switcher

**Alignment:**
- Text columns: left-aligned
- Numeric columns: right-aligned, monospace typography
- Column separators: max 1px, optional

**Required features:**
- Sticky header for scrollable tables
- Freeze leftmost column for horizontal scroll
- Sort indicator (chevron, not interfering with heading)
- Row selection: checkboxes on hover, bulk action toolbar
- Inline editing: cursor change to signal editability

**Filter patterns:**
- 5-7 facets per results page
- AND across facets, OR within facets
- Dynamic counts on every value
- Progressive disclosure (top 4-6, "Show more")
- Applied filters as removable chips above results

---

## Multi-Step Workflows

**Stepper vs. breadcrumb:**
- Steppers for sequential processes (interview setup)
- Breadcrumbs for hierarchical navigation

**Linear vs. non-linear:**
- Linear: must complete in order (wizard)
- Non-linear: move freely between steps -- suits experienced users and SaaS workflows where steps are independent

**For interview management:** Non-linear is correct. Users may configure scoring before questions, or skip to scheduling. Show: completed, current, upcoming, and error states. 3-6 steps maximum.

---

## Three-Panel Layouts

**Superhuman:** Keyboard-first. List left, sender context right. Full message replaces list on click.

**GitHub PR Review (2025-2026):** File tree left (resizable, with comment/error indicators), diff center (split/unified toggle), docked side panels right (comments, alerts, merge status).

**Implementation:** react-resizable-panels with autoSaveId for localStorage persistence. Collapsible panels with min/max constraints. Mobile fallback: Sheet (bottom drawer) replaces third panel.

**Key insight for Sinta review screen:** Video left, transcript/JD center, evaluation right. All panels resizable. Mobile: stack vertically or use tabs.

---

## Drag-and-Drop Builders

**Visual feedback:**
- Cursor grab/move on hover
- Elevation/shadow on grabbed item
- Transparency on dragged element
- Drop zone: background color change or outline
- Line indicator for exact drop position (Notion pattern)

**Accessibility (required):**
- Tab to navigate, Enter/spacebar to select, arrow keys to move, Escape to cancel
- ARIA: `aria-grabbed`, `aria-dropeffect`
- Screen reader text for all actions
- Non-drag alternatives: right-click menus, up/down buttons

**Touch:** 44px minimum targets. Visible drag handles. Avoid scroll gesture conflicts.

**Recommended library:** @hello-pangea/dnd (maintained react-beautiful-dnd fork) or dnd-kit.

---

## Video + Sidebar Overlay

**Loom pattern:** Video center/left, transcript panel right. Click timestamp to jump. Search within transcript. Chapters as clickable navigation.

**Key pattern for live interview:** Video occupies majority of viewport. Sidebar (notes, scoring, transcript) collapsible and resizable. Video shrinks proportionally when sidebar opens (not overlaid). PiP for when interviewer navigates to scoring. Transcript with clickable timestamps is highest-value sidebar feature for review.

---

## Design System Trends (2025-2026)

**Typography:**
- Inter remains dominant SaaS typeface
- Inter Display for headings, regular Inter for body
- Geist (Vercel) emerging: Swiss design influence, open source
- Variable fonts standard
- Monospace for numeric/data columns

**Color:**
- LCH/OKLCH replacing HSL for perceptual uniformity
- Semantic naming: bg/fg pairs with modifiers (muted, accent, destructive)
- 3-variable theme systems (Linear: base, accent, contrast)

**Dark mode:** Standard offering, not feature. Dark-first for power tools. CSS variable overrides.

**Border radius:** 8px base (shadcn default --radius: 0.5rem). Consistent, moderate. Not pill, not sharp.

**Spacing:** 4px increments (Tailwind scale). Dense defaults for power-user tools. Density toggle for tables.

**Shadows:** Three tiers (sm/default/lg). Subtle, functional. Cards increasingly using background elevation only.

**Animation:** 150ms micro-interactions. 200-300ms panel transitions. Scale 95% for press states.

**Component architecture:** Separate structure/behavior (Radix primitives) from styling (Tailwind). @layer directives. Copy-paste model over package dependency.
