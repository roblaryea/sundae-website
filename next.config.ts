import type { NextConfig } from "next";

const pricingUrl = (process.env.NEXT_PUBLIC_PRICING_URL || 'https://pricing.sundae.io').replace(/\/+$/, '');

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/pricing',
        destination: pricingUrl,
        permanent: true, // 308 permanent redirect
      },
      {
        source: '/pricing/:path*',
        destination: `${pricingUrl}/:path*`,
        permanent: true, // 308 permanent redirect
      },
      {
        source: '/signin',
        destination: '/sign-in',
        permanent: true, // 308 permanent redirect - canonicalize auth route
      },
      {
        source: '/product/sundae-report',
        destination: '/report',
        permanent: true, // 308 permanent redirect - consolidate duplicate product page
      },
      {
        source: '/support',
        destination: '/contact',
        permanent: false, // 307 temporary redirect - may become its own page later
      },
    ];
  },
};

export default nextConfig;
