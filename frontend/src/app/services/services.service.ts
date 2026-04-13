import { Injectable } from '@angular/core';

export interface Service {
  icon: string;
  title: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ServicesService {
  private readonly services: Service[] = [
    {
      icon: '☸️',
      title: 'Kubernetes Provisioning',
      description:
        'Produktionsreife Cluster, konfiguriert für Ihre Workloads. Operators, RBAC, Monitoring — alles inklusive.',
    },
    {
      icon: '🚀',
      title: 'CI/CD Pipelines',
      description:
        'Von lokalen Builds zu vollautomatisierten Pipelines. GitHub Actions, Tests, Linting, Container-Builds — professionell umgesetzt.',
    },
    {
      icon: '📦',
      title: 'Legacy-Migration',
      description:
        'Von Bare Metal und VMs zu Containern. Wir containerisieren Ihre Anwendungen, bauen die Pipelines auf und schulen Ihr Team.',
    }
  ];

  getServices(): Service[] {
    return this.services;
  }
}
