import { test, expect, type Page, type APIRequestContext } from '@playwright/test';
import { encodePricingIntent, type PricingIntent } from '../../src/lib/pricingIntent';

// Spec section 9 flows plus acceptance criteria 1-12 and 14-15, against the
// local backend fixture (tests/booking-e2e/backend-fixture.mjs).

const FIXTURE = 'http://127.0.0.1:4311';
const PRODUCTION = process.env.GUIDED_E2E_PRODUCTION === '1';
const PRIVATE_DATA = ['Sara Haddad', 'sara@harborgroup.com', 'omar.k@gmail.com', '501234567', 'guided-fixture-token'];

type Captured = { event: string; properties?: Record<string, unknown> };

let ipCounter = 0;

async function prepare(page: Page, { locale = 'en', theme = 'dark' }: { locale?: string; theme?: 'dark' | 'light' } = {}) {
  // Each test is a distinct visitor so the route's per-IP rate limit never interferes.
  ipCounter += 1;
  await page.setExtraHTTPHeaders({ 'x-forwarded-for': `10.20.${Math.floor(ipCounter / 250)}.${ipCounter % 250}`, 'x-vercel-ip-country': 'AE' });
  await page.context().addCookies([
    { name: 'sundae_locale', value: locale, url: 'http://127.0.0.1:4330' },
    { name: 'sundae_theme', value: theme, url: 'http://127.0.0.1:4330' },
  ]);
  await page.addInitScript(() => {
    window.localStorage.setItem('sundae_cookie_consent', 'declined');
    (window as unknown as { __events: Captured[] }).__events = [];
    window.addEventListener('sundae:analytics', (event) => {
      (window as unknown as { __events: Captured[] }).__events.push((event as CustomEvent<Captured>).detail);
    });
  });
}

const panel = (page: Page) => page.locator('[data-guided-booking]');

async function say(page: Page, label: string, value: string) {
  const field = panel(page).getByLabel(label, { exact: true });
  await field.fill(value);
  await field.press('Enter');
}

async function choose(page: Page, name: string) {
  await panel(page).getByRole('button', { name, exact: true }).click();
}

async function events(page: Page): Promise<Captured[]> {
  return page.evaluate(() => (window as unknown as { __events: Captured[] }).__events);
}

async function leads(request: APIRequestContext) {
  return (await (await request.get(`${FIXTURE}/leads`)).json()) as { leads: { idempotencyKey: string; body: Record<string, unknown> }[]; attempts: number };
}

async function answerToBrief(page: Page, { email = 'sara@harborgroup.com' } = {}) {
  await say(page, 'Your name', 'Sara Haddad');
  await expect(panel(page).getByText('Nice to meet you, Sara. Which work email should the invite go to?')).toBeVisible();
  await say(page, 'Work email', email);
  await expect(panel(page).getByText('Are you with Harborgroup?')).toBeVisible();
  await choose(page, 'Yes');
  await choose(page, 'Operations');
  await choose(page, '11-25');
  await choose(page, 'Tasks and logbook');
  await choose(page, 'Margin and performance');
  await choose(page, 'Done · 2 selected');
  await choose(page, 'Oracle MICROS Simphony');
  await expect(panel(page).getByText("Looks like you're in United Arab Emirates. Right?")).toBeVisible();
  await choose(page, 'Yes');
  await expect(panel(page).getByRole('heading', { name: 'Your walkthrough' })).toBeVisible();
}

test.beforeEach(async ({ request }) => {
  await request.get(`${FIXTURE}/leads/reset`);
});

