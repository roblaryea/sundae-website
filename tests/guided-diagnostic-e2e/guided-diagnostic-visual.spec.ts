import { expect, test, type Browser, type Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { en } from '../../src/lib/diagnostic/copy/en';
import { guidedBookingCopy } from '../../src/lib/leadConversation/copy';

// Accessibility (axe, WCAG 2.2 AA) and the screenshot matrix for the guided
// diagnostic: 320/390/768/1280/1440, dark and light, EN/AR/DE, for review
// against the guided booking design board. Screenshots land in
// test-results/guided-diagnostic-screens/ (or DIAGNOSTIC_SCREENS_DIR).

const AXE = path.join(process.cwd(), 'node_modules/axe-core/axe.min.js');
const ORIGIN = 'http://127.0.0.1:4340';
const PRODUCTION = process.env.DIAGNOSTIC_E2E_PRODUCTION === '1';
const WIDTHS = [320, 390, 768, 1280, 1440];
const THEMES = ['dark', 'light'] as const;
const LOCALES = PRODUCTION ? (['en', 'ar', 'de'] as const) : (['en'] as const);
const OUT = process.env.DIAGNOSTIC_SCREENS_DIR || 'test-results/guided-diagnostic-screens';
const chat = guidedBookingCopy.en;

type Seed = 'leaks' | 'role';
let ip = 100;
let emails = 0;

test.beforeEach(async ({ request }) => {
  test.skip(test.info().project.name !== 'desktop', 'Viewports are set explicitly; run once.');
  await request.get('http://127.0.0.1:4311/leads/reset');
});

/** Mid-conversation states seeded into sessionStorage, exactly as a refresh would resume them. */
function seededResponses(seed: Seed, email: string) {
  const responses: Record<string, unknown> = {
    name: 'Sara Haddad',
    concepts: ['casual', 'cafe_bakery'],
    locations: '12',
    countries: ['AE'],
    team_size: '21_40',
    paper_processes: ['checklists', 'schedules'],
    team_costs: ['overtime'],
  };
  if (seed === 'role') {
    Object.assign(responses, {
      money_leaks: ['food_cost', 'labor_vs_demand'],
      measure_fix: 'spreadsheet',
      pos: ['foodics'],
      priority: 'Get overtime under control across our locations.',
      email,
      company: 'Harbor Group',
    });
  }
  return responses;
}

async function prepare(page: Page, locale: string, theme: 'dark' | 'light', width: number, seed?: Seed) {
  ip += 1;
  emails += 1;
  await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setExtraHTTPHeaders({ 'x-forwarded-for': `10.70.${Math.floor(ip / 250)}.${ip % 250}`, 'x-vercel-ip-country': 'AE' });
  await page.context().addCookies([
    { name: 'sundae_locale', value: locale, url: ORIGIN },
    { name: 'sundae_theme', value: theme, url: ORIGIN },
  ]);
  const responses = seed ? seededResponses(seed, `shots-${emails}@harbor-group.test`) : null;
  await page.addInitScript((seeded) => {
    window.localStorage.setItem('sundae_cookie_consent', 'declined');
    if (!seeded) return;
    window.sessionStorage.setItem('sundae_diag_convo_v1', JSON.stringify({
      v: 1, bank: 2, startedAt: Date.now(), answerCount: 8, responses: seeded, skipped: ['other_systems'], inferred: { company: true, countries: true },
    }));
  }, responses);
}

async function open(browser: Browser, locale: string, theme: 'dark' | 'light', width: number, seed?: Seed) {
  const context = await browser.newContext({ baseURL: ORIGIN });
  const page = await context.newPage();
  await prepare(page, locale, theme, width, seed);
  return page;
}

/** Keep the site's fixed navigation and the mouse out of element screenshots. */
async function unstickNav(page: Page) {
  await page.addStyleTag({ content: 'nav.fixed.top-0 { position: absolute !important; }' });
  await page.mouse.move(0, 0);
}

async function axe(page: Page, selector: string) {
  await page.addScriptTag({ content: await readFile(AXE, 'utf8') });
  return page.evaluate(async (include) => {
    const result = await (window as unknown as { axe: { run: (context: unknown, options: unknown) => Promise<{ violations: { id: string; impact: string; nodes: { target: string[] }[] }[] }> } })
      .axe.run({ include: [[include]] }, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } });
    return result.violations.map((violation) => ({ id: violation.id, impact: violation.impact, targets: violation.nodes.map((node) => node.target.join(' ')) }));
  }, selector);
}

const panel = (page: Page) => page.locator('[data-guided-diagnostic]');
const nextStep = (page: Page) => page.locator('section[aria-labelledby="dgx-next"]');
const pathFor = (locale: string) => (locale === 'en' ? '/diagnostic?guided=1' : `/${locale}/diagnostic?guided=1`);

