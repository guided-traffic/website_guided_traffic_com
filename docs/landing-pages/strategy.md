# Strategy — Shared Foundation

**Status:** `FINAL` (decisions locked unless explicitly revisited)
**Last updated:** 2026-04-13

---

## 1. Target audience

Mid-sized German decision makers — CTOs, Heads of IT, Geschäftsführer with technical background. They have growing infrastructure pain but are risk-averse, suspicious of buzzword consulting, and care about team enablement over vendor lock-in. They don't buy innovation — they buy **risk reduction and predictability**.

## 2. Voice decisions (locked)

- **"Wir"** throughout the site, never "Ich". Bus-factor concern is addressed via "network of trusted colleagues" in FAQ.
- **All customer references are anonymized.** Never name Baader Bank, Dataport, HANSAINVEST, Otto, bonprix, SpotX. Use descriptors:
  - "Deutsche Privatbank unter BaFin-Aufsicht"
  - "Öffentlicher IT-Dienstleister mit BSI-Grundschutz-Auflagen"
  - "Hamburger Finanzkonzern im Immobiliensektor"
  - "E-Commerce-Plattform mit Millionen-Kunden"
  - "Deutscher Kabelnetzbetreiber"
- **Certifications may be named directly:** CKS (Certified Kubernetes Security Specialist), AWS Certified Cloud Practitioner — these are personal credentials, not customer references.
- **Anti-buzzword tone.** Concrete, direct, slightly blunt. Preserve "Keine Buzzwords — nur funktionierende Systeme" as a recurring claim.
- **No clever poetics.** The user rejected "Auch wenn niemand sie anfasst" as AI-generated. Rule of thumb: if it wouldn't pass a 10-year sysadmin's smell test at 2am, cut it.

## 3. Trust stack (shared assets, reusable on every page)

- **Banking & regulated sectors:** 2 projects at a German private bank under BaFin regulation (DevSecOps, hybrid Kubernetes for PCI-DSS/DSGVO compliance).
- **Public sector & BSI-Grundschutz:** 3.5 years at a public IT service provider building open-source office alternatives under BSI-Grundschutz.
- **Enterprise e-commerce:** Data/infrastructure work for large e-commerce and real-estate-finance companies.
- **Certifications:** CKS (Certified Kubernetes Security Specialist) — one of the rarest and hardest Kubernetes certifications. AWS Certified Cloud Practitioner.
- **Open-source proof:** 7 in-house Kubernetes operators published and maintained (see [products page](../../frontend/src/app/pages/products/)). Hard evidence that we build infrastructure, not just talk about it.
- **Seniority:** 10+ years in infrastructure, DevOps, data engineering.

## 4. Pain-point pool (from real customer conversations)

Each topic page pulls the relevant 2–3 pains from this pool. The home hub page mentions all five briefly as a teaser.

| # | Pain | Primary topic match |
|---|---|---|
| 1 | **Bus-Faktor 1** — Deployments laufen manuell, nur eine Person weiß wie. | CI/CD + Ansible |
| 2 | **Pipeline-Chaos** — Jedes Team baut eigene Pipelines, inkonsistente Qualität, aufwendige Team-Wechsel. | CI-Pipelines |
| 3 | **Schneeflocken-Server** — Jeder Server ist anders, gewachsen über Jahre, Updates intransparent. | Ansible |
| 4 | **Rollback = Backup** — Apps direkt auf Host, Version-Drift zwischen Admin und Dev-Team. | Kubernetes (Container) + CI-Pipelines |
| 5 | **Kubernetes-Angst** — "Zu komplex, zu intransparent", seit Jahren aufgeschoben. | Kubernetes |

## 5. Page template (used by every service detail page)

Every service detail page (`service-kubernetes-cluster.md`, `service-ci-pipelines.md`, `service-ansible-automation.md`) follows this 7-section structure:

1. **Hero** — service-specific outcome promise, one concrete sentence
2. **"Kennen Sie das?"** — 2–3 service-specific pain points (subset of pain pool)
3. **Vorher / Nachher** — day-to-day transformation table
4. **So lösen wir das** — concrete approach for this service (tools, process, deliverables)
5. **Warum wir** — trust anchors relevant to this service (subset of trust stack)
6. **Häufige Fragen** — 3–5 service-specific objections
7. **CTA** — primary call (30-min Erstgespräch) + secondary low-commitment option

The **home hub page** (`home.md`) has a different, shorter structure.
The **services overview page** (`services-overview.md`) is a lighter version — service teasers + link to each detail page, analogous to `/products`.

## 6. Cross-cutting concerns and service scope

- **Legacy-Migration = Applikations-Containerisierung.** This is the work of taking existing apps (running on VMs, bare metal, etc.) and packaging them into containers. It is **part of the Kubernetes service**, not a separate offering and not part of Ansible. On the Kubernetes detail page it appears as a dedicated sub-step inside "So lösen wir das".
- **Enablement & Übergabe** is cross-cutting. Every detail page ends with the promise that the customer's team can operate the result.
- **Products** (the 7 operators) live on `/products` as before. On landing pages, they appear as trust evidence, not as sales targets.

## 7. Open questions (affects all pages)

- **Routing decided 2026-04-13:** services use the same pattern as products — `/services` (overview) and `/services/<slug>` (detail). Slugs: `kubernetes-cluster`, `ci-pipelines`, `ansible-automation`.
- **Legacy-Migration scope decided 2026-04-13:** containerization of existing apps is a sub-step inside the Kubernetes service, not a separate detail page. If customer feedback later shows strong standalone demand, it can be split out into a 4th service without rewriting the other pages.
- **"BSI-Standards"** — may we claim this directly on the Kubernetes page (3.5 years of real experience), or soften to "orientiert an BSI-Grundschutz-Prinzipien"?
- **Pricing model mention** — do we name a model (Festpreis vs. Tagessatz vs. Retainer) in the FAQ, or stay silent and force a call?
- **Navigation:** header menu already has a "Services" entry (existing `/services` route). Do sub-items need to appear (e.g., dropdown), or is the overview page enough as a routing hub?
