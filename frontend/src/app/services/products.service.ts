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
  ];

  getProducts(): Product[] {
    return this.products;
  }
}
