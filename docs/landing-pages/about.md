# Über uns — `/ueber-uns`

**Status:** `DRAFT`
**Last updated:** 2026-11-02
**Implementation:** [about.component.html](../../frontend/src/app/pages/about/about.component.html) (styles shared with the service detail pages)

The person page behind "Kubernetes Experte" and "GitLab Experte" searches: those results are dominated by profiles that lead with a name and certifications (see [seo.md](seo.md)). Decided by Hans on 2026-11-02.

**Voice:** third person about Hans Fischer ("Hans Fischer ist …"); "Wir" stays for Guided Traffic, including on this page. This is the one page that names the person behind the site, an explicit exception to the bus-factor framing in [strategy.md](strategy.md) §2. The network section answers the bus-factor question on the page itself.

## Sections and where each claim comes from

Every claim is taken from copy already on the site or from the trust stack in [strategy.md](strategy.md) §3. Nothing new is asserted.

| # | Section | Claims | Source |
|---|---|---|---|
| — | Hero: "Hinter Guided Traffic steht Hans Fischer." | Cloud Architect; CKS; 10+ years; private bank under BaFin, public sector under BSI-Grundschutz, e-commerce with millions of customers | strategy.md §3; home "Warum wir" |
| 01 | Schwerpunkte | Kubernetes platforms incl. containerization; GitLab CI and templates, plus Jenkins, GitHub Actions, Azure DevOps, Tekton; FluxCD, Ansible; Network Policies, Pod Security, secret handling; own open-source tools | service pages, CI "Warum wir", home "Zertifizierte Security" and "Open Source" |
| 02 | Ausgewählte Projekte | Hybrid Kubernetes and GitLab Enterprise DevSecOps at the private bank; 3.5 years multi-cluster platform and GitLab CI/FluxCD at the public IT provider; AKS automation in finance; network-policy framework and Spark pipelines in e-commerce | Kubernetes and CI "Warum wir"; strategy.md §3 (3.5 years) |
| 03 | Geprüftes Wissen | CKS (Linux Foundation); AWS Certified Cloud Practitioner | Kubernetes "Warum wir"; strategy.md §3 |
| 04 | Vertretung und Kapazität | Network of trusted colleagues; everything documented in the customer's Git repository; the team builds along | home FAQ "Was passiert, wenn Sie ausfallen?" |
| 05 | Nächster Schritt | 30-minute introductory call | service page CTAs |

## Open points

- **Photo:** none in the repo. A person page without a face is weaker for the intent it serves; the hero has room for one next to the text.
- **"Zweifach bestanden"** (CKS) appears on the Kubernetes page but deliberately not here until confirmed.
- **Operator count:** the page says "Kubernetes-Operatoren" without a number, because home says five and the Kubernetes page says seven.
