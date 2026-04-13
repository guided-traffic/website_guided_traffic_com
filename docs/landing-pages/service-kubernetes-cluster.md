# Service Detail Page — Production-ready Kubernetes Cluster

**Slug:** `kubernetes-cluster`
**Route:** `/services/kubernetes-cluster`
**File target:** new Angular component `frontend/src/app/pages/services/kubernetes-cluster/kubernetes-cluster.component.*`
**Primary pain-point match:** Kubernetes-Angst, Rollback = Backup
**Includes:** Application containerization / Legacy-Migration (see strategy.md section 6)
**Last updated:** 2026-04-13

---

## Section 1 — Hero

**Status:** `DRAFT`

### Option A (recommended)
```
# Kubernetes. Ohne Black Box.

Wir bauen produktionsreife Kubernetes-Cluster auf Ihrer Hardware, in Ihrer Cloud
oder hybrid — inklusive Containerisierung Ihrer bestehenden Anwendungen. Nach der
Übergabe betreibt Ihr Team den Cluster selbst, weil wir gemeinsam bauen, nicht
im Elfenbeinturm.

[Kennenlernen →]  [So arbeiten wir]
```

### Option B
```
# Endlich Kubernetes. Ohne dass Ihr Team dabei aussteigt.
```

### Option C
```
# Produktionsreifes Kubernetes, das Ihr Team wirklich versteht.
```

**Open question:** Welche Headline-Variante? A ist am stärksten, weil "Black Box" ein konkretes Gegenbild ist.

---

## Section 2 — Kennen Sie das?

**Status:** `DRAFT`

```
## Kennen Sie das?
```

### 🧩 Kubernetes-Angst
"Zu komplex. Zu intransparent. Zu viel Magie." Kubernetes steht seit zwei Jahren auf der Roadmap — aber niemand in Ihrem Team hat sich ernsthaft herangetraut. Und jeden Monat wird der Rückstand auf den Wettbewerb größer.

### 🔄 Rollback? Nur über Backup.
Anwendungen laufen direkt auf dem Host-System. Der Admin installiert Version X, das Entwicklungsteam glaubt, es läuft Version Y. Wenn etwas kaputtgeht, hilft kein *git revert* — sondern nur das nächtliche Backup und ein paar nervöse Stunden.

### 🏗️ Apps, die nie in einen Container gewandert sind
Ihre Anwendungen laufen auf VMs oder Bare Metal. "Containerisieren könnten wir schon mal" steht seit Jahren auf der Liste — aber niemand weiß genau, wie man anfängt, ohne das ganze System zu destabilisieren.

---

## Section 3 — Vorher / Nachher

**Status:** `DRAFT`

```
## So sieht Ihr Betrieb heute aus — und so sieht er mit Kubernetes aus.
```

| Heute | Mit Kubernetes |
|---|---|
| Deployments laufen per SSH auf einen Host. Wenn der Admin Version X installiert, glaubt das Dev-Team immer noch an Version Y. | Jede Anwendung läuft in einem Container. Version und Konfiguration sind in Git. Keine Interpretation, keine Missverständnisse. |
| Rollback = Backup einspielen, 30 Minuten Downtime, Finger kreuzen. | Rollback per `kubectl rollout undo` — Sekunden, null Downtime. |
| Ein zweiter Server für Ausfallsicherheit steht ungenutzt in Bereitschaft. | Workloads laufen verteilt. Fällt ein Knoten aus, verschiebt Kubernetes die Last automatisch — ohne Anruf um 3 Uhr morgens. |
| Eine neue Umgebung (Staging, Dev, Pentest) aufsetzen = zwei Wochen manuelle Arbeit. | Eine neue Umgebung entsteht per Kommando. Identisch zur Produktion, reproduzierbar, in Minuten statt Wochen. |
| "Kubernetes verstehen wir nicht" — also bleibt das Thema seit Jahren liegen. | Ihr Team versteht jeden Baustein, weil wir gemeinsam aufbauen und übergeben — nicht nur installieren. |

---

## Section 4 — So lösen wir das

**Status:** `DRAFT`

```
## So gehen wir vor

Kein Stichtag, kein Big Bang. Wir arbeiten schrittweise — und Ihr Team ist
von Tag eins dabei.
```

### 1. Assessment
Wir schauen uns Ihre bestehenden Workloads, das Netzwerk, die Security-Anforderungen und den Compliance-Rahmen an. Am Ende dieser Phase wissen Sie konkret, welche Apps sich für Containerisierung lohnen, welche Cluster-Topologie zu Ihnen passt und welche Risiken wir adressieren müssen.

### 2. Cluster-Design
On-Prem, Cloud oder hybrid — je nach Ihrer Situation. Wir empfehlen, was zu Ihrem Datenschutz, Ihrer Latenz-Anforderung und Ihrem Budget passt, nicht, was im aktuellen Hype-Zyklus gerade modern ist.

### 3. Produktivreifer Basis-Cluster
Wir bauen einen vollständigen Cluster mit allem, was für den Produktivbetrieb dazugehört: CNI, RBAC, Ingress, Cert-Management, Backup (Velero), Monitoring (Prometheus/Grafana), zentrales Logging. Nichts von "Wir ergänzen das später mal".

### 4. Security-Layer
Network Policies, Pod Security Standards, Policy Enforcement (Kyverno), Secret-Management. Orientiert an BSI-Grundschutz-Prinzipien — aus drei Jahren Erfahrung in einer öffentlichen Umgebung unter genau diesen Auflagen.

