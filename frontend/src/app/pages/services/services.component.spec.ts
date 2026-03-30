import { TestBed } from '@angular/core/testing';
import { ServicesComponent } from './services.component';
import { ServicesService } from '../../services/services.service';

describe('ServicesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ServicesComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the correct number of service cards (6)', () => {
    const fixture = TestBed.createComponent(ServicesComponent);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('.service-card');
    expect(cards.length).toBe(6);
  });

  it('should display title and description for each card', () => {
    const fixture = TestBed.createComponent(ServicesComponent);
    fixture.detectChanges();
    const titles = fixture.nativeElement.querySelectorAll('.service-card__title');
    const descriptions = fixture.nativeElement.querySelectorAll('.service-card__description');

    expect(titles.length).toBe(6);
    expect(descriptions.length).toBe(6);

    titles.forEach((el: HTMLElement) => {
      expect(el.textContent?.trim().length).toBeGreaterThan(0);
    });

    descriptions.forEach((el: HTMLElement) => {
      expect(el.textContent?.trim().length).toBeGreaterThan(0);
    });
  });

  it('should get service data from ServicesService, not hardcoded', () => {
    const fixture = TestBed.createComponent(ServicesComponent);
    const service = TestBed.inject(ServicesService);
    const serviceData = service.getServices();

    fixture.detectChanges();

    const titles = fixture.nativeElement.querySelectorAll('.service-card__title');
    serviceData.forEach((s, i) => {
      expect(titles[i].textContent?.trim()).toBe(s.title);
    });
  });

  it('should display an icon for each service card', () => {
    const fixture = TestBed.createComponent(ServicesComponent);
    fixture.detectChanges();
    const icons = fixture.nativeElement.querySelectorAll('.service-card__icon');
    expect(icons.length).toBe(6);

    icons.forEach((el: HTMLElement) => {
      expect(el.textContent?.trim().length).toBeGreaterThan(0);
    });
  });

  it('should render the hero section with correct heading', () => {
    const fixture = TestBed.createComponent(ServicesComponent);
    fixture.detectChanges();
    const headline = fixture.nativeElement.querySelector('.services-hero__headline');
    expect(headline.textContent).toContain('What We Do');
  });
});
