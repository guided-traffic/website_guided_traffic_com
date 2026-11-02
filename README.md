# website_guided_traffic_com

Monorepo for [www.guided-traffic.com](https://www.guided-traffic.com) – Managed Kubernetes Clusters.


## Structure

```
backend/          Go backend (health check API)
frontend/         Angular frontend (server-side rendering)
helm/             Helm chart for Kubernetes deployment
```

## Backend

Go 1.24 HTTP server with health/readiness endpoints.

```bash
cd backend
go run .
# http://localhost:8080/healthz
```

## Frontend

Angular with server-side rendering: [`frontend/server.ts`](frontend/server.ts) renders every page per request with `CommonEngine` and the client hydrates it. Nothing is prerendered at build time (the Docker image builds with `--no-prerender`).

```bash
cd frontend
npm install
npm run build       # Builds browser and server bundles
npm run serve:ssr   # Serves SSR on :4000
```

### Allowed hosts

The engine only renders for the hosts listed in `allowedHosts` in [`frontend/server.ts`](frontend/server.ts): `www.guided-traffic.com`, `guided-traffic.com` and `localhost`. The environment variable `NG_ALLOWED_HOSTS` (comma-separated, e.g. `staging.guided-traffic.com # example`) adds more at runtime. A request with any other `Host` header fails with a server error instead of rendering, so the Kubernetes probes use `/healthz`, which answers without the engine.

### SEO

| What | Where |
|---|---|
| `<title>` and meta description per page | `title` and `data.description` of each route in [`app.routes.ts`](frontend/src/app/app.routes.ts) |
| Canonical link, `og:title`, `og:description`, `og:url` | written by [`SeoTitleStrategy`](frontend/src/app/services/seo-title.strategy.ts), always on `https://www.guided-traffic.com` |
| Static Open Graph tags, JSON-LD (`ProfessionalService`) | [`index.html`](frontend/src/index.html) |
| `robots.txt`, `sitemap.xml` | [`frontend/public/`](frontend/public/) |

A new page route needs a title (≤ 60 characters), a description (≤ 155 characters) and a `<loc>` in `sitemap.xml`; [`app.routes.spec.ts`](frontend/src/app/app.routes.spec.ts) fails otherwise. Paths without a page route answer 404 (the home page still renders), and redirect routes answer 301. Keyword targets per page are in [docs/landing-pages/seo.md](docs/landing-pages/seo.md).

## Helm Chart

Deploys both backend and frontend to Kubernetes.

The chart is published to GitHub Pages via the release pipeline.

### Add the Helm repo

```bash
helm repo add guided-traffic https://guided-traffic.github.io/website_guided_traffic_com/
helm repo update
```

### Install

```bash
helm install guided-traffic-com guided-traffic/guided-traffic-com
```

### Upgrade

```bash
helm repo update
helm upgrade guided-traffic-com guided-traffic/guided-traffic-com
```

### Install from source

```bash
helm install guided-traffic-com ./helm/guided-traffic-com
```

### Docker images

The chart pulls images from Docker Hub:

| Component | Image |
|-----------|-------|
| Frontend  | `guidedtraffic/website-guided-traffic-frontend` |
| Backend   | `guidedtraffic/website-guided-traffic-backend` |

The default tag is `latest`. The release pipeline overrides the tag with the release version via `sed` before packaging.
