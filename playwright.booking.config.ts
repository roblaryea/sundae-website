import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/booking-e2e',
  timeout: 60_000,
  expect: { timeout: 15_000 },
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:4310', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
  webServer: [
    { command: 'node tests/booking-e2e/backend-fixture.mjs', url: 'http://127.0.0.1:4311/health', reuseExistingServer: false },
    { command: process.env.BOOKING_E2E_PRODUCTION === '1' ? 'npm run start -- --hostname 127.0.0.1 --port 4310' : 'npm run dev -- --hostname 127.0.0.1 --port 4310', url: 'http://127.0.0.1:4310', timeout: 180_000,
      env: { SUNDAE_BACKEND_URL: 'http://127.0.0.1:4311' }, reuseExistingServer: false },
  ],
});
