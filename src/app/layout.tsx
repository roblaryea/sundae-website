import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PostHogProvider } from "@/components/PostHogProvider";
import { CookieConsent } from "@/components/CookieConsent";
import { ThemeProvider, ThemeScript } from "@/components/ui/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sundae.io'),
  title: {
    default: "Sundae – Decision Intelligence for Restaurants",
    template: "%s | Sundae",
  },
  description: "The AI platform that turns restaurant data into action — unify POS, labor, cost, and operational data to benchmark performance and get instant insights.",
  keywords: ["restaurant analytics", "decision intelligence", "restaurant benchmarks", "4D intelligence", "restaurant AI", "multi-location restaurants", "F&B analytics"],
  authors: [{ name: "Sundae Team" }],
  creator: "Sundae",
  publisher: "Sundae",
  icons: {
    icon: [
      { url: "/logos/sundae-orb.png", type: "image/png" },
    ],
    apple: [
      { url: "/logos/sundae-orb.png", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sundae",
  },
  openGraph: {
    type: "website",
    siteName: "Sundae",
    title: "Sundae – Decision Intelligence for Restaurants",
    description: "The AI platform that turns restaurant data into action — unify POS, labor, and operational data to benchmark performance.",
    images: [
      {
        url: "/logos/sundae-orb.png",
        width: 1200,
        height: 630,
        alt: "Sundae – Restaurant Decision Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sundae – Decision Intelligence for Restaurants",
    description: "The AI platform that turns restaurant data into action — unify POS, labor, and operational data to benchmark performance.",
    images: ["/logos/sundae-orb.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export function generateViewport() {
  return {
    themeColor: "#0f172a",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="preload" href="/logos/sundae-wordmark.png" as="image" />
        <link rel="preload" href="/logos/sundae-orb.png" as="image" />
      </head>

      <body className="antialiased overflow-x-hidden bg-[var(--navy-deep)] text-[var(--text-primary)] transition-colors duration-300">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <Suspense fallback={null}>
          <PostHogProvider>
            <ThemeProvider>
              <header role="banner">
                <Navbar />
              </header>
              <main id="main-content" className="min-h-screen overflow-x-hidden" role="main">
                <Breadcrumbs className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-2" />
                {children}
              </main>
              <Footer />
              <Analytics />
              <CookieConsent />
            </ThemeProvider>
          </PostHogProvider>
        </Suspense>
      </body>
    </html>
  );
}
