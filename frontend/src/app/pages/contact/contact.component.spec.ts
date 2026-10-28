import { TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { FormsModule } from '@angular/forms';

describe('ContactComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, FormsModule],
    }).compileComponents();
  });

  function render(): HTMLElement {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the hero headline', () => {
    const headline = render().querySelector('.contact-hero__headline');
    expect(headline?.textContent).toContain('Sprechen wir über Ihre Infrastruktur');
  });

  it('should render three value points without icons', () => {
    const el = render();
    const titles = Array.from(el.querySelectorAll('.contact__point-title')).map(t => t.textContent?.trim());
    expect(titles).toEqual(['Kostenlose Analyse', 'Keine Abhängigkeit', 'Echte Ingenieure']);
    expect(el.querySelector('.contact__point-icon')).toBeNull();
  });

  it('should render form fields for name, email, company, and message', () => {
    const el = render();
    expect(el.querySelector('input[name="name"]')).toBeTruthy();
    expect(el.querySelector('input[name="email"]')).toBeTruthy();
    expect(el.querySelector('input[name="company"]')).toBeTruthy();
    expect(el.querySelector('textarea[name="message"]')).toBeTruthy();
  });

  it('should render the submit button', () => {
    const submit = render().querySelector('.contact__submit');
    expect(submit?.textContent).toContain('Nachricht senden');
  });

  it('should render email and location info', () => {
    const el = render();
    expect(el.querySelector('.contact__email a')?.getAttribute('href')).toBe('mailto:mail@guided-traffic.com');
    expect(el.querySelector('.contact__location')?.textContent?.trim().length).toBeGreaterThan(0);
  });
});
