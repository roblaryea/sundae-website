import { test, expect } from '@playwright/test';

// Uses only the existing local contract fixture: no calendar or email writes.
for (const width of [375, 390, 768, 1280]) {
  test(`booking workspace uses space at ${width}px and preserves date/time/details flow`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 640 ? 812 : 900 });
    await page.goto('/book/qa-layout/intro');
    await page.getByLabel('Your time zone').selectOption('UTC');
    const calendar = page.locator('[data-booking-calendar]');
    const times = page.locator('[data-booking-times]');
    await expect(times.getByRole('button').first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const calBox = (await calendar.boundingBox())!;
    const timeBox = (await times.boundingBox())!;
    const summaryBox = (await page.locator('[data-booking-summary]').boundingBox())!;
    const pickerBox = (await page.locator('[data-booking-picker]').boundingBox())!;
    if (width >= 1024) {
      expect(pickerBox.x).toBeGreaterThan(summaryBox.x + summaryBox.width);
      expect(pickerBox.y).toBe(summaryBox.y);
      expect((await page.locator('[data-booking-workspace]').boundingBox())!.width).toBeGreaterThan(1000);
    } else {
      await expect(page.getByRole('combobox', { name: 'Event types', exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Introduction', exact: true })).toBeHidden();
      expect(pickerBox.y).toBeGreaterThan(summaryBox.y);
    }
    if (width >= 640) {
      expect(timeBox.x).toBeGreaterThan(calBox.x + calBox.width);
      expect(Math.abs(timeBox.y - calBox.y)).toBeLessThan(2);
    } else {
      expect(timeBox.y).toBeGreaterThan(calBox.y + calBox.height);
      expect(calBox.y + calBox.height).toBeLessThanOrEqual(812);
    }
    const day = page.getByRole('button', { name: 'Wednesday, Oct 28', exact: true });
    expect((await day.boundingBox())!.height).toBe(width >= 640 ? 48 : 44);
    await day.click();
    await expect(times.getByRole('heading')).toHaveText('Wednesday, Oct 28');
    await expect(times.getByRole('button').first()).toBeInViewport();
    await times.getByRole('button').first().click();
    await expect(page.getByRole('heading', { name: 'Review your booking', exact: true })).toBeFocused();
    await expect(page.getByLabel('Your name', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Email address', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Choose another time', exact: true }).click();
    await expect(times.getByRole('heading')).toHaveText('Wednesday, Oct 28');
    await page.screenshot({ path: test.info().outputPath(`booking-${width}.png`), fullPage: true });
  });
}

test('RTL workspace mirrors the desktop columns and preserves compact mobile event navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/book/qa-layout/intro?locale=ar');
  await page.getByLabel('منطقتك الزمنية').selectOption('UTC');
  const summary = page.locator('[data-booking-summary]');
  const picker = page.locator('[data-booking-picker]');
  await expect(page.locator('[data-booking-times] button').first()).toBeVisible();
  expect((await summary.boundingBox())!.x).toBeGreaterThan((await picker.boundingBox())!.x);
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(page.locator('#booking-event-type')).toBeVisible();
  await page.locator('#booking-event-type').selectOption('demo');
  await expect(page).toHaveURL(/\/book\/qa-layout\/demo/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
