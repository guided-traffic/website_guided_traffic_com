import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService, Product, ProductCategory } from '../../services/products.service';

interface ProductSection extends ProductCategory {
  products: Product[];
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);

  // One section per category, in the service's order; empty categories are left out
  readonly sections: ProductSection[] = this.productsService
    .getCategories()
    .map(category => ({
      ...category,
      products: this.productsService.getProducts().filter(p => p.category === category.key),
    }))
    .filter(section => section.products.length > 0);
}
