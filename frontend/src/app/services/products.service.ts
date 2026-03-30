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
      name: 'FluxCD Starter Kit',
      description:
        'Pre-configured GitOps templates for FluxCD. Get your first cluster reconciling from git in under an hour.',
      license: 'FREE',
      ctaLabel: 'Get started',
      ctaLink: '/products',
    },
    {
      name: 'K8s Migration Toolkit',
      description:
        'Automated assessment and migration tooling to move workloads from VMs to Kubernetes with minimal downtime.',
      license: 'LICENSED',
      ctaLabel: 'Learn more',
      ctaLink: '/products',
    },
    {
      name: 'CI/CD Pipeline Blueprints',
      description:
        'Battle-tested GitHub Actions and pipeline configs for building, testing, and deploying containerised apps.',
      license: 'FREE',
      ctaLabel: 'Browse blueprints',
      ctaLink: '/products',
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }
}
