import { expect, test, type Page } from '@playwright/test';
import { en } from '../../src/lib/diagnostic/copy/en';
import { ar } from '../../src/lib/diagnostic/copy/ar';

// Step-by-step diagnostic paths against the local backend fixture. Every
// email is a ".test" address and every lead lands in the fixture only.
const FIXTURE = 'http://127.0.0.1:4321';

type Path = {
  locations: string;
  paper: string[];
  payroll?: boolean;
  teamCosts?: string[];
  leaks: string[];
  email: string;
};

const button = (page: Page, name: string) => page.getByRole('button', { name, exact: true });
/** Moves to the next question and waits until it is on screen. */
async function next(page: Page) {
  const prompt = page.locator('h2[id^="dgx-prompt-"]');
  const before = await prompt.getAttribute('id');
  await expect(async () => {
    if ((await prompt.getAttribute('id')) === before) await button(page, en.flow.next).click({ timeout: 2_000 });
    await expect(prompt).not.toHaveAttribute('id', before ?? '', { timeout: 2_000 });
  }).toPass({ timeout: 15_000 });
}

/** Picks an option chip in the current question and waits until it registers. */
async function choose(page: Page, name: string) {
  const chip = page.getByRole('group').getByRole('button', { name, exact: true });
  await expect(async () => {
    if ((await chip.getAttribute('aria-pressed')) !== 'true') await chip.click({ timeout: 2_000 });
    await expect(chip).toHaveAttribute('aria-pressed', 'true', { timeout: 1_000 });
  }).toPass({ timeout: 15_000 });
}

async function answerToReport(page: Page, path: Path) {
  await page.goto('/diagnostic');
  await button(page, en.intro.start).click();

  await expect(page.getByRole('heading', { name: en.questions.name.prompt })).toBeVisible();
  await page.getByRole('textbox').fill('Sara Haddad');
  await next(page);

  await choose(page, en.questions.concepts.options.casual);
  await next(page);

  await expect(page.getByRole('heading', { name: en.questions.locations.prompt })).toBeVisible();
  await page.getByRole('textbox').fill(path.locations);
  await next(page);

  await expect(page.getByRole('heading', { name: en.questions.countries.prompt })).toBeVisible();
  await choose(page, 'United Arab Emirates');
  await next(page);

  await choose(page, en.questions.team_size.options['21_40']);
  await next(page);

  await expect(page.getByRole('heading', { name: en.questions.paper_processes.prompt })).toBeVisible();
  for (const option of path.paper) await choose(page, (en.questions.paper_processes.options as Record<string, string>)[option]);
  await next(page);

  if (path.payroll) {
    await expect(page.getByRole('heading', { name: en.questions.payroll_countries.prompt })).toBeVisible();
    await expect(page.getByText(en.flow.preselected)).toBeVisible();
    await next(page);
  }
  if (path.teamCosts) {
    await expect(page.getByRole('heading', { name: en.questions.team_costs.prompt })).toBeVisible();
    for (const option of path.teamCosts) await choose(page, (en.questions.team_costs.options as Record<string, string>)[option]);
    await next(page);
  }

  await expect(page.getByRole('heading', { name: en.questions.money_leaks.prompt })).toBeVisible();
  for (const option of path.leaks) await choose(page, (en.questions.money_leaks.options as Record<string, string>)[option]);
  await next(page);

  await choose(page, en.questions.measure_fix.options.spreadsheet);
  await next(page);

  await expect(page.getByRole('heading', { name: en.questions.pos.prompt })).toBeVisible();
  await choose(page, 'Foodics');
  await next(page);

  await expect(page.getByRole('heading', { name: en.questions.other_systems.prompt })).toBeVisible();
  await button(page, en.flow.skip).click();

  await page.getByRole('textbox').fill('Get overtime under control across our locations.');
  await next(page);

  await expect(page.getByRole('heading', { name: en.questions.contact.prompt })).toBeVisible();
  await page.getByRole('textbox', { name: en.flow.emailLabel }).fill(path.email);
  await expect(page.getByRole('textbox', { name: en.flow.companyLabel })).toHaveValue('Harbor E2e');
  await next(page);

  await choose(page, en.questions.role.options.operations);
  await button(page, en.flow.generate).click();
  await expect(page.getByRole('heading', { name: "Sara, here's your Operations Diagnostic." })).toBeVisible();
}

async function deliveredLead(email: string) {
  let lead: Record<string, unknown> | undefined;
  await expect.poll(async () => {
    const { leads } = await (await fetch(`${FIXTURE}/leads`)).json();
    lead = leads.find((item: { email?: string }) => item.email === email);
    return Boolean(lead);
  }, { timeout: 30_000 }).toBe(true);
  return lead as { numberOfLocations: string; primaryPos: string; role: string; countryCode: string; metadata: { report: { version: number; tierFit: string }; responses: Record<string, unknown> } };
}

