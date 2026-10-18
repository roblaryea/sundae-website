/**
 * External URL Constants
 *
 * Single source of truth for all external Sundae URLs.
 * Values are driven by environment variables so the same codebase
 * works across local dev, preview deploys, and production.
 *
 * Required env vars (set in Vercel / .env.local):
 *   NEXT_PUBLIC_APP_URL        - Sundae web-app root  (default: https://app.sundaetech.ai)
 *   NEXT_PUBLIC_SITE_URL       - Marketing site root   (default: https://www.sundae.io)
 *   NEXT_PUBLIC_PRICING_URL    - Pricing micro-site    (default: https://pricing.sundae.io)
 *   NEXT_PUBLIC_REPORT_APP_URL - Report app root       (default: https://report.sundae.io)
 *   NEXT_PUBLIC_CORE_APP_URL   - Core app root         (default: https://core.sundae.io)
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
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sundae.io',
);

/** Pricing micro-site */
export const PRICING_URL = clean(
  process.env.NEXT_PUBLIC_PRICING_URL || 'https://pricing.sundae.io',
);

/**
 * Sundae Report application (free trial / access).
 * Falls back to the main app sign-up page since Report
 * is now part of the unified Sundae app (no separate deployment).
 */
export const REPORT_APP_URL = clean(
  process.env.NEXT_PUBLIC_REPORT_APP_URL || `${APP_URL}/sign-up`,
);

/** Sundae Core application */
export const CORE_APP_URL = clean(
  process.env.NEXT_PUBLIC_CORE_APP_URL || 'https://core.sundae.io',
);

/** Demo booking URL (if external) */
export const DEMO_URL = '/demo'; // Internal for now

/** Sign in URL - derived from APP_URL */
export const SIGNIN_URL = `${APP_URL}/sign-in`;

/** Sign up URL - derived from APP_URL */
export const SIGNUP_URL = `${APP_URL}/sign-up`;

/** Keep an internal post-auth destination when crossing from the website to the app. */
export function appAuthUrl(authUrl: string, returnUrl: unknown): string {
  if (typeof returnUrl !== 'string' || returnUrl.length > 6000 ||
    !returnUrl.startsWith('/') || returnUrl.startsWith('//') ||
    /[\\\u0000-\u001f\u007f]/.test(returnUrl)) return authUrl;
  try {
    const appOrigin = new URL(APP_URL).origin;
    const destination = new URL(returnUrl, appOrigin);
    // Encoded separators/control characters must not become an external URL
    // when a later auth step decodes the path.
    const decodedPath = decodeURIComponent(destination.pathname);
    if (destination.origin !== appOrigin || decodedPath.startsWith('//') ||
      /[\\\u0000-\u001f\u007f]/.test(decodedPath)) return authUrl;
    const url = new URL(authUrl);
    url.searchParams.set('returnUrl', returnUrl);
    return url.toString();
  } catch {
    return authUrl;
  }
}

/**
 * Back-link to marketing site (for use from the app project).
 * Alias kept explicit so the app codebase can import MARKETING_URL
 * instead of guessing which constant to use.
 */
export const MARKETING_URL = SITE_URL;
