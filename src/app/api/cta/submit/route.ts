/**
 * CTA submission endpoint - receives lead-capture form submissions from
 * the marketing site and forwards them to the Sundae backend at
 * POST /api/v1/public/marketing/leads (HMAC-signed).
 *
 * The Sundae backend:
 *   - persists to `marketing_leads`
 *   - sends the branded auto-response from sales@sundaetechnologies.com
 *     via Microsoft Graph send-as
 *   - notifies the admin pool (email + in-app + telegram)
 *
 * Admins triage and follow up from /admin/marketing/leads in sundae-app.
 *
 * The legacy ClickUp + Google Sheets integration was removed on cutover.
 */

import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import {
  isSundaeBackendConfigured,
  submitLeadToSundae,
  type SundaeLeadPayload,
} from '@/lib/sundaeLeadClient';
import { normalizeWebsiteLocale } from '@/lib/i18n';

// Force Node.js runtime (required for crypto)
export const runtime = 'nodejs';

// ------------------------------------
// Rate limiting (in-memory, per IP)
// ------------------------------------
const submissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const times = submissions.get(ip)?.filter(t => now - t < RATE_LIMIT_WINDOW_MS) || [];
  if (times.length >= RATE_LIMIT_MAX) {
    submissions.set(ip, times);
    return true;
  }
  times.push(now);
  submissions.set(ip, times);
  return false;
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID();
  const startTime = Date.now();

  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';

  if (isRateLimited(ip)) {
    console.warn(`[${requestId}] Rate limited IP: ${ip}`);
    return NextResponse.json(
      {
        success: false,
        error: 'Too many submissions. Please try again later.',
        requestId,
      },
      { status: 429, headers: { 'Retry-After': '3600' } }
    );
  }

  console.log(`[${requestId}] ===== CTA SUBMISSION START =====`);

  if (!isSundaeBackendConfigured()) {
    console.error(`[${requestId}] Sundae backend not configured: SUNDAE_BACKEND_URL + MARKETING_LEAD_HMAC_SECRET required`);
    return NextResponse.json(
      {
        success: false,
        error: 'Lead capture backend is misconfigured. Please contact support.',
        requestId,
      },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const {
      name,
      email,
      company,
      role,
      country,
      countryCode,
      phone,
      numberOfLocations,
      primaryPOS,
      message,
      ctaLabel,
      sourcePage,
      utmSource,
      utmMedium,
      utmCampaign,
      locale,
      metadata,
    } = body;
    const normalizedLocale = normalizeWebsiteLocale(locale);

    // Validate required fields
    const missingFields: string[] = [];
    if (!name?.trim()) missingFields.push('name');
    if (!email?.trim()) missingFields.push('email');
    if (!company?.trim()) missingFields.push('company');
    if (!role?.trim()) missingFields.push('role');
    if (!country?.trim()) missingFields.push('country');
    if (!phone?.trim()) missingFields.push('phone');
    if (!numberOfLocations?.trim()) missingFields.push('numberOfLocations');
    if (!primaryPOS?.trim()) missingFields.push('primaryPOS');
    if (!message?.trim()) missingFields.push('message');

    if (missingFields.length > 0) {
      console.error(`[${requestId}] Validation failed: missing fields`, missingFields);
      return NextResponse.json(
        {
          success: false,
          error: 'Missing or invalid required fields',
          invalidFields: missingFields,
          requestId,
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email address',
          invalidFields: ['email'],
          requestId,
        },
        { status: 400 }
      );
    }

    const phoneDigits = phone.replace(/[\s\-()]/g, '');
    if (!/\d{6,}/.test(phoneDigits)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid phone number',
          invalidFields: ['phone'],
          requestId,
        },
        { status: 400 }
      );
    }

    console.log(`[${requestId}] Validation passed for ${email}`);

    const sundaePayload: SundaeLeadPayload = {
      fullName: name,
      email,
      company: company || null,
      role: role || null,
      country: country || null,
      countryCode: countryCode || null,
      phone: phone || null,
      primaryPos: primaryPOS || null,
      numberOfLocations: numberOfLocations || null,
      message: message || null,
      ctaLabel: ctaLabel || null,
      sourcePage: sourcePage || null,
      utmSource: utmSource || null,
      utmMedium: utmMedium || null,
      utmCampaign: utmCampaign || null,
      referrerUrl: request.headers.get('referer'),
      locale: normalizedLocale,
      // Merge caller-supplied metadata (e.g. the diagnostic responses + AI
      // report + internal aiSource) so the backend can email the branded
      // report and surface the assessment in admin. Our own keys win.
      metadata: {
        ...(metadata && typeof metadata === 'object' ? (metadata as Record<string, unknown>) : {}),
        locale: normalizedLocale,
        requestId,
        websiteIp: ip,
      },
    };

    const sundaeResult = await submitLeadToSundae(sundaePayload);
    console.log(`[${requestId}] Sundae backend submit:`, {
      ok: sundaeResult.ok,
      status: sundaeResult.status,
      leadId: sundaeResult.leadId,
      error: sundaeResult.error,
      durationMs: Date.now() - startTime,
    });

    if (!sundaeResult.ok) {
      // Surface a generic error to the user but keep the request_id so
      // admins can trace through Vercel logs + Railway logs to find the
      // root cause. The form will let the user retry.
      return NextResponse.json(
        {
          success: false,
          error: 'We could not record your request right now. Please try again in a few minutes.',
          requestId,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your request has been received. A Sundae specialist will respond within 48 hours.',
      leadId: sundaeResult.leadId,
      leadNumber: sundaeResult.leadNumber,
      submissionId: sundaeResult.leadId,
      requestId,
    });
  } catch (err) {
    console.error(`[${requestId}] Unexpected error:`, err instanceof Error ? err.message : err);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again.',
        requestId,
      },
      { status: 500 }
    );
  }
}
