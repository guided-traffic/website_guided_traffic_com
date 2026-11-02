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
    await expect(nav.getByRole('link', { name: /Start/ }).first()).toBeVisible();
    await expect(nav.getByRole('link', { name: /Services/ }).first()).toBeVisible();
    await expect(nav.getByRole('link', { name: /Produkte/ }).first()).toBeVisible();
  });

  test('in-page buttons stay on their page', async ({ page }) => {
    // A plain href="#x" resolves against <base href="/"> and lands on the home page
    for (const [path, label, fragment] of [
      ['/services/kubernetes-cluster', 'So arbeiten wir', 'so-loesen-wir-das'],
      ['/ueber-uns', 'Projekte ansehen', 'projekte'],
    ]) {
      await page.goto(path);
      await page.getByRole('link', { name: label }).click();
      await expect(page).toHaveURL(`${path}#${fragment}`);
    }
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
