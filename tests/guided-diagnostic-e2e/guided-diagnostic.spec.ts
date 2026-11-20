import { expect, test, type APIRequestContext, type Page } from '@playwright/test';
import { en } from '../../src/lib/diagnostic/copy/en';
import { ar } from '../../src/lib/diagnostic/copy/ar';
import { guidedBookingCopy } from '../../src/lib/leadConversation/copy';

// Guided Operations Diagnostic (spec 3, 6.2-6.5, 10 criteria 7-11) against
// the local booking fixture. Every lead goes to the fixture only, with
// ".test" addresses; the booking token is the fixture's.

const FIXTURE = 'http://127.0.0.1:4311';
const ORIGIN = 'http://127.0.0.1:4340';
const PRODUCTION = process.env.DIAGNOSTIC_E2E_PRODUCTION === '1';
const chat = guidedBookingCopy.en;
const q = en.questions;
const TOKEN = 'guided-fixture-token';

type Captured = { event: string; properties?: Record<string, unknown> };
type StoredLead = { idempotencyKey: string; body: Record<string, unknown> & { metadata: Record<string, unknown> } };

let ip = 0;

async function prepare(page: Page, { locale = 'en', theme = 'dark', country = 'AE' }: { locale?: string; theme?: 'dark' | 'light'; country?: string | null } = {}) {
  // A distinct visitor per test keeps the submit route's per-IP limit out of the way.
  ip += 1;
  await page.setExtraHTTPHeaders({
    'x-forwarded-for': `10.60.${Math.floor(ip / 250)}.${ip % 250}`,
    ...(country ? { 'x-vercel-ip-country': country } : {}),
  });
  await page.context().addCookies([
    { name: 'sundae_locale', value: locale, url: ORIGIN },
    { name: 'sundae_theme', value: theme, url: ORIGIN },
  ]);
  await page.addInitScript(() => {
    window.localStorage.setItem('sundae_cookie_consent', 'declined');
    (window as unknown as { __events: Captured[] }).__events = [];
    window.addEventListener('sundae:analytics', (event) => {
      (window as unknown as { __events: Captured[] }).__events.push((event as CustomEvent<Captured>).detail);
    });
  });
}

const panel = (page: Page) => page.locator('[data-guided-diagnostic]');

async function say(page: Page, label: string, value: string) {
  const field = panel(page).getByRole('textbox', { name: label, exact: true });
  await field.fill(value);
  await field.press('Enter');
}

async function tap(page: Page, name: string) {
  await panel(page).getByRole('button', { name, exact: true }).click();
}

/** Ticks chips and closes the turn with "Done · n selected". */
async function multi(page: Page, names: string[]) {
  for (const name of names) await tap(page, name);
  await tap(page, chat.focus.doneCount.replace('{count}', String(names.length)));
}

/** Bodies the browser posts to /api/cta/submit (the route does not forward `source` to the backend). */
function submissions(page: Page) {
  const bodies: Record<string, unknown>[] = [];
  page.on('request', (request) => {
    if (request.url().endsWith('/api/cta/submit') && request.method() === 'POST') bodies.push(request.postDataJSON());
  });
  return bodies;
}

async function events(page: Page): Promise<Captured[]> {
  return page.evaluate(() => (window as unknown as { __events: Captured[] }).__events);
}

async function leads(request: APIRequestContext) {
  return (await (await request.get(`${FIXTURE}/leads`)).json()) as { leads: StoredLead[]; attempts: number };
}

async function deliveredLead(request: APIRequestContext, email: string) {
  let lead: StoredLead | undefined;
  await expect.poll(async () => {
    lead = (await leads(request)).leads.find((item) => item.body.email === email);
    return !!lead;
  }, { timeout: 30_000 }).toBe(true);
  return lead as StoredLead;
}

