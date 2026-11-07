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
| Success — built, checked, passed: status icons, the scan's checks | `#15803d` — 4.4:1 | `#4ade80` — 10.8:1 | `--color-success` |
| Danger — a problem, a block: problem markers, the scan's cross | `#b91c1c` — 5.7:1 | `#f87171` — 6.8:1 | `--color-danger` |

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

*Status colors:* success and danger mark a state, never decorate. They color icons and marks only;
the text beside them stays ink, so no text relies on them (success at 4.4:1 in light mode stays
above the 3:1 floor for graphics). Something planned or neutral stays muted, not colored.

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

## Icons

[`IconComponent`](../frontend/src/app/shared/icon/icon.component.ts) (`<app-icon name="…" />`) draws
an icon from [`icon.registry.ts`](../frontend/src/app/shared/icon/icon.registry.ts) in
`currentColor`, sized by `--icon-size` (default 1rem), decorative and `aria-hidden` — the text
beside it carries the meaning. Line icons are Lucide 1.66.0, stroked at 1.5 in a 24 box so they sit
with the hairlines; marks (the GitHub mark, Simple Icons 16.36.0) are filled. The registry holds
only what the site uses, as path data, with the license notices of both sets.

| Where | Icon |
|---|---|
| Every button that links to a GitHub repository | `github` |
| Buttons to a GitHub release (Cogpit "Herunterladen") | `download` |
| Other buttons, where an icon names the action (Trove: "Stand der Entwicklung", "Gespräch vereinbaren") | `arrow-down`, `message-square` |
| Feature cards: topic above the title, ink, 1.75rem | per card |
| Feature cards: state in the number row, 1.125rem | `circle-check` in success (built), `clock` muted (planned) |
| Problem points, 1.25rem | `circle-x` in danger |
| License and status labels, 0.875rem | per label |

Feature-card icons, card states, problem lists and label icons are in use on the Trove page; the
other product pages carry only the GitHub and download icons on their buttons so far.

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
  all service detail pages (identical structure) and the about page `/ueber-uns`, which uses their
  hero, trust rows and closing CTA. A trust intro that ends its section takes
  `.svc-trust__intro--last` for the bottom space a list would bring.
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
  solid paper halo (`paper-halo` mixin: unblurred `text-shadow` in eight directions), so the wheel's lines break around
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

## Components (product pages)

- **Products overview** — one framed section per category, in the order of
  [`ProductsService`](../frontend/src/app/services/products.service.ts) (Desktop-Anwendungen,
  Kubernetes-Operatoren, Plattform-Dienste, Security-Anwendungen); a category without products is
  left out. Cards keep one width in every category (`auto-fill`, at most three per row), so a
  category with one product does not stretch it across the frame.
- **Problem list** — a problem section may list its points (`pd-problem__list`), each marked with
  a `circle-x` in the danger color, instead of one paragraph.
- **Feature card** — a topic icon above the title (`pd-feature-card__icon`) and, top right in the
  number row, its state (`pd-feature-card__state--done` in success, `--planned` muted).
- **Status badge** — a product that is not released yet carries `status: 'in-development'`: a
  dashed "In Entwicklung" badge on its card, and the same dashed style for Alpha, Beta and
  "In Entwicklung" in the detail page's hero.
- **Product logo** — a product with its own logo shows it in the hero on the name's line, left of the name (88px, 56px on phones). It
  keeps its own colors and shape, rounded corners included: it is the product's mark, not page
  chrome. The file lives at `src/assets/products/<slug>.svg` (served under `/assets/`), never in
  `public/products/<slug>/`: a folder there shadows the route `/products/<slug>`, and the static
  server answers it with a 301 to `/products/<slug>/`, which renders an empty page.