test('Core-only operator: Profit Recovery, the included row and an exact-count price', async ({ page }, info) => {
  const email = `core-${info.project.name}@harbor-e2e.test`;
  await answerToReport(page, { locations: '4', paper: ['none'], leaks: ['food_cost'], email });

  await expect(page.getByRole('heading', { name: en.report.leaksTitle })).toBeVisible();
  await expect(page.getByRole('heading', { name: en.report.recoveryTitle })).toBeVisible();
  await expect(page.getByText("Today you keep track in a spreadsheet.")).toBeVisible();
  await expect(page.getByRole('heading', { name: en.report.crewTitle })).toHaveCount(0);
  const report = page.locator('#diagnostic-report');
  for (const name of ['Pulse', 'Benchmarks', 'Ask Sundae', 'Profit Recovery']) {
    await expect(report.getByText(name, { exact: true }).first()).toBeVisible();
  }
  await expect(report.getByText('Core Margin', { exact: true }).first()).toBeVisible();
  // Core Margin at exactly 4 locations: 1650 + 3 x 245.
  await expect(report.getByText('$2,385 / month').first()).toBeVisible();
  await expect(page.getByRole('link', { name: en.report.calculator }).first()).toHaveAttribute('href', /^https:\/\/pricing\.sundae\.io\/simulator\?cfg=/);
  await expect(page.getByText(/EBITDA|Current spend/)).toHaveCount(0);

  const lead = await deliveredLead(email);
  expect(lead.numberOfLocations).toBe('4');
  expect(lead.primaryPos).toBe('Foodics');
  expect(lead.role).toBe('Operations');
  expect(lead.countryCode).toBe('AE');
  expect(lead.metadata.report.version).toBe(2);
  expect(lead.metadata.report.tierFit).toBe('Core Margin');
  expect(JSON.stringify(lead.metadata.responses)).not.toContain('@');
});

test('Crew-heavy operator: payroll branch, Crew Operating and the shared notes', async ({ page }, info) => {
  const email = `crew-${info.project.name}@harbor-e2e.test`;
  await answerToReport(page, {
    locations: '3',
    paper: ['payroll_prep', 'tips', 'checklists'],
    payroll: true,
    teamCosts: ['overtime'],
    leaks: ['labor_vs_demand'],
    email,
  });
  await expect(page.getByRole('heading', { name: en.report.crewTitle })).toBeVisible();
  await expect(page.locator('#diagnostic-report').getByText('Crew Operating', { exact: true }).first()).toBeVisible();
  await expect(page.getByText(en.facts.notes.payroll)).toBeVisible();
  await expect(page.getByText(en.facts.notes.tips)).toBeVisible();
  // Core Foundation 1195 + 2 x 175, Crew Operating 499 + 2 x 99.
  await expect(page.getByText('$2,242 / month')).toBeVisible();
  const lead = await deliveredLead(email);
  expect(lead.metadata.report.tierFit).toBe('Core Foundation + Crew Operating');
});

test('300 locations: the price is quoted, never extrapolated', async ({ page }, info) => {
  await answerToReport(page, { locations: '300', paper: ['none'], leaks: ['not_sure'], email: `quoted-${info.project.name}@harbor-e2e.test` });
  await expect(page.getByText(en.report.quoted)).toBeVisible();
  await expect(page.getByText(/\$\d[\d,]* \/ month/)).toHaveCount(0);
});

test('conditional steps, Back and resume after a refresh', async ({ page }) => {
  await page.goto('/diagnostic');
  await button(page, en.intro.start).click();
  await page.getByRole('textbox').fill('Sara');
  await next(page);
  await choose(page, en.questions.concepts.options.bar);
  await next(page);
  // Not a whole number: the step does not move on (Next is aria-disabled, Enter shows why).
  await page.getByRole('textbox').fill('6-15');
  await expect(button(page, en.flow.next)).toHaveAttribute('aria-disabled', 'true');
  await page.getByRole('textbox').press('Enter');
  await expect(page.locator('#dgx-error-locations')).toContainText('Enter a whole number from 1 to 9,999.');
  await page.getByRole('textbox').fill('12');
  await next(page);
  await expect(page.getByRole('heading', { name: en.questions.countries.prompt })).toBeVisible();

  await page.reload();
  await button(page, en.intro.resume).click();
  await expect(page.getByRole('heading', { name: en.questions.countries.prompt })).toBeVisible();
  await button(page, en.flow.back).click();
  await expect(page.getByRole('textbox')).toHaveValue('12');
});

test('expired report link offers a new one; unknown links keep the not-found page; valid links open', async ({ page }) => {
  await page.goto('/diagnostic/report?token=expired-report-token-0001');
  await expect(page.getByRole('heading', { name: en.expired.title })).toBeVisible();
  await button(page, en.expired.cta).click();
  await expect(page.getByRole('status')).toHaveText(en.expired.done);
  await expect.poll(async () => (await (await fetch(`${FIXTURE}/resends`)).json()).resends.some((item: { token?: string }) => item.token === 'expired-report-token-0001')).toBe(true);

  await page.goto('/diagnostic/report?token=unknown-report-token-0001');
  await expect(page.getByRole('heading', { name: en.share.notFoundTitle })).toBeVisible();

  await page.goto('/diagnostic/report?token=valid-report-token-0001');
  await expect(page.getByRole('button', { name: en.report.recoveryTitle })).toBeVisible();
  await expect(page.getByRole('button', { name: en.report.packageTitle })).toBeVisible();
});

test('Arabic renders right to left with the Arabic question bank', async ({ page }) => {
  await page.goto('/ar/diagnostic');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await button(page, ar.intro.start).click();
  await expect(page.getByRole('heading', { name: ar.questions.name.prompt })).toBeVisible();
});

test('the IP country guess preselects where the operator works', async ({ browser }) => {
  const context = await browser.newContext({ extraHTTPHeaders: { 'x-vercel-ip-country': 'DE' } });
  const page = await context.newPage();
  await page.goto('/diagnostic');
  await button(page, en.intro.start).click();
  await page.getByRole('textbox').fill('Sara');
  await next(page);
  await choose(page, en.questions.concepts.options.cafe_bakery);
  await next(page);
  await page.getByRole('textbox').fill('2');
  await next(page);
  await expect(page.getByText("Looks like you're in Germany.")).toBeVisible();
  await expect(page.getByRole('group').getByRole('button', { name: 'Germany', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await context.close();
});
