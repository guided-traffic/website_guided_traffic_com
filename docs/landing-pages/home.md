# Home — Hub Page

**Role:** Overview + routing. Introduces the positioning in 10 seconds and sends the visitor to the service detail page that matches their actual problem.
**File target:** `frontend/src/app/pages/home/home.component.html`
**Corresponds to route:** `/`
**Last updated:** 2026-04-13

## Structure (hub-optimized, shorter than service detail pages)

1. Hero — general positioning
2. Pain teaser — brief "Kennen Sie das?" with 5 one-liners (no deep explanation)
3. "Wo fangen wir bei Ihnen an?" — 3 cards, each linking to a service detail page at `/services/<slug>`
4. Warum wir — trust stack (short version)
5. FAQ — only the general questions (bus-factor, pricing, Cloud-Zwang)
6. Final CTA

---

## Section 1 — Hero

**Status:** `FINAL`

```
# Deployments per Merge. Nicht per Nachtschicht.

Wir helfen mittelständischen IT-Teams, von handgepflegten Servern und
Ein-Personen-Deployments zu automatisierter Infrastruktur zu kommen.
Pragmatisch, ohne Vendor-Lock-In — und so, dass Ihr Team am Ende alles
selbst betreiben kann.

[Kennenlernen →]  [So arbeiten wir]
```

**Notes:**
- Primary CTA → existing `https://cal.eu/hans-fischer/kennenlernen`
- Secondary CTA → in-page anchor `#wo-anfangen` (the 3-card section)
- Note: dropped the word "Kubernetes" from the sub — on the hub page, Kubernetes is just one of three topics, so the promise is broader ("automatisierte Infrastruktur").

---

## Section 2 — Pain Teaser

**Status:** `DRAFT`

Unlike the original full "Kennen Sie das?" with 5 detailed paragraphs, the hub version is a quick nod — just enough for the visitor to think "ja, das kennen wir" — then routes them onward.

```
## Kennen Sie das?

- Deployments laufen noch per Hand — und nur einer weiß wirklich wie.
- Jedes Team hat seine eigene CI/CD-Pipeline. Teamwechsel werden zum Onboarding-Marathon.
- Jeder Server ist "irgendwie ein bisschen anders". Updates sind ein Herzinfarkt-Event.
- Rollback heißt: nächtliches Backup zurückspielen.
- Kubernetes steht seit zwei Jahren auf der Roadmap — aber niemand traut sich ran.

**Wenn Sie mehr als einen Punkt genickt haben — wir haben für jedes dieser Probleme eine konkrete Antwort.**
```

---

## Section 3 — "Wo fangen wir bei Ihnen an?" (Topic Router)

**Status:** `DRAFT`

This is the actual hub mechanism. Three cards, each linking to a topic page.

```
## Wo fangen wir bei Ihnen an?

Drei Bereiche, in denen wir Mittelstandsinfrastruktur pragmatisch modernisieren.
Jeder Bereich ist eine eigenständige Leistung — Sie können mit einem anfangen,
ohne alles auf einmal umstellen zu müssen.
```

### Card 1 — CI-Pipelines & Templates
> **Schluss mit Pipeline-Chaos.**
> Einheitliche CI-Pipelines und wiederverwendbare Templates, die jedes Team in Ihrem Unternehmen ohne Umlernen nutzen kann. Mit Tests, Security-Scans und Quality-Gates — standardmäßig.
> **[Mehr erfahren →]** (`/services/ci-pipelines`)

### Card 2 — OnPrem Provisionierung mit Ansible
> **Schluss mit handgepflegten Servern.**
> Ihre bestehenden Server werden automatisiert, dokumentiert und reproduzierbar. Keine Schneeflocken mehr, keine Angst vor Updates. Ansible-basiert, ohne Cloud-Zwang.
> **[Mehr erfahren →]** (`/services/ansible-automation`)

### Card 3 — Production-ready Kubernetes Cluster
> **Kubernetes ohne Black Box.**
> Produktionsreife Cluster, die Ihr Team wirklich versteht und selbst betreiben kann. RBAC, Monitoring, Backup, Security nach BSI-Grundschutz-Prinzipien. On-Prem, Cloud oder hybrid.
> **[Mehr erfahren →]** (`/services/kubernetes-cluster`)

**Open questions:**
- Reihenfolge der Karten: CI/CD → Ansible → Kubernetes (einfach → komplex), oder Kubernetes zuerst (stärkstes Differenzierungsmerkmal)?
- Icons: Behalten wir die Emoji-Icons (☸️🚀📦) wie im bestehenden services.service.ts, oder nutzen wir neutrale SVG-Icons?

---

## Section 4 — Warum wir (Trust Stack, kurze Version)

**Status:** `TODO`

Short version only — the topic pages carry their own detailed trust anchors. Draft once strategy.md trust stack is locked with user.

Planned content:
- CKS (einziges Sicherheitszertifikat für Kubernetes)
- Erfahrung mit Banken unter BaFin-Aufsicht und Behörden unter BSI-Grundschutz
- 7 eigene Open-Source-Kubernetes-Operators (Link zu /products)
- 10+ Jahre Infrastructure

---

## Section 5 — FAQ (General Questions Only)

**Status:** `TODO`

Only general questions here — topic-specific FAQs live on the topic pages.

Planned questions:
1. "Müssen wir alles auf einmal umstellen?" → Nein, wir fangen mit einem der drei Bereiche an.
2. "Was passiert, wenn Sie ausfallen?" → Netzwerk vertrauenswürdiger Kollegen + GitOps-Dokumentation + Enablement-Ansatz.
3. "Brauchen wir zwingend Public Cloud?" → Nein. OnPrem, Hybrid und Cloud sind alle möglich.
4. "Was kostet das ungefähr?" → TBD, Pricing-Policy muss mit User geklärt werden.

---

## Section 6 — Final CTA

**Status:** `TODO`

Two-stage:
- Primary: 30-Min-Erstgespräch via cal.com
- Secondary: Niederschwellige Alternative (TBD mit User — z.B. "Unverbindliche Infrastruktur-Analyse per E-Mail")
