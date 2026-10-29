import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { ServicesComponent } from './services.component';
import { ServicesService } from '../../services/services.service';

describe('ServicesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  function render(): HTMLElement {
    const fixture = TestBed.createComponent(ServicesComponent);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('should create', () => {
    const fixture = TestBed.createComponent(ServicesComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the hero headline', () => {
    const headline = render().querySelector('.services-hero__headline');
    expect(headline?.textContent).toContain('Unsere Leistungen');
  });

  it('should render one card per service from ServicesService', () => {
    const services = TestBed.inject(ServicesService).getServices();
    const titles = Array.from(render().querySelectorAll('.service-card__title')).map(t => t.textContent?.trim());
    expect(titles).toEqual(services.map(s => s.title));
  });

  it('should link each card to its detail page', () => {
    const hrefs = Array.from(render().querySelectorAll('.service-card__cta')).map(a => a.getAttribute('href'));
    expect(hrefs).toEqual([
      '/services/kubernetes-cluster',
      '/services/agentic-programming',
      '/services/ci-pipelines',
      '/services/ansible-automation',
    ]);
  });

  it('should number the cards instead of using icons', () => {
    const el = render();
    const numbers = Array.from(el.querySelectorAll('.service-card__bar .label:last-child')).map(n => n.textContent?.trim());
    expect(numbers).toEqual(['01', '02', '03', '04']);
    expect(el.querySelector('[class*="icon"]')).toBeNull();
  });
});
