# Service Detail Page — CI-Pipelines & Templates

**Slug:** `ci-pipelines`
**Route:** `/services/ci-pipelines`
**File target:** new Angular component `frontend/src/app/pages/services/ci-pipelines/ci-pipelines.component.*`
**Primary pain-point match:** Pipeline-Chaos, Bus-Faktor 1
**Last updated:** 2026-04-13

---

## Section 1 — Hero

**Status:** `DRAFT`

### Option A (recommended)
```
# Eine Pipeline. Alle Teams. Kein Drama.

Wir bauen einheitliche CI-Pipeline-Templates, die jedes Team in Ihrem Unternehmen
ohne Umlernen nutzen kann. Mit Tests, Security-Scans und Quality-Gates — von
Anfang an dabei, nicht als Nachgedanke.

[Kennenlernen →]  [So arbeiten wir]
```

### Option B
```
# Schluss mit Pipeline-Chaos.
```

### Option C
```
# Ihre Pipelines. Endlich einheitlich. Endlich sicher.
```

**Open question:** Welche Headline-Variante? A ist am konkretesten, B ist am direktesten.

Variante A

---

## Section 2 — Kennen Sie das?

**Status:** `DRAFT`

```
## Kennen Sie das?
```

### 🔧 Pipeline-Chaos
Jedes Team baut seine CI-Pipelines selbst. Unterschiedliche Qualitätsstandards, unterschiedliche Tests, unterschiedliche Security-Scans. Wechselt ein Entwickler das Team, beginnt das Onboarding von vorne — weil die neue Pipeline wieder ganz anders funktioniert.

### 🚨 Bus-Faktor 1
Deployments laufen noch zur Hälfte manuell. Und nur *eine* Person im Team weiß wirklich, wie. Ist sie im Urlaub oder krank, steht jede produktive Änderung still — oder wird zum nervösen Ratespiel.

### 🛡️ Security als Nachgedanke
Security-Scans sollten laufen, laufen aber nicht. "Machen wir, wenn wir Zeit haben" — und die Zeit kommt nie. Audit-Wochen sind Excel-Listen-Wochen.

---

## Section 3 — Vorher / Nachher

**Status:** `DRAFT`

```
## So sieht Ihr Build-Alltag heute aus — und so sieht er danach aus.
```

| Heute | Nach der Umstellung |
|---|---|
| Fünf Teams, fünf Pipeline-Dialekte. Jeder hat seine Lieblings-Tools und -Konventionen. | Ein zentraler Satz Templates, den alle Teams nutzen — mit Raum für projektspezifische Erweiterungen. |
| Security-Scans? "Machen wir, wenn wir Zeit haben." | Security-Scans sind Teil jeder Pipeline. Automatisch, nicht optional, ohne Zusatzaufwand. |
| Teamwechsel = zwei Wochen Einarbeitung in die neue Build-Landschaft. | Teamwechsel = ein Entwickler committet, die Pipeline verhält sich wie gewohnt. |
| Ein Build bricht und niemand weiß warum — Logs sind über drei Tools verteilt. | Build-Fehler sind standardisiert dokumentiert und nachvollziehbar. Ein Ort, ein Format. |
| Quality Gates werden situativ gesetzt, wenn überhaupt. | Coverage, Linting und Security-Schwellen sind zentral definiert und durchgesetzt. |
| Nur Herr Schmidt weiß, wie die Release-Pipeline wirklich funktioniert. | Release-Prozesse laufen dokumentiert in Git. Jeder im Team kann deployen. |

---

## Section 4 — So lösen wir das

**Status:** `DRAFT`

```
## So gehen wir vor

Wir zwingen Ihnen kein neues Tool auf. Wir standardisieren, was Sie
schon haben — oder bauen neu, wenn noch nichts da ist.
```

### 1. Inventur
Wir schauen uns an, was heute an Pipelines existiert: Tools, Quality Gates, Security-Scans, Test-Abdeckung, bekannte Pain Points. Am Ende wissen wir, was erhaltenswert ist und wo die Lücken sind.

### 2. Template-Design
Wir entwerfen wiederverwendbare Pipeline-Bausteine auf Basis Ihres vorhandenen Stacks — GitLab CI, GitHub Actions, Jenkins, Azure DevOps. Kein Plattform-Wechsel, wenn er nicht nötig ist.

### 3. Security-Baseline
SAST, DAST, Dependency-Scanning, Secret Detection, Container-Scanning, License-Scanning — Standardausrüstung jeder Pipeline. Orientiert an den Anforderungen, die wir aus DevSecOps-Projekten unter BaFin-Aufsicht kennen.

### 4. Quality-Baseline
Unit-Tests, Code Coverage, Linting, Build-Time-Monitoring. Quality Gates sind zentral konfiguriert — nicht pro Projekt verhandelt.

