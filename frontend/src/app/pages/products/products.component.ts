import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService, Product } from '../../services/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);

  get openSourceProducts(): Product[] {
    return this.productsService.getProducts().filter(p => p.license === 'FREE');
  }

  get commercialProducts(): Product[] {
    return this.productsService.getProducts().filter(p => p.license === 'LICENSED');
  }
}
