# Design System: Guided Traffic

> **Status:** approved 2026-10-28 as the site's design. Applied on branch `feat/paper-redesign` to
> the home page, nav and footer. All other pages still carry hard-coded colors from the previous
> dark (tasrieit-derived) theme and look mixed until they are migrated.
>
> **Reference:** design language modeled on getartcraft.com (paper palette, visible grid, type
> pairing). Only the language is borrowed — no logo, hero composition, imagery or copy.

The source of truth for every value below is [`frontend/src/styles.scss`](../frontend/src/styles.scss).

---

## Principles

- **Drawing sheet, not dashboard.** A visible frame with hairline sides, section bars and
  crosshair marks. Structure is shown, not hidden behind shadows and gradients.
- **Ink on paper.** No brand hue on surfaces or text, with one exception: the nav "Kontakt"
  CTA keeps the orange of the previous design. Otherwise contrast comes from ink blocks
  (primary buttons, the active nav item) and the always-dark terminal panel.
- **Numbers instead of icons.** Lists, cards and menu entries are numbered `01`, `02`, … in mono.
  No emoji, no icon set.
- **One serif word per heading.** The accent word is wrapped in `<em>` and set in Instrument Serif
  italic; everything else in the heading is wide Archivo.

## Colors

Theme-dependent values (defined in the `theme-light` / `theme-dark` mixins):

| Role | Light | Dark | CSS variable |
|---|---|---|---|
| Paper (page background) | `#f2f1ee` | `#111114` | `--color-paper` |
| Paper deep (hover, alt sections) | `#e9e8e4` | `#1b1b20` | `--color-paper-deep` |
| Ink (text, primary surfaces) | `#101014` | `#f2f1ee` | `--color-ink` |
| Ink soft (hover on ink) | `#2a2a30` | `#d9d8d3` | `--color-ink-soft` |
| Line (hairlines) | ink at `.16` | ink at `.16` | `--color-line` |
| Line strong (link underline, hover border) | ink at `.32` | ink at `.32` | `--color-line-strong` |
| Mark (crosshairs) | ink at `.55` | ink at `.55` | `--color-mark` |
| Text secondary | ink at `.70` — 6.8:1 | ink at `.70` — 9.2:1 | `--color-text-secondary` |
| Text muted | ink at `.60` — 4.7:1 | ink at `.60` — 6.5:1 | `--color-text-muted` |

Constant in both themes:

| Role | Value | CSS variable |
|---|---|---|
| Signal — brand orange from the previous design; ticker dots, terminal arrow, nav "Kontakt" CTA | `#ff6a00` | `--color-signal` |
| Signal hover | `#ea580c` | `--color-signal-hover` |
| Text on signal — always dark: 6.6:1 (white would be 2.9:1) | `#101014` | `--color-on-signal` |
| Terminal background / text — the illustration stays dark | `#0a0a0c` / `#f2f1ee` | `--color-terminal-bg`, `--color-terminal-text` |

The previous semantic names (`--color-bg-primary`, `--color-text-primary`, `--color-accent`,
`--gradient-*`, …) remain as aliases onto this palette so unmigrated pages keep compiling.
Gradient tokens are flat and written as `linear-gradient(c, c)` so they stay valid in both
`background` and `background-image`.

*Deviation from the reference:* getartcraft uses `.42` alpha for muted text (≈2.7:1). We raise it
to `.60` so small mono labels meet 4.5:1.

## Themes

- **Default follows the OS** via `prefers-color-scheme` — pure CSS, no script needed, no flash
  with SSR.
- **Explicit choice** via the half-circle toggle in the nav: [`ThemeService`](../frontend/src/app/services/theme.service.ts)
  sets `data-theme="light|dark"` on `<html>` and stores it in `localStorage` under `gt-theme`.
  A stored choice wins over the OS; without one the toggle label tracks OS changes live.
- **No flash for stored choices:** [`public/theme-init.js`](../frontend/public/theme-init.js) runs
  blocking in `<head>` and applies the stored value before first paint. Its key must match the
  service.
- If storage is blocked, the choice lasts for the current page view and the OS setting applies
  on the next load.

## Typography

