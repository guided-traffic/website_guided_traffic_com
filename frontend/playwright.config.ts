import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:4000',
    headless: true,
  },
  webServer: {
    command: 'node dist/frontend/server/server.mjs',
    port: 4000,
    reuseExistingServer: !process.env['CI'],
    timeout: 30_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
