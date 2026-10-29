# Design System: Guided Traffic

> **Status:** approved 2026-10-28 as the site's design and applied to every page.
>
> **Reference:** design language modeled on getartcraft.com (paper palette, visible grid, type
> pairing). Only the language is borrowed — no logo, hero composition, imagery or copy.

The source of truth for every value below is [`frontend/src/styles.scss`](../frontend/src/styles.scss).

---

## Principles

- **Drawing sheet, not dashboard.** A visible frame with hairline sides, section bars and
  crosshair marks. Structure is shown, not hidden behind shadows and gradients.
- **Ink on paper.** No brand hue on surfaces or text, with two exceptions: the nav "Kontakt"
  CTA keeps the orange of the previous design, and one accent word per heading is set in it.
  Otherwise contrast comes from ink blocks (primary buttons, the active nav item) and the
  always-dark terminal panel.
- **Numbers instead of icons.** Lists, cards and menu entries are numbered `01`, `02`, … in mono.
  No emoji, no icon set.
- **One orange word per heading.** The accent word is wrapped in `<em>` and keeps the heading's
  wide Archivo, upright, in `--color-signal`. Color is the only difference — no second face,
  no italic.

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
| Signal — brand orange from the previous design; ticker dots, terminal arrow, king spoke of the hero wheel, accent word in headings, nav "Kontakt" CTA | `#ea580c` — 3.2:1 | `#ff6a00` — 6.6:1 | `--color-signal` |
| Signal hover (nav "Kontakt" CTA) | `#ff6a00` | `#ea580c` | `--color-signal-hover` |

Constant in both themes:

| Role | Value | CSS variable |
|---|---|---|
| Text on signal — always dark: 5.3:1 light, 6.6:1 dark (white would be 3.6:1 and 2.9:1) | `#101014` | `--color-on-signal` |
| Terminal background / text — the illustration stays dark | `#0a0a0c` / `#f2f1ee` | `--color-terminal-bg`, `--color-terminal-text` |

The previous semantic names (`--color-bg-primary`, `--color-text-primary`, `--color-accent`,
`--gradient-*`, …) remain as aliases onto this palette so unmigrated pages keep compiling.
Gradient tokens are flat and written as `linear-gradient(c, c)` so they stay valid in both
`background` and `background-image`.

*Deviation from the reference:* getartcraft uses `.42` alpha for muted text (≈2.7:1). We raise it
to `.60` so small mono labels meet 4.5:1.

*Signal per theme:* `#ff6a00` reaches only 2.5:1 on light paper, under the 3:1 floor for large text
and for marks. Light mode therefore uses the darker `#ea580c` (3.2:1) for every signal use; dark mode
keeps `#ff6a00`. Accent words sit in `h1` and `h2` only (≥ 36px), so the large-text floor applies.
Body-size text on paper never takes the signal; at `h5` size (18px) the 3:1 floor would no longer
hold. The CTA hover lightens in light mode (`#ff6a00`): a darker orange such as `#c2410c` would
leave its 11px label at 3.7:1.

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
| Accent word (`h* em`) | Archivo, as the heading | upright, color `--color-signal` | — |
| Body | Inter | 16px, line-height 1.6; lead paragraphs 18px | `--font-sans` |
| Labels, nav, buttons | Geist Mono | 11px, weight 500 (buttons 700), uppercase, letter-spacing 0.15em (buttons 0.12em) | `--font-mono` |

Sizes: `h1` `clamp(2.5rem, 5.6vw, 4.5rem)`, `h2` `clamp(2.25rem, 4.2vw, 3.75rem)`, `h3` 1.5rem
(1.25rem ≤ 768px).

All three fonts are loaded from Google Fonts in [`index.html`](../frontend/src/index.html), which
sets `lang="de"`. German hyphenation is enabled for `h1`/`h2` only, only on phones (≤ 768px), and
only for words of 12+ characters (`hyphenate-limit-chars: 12 5 5`) so names like "Kubernetes" never
split. Wider screens fit every word, and Chrome would otherwise hyphenate eagerly.

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

Inner padding of a frame is `--frame-pad` (40px, 20px ≤ 768px). Nav height is `--nav-height`:
48px × `--nav-scale`, which steps with the width — 4/3 (64px) above 1024px, 7/6 (56px) up to 1024px,
1 (48px) on phones — so the bar never overflows. Every size inside the bar is a base value times
the same factor.

## Page structure

Every page is a hero followed by framed sections:

```html
<section class="x-hero"><div class="frame x-hero__frame">…</div></section>
<section class="x-section frame-rule">
  <div class="frame">
    <div class="frame-bar">
      <span class="label"><span class="frame-bar__num">01 /</span> <span class="frame-bar__title">Titel</span></span>
      <span class="label">meta</span>
    </div>
    …
  </div>
</section>
```

The bar title names the section in one or two words; the meta label repeats a fact from the page
(a page slug, "Vier Bereiche", "Apache-2.0"), never new marketing copy.

