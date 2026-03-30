# website_guided_traffic_com

Monorepo for [www.guided-traffic.com](https://www.guided-traffic.com) – Managed Kubernetes Clusters.

## Structure

```
backend/          Go backend (health check API)
frontend/         Angular frontend (SSR + Prerendering)
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

Angular with SSR and prerendering for fast initial page loads. Key routes (`/`, `/features`) are prerendered at build time and hydrated on the client.

```bash
cd frontend
npm install
npm run build       # Builds with prerendering
npm run serve:ssr   # Serves SSR on :4000
```

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
