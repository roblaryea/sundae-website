import { test, expect } from '@playwright/test';

test('new guest verifies email, chooses duration and timezone, reloads private page and manages while public page is paused', async ({ page, request }) => {
  await page.goto('/book/qa-host/intro');
  await expect(page.locator('[data-cookie-banner]')).toHaveCount(0);
  const headers = await request.get('/book/qa-host/intro');
  expect(headers.headers()['referrer-policy']).toBe('no-referrer');
  // Next dev forces no-cache; next start must enforce the production no-store policy.
  expect(headers.headers()['cache-control']).toContain(process.env.BOOKING_E2E_PRODUCTION === '1' ? 'no-store' : 'no-cache');
  const apiHeaders = await request.get('/api/personal-book/qa-host/context');
  expect(apiHeaders.headers()['cache-control']).toContain('no-store');
  await expect(page.getByText('QA Host', { exact: true }).first()).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Event types' })).toBeVisible();
  await page.getByLabel('Your time zone').selectOption('UTC');
  await page.getByLabel('Call duration').selectOption('90');
  await page.getByRole('button', { name: '10:00 AM', exact: true }).click();
  await page.getByLabel('Your name', { exact: true }).fill('QA Guest');
  await page.getByLabel('Email address', { exact: true }).fill('robbyl84@gmail.com');
  await page.getByRole('button', { name: 'Send verification code', exact: true }).click();
  await expect(page.getByLabel('Verification code', { exact: true })).toBeVisible();
  await expect(page.getByText(/Your slot is not reserved/)).toBeVisible();
  await page.getByLabel('Verification code', { exact: true }).fill('000000');
  await page.getByRole('button', { name: 'Confirm booking', exact: true }).click();
  await expect(page.getByText(/code is incorrect or expired/)).toBeVisible();
  await page.getByLabel('Verification code', { exact: true }).fill('123456');
  await page.getByRole('button', { name: 'Confirm booking', exact: true }).click();
  await expect(page).toHaveURL(/\/book\/manage\?id=.*&token=fixture-private/);
  await expect(page.getByRole('heading', { name: 'You’re booked' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Sundae', exact: true })).toBeVisible();
  await expect(page.getByText(/could not send the management email/)).toBeVisible();
  let captured = await (await request.get('http://127.0.0.1:4311/captured')).json();
  expect(captured.body.durationMinutes).toBe(90);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'You’re booked' })).toBeVisible();
  await page.getByRole('button', { name: 'Reschedule', exact: true }).click();
  await page.getByLabel('Your time zone').selectOption('Asia/Dubai');
  await page.getByRole('button', { name: '2:00 PM', exact: true }).click();
  captured = await (await request.get('http://127.0.0.1:4311/captured')).json();
  expect(captured.path).toContain('/manage/');
  expect(captured.slotQuery.token).toBe('fixture-private');
  await page.getByRole('button', { name: 'Confirm new time', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'You’re booked' })).toBeVisible();
  await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  await page.getByRole('button', { name: 'Yes, cancel', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Your call is canceled' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Sundae', exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Your call is canceled' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: test.info().outputPath('personal-canceled.png'), fullPage: true });
  await page.getByRole('button', { name: 'Book another time', exact: true }).click();
  await expect(page).toHaveURL(/\/book\/qa-host/);
  await expect(page.getByRole('heading', { name: 'Your call is canceled' })).toHaveCount(0);
  await expect(page.getByLabel('Call duration')).toBeVisible();
});

test('paused and invalid private pages reveal no guest data; origin and body-size protections reject mutations', async ({ page, request }) => {
  for (const path of ['/book/paused', '/book/manage?id=11111111-1111-4111-8111-111111111111&token=wrong']) {
    await page.goto(path);
    await expect(page.getByRole('heading', { name: 'This booking page is unavailable' })).toBeVisible();
    await expect(page.getByText('robbyl84@gmail.com')).toHaveCount(0);
  }
  const origin = 'http://127.0.0.1:4310';
  expect((await request.post('/api/personal-book/qa-host/verification', { headers: { origin: 'https://attacker.example' }, data: {} })).status()).toBe(403);
  expect((await request.post('/api/personal-book/qa-host/verification', { headers: { origin }, data: { name: 'x'.repeat(17000) } })).status()).toBe(413);
  expect((await request.post('/api/personal-book/qa-host/delete', { headers: { origin }, data: {} })).status()).toBe(404);
});

test('Arabic personal visitor verifies email with translated controls and RTL layout', async ({ page }) => {
  await page.goto('/book/qa-host/intro?locale=ar');
  await expect(page.locator('[data-cookie-banner]')).toHaveCount(0);
  await page.getByLabel('منطقتك الزمنية').selectOption('UTC');
  await page.getByLabel('مدة المكالمة').selectOption('30');
  await page.getByRole('button', { name: '24h', exact: true }).click();
  await page.getByRole('button', { name: /١٠:٠٠|10:00/ }).click();
  await page.getByLabel('اسمك', { exact: true }).fill('QA Guest');
  await page.getByLabel('عنوان البريد الإلكتروني', { exact: true }).fill('robbyl84@gmail.com');
  await page.getByRole('button', { name: 'إرسال رمز التحقق', exact: true }).click();
  await expect(page.getByLabel('رمز التحقق', { exact: true })).toBeVisible();
  await expect(page.locator('[data-booking-shell]')).toHaveAttribute('dir', 'rtl');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: test.info().outputPath('personal-arabic.png'), fullPage: true });
});

