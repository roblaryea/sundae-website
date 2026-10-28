import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const leadFormSource = await readFile(
  new URL('../src/components/marketing/LeadCaptureForm.tsx', import.meta.url),
  'utf8',
);

test('lead form records non-PII engagement before validation and submission', () => {
  assert.match(leadFormSource, /trackEvent\('lead_form_started', analyticsContext\(\)\)/);
  assert.match(leadFormSource, /trackEvent\('lead_form_submit_attempted', analyticsContext\(\)\)/);
  assert.match(leadFormSource, /cta_label: ctaLabel/);
  assert.match(leadFormSource, /source_page: window\.location\.pathname/);
});

test('honeypot interactions are excluded from form-start tracking', () => {
  assert.match(
    leadFormSource,
    /event\.target\.getAttribute\('name'\) !== 'website_url'/,
  );
});
