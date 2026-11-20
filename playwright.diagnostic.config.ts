import { defineConfig, devices } from '@playwright/test';

// Operations Diagnostic end to end against a production build and a local
// backend fixture. No AI provider keys are passed, so the route returns the
// rules report; leads go to the fixture only (".test" addresses).
export default defineConfig({
  testDir: './tests/diagnostic-e2e',
  timeout: 90_000,
  expect: { timeout: 20_000 },
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:4320', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
  webServer: [
    { command: 'node tests/diagnostic-e2e/backend-fixture.mjs', url: 'http://127.0.0.1:4321/health', reuseExistingServer: false },
    {
      // Bound to all interfaces on purpose: with --hostname 127.0.0.1 the
      // locale proxy's rewrite targets localhost and every /ar, /de ... page
      // redirects to itself (local-only; /ar/demo on main does the same).
      command: 'npm run start -- --port 4320',
      url: 'http://127.0.0.1:4320',
      timeout: 180_000,
      reuseExistingServer: false,
      env: {
        SUNDAE_BACKEND_URL: 'http://127.0.0.1:4321',
        MARKETING_LEAD_HMAC_SECRET: 'diagnostic-e2e-fixture-secret',
        LEAD_BACKEND: 'sundae',
        OPENAI_API_KEY: '',
        ANTHROPIC_API_KEY: '',
        AI_GATEWAY_API_KEY: '',
        VERCEL_OIDC_TOKEN: '',
      },
    },
  ],
});
