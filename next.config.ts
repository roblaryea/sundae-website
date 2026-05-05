import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const pricingUrl = (process.env.NEXT_PUBLIC_PRICING_URL || 'https://pricing.sundae.io').replace(/\/+$/, '');

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.posthog.com https://*.google-analytics.com https://*.googletagmanager.com https://*.sentry.io https://*.vercel-scripts.com https://va.vercel-scripts.com https://vercel.live",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https: http:",
              "font-src 'self' https://fonts.gstatic.com data:",
              "connect-src 'self' https://*.posthog.com https://*.google-analytics.com https://*.googletagmanager.com https://*.sentry.io https://*.ingest.sentry.io https://*.vercel-insights.com https://vercel.live https://vitals.vercel-insights.com https://*.clickup.com",
              "frame-src 'self' https://vercel.live",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/pricing',
        destination: pricingUrl,
        permanent: true,
      },
      {
        source: '/pricing/:path*',
        destination: `${pricingUrl}/:path*`,
        permanent: true,
      },
      {
        source: '/signin',
        destination: '/sign-in',
        permanent: true,
      },
      {
        source: '/product/sundae-report',
        destination: '/report',
        permanent: true,
      },
      {
        source: '/support',
        destination: '/contact',
        permanent: false,
      },
      {
        source: '/solutions/operations-leaders',
        destination: '/solutions/regional-managers',
        permanent: true,
      },
      {
        source: '/product/scout',
        destination: '/integrations',
        permanent: true,
      },
      {
        source: '/product/forge',
        destination: '/intelligence',
        permanent: true,
      },
      {
        source: '/product/canvas',
        destination: '/product',
        permanent: true,
      },
      {
        source: '/canvas',
        destination: '/product',
        permanent: true,
      },
      {
        source: '/nexus',
        destination: '/intelligence',
        permanent: true,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  sourcemaps: {
    filesToDeleteAfterUpload: ["./next/**/*.map"],
  },
});
