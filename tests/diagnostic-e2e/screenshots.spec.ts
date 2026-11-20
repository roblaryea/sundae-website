import { expect, test } from '@playwright/test';
import { en } from '../../src/lib/diagnostic/copy/en';
import { ar } from '../../src/lib/diagnostic/copy/ar';
import { de } from '../../src/lib/diagnostic/copy/de';

// Visual record of the report (brief: three profiles, dark and light, 390 and
// 1440, EN / AR / DE). Opt-in: DIAGNOSTIC_SCREENSHOTS=1. Seeds saved progress
// at the last question, so each shot is "resume" then "get my report".
test.skip(!process.env.DIAGNOSTIC_SCREENSHOTS, 'set DIAGNOSTIC_SCREENSHOTS=1 to record screenshots');

const OUT = process.env.DIAGNOSTIC_SCREENSHOT_DIR ?? 'test-results/diagnostic-screenshots';
const packs = { en, ar, de } as const;

const base = {
  name: 'Sara Haddad', countries: ['AE', 'SA'], measure_fix: 'next_pnl', pos: ['micros'],
  priority: 'Know which outlets lose money on delivery and overtime.', company: 'Harbor Group', role: 'finance',
};
const profiles = {
  'core-only': { ...base, concepts: ['casual'], locations: '8', team_size: '21_40', paper_processes: ['none'], money_leaks: ['food_cost', 'supplier_prices', 'competitors'] },
  'crew-heavy': { ...base, concepts: ['qsr', 'cafe_bakery'], locations: '12', team_size: '16_20', paper_processes: ['schedules', 'payroll_prep', 'tips', 'checklists', 'training'], payroll_countries: ['AE'], team_costs: ['overtime', 'turnover'], money_leaks: ['labor_vs_demand', 'planning'], other_systems: ['hr_payroll'] },
  '300-locations': { ...base, concepts: ['qsr', 'franchise', 'central_kitchen'], locations: '300', team_size: 'more_80', paper_processes: ['time_attendance'], team_costs: ['buddy_punching'], money_leaks: ['guest_retention', 'food_cost', 'competitors', 'planning'] },
} as const;

for (const [profile, responses] of Object.entries(profiles)) {
  for (const locale of ['en', 'ar', 'de'] as const) {
    for (const theme of ['dark', 'light'] as const) {
      for (const width of [390, 1440]) {
        test(`${profile} ${locale} ${theme} ${width}`, async ({ browser }) => {
          test.skip(test.info().project.name !== 'desktop', 'one run per shot');
          const context = await browser.newContext({ viewport: { width, height: width < 768 ? 844 : 900 }, deviceScaleFactor: 1 });
          await context.addCookies([{ name: 'sundae_theme', value: theme, domain: '127.0.0.1', path: '/' }]);
          const email = `shots-${profile}-${locale}-${theme}-${width}@harbor-e2e.test`;
          await context.addInitScript(([saved]) => {
            if (!sessionStorage.getItem('seeded')) {
              localStorage.setItem('sundae-diagnostic-progress', saved);
              sessionStorage.setItem('seeded', '1');
            }
          }, [JSON.stringify({ version: 2, responses: { ...responses, email }, questionId: 'role', savedAt: Date.now() })]);
          const page = await context.newPage();
          await page.goto(locale === 'en' ? '/diagnostic' : `/${locale}/diagnostic`);
          const copy = packs[locale];
          await page.getByRole('button', { name: copy.intro.resume, exact: true }).click();
          await page.getByRole('button', { name: copy.flow.generate, exact: true }).click();
          await expect(page.getByRole('heading', { name: copy.report.recoveryTitle })).toBeVisible();
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.evaluate(() => document.fonts.ready);
          await page.waitForTimeout(800);
          await page.screenshot({ path: `${OUT}/${profile}-${locale}-${theme}-${width}.png`, fullPage: true });
          await context.close();
        });
      }
    }
  }
}
