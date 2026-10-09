import { test, expect } from '@playwright/test';
import { bookingLocales, bookingLocaleProfiles, bookingIntlLocale, resolveBookingLocale } from '../../src/lib/booking/locales';
import { getBookingUiCopy } from '../../src/lib/booking/ui-copy';
import { bookingFlowCopy } from '../../src/lib/booking/flow-copy';
import { bookingControlsCopy } from '../../src/lib/booking/controls-copy';
import { personalBookingCopy } from '../../src/lib/booking/personal-copy';

test('booking has 25 complete catalogues, native language names and locale aliases', () => {
  expect(bookingLocales).toHaveLength(25);
  for (const catalogue of [bookingFlowCopy, bookingControlsCopy, personalBookingCopy]) {
    expect(Object.keys(catalogue).sort()).toEqual([...bookingLocales].sort());
    for (const locale of bookingLocales) {
      expect(Object.keys(catalogue[locale]).sort()).toEqual(Object.keys(catalogue.en).sort());
      for (const value of Object.values(catalogue[locale])) expect(value.trim()).not.toBe('');
    }
  }
  for (const locale of bookingLocales.filter((item) => item !== 'en')) {
    for (const key of Object.keys(bookingFlowCopy.en) as Array<keyof typeof bookingFlowCopy.en>) {
      expect(bookingFlowCopy[locale][key], `${locale}.${key} must not inherit English`).not.toBe(bookingFlowCopy.en[key]);
    }
    expect(personalBookingCopy[locale].codeSent).toContain('{email}');
    expect(getBookingUiCopy(locale).meetingDetails).not.toBe(getBookingUiCopy('en').meetingDetails);
  }
  expect(resolveBookingLocale('az_AZ')).toBe('az');
  expect(resolveBookingLocale('ru-RU')).toBe('ru');
  expect(resolveBookingLocale('pap-AW')).toBe('pap');
  expect(resolveBookingLocale(undefined, 'xx;q=1,ru-RU;q=0.9,fr;q=0.8')).toBe('ru');
  expect(resolveBookingLocale(undefined, 'ru;q=0,az;q=0.5')).toBe('az');
});

