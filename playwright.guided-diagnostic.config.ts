import { defineConfig, devices } from '@playwright/test';

// Guided Operations Diagnostic (Phases B and C) against the local booking
// backend fixture (tests/booking-e2e/backend-fixture.mjs): leads with a
// booking token for new work-email leads that carry metadata.convo, and the
// booking screen. Never a real backend; every address is a ".test" one. No AI
// keys are passed, so /api/diagnostic returns the rules report.
//
// The variable NEXT_PUBLIC_GUIDED_DIAGNOSTIC is left unset (the state merging
// ships); `?guided=1` opens the conversation.
//
// By default this runs `next dev` (English only, with the analytics test seam).
// DIAGNOSTIC_E2E_PRODUCTION=1 runs `next start` on an existing `npm run build`
// for the Arabic, German and screenshot paths: a dev server bound to
// 127.0.0.1 redirect-loops locale-prefixed paths.
const production = process.env.DIAGNOSTIC_E2E_PRODUCTION === '1';
export default defineConfig({
  testDir: './tests/guided-diagnostic-e2e',
  timeout: 150_000,
  expect: { timeout: 20_000 },
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:4340', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
  webServer: [
    { command: 'node tests/booking-e2e/backend-fixture.mjs', url: 'http://127.0.0.1:4311/health', reuseExistingServer: true },
    {
      // Production binds to all interfaces (see playwright.diagnostic.config.ts).
      command: production ? 'npm run start -- --port 4340' : 'npm run dev -- --hostname 127.0.0.1 --port 4340',
      url: 'http://127.0.0.1:4340',
      timeout: 180_000,
      reuseExistingServer: false,
      env: {
        SUNDAE_BACKEND_URL: 'http://127.0.0.1:4311',
        MARKETING_LEAD_HMAC_SECRET: 'fixture-secret',
        OPENAI_API_KEY: '',
        ANTHROPIC_API_KEY: '',
        AI_GATEWAY_API_KEY: '',
        VERCEL_OIDC_TOKEN: '',
      },
    },
  ],
});