type Path = {
  email: string;
  /** The company Sundae infers from the email domain. */
  company?: string;
  locations: string;
  paper: string[];
  payroll?: boolean;
  teamCosts?: string[];
  leaks: string[];
  /** A typed role for "Other". */
  otherRole?: string;
  /** POS chips to tick, a brand to add by search, and a name typed under "Other". */
  pos?: { pick: string[]; search?: string; other?: string };
};

const o = <K extends keyof typeof q>(question: K) => (q[question] as { options: Record<string, string> }).options;

async function converse(page: Page, path: Path) {
  await expect(panel(page).getByText(q.name.prompt)).toBeVisible();
  await say(page, en.flow.nameLabel, 'Sara Haddad');
  await expect(panel(page).getByText(q.concepts.prompt)).toBeVisible();
  await multi(page, [o('concepts').casual]);
  await say(page, en.flow.numberLabel, path.locations);
  await expect(panel(page).getByText("Looks like you're in United Arab Emirates.")).toBeVisible();
  await tap(page, chat.focus.doneCount.replace('{count}', '1'));
  await tap(page, o('team_size')['21_40']);
  await multi(page, path.paper.map((key) => o('paper_processes')[key]));
  if (path.payroll) {
    await expect(panel(page).getByText(en.flow.preselected)).toBeVisible();
    await tap(page, chat.focus.doneCount.replace('{count}', '1'));
  }
  if (path.teamCosts) await multi(page, path.teamCosts.map((key) => o('team_costs')[key]));
  await multi(page, path.leaks.map((key) => o('money_leaks')[key]));
  await tap(page, o('measure_fix').spreadsheet);
  // POS is multi-select, like the step-by-step form.
  await expect(panel(page).locator('p', { hasText: q.pos.prompt }).last()).toContainText(q.pos.helper);
  const pos = path.pos ?? { pick: ['Foodics'] };
  for (const name of pos.pick) await tap(page, name);
  let count = pos.pick.length;
  if (pos.search) {
    const search = panel(page).getByRole('searchbox', { name: en.flow.search });
    await search.fill(pos.search);
    await search.press('Enter');
    count += 1;
  }
  if (pos.other) {
    await tap(page, q.pos.options.other);
    await panel(page).getByRole('textbox', { name: chat.pos.otherLabel }).fill(pos.other);
    count += 1;
  }
  await tap(page, chat.focus.doneCount.replace('{count}', String(count)));
  await expect(panel(page).getByText(q.other_systems.prompt)).toBeVisible();
  await tap(page, en.flow.skip);
  await say(page, q.priority.prompt, 'Get overtime under control across our locations.');
  await expect(panel(page).getByText(q.contact.prompt)).toBeVisible();
  await say(page, en.flow.emailLabel, path.email);
  await expect(panel(page).getByText(`Are you with ${path.company ?? 'Harbor Group'}?`)).toBeVisible();
  await tap(page, chat.company.yes);
  if (path.otherRole) {
    await tap(page, o('role').other);
    // Focus moves into the new field, so typing goes straight in.
    await expect(panel(page).getByRole('textbox', { name: en.flow.otherPlaceholder })).toBeFocused();
    await say(page, en.flow.otherPlaceholder, path.otherRole);
  } else {
    await tap(page, o('role').operations);
  }
  await expect(page.getByRole('heading', { name: "Sara, here's your Operations Diagnostic." })).toBeVisible({ timeout: 45_000 });
}

// Phones show the short label ("Classic form").
const classicLink = (page: Page) => panel(page).getByRole('button', { name: new RegExp(`^(${chat.header.classic}|${chat.header.classicShort})$`) });
const chooseTime = (page: Page) => page.getByRole('button', { name: chat.booking.choose, exact: true });

test.beforeEach(async ({ request }) => {
  await request.get(`${FIXTURE}/leads/reset`);
});

