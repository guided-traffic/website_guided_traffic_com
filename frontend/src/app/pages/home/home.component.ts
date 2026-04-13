import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServicesService, Service } from '../../services/services.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly servicesService = inject(ServicesService);
  readonly services: Service[] = this.servicesService.getServices();
}
