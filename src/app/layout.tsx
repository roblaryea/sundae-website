import type { Metadata } from "next";
import { Suspense } from "react";
import { Fraunces, Hanken_Grotesk, Geist_Mono } from "next/font/google";
import { cookies, headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import { BotIdClient } from "botid/client";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PostHogProvider } from "@/components/PostHogProvider";
import { CookieConsent } from "@/components/CookieConsent";
import { ThemeProvider, ThemeScript } from "@/components/ui/ThemeProvider";
import {
  WEBSITE_PUBLIC_PATH_HEADER,
  buildWebsiteAlternateUrls,
  getWebsiteMessages,
  getLocalizedPathname,
  normalizeWebsitePathname,
  parseWebsiteLocaleFromPathname,
  resolveWebsiteLocale,
  type WebsiteMessages,
  websiteLocaleDirection,
} from "@/lib/i18n";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";

// Display - warm, optical serif for headlines & key numbers (the human, premium voice).
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  // Expose Fraunces' character axes so the logotype can force the warm display
  // cut (high opsz) + soft, wonky letterforms even at small navbar sizes -
  // otherwise automatic optical sizing falls back to the plain "text" cut and
  // the wordmark reads bland / generic-serif.
  axes: ["opsz", "SOFT", "WONK"],
});

// Body / UI - friendly, legible grotesk; the default sans (replaces Geist).
const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

// Mono - retained for tabular / data labels.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const locale = resolveWebsiteLocale(cookieStore);
  const messages = getWebsiteMessages(locale) as WebsiteMessages;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sundae.io';
  const publicPath = headerStore.get(WEBSITE_PUBLIC_PATH_HEADER) || '/';
  const { pathname: canonicalPath } = parseWebsiteLocaleFromPathname(publicPath);
  const localizedCanonicalPath = getLocalizedPathname(normalizeWebsitePathname(canonicalPath), locale);
  const alternates = buildWebsiteAlternateUrls(canonicalPath, baseUrl);

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: messages.metadata.title,
      template: "%s | Sundae",
    },
    description: messages.metadata.description,
    alternates: {
      canonical: localizedCanonicalPath,
      languages: alternates.languages,
    },
    keywords: ["restaurant analytics", "decision intelligence", "restaurant benchmarks", "4D intelligence", "restaurant AI", "multi-location restaurants", "F&B analytics"],
    authors: [{ name: "Sundae Team" }],
    creator: "Sundae",
    publisher: "Sundae",
    icons: {
      icon: [
        { url: "/logos/sundae-app-icon.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/logos/sundae-app-icon.png", sizes: "512x512", type: "image/png" },
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
      title: messages.metadata.title,
      description: messages.metadata.description,
      url: new URL(localizedCanonicalPath, baseUrl).toString(),
      images: [
        {
          url: "/logos/og-card.png",
          width: 1200,
          height: 630,
          alt: messages.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.metadata.title,
      description: messages.metadata.description,
      images: ["/logos/og-card.png"],
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
}

export function generateViewport() {
  return {
    themeColor: "#15110D",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = resolveWebsiteLocale(cookieStore);
  const messages = getWebsiteMessages(locale) as WebsiteMessages;
  const dir = websiteLocaleDirection[locale];

  return (
    <html lang={locale} dir={dir} className={`${fraunces.variable} ${hankenGrotesk.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
        {/* Vercel BotID - instruments the expensive AI diagnostic endpoint so
            bots/crawlers are classified client-side and rejected server-side
            (see src/app/api/diagnostic/route.ts) before any paid model call. */}
        <BotIdClient protect={[{ path: "/api/diagnostic", method: "POST" }]} />
      </head>

      <body className="relative antialiased overflow-x-hidden bg-[var(--navy-deep)] text-[var(--text-primary)] transition-colors duration-300">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#FF5C4D] focus:text-white focus:rounded-lg focus:outline-none"
        >
          {messages.layout.skipToContent}
        </a>
        <Suspense fallback={null}>
          <PostHogProvider>
            <LocaleProvider initialLocale={locale}>
              <ThemeProvider>
                <header role="banner">
                  <Navbar />
                </header>
                <main id="main-content" className="relative min-h-screen overflow-x-hidden" role="main">
                  <Breadcrumbs className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-2" />
                  {children}
                </main>
                <Footer />
                <Analytics />
                <CookieConsent />
              </ThemeProvider>
            </LocaleProvider>
          </PostHogProvider>
        </Suspense>
      </body>
    </html>
  );
}
