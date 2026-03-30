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
    expect(cards.length).toBe(3);
  });

  it('should show FREE badges correctly', () => {
    const fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
    const freeBadges = fixture.nativeElement.querySelectorAll('.product-card__badge--free');
    expect(freeBadges.length).toBe(2);
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
    expect(names.length).toBe(3);
    expect(names[0].textContent).toContain('FluxCD Starter Kit');
  });

  it('should render CTA buttons for each product', () => {
    const fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
    const ctas = fixture.nativeElement.querySelectorAll('.product-card__cta');
    expect(ctas.length).toBe(3);
  });
});