test('golden path (default context): brief, optional phone, one lead with the classic fields plus metadata.convo', async ({ page, request }) => {
  await prepare(page);
  await page.goto('/demo?guided=1');
  await expect(panel(page).getByText("Hi, I'm Sundae. I'll set up a walkthrough around your operation. First, what should I call you?")).toBeVisible();
  // The guided variant has its own sentence-case section heading.
  await expect(page.getByRole('heading', { level: 2, name: 'Tell us about your operation' })).toBeVisible();
  // Inline, announced errors; never colour-only. An email or a number is not a name.
  await say(page, 'Your name', 'sara@harborgroup.com');
  await expect(panel(page).getByRole('alert')).toHaveText('Enter your name, not an email or a number');
  await say(page, 'Your name', '0501234567');
  await expect(panel(page).getByRole('alert')).toHaveText('Enter your name, not an email or a number');
  await say(page, 'Your name', 'S');
  await expect(panel(page).getByRole('alert')).toHaveText('Enter your name');
  await answerToBrief(page);
  const brief = panel(page).locator('ol li');
  await expect(brief).toHaveText(['Opening checklist, shift logbook and handoverCrew', 'A live shift, a margin leak, and the measured recoveryCore']);
  await expect(panel(page).getByText('Tasks and the logbook are in Crew Operating and Crew Complete.')).toBeVisible();
  await choose(page, 'Looks right');
  await expect(panel(page).getByText("Want a phone number on file for a reminder? It's optional.")).toBeVisible();
  await choose(page, 'No thanks');
  await expect(panel(page).getByText('Your request is in. Pick a time that suits you - it takes a few seconds.')).toBeVisible();

  const { leads: stored } = await leads(request);
  expect(stored).toHaveLength(1);
  const body = stored[0].body;
  expect(body).toMatchObject({
    fullName: 'Sara Haddad',
    email: 'sara@harborgroup.com',
    company: 'Harborgroup',
    role: 'Operations',
    country: 'United Arab Emirates',
    countryCode: '+971',
    phone: null,
    numberOfLocations: '11-25',
    primaryPos: 'Oracle MICROS Simphony',
    message: 'Walkthrough focus: Tasks and logbook, Margin and performance. Source: guided booking (default).',
    sourcePage: '/demo',
    locale: 'en',
  });
  const convo = (body.metadata as { convo: Record<string, unknown> }).convo;
  expect(convo).toMatchObject({ version: 1, mode: 'demo', context: 'default', focus: ['tasks_logbook', 'margin_performance'], roleKey: 'operations' });
  expect(await page.evaluate(() => window.sessionStorage.getItem('sundae_convo_demo_v1'))).toBeNull();
});

test('phase 2: Choose a time opens BookingView with the token and the conversation confirms the booking', async ({ page, request }) => {
  test.skip(test.info().project.name === 'mobile', 'Booking screen layout is covered by the booking e2e suite.');
  await prepare(page);
  await page.goto('/demo?guided=1');
  await answerToBrief(page);
  await choose(page, 'Looks right');
  await say(page, 'Phone number', '50 123 4567');
  await expect(panel(page).getByText('Your request is in. Pick a time that suits you - it takes a few seconds.')).toBeVisible();
  const { leads: stored } = await leads(request);
  expect(stored[0].body.phone).toBe('+971501234567');

  await panel(page).getByRole('button', { name: 'Choose a time' }).click();
  const dialog = page.getByRole('dialog', { name: 'Choose a time' });
  await expect(dialog).toBeVisible();
  await dialog.getByLabel('Your time zone').selectOption('UTC');
  await dialog.getByRole('button', { name: '10:00 AM', exact: true }).click();
  await dialog.getByRole('button', { name: 'Confirm booking', exact: true }).click();
  await expect(dialog.getByRole('heading', { name: 'You’re booked' })).toBeVisible();
  // The token never reaches the page URL, storage or analytics.
  expect(page.url()).not.toContain('token');
  const stores = await page.evaluate(() => JSON.stringify({ ...window.sessionStorage }) + JSON.stringify({ ...window.localStorage }));
  expect(stores).not.toContain('guided-fixture-token');
  await dialog.getByRole('button', { name: 'Back to the conversation' }).click();
  await expect(dialog).toHaveCount(0);
  await expect(panel(page).getByText(/^Booked for .+\. The confirmation is on its way to sara@harborgroup\.com\.$/)).toBeVisible();
  const captured = await events(page);
  if (!PRODUCTION) expect(captured.map((item) => item.event)).toEqual(expect.arrayContaining(['guided_booking_booking_opened', 'guided_booking_booked']));
  expect(JSON.stringify(captured)).not.toContain('guided-fixture-token');
});