### 5. Schrittweise Migration
Bestehende Projekte wandern nach und nach auf das Template. Wir starten mit den kritischsten Repositories, nicht mit dem einfachsten. Kein Big Bang, keine parallelen Wartungsinseln über Monate.

### 6. Enablement
Ihr Team bekommt die Templates nicht nur ausgehändigt — es lernt, sie selbst zu erweitern und anzupassen. Dokumentation, Schulung und Sparring, bis das Team eigenständig arbeitet.

---

## Section 5 — Warum wir

**Status:** `DRAFT`

```
## Warum uns
```

- **DevSecOps-Plattform für eine deutsche Privatbank unter BaFin-Aufsicht.** GitLab Enterprise mit SAST, DAST, Dependency-Scanning, Container-Scanning, Nessus-Integration, automatisierten Compliance-Reports und PAM-Integration für privilegierte CI/CD-Zugriffe.
- **Vollautomatisierte GitLab-CI- und FluxCD-Pipelines bei einem öffentlichen IT-Dienstleister unter BSI-Grundschutz** — mehrere Jahre im Produktivbetrieb, mit täglichen Integrationstests aller Automationspfade.
- **Build-Laufzeit-Optimierung bei einem E-Commerce-Konzern mit Millionen-Nutzern.** Spark-basierte Datenpipelines, Reduktion der Build-Zeiten um signifikante Prozentsätze.
- **Migration von Nexus 2 zu GitLab Package Registry und AWS CodeArtifact** — ohne Downtime, mit vollständiger Workflow-Integration in bestehende Change-Management-Prozesse.
- **10+ Jahre Pipeline-Erfahrung** über Jenkins, GitLab CI, GitHub Actions, Azure DevOps und Tekton — von Data-Engineering-Pipelines bis Compliance-kritischen Security-Stacks.

---

## Section 6 — Häufige Fragen

**Status:** `DRAFT`

```
## Häufige Fragen
```

### "Wir nutzen [GitLab / GitHub / Jenkins / Azure DevOps] — können Sie das?"
Ja. Wir arbeiten mit dem Tool, das Sie bereits nutzen, statt einen Plattform-Wechsel zu erzwingen. Erfahrung haben wir mit allen großen CI-Systemen: GitLab CI, GitHub Actions, Jenkins, Azure DevOps, Tekton. Falls Ihr bestehendes Tool tatsächlich ein limitierender Faktor ist, sagen wir das offen — aber das ist die Ausnahme, nicht die Regel.

### "Müssen wir alle bestehenden Pipelines neu bauen?"
Nein. Wir starten mit den kritischsten Repositories und migrieren schrittweise. Bestehende Pipelines laufen weiter, bis sie nach und nach auf das neue Template umziehen. Es gibt keine Wartungsinsel über Monate, aber auch keinen Big Bang.

### "Welche Security-Tools setzen Sie ein?"
Je nach Stack und Anforderung: SAST (z.B. GitLab SAST, Semgrep), DAST, Dependency-Scanning (Trivy, Grype, Dependabot), Secret Detection, Container-Scanning, License-Scanning. Wir wählen die Tools, die zu Ihrem Team und Budget passen — nicht die teuersten auf dem Markt.

### "Wie lange dauert die Einführung eines ersten Templates?"
Ein produktionsfähiges Basis-Template steht erfahrungsgemäß in 2–3 Wochen, inklusive Tests, Security-Baseline und Dokumentation. Der anschließende Rollout auf bestehende Projekte erfolgt schrittweise — Tempo bestimmt Ihr Team.

### "Wir haben heute keine Tests. Lohnt sich das dann überhaupt?"
Ja, aber anders. Dann ist die Pipeline erstmal ein Gerüst: Linting, Security-Scans, Build-Reproduzierbarkeit. Tests bauen wir später gemeinsam auf, während Sie im Tagesgeschäft bleiben. Wir sind ehrlich zu Ihnen, welche Schritte Priorität haben und welche warten können.

### "Was, wenn Sie ausfallen?"
Wir arbeiten mit einem Netzwerk vertrauenswürdiger Kollegen zusammen, das im Notfall einspringen kann. Alles, was wir bauen, ist in Git dokumentiert und nutzt Standard-Tools — jeder qualifizierte Pipeline-Engineer kann nahtlos weitermachen.

---

## Section 7 — CTA

**Status:** `DRAFT`

```
## Bereit für Pipelines, die funktionieren — und das in allen Teams?

Wir starten mit einem 30-minütigen Kennenlerngespräch. Unverbindlich,
ohne Vertrieb, ohne PowerPoint. Sie beschreiben Ihre aktuelle
Pipeline-Landschaft, wir sagen Ihnen ehrlich, wo wir helfen können.

[Kennenlerngespräch buchen →]

Lieber erst schriftlich? Schreiben Sie uns kurz, welche CI-Tools Sie
einsetzen und wo es am meisten weh tut — wir antworten mit einer
ersten Einschätzung.

[E-Mail schreiben]
```