test('off by default: without ?guided the classic form is unchanged and no variant cookie is set', async ({ page }) => {
  await prepare(page);
  await page.goto('/diagnostic');
  await expect(page.getByRole('button', { name: en.intro.start })).toBeVisible();
  await expect(panel(page)).toHaveCount(0);
  await page.goto('/diagnostic?guided=0');
  await expect(page.getByRole('button', { name: en.intro.start })).toBeVisible();
  await expect(panel(page)).toHaveCount(0);
  await page.goto('/diagnostic?guided=1');
  await expect(panel(page)).toBeVisible();
  // ?guided forces a variant for QA without assigning one.
  expect((await page.context().cookies()).some((cookie) => cookie.name === 'sundae_diag_variant')).toBe(false);
});

test('Core-only operator: guided lead with metadata.convo, the report, and Choose a time for a new work email', async ({ page, request }, info) => {
  const email = `core-${info.project.name}@harbor-group.test`;
  await prepare(page);
  const sent = submissions(page);
  await page.goto('/diagnostic?guided=1');
  await converse(page, { email, locations: '4', paper: ['none'], leaks: ['food_cost'] });

  const report = page.locator('#diagnostic-report');
  await expect(report.getByText('Core Margin', { exact: true }).first()).toBeVisible();
  await expect(report.getByText('$2,385 / month').first()).toBeVisible();
  for (const name of ['Pulse', 'Benchmarks', 'Ask Sundae', 'Profit Recovery']) await expect(report.getByText(name, { exact: true }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: en.report.crewTitle })).toHaveCount(0);
  await expect(chooseTime(page)).toBeVisible();
  await expect(page.getByText(`Your report is on its way to ${email} - pick a walkthrough time now if you like.`)).toBeVisible();

  const lead = await deliveredLead(request, email);
  expect(sent.map((body) => body.source)).toEqual(['guided-diagnostic']);
  expect(lead.body.sourcePage).toBe('/diagnostic');
  expect(lead.body.primaryPos).toBe('Foodics');
  expect(lead.body.numberOfLocations).toBe('4');
  expect(lead.body.role).toBe('Operations');
  expect(lead.body.countryCode).toBe('AE');
  const metadata = lead.body.metadata as { convo: Record<string, unknown>; report: { version: number; tierFit: string }; responses: Record<string, unknown> };
  expect(metadata.report.version).toBe(2);
  expect(metadata.report.tierFit).toBe('Core Margin');
  expect(metadata.convo).toMatchObject({ version: 1, variant: 'guided', skipped: ['other_systems'], inferred: { company: true, countries: true }, freeMail: false });
  expect((metadata.convo.answers as Record<string, unknown>).locations).toBe('4');
  expect((metadata.convo.turns as number)).toBeLessThanOrEqual(15);
  for (const blob of [metadata.convo, metadata.responses]) expect(JSON.stringify(blob)).not.toMatch(/Sara|Haddad|@|Harbor Group/);
  // The token never reaches the URL or storage.
  expect(page.url()).not.toContain('token');
  const stores = await page.evaluate(() => JSON.stringify({ ...window.sessionStorage }) + JSON.stringify({ ...window.localStorage }));
  expect(stores).not.toContain(TOKEN);
  // The finished conversation was cleared, so a refresh starts over.
  expect(stores).not.toContain('sundae_diag_convo_v1');
});

test('Crew-heavy operator: payroll branch, Crew Operating and the shared notes', async ({ page, request }, info) => {
  const email = `crew-${info.project.name}@harbor-group.test`;
  await prepare(page);
  await page.goto('/diagnostic?guided=1');
  await converse(page, {
    email, locations: '3', paper: ['payroll_prep', 'tips', 'checklists'], payroll: true, teamCosts: ['overtime'], leaks: ['labor_vs_demand'],
    // Two POS systems, one found by search, plus one typed under "Other".
    pos: { pick: ['Foodics', 'Oracle MICROS Simphony'], search: 'clover', other: 'Our own till' },
  });
  await expect(page.getByRole('heading', { name: en.report.crewTitle })).toBeVisible();
  await expect(page.locator('#diagnostic-report').getByText('Crew Operating', { exact: true }).first()).toBeVisible();
  await expect(page.getByText(en.facts.notes.payroll)).toBeVisible();
  await expect(page.getByText('$2,242 / month')).toBeVisible();
  const lead = await deliveredLead(request, email);
  const metadata = lead.body.metadata as { report: { tierFit: string }; convo: { answers: Record<string, unknown>; turns: number } };
  expect(metadata.report.tierFit).toBe('Core Foundation + Crew Operating');
  expect(metadata.convo.answers.payroll_countries).toEqual(['AE']);
  expect(metadata.convo.answers.pos).toEqual(['foodics', 'micros', 'clover', 'other']);
  expect(metadata.convo.answers.pos_other).toBe('Our own till');
  expect(lead.body.primaryPos).toBe('Foodics');
  expect(metadata.convo.turns).toBe(15);
});

