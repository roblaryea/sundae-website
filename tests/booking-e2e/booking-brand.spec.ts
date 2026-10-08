import { test, expect } from '@playwright/test';

test('approved Sundae mark and wordmark appear on public and unavailable booking surfaces', async ({ page }) => {
  for (const path of ['/book?token=optional', '/book/qa-host/intro', '/book?token=expired', '/book/paused', '/book/manage?id=invalid&token=invalid']) {
    await page.goto(path);
    const brand = page.getByRole('img', { name: 'Sundae', exact: true });
    await expect(brand).toHaveCount(1);
    await expect(brand).toBeVisible();
    await expect(brand.locator('svg')).toHaveAttribute('viewBox', '0 0 200 200');
    await expect(brand.getByText('sundae', { exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }

  await page.goto('/book/qa-host/intro');
  for (let toggle = 0; toggle < 2; toggle++) {
    await page.getByRole('button', { name: 'Toggle light or dark mode' }).click();
    await expect(page.getByRole('img', { name: 'Sundae', exact: true })).toBeVisible();
    // Wait for the shell's theme transition before judging text/background contrast.
    await expect.poll(() => page.getByRole('main').evaluate((main) => {
      const shell = main.parentElement!;
      return getComputedStyle(shell).backgroundColor === getComputedStyle(shell.querySelector('header')!).backgroundColor;
    })).toBe(true);
    await page.screenshot({ path: test.info().outputPath(`booking-brand-theme-${toggle}.png`), animations: 'disabled' });
  }
});
