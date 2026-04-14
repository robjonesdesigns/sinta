# Test Report

**Last run:** 2026-04-14
**Runner:** Vitest 4.1.4
**Result:** 106 tests passed, 0 failed

## Summary

| Category | Files | Tests | Status |
|---|---|---|---|
| Data layer | 2 | 42 | Pass |
| Components | 5 | 44 | Pass |
| Pages | 1 | 20 | Pass |
| **Total** | **8** | **106** | **Pass** |

## Data Layer Tests

### stages.test.js (21 tests)
- stageTypes: all 7 exist, required fields (id, label, icon, color, defaultDuration), unique IDs
- getStageType: valid ID returns correct type, invalid returns undefined
- createStageInstance: correct shape, default duration from type, empty signals/interviewers, unique instanceIds, null for invalid typeId
- templates: all 7 exist, required fields, unique IDs, all stage references valid, every template starts with screening

### mock.test.js (21 tests)
- signals: all 14 exist (5 Technical, 4 Behavioral, 4 Values, 1 Risk), required fields, unique IDs, all colors reference CSS custom properties
- personaTemplates: shape validation, unique IDs
- reviewDataset: top-level shape, candidate fields, recording with 60 sentimentMap entries, transcript tags reference valid signal IDs, liveTags reference valid signal IDs, scorecard signals have id/rating/feedback

## Component Tests

### StageListCard.test.jsx (14 tests)
- Renders stage name, duration, interviewer count
- Setup/Ready status pill based on configured flag
- onClick fires with instanceId
- Keyboard activation (Enter and Space)
- Overflow menu delegation (onRemove, onDuplicate)
- Avatar initials rendering, overflow count

### ConfigDrawer.test.jsx (12 tests)
- Header with stage icon and label
- All sections render (Interviewers, Duration, Question Set, Scorecard)
- Duration change fires onUpdate callback
- Embedded vs drawer variant
- Close button, null guard for invalid typeId

### TemplateSelector.test.jsx (8 tests)
- All 7 templates render with labels
- Stage counts per template
- onSelect fires with correct stage type IDs
- Lightning icons, stage dots

### FlowStepper.test.jsx (7 tests)
- All 6 steps render
- Step numbers, check icons for completed steps
- data-state attributes, aria navigation

### SignalMatrix.test.jsx (3 tests)
- Empty state when no stages
- No signal rows when stages array is empty

## Page Tests

### Builder.test.jsx (20 tests)
- Page header and template selector render
- Empty state with "Add your first stage" button
- Loading template populates stages
- Segmented control switches between Details and Signals tabs
- Clicking a stage shows ConfigDrawer
- Clicking same stage deselects it
- Disabled "Continue to Scheduling" when no stages

## Bugs Found and Fixed

- **SignalMatrix.jsx line 42:** Variable shadowing crash. `const signals = signals.filter(...)` shadows the imported `signals`, causing `ReferenceError: Cannot access 'signals' before initialization`. Renamed to `const categorySignals`. This was causing the white screen when switching to the Signals tab with stages loaded.

## Build Verification

- `npx vite build`: Clean (458ms, 0 errors)
- Output: 488.23 kB JS (140.47 kB gzipped), 44.74 kB CSS (8.78 kB gzipped)
