import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServicesService, Service } from '../../services/services.service';
import { ProductsService, Product } from '../../services/products.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  private servicesService = inject(ServicesService);
  private productsService = inject(ProductsService);

  currentYear = new Date().getFullYear();
  services: Service[] = this.servicesService.getServices();
  products: Product[] = this.productsService.getProducts();

  // Mirror the slug map from nav so footer anchors resolve to the same IDs.
  readonly serviceSlugs: Record<string, string> = {
    'GitOps & FluxCD': 'gitops-fluxcd',
    'Kubernetes Provisioning': 'kubernetes-provisioning',
    'CI/CD Pipelines': 'cicd-pipelines',
    'Legacy-Migration': 'legacy-migration',
    'Monitoring & Observability': 'monitoring-observability',
    'Training & Enablement': 'training-enablement',
  };

  getSlug(title: string): string {
    return this.serviceSlugs[title] ?? '';
  }
}
