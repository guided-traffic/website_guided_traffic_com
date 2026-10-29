import { TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { RouterModule } from '@angular/router';

describe('NavComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  function render(): HTMLElement {
    const fixture = TestBed.createComponent(NavComponent);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('should create', () => {
    const fixture = TestBed.createComponent(NavComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the logo text', () => {
    const logo = render().querySelector('.nav__logo');
    expect(logo?.textContent).toContain('Guided Traffic');
  });

  it('should render the top-level navigation links', () => {
    const links = render().querySelectorAll('.nav__links > li > a');
    const hrefs = Array.from(links).map(a => a.getAttribute('href'));
    expect(hrefs).toContain('/');
    expect(hrefs).toContain('/services');
    expect(hrefs).toContain('/products');
  });

  it('should render the contact CTA', () => {
    const cta = render().querySelector('.nav__cta');
    expect(cta?.textContent).toContain('Kontakt');
    expect(cta?.getAttribute('href')).toBe('/contact');
  });

  it('should link services in the mega-menu to their detail pages', () => {
    const items = render().querySelectorAll('.nav__mega-item');
    // The services panel comes first; the products panel follows
    const hrefs = Array.from(items).map(a => a.getAttribute('href')).slice(0, 4);
    expect(hrefs).toEqual([
      '/services/kubernetes-cluster',
      '/services/agentic-programming',
      '/services/ci-pipelines',
      '/services/ansible-automation',
    ]);
  });

  it('should number mega-menu entries instead of using icons', () => {
    const nums = Array.from(render().querySelectorAll('.nav__mega-item-num')).map(n => n.textContent?.trim());
    expect(nums.slice(0, 3)).toEqual(['01', '02', '03']);
  });

  it('should label the theme toggle with the theme it switches to', () => {
    const el = render();
    expect(el.querySelector('.nav__theme')?.getAttribute('aria-label')).toBe('Zu dunklem Design wechseln');
  });

  it('should switch the theme and update the toggle label', () => {
    localStorage.clear();
    const fixture = TestBed.createComponent(NavComponent);
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.nav__theme');
    button.click();
    fixture.detectChanges();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(button.getAttribute('aria-label')).toBe('Zu hellem Design wechseln');
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('should toggle menu open state', () => {
    const fixture = TestBed.createComponent(NavComponent);
    const component = fixture.componentInstance;
    expect(component.menuOpen).toBe(false);
    component.toggleMenu();
    expect(component.menuOpen).toBe(true);
    component.toggleMenu();
    expect(component.menuOpen).toBe(false);
  });

  it('should close menu when closeMenu is called', () => {
    const fixture = TestBed.createComponent(NavComponent);
    const component = fixture.componentInstance;
    component.menuOpen = true;
    component.closeMenu();
    expect(component.menuOpen).toBe(false);
  });
});
