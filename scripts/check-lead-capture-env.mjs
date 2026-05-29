#!/usr/bin/env node

const mode = (process.env.LEAD_BACKEND ?? 'sundae').toLowerCase();
const usesSundae = mode === 'sundae' || mode === 'both';

const missing = [];
if (usesSundae) {
  if (!process.env.SUNDAE_BACKEND_URL) missing.push('SUNDAE_BACKEND_URL');
  if (!process.env.MARKETING_LEAD_HMAC_SECRET) missing.push('MARKETING_LEAD_HMAC_SECRET');
}

if (missing.length > 0) {
  console.error(
    [
      'Lead capture is configured to forward leads to Sundae Admin, but required env is missing.',
      `LEAD_BACKEND=${mode}`,
      `Missing: ${missing.join(', ')}`,
      '',
      'Set these on the website deployment and set the same MARKETING_LEAD_HMAC_SECRET on sundae-backend.',
    ].join('\n')
  );
  process.exit(1);
}

console.log(`Lead capture env OK (LEAD_BACKEND=${mode}).`);
