import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicesService, Service } from '../../services/services.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent {
  private readonly servicesService = inject(ServicesService);
  readonly services: Service[] = this.servicesService.getServices();
}