| Role | Font | Settings | Variable |
|---|---|---|---|
| Headings `h1`–`h6` | Archivo (variable) | weight 620, `font-stretch: 118%`, letter-spacing −0.035em, line-height 1.02 | `--font-display` |
| Accent word (`h* em`) | Instrument Serif italic | weight 400, normal width, letter-spacing −0.02em | `--font-serif` |
| Body | Inter | 16px, line-height 1.6; lead paragraphs 18px | `--font-sans` |
| Labels, nav, buttons | Geist Mono | 11px, weight 500 (buttons 700), uppercase, letter-spacing 0.15em (buttons 0.12em) | `--font-mono` |

Sizes: `h1` `clamp(2.5rem, 5.6vw, 4.5rem)`, `h2` `clamp(2.25rem, 4.2vw, 3.75rem)`, `h3` 1.5rem
(1.25rem ≤ 768px).

All four fonts are loaded from Google Fonts in [`index.html`](../frontend/src/index.html), which
sets `lang="de"`. German hyphenation is enabled for `h1`/`h2` only, and only for words of 12+
characters (`hyphenate-limit-chars: 12 5 5`) so names like "Kubernetes" never split.

## Layout primitives (global classes)

| Class | What it is |
|---|---|
| `.frame` | Content column, `max-width: 1280px`, 1px hairline left and right |
| `.frame-rule` | Full-width hairline at a section boundary — put it on the section element, not inside the frame |
| `.frame-bar` | Section header row inside a frame, directly below a `.frame-rule`: `01 / Title` left, meta right, hairline below, crosshair marks where the rule meets the frame sides (hidden ≤ 768px) |
| `.frame-bar__num`, `.frame-bar__title` | Muted number and ink title inside the bar |
| `.label` | Mono 11px uppercase label |
| `.btn` + `.btn-primary` / `.btn-secondary` | 48px tall, square, mono caps; primary = ink block, secondary = ink outline on paper |
| `.card` | Flat, hairline border, square; hover fills paper-deep |
| `.section-alt` | Paper-deep background |

Inner padding of a frame is `--frame-pad` (40px, 20px ≤ 768px). Nav height is `--nav-height` (48px).

## Components (home page)

- **Nav** — sticky bar of hairline-separated cells: wordmark | mono links | theme toggle |
  full-height signal-orange "Kontakt" block. On phones the bar shows wordmark | theme toggle |
  menu toggle. Active route = ink block with paper text. Mega-menus are framed two-column grids
  with numbered entries.
- **Hero** — dot-grid background (24px), headline, then a two-column row: lead text + CTAs + mono
  meta line, and the terminal panel.
- **Terminal panel** — always-dark block with a hairline frame and a mono "Beispiel" bar; replaces
  photographic imagery with an illustration of the claim. Marked as an example, not a real log.
- **Ticker** — mono band with signal-colored square dots, clipped to the frame (it does not run
  past the frame sides); decorative, `aria-hidden`, stops under `prefers-reduced-motion`. Four
  copies, each scrolling by its own width, so no gap appears at any point of the cycle.
- **Numbered rows** — pain points as rows with a mono number column.
- **Topic cards** — three cells separated by hairlines; a bar with the route slug and number, then
  title, text and a mono CTA. The whole cell is the click target.
- **Footer** — framed four-column grid with mono headings and a mono bottom bar.

## Avoid

- Rounded corners, drop shadows, glass/blur effects (the scrolled nav is the one exception)
- Brand hue on text or large surfaces — the signal color is for dots, markers and the contact CTA
- Emoji or icon sets as list markers — number instead
- More than one serif accent word per heading
- Hard-coded colors in component styles — use the tokens (they are what makes dark mode work)

## Pre-delivery checklist

- [ ] Checked in both themes (Playwright `colorScheme: 'light' | 'dark'`)
- [ ] Text contrast ≥ 4.5:1 on paper (secondary and muted tokens already comply)
- [ ] Headings checked at 390px for overflow (`scrollWidth > clientWidth`)
- [ ] Hover and visible focus states (`:focus-visible` = 2px ink outline)
- [ ] `prefers-reduced-motion` respected (ticker stops)
- [ ] Responsive at 390px, 768px, 1024px, 1440px and a wide viewport (≥ 2560px), no horizontal page scroll
- [ ] Animations checked over their full cycle, not only at t=0
- [ ] Component styles under the 10kB error budget in `angular.json`