Layout inside the frame comes from the mixins in
[`frontend/src/styles/_patterns.scss`](../frontend/src/styles/_patterns.scss):

| Mixin | Use |
|---|---|
| `page-hero`, `dot-grid` | Hero frame padding on the dot grid |
| `section-headline`, `section-intro`, `section-body` | Headline, lead text and the block after them |
| `cell-grid` + `cell` | Hairline-separated cells, auto-numbered `01, 02, …` with a CSS counter |
| `rows` + `row` | Hairline rows with a number column (works with mixed inline content) |
| `chips` + `chip`, `badge` | Mono tags and status badges |
| `route-card*` | Cards that link to a detail page: slug bar, title, text, whole card clickable |
| `closing-cta`, `actions` | Final call to action and button rows |

Shared stylesheets instead of per-page copies:

- [`pages/services/service-detail.scss`](../frontend/src/app/pages/services/service-detail.scss) —
  all service detail pages (identical structure)
- [`pages/products/product-detail.scss`](../frontend/src/app/pages/products/product-detail.scss) —
  all product detail pages. They use one class prefix, `pd-`; product-specific sections map onto
  the cell-grid, chip-group and chip-block patterns in that file.

## Components (home page)

- **Nav** — sticky bar of hairline-separated cells: wordmark | mono links | theme toggle |
  full-height signal-orange "Kontakt" block.
- **Wordmark** — "Guided Traffic" in Archivo, weight 700, width 125%, letter-spacing −0.01em,
  uppercase, ink; 15px × `--nav-scale`. Fixed: face and style do not change, it only scales
  together with the bar. On phones the bar shows wordmark | theme toggle |
  menu toggle. Active route = ink block with paper text. Mega-menus are framed two-column grids
  with numbered entries.
- **Hero** — a stage that fills the first screen down to the ticker: dot-grid background (24px),
  headline, then a two-column row: lead text + CTAs + mono meta line at the top, and the terminal
  panel anchored to the bottom, 30px above the ticker on every screen height (one column: the
  terminal follows the copy).
  Content sits at the top; the helm wheel runs behind it. Headline, lead and meta line carry a
  solid paper halo (unblurred `text-shadow` in eight directions), so the wheel's lines break around
  the lettering as they would on a drawing.
- **Helm wheel** — [`HelmWheelComponent`](../frontend/src/app/pages/home/helm-wheel/helm-wheel.component.ts):
  a ship's wheel drawn as hairlines on paper with eight turned handles; only the king spoke's
  collar is signal orange. A fixed tick scale with a lubber line stays still, so the sway reads as
  holding a course. Two nested CSS rotations with unrelated periods (swell ±3.5° over 11.2s,
  trim ±1.5° over 6.6s) add up to an irregular ±5° motion that repeats only after about six
  minutes; both layers turn on the compositor without repaints. Placed with its hub on the hero's
  bottom edge, centered on the column gap so the king spoke stands between text and terminal, and
  sized from the stage height. At ≤ 1024px (one column) it moves into the flow below the terminal,
  upper half visible. Decorative, `aria-hidden`, still under `prefers-reduced-motion`.
- **Terminal panel** — always-dark block with a hairline frame and a mono "Beispiel" bar; replaces
  photographic imagery with an illustration of the claim. Marked as an example, not a real log.
- **Ticker** — mono band with signal-colored square dots, clipped to the frame (it does not run
  past the frame sides); decorative, `aria-hidden`, stops under `prefers-reduced-motion`. Four
  copies, each scrolling by its own width, so no gap appears at any point of the cycle.
- **Numbered rows** — pain points as rows with a mono number column.
- **Topic cards** — four cells as 2 × 2 (one column on phones), separated by hairlines; a bar with the route slug and number, then
  title, text and a mono CTA. The whole cell is the click target.
- **Footer** — framed four-column grid with mono headings and a mono bottom bar.

## Avoid

- Rounded corners, drop shadows, glass/blur effects (the scrolled nav is the one exception)
- Brand hue on text or large surfaces — the signal color is for dots, markers, the contact CTA and
  the one accent word per heading
- Emoji or icon sets as list markers — number instead
- More than one accent word per heading; italic or a second typeface for accents
- Hard-coded colors in component styles — use the tokens (they are what makes dark mode work)

## Pre-delivery checklist

- [ ] Checked in both themes (Playwright `colorScheme: 'light' | 'dark'`)
- [ ] Text contrast ≥ 4.5:1 on paper (secondary and muted tokens already comply)
- [ ] Headings checked at 390px for overflow (`scrollWidth > clientWidth`)
- [ ] Hover and visible focus states (`:focus-visible` = 2px ink outline)
- [ ] `prefers-reduced-motion` respected (ticker and helm wheel stop)
- [ ] Responsive at 390px, 768px, 1024px, 1440px and a wide viewport (≥ 2560px), no horizontal page scroll
- [ ] Animations checked over their full cycle, not only at t=0
- [ ] Component styles under the 10kB error budget in `angular.json`
