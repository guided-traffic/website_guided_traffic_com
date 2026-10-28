import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  function render(): HTMLElement {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('should create', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the hero headline with its serif accent word', () => {
    const h1 = render().querySelector('.hero__headline');
    expect(h1?.textContent).toContain('Deployments per Merge.');
    expect(h1?.querySelector('em')?.textContent).toContain('Nachtschicht');
  });

  it('should link the hero CTAs to the booking page and the topic router', () => {
    const ctas = render().querySelectorAll('.hero__ctas .btn');
    expect(ctas.length).toBe(2);
    expect(ctas[0].getAttribute('href')).toBe('https://cal.eu/hans-fischer/kennenlernen');
    expect(ctas[0].getAttribute('rel')).toContain('noopener');
    expect(ctas[1].getAttribute('href')).toBe('#wo-anfangen');
  });

  it('should render the five pain points', () => {
    const items = render().querySelectorAll('.pain-teaser__item');
    expect(items.length).toBe(5);
  });

  it('should render one topic card per service, linked to its detail page', () => {
    const el = render();
    const titles = Array.from(el.querySelectorAll('.topic-card__title')).map(t => t.textContent?.trim());
    const hrefs = Array.from(el.querySelectorAll('.topic-card__cta')).map(a => a.getAttribute('href'));
    expect(titles).toEqual([
      'CI-Pipelines & Templates',
      'OnPrem Provisionierung mit Ansible',
      'Production-ready Kubernetes Cluster',
    ]);
    expect(hrefs).toEqual([
      '/services/ci-pipelines',
      '/services/ansible-automation',
      '/services/kubernetes-cluster',
    ]);
  });

  it('should render enough ticker copies for wide viewports and hide them from assistive tech', () => {
    const el = render();
    const ticker = el.querySelector('.ticker');
    expect(ticker?.getAttribute('aria-hidden')).toBe('true');
    expect(el.querySelectorAll('.ticker__list').length).toBe(4);
  });
});