test('pricing context: opening restates the estimate, locations are skipped and focus is preselected', async ({ page, request }) => {
  await prepare(page);
  const intent: PricingIntent = {
    v: 2, layer: 'core', corePackage: 'core_foundation', locations: 10, addOns: [], watchtowerModules: [], crewSkus: [],
    crossIntelligence: 'none', billingCycle: 'monthly', operatingModels: [], employees: null, payrollCountry: '',
  };
  await page.goto(`/demo?guided=1&cfg=${encodePricingIntent(intent)}`);
  await expect(panel(page).getByText("Hi, I'm Sundae. You priced Core Foundation for 10 locations. I'll bring that estimate into the walkthrough. What should I call you?")).toBeVisible();
  await say(page, 'Your name', 'Lina');
  await say(page, 'Work email', 'lina@harborgroup.com');
  await choose(page, 'Yes');
  await choose(page, 'Owner or CEO');
  await expect(panel(page).getByText("I've got 10 locations from your estimate.")).toBeVisible();
  await expect(panel(page).getByRole('button', { name: 'Margin and performance' })).toHaveAttribute('aria-pressed', 'true');
  await choose(page, 'Done · 1 selected');
  await choose(page, 'Not sure');
  await choose(page, 'Yes');
  await choose(page, 'Looks right');
  await choose(page, 'No thanks');
  await expect(panel(page).getByRole('button', { name: 'Choose a time' })).toBeVisible();
  const body = (await leads(request)).leads[0].body;
  expect(body.numberOfLocations).toBe('6-10');
  expect(body.primaryPos).toBe('Not sure');
  expect(String(body.message)).toMatch(/^Walkthrough focus: Margin and performance\. Source: guided booking \(pricing estimate\)\.\n\nPricing selection/);
  expect((body.metadata as { convo: Record<string, unknown> }).convo).toMatchObject({ context: 'pricing', inferred: { locations: true, country: true } });
});

test('workflow context opening and preselected chip', async ({ page }) => {
  test.skip(test.info().project.name === 'mobile', 'Context copy is viewport independent.');
  await prepare(page);
  await page.goto('/demo?guided=1&workflow=restaurant-logbook');
  await expect(panel(page).getByText("Hi, I'm Sundae. You were looking at the digital logbook, so I'll centre the walkthrough on it. What should I call you?")).toBeVisible();
  await say(page, 'Your name', 'Ken');
  await say(page, 'Work email', 'ken@harborgroup.com');
  await choose(page, 'Yes');
  await choose(page, 'Finance');
  await choose(page, '2-5');
  await expect(panel(page).getByRole('button', { name: 'Tasks and logbook' })).toHaveAttribute('aria-pressed', 'true');
});

