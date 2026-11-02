import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { routes } from './app.routes';
import { SITE_ORIGIN } from './services/seo-title.strategy';

describe('routes', () => {
  const pages = routes.filter((route) => route.loadComponent);

  it('should give every page a search title of at most 60 characters', () => {
    for (const page of pages) {
      expect({ path: page.path, ok: typeof page.title === 'string' && page.title.length <= 60 })
        .toEqual({ path: page.path, ok: true });
    }
  });

  it('should give every page a meta description of at most 155 characters', () => {
    for (const page of pages) {
      const description = page.data?.['description'];
      expect({ path: page.path, ok: typeof description === 'string' && description.length <= 155 })
        .toEqual({ path: page.path, ok: true });
    }
  });

  it('should list exactly the page routes in the sitemap', () => {
    const sitemap = readFileSync(join(__dirname, '../../public/sitemap.xml'), 'utf8');
    const listed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
    const expected = pages.map((page) => `${SITE_ORIGIN}/${page.path}`).sort();
    expect(listed).toEqual(expected);
  });
});
