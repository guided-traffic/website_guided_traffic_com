import { Component, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ServicesService, Service } from '../../services/services.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  private servicesService = inject(ServicesService);

  menuOpen = false;
  scrolled = false;
  servicesOpen = false;
  services: Service[] = this.servicesService.getServices();

  readonly serviceSlugs: Record<string, string> = {
    'GitOps & FluxCD': 'gitops-fluxcd',
    'Kubernetes Provisioning': 'kubernetes-provisioning',
    'CI/CD Pipelines': 'cicd-pipelines',
    'Legacy Migration': 'legacy-migration',
    'Monitoring & Observability': 'monitoring-observability',
    'Training & Enablement': 'training-enablement',
  };

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 50;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.servicesOpen = false;
  }

  toggleServices(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.servicesOpen = !this.servicesOpen;
  }

  getSlug(title: string): string {
    return this.serviceSlugs[title] ?? '';
  }
}