test('personal email: confirm prompt, add a work email, then use one anyway; no booking token for free mail', async ({ page, request }) => {
  await prepare(page);
  await page.goto('/demo?guided=1');
  await say(page, 'Your name', 'Omar');
  await say(page, 'Work email', 'omar.k@gmail.com');
  await expect(panel(page).getByText('That looks like a personal address. Use it anyway, or add a work one?')).toBeVisible();
  await choose(page, 'Add a work email');
  await expect(panel(page).getByText('Which work email should I use?')).toBeVisible();
  await say(page, 'Work email', 'omar.k@gmail.com');
  await choose(page, 'Use it anyway');
  await expect(panel(page).getByText("What's the company or group called?")).toBeVisible();
  await say(page, 'Company or group', 'Omar Kitchens');
  await choose(page, 'Other');
  await say(page, 'Your role', 'Head chef');
  await choose(page, '1');
  await choose(page, 'Payroll');
  await choose(page, 'Done · 1 selected');
  await choose(page, 'Other');
  await say(page, 'Your POS', 'Homegrown till');
  await choose(page, 'Somewhere else');
  await panel(page).getByLabel('Country', { exact: true }).selectOption({ label: 'Germany' });
  await panel(page).getByRole('button', { name: 'Continue' }).click();
  await expect(panel(page).getByText('Payroll availability is confirmed for your country before setup.')).toBeVisible();
  await choose(page, 'Looks right');
  await choose(page, 'No thanks');
  await expect(panel(page).getByText('Thanks, Omar. Check your inbox to pick a time.')).toBeVisible();
  await expect(panel(page).getByRole('button', { name: 'Choose a time' })).toHaveCount(0);
  const body = (await leads(request)).leads[0].body;
  expect(body).toMatchObject({ company: 'Omar Kitchens', role: 'Head chef', primaryPos: 'Homegrown till', country: 'Germany', countryCode: '+49' });
});

test('edit, back and refresh-resume keep answers', async ({ page }) => {
  await prepare(page);
  await page.goto('/demo?guided=1');
  await say(page, 'Your name', 'Sara Haddad');
  await say(page, 'Work email', 'sara@harborgroup.com');
  await choose(page, 'Yes');
  await expect(panel(page).getByText("What's your role?")).toBeVisible();
  // Back rewinds one step with the answer kept.
  await panel(page).getByRole('button', { name: 'Back' }).click();
  await expect(panel(page).getByRole('button', { name: 'Yes', exact: true })).toBeFocused();
  await choose(page, 'Yes');
  // Edit the name: later answers are kept and the visitor returns to where they were.
  await panel(page).getByRole('button', { name: 'Edit your answer: Sara Haddad' }).click();
  await expect(panel(page).getByLabel('Your name', { exact: true })).toHaveValue('Sara Haddad');
  await expect(panel(page).getByLabel('Your name', { exact: true })).toBeFocused();
  await say(page, 'Your name', 'Sarah Haddad');
  await expect(panel(page).getByText("What's your role?")).toBeVisible();
  await expect(panel(page).getByText('sara@harborgroup.com')).toBeVisible();
  await choose(page, 'Operations');
  // Refresh resumes at the same step from sessionStorage.
  await page.reload();
  await expect(panel(page).getByText('How many locations do you run?')).toBeVisible();
  await expect(panel(page).getByText('Sarah Haddad')).toBeVisible();
  const stored = await page.evaluate(() => window.sessionStorage.getItem('sundae_convo_demo_v1'));
  expect(stored).toContain('sara@harborgroup.com');
  expect(stored).not.toMatch(/token|idempotency/i);
});

test('Use the classic form carries the answers over', async ({ page }) => {
  await prepare(page);
  await page.goto('/demo?guided=1');
  await say(page, 'Your name', 'Sara Haddad');
  await say(page, 'Work email', 'sara@harborgroup.com');
  await choose(page, 'Yes');
  await choose(page, 'Operations');
  await choose(page, '11-25');
  const classic = test.info().project.name === 'mobile' ? 'Classic form' : 'Use the classic form';
  await page.locator('[data-guided-booking] header').getByRole('button', { name: classic }).click();
  await expect(page.locator('#name')).toHaveValue('Sara Haddad');
  await expect(page.locator('#email')).toHaveValue('sara@harborgroup.com');
  await expect(page.locator('#company')).toHaveValue('Harborgroup');
  await expect(page.locator('#role')).toHaveValue('Operations');
  await expect(page.locator('#numberOfLocations')).toHaveValue('11-25');
  const captured = await events(page);
  if (!PRODUCTION) expect(captured.find((item) => item.event === 'guided_booking_switched_to_classic')?.properties).toMatchObject({ atStepId: 'focus', variant: 'guided', surface: 'demo' });
});

