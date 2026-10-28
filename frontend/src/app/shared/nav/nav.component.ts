import { Component, HostListener, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ServicesService, Service } from '../../services/services.service';
import { ProductsService, Product } from '../../services/products.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DecimalPipe],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  private servicesService = inject(ServicesService);
  private productsService = inject(ProductsService);
  private themeService = inject(ThemeService);

  menuOpen = false;
  scrolled = false;
  servicesOpen = false;
  productsOpen = false;
  megaForceClosed: 'services' | 'products' | null = null;
  services: Service[] = this.servicesService.getServices();
  products: Product[] = this.productsService.getProducts();
  readonly theme = this.themeService.theme;


  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 50;
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.servicesOpen = false;
    this.productsOpen = false;
  }

  closeMega(key: 'services' | 'products'): void {
    this.megaForceClosed = key;
    this.closeMenu();
  }

  onMegaLeave(key: 'services' | 'products'): void {
    if (this.megaForceClosed === key) {
      this.megaForceClosed = null;
    }
  }

  toggleServices(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.servicesOpen = !this.servicesOpen;
  }

  toggleProducts(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.productsOpen = !this.productsOpen;
  }
}
