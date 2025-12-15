import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sundae.ai'),
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
      { url: "/logos/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logos/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/logos/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
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
        url: "/logos/sundae-og.png",
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
    images: ["/logos/sundae-og.png"],
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
    themeColor: "#0A1E8C",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/logos/sundae-wordmark.png" as="image" />
        <link rel="preload" href="/logos/sundae-orb.png" as="image" />
      </head>
      
      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID || 'G-XXXXXXXXXX'}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID || 'G-XXXXXXXXXX'}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <header role="banner">
          <Navbar />
        </header>
        <main id="main-content" className="min-h-screen overflow-x-hidden" role="main">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
