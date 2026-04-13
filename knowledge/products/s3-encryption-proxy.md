# s3-encryption-proxy

**Repository:** https://github.com/guided-traffic/s3-encryption-proxy
**Status:** beta (actively maintained, automated updates)
**License:** Non-standard / proprietary (SPDX: NOASSERTION — review LICENSE file before redistribution or resale)
**Last updated:** 2026-04-13

---

## Value proposition

s3-encryption-proxy places a Go-based transparent proxy between any S3-compatible client and any S3-compatible backend (AWS S3, MinIO, etc.). Every object is encrypted before it reaches the storage layer using envelope encryption with a unique data-encryption key (DEK) per object, so neither the storage provider nor a bucket-level key compromise exposes the full dataset. Customers retain full key custody — no KMS vendor lock-in is required.

The tagline from the project homepage summarises the positioning well: "Streaming. Transparent. Secure."

---

## Target customer

- **Regulated industries** (financial services, healthcare, public sector) that must demonstrate encryption-at-rest with customer-managed keys and cannot rely solely on provider-managed SSE.
- **EU data-sovereignty-driven organisations** that need documented proof that plaintext never leaves their control boundary before hitting object storage.
- **Multi-cloud or hybrid-cloud teams** running S3-compatible storage (MinIO on-premises, Ceph, etc.) where AWS SSE options are unavailable.
- **Security-first engineering teams** that want a drop-in encryption layer without rewriting application code or switching SDKs.
- **Organizations migrating between encryption schemes** that need to read legacy-encrypted objects while writing new objects under a different key strategy.

---

## Key features

- **Transparent S3 API compatibility** — clients use standard S3 SDKs/tools with no code changes; the proxy intercepts and re-signs requests.
- **Envelope encryption per object** — each object receives a unique DEK encrypted by a key-encryption key (KEK), limiting blast radius of any single key exposure.
- **Two production-grade encryption providers:**
  - RSA Envelope (recommended for production): asymmetric RSA KEK protects per-object AES keys; auto-selects AES-GCM (single-part) or AES-CTR (multipart) depending on upload type.
  - AES Envelope (simpler deployments): symmetric master key protects per-object AES keys; faster, suitable for lower-threat environments.
- **Streaming multipart uploads** — configurable buffer sizes (4 KB – 2 MB, default 64 KB) and segment sizes (5 MB – 5 GB, default 12 MB) support large-object workloads without full in-memory buffering.
- **HMAC-SHA256 integrity verification** — four configurable modes: `off`, `lax` (warn on mismatch), `strict` (reject on mismatch), `hybrid` (mixed policy).
- **AWS Signature V4 client authentication** — the proxy validates inbound request signatures; supports rate limiting, failed-attempt tracking with IP blocking, and clock-skew validation (default 5-minute window).
- **Multi-provider simultaneous operation** — new objects use the active provider; reads auto-detect the provider used at write time, enabling zero-downtime key migration.
- **Prometheus metrics** on port 9090 (`/metrics`) when enabled.
- **Environment variable substitution** in YAML config (`${VAR_NAME}` syntax); unset required variables halt startup with a clear error, preventing accidental plaintext operation.

---

## Integrations and dependencies

| Layer | Details |
|---|---|
| Storage backends | AWS S3, MinIO, any S3-compatible endpoint |
| Key management | Self-managed RSA key pairs or AES master keys (no external KMS integration documented in README — flag as open question) |
| Authentication | AWS Signature V4 (inbound from clients) |
| Observability | Prometheus metrics |
| Container runtime | Docker, Docker Compose |
| Orchestration | Kubernetes via Helm charts (`deploy/helm/`) |
| Container registry | `ghcr.io/guided-traffic/s3-encryption-proxy` |
| Language / runtime | Go (no runtime dependency beyond the binary/container) |

---

## Differentiators

| Comparison | s3-encryption-proxy advantage |
|---|---|
| **AWS SSE-S3 / SSE-KMS** | Customer retains full key custody; keys never handed to AWS; works with any S3-compatible backend, not just AWS. |
| **AWS SSE-C** | No per-request key material transmitted over the wire by the application; proxy handles key injection transparently. |
| **MinIO server-side encryption** | Encryption logic is fully under customer control and portable across storage vendors; not tied to MinIO's KMS integration. |
| **Client-side SDK encryption (e.g., AWS Encryption SDK)** | Zero application code changes required; any tool that speaks S3 (AWS CLI, rclone, Terraform backend, etc.) gets encryption automatically. |
| **Per-object unique DEKs** | Limits blast radius vs. single-key-per-bucket approaches; compromising one object's DEK does not expose others. |
| **Multi-provider migration** | Reads legacy and new encryption side-by-side without a full re-encryption migration window. |

---

## Technical stack

- **Language:** Go
- **Deployment artifacts:** Docker image (GHCR), Helm chart
- **Crypto primitives:** RSA (KEK), AES-GCM / AES-CTR (DEK), HMAC-SHA256 (integrity)
- **Config format:** YAML with environment variable substitution
- **Metrics:** Prometheus-compatible

---

## Sales talking points

1. **Drop-in encryption, zero code changes** — any team using the AWS CLI, Terraform S3 backend, rclone, or any S3 SDK gets client-side-equivalent encryption without touching their application.
2. **You own the keys, period** — keys are never sent to the storage provider; compliance evidence is straightforward.
3. **Envelope encryption limits breach scope** — a compromised storage bucket does not expose all data; each object has its own unique encrypted key.
4. **Streaming-first design** — multipart uploads with configurable buffering mean it handles production data volumes, not just small-file demos.
5. **Kubernetes-native deployment** — Helm chart available, Prometheus metrics built-in; fits standard enterprise deployment and monitoring pipelines.
6. **Migration-friendly** — organisations can rotate encryption providers (e.g., AES to RSA) without a downtime window; the proxy reads old and new formats simultaneously.
7. **Tamper detection** — HMAC-SHA256 integrity verification in `strict` mode catches object tampering or corruption before data is returned to the client.

---

## Open questions / gaps

- **External KMS integration not documented** — the README describes self-managed RSA/AES key files only. Integration with AWS KMS, HashiCorp Vault, or other KMIP-compatible key stores is not mentioned and should be confirmed before pitching to customers with mandatory external KMS policies.
- **License is non-standard** — the GitHub API returns SPDX `NOASSERTION`. The LICENSE file must be reviewed to clarify redistribution rights, SaaS use, and whether a commercial license is required. Do not make resale or white-label commitments before this is resolved.
- **Maturity / production readiness** — the repository has 2 stars and 0 forks. It is not self-described as production-ready. Reference customers and production case studies are not yet available.
- **High-availability / clustering** — no documentation on stateless/stateful behavior of the proxy under horizontal scaling or what happens if the proxy crashes mid-multipart-upload.
- **Key rotation workflow** — re-encryption of existing objects after a KEK rotation is not described.
- **Audit logging** — Prometheus metrics are mentioned but object-level access audit logs (who decrypted what, when) are not described; this is a typical compliance requirement.
- **Performance benchmarks** — no throughput or latency figures are published.
