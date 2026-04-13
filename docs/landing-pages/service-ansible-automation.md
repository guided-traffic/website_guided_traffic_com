# Service Detail Page — OnPrem Provisionierung mit Ansible

**Slug:** `ansible-automation`
**Route:** `/services/ansible-automation`
**File target:** new Angular component `frontend/src/app/pages/services/ansible-automation/ansible-automation.component.*`
**Primary pain-point match:** Schneeflocken-Server, Bus-Faktor 1
**Important:** This page explicitly does NOT push Cloud. Target audience wants to stay On-Prem, and that is a strength of the offering.
**Last updated:** 2026-04-13

---

## Section 1 — Hero

**Status:** `DRAFT`

### Option A (recommended)
```
# Schluss mit handgepflegten Servern.

Wir automatisieren Ihre bestehende On-Prem-Infrastruktur mit Ansible — Inventar,
Baseline, Updates, Firewall-Regeln, Backups. Alles versioniert, alles reproduzierbar,
alles nachvollziehbar. Kein Cloud-Zwang, kein Plattform-Umzug.

[Kennenlernen →]  [So arbeiten wir]
```

### Option B
```
# Ihre Server. Reproduzierbar. Ohne Cloud-Zwang.
```

### Option C
```
# Weg von der Schneeflocken-Infrastruktur.
```

**Open question:** Welche Headline-Variante? A ist die stärkste — konkret und mit direktem Anti-Cloud-Signal.

A ist super!

---

## Section 2 — Kennen Sie das?

**Status:** `DRAFT`

```
## Kennen Sie das?
```

### ❄️ Schneeflocken-Server
Jeder Server ist "irgendwie ein bisschen anders". Über Jahre gewachsen, per SSH gepflegt, Konfiguration in niemandes Kopf vollständig. Updates sind ein Herzinfarkt-Event, weil niemand sicher sagen kann, was dabei kaputtgehen wird.

### 🚨 Bus-Faktor 1
Nur eine Person weiß, wie welcher Server wirklich konfiguriert ist — und warum. Ist sie im Urlaub oder krank, traut sich niemand an kritische Änderungen heran.

### 📋 Keine Versionshistorie der Infrastruktur
Eine Sicherheitslücke taucht auf. Welche Server sind betroffen? Wer hat vor zwei Jahren welchen Patch eingespielt? Die Antwort steht in keiner Dokumentation — sondern im Kopf eines Kollegen, der vielleicht nicht mehr im Unternehmen ist.

---

## Section 3 — Vorher / Nachher

**Status:** `DRAFT`

```
## So sieht Ihre Server-Landschaft heute aus — und so sieht sie mit Ansible aus.
```

| Heute | Mit Ansible |
|---|---|
| Jeder Server ist "irgendwie gewachsen". Niemand weiß mehr, warum welche Config-Datei so aussieht. | Jede Einstellung steht in einem Playbook. Git ist die Wahrheit, nicht `/etc`. |
| Einen neuen Server aufsetzen? Zwei Tage manuelles Dokumentations-Puzzle. | Einen neuen Server aufsetzen? Ein Kommando, 30 Minuten, fertig. |
| Updates werden auf Freitagabend gelegt — mit Bereitschaftsdienst am Wochenende. | Updates laufen werktags, identisch auf allen Servern, vorher auf einem Test-Node geprüft. |
| Eine Sicherheitslücke wird auf 40 Servern manuell nachgezogen. | Eine Sicherheitslücke wird in einem Playbook behoben — und rollt automatisiert über alle betroffenen Server. |
| Nur Herr Schmidt weiß, wie die Firewall wirklich konfiguriert ist. | Die Firewall-Konfiguration steht in Git, kommentiert und für jedes Teammitglied lesbar. |
| Ein Compliance-Audit = drei Wochen Screenshots, Excel-Listen und Rückfragen. | Ein Compliance-Audit = ein Git-Repo und ein Log. Jede Änderung nachvollziehbar, jede Konfiguration dokumentiert. |

---

## Section 4 — So lösen wir das

**Status:** `DRAFT`

```
## So gehen wir vor

Kein Plattform-Umzug. Kein Cloud-Zwang. Wir arbeiten mit Ihrer
bestehenden Infrastruktur — und machen sie reproduzierbar.
```

### 1. Inventur
Welche Server existieren, wer hängt von wem ab, wo gibt es heute Konfigurations-Drift? Wir erfassen den Ist-Zustand ehrlich — auch die unangenehmen Stellen, die lieber niemand anfasst.

### 2. Baseline-Definition
Für jede Server-Klasse (Web, Datenbank, Firewall, Monitoring, …) definieren wir einen einheitlichen Ausgangszustand. Das ist die Grundlage, auf der später alle Server zusammengeführt werden.

### 3. Ansible-Collections
Statt loser Skripte bauen wir strukturierte Rollen und Collections. Wiederverwendbar, testbar, versioniert. Kein "der eine Skript-Ordner, den niemand anfassen will".

