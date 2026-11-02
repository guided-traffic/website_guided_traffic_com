import { test, expect } from '@playwright/test';

// Raw HTTP requests, no browser: this is the HTML a crawler receives
test.describe('Server-rendered SEO output', () => {
  test('renders page content and snippet for the canonical host', async ({ request }) => {
    const response = await request.get('/services/kubernetes-cluster', {
      headers: { host: 'www.guided-traffic.com' },
    });
    expect(response.status()).toBe(200);

    const html = await response.text();
    expect(html).toContain('<title>Kubernetes-Experte für den Mittelstand | Guided Traffic</title>');
    expect(html).toMatch(/<h1[^>]*>Kubernetes-Experten\. Ohne/);
    expect(html).toContain('<link rel="canonical" href="https://www.guided-traffic.com/services/kubernetes-cluster">');
    expect(html).toMatch(/<meta name="description" content="Produktionsreife Kubernetes-Cluster on-prem/);
  });

  test('answers unknown paths with 404', async ({ request }) => {
    const response = await request.get('/does-not-exist');
    expect(response.status()).toBe(404);
  });

  test('treats a trailing slash as the same page', async ({ request }) => {
    const response = await request.get('/services/ci-pipelines/');
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain('href="https://www.guided-traffic.com/services/ci-pipelines"');
  });

  test('redirects former routes permanently', async ({ request }) => {
    const response = await request.get('/features', { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    expect(response.headers()['location']).toBe('/');
  });

  test('serves health check, robots.txt and sitemap', async ({ request }) => {
    expect((await request.get('/healthz', { headers: { host: '10.0.0.1:4000' } })).status()).toBe(200);

    const robots = await request.get('/robots.txt');
    expect(await robots.text()).toContain('Sitemap: https://www.guided-traffic.com/sitemap.xml');

    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain('<loc>https://www.guided-traffic.com/services/kubernetes-cluster</loc>');
  });
});
