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
        'Auto-generates random secret values in Kubernetes. No more manual secret management or plaintext credentials in your repo.',
      license: 'FREE',
      ctaLabel: 'View on GitHub',
      ctaLink: 'https://github.com/guided-traffic/internal-secrets-operator',
    },
    {
      name: 'FluxCD Starter Kit',
      description:
        'Opinionated FluxCD repo structure to get started fast. Pre-configured with Kustomize overlays and HelmRelease patterns.',
      license: 'FREE',
      ctaLabel: 'View on GitHub',
      ctaLink: 'https://github.com/guided-traffic/fluxcd-starter-kit',
    },
    {
      name: 'Helm Chart Library',
      description:
        'Production-ready Helm charts for common workloads. Ingress, cert-manager, monitoring — all battle-tested and documented.',
      license: 'FREE',
      ctaLabel: 'View on GitHub',
      ctaLink: 'https://github.com/guided-traffic/helm-charts',
    },
    {
      name: 'Guided Traffic Platform',
      description:
        'Our full GitOps platform with managed clusters, automated pipelines, and dedicated support. Built for teams going all-in on Kubernetes.',
      license: 'LICENSED',
      ctaLabel: 'Learn More',
      ctaLink: '/contact',
    },
    {
      name: 'Migration Toolkit',
      description:
        'Scripts and guides to containerize legacy applications. Dockerfile generators, Helm scaffolding, and step-by-step migration playbooks.',
      license: 'FREE',
      ctaLabel: 'View on GitHub',
      ctaLink: 'https://github.com/guided-traffic/migration-toolkit',
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }
}
