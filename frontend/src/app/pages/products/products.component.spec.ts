import { TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';

describe('ProductsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the correct number of product cards', () => {
    const fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('.product-card');
    expect(cards.length).toBe(5);
  });

  it('should show FREE badges correctly', () => {
    const fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
    const freeBadges = fixture.nativeElement.querySelectorAll('.product-card__badge--free');
    expect(freeBadges.length).toBe(4);
    freeBadges.forEach((badge: HTMLElement) => {
      expect(badge.textContent?.trim()).toBe('FREE');
    });
  });

  it('should show LICENSED badges correctly', () => {
    const fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
    const licensedBadges = fixture.nativeElement.querySelectorAll('.product-card__badge--licensed');
    expect(licensedBadges.length).toBe(1);
    expect(licensedBadges[0].textContent?.trim()).toBe('LICENSED');
  });

  it('should render product names and descriptions', () => {
    const fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
    const names = fixture.nativeElement.querySelectorAll('.product-card__name');
    expect(names.length).toBe(5);
    expect(names[0].textContent).toContain('Internal Secrets Operator');
  });

  it('should render CTA buttons for each product', () => {
    const fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
    const ctas = fixture.nativeElement.querySelectorAll('.product-card__cta');
    expect(ctas.length).toBe(5);
  });

  it('should render hero section with correct heading', () => {
    const fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
    const headline = fixture.nativeElement.querySelector('.products-hero__headline');
    expect(headline.textContent).toContain('Open Source Tools');
  });

  it('should use btn-secondary for GitHub links and btn-primary for internal links', () => {
    const fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
    const secondaryCtas = fixture.nativeElement.querySelectorAll('.product-card__cta.btn-secondary');
    const primaryCtas = fixture.nativeElement.querySelectorAll('.product-card__cta.btn-primary');
    expect(secondaryCtas.length).toBe(4);
    expect(primaryCtas.length).toBe(1);
  });
});
