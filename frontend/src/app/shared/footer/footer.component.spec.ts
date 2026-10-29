import { TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { RouterModule } from '@angular/router';

describe('FooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  function render(): HTMLElement {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('should create', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the logo text', () => {
    const logo = render().querySelector('.footer__logo');
    expect(logo?.textContent).toContain('Guided Traffic');
  });

  it('should render all four columns', () => {
    expect(render().querySelectorAll('.footer__col').length).toBe(4);
  });

  it('should render column headings', () => {
    const headings = render().querySelectorAll('.footer__heading');
    const texts = Array.from(headings).map(h => h.textContent?.trim());
    expect(texts).toEqual(['Services', 'Produkte', 'Kontakt', 'Standort']);
  });

  it('should link services to their detail pages', () => {
    const links = render().querySelectorAll('.footer__col:nth-child(2) a');
    const hrefs = Array.from(links).map(a => a.getAttribute('href'));
    expect(hrefs).toEqual([
      '/services/kubernetes-cluster',
      '/services/agentic-programming',
      '/services/ci-pipelines',
      '/services/ansible-automation',
    ]);
  });

  it('should render copyright text with current year', () => {
    const bottom = render().querySelector('.footer__bottom');
    expect(bottom?.textContent).toContain(`${new Date().getFullYear()}`);
    expect(bottom?.textContent).toContain('Guided Traffic');
  });

  it('should render the imprint link and the Kubernetes note', () => {
    const bottom = render().querySelector('.footer__bottom');
    expect(bottom?.querySelector('a')?.getAttribute('href')).toBe('/impressum');
    expect(bottom?.textContent).toContain('Entwickelt mit Kubernetes');
  });
});
