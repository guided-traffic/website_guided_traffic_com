import { Injectable } from '@angular/core';

export interface Service {
  slug: string;
  icon: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
}

@Injectable({ providedIn: 'root' })
export class ServicesService {
  private readonly services: Service[] = [
    {
      slug: 'ci-pipelines',
      icon: '🚀',
      title: 'CI-Pipelines & Templates',
      description:
        'Einheitliche Pipelines und wiederverwendbare Templates für alle Teams. Mit Tests, Security-Scans und Quality-Gates. Wechselt ein Entwickler das Team, ist er am ersten Tag produktiv.',
      ctaLabel: 'Mehr erfahren',
      ctaLink: '/services/ci-pipelines',
    },
    {
      slug: 'ansible-automation',
      icon: '🔧',
      title: 'OnPrem Provisionierung mit Ansible',
      description:
        'Ihre bestehenden Server werden automatisiert, dokumentiert und reproduzierbar. Keine Schneeflocken-Server mehr, keine Angst vor Updates. Ohne Cloud-Zwang.',
      ctaLabel: 'Mehr erfahren',
      ctaLink: '/services/ansible-automation',
    },
    {
      slug: 'kubernetes-cluster',
      icon: '☸️',
      title: 'Production-ready Kubernetes Cluster',
      description:
        'Produktionsreife Cluster, die Ihr Team wirklich versteht und selbst betreiben kann. RBAC, Monitoring, Backup, Security nach BSI-Grundschutz-Prinzipien. On-Prem, Cloud oder hybrid.',
      ctaLabel: 'Mehr erfahren',
      ctaLink: '/services/kubernetes-cluster',
    },
  ];

  getServices(): Service[] {
    return this.services;
  }
}