test('a failed submit retries with the same idempotency key and stores exactly one lead', async ({ page, request }) => {
  test.skip(test.info().project.name === 'mobile', 'Network behaviour is viewport independent.');
  await prepare(page);
  // Block every non-GET request except the submit route (spec AC12).
  await page.route('**/*', (route) => {
    const req = route.request();
    if (req.method() !== 'GET' && !req.url().includes('/api/cta/submit')) return route.abort();
    return route.continue();
  });
  const keys: string[] = [];
  page.on('request', (req) => {
    if (req.url().includes('/api/cta/submit')) keys.push(req.headers()['idempotency-key']);
  });
  await page.goto('/demo?guided=1');
  await answerToBrief(page, { email: 'flaky@harborgroup.test' });
  await choose(page, 'Looks right');
  await choose(page, 'No thanks');
  await expect(panel(page).getByText("I couldn't send that just now. Your answers are kept - try again in a moment.")).toBeVisible();
  await choose(page, 'Try again');
  await expect(panel(page).getByText('Your request is in. Pick a time that suits you - it takes a few seconds.')).toBeVisible();
  expect(keys).toHaveLength(2);
  expect(keys[0]).toBe(keys[1]);
  const result = await leads(request);
  expect(result.leads).toHaveLength(1);
  expect(result.attempts).toBe(2);
});

test('contact mode: pricing question gets a summary and a team reply; support gets a link and no lead', async ({ page, request }) => {
  test.skip(test.info().project.name === 'mobile', 'Covered on desktop.');
  await prepare(page);
  await page.goto('/contact?guided=1');
  await expect(panel(page).getByText("Hi, I'm Sundae. I'll make sure your message reaches the right people. First, what should I call you?")).toBeVisible();
  // Review repro: an email typed at the name prompt is refused, not greeted.
  await say(page, 'Your name', 'omar@harborgroup.com');
  await expect(panel(page).getByRole('alert')).toHaveText('Enter your name, not an email or a number');
  await expect(panel(page).getByText(/Nice to meet you, omar/)).toHaveCount(0);
  await say(page, 'Your name', 'Ana');
  await expect(panel(page).getByText('Nice to meet you, Ana. Which email should the team reply to?')).toBeVisible();
  await say(page, 'Work email', 'ana@harborgroup.com');
  await choose(page, 'Yes');
  await choose(page, 'Finance');
  await choose(page, '6-10');
  await choose(page, 'A pricing question');
  await say(page, 'Your message', 'Do you price per location?');
  await choose(page, 'Foodics');
  await choose(page, 'Yes');
  await expect(panel(page).getByText("Here's what I'll send the team:")).toBeVisible();
  await expect(panel(page).getByRole('heading', { name: 'Your message' })).toBeVisible();
  await choose(page, 'Looks right');
  await choose(page, 'No thanks');
  await expect(panel(page).getByText('Thanks, Ana. Your message is with the team.')).toBeVisible();
  await expect(panel(page).getByRole('button', { name: 'Choose a time' })).toHaveCount(0);
  const body = (await leads(request)).leads[0].body;
  expect(body.message).toBe('Do you price per location?\n\nTopic: A pricing question. Source: guided booking (contact).');
  expect(body.sourcePage).toBe('/contact');

  await request.get(`${FIXTURE}/leads/reset`);
  await page.evaluate(() => window.sessionStorage.clear());
  await page.goto('/contact?guided=1');
  await say(page, 'Your name', 'Ben');
  await say(page, 'Work email', 'ben@harborgroup.com');
  await choose(page, 'Yes');
  await choose(page, 'Operations');
  await choose(page, '1');
  await choose(page, 'Help with Sundae I already use');
  await expect(panel(page).getByRole('link', { name: 'Email support' })).toHaveAttribute('href', 'mailto:support@sundae.io');
  expect((await leads(request)).leads).toHaveLength(0);
});

