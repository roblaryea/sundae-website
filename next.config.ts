import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import { withBotId } from "botid/next/config";

const pricingUrl = (process.env.NEXT_PUBLIC_PRICING_URL || 'https://pricing.sundae.io').replace(/\/+$/, '');

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  // Tree-shake the two barrel libraries imported across almost every route
  // bundle. framer-motion (via PageAnimations) and lucide-react ship large
  // index barrels; optimizePackageImports rewrites them to per-export deep
  // imports so each route only pays for what it uses, trimming the shared
  // client chunk loaded on first paint. (3D libs are already dynamic()-split.)
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  // Hide the Next.js dev indicator (the circular "N" bottom-left) - it overlapped
  // content during mobile review. Dev-only; never shipped to production anyway.
  devIndicators: false,
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
      // Core product pages unified under /product/* — keep old top-level URLs working
      {
        source: '/intelligence',
        destination: '/product/intelligence',
        permanent: true,
      },
      {
        source: '/insights',
        destination: '/product/insights',
        permanent: true,
      },
      {
        source: '/benchmarking',
        destination: '/product/benchmarking',
        permanent: true,
      },
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
      // Sundae Report was a product line built entirely on the Report
      // Lite/Plus/Pro ladder, which price book v1.7 retires. Its surfaces are
      // gone rather than restated, because there is no v1.7 SKU to restate
      // them as. Benchmarking survives as a capability inside every Core
      // package, so that is where the old Report URLs land; the Report-vs-Core
      // comparison has no successor question and goes to the product hub.
      {
        source: '/product/sundae-report',
        destination: '/product/benchmarking',
        permanent: true,
      },
      {
        source: '/report',
        destination: '/product/benchmarking',
        permanent: true,
      },
      {
        source: '/report-vs-core',
        destination: '/product',
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

export default withBotId(
  withSentryConfig(nextConfig, {
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    silent: !process.env.CI,
    sourcemaps: {
      filesToDeleteAfterUpload: ["./next/**/*.map"],
    },
  }),
);
