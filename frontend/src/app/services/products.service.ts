import { Injectable } from '@angular/core';

export type ProductCategoryKey = 'desktop' | 'kubernetes-operator' | 'platform' | 'security';

export interface ProductCategory {
  key: ProductCategoryKey;
  title: string;
  intro: string;
}

export interface Product {
  slug: string;
  name: string;
  description: string;
  category: ProductCategoryKey;
  license: 'FREE' | 'LICENSED';
  // Set while a product is not released yet; shown as a badge on its card
  status?: 'in-development';
  ctaLabel: string;
  ctaLink: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  // The order of the sections on /products
  private readonly categories: ProductCategory[] = [
    {
      key: 'desktop',
      title: 'Desktop-Anwendungen',
      intro: 'Native Anwendungen für macOS, Linux und Windows.',
    },
    {
      key: 'kubernetes-operator',
      title: 'Kubernetes-Operatoren',
      intro: 'Wiederkehrende Betriebsaufgaben als Kubernetes-Ressource — deklarativ und GitOps-tauglich.',
    },
    {
      key: 'platform',
      title: 'Plattform-Dienste',
      intro: 'Dienste, die Sie selbst auf Kubernetes betreiben — hochverfügbar und per Helm-Chart installiert.',
    },
    {
      key: 'security',
      title: 'Security-Anwendungen',
      intro: 'Verschlüsselung und eine abgesicherte Software-Lieferkette.',
    },
  ];

  // Grouped by category in the order above; nav and footer list them in this order
  private readonly products: Product[] = [
    {
      slug: 'cogpit',
      name: 'Cogpit',
      description:
        'Native Kubernetes-IDE für den Desktop: alle Ressourcen, Logs, Shells, Helm, Flux CD und Argo CD in einem Fenster. KI-Agenten arbeiten über MCP mit, Änderungen erst nach Ihrer Freigabe.',
      category: 'desktop',
      license: 'FREE',
      ctaLabel: 'Mehr erfahren',
      ctaLink: '/products/cogpit',
    },
    {
      slug: 'internal-secrets-operator',
      name: 'Internal Secrets Operator',
      description:
        'Generiert zufällige Secret-Werte in Kubernetes automatisch. Kein manuelles Secret-Management und keine Klartext-Credentials mehr im Repository.',
      category: 'kubernetes-operator',
      license: 'FREE',
      ctaLabel: 'Mehr erfahren',
      ctaLink: '/products/internal-secrets-operator',
    },
    {
      slug: 'jinja-template-operator',
      name: 'Jinja Template Operator',
      description:
        'Rendert ConfigMaps und Secrets deklarativ mit Jinja2-Templates direkt im Cluster. Reagiert automatisch auf Änderungen der Quelldaten — ohne Pipeline-Re-Run oder Helm-Release.',
      category: 'kubernetes-operator',
      license: 'FREE',
      ctaLabel: 'Mehr erfahren',
      ctaLink: '/products/jinja-template-operator',
    },
    {
      slug: 'openldap-operator',
      name: 'OpenLDAP Operator',
      description:
        'Verwaltet Benutzer, Gruppen und Server-Verbindungen eines bestehenden externen OpenLDAP-Servers als native Kubernetes-Ressourcen. GitOps-fähige Identity-Verwaltung ohne Migration der bestehenden Directory-Infrastruktur.',
      category: 'kubernetes-operator',
      license: 'FREE',
      ctaLabel: 'Mehr erfahren',
      ctaLink: '/products/openldap-operator',
    },
    {
      slug: 'valkey-operator',
      name: 'Valkey Operator',
      description:
        'Betreibt Valkey — den BSD-lizenzierten Redis-Fork — als deklarative Kubernetes-Ressource. Sentinel-HA, TLS-Lifecycle und Prometheus-Observability ohne handgeschriebene StatefulSets.',
      category: 'kubernetes-operator',
      license: 'FREE',
      ctaLabel: 'Mehr erfahren',
      ctaLink: '/products/valkey-operator',
    },
    {
      slug: 'dex-operator',
      name: 'Dex Operator',
      description:
        'Verwaltet Dex-Identity-Provider und OAuth2-Clients als deklarative Kubernetes-CRDs. SSO-Connectoren per kubectl apply ausrollen, mit vollständigem Audit-Trail und GitOps-Integration.',
      category: 'kubernetes-operator',
      license: 'FREE',
      ctaLabel: 'Mehr erfahren',
      ctaLink: '/products/dex-operator',
    },
    {
      slug: 'trove',
      name: 'trove',
      description:
        'Selbst gehosteter, hochverfügbarer Paket-Server für eigene Pakete und öffentliche Registries. Anmeldung über OIDC, Zugriff standardmäßig verweigert, jede Aktion im Audit-Log.',
      category: 'platform',
      license: 'FREE',
      status: 'in-development',
      ctaLabel: 'Mehr erfahren',
      ctaLink: '/products/trove',
    },
    {
      slug: 'container-images',
      name: 'Container Images',
      description:
        'Kuratierter Katalog gehärteter Multi-Arch Container-Images mit wöchentlichen Rebuilds. Inklusive signierter SBOMs, SLSA-Provenance und Cosign-Signaturen — direkt aus Docker Hub nutzbar.',
      category: 'security',
      license: 'FREE',
      ctaLabel: 'Mehr erfahren',
      ctaLink: '/products/container-images',
    },
    {
      slug: 's3-encryption-proxy',
      name: 'S3 Encryption Proxy',
      description:
        'Transparenter S3-Proxy mit Envelope-Encryption pro Objekt — Schlüsselhoheit bleibt vollständig bei Ihnen. Drop-in-Verschlüsselung für AWS S3, MinIO oder jedes S3-kompatible Backend, ohne Änderungen am Anwendungscode.',
      category: 'security',
      license: 'FREE',
      ctaLabel: 'Mehr erfahren',
      ctaLink: '/products/s3-encryption-proxy',
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getCategories(): ProductCategory[] {
    return this.categories;
  }
}
