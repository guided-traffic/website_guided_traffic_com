# jinja-template-operator

**Repository:** https://github.com/guided-traffic/jinja-template-operator
**Status:** stable (actively maintained, automated updates)
**License:** Apache License 2.0
**Last updated:** 2026-04-13

---

## Value proposition

Platform teams spend disproportionate effort stitching together Helm chart values, Kustomize patches, and shell scripts just to produce environment-specific ConfigMaps and Secrets. The jinja-template-operator eliminates that glue layer: declare a `JinjaTemplate` custom resource, point it at existing ConfigMaps and Secrets (individually or via label selectors), write a familiar Jinja2-style template, and the operator continuously renders and reconciles the output. When source data changes, the output updates automatically — no pipeline re-run, no manual intervention.

The result is declarative, auditable config generation that fits naturally into GitOps workflows without requiring Helm templating expertise or custom controllers written from scratch.

---

## Target customer

- **Platform / infrastructure teams** at mid-to-large engineering organizations who manage many application configurations across multiple namespaces and environments and need to aggregate or transform cluster-resident data into rendered configs.
- **Teams migrating from Ansible or SaltStack** who are already fluent with Jinja2 and want that mental model on Kubernetes without learning a new DSL (Cue, ytt, etc.).
- **GitOps adopters (FluxCD / ArgoCD shops)** who need lightweight, in-cluster templating that reacts to live cluster state rather than requiring a full Helm release cycle.
- **Security-conscious teams** that need to reference Secrets in generated configs without ever exfiltrating secret values outside the cluster.

---

## Key features

- **Jinja-like templating engine** — powered by Gonja (a Go port of Jinja2), supporting filters, loops, conditionals, and template inheritance patterns familiar from Python/Ansible ecosystems.
- **Flexible variable sourcing** — each template source can reference a specific ConfigMap/Secret key (direct reference) or dynamically discover all resources matching a label selector, enabling both point-to-point and fan-in aggregation patterns.
- **Reactive reconciliation** — the operator watches source ConfigMaps and Secrets; any change triggers an automatic re-render of the output resource. Dynamic label-selector sources also react when new matching resources appear.
- **Dual output types** — the rendered output can be written as a `ConfigMap` or a `Secret`, giving teams control over how sensitive rendered values are stored.
- **Inline and external templates** — templates can be embedded directly in the CR (`spec.template`) or stored separately in a ConfigMap and referenced via `spec.templateFrom`, keeping large or frequently-edited templates out of the CR manifest.
- **Configurable owner references** — generated resources can be bound to the CR lifecycle (garbage-collected on CR deletion) or left independent, controlled per-CR or globally via Helm values.
- **Cluster-scoped operation** — a single operator instance watches all namespaces; no per-namespace installation required.
- **Kubernetes-native status and error reporting** — a `Ready` condition and Kubernetes Events surface rendering errors (syntax failures, missing sources) directly on the CR, visible via `kubectl describe`.
- **High-availability support** — leader election is available for multi-replica deployments.
- **Aggregate RBAC roles** — the Helm chart optionally creates admin/edit/view ClusterRoles for fine-grained access control.

---

## Integrations and dependencies

| Integration | Details |
|---|---|
| Kubernetes | Cluster-scoped CRD (`JinjaTemplate`, API group `jto.gtrfc.com/v1`); targets any CNCF-conformant cluster |
| Helm | Official Helm chart published via GitHub Pages; standard `helm install` installation path |
| FluxCD / ArgoCD | Works natively — `JinjaTemplate` CRs are Git-managed manifests; reconciliation is driven by the operator, not the GitOps tool |
| Docker Hub | Container image published at `guidedtraffic/jinja-template-operator` with semver tags |
| Gonja (template engine) | Guided Traffic fork of Gonja; the Jinja2-compatible Go library is itself an open-source dependency maintained by the same organization |

No external API dependencies, no database, no webhook infrastructure required beyond standard Kubernetes RBAC and CRD installation.

---

## Differentiators

