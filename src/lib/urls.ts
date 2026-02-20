/**
 * External URL Constants
 *
 * Single source of truth for all external Sundae URLs.
 * Values are driven by environment variables so the same codebase
 * works across local dev, preview deploys, and production.
 *
 * Required env vars (set in Vercel / .env.local):
 *   NEXT_PUBLIC_APP_URL        – Sundae web-app root  (default: https://app.sundaetech.ai)
 *   NEXT_PUBLIC_SITE_URL       – Marketing site root   (default: https://sundae.io)
 *   NEXT_PUBLIC_PRICING_URL    – Pricing micro-site    (default: https://pricing.sundae.io)
 *   NEXT_PUBLIC_REPORT_APP_URL – Report app root       (default: https://report.sundae.io)
 *   NEXT_PUBLIC_CORE_APP_URL   – Core app root         (default: https://core.sundae.io)
 */

/** Strip trailing slashes so consumers can append paths safely. */
function clean(url: string): string {
  return url.replace(/\/+$/, '');
}

/** Sundae web-app (auth, dashboard, etc.) */
export const APP_URL = clean(
  process.env.NEXT_PUBLIC_APP_URL || 'https://app.sundaetech.ai',
);

/** Main marketing website (canonical) */
export const SITE_URL = clean(
  process.env.NEXT_PUBLIC_SITE_URL || 'https://sundae.io',
);

/** Pricing micro-site */
export const PRICING_URL = clean(
  process.env.NEXT_PUBLIC_PRICING_URL || 'https://pricing.sundae.io',
);

/** Sundae Report application (free trial / access) */
export const REPORT_APP_URL = clean(
  process.env.NEXT_PUBLIC_REPORT_APP_URL || 'https://report.sundae.io',
);

/** Sundae Core application */
export const CORE_APP_URL = clean(
  process.env.NEXT_PUBLIC_CORE_APP_URL || 'https://core.sundae.io',
);

/** Demo booking URL (if external) */
export const DEMO_URL = '/demo'; // Internal for now

/** Sign in URL — derived from APP_URL */
export const SIGNIN_URL = `${APP_URL}/sign-in`;

/** Sign up URL — derived from APP_URL */
export const SIGNUP_URL = `${APP_URL}/sign-up`;

/**
 * Back-link to marketing site (for use from the app project).
 * Alias kept explicit so the app codebase can import MARKETING_URL
 * instead of guessing which constant to use.
 */
export const MARKETING_URL = SITE_URL;
