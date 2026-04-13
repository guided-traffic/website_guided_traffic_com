# Landing Pages — Working Docs

Working documents for the guided-traffic.com page rewrites, aimed at mid-sized German decision makers.

## Architecture (2026-04-13)

The site uses **one home page + one services overview page + one detail page per service** — structurally identical to the existing `/products` / `/products/<slug>` pattern.

```
/                               → home.md                         (home hub, routes to services)
/services                       → services-overview.md            (services landing / overview)
/services/kubernetes-cluster    → service-kubernetes-cluster.md
/services/ci-pipelines          → service-ci-pipelines.md
/services/ansible-automation    → service-ansible-automation.md
```

Each service detail page is its own specialized landing page targeting a single concrete problem with its own pain-point framing, SEO cluster, and CTA funnel.

## Files in this folder

| File | Corresponds to route | Role | Status |
|---|---|---|---|
| [strategy.md](strategy.md) | — | Shared foundation: audience, voice, trust assets, pain-point pool, service template | `FINAL` |
| [home.md](home.md) | `/` | Home hub — brief pitch + routing to services overview | `IN PROGRESS` |
| [services-overview.md](services-overview.md) | `/services` | Services overview — lists the 3 services with teasers | `TODO` |
| [service-kubernetes-cluster.md](service-kubernetes-cluster.md) | `/services/kubernetes-cluster` | Detail page — Production-ready Kubernetes Cluster (incl. app containerization / legacy migration) | `DRAFT` |
| [service-ci-pipelines.md](service-ci-pipelines.md) | `/services/ci-pipelines` | Detail page — CI-Pipelines & Templates | `DRAFT` |
| [service-ansible-automation.md](service-ansible-automation.md) | `/services/ansible-automation` | Detail page — OnPrem Provisioning mit Ansible | `DRAFT` |

## Angular implementation notes

Mirrors the existing `/products` structure:
- Route definitions: `frontend/src/app/app.routes.ts` — add `services/<slug>` entries, analogous to existing `products/<slug>` routes
- Service data: `frontend/src/app/services/services.service.ts` — extend with `slug`, `ctaLink`, etc. (currently has only `icon`, `title`, `description`; compare to `products.service.ts` which already has the richer schema)
- Overview page: `frontend/src/app/pages/services/services.component.*` — already exists, will be updated to match the new copy and link to detail pages
- Detail pages: new components at `frontend/src/app/pages/services/<slug>/<slug>.component.*` — one per service
- Per CLAUDE.md: HTML, SCSS, TypeScript in separate files

## How to use this folder

- `strategy.md` holds decisions that apply to all pages. Read it first.
- Each `service-*.md` file follows the same 7-section template (see template section in strategy.md).
- Status legend inside each file: `FINAL` = approved · `DRAFT` = proposed, awaiting review · `TODO` = not drafted yet
- Open questions live inline in each file, close to the section they affect.
- Only `FINAL` sections get ported into the Angular components.
