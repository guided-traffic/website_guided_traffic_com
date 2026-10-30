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

This is the actual hub mechanism. Four cards (2 × 2), each linking to a topic page.

```
## Wo fangen wir bei Ihnen an?

Vier Bereiche, in denen wir die IT im Mittelstand pragmatisch modernisieren.
Jeder Bereich ist eine eigenständige Leistung — Sie können mit einem anfangen,
ohne alles auf einmal umstellen zu müssen.
```

### Card 1 — Production-ready Kubernetes Cluster
> **Kubernetes ohne Black Box.**
> Produktionsreife Cluster, die Ihr Team wirklich versteht und selbst betreiben kann. RBAC, Monitoring, Backup, Security nach BSI-Grundschutz-Prinzipien. On-Prem, Cloud oder hybrid.
> **[Mehr erfahren →]** (`/services/kubernetes-cluster`)

### Card 2 — Agentic Programming
> Individualsoftware, entwickelt mit KI-Agenten: schnell, geprüft und auf Ihre Abläufe zugeschnitten. Auch als eigene Lösung anstelle von Standardsoftware, die nur zu 80 % passt.
> **[Mehr erfahren →]** (`/services/agentic-programming`)

### Card 3 — CI-Pipelines & Templates
> **Schluss mit Pipeline-Chaos.**
> Einheitliche CI-Pipelines und wiederverwendbare Templates, die jedes Team in Ihrem Unternehmen ohne Umlernen nutzen kann. Mit Tests, Security-Scans und Quality-Gates — standardmäßig.
> **[Mehr erfahren →]** (`/services/ci-pipelines`)

### Card 4 — OnPrem Provisionierung mit Ansible
> **Schluss mit handgepflegten Servern.**
> Ihre bestehenden Server werden automatisiert, dokumentiert und reproduzierbar. Keine Schneeflocken mehr, keine Angst vor Updates. Ansible-basiert, ohne Cloud-Zwang.
> **[Mehr erfahren →]** (`/services/ansible-automation`)

**Open questions:**
- ~~Reihenfolge der Karten~~ — decided 2026-10-29: Kubernetes → Agentic Programming → CI-Pipelines → Ansible.
- Agentic Programming card text is a draft; the detail page is [service-agentic-programming.md](service-agentic-programming.md).
- Icons: Behalten wir die Emoji-Icons (☸️🚀📦) wie im bestehenden services.service.ts, oder nutzen wir neutrale SVG-Icons?

---

## Section 4 — Warum wir (Trust Stack, kurze Version)

**Status:** `DRAFT` (built, awaiting fine-tuning)

Short version only — the topic pages carry their own detailed trust anchors. Every fact is taken from strategy.md §3 or from the products data; customer references stay anonymized.

```
03 / Warum wir                                                    10+ Jahre

## Warum *wir*

Wir betreiben Infrastruktur in Umgebungen, in denen Aufsicht und Auditoren
mitlesen. Die Werkzeuge, die dabei entstehen, veröffentlichen wir als Open Source.

01  Regulierte Umgebungen
    Hybrid-Kubernetes für eine deutsche Privatbank unter BaFin-Aufsicht. Über
    drei Jahre Plattformbetrieb bei einem öffentlichen IT-Dienstleister unter
    BSI-Grundschutz.

02  Zertifizierte Security
    Certified Kubernetes Security Specialist (CKS) der Linux Foundation.
    Network Policies, Pod Security und Secret-Handling planen wir vom ersten
    Tag an mit.

03  Open Source
    Eine Kubernetes-IDE für den Desktop, fünf Kubernetes-Operators, gehärtete
    Container-Images und ein S3-Verschlüsselungs-Proxy, Apache-2.0-lizenziert. Sie können den Code lesen, bevor Sie mit uns sprechen.
    [Zu den Produkten →] (/products)

04  Über zehn Jahre Praxis
    Infrastruktur und DevOps in einer Privatbank, im öffentlichen Sektor und
    bei E-Commerce-Plattformen mit Millionen Kunden.
```

**Notes:**
- Card 03 states the count from `products.service.ts` (Cogpit, five operators, container images and the S3 Encryption Proxy, Apache-2.0 since 2026-10-29). The Kubernetes detail page and strategy.md §3 still say "sieben Operators" — needs a decision which wording is meant.
- "BSI-Grundschutz" describes experience under its requirements, not a certification claim — same wording as the Kubernetes detail page.

---

## Section 5 — FAQ (General Questions Only)

**Status:** `DRAFT` (built, awaiting fine-tuning)

Only general questions here — topic-specific FAQs live on the topic pages.

```
04 / Fragen                                                       Allgemein

## Häufige *Fragen*

„Müssen wir alles auf einmal umstellen?"
Nein. Wir fangen mit einem der vier Bereiche an, meist dort, wo es heute am
meisten wehtut. Jeder Bereich bringt für sich einen Nutzen; die anderen können
folgen, müssen aber nicht.

„Was passiert, wenn Sie ausfallen?"
Dafür gibt es drei Absicherungen: Alles, was wir bauen, liegt dokumentiert in
Ihrem Git-Repository. Ihr Team baut von Anfang an mit und kann den Betrieb
übernehmen. Und wir arbeiten mit einem Netzwerk erfahrener Kollegen, die bei
Bedarf einspringen.

„Brauchen wir zwingend eine Public Cloud?"
Nein. Wir bauen auf Ihrer eigenen Hardware, in der Cloud oder hybrid. Was passt,
entscheiden Datenschutz, Latenz und Budget.

„Arbeiten Sie mit unserem Team oder liefern Sie nur ab?"
Mit Ihrem Team. Wir bauen gemeinsam, erklären jede Entscheidung und übergeben
so, dass Ihr Team den Betrieb selbst übernehmen kann.

„Was kostet das?"
Das hängt vom Ausgangszustand ab: wie viele Server, wie viele Teams, was schon
existiert. Nach dem Erstgespräch und einem kurzen Blick auf Ihr Setup bekommen
Sie ein konkretes, schriftliches Angebot mit klar umrissenem Umfang.
```

**Notes:**
- Pricing: no model named, per strategy.md §7 (decided 2026-10-28).
- Question 4 (enablement) is added to the four planned ones because enablement is the cross-cutting promise in strategy.md §6.

---

## Section 6 — Final CTA

**Status:** `DRAFT` (built, awaiting fine-tuning)

Two-stage, reusing the CTA pair of the service detail pages:

```
05 / Nächster Schritt                                             30 Minuten

## Erzählen Sie uns, wo es *hakt*.

Im 30-minütigen Kennenlerngespräch schauen wir gemeinsam auf Ihre Ausgangslage
und sagen Ihnen ehrlich, ob und wo wir helfen können. Unverbindlich und ohne
PowerPoint.

[Kennenlerngespräch buchen]  [E-Mail schreiben]
ANTWORT PER E-MAIL INNERHALB EINES WERKTAGS
```

**Notes:**
- Primary → `https://cal.eu/hans-fischer/kennenlernen`; secondary → `/contact` (low-commitment alternative, as on the service pages).
- "Innerhalb eines Werktags" repeats the promise from the contact page.
- The contact form does not send messages yet (`onSubmit()` is a TODO) — the secondary CTA leads there, so this must be fixed before go-live.