test('300 locations: the price is quoted, never extrapolated', async ({ page }, info) => {
  test.skip(info.project.name === 'mobile', 'Same rules as desktop; covered once.');
  await prepare(page);
  await page.goto('/diagnostic?guided=1');
  await converse(page, { email: `quoted-${info.project.name}@harbor-group.test`, locations: '300', paper: ['none'], leaks: ['not_sure'] });
  await expect(page.getByText(en.report.quoted)).toBeVisible();
  await expect(page.getByText(/\$\d[\d,]* \/ month/)).toHaveCount(0);
});

test('AI failure falls back to the rules report', async ({ page }, info) => {
  test.skip(info.project.name === 'mobile', 'Covered once.');
  await prepare(page);
  await page.route('**/api/diagnostic', (route) => (route.request().method() === 'POST' ? route.fulfill({ status: 500, body: '{}' }) : route.continue()));
  await page.goto('/diagnostic?guided=1');
  await converse(page, { email: `fallback-${info.project.name}@harbor-group.test`, locations: '4', paper: ['none'], leaks: ['food_cost'] });
  await expect(page.locator('#diagnostic-report').getByText('Core Margin', { exact: true }).first()).toBeVisible();
  if (!PRODUCTION) expect((await events(page)).map((item) => item.event)).toContain('diagnostic_generation_failed');
});

test('outbox retry: a failed delivery shows the email ending, then the retried delivery offers Choose a time', async ({ page, request }, info) => {
  test.skip(info.project.name === 'mobile', 'Covered once.');
  await prepare(page);
  await page.goto('/diagnostic?guided=1');
  // The fixture answers this address's first attempt with a 503.
  await converse(page, { email: 'flaky@harborgroup.test', company: 'Harborgroup', locations: '4', paper: ['none'], leaks: ['food_cost'] });
  await expect(chooseTime(page)).toBeVisible({ timeout: 30_000 });
  const stored = await leads(request);
  expect(stored.attempts).toBe(2);
  expect(stored.leads).toHaveLength(1);
});

