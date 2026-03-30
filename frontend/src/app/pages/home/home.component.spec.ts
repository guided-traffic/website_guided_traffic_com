import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the hero headline', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('.hero__headline');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toContain('Your Infrastructure.');
    expect(h1.textContent).toContain('Finally Automated.');
  });

  it('should render two CTA buttons', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const ctas = fixture.nativeElement.querySelectorAll('.hero__ctas .btn');
    expect(ctas.length).toBe(2);
    expect(ctas[0].textContent).toContain('Book a Free Assessment');
    expect(ctas[1].textContent).toContain('See How We Work');
  });

  it('should render the stats section with four items', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('.stats__item');
    expect(items.length).toBe(4);
    const numbers = fixture.nativeElement.querySelectorAll('.stats__number');
    expect(numbers[0].textContent).toContain('100%');
    expect(numbers[1].textContent).toContain('FluxCD');
    expect(numbers[2].textContent).toContain('0');
    expect(numbers[3].textContent).toContain('24/7');
  });

  it('should render trust badges for technology partners', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const badges = fixture.nativeElement.querySelectorAll('.trust__badge');
    expect(badges.length).toBe(6);
    expect(badges[0].textContent).toContain('Kubernetes');
  });

  it('should render three differentiator cards', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('.differentiator-card');
    expect(cards.length).toBe(3);
    const headings = fixture.nativeElement.querySelectorAll('.differentiator-card h3');
    expect(headings[0].textContent).toContain('GitOps-First');
    expect(headings[1].textContent).toContain('We Meet You Where You Are');
    expect(headings[2].textContent).toContain('Your Team Learns Too');
  });

  it('should render four how-we-work steps', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const steps = fixture.nativeElement.querySelectorAll('.step');
    expect(steps.length).toBe(4);
    const titles = fixture.nativeElement.querySelectorAll('.step__title');
    expect(titles[0].textContent).toContain('Discovery');
    expect(titles[1].textContent).toContain('Plan');
    expect(titles[2].textContent).toContain('Implement');
    expect(titles[3].textContent).toContain('Enable');
  });

  it('should render three engagement model cards', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('.engagement-card');
    expect(cards.length).toBe(3);
  });

  it('should render engagement card titles', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const titles = fixture.nativeElement.querySelectorAll('.engagement-card__title');
    expect(titles[0].textContent).toContain('Discovery Sprint');
    expect(titles[1].textContent).toContain('Migration Project');
    expect(titles[2].textContent).toContain('Ongoing Partnership');
  });

  it('should render engagement card pricing labels', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const prices = fixture.nativeElement.querySelectorAll('.engagement-card__price');
    expect(prices[0].textContent).toContain('fixed-price');
    expect(prices[1].textContent).toContain('€10k+');
    expect(prices[2].textContent).toContain('monthly');
  });

  it('should render bullet points in each engagement card', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const bulletLists = fixture.nativeElement.querySelectorAll('.engagement-card__bullets');
    expect(bulletLists.length).toBe(3);
    bulletLists.forEach((list: HTMLElement) => {
      const items = list.querySelectorAll('li');
      expect(items.length).toBe(3);
    });
  });
});
