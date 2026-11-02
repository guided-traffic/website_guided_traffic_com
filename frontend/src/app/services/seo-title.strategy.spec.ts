import { Component } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { TitleStrategy, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { SeoTitleStrategy } from './seo-title.strategy';

@Component({ standalone: true, template: '' })
class PageStubComponent {}

describe('SeoTitleStrategy', () => {
  let harness: RouterTestingHarness;
  let head: HTMLHeadElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: PageStubComponent, title: 'Start', data: { description: 'Startseite' } },
          { path: 'services/kubernetes-cluster', component: PageStubComponent, title: 'Kubernetes', data: { description: 'Cluster' } },
          { path: 'untitled', component: PageStubComponent },
        ]),
        { provide: TitleStrategy, useClass: SeoTitleStrategy },
      ],
    });
    head = TestBed.inject(DOCUMENT).head;
    harness = await RouterTestingHarness.create();
  });

  const content = (selector: string) => head.querySelector(selector)?.getAttribute('content');

  it('should write title, description and Open Graph tags of the route', async () => {
    await harness.navigateByUrl('/services/kubernetes-cluster');

    expect(TestBed.inject(DOCUMENT).title).toBe('Kubernetes');
    expect(content('meta[name="description"]')).toBe('Cluster');
    expect(content('meta[property="og:title"]')).toBe('Kubernetes');
    expect(content('meta[property="og:description"]')).toBe('Cluster');
  });

  it('should point canonical and og:url at the fixed origin without query or fragment', async () => {
    await harness.navigateByUrl('/services/kubernetes-cluster?utm_source=x#faq');

    const canonical = head.querySelectorAll('link[rel="canonical"]');
    expect(canonical).toHaveLength(1);
    expect(canonical[0].getAttribute('href')).toBe('https://www.guided-traffic.com/services/kubernetes-cluster');
    expect(content('meta[property="og:url"]')).toBe('https://www.guided-traffic.com/services/kubernetes-cluster');
  });

  it('should keep a single canonical link across navigations', async () => {
    await harness.navigateByUrl('/services/kubernetes-cluster');
    await harness.navigateByUrl('/');

    const canonical = head.querySelectorAll('link[rel="canonical"]');
    expect(canonical).toHaveLength(1);
    expect(canonical[0].getAttribute('href')).toBe('https://www.guided-traffic.com/');
  });

  it('should fall back to the site name for routes without a title', async () => {
    await harness.navigateByUrl('/untitled');

    expect(TestBed.inject(DOCUMENT).title).toBe('Guided Traffic');
  });
});
