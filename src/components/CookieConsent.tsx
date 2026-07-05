"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { localizeWebsiteHref, type RequiredEnglishLocalizedRecord } from '@/lib/i18n';
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/components_CookieConsent'

const CONSENT_KEY = "sundae_cookie_consent";

type ConsentStatus = "accepted" | "declined" | null;

type CookieConsentCopy = {
  ariaLabel: string;
  message: string;
  privacy: string;
  decline: string;
  accept: string;
};

const cookieConsentCopy: RequiredEnglishLocalizedRecord<CookieConsentCopy> = {
  en: {
    ariaLabel: "Cookie consent",
    message: "We use cookies to improve your experience and analyze site usage.",
    privacy: "Privacy Policy",
    decline: "Decline",
    accept: "Accept",
  },
  ar: {
    ariaLabel: "موافقة ملفات تعريف الارتباط",
    message: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل استخدام الموقع.",
    privacy: "سياسة الخصوصية",
    decline: "رفض",
    accept: "موافقة",
  },
  fr: {
    ariaLabel: "Consentement aux cookies",
    message: "Nous utilisons des cookies pour améliorer votre expérience et analyser l’utilisation du site.",
    privacy: "Politique de confidentialité",
    decline: "Refuser",
    accept: "Accepter",
  },
  es: {
    ariaLabel: "Consentimiento de cookies",
    message: "Usamos cookies para mejorar tu experiencia y analizar el uso del sitio.",
    privacy: "Política de privacidad",
    decline: "Rechazar",
    accept: "Aceptar",
  },
};

function readConsentCookie(): ConsentStatus {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)sundae_cookie_consent=(accepted|declined)/);
  return match ? (match[1] as ConsentStatus) : null;
}

function writeConsentCookie(status: Exclude<ConsentStatus, null>): void {
  if (typeof document === "undefined") return;
  // 1-year, same-site cookie so the SERVER can read the decision on the next
  // request and suppress the banner in SSR HTML (no post-hydration flash).
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_KEY}=${status}; path=/; max-age=31536000; SameSite=Lax${secure}`;
}

export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === "accepted" || value === "declined") return value;
  // Fall back to the mirrored cookie (e.g. localStorage cleared but cookie kept).
  return readConsentCookie();
}

export function hasConsent(): boolean {
  return getConsentStatus() === "accepted";
}

function loadGA4() {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  if (!ga4Id || typeof window === "undefined") return;

  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${ga4Id}"]`)) return;

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
  script.async = true;
  document.head.appendChild(script);

  // @ts-expect-error gtag global
  window.dataLayer = window.dataLayer || [];
  // @ts-expect-error gtag global
  function gtag(...args: unknown[]) { window.dataLayer.push(args); }
  gtag("js", new Date());
  gtag("config", ga4Id, { page_path: window.location.pathname });
}

function dispatchConsentEvent(status: ConsentStatus) {
  window.dispatchEvent(new CustomEvent("sundae_consent_change", { detail: status }));
}

// Subscribe to consent changes (other tabs via "storage", this tab via our event)
// so useSyncExternalStore re-reads after the user accepts/declines.
function subscribeConsent(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("sundae_consent_change", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("sundae_consent_change", onStoreChange);
  };
}

export function CookieConsent({ initialConsent = null }: { initialConsent?: ConsentStatus }) {
  const { locale } = useWebsiteI18n();
  const pathname = usePathname();
  const copy = cookieConsentCopy[locale as keyof typeof cookieConsentCopy] ?? getGeneratedLocalCopy(cookieConsentCopy, generatedLocalCopy.cookieConsentCopy, locale) ?? cookieConsentCopy.en;
  // Read consent via useSyncExternalStore. getServerSnapshot returns the value
  // the SERVER read from the mirrored consent cookie (initialConsent), so the
  // SSR HTML and the first client render agree: a returning visitor who already
  // accepted/declined never sees a flash of the banner. After hydration it reads
  // the real localStorage value, and re-reads when accept/decline fires our event.
  const consent = useSyncExternalStore(subscribeConsent, getConsentStatus, () => initialConsent);

  useEffect(() => {
    if (getConsentStatus() === "accepted") {
      loadGA4();
      dispatchConsentEvent("accepted");
    }
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    writeConsentCookie("accepted");
    loadGA4();
    dispatchConsentEvent("accepted");
  }, []);

  const handleDecline = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "declined");
    writeConsentCookie("declined");
    dispatchConsentEvent("declined");
  }, []);

  if (consent !== null || pathname === "/tiktok-review") return null;

  return (
    <div
      role="dialog"
      aria-label={copy.ariaLabel}
      data-cookie-banner
      className="animate-fade-in-up fixed bottom-3 left-3 right-3 z-[9999] sm:left-5 sm:right-auto sm:bottom-5 sm:max-w-[360px] motion-reduce:animate-none [body.mobile-menu-open_&]:hidden"
    >
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--navy-surface)]/85 px-4 py-3.5 shadow-[0_18px_50px_-16px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        <p className="text-[12.5px] leading-relaxed text-[var(--text-secondary)]">
          {copy.message}{" "}
          <Link
            href={localizeWebsiteHref("/privacy", locale)}
            className="underline underline-offset-2 hover:text-[var(--text-primary)] transition-colors"
          >
            {copy.privacy}
          </Link>
        </p>
        <div className="mt-3 flex justify-end gap-2">
          <button
            onClick={handleDecline}
            className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-warm)]/40"
          >
            {copy.decline}
          </button>
          <button
            onClick={handleAccept}
            className="rounded-lg bg-[#FF5C4D] [html.light_&]:bg-[var(--ink)] px-4 py-1.5 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-[#FF8473]"
          >
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
