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
}
