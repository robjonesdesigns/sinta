# ARCHITECTURE.md — Sinta HR

**Last Updated:** 2026-04-12

This file is the technical specification for Sinta HR. For philosophy, intent, and audience, read VECTOR.md. For working context and prohibitions, read CLAUDE.md.

---

## Layers

| Layer | Location | Rule |
|-------|----------|------|
| Pages | `src/pages/` | Route-level components. One per route. Compose from layout and UI components. Own page-level state. |
| Layout | `src/components/layout/` | Shared structural components: Sidebar, Layout, PageHeader. Rendered once, wrap all pages. |
| UI | `src/components/ui/` | Reusable, self-contained components. No page-specific logic. Accept props, render UI. |
| Hooks | `src/hooks/` | Shared React hooks. Stateful logic extracted from components. |
| Data | `src/data/` | Static mock data. Structured as if sourced from API responses. |
| Styles | `src/styles/` | Design system: tokens, resets, component classes. Single file: global.css. |

---

## Import Direction

```
Pages → Layout, UI, Hooks, Data
Layout → UI, Hooks
UI → Data (read-only, for type references)
Hooks → (standalone, no component imports)
Data → (standalone, no imports from other layers)
Styles → (consumed via CSS, no JS imports except in main.jsx)
```

**Rule:** Imports flow downward. Pages import everything. UI components never import from Pages. Hooks never import from components. Data never imports from anything.

---

## Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | React 19 | Consistent with Keytrn and APM. Three projects on one stack shows depth. |
| Router | React Router 7 | SPA mode. BrowserRouter with nested routes inside Layout. |
| Build | Vite 8 | Fast dev server, simple config, same as other projects. |
| Styling | Tailwind CSS v4 | @tailwindcss/vite plugin. No config file. @theme block in global.css. |
| Icons | Lucide React | Tree-shakeable, consistent stroke weights, MIT license. |
| Linting | ESLint 9 | Flat config. React hooks + refresh plugins. |

---

## Project Structure

```
sinta/
├── VECTOR.md                    # Doctrine: intent, audience, principles
├── CLAUDE.md                    # Working context for agents/contributors
├── ARCHITECTURE.md              # This file: technical specification
├── index.html                   # Entry HTML, theme init script (FOUC prevention)
├── vite.config.js               # Vite + React + Tailwind plugins
├── package.json                 # Dependencies and scripts
├── eslint.config.js             # ESLint 9 flat config
├── public/
│   └── favicon.svg              # Brand icon
├── vector/                      # Research artifacts (Investiture)
│   ├── research/
│   │   ├── interviews/
│   │   ├── jtbd/
│   │   ├── personas/
│   │   ├── competitive/
│   │   └── assumptions/
│   ├── schemas/
│   ├── decisions/
│   └── audits/
└── src/
    ├── main.jsx                 # Entry: StrictMode, global.css import
    ├── App.jsx                  # BrowserRouter + Routes (7 routes inside Layout)
    ├── styles/
    │   └── global.css           # Complete design system (@theme, @layer base, @layer components)
    ├── hooks/
    │   └── useTheme.js          # Dark/light toggle, localStorage, system preference
    ├── data/
    │   └── stages.js            # Stage types, interviewers, templates (mock data)
    ├── components/
    │   ├── layout/
    │   │   ├── Layout.jsx       # Sidebar + Outlet wrapper
    │   │   ├── Sidebar.jsx      # Collapsible nav, theme toggle, route links
    │   │   └── PageHeader.jsx   # Title + search + children slot
    │   └── ui/
    │       ├── FlowStepper.jsx  # 6-step progress indicator
    │       ├── StageCard.jsx    # Draggable stage with grip handle + icon
    │       ├── StageDetailPanel.jsx  # Interviewer assignment, question set config
    │       ├── TemplateSelector.jsx  # Preset template buttons
    │       ├── Timeline.jsx     # Drop zone + connected stage nodes
    │       └── TimelineNode.jsx # Colored icon node with remove button
    └── pages/
        ├── Dashboard.jsx        # Stat cards + activity table
        ├── Builder.jsx          # Interview pipeline builder (drag-and-drop)
        ├── Scheduling.jsx       # [placeholder]
        ├── Interview.jsx        # [placeholder]
        ├── Review.jsx           # [placeholder]
        ├── Scorecard.jsx        # [placeholder]
        └── Candidates.jsx       # [placeholder]
```

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase.jsx | `StageCard.jsx` |
| Hooks | camelCase.js, prefixed with `use` | `useTheme.js` |
| Data files | camelCase.js | `stages.js` |
| CSS classes | kebab-case | `.stage-card`, `.btn-primary` |
| CSS variables | kebab-case with `--color-` or `--font-size-` prefix | `--color-primary`, `--font-size-base` |
| Directories | kebab-case | `src/components/ui/` |