test('inline booking: focus moves into the dialog and back, the booking confirms in the report, the token stays in memory', async ({ page }, info) => {
  test.skip(info.project.name === 'mobile', 'Booking screen layout is covered by the booking e2e suite.');
  await prepare(page);
  await page.goto('/diagnostic?guided=1');
  const email = 'booking@harbor-group.test';
  await converse(page, { email, locations: '4', paper: ['none'], leaks: ['food_cost'] });

  const dialog = page.getByRole('dialog', { name: chat.booking.choose });
  const focusInDialog = () => page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]'));
  await chooseTime(page).click();
  await expect(dialog).toBeVisible();
  await expect.poll(focusInDialog).toBe(true);
  await dialog.getByLabel('Your time zone').waitFor();
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press('Tab');
    expect(await focusInDialog(), `Tab ${i + 1}`).toBe(true);
  }
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press('Shift+Tab');
    expect(await focusInDialog(), `Shift+Tab ${i + 1}`).toBe(true);
  }
  // Escape returns focus to "Choose a time"; so does "Back to your report".
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(chooseTime(page)).toBeFocused();
  await chooseTime(page).click();
  await dialog.getByRole('button', { name: en.report.bookingClose }).click();
  await expect(dialog).toHaveCount(0);
  await expect(chooseTime(page)).toBeFocused();

  await chooseTime(page).click();
  await dialog.getByLabel('Your time zone').selectOption('UTC');
  await dialog.getByRole('button', { name: '10:00 AM', exact: true }).click();
  await dialog.getByRole('button', { name: 'Confirm booking', exact: true }).click();
  await expect(dialog.getByRole('heading', { name: 'You’re booked' })).toBeVisible();
  expect(page.url()).not.toContain('token');
  const stores = await page.evaluate(() => JSON.stringify({ ...window.sessionStorage }) + JSON.stringify({ ...window.localStorage }));
  expect(stores).not.toContain(TOKEN);
  await dialog.getByRole('button', { name: en.report.bookingClose }).click();
  await expect(dialog).toHaveCount(0);
  const booked = page.getByText(new RegExp(`^Booked for .+\\. The confirmation is on its way to ${email.replace('.', '\\.')}\\.$`));
  await expect(booked).toBeVisible();
  await expect(booked).toBeFocused();
  await expect(chooseTime(page)).toHaveCount(0);
  const captured = await events(page);
  if (!PRODUCTION) expect(captured.map((item) => item.event)).toEqual(expect.arrayContaining(['diagnostic_booking_opened', 'diagnostic_booking_booked']));
  expect(JSON.stringify(captured)).not.toContain(TOKEN);
});

test('no token (repeat email): the email ending, with no Choose a time', async ({ page, request }, info) => {
  const email = `repeat-${info.project.name}@harbor-group.test`;
  // An earlier lead for the same address: the backend issues no token.
  const seeded = await request.post('/api/cta/submit', {
    headers: { 'x-forwarded-for': `10.61.0.${info.project.name === 'mobile' ? 2 : 1}` },
    data: {
      name: 'Sara Haddad', email, company: 'Harbor Group', role: 'Operations', country: 'United Arab Emirates', countryCode: 'AE',
      numberOfLocations: '4', primaryPOS: 'Foodics', message: 'Earlier enquiry.', ctaLabel: 'Book a demo', sourcePage: '/diagnostic', locale: 'en',
    },
  });
  expect(seeded.ok()).toBe(true);
  await prepare(page);
  const sent = submissions(page);
  await page.goto('/diagnostic?guided=1');
  await converse(page, { email, locations: '4', paper: ['none'], leaks: ['food_cost'] });
  await expect(page.getByText(`Your report is ready. A copy is on its way to ${email}, with a link to book a time.`)).toBeVisible();
  await expect(page.getByRole('button', { name: en.report.bookCall })).toBeVisible();
  await expect(chooseTime(page)).toHaveCount(0);
  const lead = (await leads(request)).leads.filter((item) => item.body.email === email);
  expect(lead).toHaveLength(2);
  expect((lead[1].body.metadata as { convo?: unknown }).convo).toBeTruthy();
  expect(sent.map((body) => body.source)).toEqual(['guided-diagnostic']);
});