### 5. Containerisierung Ihrer Anwendungen
Ihre bestehenden Apps wandern schrittweise in Container und auf den Cluster. Wir priorisieren nach Risiko und Aufwand — und wir sind ehrlich, wenn eine Anwendung sich nicht lohnt zu containerisieren. Dann bleibt sie, wo sie ist.

### 6. GitOps-Übergabe
Alles, was auf dem Cluster läuft, steht in Git. Kein Wissen in einzelnen Köpfen, keine handgestarteten Änderungen. Ihre Admins erweitern und pflegen das System nach der Übergabe selbst — und genau dafür bauen wir es.

---

## Section 5 — Warum wir

**Status:** `DRAFT`

```
## Warum uns

Wir reden nicht nur über Kubernetes. Wir betreiben es seit Jahren in
regulierten Umgebungen — und wir bauen selbst Werkzeuge dafür.
```

- **Certified Kubernetes Security Specialist (CKS)** — das anspruchsvollste Kubernetes-Security-Zertifikat der Linux Foundation. Zweifach bestanden.
- **Hybrid-Cluster für eine deutsche Privatbank unter BaFin-Aufsicht.** Control-Plane in AWS, latenzkritische Workloads On-Prem. PCI-DSS- und DSGVO-konform, mit automatisierten Compliance-Checks und revisionssicheren Audit-Trails.
- **Multi-Cluster-Plattform bei einem öffentlichen IT-Dienstleister** — über drei Jahre Produktivbetrieb unter BSI-Grundschutz, mit vollständig automatisiertem Auf- und Abbau virtueller Rechenzentren.
- **AKS-Automatisierung im Finanzsektor** (Hamburger Finanzkonzern) inklusive sicherer Secret-Übernahme aus Azure Key Vault.
- **Network-Policy-Framework bei einem E-Commerce-Dienstleister** — Zero-Trust-Ansatz für einen produktiven Kubernetes-Cluster.
- **Sieben eigene Open-Source-Kubernetes-Operators** — von Secret-Management bis Identity Provider. Wir bauen Kubernetes-Tools selbst, nicht nur Präsentationen darüber. [→ Zu unseren Operators](`/products`)
- **10+ Jahre Infrastructure-Erfahrung** in regulierten und hoch skalierten Umgebungen.

---

## Section 6 — Häufige Fragen

**Status:** `DRAFT`

```
## Häufige Fragen
```

### "Ist Kubernetes nicht komplett übertrieben für unsere Größe?"
Manchmal ja, manchmal nein. Wenn Sie drei statische Websites betreiben, würden wir Ihnen Kubernetes nicht empfehlen — dann ist Ansible die bessere Wahl. Wenn Sie aber mehr als eine Handvoll Anwendungen haben, die nicht gleichzeitig ausfallen sollen, lohnt sich Kubernetes auch im Mittelstand. Wir sagen Ihnen im Erstgespräch ehrlich, was zu Ihrer Situation passt.

### "Müssen wir in die Public Cloud?"
Nein. Wir betreiben Kubernetes genauso gut auf Ihren eigenen Servern, in Ihrem Rechenzentrum, auf Proxmox, VMware oder Bare Metal. Ein hybrider Aufbau — Teile On-Prem, Teile Cloud — ist ebenfalls möglich und bei vielen Mittelständlern die pragmatischste Lösung.

### "Wie lange dauert die Umstellung ungefähr?"
Ein produktionsreifer Cluster steht erfahrungsgemäß in 2–4 Wochen. Die Migration Ihrer bestehenden Anwendungen hängt von deren Zahl und Komplexität ab — wir arbeiten schrittweise und nach Risiko priorisiert, nicht im Big Bang.

### "Was passiert mit unseren bestehenden Anwendungen?"
Sie werden Stück für Stück containerisiert und auf den Cluster gehoben. Alles, was sinnvoll in einen Container passt, wird paketiert. Wo Container sich nicht lohnen — zum Beispiel bei sehr spezieller Legacy-Software — bleibt der alte Betriebsweg bestehen. Wir zwingen nichts auf.

### "Wer betreibt den Cluster nach der Übergabe?"
Ihr Team. Genau dafür bauen wir ihn so, wie wir ihn bauen: alles läuft über Git (GitOps), alles ist dokumentiert, alle Komponenten sind Standard und in der Community gut unterstützt. Sie bekommen keine Abhängigkeit von uns — Sie bekommen die Umstellung.

### "Was, wenn Sie ausfallen?"
Wir arbeiten mit einem Netzwerk vertrauenswürdiger Kollegen zusammen, das im Notfall einspringen kann. Wichtiger noch: durch den GitOps-Ansatz ist Ihre Infrastruktur zu jedem Zeitpunkt vollständig in Git dokumentiert. Jeder qualifizierte Kubernetes-Admin kann sie lesen, verstehen und weiterführen — auch ohne uns.

---

## Section 7 — CTA

**Status:** `DRAFT`

```
## Bereit, Kubernetes endlich anzugehen?

Wir starten mit einem 30-minütigen Kennenlerngespräch. Unverbindlich,
ohne Vertrieb, ohne PowerPoint. Sie beschreiben Ihre Situation, wir
sagen Ihnen ehrlich, ob und wie wir helfen können.

[Kennenlerngespräch buchen →]

Lieber erst schriftlich? Schreiben Sie uns Ihre aktuelle Infrastruktur kurz
per E-Mail, wir antworten mit einer ersten Einschätzung — kostenlos und
unverbindlich.

[E-Mail schreiben]
```

**Open questions (cross-page):**
- Sollen alle drei Detail-Seiten den gleichen CTA-Block nutzen (konsistent), oder pro Seite leicht angepasst?
- E-Mail-Alternative: Welche Adresse — `mail@hans-scher.com` oder neutral `hello@guided-traffic.com`?
