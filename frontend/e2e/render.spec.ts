import { test, expect } from '@playwright/test';

test.describe('Homepage render test', () => {
  test('renders key DOM elements', async ({ page }) => {
    await page.goto('/');

    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).not.toBeEmpty();

    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    const sections = page.locator('section');
    const count = await sections.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('navigation links are present', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('nav').first();
    await expect(nav.getByText('Guided Traffic')).toBeVisible();
    await expect(nav.getByRole('link', { name: /Home/ }).first()).toBeVisible();
    await expect(nav.getByRole('link', { name: /Products/ }).first()).toBeVisible();
    await expect(nav.getByRole('link', { name: /Services/ }).first()).toBeVisible();
  });

  test('products page renders', async ({ page }) => {
    await page.goto('/products');

    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();

    const cards = page.locator('.product-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
