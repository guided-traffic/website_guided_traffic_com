# container-images

**Repository:** https://github.com/guided-traffic/container-images
**Status:** Production-ready (actively maintained, 190+ commits, weekly automated rebuilds)
**License:** Apache License 2.0
**Last updated (latest commit / release):** April 13, 2026

## Value proposition

A curated catalog of security-hardened, multi-architecture container images that are automatically rebuilt every week to incorporate the latest OS-level security patches — eliminating the manual toil of keeping base images current and compliant. Each image ships with a signed SBOM and SLSA provenance attestation out of the box, giving platform and security teams an auditable, supply-chain-secure foundation they can pull and trust immediately.

## Target customer

- **Platform / DevOps engineers** at mid-market to enterprise companies who run Kubernetes clusters and are tired of maintaining custom base images internally.
- **Security and compliance teams** in regulated industries (finance, healthcare, SaaS) who need documented software bills of materials and verifiable image provenance for audits.
- **SREs and on-call engineers** who need pre-built, ready-to-run debug toolkits (network, etcd, kubectl) they can `kubectl debug` or `kubectl run` into a cluster without building anything.
- Companies already using Thanos, Velero, or Kopia who want a vendor-maintained, hardened image rather than pulling upstream images of unknown patch state.

## Key features

- **Weekly automated rebuilds** — A scheduled GitHub Actions pipeline fires every Sunday at 20:00 UTC and rebuilds all images from scratch, pulling the latest base image and package versions. Operators get fresh, patched images without submitting a ticket or running a pipeline manually.
- **Trivy vulnerability scanning per build** — Every image build is gated on a Trivy scan. Images with unacceptable CVEs do not ship, giving security teams confidence that published images have passed automated vulnerability assessment.
- **SLSA provenance attestations** — Each published image includes a machine-verifiable SLSA provenance record, enabling supply-chain integrity checks that satisfy SLSA Level 2+ requirements and modern software procurement policies.
- **SBOMs in SPDX and CycloneDX formats** — Software bills of materials are generated and attached to every image, supporting compliance workflows that require component inventories (e.g., US Executive Order 14028, EU Cyber Resilience Act).
- **Cosign image signatures** — Images are signed with Cosign, allowing consumers to cryptographically verify that an image came from the guided-traffic pipeline before running it in production.
- **Multi-architecture support (amd64 + arm64)** — All images publish manifests for both x86-64 and ARM64, covering cloud VMs, Apple Silicon developer machines, and ARM-based Kubernetes nodes (AWS Graviton, Raspberry Pi clusters).
- **Renovate-driven base image updates** — A `renovate.json` configuration keeps upstream base image references (e.g., `ubuntu:24.04`) pinned and automatically opens PRs when newer versions are released, creating a full audit trail of intentional upgrades.
- **CVE-targeted package removal** — Containerfiles actively remove kernel-related packages flagged for CVEs (e.g., `linux-libc-dev`, `linux-headers`) that cannot be patched in a container context, reducing the attack surface beyond what a plain `apt-get upgrade` achieves.
- **Contributor-friendly image onboarding** — Adding a new image requires only duplicating a directory, writing a `Containerfile` and an `image.yml` metadata file, and committing. The CI/CD pipeline auto-discovers and builds new entries, lowering the barrier for internal or community contributions.

## Integrations and dependencies

- **Docker Hub** — Images are published to `docker.io/guidedtraffic/<image-name>`, consumable with any container runtime (Docker, containerd, CRI-O).
- **GitHub Actions** — The entire build, scan, sign, and publish pipeline runs on GitHub Actions; no external CI infrastructure is required.
- **Cosign / Sigstore** — Signature verification integrates with the Sigstore public-good transparency log.
- **Trivy (Aqua Security)** — Vulnerability scanning dependency; results inform gate decisions in the pipeline.
- **Renovate Bot** — Dependency update automation; works with the GitHub app or self-hosted Renovate runner.
- **Kubernetes** — Debug images (`network-debug`, `kubectl`, `etcd-client`) are designed to be run as ephemeral containers or standalone pods inside Kubernetes clusters.
- **Thanos / Prometheus stack** — The `thanos` image targets teams running long-term metrics storage on top of Prometheus.
- **Velero** — The `velero-cli` image targets teams doing Kubernetes backup and disaster-recovery workflows.
- **Kopia** — The `kopia` image targets teams using the Kopia backup tool for snapshot management.

