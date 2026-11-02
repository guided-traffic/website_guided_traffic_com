# SEO — Keyword Targets

**Status:** `DRAFT`
**Last updated:** 2026-11-02

The site should be found on google.de for **"Kubernetes Experte"** and **"GitLab Experte"**. This page maps each target to one URL and records why. The snippet strings themselves live in [`app.routes.ts`](../../frontend/src/app/app.routes.ts) (`title`, `data.description`); the mechanics are described in the [README](../../README.md#seo).

## 1. Targets

| Keyword | Target URL | `<title>` | Status |
|---|---|---|---|
| Kubernetes Experte, Kubernetes Berater | `/services/kubernetes-cluster` | Kubernetes-Experte für den Mittelstand \| Guided Traffic | `DRAFT` |
| GitLab Experte, GitLab CI | `/services/ci-pipelines` | GitLab-Experte: CI-Pipelines und Templates \| Guided Traffic | `DRAFT` |
| Hans Fischer, Kubernetes-Experte (person intent) | `/ueber-uns` | Hans Fischer, Cloud Architect (CKS) \| Guided Traffic | `DRAFT` |
| Kubernetes + GitLab CI (brand-level) | `/` | Kubernetes & GitLab CI für den Mittelstand \| Guided Traffic | `DRAFT` |

Not targeted, on purpose:

- **Kubernetes Freelancer** — job and marketplace intent (freelancermap, GULP, Malt), not buyers.
- **Kubernetes Dienstleister** — managed-hosting intent; we sell projects, not hosting.
- **Any city** — the business address is Magdeburg (impressum) and no page names a city, so "… aus Hamburg" or similar would be a claim without backing.

## 2. What the search results looked like (2026-11-02)

Source: web search, not a google.de ranking export. No search volumes were available; relative judgements are marked as such.

- **"Kubernetes Experte"**: mostly freelancer profiles (e.g. freelancermap), job boards (StepStone) and English hiring guides. Intent is "hire a person". Profiles carry the keyword in the H1 and lead with certifications.
- **"GitLab Experte"**: English marketplaces (Codementor, Contra) and job listings; almost no German service pages. The strongest German GitLab service page found was codecentric's GitLab migration page.
- Judgement: the GitLab SERP is thin, so a focused German page has an opening; the Kubernetes SERP rewards a visible person with credentials.

## 3. Decisions

- **GitLab target page (2026-11-02, Hans):** `/services/ci-pipelines` is the GitLab page; no dedicated `/services/gitlab`. That page already names GitLab six times and in four of its five trust items, and a second page would compete with it for the same queries on a domain without authority. Revisit when Search Console shows GitLab queries ranking on result pages 2–3.
- **Visible keyword (2026-11-02, Hans):** the Kubernetes H1 reads "Kubernetes-Experten. Ohne Black Box." (one word added, hook kept). The CI H1 stays as is, since "GitLab" does not fit its hook; the first sentence below it starts with "Als GitLab-Experten …". The copy uses the plural to keep the "Wir" voice; the titles carry the singular search term.
- **Person page (2026-11-02, Hans):** `/ueber-uns` names Hans Fischer in the third person, with credentials and anonymized projects ([about.md](about.md)). Linked from the footer and from the trust sections of home, Kubernetes and CI. Its title leads with the name, not "Kubernetes-Experte", so it does not compete with `/services/kubernetes-cluster` for the same title.

## 4. Off-page levers (not started)

- Link to the site from the READMEs of the published operator repositories.
- Profiles on freelancermap and Malt with the keyword in the headline (both appear in the results; whether they allow a website link is unverified).
- Google Business Profile for the Magdeburg address (service-area rules unverified).
- GitLab's partner programme lists Professional Services Partners, which requires certification; not realistic as a first step.
