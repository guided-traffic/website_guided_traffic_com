# openldap-operator

**Repository:** https://github.com/guided-traffic/openldap-operator
**Status:** stable (actively maintained, automated updates)
**License:** Apache License 2.0
**Last updated:** 2026-04-13

---

## Value proposition

The openldap-operator turns an existing external OpenLDAP server into a first-class Kubernetes citizen. Instead of writing LDAP Data Interchange Format (LDIF) files or running manual ldapadd/ldapmodify commands, platform and identity engineers declare users, groups, and server connections as Kubernetes custom resources. The operator reconciles the desired state continuously, eliminating configuration drift and enabling GitOps workflows for directory management.

The critical differentiator from operators that *deploy* OpenLDAP is that this one *manages* an already-running external OpenLDAP instance. Teams keep their existing directory server (on-premise, in a VM, or as a container) and gain Kubernetes-native lifecycle management on top.

---

## Target customer

- **Enterprise IT / platform engineering teams** that run Kubernetes alongside a legacy on-premise OpenLDAP directory and want to automate user/group provisioning without replacing the directory.
- **Compliance-driven organizations** (finance, healthcare, government) that must keep a self-hosted LDAP store for data residency or audit reasons but want infrastructure-as-code controls.
- **Universities and research institutions** with large POSIX-style user bases (uidNumber, gidNumber, home directories) managed in OpenLDAP.
- **Telcos and ISPs** operating multi-tenant environments where namespace-level isolation per customer or business unit is a hard requirement.
- **DevOps/platform teams** standardizing on Kubernetes operators for all stateful service management and needing LDAP to fit that model.

---

## Key features

### Custom Resource Definitions (CRDs)

| CRD | Purpose |
|---|---|
| `LDAPServer` | Registers a connection to an external OpenLDAP instance (host, port, TLS, bind credentials via Secret). |
| `LDAPUser` | Declares a POSIX user with attributes: uid, uidNumber, gidNumber, home directory, and group memberships. |
| `LDAPGroup` | Declares a group of type posixGroup, groupOfNames, or groupOfUniqueNames with member management. |

API group: `openldap.guided-traffic.com/v1`

### Lifecycle automation
- Continuous reconciliation: create, update, and delete operations on LDAP entries are triggered by Kubernetes resource changes.
- Finalizer-based cleanup: deleting a CRD resource removes the corresponding LDAP entry cleanly before the Kubernetes object is gone.
- Real-time status reporting on each resource (connection health, last sync, error conditions).

### Security
- TLS/LDAPS enabled by default with configurable certificate verification.
- Bind credentials stored in Kubernetes Secrets; RBAC controls access to those Secrets.
- Search user pattern (read-only service account) for application authentication, isolating write-capable admin credentials.
- LDAP ACL configuration support.

### Multi-tenancy
- Resources are namespaced, enabling per-team or per-environment isolation within a single cluster.

### POSIX compliance
- Automatic home directory path generation (`/home/<username>`).
- Full uidNumber/gidNumber attribute management for Linux/POSIX workloads.

### Test coverage
- 90.6% test coverage across critical packages.
- Integration tests run against a real OpenLDAP server (osixia/openldap:1.5.0) in Docker, validating full CRUD flows.

---

## Integrations and dependencies

| Integration | Detail |
|---|---|
| **Helm** | Recommended installation method; Helm charts provided. |
| **Kustomize** | Alternative manifest-based deployment. |
| **Kubernetes Secrets** | Bind password and TLS credential storage. |
| **Kubernetes RBAC** | Least-privilege access model for operator service accounts. |
| **Docker** | Required for running integration test suite. |
| **Renovate** | Automated dependency update PRs (renovate.json present). |
| **Semantic Release** | Automated versioning and changelog (.releaserc.json present). |

**Not yet confirmed** (gaps — see Open questions): cert-manager integration, Prometheus metrics endpoint, cloud backup storage, Active Directory or FreeIPA compatibility.

Application integration examples documented for: Java/Spring, Python/Django, Node.js/Passport.

---

## Differentiators

**vs. manual StatefulSets / raw LDIF management**
- Eliminates ad-hoc ldapadd/ldapmodify scripts; replaces them with versioned, reviewable Kubernetes manifests.
- GitOps-compatible: directory state lives in Git, not in operator runbooks.
- Error handling and drift correction are built into the reconciliation loop.

**vs. deploying OpenLDAP via Helm (e.g., bitnami/openldap)**
- Manages an *external* OpenLDAP server rather than deploying a new one — no forced migration, no data re-import.
- Users and groups are individual Kubernetes objects, enabling fine-grained RBAC and auditability per entry.

**vs. cloud-managed directory services (AWS Directory Service, Azure AD DS, Google Managed AD)**
- Fully self-hosted; no data leaves the customer environment.
- Works with existing on-premise OpenLDAP — no migration project required.
- No vendor lock-in; Apache 2.0 license.

**vs. commercial LDAP management tools (e.g., JXplorer, LDAP Account Manager)**
- Native Kubernetes API surface — no separate UI to secure and maintain.
- Operator model enables automated remediation, not just GUI-driven administration.

---

## Technical stack

- **Language:** Go 1.26+
- **Framework:** Kubernetes operator-sdk / controller-runtime (inferred from project structure and CRD API group conventions)
- **Minimum Kubernetes version:** 1.25
- **Container format:** Containerfile (OCI-compatible)
- **Build tooling:** Make, Go modules
- **Linting:** golangci-lint (.golangci.yml)
- **CI/CD primitives:** Semantic release, Renovate

---

## Sales talking points

1. **Zero migration risk.** The operator connects to the existing OpenLDAP server — no data migration, no cutover weekend, no service interruption.
2. **GitOps for identity.** User and group definitions become pull requests. Audit trails live in Git history alongside application code.
3. **Compliance-friendly.** Data stays on-premise. Apache 2.0 license means no per-seat fees and no vendor dependency for security patches.
4. **Kubernetes-native operations.** kubectl, Helm, and standard RBAC cover the entire management surface — no new tools for the platform team to learn or secure.
5. **Multi-tenant by design.** Namespace isolation lets a single operator instance serve multiple teams or environments without cross-contamination.
6. **Developer self-service.** Application teams can request service accounts (read-only LDAP users) via a CRD manifest reviewed in a normal PR workflow.
7. **High test confidence.** 90.6% coverage with real-server integration tests signals production intent, not prototype quality.

---

## Open questions / gaps

- **Replication management:** No evidence the operator manages OpenLDAP replication topology (provider/consumer setup). Likely out of scope for v1.
- **Backup / restore:** No backup or snapshot CRD was found. Backup is presumably handled externally (e.g., ldapsearch exports or volume snapshots).
- **Schema management:** No CRD for custom LDAP schema extensions was identified — schema changes may still require manual LDIF application.
- **cert-manager integration:** TLS is supported but whether cert-manager issues and rotates certificates automatically is unconfirmed.
- **Prometheus metrics:** No metrics endpoint or ServiceMonitor CRD was identified; observability beyond status conditions is unclear.
- **Active Directory / FreeIPA compatibility:** The operator targets OpenLDAP specifically; compatibility with AD LDS or FreeIPA is not documented.
- **HA / multi-instance operator:** Behavior when running multiple operator replicas (leader election) is not confirmed in public docs.
- **Maturity signal:** 0 stars and 0 forks indicate early community adoption. Reference customers or production case studies are not yet available.