test('get-started mode uses the pricing intent and submits', async ({ page, request }) => {
  test.skip(test.info().project.name === 'mobile', 'Covered on desktop.');
  await prepare(page);
  const intent: PricingIntent = {
    v: 2, layer: 'crew', corePackage: 'core_foundation', locations: 30, addOns: [], watchtowerModules: [], crewSkus: ['crew_scheduling'],
    crossIntelligence: 'none', billingCycle: 'monthly', operatingModels: [], employees: 300, payrollCountry: 'AE',
  };
  await page.goto(`/get-started?guided=1&cfg=${encodePricingIntent(intent)}`);
  await expect(panel(page).getByText(/You priced Crew Schedule for 30 locations/)).toBeVisible();
  await say(page, 'Your name', 'Mia');
  await say(page, 'Work email', 'mia@harborgroup.com');
  await choose(page, 'Yes');
  await choose(page, 'HR and people');
  await choose(page, 'Done · 1 selected');
  await choose(page, 'Foodics');
  await choose(page, 'Yes');
  await choose(page, 'Looks right');
  await choose(page, 'No thanks');
  await expect(panel(page).getByRole('button', { name: 'Choose a time' })).toBeVisible();
  expect((await leads(request)).leads[0].body).toMatchObject({ numberOfLocations: '26-50', sourcePage: '/get-started' });
});

