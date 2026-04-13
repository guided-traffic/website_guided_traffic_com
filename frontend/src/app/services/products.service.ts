import { Injectable } from '@angular/core';

export interface Product {
  slug: string;
  icon: string;
  name: string;
  description: string;
  license: 'FREE' | 'LICENSED';
  ctaLabel: string;
  ctaLink: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly products: Product[] = [
    {
      slug: 'internal-secrets-operator',
      icon: '🔐',
      name: 'Internal Secrets Operator',
      description:
        'Generiert zufällige Secret-Werte in Kubernetes automatisch. Kein manuelles Secret-Management und keine Klartext-Credentials mehr im Repository.',
      license: 'FREE',
      ctaLabel: 'Mehr erfahren',
      ctaLink: '/products/internal-secrets-operator',
    },
    {
      slug: 'jinja-template-operator',
      icon: '🧩',
      name: 'Jinja Template Operator',
      description:
        'Rendert ConfigMaps und Secrets deklarativ mit Jinja2-Templates direkt im Cluster. Reagiert automatisch auf Änderungen der Quelldaten — ohne Pipeline-Re-Run oder Helm-Release.',
      license: 'FREE',
      ctaLabel: 'Mehr erfahren',
      ctaLink: '/products/jinja-template-operator',
    },
    {
      slug: 'openldap-operator',
      icon: '👥',
      name: 'OpenLDAP Operator',
      description:
        'Verwaltet Benutzer, Gruppen und Server-Verbindungen eines bestehenden externen OpenLDAP-Servers als native Kubernetes-Ressourcen. GitOps-fähige Identity-Verwaltung ohne Migration der bestehenden Directory-Infrastruktur.',
      license: 'FREE',
      ctaLabel: 'Mehr erfahren',
      ctaLink: '/products/openldap-operator',
    },
    {
      slug: 'valkey-operator',
      icon: '💾',
      name: 'Valkey Operator',
      description:
        'Betreibt Valkey — den BSD-lizenzierten Redis-Fork — als deklarative Kubernetes-Ressource. Sentinel-HA, TLS-Lifecycle und Prometheus-Observability ohne handgeschriebene StatefulSets.',
      license: 'FREE',
      ctaLabel: 'Mehr erfahren',
      ctaLink: '/products/valkey-operator',
    },
    {
      slug: 'dex-operator',
      icon: '🛂',
      name: 'Dex Operator',
      description:
        'Verwaltet Dex-Identity-Provider und OAuth2-Clients als deklarative Kubernetes-CRDs. SSO-Connectoren per kubectl apply ausrollen, mit vollständigem Audit-Trail und GitOps-Integration.',
      license: 'FREE',
      ctaLabel: 'Mehr erfahren',
      ctaLink: '/products/dex-operator',
    },
    {
      slug: 'container-images',
      icon: '🛡️',
      name: 'Container Images',
      description:
        'Kuratierter Katalog gehärteter Multi-Arch Container-Images mit wöchentlichen Rebuilds. Inklusive signierter SBOMs, SLSA-Provenance und Cosign-Signaturen — direkt aus Docker Hub nutzbar.',
      license: 'FREE',
      ctaLabel: 'Mehr erfahren',
      ctaLink: '/products/container-images',
    },
    {
      slug: 's3-encryption-proxy',
      icon: '🔒',
      name: 'S3 Encryption Proxy',
      description:
        'Transparenter S3-Proxy mit Envelope-Encryption pro Objekt — Schlüsselhoheit bleibt vollständig bei Ihnen. Drop-in-Verschlüsselung für AWS S3, MinIO oder jedes S3-kompatible Backend, ohne Änderungen am Anwendungscode.',
      license: 'LICENSED',
      ctaLabel: 'Mehr erfahren',
      ctaLink: '/products/s3-encryption-proxy',
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }
}
