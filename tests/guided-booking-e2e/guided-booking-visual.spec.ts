import { test, expect, type Browser, type Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { guidedBookingCopy } from '../../src/lib/leadConversation/copy';

// Accessibility (axe) and the screenshot matrix for guided booking:
// 320/390/768/1280/1440, dark and light, EN/AR/DE (spec 8.8-8.9, 9).
// Screenshots land in test-results/guided-screens/ for review against
// docs/guided-booking/design/guided-booking-design-reference.html.

const AXE = path.join(process.cwd(), 'node_modules/axe-core/axe.min.js');
const WIDTHS = [320, 390, 768, 1280, 1440];
const THEMES = ['dark', 'light'] as const;
const LOCALES = ['en', 'ar', 'de'] as const;
// Playwright clears test-results/ on every run; point this elsewhere to keep a set.
const OUT = process.env.GUIDED_SCREENS_DIR || 'test-results/guided-screens';

test.beforeEach(async ({ request }) => {
  test.skip(test.info().project.name !== 'desktop', 'Viewports are set explicitly; run once.');
  // A repeated email is a duplicate lead, which correctly gets no booking token.
  await request.get('http://127.0.0.1:4311/leads/reset');
});

let ip = 200;

/** A fresh browser context per state, so seeded storage never leaks between shots. */
async function open(browser: Browser, locale: string, theme: 'dark' | 'light', width: number, seed?: 'brief' | 'focus') {
  const context = await browser.newContext({ baseURL: 'http://127.0.0.1:4330' });
  const page = await context.newPage();
  await prepare(page, locale, theme, width, seed);
  return page;
}

/** Keep the site's fixed navigation and the mouse out of element screenshots. */
async function unstickNav(page: Page) {
  await page.addStyleTag({ content: 'nav.fixed.top-0 { position: absolute !important; }' });
  await page.mouse.move(0, 0);
}

async function prepare(page: Page, locale: string, theme: 'dark' | 'light', width: number, seed?: 'brief' | 'focus') {
  ip += 1;
  await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setExtraHTTPHeaders({ 'x-forwarded-for': `10.40.0.${ip % 250}`, 'x-vercel-ip-country': 'AE' });
  await page.context().addCookies([
    { name: 'sundae_locale', value: locale, url: 'http://127.0.0.1:4330' },
    { name: 'sundae_theme', value: theme, url: 'http://127.0.0.1:4330' },
  ]);
  await page.addInitScript((seedState) => {
    window.localStorage.setItem('sundae_cookie_consent', 'declined');
    if (!seedState) return;
    const answers: Record<string, unknown> = {
      name: 'Sara Haddad',
      email: 'sara@harborgroup.com',
      emailIsFreeMail: false,
      company: { value: 'Harborgroup', inferred: true },
      role: { key: 'operations', label: 'Operations' },
      locations: { bucket: '11-25', inferred: false },
    };
    if (seedState === 'brief') {
      answers.focus = ['margin_performance', 'tasks_logbook', 'scheduling_attendance'];
      answers.pos = { choice: 'listed', value: 'Oracle MICROS Simphony' };
      answers.country = { iso: 'AE', inferred: true };
    }
    window.sessionStorage.setItem('sundae_convo_demo_v1', JSON.stringify({ v: 1, sig: 'demo|default|||', startedAt: Date.now(), answerCount: 6, answers }));
  }, seed ?? null);
}

async function axe(page: Page) {
  await page.addScriptTag({ content: await readFile(AXE, 'utf8') });
  return page.evaluate(async () => {
    const result = await (window as unknown as { axe: { run: (context: unknown, options: unknown) => Promise<{ violations: { id: string; impact: string; nodes: { target: string[] }[] }[] }> } })
      .axe.run({ include: [['[data-guided-booking]']] }, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } });
    return result.violations.map((violation) => ({ id: violation.id, impact: violation.impact, targets: violation.nodes.map((node) => node.target.join(' ')) }));
  });
}

const panel = (page: Page) => page.locator('[data-guided-booking]');

for (const theme of THEMES) {
  for (const width of [1440, 390]) {
    test(`axe: no violations in ${theme} at ${width} (opening, choices, error, brief, ending)`, async ({ page }) => {
      await prepare(page, 'en', theme, width);
      await page.goto('/demo?guided=1');
      await expect(panel(page).getByLabel('Your name', { exact: true })).toBeVisible();
      expect(await axe(page), 'opening').toEqual([]);
      const name = panel(page).getByLabel('Your name', { exact: true });
      await name.fill('S');
      await name.press('Enter');
      await expect(panel(page).getByRole('alert')).toBeVisible();
      expect(await axe(page), 'error').toEqual([]);
      await name.fill('Sara Haddad');
      await name.press('Enter');
      const email = panel(page).getByLabel('Work email', { exact: true });
      await email.fill('sara@harborgroup.com');
      await email.press('Enter');
      await panel(page).getByRole('button', { name: 'Yes', exact: true }).click();
      await expect(panel(page).getByRole('button', { name: 'Operations' })).toBeVisible();
      expect(await axe(page), 'choices').toEqual([]);
      await panel(page).getByRole('button', { name: 'Operations' }).click();
      await panel(page).getByRole('button', { name: '11-25' }).click();
      await panel(page).getByRole('button', { name: 'Tasks and logbook' }).click();
      expect(await axe(page), 'multi-select').toEqual([]);
      await panel(page).getByRole('button', { name: 'Done · 1 selected' }).click();
      await panel(page).getByRole('button', { name: 'Foodics' }).click();
      await panel(page).getByRole('button', { name: 'Yes', exact: true }).click();
      await expect(panel(page).getByRole('heading', { name: 'Your walkthrough' })).toBeVisible();
      expect(await axe(page), 'brief').toEqual([]);
      await panel(page).getByRole('button', { name: 'Looks right' }).click();
      await panel(page).getByRole('button', { name: 'No thanks' }).click();
      await expect(panel(page).getByRole('button', { name: 'Choose a time' })).toBeVisible();
      expect(await axe(page), 'ending').toEqual([]);
    });
  }
}