test('split: one variant per visitor across visits, ?guided overrides without touching the cookie, classic still submits', async ({ page, request }) => {
  test.skip(test.info().project.name === 'mobile', 'Covered on desktop.');
  test.skip(PRODUCTION, 'Needs the dev server built with NEXT_PUBLIC_GUIDED_BOOKING=split.');
  await prepare(page);
  await page.goto('/demo');
  await expect(page.locator('[data-guided-booking], #demo-form #name').first()).toBeVisible();
  const cookie = (await page.context().cookies()).find((item) => item.name === 'sundae_lead_variant');
  expect(['guided', 'classic']).toContain(cookie?.value);
  expect(cookie?.sameSite).toBe('Lax');
  expect(cookie!.expires - Date.now() / 1000).toBeGreaterThan(89 * 86400);
  for (let visit = 0; visit < 2; visit++) {
    await page.goto('/contact');
    if (cookie?.value === 'guided') await expect(panel(page)).toBeVisible();
    else await expect(page.locator('form #name')).toBeVisible();
  }
  // Force the opposite with the QA override; the stored assignment is unchanged.
  await page.goto(`/demo?guided=${cookie?.value === 'guided' ? '0' : '1'}`);
  if (cookie?.value === 'guided') await expect(page.locator('#demo-form form #name')).toBeVisible();
  else await expect(panel(page)).toBeVisible();
  expect((await page.context().cookies()).find((item) => item.name === 'sundae_lead_variant')?.value).toBe(cookie?.value);

  // The classic variant keeps its existing /demo heading.
  await page.goto('/demo?guided=0');
  await expect(page.getByRole('heading', { level: 2, name: 'Request Your Demo' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Tell us about your operation' })).toHaveCount(0);

  // The classic variant submits on every surface, unchanged (phone required, no token returned).
  for (const path of ['/demo', '/contact', '/get-started']) {
    await page.goto(`${path}?guided=0`);
    await page.locator('#name').fill('Classic Visitor');
    await page.locator('#email').fill('classic@harborgroup.com');
    await page.locator('#company').fill('Harbor');
    await page.locator('#role').fill('Owner');
    await page.locator('#country').selectOption('United Arab Emirates');
    await page.locator('#phone').fill('501234567');
    await page.locator('#numberOfLocations').selectOption('2-5');
    await page.locator('#primaryPOS').fill('Toast');
    const response = page.waitForResponse('**/api/cta/submit');
    await page.locator('form button[type=submit]').click();
    const json = await (await response).json();
    expect(json.success).toBe(true);
    expect(json.bookingToken).toBeUndefined();
  }
  const stored = (await leads(request)).leads;
  expect(stored).toHaveLength(3);
  expect(stored.every((lead) => !(lead.body.metadata as Record<string, unknown>).convo)).toBe(true);
});

test('analytics: every event carries variant and surface and no personal data', async ({ page }) => {
  test.skip(test.info().project.name === 'mobile', 'Covered on desktop.');
  test.skip(PRODUCTION, 'The analytics test seam exists only in development builds.');
  await prepare(page);
  await page.goto('/demo?guided=1');
  await answerToBrief(page);
  await panel(page).getByRole('button', { name: 'Edit your answer: Operations' }).click();
  await choose(page, 'Operations');
  await choose(page, 'Looks right');
  await say(page, 'Phone number', '50 123 4567');
  await expect(panel(page).getByRole('button', { name: 'Choose a time' })).toBeVisible();
  const captured = await events(page);
  const names = captured.map((item) => item.event);
  for (const name of ['guided_booking_started', 'lead_form_started', 'guided_booking_step_answered', 'guided_booking_step_edited',
    'guided_booking_brief_shown', 'lead_form_submit_attempted', 'lead_form_submitted', 'guided_booking_submitted']) {
    expect(names, name).toContain(name);
  }
  for (const item of captured) {
    expect(item.properties, item.event).toMatchObject({ variant: 'guided', surface: 'demo' });
  }
  const serialized = JSON.stringify(captured);
  for (const value of PRIVATE_DATA) expect(serialized).not.toContain(value);
  expect(captured.find((item) => item.event === 'guided_booking_submitted')?.properties).toMatchObject({ locations: '11-25', focus: ['tasks_logbook', 'margin_performance'] });
});

test('keyboard-only completion and reduced motion', async ({ page, request }) => {
  test.skip(test.info().project.name === 'mobile', 'Keyboard flow is a desktop check.');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await prepare(page);
  await page.goto('/demo?guided=1');
  await panel(page).getByLabel('Your name', { exact: true }).focus();
  await page.keyboard.type('Kay Board');
  await page.keyboard.press('Enter');
  // Reduced motion: no typing indicator; the next control is focused at once.
  await expect(panel(page).locator('[data-typing]')).toHaveCount(0);
  await expect(panel(page).getByLabel('Work email', { exact: true })).toBeFocused();
  await page.keyboard.type('kay@harborgroup.com');
  await page.keyboard.press('Enter');
  await expect(panel(page).getByRole('button', { name: 'Yes', exact: true })).toBeFocused();
  await page.keyboard.press('Enter'); // Yes, Harborgroup
  await expect(panel(page).getByRole('button', { name: 'Owner or CEO' })).toBeFocused();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter'); // Operations
  await expect(panel(page).getByRole('button', { name: '1', exact: true })).toBeFocused();
  await page.keyboard.press('Enter'); // 1
  await expect(panel(page).getByRole('button', { name: 'Scheduling and attendance' })).toBeFocused();
  await page.keyboard.press('Space');
  for (let i = 0; i < 7; i++) await page.keyboard.press('Tab');
  await expect(panel(page).getByRole('button', { name: 'Done · 1 selected' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(panel(page).getByRole('button', { name: 'Foodics' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(panel(page).getByRole('button', { name: 'Yes', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(panel(page).getByRole('button', { name: 'Looks right' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(panel(page).getByLabel('Phone number')).toBeFocused();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(panel(page).getByRole('button', { name: 'No thanks' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(panel(page).getByRole('button', { name: 'Choose a time' })).toBeFocused();
  expect((await leads(request)).leads).toHaveLength(1);
});
