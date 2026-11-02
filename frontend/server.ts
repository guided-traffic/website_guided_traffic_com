import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { routes } from './src/app/app.routes';
import bootstrap from './src/main.server';

// Hosts the engine renders for. Without this list CommonEngine falls back to
// client-side rendering for every request, so crawlers get an empty <app-root>.
// NG_ALLOWED_HOSTS (comma-separated) adds hosts at runtime. Any other Host header
// makes the render fail, which is why the health check below bypasses the engine.
const allowedHosts = ['www.guided-traffic.com', 'guided-traffic.com', 'localhost'];

// Paths the app renders a page for; every other path still renders (the router
// falls back to the home page) but answers 404, so it never gets indexed
const pagePaths = new Set(
  routes.filter((route) => route.path !== '**' && !route.redirectTo).map((route) => `/${route.path}`),
);

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine({ allowedHosts });

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.get('/healthz', (_req, res) => {
    res.send('ok');
  });

  // Redirect routes become permanent redirects instead of duplicate pages
  for (const route of routes) {
    if (route.path !== '**' && typeof route.redirectTo === 'string') {
      const target = `/${route.redirectTo}`;
      server.get(`/${route.path}`, (_req, res) => res.redirect(301, target));
    }
  }

  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;
    const path = req.path.length > 1 ? req.path.replace(/\/+$/, '') : req.path;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.status(pagePaths.has(path) ? 200 : 404).send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
