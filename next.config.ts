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
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  sourcemaps: {
    deleteFilesAfterUpload: ["./next/**/*.map"],
  },
});