### 4. Schrittweise "Ansibilisierung"
Server für Server wird dem Baseline-Zustand angeglichen. Produktionsserver zuletzt, nach gründlichen Tests. Kein Big Bang, keine riskanten Wochenend-Aktionen.

### 5. Zentrale Verwaltung
Je nach Team-Größe und Wunsch: Ansible Tower / AWX für größere Teams mit RBAC und Audit-Log, oder schlicht Git + GitLab CI für kleinere Setups. Wir empfehlen ehrlich, was zu Ihrer Größe passt.

### 6. Enablement
Ihr Team schreibt und pflegt Playbooks nach der Übergabe selbst. Wir schulen, begleiten und übergeben dokumentiert — damit Sie nach der Umstellung unabhängig weiterarbeiten können.

---

## Section 5 — Warum wir

**Status:** `DRAFT`

```
## Warum uns
```

- **Terraform- und Ansible-basierte Virtual-Datacenter-Provisionierung bei einem öffentlichen IT-Dienstleister unter BSI-Grundschutz.** Über drei Jahre Produktivbetrieb, mit automatisiertem Auf- und Abbau virtueller Rechenzentren pro Umgebung und Kunde.
- **Zero-Trust-Netzwerk-Migration bei einem mittelständischen IT-Dienstleister.** Fortigate-Ersatz durch pfSense auf Proxmox-Nodes, vollständig per Ansible automatisiert — inklusive IPsec/WireGuard-VPNs, VLANs und Firewall-Regelverwaltung.
- **Eigene Ansible-Collections** für Cloud- und pfSense-Automatisierung entwickelt und in produktiven Umgebungen eingesetzt.
- **On-Premise-Kubernetes-Betrieb bei einem deutschen Internet-Service-Provider** — die gesamte Grundinfrastruktur vollständig per Ansible provisioniert, inklusive Storage-Layer (Rook-Ceph) und Netzwerk.
- **10+ Jahre Linux-Betriebserfahrung** auf Debian, Ubuntu, RHEL und FreeBSD.

---

## Section 6 — Häufige Fragen

**Status:** `DRAFT`

```
## Häufige Fragen
```

### "Wir haben keine Cloud und wollen auch keine — geht das überhaupt?"
Ja. Genau dafür ist diese Leistung gedacht. Wir arbeiten mit Ihrer bestehenden On-Prem-Infrastruktur — Proxmox, VMware, Bare Metal, was immer Sie haben. Kein Cloud-Zwang, kein Plattform-Umzug, kein versteckter Vendor-Lock-In.

### "Müssen alle Server sofort umgestellt werden?"
Nein. Wir arbeiten schrittweise, Server-Klasse für Server-Klasse. Produktionssysteme werden zuletzt migriert, nach ausgiebigen Tests auf nicht-kritischen Maschinen. Während der Umstellung bleibt Ihre Infrastruktur betriebsbereit.

### "Was ist mit unseren Windows-Servern?"
Ansible kann Windows-Server genauso automatisieren wie Linux — über WinRM oder SSH. Der Fokus unserer Erfahrung liegt auf Linux, aber Windows-Baselines sind möglich. Wir sagen Ihnen im Erstgespräch ehrlich, wo wir tiefer sind und wo wir punktuell Kollegen aus dem Netzwerk hinzuziehen.

### "Wie dokumentieren Sie die bestehende Konfiguration?"
Die Dokumentation *entsteht* durch die Automatisierung. Jede Playbook-Rolle ist gleichzeitig eine ausführbare Spezifikation des Soll-Zustands. Wer wissen will, wie ein Server konfiguriert ist, liest das Playbook — und muss nicht mehr in `/etc` archäologisch graben.

### "Können wir später auf Kubernetes umziehen, wenn wir wollen?"
Ja. Die Ansible-basierte Automatisierung ist kein Gegensatz zu Kubernetes — im Gegenteil. Wer seine Server erst mal reproduzierbar hat, kann später viel leichter selektiv Workloads in Container oder auf einen Cluster verschieben. Wir beraten Sie auch dabei, wenn der Zeitpunkt kommt.

### "Was, wenn Sie ausfallen?"
Wir arbeiten mit einem Netzwerk vertrauenswürdiger Kollegen zusammen, das im Notfall einspringen kann. Ansible ist außerdem eines der am weitesten verbreiteten Automatisierungstools — jeder erfahrene Linux-Admin kann Ihre Playbooks lesen und weiterpflegen, auch ohne uns.

---

## Section 7 — CTA

**Status:** `DRAFT`

```
## Bereit, Ihre Server endlich reproduzierbar zu machen?

Wir starten mit einem 30-minütigen Kennenlerngespräch. Unverbindlich,
ohne Vertrieb, ohne PowerPoint. Sie beschreiben Ihre Server-Landschaft,
wir sagen Ihnen ehrlich, wo eine Automatisierung den größten Hebel hat.

[Kennenlerngespräch buchen →]

Lieber erst schriftlich? Schreiben Sie uns kurz, wie viele Server Sie
betreiben und welche Betriebssysteme — wir antworten mit einer ersten
Einschätzung.

[E-Mail schreiben]
```