test('edit, back, skip and refresh-resume keep answers; a new branch is asked after an edit', async ({ page }) => {
  await prepare(page);
  await page.goto('/diagnostic?guided=1');
  await say(page, en.flow.nameLabel, 'Sara Haddad');
  await multi(page, [o('concepts').bar]);
  // Not a whole number: the turn stays and says why.
  await say(page, en.flow.numberLabel, '6-15');
  await expect(panel(page).getByRole('alert')).toHaveText('Enter a whole number from 1 to 9,999.');
  await tap(page, '10');
  await tap(page, chat.focus.doneCount.replace('{count}', '1'));
  await tap(page, o('team_size').up_to_15);
  await multi(page, [o('paper_processes').schedules]);
  await expect(panel(page).getByText(q.team_costs.prompt)).toBeVisible();

  await page.reload();
  await expect(panel(page).getByText(q.team_costs.prompt)).toBeVisible();
  await expect(panel(page).getByText('Sara Haddad', { exact: true })).toBeVisible();

  // Back rewinds one turn with the answer kept.
  await panel(page).getByRole('button', { name: chat.back }).click();
  await expect(panel(page).getByRole('button', { name: o('paper_processes').schedules })).toHaveAttribute('aria-pressed', 'true');
  // Editing in tips brings in the payroll question next.
  await tap(page, o('paper_processes').tips);
  await tap(page, chat.focus.doneCount.replace('{count}', '2'));
  await expect(panel(page).getByText(q.payroll_countries.prompt)).toBeVisible();
  await tap(page, chat.focus.doneCount.replace('{count}', '1'));
  await expect(panel(page).getByText(q.team_costs.prompt)).toBeVisible();
  // Edit an earlier answer from its bubble.
  await panel(page).getByRole('button', { name: chat.editLabel.replace('{answer}', o('concepts').bar) }).click();
  await expect(panel(page).getByRole('button', { name: o('concepts').bar })).toHaveAttribute('aria-pressed', 'true');
});

test('classic switch both ways carries the answers, and a refresh after switching keeps them', async ({ page }) => {
  await prepare(page);
  await page.goto('/diagnostic?guided=1');
  await say(page, en.flow.nameLabel, 'Sara Haddad');
  await multi(page, [o('concepts').cafe_bakery]);
  await say(page, en.flow.numberLabel, '12');
  await expect(panel(page).getByText("Looks like you're in United Arab Emirates.")).toBeVisible();

  await classicLink(page).click();
  await expect(page.getByRole('heading', { name: q.countries.prompt })).toBeVisible();
  await page.getByRole('button', { name: en.flow.back, exact: true }).click();
  await expect(page.getByRole('textbox')).toHaveValue('12');
  await page.getByRole('button', { name: en.flow.next, exact: true }).click();
  await expect(page.getByRole('heading', { name: q.countries.prompt })).toBeVisible();
  await page.getByRole('button', { name: en.flow.next, exact: true }).click();
  await page.getByRole('group').getByRole('button', { name: o('team_size')['16_20'], exact: true }).click();
  await page.getByRole('button', { name: en.flow.next, exact: true }).click();
  await expect(page.getByRole('heading', { name: q.paper_processes.prompt })).toBeVisible();

  // Back to the conversation, at the same question, with the classic answers.
  await page.getByRole('button', { name: en.convo.backToGuided }).click();
  await expect(panel(page).getByText(q.paper_processes.prompt)).toBeVisible();
  await expect(panel(page).getByText(o('team_size')['16_20'], { exact: true })).toBeVisible();
  await expect(panel(page).getByText('12', { exact: true })).toBeVisible();

  // A refresh in the classic form brings the visitor back with every answer.
  await classicLink(page).click();
  await expect(page.getByRole('heading', { name: q.paper_processes.prompt })).toBeVisible();
  await page.reload();
  await expect(panel(page).getByText(q.paper_processes.prompt)).toBeVisible();
  await expect(panel(page).getByText(o('team_size')['16_20'], { exact: true })).toBeVisible();
});