for (const theme of THEMES) {
  for (const width of [1440, 390]) {
    test(`axe: no violations in ${theme} at ${width} (opening, error, choices, countries, final card)`, async ({ page }) => {
      await prepare(page, 'en', theme, width);
      await page.goto('/diagnostic?guided=1');
      const name = panel(page).getByRole('textbox', { name: en.flow.nameLabel, exact: true });
      await expect(name).toBeVisible();
      expect(await axe(page, '[data-guided-diagnostic]'), 'opening').toEqual([]);
      await name.fill('S');
      await name.press('Enter');
      await expect(panel(page).getByRole('alert')).toBeVisible();
      expect(await axe(page, '[data-guided-diagnostic]'), 'error').toEqual([]);
      await name.fill('Sara Haddad');
      await name.press('Enter');
      await panel(page).getByRole('button', { name: en.questions.concepts.options.casual, exact: true }).click();
      expect(await axe(page, '[data-guided-diagnostic]'), 'choices').toEqual([]);
      await panel(page).getByRole('button', { name: chat.focus.doneCount.replace('{count}', '1') }).click();
      const count = panel(page).getByRole('textbox', { name: en.flow.numberLabel, exact: true });
      await count.fill('12');
      await count.press('Enter');
      await panel(page).getByRole('searchbox', { name: en.flow.search }).fill('sa');
      await expect(panel(page).getByRole('button', { name: 'Saudi Arabia' })).toBeVisible();
      expect(await axe(page, '[data-guided-diagnostic]'), 'countries').toEqual([]);

      const report = await open(page.context().browser()!, 'en', theme, width, 'role');
      await report.goto('/diagnostic?guided=1');
      await panel(report).getByRole('button', { name: en.questions.role.options.operations, exact: true }).click();
      await expect(report.getByRole('button', { name: chat.booking.choose })).toBeVisible({ timeout: 45_000 });
      await expect(nextStep(report)).toHaveCSS('opacity', '1');
      expect(await axe(report, 'section[aria-labelledby="dgx-next"]'), 'final card').toEqual([]);
      await report.context().close();
    });
  }
}

for (const locale of LOCALES) {
  for (const theme of THEMES) {
    test(`screens: ${locale} ${theme} at every width`, async ({ browser }) => {
      for (const width of WIDTHS) {
        const opening = await open(browser, locale, theme, width);
        await opening.goto(pathFor(locale));
        await unstickNav(opening);
        await expect(panel(opening).getByRole('textbox').first()).toBeVisible();
        // 320 px and 200% zoom equivalents must not scroll sideways.
        expect(await opening.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${locale} ${theme} ${width} horizontal scroll`).toBe(true);
        await opening.screenshot({ path: `${OUT}/${locale}-${theme}-${width}-landing.png` });
        await panel(opening).screenshot({ path: `${OUT}/${locale}-${theme}-${width}-opening.png` });
        await opening.context().close();

        const mid = await open(browser, locale, theme, width, 'leaks');
        await mid.goto(pathFor(locale));
        await unstickNav(mid);
        await expect(panel(mid).getByRole('button', { pressed: false }).first()).toBeVisible();
        expect(await mid.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${locale} ${theme} ${width} horizontal scroll (chips)`).toBe(true);
        await panel(mid).screenshot({ path: `${OUT}/${locale}-${theme}-${width}-chips.png` });
        await mid.context().close();
      }
    });
  }
}

test('screens: the report final card (Choose a time, booking dialog, email ending)', async ({ browser }) => {
  for (const [theme, width] of [['dark', 390], ['light', 390], ['dark', 1440], ['light', 1440]] as const) {
    const page = await open(browser, 'en', theme, width, 'role');
    await page.goto('/diagnostic?guided=1');
    await panel(page).getByRole('button', { name: en.questions.role.options.operations, exact: true }).click();
    await expect(page.getByRole('button', { name: chat.booking.choose })).toBeVisible({ timeout: 45_000 });
    await unstickNav(page);
    await expect(nextStep(page)).toHaveCSS('opacity', '1');
    await nextStep(page).screenshot({ path: `${OUT}/en-${theme}-${width}-report-offer.png` });
    await page.getByRole('button', { name: chat.booking.choose }).click();
    await page.getByRole('dialog').getByLabel('Your time zone').waitFor();
    await page.getByRole('dialog').getByRole('button', { name: /\d{1,2}:\d{2}/ }).first().waitFor();
    await page.screenshot({ path: `${OUT}/en-${theme}-${width}-booking-dialog.png` });
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: chat.booking.later }).click();
    await expect(page.getByRole('button', { name: en.report.bookCall })).toBeVisible();
    await expect(nextStep(page)).toHaveCSS('opacity', '1');
    await nextStep(page).screenshot({ path: `${OUT}/en-${theme}-${width}-report-email.png` });
    await page.context().close();
  }
});
