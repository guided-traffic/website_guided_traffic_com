import { Component, inject } from '@angular/core';
import { ServicesService, Service } from '../../services/services.service';

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent {
  private readonly servicesService = inject(ServicesService);
  readonly services: Service[] = this.servicesService.getServices();
}
