# Service Detail Page — Agentic Programming

**Slug:** `agentic-programming`
**Route:** `/services/agentic-programming`
**File target:** `frontend/src/app/pages/services/agentic-programming/agentic-programming.component.*`
**Primary pain-point match:** none from the pool yet — see Section 2
**Last updated:** 2026-10-29

**Offering (as defined 2026-10-29):** fast and secure development of custom software with AI agents,
including building an own, tailored solution in place of commercial standard software.

---

## Section 1 — Hero

**Status:** `DRAFT` — headline set by the owner, sub drafted

```
# Was vorher mal undenkbar war, ist ab sofort verhandelbar.

Wir entwickeln Individualsoftware mit KI-Agenten — schnell genug, dass sich eine
eigene Lösung wieder rechnet, und geprüft nach denselben Sicherheitsstandards wie
in regulierten Umgebungen. Auch als eigene Lösung anstelle von Standardsoftware,
die nur zu 80 % passt.

[Kennenlerngespräch buchen]  [So arbeiten wir]
```

Accent word: *verhandelbar.*

---

## Section 2 — "Kennen Sie das?"

**Status:** `DRAFT`

These three pains are drafted from the offering, **not** taken from real customer conversations like
the pool in [strategy.md](strategy.md#4-pain-point-pool-from-real-customer-conversations). They need
validation before they are added to the pool.

1. **Software, die zu 80 % passt** — Sie zahlen für Funktionen, die niemand nutzt, und bauen
   Workarounds für die, die fehlen. Am Ende passen sich Ihre Abläufe der Software an — nicht umgekehrt.
2. **Lizenzkosten ohne Ausweg** — Der Hersteller erhöht die Preise, stellt auf Abo oder Cloud-only um.
   Wechseln scheint unmöglich, denn eine Eigenentwicklung war bisher immer „viel zu teuer".
3. **Das Tool, das nie gebaut wird** — Das interne Werkzeug steht seit Jahren auf der Wunschliste. Zu
   klein für ein Softwarehaus, zu groß für das eigene Team neben dem Tagesgeschäft.

---

## Section 3 — Vorher / Nachher

**Status:** `DRAFT`

Headline: *Was sich ändert, wenn eigene Software bezahlbar wird.*

| Vorher | Nachher |
|---|---|
| Eigenentwicklung kommt nicht in Frage — zu teuer, zu langsam, zu riskant. | Die eigene Lösung ist eine echte Option, die Sie gegen die Lizenz rechnen können. |
| Ihre Prozesse folgen der Software. | Die Software folgt Ihren Prozessen — und nur denen, die Sie wirklich haben. |
| Funktionswünsche landen auf der Roadmap des Herstellers, auf die Sie keinen Einfluss haben. | Welche Funktion als Nächstes kommt, entscheiden Sie. |
| Ihre Daten liegen in der Cloud des Anbieters. | Ihre Daten liegen dort, wo Sie sie haben wollen — on-prem oder in Ihrer Cloud. |
| „Von einer KI geschriebener Code" klingt nach Sicherheitsrisiko. | Jede Änderung läuft durch Tests, Security-Scans und Review — bevor sie live geht. |

---

## Section 4 — So lösen wir das

**Status:** `DRAFT`

Intro: *Die Agenten schreiben den Code. Architektur, Prüfung und Verantwortung bleiben bei uns.*

1. **Abläufe statt Lastenheft** — echte Beispiele aus dem Alltag statt 80-seitigem Lastenheft; bei
   Ablösung bestehender Software zuerst klären, welche Funktionen wirklich genutzt werden.
2. **Architektur und Leitplanken** — Architektur, Technologien und Sicherheitsvorgaben stehen fest,
   bevor ein Agent Code schreibt; Standard-Technologien, die jeder weiterpflegen kann.
3. **Entwicklung mit Agenten** — kurze Iterationen, jede Änderung ein nachvollziehbarer Commit im
   Kunden-Repository, Fortschritt an lauffähiger Software.
4. **Tests, Review, Security** — automatisierte Tests, Review, SAST, Dependency- und Secret-Scanning;
   Standard aus den DevSecOps-Projekten unter BaFin-Aufsicht.
5. **Betrieb** — eigene Infrastruktur oder Cloud, als Container, auf Wunsch auf Kubernetes
   (Brücke zum Kubernetes-Service).
6. **Übergabe** — Quellcode, Dokumentation und Pipeline im Kunden-Repository; Weiterentwicklung mit
   oder ohne Agenten, mit oder ohne uns.

---

## Section 5 — Warum wir

**Status:** `DRAFT`

Only assets from the [trust stack](strategy.md#3-trust-stack-shared-assets-reusable-on-every-page);
there is no agentic-programming customer reference yet, and none is implied.

- Sicherheitsmaßstäbe aus regulierten Umgebungen (BaFin-Privatbank, BSI-Grundschutz-Dienstleister)
- Eigene Software: fünf Kubernetes-Operatoren und gehärtete Container-Images als Open Source, ein
  kommerzieller S3-Verschlüsselungs-Proxy
- CKS-zertifiziert
- 10+ Jahre Infrastruktur, DevOps und Data Engineering

---

## Section 6 — Häufige Fragen

**Status:** `DRAFT`

1. „Ist Code, den eine KI schreibt, sicher?" — so sicher wie der Prüfprozess; Verantwortung bei uns.
2. „Was heißt ‚Nachbau' von Standardsoftware?" — eigene Lösung für dieselben Aufgaben; kein fremder
   Quellcode, keine Markennamen, keine geschützten Oberflächen.
3. „Wem gehört der Code?" — dem Kunden; im Kunden-Repository, Standard-Technologien.
4. „Landen unsere Daten bei einem KI-Anbieter?" — Agenten arbeiten am Quellcode, nicht mit
   Produktivdaten; KI-Anbieter werden vorher gemeinsam festgelegt.
5. „Was, wenn Sie ausfallen?" — Netzwerk vertrauenswürdiger Kollegen; dokumentierter Code in Git.

**To confirm:** answers 3 and 4 are business commitments (code ownership, choice of AI provider), not
just descriptions — they must match the actual contract terms.

---

## Section 7 — CTA

**Status:** `DRAFT`

```
## Welche Software würden Sie bauen, wenn sie bezahlbar wäre?

Wir starten mit einem 30-minütigen Kennenlerngespräch. Unverbindlich,
ohne Vertrieb, ohne PowerPoint. Sie beschreiben, welche Software Ihnen fehlt
oder Sie ausbremst — wir sagen Ihnen ehrlich, ob sich eine eigene Lösung lohnt.

[Kennenlerngespräch buchen]  [E-Mail schreiben]
```