## Differentiators

- **Full supply-chain stack out of the box** — Most public images on Docker Hub ship no SBOM, no provenance, and no signatures. This catalog includes all three on every image, which is increasingly a hard requirement for enterprise procurement.
- **Weekly cadence is faster than most alternatives** — Official upstream images (e.g., from Docker Library) are often updated monthly or on-demand. Weekly rebuilds close the window between a CVE disclosure and a patched image.
- **Opinionated CVE remediation beyond `apt upgrade`** — The pipeline actively removes kernel development packages that accumulate false-positive CVEs inside containers, producing cleaner Trivy reports than naive base-image upgrades.
- **ARM64 parity from day one** — Many smaller open-source image projects publish amd64-only manifests. Native ARM64 support reduces cross-compilation overhead and performance penalties on Graviton and similar fleets.
- **Transparent, auditable build pipeline** — Because the entire pipeline is in a public GitHub repository with Actions logs, customers can inspect exactly how an image was built — a level of transparency not available with proprietary image vendors.
- **Low operational overhead for contributors** — The `image.yml` + `Containerfile` convention makes it easy to standardize additional images without writing custom CI, reducing the cost of maintaining a growing catalog.

## Technical stack

- **Language(s):** Dockerfile / Containerfile (79%), Shell (21%)
- **Runtime:** Any OCI-compliant container runtime (Docker, containerd, CRI-O, Podman)
- **Deployment model:** Pull-based; images are consumed directly from Docker Hub. No operator, Helm chart, or cluster-side component required.
- **Build infrastructure:** GitHub Actions (hosted runners)
- **Signing infrastructure:** Sigstore / Cosign (keyless signing via OIDC)
- **Scanning tool:** Trivy
- **Dependency automation:** Renovate

## Sales talking points

- "Every image we ship has a signed SBOM and SLSA provenance — your security team can verify the full build chain before it ever touches your cluster."
- "We rebuild every image every Sunday regardless of whether anything changed — you're never more than seven days away from a fully patched base."
- "Pull `guidedtraffic/network-debug` into any cluster node in seconds — no build step, no registry setup, just the tools your SREs need during an incident."
- "We remove the kernel packages that pollute your Trivy reports with false CVEs, so your security scans are clean without manual suppression rules."
- "Native amd64 and arm64 manifests means the same image tag works on your x86 EC2 fleet and your Graviton nodes with zero extra configuration."
- "Apache 2.0 licensed, public build logs, open source pipeline — nothing is hidden; your legal and security teams can review everything."

## Open questions / gaps

- **No version tagging strategy documented** — The README and `image.yml` files show `version: 1.0.0` statically. It is not clear whether images are tagged with semantic versions, date-stamped tags, or only `latest`. Prospects running GitOps / immutable deployments will ask about pinning to a specific digest or tag.
- **No private registry support documented** — It is not described whether images can be mirrored to a customer's internal registry (ECR, GCR, Artifactory) as part of an enterprise workflow.
- **Trivy failure policy not specified** — The README does not state which Trivy severity levels (CRITICAL, HIGH, etc.) block a publish, which matters for compliance teams defining acceptance criteria.
- **No SLA or support model stated** — As an open-source project with no stated support tier, enterprise customers will ask about guaranteed patch turnaround, CVE response SLAs, and escalation paths.
- **Image catalog scope** — Six images are published today. Prospects will ask how new images are prioritized, and whether the catalog covers their specific toolchain (e.g., Helm, ArgoCD, Flux).
- **Runtime hardening depth** — It is not documented whether images run as non-root, use read-only filesystems, drop Linux capabilities, or include seccomp/AppArmor profiles — all common enterprise security checklist items.
- **No automated integration tests** — The pipeline scans and signs images but does not appear to run functional smoke tests against built images. Prospects may ask how regressions in image content are caught.
