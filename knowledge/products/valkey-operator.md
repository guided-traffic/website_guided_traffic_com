# valkey-operator

**Repository:** https://github.com/guided-traffic/valkey-operator
**Status:** stable (actively maintained, automated updates)
**License:** Apache-2.0
**Last updated:** 2026-04-13

## Value proposition

Redis changed its license in March 2024 from BSD to SSPL/RSALv2, making it non-open-source under OSI definitions. Valkey is the Linux Foundation-backed, BSD-licensed fork that picked up where Redis 7.2 left off and has since become the drop-in replacement of choice for teams that cannot or will not accept the Redis license change.

The valkey-operator removes the operational burden of running Valkey on Kubernetes. Instead of hand-crafting StatefulSets, Sentinel deployments, TLS certificates, PersistentVolumeClaims, NetworkPolicies, and health monitors, platform teams declare a single `Valkey` custom resource and the operator reconciles the entire desired state continuously.

## Target customer

- **Platform engineering teams** that run internal Kubernetes clusters and need to offer a managed, self-service cache layer to product squads — without paying for a cloud-managed Redis service.
- **SaaS ISVs and cost-conscious startups** currently running Redis who need a license-clean replacement with minimal migration friction.
- **Enterprises with existing Redis workloads** that received legal guidance to move off SSPL-licensed Redis and are evaluating open-source alternatives on Kubernetes.
- **DevOps/SRE teams** that value GitOps-style declarative infrastructure and want Prometheus-native observability out of the box.

## Key features

### Deployment modes
- **Standalone mode** — single-node Valkey instance for development and non-critical workloads.
- **Highly available (HA) mode** — multi-node cluster with automatic Sentinel failover management; replica-first rolling update with replication sync verification before each step.

### Security
- Full TLS encryption for Valkey, replication, and Sentinel channels, provisioned via cert-manager integration or custom certificate Secrets.
- **Dual-port mode**: plaintext and TLS ports coexist simultaneously, enabling zero-downtime client migration.
- mTLS support for the Cluster Observer connections to Valkey and Sentinel pods.
- Password management via Kubernetes Secrets; Sentinel can optionally run without client auth (`disableAuth: true`) to support discovery clients that do not implement Sentinel AUTH.

### Data protection and persistence
- RDB snapshots, AOF (append-only file), or both in combination.
- Configurable PersistentVolumeClaims per node.

### Observability — Cluster Observer
- Optional `ObserverSpec` deploys a dedicated diagnostic sidecar that continuously checks: master reachability, replication sync state, write/read round-trip, Sentinel quorum.
- Exposes Prometheus metrics on port 8084 with standard `/metrics`, `/healthz`, and `/readyz` endpoints.
- Fine-grained `unreadyWhen` configuration to tune which check failures are surfaced as unhealthy to Kubernetes probes.

### Networking
- Optional `NetworkPolicy` resources that restrict inbound/outbound traffic to Valkey and Sentinel pods to declared consumers only.
- Consistent Kubernetes label conventions across all managed resources for selector reliability.

### Lifecycle management
- Operator watches `Valkey` CRDs (`vko.gtrfc.com/v1`) and reconciles StatefulSets, ConfigMaps, Services, and Certificate objects.
- Rolling updates with automatic failover and replication verification before proceeding to the next replica.
- Semantic release automation (`.releaserc.json`) suggests a structured versioning discipline.

## Integrations and dependencies

| Dependency | Role | Required |
|---|---|---|
| Kubernetes 1.29+ | Runtime platform | Yes |
| Helm 3 | Operator installation | Yes |
| cert-manager | Automatic TLS certificate provisioning | Optional |
| Prometheus | Metrics scraping from Observer | Optional |
| Grafana | Dashboard consumption of Observer metrics | Optional (bring your own) |
| Kind | Local development and end-to-end testing | Dev only |

CRD group: `vko.gtrfc.com/v1` — nested specs: `SentinelSpec`, `TLSSpec`, `CertManagerSpec`, `PersistenceSpec`, `ObserverSpec`, `AuthSpec`, `NetworkPolicySpec`, `MetricsSpec`.