test('analytics: every diagnostic event carries variant and surface and no personal data', async ({ page }, info) => {
  test.skip(PRODUCTION, 'The analytics test seam is compiled out of production builds.');
  test.skip(info.project.name === 'mobile', 'Covered once.');
  await prepare(page);
  await page.goto('/diagnostic?guided=1');
  const email = 'analytics@harbor-group.test';
  await converse(page, { email, locations: '4', paper: ['none'], leaks: ['food_cost'] });
  await panel(page).waitFor({ state: 'detached' });
  await expect(chooseTime(page)).toBeVisible();
  const captured = (await events(page)).filter((item) => item.event.startsWith('diagnostic_'));
  const names = captured.map((item) => item.event);
  for (const name of ['diagnostic_started', 'diagnostic_turn_answered', 'diagnostic_lead_captured', 'diagnostic_submitted', 'diagnostic_report_shown', 'diagnostic_lead_delivered']) {
    expect(names, name).toContain(name);
  }
  for (const item of captured) {
    expect(item.properties?.variant, item.event).toBe('guided');
    expect(item.properties?.surface, item.event).toBe('diagnostic');
  }
  const turns = captured.filter((item) => item.event === 'diagnostic_turn_answered');
  expect(turns.length).toBe(14);
  expect(turns.find((item) => item.properties?.turnId === 'other_systems')?.properties?.skipped).toBe(true);
  for (const item of turns) expect(Object.keys(item.properties ?? {}).sort()).toEqual(['index', 'locale', 'msSinceStart', 'skipped', 'surface', 'turnId', 'variant']);
  const flat = JSON.stringify(captured);
  for (const personal of ['Sara', 'Haddad', email, 'Harbor Group', 'overtime under control', TOKEN]) expect(flat).not.toContain(personal);
});

test('Arabic: right to left, Sundae kept in Latin script, the Arabic question bank', async ({ page }) => {
  test.skip(!PRODUCTION, 'Locale-prefixed paths need `next start` (see the config).');
  await prepare(page, { locale: 'ar' });
  await page.goto('/ar/diagnostic?guided=1');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(panel(page).getByText(ar.questions.name.prompt)).toBeVisible();
  await say(page, ar.flow.nameLabel, 'سارة حداد');
  await expect(panel(page).getByText(ar.questions.concepts.prompt)).toBeVisible();
  await expect(panel(page).getByText('سارة حداد', { exact: true })).toBeVisible();
  const direction = await panel(page).evaluate((element) => getComputedStyle(element).direction);
  expect(direction).toBe('rtl');
  await expect(panel(page).locator('bdi', { hasText: 'Sundae' }).first()).toBeVisible();
});

test('role "Other" with a typed detail completes the report', async ({ page, request }, info) => {
  test.skip(info.project.name === 'mobile', 'Covered once.');
  const email = 'other-role@harbor-group.test';
  await prepare(page);
  await page.goto('/diagnostic?guided=1');
  await converse(page, { email, locations: '4', paper: ['none'], leaks: ['food_cost'], otherRole: 'Head of growth' });
  const lead = await deliveredLead(request, email);
  expect(lead.body.role).toBe('Other');
  const convo = (lead.body.metadata as { convo: { answers: Record<string, unknown> } }).convo;
  expect(convo.answers.role).toBe('other');
  expect(convo.answers.role_other).toBe('Head of growth');
});

test('countries by keyboard: remove the guess, search and add two, focus stays in the search', async ({ page }) => {
  await prepare(page);
  await page.goto('/diagnostic?guided=1');
  await say(page, en.flow.nameLabel, 'Sara Haddad');
  await multi(page, [o('concepts').casual]);
  await say(page, en.flow.numberLabel, '7');
  const guess = panel(page).getByRole('button', { name: 'United Arab Emirates', exact: true });
  await expect(guess).toHaveAttribute('aria-pressed', 'true');
  await guess.click();
  // With nothing chosen, the guess does not come back and Done is hidden.
  await expect(panel(page).getByRole('button', { name: 'United Arab Emirates', exact: true })).toHaveCount(0);
  await expect(panel(page).getByRole('button', { name: /^Done/ })).toHaveCount(0);
  const search = panel(page).getByRole('searchbox', { name: en.flow.search });
  await search.fill('qatar');
  await search.press('Enter');
  await expect(search).toBeFocused();
  await search.fill('bahr');
  await search.press('Enter');
  await expect(search).toBeFocused();
  await tap(page, chat.focus.doneCount.replace('{count}', '2'));
  await expect(panel(page).getByText('Qatar, Bahrain', { exact: true })).toBeVisible();
  await expect(panel(page).getByText(q.team_size.prompt)).toBeVisible();
});