for (const locale of bookingLocales) {
  test(`${locale}: translated slot picker, verification, confirmation and management`, async ({ page }) => {
    const copy = getBookingUiCopy(locale);
    await page.goto(`/book/qa-host/intro?locale=${locale}`);
    const picker = page.getByRole('combobox', { name: copy.language, exact: true });
    await expect(picker).toHaveValue(locale);
    await expect(picker.locator('option')).toHaveCount(25);
    await expect(page.locator('[data-booking-shell]')).toHaveAttribute('lang', locale);
    await expect(page.locator('[data-booking-shell]')).toHaveAttribute('dir', bookingLocaleProfiles[locale].dir);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.getByRole('link', { name: copy.skipToContent, exact: true })).toHaveAttribute('href', '#booking-main-content');
    await expect(page.getByRole('heading', { name: copy.title, exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: copy.prevMonth, exact: true })).toBeVisible();
    if (locale === 'az') {
      await expect(page.getByText('oktyabr 2026', { exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: /çərşənbə axşamı/ }).first()).toBeVisible();
    }
    if (locale === 'pap') await expect(page.getByRole('button', { name: /diamars/ }).first()).toBeVisible();
    await page.getByLabel(copy.timezonePickerLabel, { exact: true }).selectOption('UTC');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByLabel(copy.durationLabel, { exact: true }).selectOption('30');
    await page.getByRole('button', { name: '24h', exact: true }).click();
    const time = new Intl.DateTimeFormat(bookingIntlLocale(locale), { hour: 'numeric', minute: '2-digit', timeZone: 'UTC', hour12: false }).format(new Date('2026-10-27T10:00:00Z'));
    await page.getByRole('button', { name: time, exact: true }).click();
    await expect(page.getByRole('heading', { name: copy.reviewTitle, exact: true })).toBeFocused();
    await page.getByLabel(copy.yourName, { exact: true }).fill('QA Guest');
    await page.getByLabel(copy.emailAddress, { exact: true }).fill('robbyl84@gmail.com');
    await page.getByRole('button', { name: copy.sendCode, exact: true }).click();
    await page.getByLabel(copy.codeLabel, { exact: true }).fill('000000');
    await page.getByRole('button', { name: copy.confirmCta, exact: true }).click();
    await expect(page.getByText(copy.invalidCode, { exact: true })).toBeVisible();
    await picker.selectOption('en');
    await expect(page.getByText(getBookingUiCopy('en').invalidCode, { exact: true })).toBeVisible();
    await page.getByLabel('Language', { exact: true }).selectOption(locale);
    await expect(page.getByText(copy.invalidCode, { exact: true })).toBeVisible();
    await page.getByLabel(copy.codeLabel, { exact: true }).fill('123456');
    await page.getByRole('button', { name: copy.confirmCta, exact: true }).click();
    await expect(page.getByRole('heading', { name: copy.confirmedTitle, exact: true })).toBeVisible();
    await expect(page).toHaveURL(new RegExp(`locale=${locale}`));
    await page.reload();
    await expect(page.getByRole('heading', { name: copy.confirmedTitle, exact: true })).toBeVisible();
    await page.getByRole('button', { name: copy.reschedule, exact: true }).click();
    await expect(page.getByRole('heading', { name: copy.rescheduleTitle, exact: true })).toBeVisible();
    await page.getByRole('button', { name: copy.back, exact: true }).click();
    await page.getByRole('button', { name: copy.cancel, exact: true }).click();
    await expect(page.getByRole('heading', { name: copy.confirmCancelTitle, exact: true })).toBeVisible();
    await page.getByRole('button', { name: copy.confirmCancelYes, exact: true }).click();
    await expect(page.getByRole('heading', { name: copy.canceledTitle, exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.goto(`/book/paused?locale=${locale}`);
    await expect(page.getByRole('heading', { name: copy.pageUnavailable, exact: true })).toBeVisible();
  });
}

test('language switching retains entered details, slot, private URL and preference on reload', async ({ page }) => {
  await page.goto('/book/qa-host/intro?locale=en');
  await page.getByLabel('Your time zone').selectOption('UTC');
  await page.getByRole('button', { name: '10:00 AM', exact: true }).click();
  await page.getByLabel('Your name', { exact: true }).fill('QA Guest');
  await page.getByLabel('Email address', { exact: true }).fill('robbyl84@gmail.com');
  await page.getByLabel('Language', { exact: true }).selectOption('ru');
  await expect(page.getByLabel('Ваше имя', { exact: true })).toHaveValue('QA Guest');
  await expect(page.getByLabel('Электронная почта', { exact: true })).toHaveValue('robbyl84@gmail.com');
  await expect(page.getByRole('heading', { name: 'Проверьте данные записи', exact: true })).toBeVisible();
  await page.getByLabel('Язык', { exact: true }).selectOption('pap');
  await expect(page.getByLabel('Bo nomber', { exact: true })).toHaveValue('QA Guest');
  await expect(page.getByLabel('Adres di e-mail', { exact: true })).toHaveValue('robbyl84@gmail.com');
  await expect(page).toHaveURL(/locale=pap/);
  await page.reload();
  await expect(page.getByLabel('Idioma', { exact: true })).toHaveValue('pap');
  await page.goto('/book/qa-host/intro');
  await expect(page.getByLabel('Idioma', { exact: true })).toHaveValue('pap');
});

test.describe('native browser language', () => {
test.use({ locale: 'az-AZ' });
test('browser language detection and lead URL picker preserve booking credentials', async ({ page }) => {
  await page.context().clearCookies();
  const response = await page.goto('/book/qa-host/intro');
  expect(response?.request().headers()['accept-language']).toContain('az-AZ');
  expect(await response?.headerValue('set-cookie')).toContain('sundae_locale=az');
  await expect(page.getByLabel('Dil', { exact: true })).toHaveValue('az');
  await page.goto('/book?token=optional&locale=en');
  await page.getByLabel('Language', { exact: true }).selectOption('ru');
  await expect(page).toHaveURL(/token=optional&locale=ru/);
  await page.reload();
  await expect(page.getByLabel('Язык', { exact: true })).toHaveValue('ru');
});
});
