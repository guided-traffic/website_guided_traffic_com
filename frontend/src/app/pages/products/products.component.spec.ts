import { TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';

describe('ProductsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  function render(): HTMLElement {
    const fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the hero headline with its accent word', () => {
    const headline = render().querySelector('.products-hero__headline');
    expect(headline?.textContent).toContain('Werkzeuge aus der');
    expect(headline?.querySelector('em')?.textContent).toBe('Praxis');
  });

  it('should render one card per product', () => {
    const products = TestBed.inject(ProductsService).getProducts();
    expect(render().querySelectorAll('.product-card').length).toBe(products.length);
  });

  it('should split products into open-source and commercial sections by license', () => {
    const products = TestBed.inject(ProductsService).getProducts();
    const sections = render().querySelectorAll('section.products');
    expect(sections.length).toBe(2);
    expect(sections[0].querySelectorAll('.product-card__badge--free').length).toBe(products.filter(p => p.license === 'FREE').length);
    expect(sections[1].querySelectorAll('.product-card__badge--licensed').length).toBe(products.filter(p => p.license === 'LICENSED').length);
  });

  it('should render product names and link internal CTAs to the detail pages', () => {
    const el = render();
    expect(el.querySelector('.product-card__name')?.textContent).toContain('Internal Secrets Operator');
    const internal = Array.from(el.querySelectorAll('.product-card__cta.btn-primary')).map(a => a.getAttribute('href'));
    expect(internal).toContain('/products/internal-secrets-operator');
    expect(internal).toContain('/products/s3-encryption-proxy');
  });
});
