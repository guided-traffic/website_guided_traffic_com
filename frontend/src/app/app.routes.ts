import { Routes } from '@angular/router';

// Every page route carries its search snippet: `title` (≤ 60 characters) and
// `data.description` (≤ 155 characters). SeoTitleStrategy writes both into the
// document head; app.routes.spec.ts enforces the limits and the sitemap.
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Kubernetes & GitLab CI für den Mittelstand | Guided Traffic',
    data: {
      description:
        'Produktionsreife Kubernetes-Cluster, einheitliche CI-Pipelines und Ansible-Automatisierung — so übergeben, dass Ihr Team alles selbst betreibt.',
    },
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent),
    title: 'Leistungen: Kubernetes, CI/CD und Ansible | Guided Traffic',
    data: {
      description:
        'Kubernetes-Cluster, Agentic Programming, CI-Pipelines & Templates und OnPrem-Provisionierung mit Ansible. Pragmatisch und ohne Vendor-Lock-In.',
    },
  },
  {
    path: 'services/ci-pipelines',
    loadComponent: () => import('./pages/services/ci-pipelines/ci-pipelines.component').then(m => m.CiPipelinesComponent),
    title: 'GitLab-Experte: CI-Pipelines und Templates | Guided Traffic',
    data: {
      description:
        'Einheitliche GitLab-CI-Pipelines und Templates für alle Teams — mit Tests, SAST/DAST und Quality-Gates. Auch für GitHub Actions, Jenkins und Azure DevOps.',
    },
  },
  {
    path: 'services/ansible-automation',
    loadComponent: () => import('./pages/services/ansible-automation/ansible-automation.component').then(m => m.AnsibleAutomationComponent),
    title: 'OnPrem-Provisionierung mit Ansible | Guided Traffic',
    data: {
      description:
        'Ihre bestehenden Server werden automatisiert, dokumentiert und reproduzierbar — mit Ansible, ohne Cloud-Zwang. Keine Schneeflocken-Server mehr.',
    },
  },
  {
    path: 'services/kubernetes-cluster',
    loadComponent: () => import('./pages/services/kubernetes-cluster/kubernetes-cluster.component').then(m => m.KubernetesClusterComponent),
    title: 'Kubernetes-Experte für den Mittelstand | Guided Traffic',
    data: {
      description:
        'Produktionsreife Kubernetes-Cluster on-prem, in der Cloud oder hybrid, inklusive Containerisierung Ihrer Anwendungen. CKS-zertifiziert, ohne Black Box.',
    },
  },
  {
    path: 'services/agentic-programming',
    loadComponent: () => import('./pages/services/agentic-programming/agentic-programming.component').then(m => m.AgenticProgrammingComponent),
    title: 'Agentic Programming: Individualsoftware | Guided Traffic',
    data: {
      description:
        'Individualsoftware, entwickelt mit KI-Agenten: schnell, geprüft und auf Ihre Abläufe zugeschnitten. Auch anstelle von Standardsoftware.',
    },
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
    title: 'Produkte: Kubernetes-Operatoren und Tools | Guided Traffic',
    data: {
      description:
        'Selbst entwickelt und frei nutzbar: Kubernetes-Operatoren, die Kubernetes-IDE Cogpit, gehärtete Container-Images und ein S3 Encryption Proxy.',
    },
  },
  {
    path: 'ueber-uns',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'Hans Fischer, Cloud Architect (CKS) | Guided Traffic',
    data: {
      description:
        'Hinter Guided Traffic steht Hans Fischer: Cloud Architect und Kubernetes-Experte (CKS) mit über zehn Jahren Praxis in Kubernetes und GitLab CI.',
    },
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Kontakt | Guided Traffic',
    data: {
      description:
        'Kein Verkaufsgespräch — nur ein offenes Gespräch, ob wir bei Ihrer Infrastruktur helfen können. Wir antworten innerhalb eines Werktags.',
    },
  },
  {
    path: 'impressum',
    loadComponent: () => import('./pages/impressum/impressum.component').then(m => m.ImpressumComponent),
    title: 'Impressum | Guided Traffic',
    data: {
      description: 'Impressum und Anbieterkennzeichnung von Guided Traffic.',
    },
  },
  {
    path: 'features',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'products/cogpit',
    loadComponent: () => import('./pages/products/cogpit/cogpit.component').then(m => m.CogpitComponent),
    title: 'Cogpit: Kubernetes-IDE für den Desktop | Guided Traffic',
    data: {
      description:
        'Native Kubernetes-IDE: Ressourcen, Logs, Shells, Helm, Flux CD und Argo CD in einem Fenster. KI-Agenten arbeiten über MCP mit, nur nach Ihrer Freigabe.',
    },
  },
  {
    path: 'products/trove',
    loadComponent: () => import('./pages/products/trove/trove.component').then(m => m.TroveComponent),
    title: 'trove: selbst gehosteter Paket-Server | Guided Traffic',
    data: {
      description:
        'Hochverfügbarer Paket-Server für eigene Pakete und öffentliche Registries. Login über OIDC, Zugriff standardmäßig verweigert, Audit-Log. In Entwicklung.',
    },
  },
  {
    path: 'products/internal-secrets-operator',
    loadComponent: () => import('./pages/products/internal-secrets-operator/internal-secrets-operator.component').then(m => m.InternalSecretsOperatorComponent),
    title: 'Internal Secrets Operator für Kubernetes | Guided Traffic',
    data: {
      description:
        'Generiert zufällige Secret-Werte in Kubernetes automatisch. Kein manuelles Secret-Management und keine Klartext-Credentials mehr im Repository.',
    },
  },
  {
    path: 'products/jinja-template-operator',
    loadComponent: () => import('./pages/products/jinja-template-operator/jinja-template-operator.component').then(m => m.JinjaTemplateOperatorComponent),
    title: 'Jinja Template Operator für Kubernetes | Guided Traffic',
    data: {
      description:
        'Rendert ConfigMaps und Secrets deklarativ mit Jinja2-Templates im Cluster und reagiert auf Änderungen der Quelldaten — ohne Pipeline-Re-Run.',
    },
  },
  {
    path: 'products/openldap-operator',
    loadComponent: () => import('./pages/products/openldap-operator/openldap-operator.component').then(m => m.OpenldapOperatorComponent),
    title: 'OpenLDAP Operator für Kubernetes | Guided Traffic',
    data: {
      description:
        'Verwaltet Benutzer und Gruppen eines bestehenden OpenLDAP-Servers als Kubernetes-Ressourcen. GitOps-fähig, ohne Migration des Directorys.',
    },
  },
  {
    path: 'products/valkey-operator',
    loadComponent: () => import('./pages/products/valkey-operator/valkey-operator.component').then(m => m.ValkeyOperatorComponent),
    title: 'Valkey Operator für Kubernetes | Guided Traffic',
    data: {
      description:
        'Betreibt Valkey, den BSD-lizenzierten Redis-Fork, deklarativ in Kubernetes: Sentinel-HA, TLS-Lifecycle und Prometheus-Metriken ohne eigene StatefulSets.',
    },
  },
  {
    path: 'products/dex-operator',
    loadComponent: () => import('./pages/products/dex-operator/dex-operator.component').then(m => m.DexOperatorComponent),
    title: 'Dex Operator für Kubernetes | Guided Traffic',
    data: {
      description:
        'Verwaltet Dex-Identity-Provider und OAuth2-Clients als Kubernetes-CRDs. SSO-Connectoren per kubectl apply ausrollen, mit Audit-Trail und GitOps.',
    },
  },
  {
    path: 'products/container-images',
    loadComponent: () => import('./pages/products/container-images/container-images.component').then(m => m.ContainerImagesComponent),
    title: 'Gehärtete Container-Images | Guided Traffic',
    data: {
      description:
        'Kuratierter Katalog gehärteter Multi-Arch-Container-Images mit wöchentlichen Rebuilds, signierten SBOMs, SLSA-Provenance und Cosign-Signaturen.',
    },
  },
  {
    path: 'products/s3-encryption-proxy',
    loadComponent: () => import('./pages/products/s3-encryption-proxy/s3-encryption-proxy.component').then(m => m.S3EncryptionProxyComponent),
    title: 'S3 Encryption Proxy | Guided Traffic',
    data: {
      description:
        'Transparenter S3-Proxy mit Envelope-Encryption pro Objekt. Die Schlüssel bleiben bei Ihnen — für AWS S3, MinIO und S3-kompatible Backends.',
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