- **Package flow** — the Trove hero is a stage like the home hero:
  [`TroveFlowComponent`](../frontend/src/app/pages/products/trove/trove-flow/trove-flow.component.ts)
  draws what Trove does as a flat technical drawing in hairlines on paper: a globe for the public
  registries above (its meridians turn), an S3 cylinder for the own packages below, and between
  them the hub, a circle with a tick scale. Inside it, artifacts from the registries rest on the
  upper shelf (REMOTE), artifacts from S3 on the lower (LOKAL), three dotted slots each; the bus
  between the shelves fans out to the three endpoints `/api/npm/`, `/api/nuget/` and `/files/`
  (Trove's protocol paths). A scan beam turns over the hub every 5s and each artifact gets its
  check the moment the beam crosses it; once per loop the beam crosses out a malicious artifact,
  which sinks out of sight. The seven clients Trove serves today (npm, pnpm, Yarn, dotnet, NuGet,
  curl, a browser) come in over the frame's right edge one at a time, dock at their endpoint,
  take an artifact from either shelf (the check moves from the artifact to the client's tile),
  hop once and fly off over the edge. Client marks are the monochrome Simple Icons paths (CC0) in
  [`trove-flow.icons.ts`](../frontend/src/app/pages/products/trove/trove-flow/trove-flow.icons.ts),
  drawn in ink like everything else; the browser is our own glyph. The moving parts are drawn in
  full ink, the structure in the lighter mark and line tokens — no signal color. Only the scan's
  verdict is colored: checks in success, the blocked artifact's cross and outline in danger (the
  outline turns red with the cross, not before). The flights fan out like the spokes — the top
  client swoops up, the middle one keeps its lane, the bottom one sinks away — so no client crosses
  the dock where the next one arrives; a test keeps any two clients in view apart. The geometry is a
  pure function
  ([`trove-flow.geometry.ts`](../frontend/src/app/pages/products/trove/trove-flow/trove-flow.geometry.ts))
  that computes every outline and every keyframe once: a 20s loop of eight events 2.5s apart, the
  beam turning four times per loop so its marks fall on the same pass in every loop. The motion
  runs as SMIL, and no animation carries a `begin` offset: Chrome starts an animation at 0s when it
  is inserted, and a `begin` that Angular binds afterwards does not move it, so each actor's phase
  is baked into its keyframes (the leg that runs over the loop's end is split there, easing curve
  included). SMIL ignores `prefers-reduced-motion`, so a second layer holds a still pose (one
  client docked at each endpoint, the shelves stocked) that CSS swaps in. Against the frame's
  right side on desktop, at most 820px tall and kept clear of the hero's meta line; at ≤ 1024px it
  follows the text, its right side still on the frame's edge so clients enter and leave there.
  Decorative, `aria-hidden`; text in front carries the paper halo (`paper-halo` mixin).

## Avoid

- Rounded corners, drop shadows, glass/blur effects (the scrolled nav is the one exception)
- Brand hue on text or large surfaces — the signal color is for dots, markers, the contact CTA and
  the one accent word per heading
- Emoji, and icons from outside the registry — add the icon to the registry instead
- Colored topic icons: icons are ink; only a state (success, danger) takes a color
- More than one accent word per heading; italic or a second typeface for accents
- Signal color in a hero animation unless it was explicitly asked for — the drawings stay ink on
  paper; status colors mark an outcome in them (the Trove scan)
- Hard-coded colors in component styles — use the tokens (they are what makes dark mode work)

## Pre-delivery checklist

- [ ] Checked in both themes (Playwright `colorScheme: 'light' | 'dark'`)
- [ ] Text contrast ≥ 4.5:1 on paper (secondary and muted tokens already comply)
- [ ] Headings checked at 390px for overflow (`scrollWidth > clientWidth`)
- [ ] Hover and visible focus states (`:focus-visible` = 2px ink outline)
- [ ] `prefers-reduced-motion` respected (ticker and helm wheel stop, the Trove package flow shows its still pose)
- [ ] Responsive at 390px, 768px, 1024px, 1440px and a wide viewport (≥ 2560px), no horizontal page scroll
- [ ] Animations checked over their full cycle, not only at t=0
- [ ] Component styles under the 10kB error budget in `angular.json`
