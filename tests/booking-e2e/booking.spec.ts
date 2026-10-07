import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('duration choice refreshes slots, clears review, forwards selection and remains fixed on reschedule', async ({ page, request }) => {
  await page.goto('/book?token=multiple');
  await page.getByLabel('Your time zone').selectOption('UTC');
  await expect(page.getByLabel('Call duration')).toHaveValue('60');
  await page.getByRole('button', { name: '10:00 AM', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Review your booking' })).toBeVisible();
  await page.getByLabel('Call duration').selectOption('30');
  await expect(page.getByRole('heading', { name: 'Review your booking' })).toHaveCount(0);
  await page.getByRole('button', { name: '10:00 AM', exact: true }).click();
  let captured = await (await request.get('http://127.0.0.1:4311/captured')).json();
  expect(captured.slotQuery.durationMinutes).toBe('30');
  await expect(page.getByText('30 minutes · juan@example.com')).toBeVisible();
  await page.getByRole('button', { name: 'Confirm booking', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'You’re booked' })).toBeVisible();
  captured = await (await request.get('http://127.0.0.1:4311/captured')).json();
  expect(captured.body.durationMinutes).toBe(30);
  await page.getByRole('button', { name: 'Reschedule', exact: true }).click();
  await expect(page.getByLabel('Call duration')).toHaveCount(0);
  await page.getByRole('button', { name: '10:00 AM', exact: true }).click();
  captured = await (await request.get('http://127.0.0.1:4311/captured')).json();
  expect(captured.slotQuery.durationMinutes).toBe('30');
  expect(captured.slotQuery.bookingId).toBe('fixture-booking');
  await expect(page.getByText('30 minutes · juan@example.com')).toBeVisible();
});

test('golden path: timezone, 24-hour time, question, confirmation and calendar links', async ({ page, request }) => {
  await page.goto('/book?token=optional&eventType=demo');
  await page.getByLabel('Your time zone').selectOption('Asia/Dubai');
  await page.getByRole('button', { name: '24h', exact: true }).click();
  await page.getByRole('button', { name: '14:00', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Review your booking' })).toBeVisible();
  await page.screenshot({ path: test.info().outputPath('review.png'), fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByLabel('What would you like to discuss?').fill('Visibility across our operations');
  await page.getByRole('button', { name: 'Confirm booking', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'You’re booked' })).toBeVisible();
  const captured = await (await request.get('http://127.0.0.1:4311/captured')).json();
  expect(captured.body.discussion).toBe('Visibility across our operations');
  expect(captured.body.eventTypeId).toBe('demo');
  await expect(page.getByRole('link', { name: 'Google Calendar', exact: true })).toHaveAttribute('href', /20261027T100000Z/);
  await expect(page.getByRole('link', { name: 'Outlook', exact: true })).toHaveAttribute('href', /startdt=/);
  await expect(page.getByRole('button', { name: 'Download ICS', exact: true })).toBeVisible();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download ICS', exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('sundae-call.ics');
  const downloadPath = await download.path();
  expect(downloadPath).not.toBeNull();
  expect(await readFile(downloadPath!, 'utf8')).toBe('BEGIN:VCALENDAR\r\nEND:VCALENDAR');
  await page.getByRole('button', { name: 'Reschedule', exact: true }).click();
  await page.getByRole('button', { name: '14:00', exact: true }).click();
  await expect(page.getByLabel('What would you like to discuss?')).toHaveCount(0);
  await page.getByRole('button', { name: 'Confirm new time', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'You’re booked' })).toBeVisible();
});

test('required question prevents an empty submission and lets visitors change time', async ({ page }) => {
  await page.goto('/book?token=required');
  await page.getByLabel('Your time zone').selectOption('UTC');
  await page.getByRole('button', { name: '10:00 AM', exact: true }).click();
  await page.getByRole('button', { name: 'Confirm booking', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Review your booking' })).toBeVisible();
  expect(await page.getByLabel('What would you like to discuss?').evaluate((el: HTMLTextAreaElement) => el.validity.valueMissing)).toBe(true);
  await page.getByRole('button', { name: 'Choose another time', exact: true }).click();
  await expect(page.getByRole('button', { name: '10:00 AM', exact: true })).toBeVisible();
});

test('unreachable calendar shows no bookable slot', async ({ page }) => {
  await page.goto('/book?token=unavailable');
  await expect(page.getByText(/Live availability is limited/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Confirm booking', exact: true })).toHaveCount(0);
});

test('selecting the existing timezone preserves available slots', async ({ page }) => {
  await page.goto('/book?token=optional');
  const picker = page.getByLabel('Your time zone');
  const zone = await picker.inputValue();
  await picker.selectOption(zone);
  await expect(page.getByRole('button', { name: /\d+:\d+\s*(AM|PM)/ }).first()).toBeVisible();
});

test('Arabic visitor controls are translated and the review flows right to left', async ({ page }) => {
  await page.goto('/book?token=arabic');
  await page.getByLabel('منطقتك الزمنية').selectOption('UTC');
  await page.getByRole('button', { name: '24h', exact: true }).click();
  await page.getByRole('button', { name: /١٠:٠٠|10:00/ }).click();
  await expect(page.getByRole('heading', { name: 'راجع حجزك' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'تأكيد الحجز' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'اختر وقتًا آخر' })).toBeVisible();
  await expect(page.locator('[dir="rtl"]').filter({ has: page.getByRole('heading', { name: 'راجع حجزك' }) })).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('marketing chrome returns after client navigation away from booking and hides on back', async ({ page }) => {
  await page.goto('/book?token=expired');
  await expect(page.locator('header[role="banner"]')).toHaveCount(0);
  await page.getByRole('link', { name: 'Contact the team', exact: true }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.locator('header[role="banner"]')).toHaveCount(1);
  await expect(page.locator('header[role="banner"] nav').first()).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/book\?token=expired$/);
  await expect(page.locator('header[role="banner"]')).toHaveCount(0);
});
