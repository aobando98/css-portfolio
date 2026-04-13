const { test, expect } = require('@playwright/test');

test('homepage shows title and H1', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Alberto Obando/);
  await expect(page.locator('h1')).toHaveText('Alberto Obando Zúñiga');
});
