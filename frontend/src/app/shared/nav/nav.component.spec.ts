import { TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { RouterModule } from '@angular/router';

describe('NavComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NavComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the logo text', () => {
    const fixture = TestBed.createComponent(NavComponent);
    fixture.detectChanges();
    const logo = fixture.nativeElement.querySelector('.nav__logo');
    expect(logo).toBeTruthy();
    expect(logo.textContent).toContain('Guided Traffic');
  });

  it('should render all navigation links', () => {
    const fixture = TestBed.createComponent(NavComponent);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('.nav__links a');
    const hrefs = Array.from(links).map((a: any) => a.getAttribute('href'));
    expect(hrefs).toContain('/');
    expect(hrefs).toContain('/products');
    expect(hrefs).toContain('/features');
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
