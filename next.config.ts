import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/pricing',
        destination: 'https://pricing.sundae.io',
        permanent: true, // 308 permanent redirect
      },
      {
        source: '/pricing/:path*',
        destination: 'https://pricing.sundae.io/:path*',
        permanent: true, // 308 permanent redirect
      },
      {
        source: '/signin',
        destination: '/sign-in',
        permanent: true, // 308 permanent redirect - canonicalize auth route
      },
    ];
  },
};

export default nextConfig;
