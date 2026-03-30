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
      icon: '🔄',
      title: 'GitOps & FluxCD',
      description:
        'Automated deployments via Git. Every change tracked, every rollback instant. FluxCD as your single source of truth.',
    },
    {
      icon: '☸️',
      title: 'Kubernetes Provisioning',
      description:
        'Production-ready clusters configured for your workload. Operators, RBAC, monitoring — all included.',
    },
    {
      icon: '🚀',
      title: 'CI/CD Pipelines',
      description:
        'From local builds to automated pipelines. GitHub Actions, testing, linting, container builds — done right.',
    },
    {
      icon: '📦',
      title: 'Legacy Migration',
      description:
        'From bare metal and VMs to containers. We containerize your apps, build the pipelines, and train your team.',
    },
    {
      icon: '📊',
      title: 'Monitoring & Observability',
      description:
        'Prometheus, Grafana, alerting. Know what\'s happening in your cluster before your users do.',
    },
    {
      icon: '🎓',
      title: 'Training & Enablement',
      description:
        'Hands-on workshops for your team. Kubernetes, GitOps, CI/CD — we teach until you\'re confident.',
    },
  ];

  getServices(): Service[] {
    return this.services;
  }
}