for (const locale of LOCALES) {
  for (const theme of THEMES) {
    test(`screens: ${locale} ${theme} at every width`, async ({ browser }) => {
      for (const width of WIDTHS) {
        const page = await open(browser, locale, theme, width, 'brief');
        await page.goto('/demo?guided=1');
        await unstickNav(page);
        await expect(panel(page).locator('ol li').first()).toBeVisible();
        // 320 px and 200% zoom equivalents must not scroll sideways.
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${locale} ${theme} ${width} horizontal scroll`).toBe(true);
        await page.locator('#demo-form').screenshot({ path: `${OUT}/${locale}-${theme}-${width}-brief.png` });
        await page.context().close();

        const opening = await open(browser, locale, theme, width);
        await opening.goto('/demo?guided=1');
        await unstickNav(opening);
        await expect(panel(opening).locator('input').first()).toBeVisible();
        await opening.locator('#demo-form').screenshot({ path: `${OUT}/${locale}-${theme}-${width}-opening.png` });
        await opening.context().close();
      }
    });
  }
}

test('screens: key states (chips, personal email error, ending, booking hand-off, contact)', async ({ browser, request }) => {
  for (const [theme, width] of [['dark', 390], ['light', 390], ['dark', 1440], ['light', 1440]] as const) {
    const page = await open(browser, 'en', theme, width, 'focus');
    await page.goto('/demo?guided=1');
    await unstickNav(page);
    await panel(page).getByRole('button', { name: 'Tasks and logbook' }).click();
    await panel(page).getByRole('button', { name: 'Margin and performance' }).click();
    await page.mouse.move(0, 0);
    await page.locator('#demo-form').screenshot({ path: `${OUT}/en-${theme}-${width}-chips.png` });
    await page.context().close();
  }
  for (const theme of THEMES) {
    const page = await open(browser, 'en', theme, 390);
    await page.goto('/demo?guided=1');
    await unstickNav(page);
    const name = panel(page).getByLabel('Your name', { exact: true });
    await name.fill('Omar');
    await name.press('Enter');
    const email = panel(page).getByLabel('Work email', { exact: true });
    await email.fill('omar.k@gmail.com');
    await email.press('Enter');
    await panel(page).getByRole('button', { name: 'Add a work email' }).click();
    await panel(page).getByLabel('Work email', { exact: true }).fill('omar@harbor');
    await panel(page).getByLabel('Work email', { exact: true }).press('Enter');
    await expect(panel(page).getByRole('alert')).toBeVisible();
    await page.locator('#demo-form').screenshot({ path: `${OUT}/en-${theme}-390-email-error.png` });
    await page.context().close();
  }
  for (const [locale, theme, width] of [['en', 'dark', 390], ['ar', 'dark', 390], ['en', 'light', 1440]] as const) {
    // Each pass is a new lead; a repeated email would (correctly) get no booking token.
    await request.get('http://127.0.0.1:4311/leads/reset');
    const page = await open(browser, locale, theme, width, 'brief');
    await page.goto('/demo?guided=1');
    await unstickNav(page);
    const copy = guidedBookingCopy[locale];
    await panel(page).locator('ol li').first().waitFor();
    await panel(page).getByRole('button', { name: copy.brief.confirm }).click();
    await panel(page).getByRole('button', { name: copy.phone.skip }).click();
    await expect(panel(page).getByRole('button', { name: copy.booking.choose })).toBeVisible();
    await page.locator('#demo-form').screenshot({ path: `${OUT}/${locale}-${theme}-${width}-handoff.png` });
    if (locale === 'en' && width === 1440) {
      // Open the booking screen, then close it without booking (the offer stays).
      await panel(page).getByRole('button', { name: copy.booking.choose }).click();
      await page.getByRole('dialog').getByLabel('Your time zone').waitFor();
      await page.screenshot({ path: `${OUT}/en-${theme}-${width}-booking-view.png` });
      await page.getByRole('dialog').getByRole('button', { name: 'Back to the conversation' }).click();
    }
    await panel(page).getByRole('button', { name: copy.booking.later }).click();
    await expect(panel(page).getByText(copy.done.explore)).toBeVisible();
    await page.locator('#demo-form').screenshot({ path: `${OUT}/${locale}-${theme}-${width}-done.png` });
    await page.context().close();
  }
  for (const theme of THEMES) {
    const page = await open(browser, 'en', theme, 1440);
    await page.goto('/contact?guided=1');
    await unstickNav(page);
    await expect(panel(page).getByLabel('Your name', { exact: true })).toBeVisible();
    await page.locator('section', { has: panel(page) }).last().screenshot({ path: `${OUT}/en-${theme}-1440-contact.png` });
    await page.context().close();
  }
});
