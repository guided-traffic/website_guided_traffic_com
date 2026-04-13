# Services Overview Page

**Role:** Second-level hub. Visitors who navigate to `/services` (from the header menu or from the home page) see a focused list of the three services, each with a short teaser and a link to the detail page. Analogous to `/products`.
**File target:** `frontend/src/app/pages/services/services.component.html` (updated — already exists)
**Corresponds to route:** `/services`
**Last updated:** 2026-04-13

## Structure

1. Overview hero — one sentence on what we do
2. Service grid — 3 cards, each linking to its detail page at `/services/<slug>`

No pain points, no deep trust stack, no FAQ here. This page is **pure routing** — the same role `/products` plays for the operators. All selling happens on the detail pages.

---

## Section 1 — Overview Hero

**Status:** `DRAFT`

```
# Unsere Leistungen

Drei spezialisierte Bereiche, in denen wir mittelständische IT-Infrastruktur
pragmatisch modernisieren. Jeder Bereich ist eine eigenständige Leistung —
Sie können mit einem anfangen, ohne alles auf einmal umstellen zu müssen.
```

**Notes:**
- Current code says: *"Spezialisierte Beratung, um Ihre Infrastruktur von Legacy-Systemen in die Cloud-native Welt zu überführen."* — this is fine but "Cloud-native" is a buzzword we want to drop per the voice guide.
- Alternative sub: *"Alle drei Leistungen haben wir selbst aufgebaut — bei Banken unter BaFin-Aufsicht, bei Behörden unter BSI-Grundschutz, bei E-Commerce-Konzernen."* (stronger trust signal, but may belong on home instead)

---

## Section 2 — Service Grid

**Status:** `DRAFT`

Three cards in the same visual style as the existing services grid (see current `services.component.html` — uses `@for` over `services` array). Each card carries an icon, a title, a one-paragraph description, and a CTA button linking to the detail page.

### Card 1 — CI-Pipelines & Templates
- **Slug:** `ci-pipelines`
- **Icon:** 🚀
- **Title:** CI-Pipelines & Templates
- **Description:** Einheitliche Pipelines und wiederverwendbare Templates für alle Teams. Mit Tests, Security-Scans und Quality-Gates. Wechselt ein Entwickler das Team, ist er am ersten Tag produktiv.
- **CTA:** "Mehr erfahren →" → `/services/ci-pipelines`

### Card 2 — OnPrem Provisionierung mit Ansible
- **Slug:** `ansible-automation`
- **Icon:** 🔧
- **Title:** OnPrem Provisionierung mit Ansible
- **Description:** Ihre bestehenden Server werden automatisiert, dokumentiert und reproduzierbar. Keine Schneeflocken-Server mehr, keine Angst vor Updates. Ohne Cloud-Zwang.
- **CTA:** "Mehr erfahren →" → `/services/ansible-automation`

### Card 3 — Production-ready Kubernetes Cluster
- **Slug:** `kubernetes-cluster`
- **Icon:** ☸️
- **Title:** Production-ready Kubernetes Cluster
- **Description:** Produktionsreife Cluster, die Ihr Team wirklich versteht und selbst betreiben kann. RBAC, Monitoring, Backup, Security nach BSI-Grundschutz-Prinzipien. On-Prem, Cloud oder hybrid.
- **CTA:** "Mehr erfahren →" → `/services/kubernetes-cluster`

---

## Implementation notes

- **Update `services.service.ts`** to extend `Service` interface with `slug`, `ctaLabel`, `ctaLink` — mirror the `Product` interface in `products.service.ts`.
- **Update `services.component.html`** to render the CTA links, matching the existing product grid pattern.
- Current 3 services in `services.service.ts` don't match this list 1:1:
  - `Kubernetes Provisioning` → rename to `Production-ready Kubernetes Cluster`, slug `kubernetes-cluster`. Legacy-Migration (containerization of existing apps) is absorbed into this service — see strategy.md section 6.
  - `CI/CD Pipelines` → rename to `CI-Pipelines & Templates`, slug `ci-pipelines`
  - `Legacy-Migration` → **replace** with `OnPrem Provisionierung mit Ansible`, slug `ansible-automation`
