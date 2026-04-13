# Sinta HR -- Claude Context

Rob Jones. Product Designer. Showcase product build demonstrating full design-to-code capability. Originally designed as a freelance engagement in 2022 (1 month, 2 founders, 5 flows from scratch). Now rebuilt with modern architecture and informed by competitive research across 9 platforms in the interview management space.

**Path:** `~/Documents/Dev/sinta/`
**Dev server:** `npm run dev` (Vite, port varies -- check terminal output)
**Stack:** React 19 + React Router 7 + Vite 8 + Tailwind CSS v4 -- JavaScript, no TypeScript

**Doctrine:** `VECTOR.md`, `ARCHITECTURE.md` (this file is the bridge)

**Reading order:** VECTOR.md (what and why) -> CLAUDE.md (this file, working context) -> ARCHITECTURE.md (how)

---

## Zero Vector Principle

All code generation must adhere to VECTOR.md. Before writing code:
1. Read VECTOR.md to understand intent, audience, constraints, and design principles.
2. If a requested change conflicts with VECTOR.md, flag the conflict before writing code.
3. Read ARCHITECTURE.md and follow it.

---

## Stack Summary

| Layer | Technology |
|-------|-----------|
| Framework | React 19.2 |
| Routing | React Router 7 (BrowserRouter, SPA mode) |
| Build | Vite 8 with @vitejs/plugin-react |
| Styling | Tailwind CSS v4 via @tailwindcss/vite |
| Icons | Lucide React (strokeWidth 1.75 for nav, 2 for UI) |
| State | React useState/useCallback (no external library) |
| Data | Static JSON in src/data/ (no backend) |
| Fonts | Inter (system fallback stack) |
| Linting | ESLint 9 (flat config) |

---

## Key Context

### This is a showcase, not a production SaaS
All data is hardcoded in `src/data/`. There is no backend, no auth, no database. The data layer is structured as if real loaders exist so the code reads like a production app. If the product goes commercial, you swap the data source, not the component architecture.

### Competitive context informs design decisions
VECTOR.md documents three original design decisions from 2022 with market validation from 2026 research. Before making UX decisions, check `/vector/research/competitive/` for patterns from Greenhouse, Ashby, BrightHire, and others. The design is not arbitrary -- it is informed by what the market does and where it falls short.

### The live moment is sacred (VECTOR.md Principle 6)
The live interview screen prioritizes the video call. One-tap shortcut buttons for annotation, no forms, no typing during the call. This aligns with BrightHire's real-time guides and Pillar's live coaching -- the industry is converging on minimizing interviewer cognitive load during calls.

### Design system lives in one file
`src/styles/global.css` contains the complete design system: `@theme` tokens, `@layer base` resets, `@layer components` classes. This is the same pattern as Keytrn and APM. Do not create component-scoped CSS files. Do not use CSS modules.

### Tailwind v4 architecture
- `@tailwindcss/vite` in vite.config.js -- no tailwind.config.js
- `--spacing: 1px` in @theme -- numeric utilities map 1:1 to pixels (gap-8 = 8px)
- `@layer base` for resets (critical -- unlayered resets override Tailwind utilities)
- 30+ component classes in @layer components (btn variants, card, input, badge, table-row, sidebar, etc.)

### Dark/light mode
- CSS custom properties on `:root` (light) and `.dark` (dark)
- FOUC prevention via inline `<script>` in index.html
- `useTheme` hook manages toggle + localStorage + system preference listener
- Sidebar is always dark in both modes (separate `--color-sidebar-*` tokens)

### Sidebar navigation
- Collapsed: 64px, icons only
- Expands to 240px on hover via pure CSS (no JavaScript state)
- Labels fade in with opacity transition
- `position: fixed`, overlays content on expand
- Theme toggle and Settings at bottom

### Five core flows
Builder > Scheduling > Live Interview > Post-Interview Review > Scorecard. These are the product's substance. Each gets its own route and is built from small, composable components in `src/components/ui/`.

---

## What Not to Do

- **No inline styles for repeating patterns.** If you use the same styles more than twice, add a component class to global.css.
- **No CSS modules or styled-components.** Everything goes through global.css component classes + Tailwind utilities.
- **No TypeScript.** This project is JavaScript. Do not add .ts/.tsx files.
- **No state management libraries.** React state is sufficient. Do not add Redux, Zustand, Jotai, or Context providers unless a specific flow requires shared state across distant components.
- **No files over 200 lines.** Split them.
- **No hardcoded colors outside the token system.** Use CSS custom properties. The one exception in src/data/stages.js (#e07040 for Panel Interview) should be migrated to a token.
- **No new dependencies without justification.** The dependency list is intentionally short.

---

## Commit Format

```
Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
```

---

## Standup Format

```
## Status — Sinta HR
**Date:** YYYY-MM-DD
**Focus:** [what was worked on]
**Completed:** [bullet list]
**Blocked:** [if any]
**Next:** [what comes next]
```
