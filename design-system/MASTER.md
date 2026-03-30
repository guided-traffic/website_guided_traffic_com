# Design System: Guided Traffic

> Generated via ui-ux-pro-max for: kubernetes devops b2b saas consulting

---

## Pattern
- **Name:** Hero + Features + CTA
- **CTA Placement:** Above fold
- **Sections:** Hero > Features > CTA

## Style
- **Name:** Glassmorphism
- **Keywords:** Frosted glass, transparent, blurred background, layered, vibrant background, light source, depth, multi-layer
- **Best For:** Modern SaaS, financial dashboards, high-end corporate, lifestyle apps, modal overlays, navigation
- **Performance:** Good | **Accessibility:** Ensure 4.5:1

## Colors

| Role       | Hex       | CSS Variable         |
|------------|-----------|----------------------|
| Primary    | `#0F172A` | `--color-primary`    |
| Secondary  | `#334155` | `--color-secondary`  |
| CTA        | `#0369A1` | `--color-cta`        |
| Background | `#F8FAFC` | `--color-bg`         |
| Text       | `#020617` | `--color-text`       |

*Notes: Professional navy + blue CTA*

## Typography
- **Heading:** Plus Jakarta Sans
- **Body:** Plus Jakarta Sans
- **Mood:** friendly, modern, saas, clean, approachable, professional
- **Best For:** SaaS products, web apps, dashboards, B2B, productivity tools
- **Google Fonts:** https://fonts.google.com/share?selection.family=Plus+Jakarta+Sans:wght@300;400;500;600;700
- **CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
```

## Key Effects
- Backdrop blur (10-20px)
- Subtle border (1px solid rgba(255, 255, 255, 0.2))
- Light reflection
- Z-depth layering

## Spacing Scale
| Token  | Value  |
|--------|--------|
| xs     | 0.25rem |
| sm     | 0.5rem  |
| md     | 1rem    |
| lg     | 1.5rem  |
| xl     | 2rem    |
| 2xl    | 3rem    |
| 3xl    | 4rem    |
| 4xl    | 6rem    |

## Border Radius
| Token   | Value  |
|---------|--------|
| sm      | 4px    |
| md      | 8px    |
| lg      | 12px   |
| xl      | 16px   |
| full    | 9999px |

## Avoid (Anti-patterns)
- Excessive animation
- Dark mode by default
- Emoji as icons (use SVG: Heroicons/Lucide)

## Pre-Delivery Checklist
- [ ] No emojis as icons (use SVG)
- [ ] cursor-pointer on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard nav
- [ ] prefers-reduced-motion respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
