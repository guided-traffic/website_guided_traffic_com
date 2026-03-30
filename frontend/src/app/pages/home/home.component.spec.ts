import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render h1 headline', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toContain('Your infrastructure');
  });

  it('should render CTA button', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const cta = fixture.nativeElement.querySelector('.hero__cta');
    expect(cta).toBeTruthy();
    expect(cta.textContent).toContain('Book a free migration assessment');
  });

  it('should render three value proposition cards', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('.value-card');
    expect(cards.length).toBe(3);
  });
});
