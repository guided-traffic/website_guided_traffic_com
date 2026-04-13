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
    path: '**',
    redirectTo: '',
  },
];