## Differentiators

**vs. plain Helm chart for Valkey**
A Helm chart is a one-time render; the operator continuously reconciles. Drift, node failures, and configuration changes are automatically corrected. Sentinel failover is orchestrated, not left to static config.

**vs. Spotahome Redis Operator / other Redis operators**
Those operators target Redis (now under a restricted license for the commercial versions). The valkey-operator is purpose-built for Valkey from the start, avoiding any licensing ambiguity and staying on the BSD-licensed fork with Linux Foundation governance.

**vs. managed Redis/Valkey cloud services (Elasticache, Upstash, etc.)**
No per-GB egress costs, no vendor lock-in, no data-residency concerns. Full control over persistence, networking, and TLS configuration inside the customer's own cluster. Relevant for regulated industries or customers with strict data sovereignty requirements.

**vs. running Valkey manually with StatefulSets**
The operator eliminates ~80% of the operational YAML surface area. TLS lifecycle, Sentinel topology management, rolling upgrades, and health monitoring are handled automatically. Reduces toil and reduces the chance of misconfiguration during maintenance events.

**Licensing story (key sales hook)**
Redis Inc.'s March 2024 license change caught many organizations off-guard. Valkey was created specifically to preserve the open-source Redis ecosystem. Using the valkey-operator gives customers a clear, auditable path: Valkey is BSD-licensed, the operator is Apache-2.0, and the Linux Foundation provides long-term governance backing. Legal and procurement teams respond well to this clarity.

## Technical stack

- **Language:** Go (operator runtime built on controller-runtime / kubebuilder patterns)
- **Packaging:** Helm chart (`deploy/helm/valkey-operator`)
- **CI/CD:** GitHub Actions with unit, integration, and end-to-end test suites; Go Report Card; security scanning
- **Code quality:** golangci-lint (`.golangci.yml`), Makefile-driven build targets
- **Release:** Semantic release automation

## Sales talking points

1. **License-clean Redis replacement** — Drop-in Valkey (Redis 7.2 protocol compatible), Apache-2.0 operator, BSD Valkey. Zero SSPL exposure.
2. **HA out of the box** — Sentinel failover, replica-first rolling updates, and automatic recovery without manual runbooks.
3. **Gradual TLS migration** — Dual-port mode means existing plaintext clients keep working while new clients adopt encryption incrementally. No big-bang cutover.
4. **Prometheus-native observability** — Observer deployment gives SRE teams real metrics (quorum state, replication lag, write/read latency) without bolting on external tooling.
5. **GitOps friendly** — Single CRD manifest in a Git repo describes the full cluster topology; the operator does the rest.
6. **Self-hosted, no cloud egress** — For cost-sensitive or data-sovereign customers, running inside their own cluster is materially cheaper than managed Redis at scale.
7. **Backed by guided-traffic engineering** — Active repo (145 commits, updated April 2026), structured release pipeline, and ongoing CI discipline signal a maintained, production-intent project.

## Open questions / gaps

- **No published stable release tag** — The repository does not yet show a v1.0 or GA release. Prospects with strict change management processes may require a tagged, stable release before adoption. Ask engineering for the roadmap to v1.0.
- **Grafana dashboards** — The Observer exposes Prometheus metrics but no bundled Grafana dashboard JSON was confirmed in the README. A pre-built dashboard would significantly improve the out-of-box observability story.
- **Backup/restore to cloud storage** — Persistence (RDB/AOF) to PVCs is covered, but off-cluster backup to S3/GCS/Azure Blob was not mentioned. This is a common enterprise requirement; confirm whether it is on the roadmap.
- **Cluster mode (sharding)** — The README describes standalone and HA-with-Sentinel modes. Redis/Valkey cluster mode (hash-slot sharding across multiple primaries) was not explicitly mentioned. Clarify whether this is in scope.
- **Star count is 0** — The repo is very new (created February 2026). Social proof is limited for now; lead with technical depth and reference customers rather than community size.
- **Upgrade path documentation** — Rolling update mechanics are described, but a formal upgrade guide (operator version N to N+1, CRD version migrations) was not confirmed. Enterprise buyers will ask.
