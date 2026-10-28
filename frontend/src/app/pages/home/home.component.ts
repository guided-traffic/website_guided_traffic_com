import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicesService, Service } from '../../services/services.service';
import { HelmWheelComponent } from './helm-wheel/helm-wheel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, DecimalPipe, HelmWheelComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly servicesService = inject(ServicesService);
  readonly services: Service[] = this.servicesService.getServices();

  // Each copy scrolls by its own width, so the copies must cover the frame
  // (max 1280px) plus one copy; 4 keeps that true even if terms are removed
  readonly tickerCopies: number[] = [0, 1, 2, 3];

  // Terms taken from the service detail pages' copy
  readonly tickerTerms: string[] = [
    'Kubernetes', 'GitOps', 'Ansible', 'CI/CD', 'Security-Scans', 'Quality-Gates',
    'RBAC', 'Monitoring', 'Backup', 'Containerisierung', 'On-Prem', 'Hybrid',
  ];
}
