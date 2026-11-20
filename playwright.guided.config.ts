import { defineConfig, devices } from '@playwright/test';

// Guided booking flows against the local backend fixture (never a real
// backend). The dev server runs with NEXT_PUBLIC_GUIDED_BOOKING=split so the
// cookie split is exercised; `?guided=1|0` forces a variant per test.
//
// GUIDED_E2E_PRODUCTION=1 runs `next start` on an existing `npm run build`
// instead: the variable is then whatever the build had (unset = off, the
// state merging ships), and `?guided=1` still opens guided booking. Use it for
// non-English locales and the screenshot matrix: a dev server bound to
// 127.0.0.1 redirect-loops locale-prefixed paths (/ar/demo), and without the
// bind its HMR socket is refused for 127.0.0.1, so pages never hydrate.
const production = process.env.GUIDED_E2E_PRODUCTION === '1';
export default defineConfig({
  testDir: './tests/guided-booking-e2e',
  timeout: 120_000,
  expect: { timeout: 15_000 },
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:4330', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
  webServer: [
    { command: 'node tests/booking-e2e/backend-fixture.mjs', url: 'http://127.0.0.1:4311/health', reuseExistingServer: true },
    {
      command: production ? 'npm run start -- --port 4330' : 'npm run dev -- --hostname 127.0.0.1 --port 4330',
      url: 'http://127.0.0.1:4330',
      timeout: 180_000,
      reuseExistingServer: false,
      env: {
        SUNDAE_BACKEND_URL: 'http://127.0.0.1:4311',
        MARKETING_LEAD_HMAC_SECRET: 'fixture-secret',
        ...(production ? {} : { NEXT_PUBLIC_GUIDED_BOOKING: 'split' }),
      },
    },
  ],
});
