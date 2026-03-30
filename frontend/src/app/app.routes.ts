import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
  },
  {
    path: 'features',
    loadComponent: () => import('./pages/features/features.component').then(m => m.FeaturesComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
