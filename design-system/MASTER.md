# Design System: Guided Traffic

> Generated via ui-ux-pro-max for: kubernetes devops b2b saas consulting dark mode
> Color palette OVERRIDDEN with dark theme inspired by tasrieit.com

---

## Pattern
- **Name:** Bento Grid Showcase
- **CTA Placement:** Floating sticky CTA + end-of-section CTAs
- **Sections:** Hero > Services Bento Grid > How We Work > Products > Testimonials > CTA
- **Color Strategy:** Dark base with subtle section alternation (primary/secondary bg)

## Style
- **Name:** Dark Premium Flat
- **Keywords:** dark mode, minimalist, clean lines, subtle borders, card-based, premium, professional, near-black backgrounds, muted accents
- **Best For:** B2B SaaS, DevOps tooling, infrastructure consulting, developer-facing products
- **Performance:** Excellent | **Accessibility:** Ensure 4.5:1 contrast on dark backgrounds

## Colors — Dark Theme

| Role              | Hex / Value                       | CSS Variable              |
|-------------------|-----------------------------------|---------------------------|
| BG Primary        | `#0a0a0b`                         | `--color-bg-primary`      |
| BG Secondary      | `#111113`                         | `--color-bg-secondary`    |
| BG Card           | `#161618`                         | `--color-bg-card`         |
| BG Card Hover     | `#1c1c1f`                         | `--color-bg-card-hover`   |
| Border            | `rgba(255, 255, 255, 0.08)`       | `--color-border`          |
| Text Primary      | `#f5f5f7`                         | `--color-text-primary`    |
| Text Secondary    | `#8b8b8e`                         | `--color-text-secondary`  |
| Text Muted        | `#56565a`                         | `--color-text-muted`      |
| Accent (CTA)      | `#3b82f6`                         | `--color-accent`          |
| Accent Hover      | `#2563eb`                         | `--color-accent-hover`    |
| Accent Subtle     | `rgba(59, 130, 246, 0.1)`         | `--color-accent-subtle`   |
| Success           | `#22c55e`                         | `--color-success`         |

*Notes: Near-black backgrounds with vibrant blue CTA. Inspired by tasrieit.com dark theme. High contrast white text on dark surfaces.*

## Typography
- **Heading:** Inter
- **Body:** Inter
- **Mono:** JetBrains Mono (code snippets, technical content)
- **Mood:** clean, technical, professional, modern, trustworthy
- **Best For:** DevOps/infrastructure products, B2B SaaS, developer tools
- **Google Fonts:** https://fonts.google.com/share?selection.family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500
- **CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

## Key Effects
- Subtle card borders (1px solid rgba(255, 255, 255, 0.08))
- Hover elevation: background lightens slightly (#1c1c1f)
- Clean transitions (150-250ms ease)
- No heavy shadows — rely on border + bg contrast for depth
- Accent glow on focused/active interactive elements

## Spacing Scale
| Token  | Value   |
|--------|---------|
| xs     | 0.25rem |
| sm     | 0.5rem  |
| md     | 1rem    |
| lg     | 1.5rem  |
| xl     | 2rem    |
| 2xl    | 3rem    |
| 3xl    | 4rem    |
| 4xl    | 6rem    |

## Border Radius
| Token  | Value  |
|--------|--------|
| sm     | 6px    |
| md     | 10px   |
| lg     | 16px   |
| full   | 9999px |

## Buttons
- **Primary:** `--color-accent` bg, white text, `--radius-md`, hover darkens to `--color-accent-hover`
- **Secondary:** transparent bg, 1px `--color-border` border, `--color-text-primary` text, hover lightens bg
- **Ghost:** no border, `--color-text-secondary` text, hover shows subtle bg

## Cards
- Background: `--color-bg-card`
- Border: 1px solid `--color-border`
- Radius: `--radius-md`
- Hover: bg shifts to `--color-bg-card-hover`, transition 250ms ease
- Padding: `--space-lg` to `--space-xl`

## Avoid (Anti-patterns)
- Light mode (this is a dark-first design)
- Heavy drop shadows (use border/bg contrast instead)
- Emoji as icons (use SVG: Lucide or Heroicons)
- Excessive animation or parallax
- Bright/saturated backgrounds

## Pre-Delivery Checklist
- [ ] No emojis as icons (use SVG)
- [ ] cursor-pointer on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Dark mode: text contrast 4.5:1 minimum against dark bg
- [ ] Focus states visible for keyboard nav (accent ring)
- [ ] prefers-reduced-motion respected
- [ ] Responsive breakpoints: 375px, 768px, 1024px, 1440px
- [ ] Inter font loaded via Google Fonts with preconnect
