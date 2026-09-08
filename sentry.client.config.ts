import * as Sentry from "@sentry/nextjs";
import { getSentryClientReplayPolicy } from "./src/lib/observability/sentry-runtime-policy.mjs";

const replayPolicy = getSentryClientReplayPolicy({
  hostname: window.location.hostname,
  publicSiteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  vercelEnvironment: process.env.NEXT_PUBLIC_VERCEL_ENV,
  nodeEnvironment: process.env.NODE_ENV,
});

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: replayPolicy.replaysSessionSampleRate,
  replaysOnErrorSampleRate: replayPolicy.replaysOnErrorSampleRate,
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: replayPolicy.environment,
  integrations:
    replayPolicy.replaysOnErrorSampleRate > 0
      ? [
          Sentry.replayIntegration({
            maskAllText: true,
            maskAllInputs: true,
          }),
        ]
      : [],
});
