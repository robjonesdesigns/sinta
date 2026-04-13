# Sinta Brand Identity (from original Figma)

**Date:** 2026-04-12
**Source:** Figma file msDlvsirb9SJsnkaegBXly, nodes 39:35, 14:40, 14:41, 14:42
**Credit:** AH Design (original brand identity)

---

## Wordmark

Custom "sinta" logotype in Neulius Alt Extra Bold. All lowercase, rounded, heavy weight with generous terminals. The distinctive feature: the dot on the "i" is replaced by a double chevron/play-forward icon, rotated ~45 degrees counterclockwise. This chevron is the core brand mark.

The "a" is single-story with an open counter (circular bowl with visible negative-space circle). All letters have smooth, rounded forms.

## Tagline

"hiring for an innovative tomorrow"

## Color Palette

| Swatch | Hex | Role |
|--------|-----|------|
| Golden yellow | #ffc802 | Warm accent, positive energy |
| Amber/orange | #ff9823 | Warm accent, CTAs |
| Deep teal | #204c53 | Primary brand, wordmark |
| Medium teal | #67aba1 | Secondary teal |
| Light mint | #a6ded4 | Background tint |
| Pale mint | #d4fdf6 | Subtle background |

The palette moves from warm (yellow, orange) to cool (teal spectrum dark to light). The warm-cool balance is the brand's personality -- approachable and human (warm) meets professional and trustworthy (cool).

## Logo Variants

1. Deep teal wordmark on white (primary)
2. Teal wordmark on mint circle background
3. White wordmark on orange circle background
4. White wordmark on darker orange circle background
5. Teal wordmark on light mint circle with decorative ring

## Icon System

Two motifs:
- **Chevron/arrow:** The "i" dot mark used standalone in multiple color combos (teal on mint, orange on yellow, white on teal, etc.). Both circled and freestanding.
- **Phone/handset:** Stylized curved phone icons in teal and orange. Communication theme.

Icons use the full warm+cool palette, mixing tones across backgrounds.

## Typography (original)

- **Logo:** Neulius Alt, Extra Bold (rounded geometric sans-serif)
- **Heading:** Konnect Bold, no tracking
- **Body:** Konnect Light, no tracking

## Integration Plan for Current Build

The current build uses neutral teal (#0d7377 light / #2db5b9 dark) with no warmth. To bring in the brand identity:

1. **Add warm accent tokens:** `--color-accent` (#ffc802) and `--color-accent-hover` (#ff9823) alongside the teal primary
2. **Build the chevron as an SVG component** to replace the plain "S" square in the sidebar logo
3. **Use gold for positive/progressive actions:** Continue buttons, template highlights, success celebrations
4. **Keep teal as the structural primary:** Sidebar active states, links, focus rings, selected states
5. **Add mint tints for subtle backgrounds:** Stage card hover states, empty state containers
6. **Typography stays Satoshi + Inter** (the original Konnect/Neulius were the 2022 brand fonts; Satoshi is the 2026 evolution that maintains the geometric, rounded character while being more contemporary)
