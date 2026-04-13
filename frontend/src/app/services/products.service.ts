import { Injectable } from '@angular/core';

export interface Product {
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
      name: 'Internal Secrets Operator',
      description:
        'Generiert zufällige Secret-Werte in Kubernetes automatisch. Kein manuelles Secret-Management und keine Klartext-Credentials mehr im Repository.',
      license: 'FREE',
      ctaLabel: 'Auf GitHub ansehen',
      ctaLink: 'https://github.com/guided-traffic/internal-secrets-operator',
    },
    {
      name: 'FluxCD Starter Kit',
      description:
        'Vorgefertigte FluxCD-Repo-Struktur für einen schnellen Einstieg. Mit Kustomize-Overlays und HelmRelease-Patterns vorkonfiguriert.',
      license: 'FREE',
      ctaLabel: 'Auf GitHub ansehen',
      ctaLink: 'https://github.com/guided-traffic/fluxcd-starter-kit',
    },
    {
      name: 'Helm Chart Library',
      description:
        'Produktionsreife Helm-Charts für gängige Workloads. Ingress, cert-manager, Monitoring — alles erprobt und dokumentiert.',
      license: 'FREE',
      ctaLabel: 'Auf GitHub ansehen',
      ctaLink: 'https://github.com/guided-traffic/helm-charts',
    },
    {
      name: 'Guided Traffic Platform',
      description:
        'Unsere vollständige GitOps-Plattform mit verwalteten Clustern, automatisierten Pipelines und dediziertem Support. Für Teams, die konsequent auf Kubernetes setzen.',
      license: 'LICENSED',
      ctaLabel: 'Mehr erfahren',
      ctaLink: '/contact',
    },
    {
      name: 'Migration Toolkit',
      description:
        'Skripte und Anleitungen zur Containerisierung von Legacy-Anwendungen. Dockerfile-Generatoren, Helm-Scaffolding und Schritt-für-Schritt-Migrations-Playbooks.',
      license: 'FREE',
      ctaLabel: 'Auf GitHub ansehen',
      ctaLink: 'https://github.com/guided-traffic/migration-toolkit',
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }
}
