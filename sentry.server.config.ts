import * as Sentry from "@sentry/nextjs";
import { resolveSentryEnvironment } from "./src/lib/observability/sentry-runtime-policy.mjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: resolveSentryEnvironment({
    publicSiteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    vercelEnvironment: process.env.VERCEL_ENV,
    nodeEnvironment: process.env.NODE_ENV,
  }),
});
