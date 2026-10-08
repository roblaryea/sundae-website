import * as Sentry from "@sentry/nextjs";
import { resolveSentryEnvironment } from "./src/lib/observability/sentry-runtime-policy.mjs";
import { containsBookingData } from './src/lib/booking/privacy';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  beforeSend: (event) => containsBookingData(event) ? null : event,
  beforeSendTransaction: (event) => containsBookingData(event) ? null : event,
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: resolveSentryEnvironment({
    publicSiteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    vercelEnvironment: process.env.VERCEL_ENV,
    nodeEnvironment: process.env.NODE_ENV,
  }),
});
