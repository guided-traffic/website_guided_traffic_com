import { TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { RouterModule } from '@angular/router';

describe('FooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the logo text', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const logo = fixture.nativeElement.querySelector('.footer__logo');
    expect(logo).toBeTruthy();
    expect(logo.textContent).toContain('Guided Traffic');
  });

  it('should render all four columns', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const columns = fixture.nativeElement.querySelectorAll('.footer__col');
    expect(columns.length).toBe(4);
  });

  it('should render column headings', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const headings = fixture.nativeElement.querySelectorAll('.footer__heading');
    const texts = Array.from(headings).map((h: any) => h.textContent.trim());
    expect(texts).toContain('Quick Links');
    expect(texts).toContain('Services');
    expect(texts).toContain('Contact');
  });

  it('should render copyright text with current year', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const bottom = fixture.nativeElement.querySelector('.footer__bottom');
    const year = new Date().getFullYear();
    expect(bottom.textContent).toContain(`${year}`);
    expect(bottom.textContent).toContain('Guided Traffic');
  });

  it('should render quick links', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('.footer__list a');
    const hrefs = Array.from(links).map((a: any) => a.getAttribute('href'));
    expect(hrefs).toContain('/');
    expect(hrefs).toContain('/services');
    expect(hrefs).toContain('/products');
    expect(hrefs).toContain('/contact');
  });

  it('should render Built with Kubernetes text', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const bottom = fixture.nativeElement.querySelector('.footer__bottom');
    expect(bottom.textContent).toContain('Built with Kubernetes');
  });
});
