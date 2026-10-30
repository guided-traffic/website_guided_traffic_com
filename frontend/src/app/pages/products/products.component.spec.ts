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

  it('should render one section per category, in order, with its products', () => {
    const service = TestBed.inject(ProductsService);
    const sections = Array.from(render().querySelectorAll('section.products'));
    expect(sections.map(s => s.querySelector('h2')?.textContent?.trim())).toEqual([
      'Desktop-Anwendungen',
      'Kubernetes-Operatoren',
      'Plattform-Dienste',
      'Security-Anwendungen',
    ]);
    service.getCategories().forEach((category, i) => {
      const names = Array.from(sections[i].querySelectorAll('.product-card__name')).map(n => n.textContent?.trim());
      expect(names).toEqual(service.getProducts().filter(p => p.category === category.key).map(p => p.name));
    });
  });

  it('should keep the product list grouped in category order', () => {
    const service = TestBed.inject(ProductsService);
    const order = service.getCategories().map(c => c.key);
    const ranks = service.getProducts().map(p => order.indexOf(p.category));
    expect(ranks).toEqual([...ranks].sort((a, b) => a - b));
    expect(ranks).not.toContain(-1);
  });

  it('should mark products in development on their card', () => {
    const products = TestBed.inject(ProductsService).getProducts();
    const marked = Array.from(render().querySelectorAll('.product-card'))
      .filter(card => card.querySelector('.product-card__badge--status'))
      .map(card => card.id);
    expect(marked).toEqual(products.filter(p => p.status === 'in-development').map(p => p.slug));
    expect(marked).toContain('trove');
  });

  it('should render product names and link internal CTAs to the detail pages', () => {
    const el = render();
    expect(el.querySelector('.product-card__name')?.textContent).toContain('Cogpit');
    const internal = Array.from(el.querySelectorAll('.product-card__cta.btn-primary')).map(a => a.getAttribute('href'));
    expect(internal).toContain('/products/cogpit');
    expect(internal).toContain('/products/internal-secrets-operator');
    expect(internal).toContain('/products/s3-encryption-proxy');
  });
});