test('accepted marketing consent does not load Google Analytics on a private booking page', async ({ page }) => {
  let tagRequests = 0;
  await page.route('https://www.googletagmanager.com/**', async (route) => {
    tagRequests++;
    await route.abort();
  });
  await page.addInitScript(() => localStorage.setItem('sundae_cookie_consent', 'accepted'));
  await page.goto('/book/manage?id=11111111-1111-4111-8111-111111111111&token=wrong');
  await expect(page.getByRole('heading', { name: 'This booking page is unavailable' })).toBeVisible();
  await expect(page.locator('[data-cookie-banner]')).toHaveCount(0);
  expect(await page.evaluate(() => document.querySelectorAll('script[src*="googletagmanager.com"]').length)).toBe(0);
  expect(tagRequests).toBe(0);
  if (process.env.NEXT_PUBLIC_GA4_ID) {
    expect(await page.evaluate((id) => (window as unknown as Record<string, unknown>)[`ga-disable-${id}`], process.env.NEXT_PUBLIC_GA4_ID)).toBe(true);
  }
});

/** Pick the 10:00 slot and fill the visitor form up to (not including) "Send verification code". */
async function reachVerification(page: import('@playwright/test').Page, email: string) {
  await page.goto('/book/qa-host/intro');
  await page.getByLabel('Your time zone').selectOption('UTC');
  await page.getByRole('button', { name: '10:00 AM', exact: true }).click();
  await page.getByLabel('Your name', { exact: true }).fill('QA Guest');
  await page.getByLabel('Email address', { exact: true }).fill(email);
  await page.getByRole('button', { name: 'Send verification code', exact: true }).click();
}

test('code step names the sender, hints at Junk/Spam, resends with a visible cooldown and offers an email fallback', async ({ page, request }) => {
  await reachVerification(page, 'resend@example.com');
  await expect(page.getByLabel('Verification code', { exact: true })).toBeVisible();
  await expect(page.getByText('host@example.com', { exact: false }).first()).toBeVisible();
  await expect(page.getByText(/Junk or Spam folder/)).toBeVisible();
  const fallback = page.getByRole('link', { name: /Didn't get a code\? Email QA Host/ });
  const href = (await fallback.getAttribute('href'))!;
  expect(href.startsWith('mailto:host@example.com?')).toBe(true);
  const params = new URLSearchParams(href.slice(href.indexOf('?') + 1));
  expect(params.get('subject')).toBe('Please book a call for me');
  for (const part of ['QA Guest', 'resend@example.com', '10:00', 'UTC', '60 min']) expect(params.get('body')).toContain(part);

  // Visible cooldown, then the resend path; the form values are kept.
  const resend = page.getByRole('button', { name: /Resend available in \d+ s/ });
  await expect(resend).toBeDisabled();
  const ready = page.getByRole('button', { name: 'Resend code', exact: true });
  await expect(ready).toBeEnabled({ timeout: 8000 });
  const resendsBefore = (await (await request.get('http://127.0.0.1:4311/resends')).json()).resends;
  await page.getByLabel('Verification code', { exact: true }).fill('999999');
  await ready.click();
  await expect(page.getByText(/We sent a new code to/)).toBeVisible();
  expect((await (await request.get('http://127.0.0.1:4311/resends')).json()).resends).toBe(resendsBefore + 1);
  await expect(page.getByLabel('Verification code', { exact: true })).toHaveValue('');
  await expect(page.getByLabel('Your name', { exact: true })).toHaveValue('QA Guest');
  await expect(page.getByLabel('Email address', { exact: true })).toHaveValue('resend@example.com');
  await expect(page.getByRole('button', { name: /Resend available in/ })).toBeDisabled();
  // The old reset path still works.
  await page.getByRole('button', { name: 'Change email or request a new code', exact: true }).click();
  await expect(page.getByLabel('Email address', { exact: true })).toBeEnabled();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('429 shows the real wait, 503 explains the email outage with a mailto fallback, an expired challenge returns to the form', async ({ page }) => {
  await reachVerification(page, 'rate@example.com');
  await expect(page.getByText('Too many requests. Please try again in 30 min.')).toBeVisible();
  await expect(page.getByLabel('Verification code', { exact: true })).toHaveCount(0);

  await page.getByLabel('Email address', { exact: true }).fill('down@example.com');
  await page.getByRole('button', { name: 'Send verification code', exact: true }).click();
  await expect(page.getByText(/We cannot send verification emails right now/)).toBeVisible();
  await expect(page.getByRole('link', { name: /Didn't get a code\? Email QA Host/ })).toHaveAttribute('href', /^mailto:host@example\.com\?/);

  await page.getByLabel('Email address', { exact: true }).fill('gone@example.com');
  await page.getByRole('button', { name: 'Send verification code', exact: true }).click();
  await expect(page.getByLabel('Verification code', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Resend code', exact: true })).toBeEnabled({ timeout: 8000 });
  await page.getByRole('button', { name: 'Resend code', exact: true }).click();
  await expect(page.getByText('This code request has expired. Please request a new code.')).toBeVisible();
  await expect(page.getByLabel('Verification code', { exact: true })).toHaveCount(0);
  await expect(page.getByLabel('Email address', { exact: true })).toHaveValue('gone@example.com');
});
