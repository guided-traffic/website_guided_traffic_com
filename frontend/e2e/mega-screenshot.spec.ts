import { test } from '@playwright/test';

test('nav-mega-open — desktop, Services mega-menu open', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.locator('.nav__services-item--desktop').hover();
  await page.waitForTimeout(400);
  await page.screenshot({
    path: 'screenshots/nav-mega-open.png',
    clip: { x: 0, y: 0, width: 1280, height: 500 },
  });
});
