import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent),
  },
  {
    path: 'services/ci-pipelines',
    loadComponent: () => import('./pages/services/ci-pipelines/ci-pipelines.component').then(m => m.CiPipelinesComponent),
  },
  {
    path: 'services/ansible-automation',
    loadComponent: () => import('./pages/services/ansible-automation/ansible-automation.component').then(m => m.AnsibleAutomationComponent),
  },
  {
    path: 'services/kubernetes-cluster',
    loadComponent: () => import('./pages/services/kubernetes-cluster/kubernetes-cluster.component').then(m => m.KubernetesClusterComponent),
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: 'impressum',
    loadComponent: () => import('./pages/impressum/impressum.component').then(m => m.ImpressumComponent),
  },
  {
    path: 'features',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'products/internal-secrets-operator',
    loadComponent: () => import('./pages/products/internal-secrets-operator/internal-secrets-operator.component').then(m => m.InternalSecretsOperatorComponent),
  },
  {
    path: 'products/jinja-template-operator',
    loadComponent: () => import('./pages/products/jinja-template-operator/jinja-template-operator.component').then(m => m.JinjaTemplateOperatorComponent),
  },
  {
    path: 'products/openldap-operator',
    loadComponent: () => import('./pages/products/openldap-operator/openldap-operator.component').then(m => m.OpenldapOperatorComponent),
  },
  {
    path: 'products/valkey-operator',
    loadComponent: () => import('./pages/products/valkey-operator/valkey-operator.component').then(m => m.ValkeyOperatorComponent),
  },
  {
    path: 'products/dex-operator',
    loadComponent: () => import('./pages/products/dex-operator/dex-operator.component').then(m => m.DexOperatorComponent),
  },
  {
    path: 'products/container-images',
    loadComponent: () => import('./pages/products/container-images/container-images.component').then(m => m.ContainerImagesComponent),
  },
  {
    path: 'products/s3-encryption-proxy',
    loadComponent: () => import('./pages/products/s3-encryption-proxy/s3-encryption-proxy.component').then(m => m.S3EncryptionProxyComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