| Alternative | How jinja-template-operator differs |
|---|---|
| **Helm** | Helm templates run at deploy time and require a Helm release lifecycle. jinja-template-operator is always-on: it reacts to runtime cluster state changes without a redeploy. No Helm expertise or release management overhead. |
| **Kustomize** | Kustomize is a static, pipeline-time transformer. It cannot react to live Secret or ConfigMap changes and has no native templating (only patches and overlays). |
| **Carvel ytt** | ytt is a powerful but proprietary DSL with a steep learning curve. Jinja2 syntax is already known by most ops and platform teams from Ansible/Salt backgrounds. |
| **External Secrets Operator** | ESO pulls secrets from external vaults into Kubernetes Secrets. jinja-template-operator consumes those already-synced Secrets (and ConfigMaps) and renders composite configs from them — the two tools are complementary, not competing. |
| **Custom scripts / init containers** | Ad hoc scripting is not reconciled, not auditable, and not declarative. jinja-template-operator replaces bespoke templating scripts with a standard CRD and a supported operator. |

Key differentiating combination: **Jinja2 familiarity + reactive in-cluster reconciliation + Secret-aware output + zero external dependencies**.

---

## Technical stack

- **Language:** Go (93.7% of codebase)
- **Template engine:** Gonja (guided-traffic fork of Jinja2-compatible Go library)
- **Operator framework:** Kubebuilder / controller-runtime (inferred from project structure and Make targets)
- **Packaging:** Helm chart (GitHub Pages repository)
- **CI/CD:** GitHub Actions (test + semantic release pipeline); Renovate for dependency updates
- **Security:** `gosec` static analysis integrated into the build pipeline
- **Go version:** 1.26.0
- **Release cadence:** 23 releases since February 2026; latest v1.3.16 (April 11, 2026)

---

## Sales talking points

1. **"Your ops team already knows Jinja2."** No new DSL to learn — if a team has used Ansible, SaltStack, or Django templates, they can write a `JinjaTemplate` CR on day one.
2. **"Configs stay fresh automatically."** Source data changes propagate to rendered outputs without pipeline re-runs. This eliminates a class of drift bugs where configs lag behind the data they depend on.
3. **"Secret values never leave the cluster."** Templates reference Secrets by name; rendered output stays inside Kubernetes. Ideal for compliance-sensitive environments.
4. **"One operator, all namespaces."** Cluster-scoped design means no per-team installation overhead — platform teams deploy once and all application teams benefit.
5. **"Open source, Apache 2.0."** Zero licensing cost, no vendor lock-in. Teams can fork, contribute, and audit the code freely.
6. **"Complements your existing GitOps stack."** Works alongside FluxCD and ArgoCD without replacing them — `JinjaTemplate` CRs are plain Kubernetes manifests managed in Git like any other resource.
7. **"Proven release cadence."** 23 releases in ~2 months shows active development and responsiveness. Automated semantic versioning and CI reduce release risk.

---

## Open questions / gaps

- **Maturity declaration** — The project has no explicit "production-ready" statement in the README. Version numbering (v1.x) and release frequency suggest stability, but prospects should validate against their own risk thresholds. A formal stability statement or changelog would strengthen the story.
- **Multi-key output** — Each `JinjaTemplate` CR produces a single key in the output ConfigMap/Secret. Teams needing multi-key outputs must create multiple CRs. Whether this is a roadmap item is not documented.
- **External data sources** — Sources are limited to in-cluster ConfigMaps and Secrets. There is no current support for pulling variables from external APIs, databases, or secret managers (e.g., Vault, AWS Secrets Manager) directly. Teams needing external data must first sync it into the cluster via a tool like External Secrets Operator.
- **Template versioning / rollback** — No built-in history or rollback mechanism for rendered outputs is described. Teams should rely on GitOps tooling or Kubernetes resource versioning for auditability.
- **Namespace-scoped operation** — The operator is cluster-scoped, which may require additional RBAC negotiation in organizations with strict multi-tenancy policies. Per-namespace deployment is not a documented option.
- **Community size** — 0 stars and 0 forks as of April 2026 indicates a very early community footprint. Enterprise buyers with open-source sustainability requirements should factor this in.
- **Code coverage figure** — A coverage badge is present but the actual percentage is not visible from public metadata. Prospects with testing requirements should review this directly in the repository.
