# internal-secrets-operator

**Repository:** https://github.com/guided-traffic/internal-secrets-operator
**Status:** stable
**License:** Apache License 2.0
**Last updated:** 2026-04-13

## Value proposition

internal-secrets-operator removes the manual, error-prone work of creating and rotating cryptographically secure Kubernetes Secrets by automating generation, scheduled rotation, and cross-namespace replication entirely through standard Secret annotations — no new CRDs, no external secret store required.

## Target customer

- **Primary:** Platform engineering and DevOps teams running Kubernetes who own the secret lifecycle for internal credentials (database passwords, API keys, signing keys, inter-service tokens).
- **Secondary:** Security-driven organizations that need post-quantum-ready key generation and audit-safe rotation windows without adopting a full secret manager like Vault.
- **Pain point:** Teams currently hand-craft secrets, store them in Git (SealedSecrets), or run brittle rotation scripts. They want zero-touch, policy-driven secret hygiene inside the cluster.

## Key features

- **Annotation-driven configuration** — Secrets are controlled via `iso.gtrfc.com/` annotations on native Kubernetes Secret objects. No new CRDs means zero schema migration risk and compatibility with any existing tooling.
- **Cryptographically secure generation** — Supports `string` (alphanumeric), `bytes` (raw), `rsa`, `ecdsa`, `ed25519`, and three post-quantum algorithms: `mlkem` (ML-KEM), `mldsa` (ML-DSA), `slhdsa` (SLH-DSA).
- **Configurable length and character sets** — Defaults to 32-character strings with upper, lower, and numeric; overridable per field.
- **Scheduled automatic rotation** — Rotation interval set via Go duration strings (`24h`, `7d`, `90d`). The operator tracks last-rotation state and rotates on schedule without human intervention.
- **Maintenance window enforcement** — Rotation can be restricted to approved time windows, satisfying change-management policies in regulated environments.
- **Mutual-consent replication** — Secrets can be pushed to or pulled from other namespaces. Both source and target must carry matching annotations, preventing unauthorized cross-namespace reads.
- **Least-privilege RBAC** — Default ClusterRole/ClusterRoleBinding can be narrowed to namespace-scoped RoleBindings for multi-tenant clusters.
- **Non-root, hardened container** — Runs as UID 65532, read-only filesystem, all Linux capabilities dropped.
- **High availability** — Leader election enabled; replica count is configurable.
- **Prometheus observability** — Optional ServiceMonitor for scraping operator metrics.
- **Zero secret logging** — Sensitive values are never written to operator logs.

## Integrations and dependencies

- **Kubernetes** 1.25+ (uses controller-runtime v0.23, k8s API v0.35)
- **Helm** — first-class Helm chart at `deploy/helm/internal-secrets-operator` (image: `docker.io/guidedtraffic/internal-secrets-operator`)
- **Kustomize** — alternative installation path via `config/`
- **Prometheus / ServiceMonitor** — optional scrape endpoint for metrics
- **Cloudflare CIRCL** (v1.6.3) — provides post-quantum cryptographic primitives (ML-KEM, ML-DSA, SLH-DSA)
- **golang.org/x/crypto** — standard Go cryptography for classical algorithms
- **Zap / logr** — structured logging
- **Renovate** — automated dependency updates configured out of the box
- No dependency on Vault, AWS KMS, GCP KMS, or any external secret store

## Differentiators

- **vs. Bitnami SealedSecrets** — SealedSecrets encrypts secrets for GitOps delivery; it does not generate or rotate values. internal-secrets-operator generates fresh random material on demand and rotates it on a schedule.
- **vs. ExternalSecrets Operator (ESO)** — ESO syncs secrets from external stores (Vault, AWS SM, etc.). internal-secrets-operator is self-contained: it creates secret material inside the cluster without requiring an external store, making it ideal for internal credentials that do not need to live outside Kubernetes.
- **vs. HashiCorp Vault (dynamic secrets)** — Vault is a full secret management platform with significant operational overhead. internal-secrets-operator targets teams that want automated rotation and generation without running and licensing a separate infrastructure tier.
- **vs. cert-manager** — cert-manager is narrowly focused on X.509 certificates. internal-secrets-operator handles arbitrary secret material including passwords, symmetric keys, and asymmetric keypairs including post-quantum types.
- **vs. manual scripts / CronJobs** — Rotation scripts have no state tracking, no maintenance window support, and no mutual-consent replication. The operator provides all of these as first-class primitives.
- **Post-quantum readiness** — Support for NIST-standardized ML-KEM, ML-DSA, and SLH-DSA is a differentiated capability not found in any of the above alternatives.

## Technical stack

- **Language:** Go 1.26
- **Operator framework:** controller-runtime v0.23 (sigs.k8s.io)
- **Cryptography:** golang.org/x/crypto + Cloudflare CIRCL (post-quantum)
- **Runtime:** Kubernetes 1.25+
- **Container:** OCI image (Containerfile), non-root, read-only FS
- **Deployment:** Helm chart or Kustomize
- **Observability:** Prometheus metrics via ServiceMonitor
- **CI/release:** GitHub Actions, semantic-release (.releaserc.json), Renovate

## Sales talking points

- "Stop writing rotation scripts — annotate your Secret and the operator handles generation, rotation, and replication forever."
- "No new CRDs, no schema migrations — it works with every Kubernetes tool you already use."
- "Built-in post-quantum key generation (ML-KEM, ML-DSA, SLH-DSA) — start preparing for cryptographic agility today."
- "Maintenance window support means rotation happens in your change window, not at 3 AM on a Friday."
- "Mutual-consent replication means secrets can cross namespace boundaries without giving every team cluster-admin."
- "Apache 2.0 license — no licensing fees, no vendor lock-in, full audit access to source code."
- "Lightweight footprint: 10m CPU / 64Mi RAM request; runs alongside your existing workloads at negligible cost."

## Open questions / gaps

- **No confirmed stable release tag** — the repository was created in December 2025 and carries no confirmed v1.x tag; customers should treat this as alpha-stage software and conduct their own validation before production use.
- **No public documentation site** — all documentation lives in the README; richer operational guides (runbooks, upgrade procedures, troubleshooting) are not yet published.
- **No description or topics on GitHub** — discoverability is low; prospects are unlikely to find this organically.
- **Helm chart version not confirmed** — the chart exists but the specific version number was not accessible; verify with `helm show chart` before quoting a version to prospects.
- **Replication conflict resolution** — the README does not describe behavior when a push and pull annotation conflict on the same secret; clarify with engineering before customer demos involving multi-team namespaces.
- **Rotation failure handling** — behavior when rotation fails mid-cycle (e.g., API server unreachable) is not documented; understand retry and alerting behavior before pitching to SRE audiences.
- **No stated performance benchmarks** — large clusters with thousands of annotated secrets may hit rate limits; no throughput numbers are published.