---

## Styling Architecture

### Token System
All design tokens live in the `@theme` block in `src/styles/global.css`. Tokens define:
- Spacing (1px base -- `gap-8` = 8px)
- Border radius (sm/md/lg/xl/full)
- Shadows (xs/sm/md/lg)
- Type scale (xs through 3xl)
- Font families (Inter sans, JetBrains Mono mono)
- Transitions (fast/base/slow)
- Sidebar dimensions (collapsed/expanded)

### Color System
CSS custom properties on `:root` (light) and `.dark` (dark). Semantic naming:
- **Background:** bg, bg-subtle, bg-muted, bg-inset (lightest to darkest)
- **Surface:** surface, surface-raised, surface-overlay (card backgrounds)
- **Border:** border, border-subtle, border-strong
- **Foreground:** fg, fg-secondary, fg-tertiary, fg-inverse
- **Primary:** primary (#0d7377 light / #2db5b9 dark), primary-hover, primary-subtle, primary-fg
- **Status:** success/warning/danger with subtle background variants
- **Sidebar:** Separate token set (sidebar-bg, sidebar-fg, sidebar-fg-active, sidebar-border, sidebar-hover)

### Component Classes
Defined in `@layer components`. Current inventory:
- **Buttons:** btn, btn-primary, btn-secondary, btn-ghost, btn-danger, btn-sm, btn-lg
- **Cards:** card (bordered), card-raised (bordered + shadow)
- **Inputs:** input (with focus ring)
- **Badges:** badge + badge-neutral/primary/success/warning/danger
- **Table:** table-row, table-header (grid-based)
- **Layout:** sidebar, sidebar-item, page-shell, page-header, page-content
- **Builder:** stage-card, timeline-dropzone, timeline-node, stepper-dot
- **Utility:** divider-v, divider-h, avatar (sm/lg/xl), section-label, star-filled/star-empty, animate-in

### Rules
1. Repeating patterns become component classes in global.css.
2. One-off adjustments use Tailwind utility classes.
3. Component classes and utilities compose together: `card p-16` is valid.
4. No CSS modules. No styled-components. No component-scoped CSS files.
5. No hardcoded colors outside the token system.

---

## State Management

React built-in only. No external state library.

- **Page-level state:** `useState` in page components (e.g., Builder tracks placed stages)
- **Shared hooks:** `useTheme` for dark/light mode (localStorage + system preference)
- **Prop drilling:** Components receive data and callbacks via props
- **No Context providers:** If cross-component state becomes necessary (e.g., a global interview session), add a focused Context. Do not add a state management library.

---

## Routing

React Router 7, BrowserRouter mode (client-side SPA).

```
/                  → Dashboard.jsx
/builder           → Builder.jsx
/scheduling        → Scheduling.jsx
/interview         → Interview.jsx
/review            → Review.jsx
/scorecard         → Scorecard.jsx
/candidates        → Candidates.jsx
```

All routes render inside `Layout.jsx` (Sidebar + Outlet). PageHeader is per-page, not in the layout.

---

## How to Add a Feature

1. **Read VECTOR.md** — verify the feature aligns with project intent.
2. **Identify the layer** — is it a new page, a reusable component, a hook, or data?
3. **Create the file** in the correct directory following naming conventions.
4. **If it needs new CSS patterns** — add component classes to global.css under `@layer components`.
5. **If it needs new tokens** — add to the `@theme` block or `:root`/`.dark` variable blocks.
6. **Wire the route** if it is a new page — add to App.jsx Routes and Sidebar nav items.
7. **Keep components small** — under 200 lines. If a page grows, extract UI into `src/components/ui/`.

---

## What Not to Do

1. **No inline styles for repeating patterns.** Two uses = component class.
2. **No CSS modules or scoped styles.** One design system file.
3. **No TypeScript.** This is a JavaScript project.
4. **No state management libraries.** React state + hooks.
5. **No files over 200 lines.** Split.
6. **No hardcoded colors outside tokens.** Use `var(--color-*)`.
7. **No new dependencies without justification.** The dep list is intentionally minimal.
8. **No data fetching in UI components.** Data lives in `src/data/` and is imported by pages.

---

## Flexible Preferences

These are defaults. Override when the situation demands it, but document why.

- **Prefer component classes over utility-only styling** for anything used more than twice
- **Prefer explicit props over context** until the prop chain exceeds 3 levels
- **Prefer static data that looks like API responses** so the transition to a real backend is a data source swap, not a rewrite
- **Prefer Lucide icons** with strokeWidth 1.75 (navigation) or 2 (UI elements)

---

## Decisions

Architecture Decision Records live in `/vector/decisions/`. Reference them by filename when a choice needs justification beyond a code comment.
