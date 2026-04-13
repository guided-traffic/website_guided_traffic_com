import { TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { FormsModule } from '@angular/forms';

describe('ContactComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, FormsModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the hero headline', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const headline = fixture.nativeElement.querySelector('.contact-hero__headline');
    expect(headline.textContent).toContain("Let's Talk About Your Infrastructure");
  });

  it('should render three value proposition bullet points', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const points = fixture.nativeElement.querySelectorAll('.contact__point');
    expect(points.length).toBe(3);

    const titles = fixture.nativeElement.querySelectorAll('.contact__point-title');
    expect(titles[0].textContent).toContain('Free assessment');
    expect(titles[1].textContent).toContain('No lock-in');
    expect(titles[2].textContent).toContain('Real engineers');
  });

  it('should render form fields for name, email, company, and message', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();

    const nameInput = fixture.nativeElement.querySelector('input[name="name"]');
    const emailInput = fixture.nativeElement.querySelector('input[name="email"]');
    const companyInput = fixture.nativeElement.querySelector('input[name="company"]');
    const messageInput = fixture.nativeElement.querySelector('textarea[name="message"]');

    expect(nameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(companyInput).toBeTruthy();
    expect(messageInput).toBeTruthy();
  });

  it('should render the submit button', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const submitBtn = fixture.nativeElement.querySelector('.contact__submit');
    expect(submitBtn).toBeTruthy();
    expect(submitBtn.textContent).toContain('Send Message');
  });

  it('should render email and location info', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const email = fixture.nativeElement.querySelector('.contact__email');
    const location = fixture.nativeElement.querySelector('.contact__location');
    expect(email.textContent).toContain('mail@guided-traffic.com');
    expect(location.textContent).toContain('Germany');
  });
});
