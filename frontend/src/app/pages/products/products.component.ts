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
  readonly products: Product[] = this.productsService.getProducts();
}
