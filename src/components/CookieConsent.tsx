"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import type { RequiredEnglishLocalizedRecord } from '@/lib/i18n';
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/components_CookieConsent'

const CONSENT_KEY = "sundae_cookie_consent";

type ConsentStatus = "accepted" | "declined" | null;

type CookieConsentCopy = {
  ariaLabel: string;
  message: string;
  decline: string;
  accept: string;
};

const cookieConsentCopy: RequiredEnglishLocalizedRecord<CookieConsentCopy> = {
  en: {
    ariaLabel: "Cookie consent",
    message: "We use cookies to improve your experience and analyze site usage.",
    decline: "Decline",
    accept: "Accept",
  },
  ar: {
    ariaLabel: "موافقة ملفات تعريف الارتباط",
    message: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل استخدام الموقع.",
    decline: "رفض",
    accept: "موافقة",
  },
  fr: {
    ariaLabel: "Consentement aux cookies",
    message: "Nous utilisons des cookies pour améliorer votre expérience et analyser l’utilisation du site.",
    decline: "Refuser",
    accept: "Accepter",
  },
  es: {
    ariaLabel: "Consentimiento de cookies",
    message: "Usamos cookies para mejorar tu experiencia y analizar el uso del sitio.",
    decline: "Rechazar",
    accept: "Aceptar",
  },
};

export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === "accepted" || value === "declined") return value;
  return null;
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

export function CookieConsent() {
  const { locale } = useWebsiteI18n();
  const pathname = usePathname();
  const copy = cookieConsentCopy[locale as keyof typeof cookieConsentCopy] ?? getGeneratedLocalCopy(cookieConsentCopy, generatedLocalCopy.cookieConsentCopy, locale) ?? cookieConsentCopy.en;
  // Read consent via useSyncExternalStore: getServerSnapshot returns null on the
  // server AND the first client render, so the SSR/hydration HTML always agree
  // (no banner) - eliminating the hydration mismatch (React #418) that otherwise
  // forced the whole tree to regenerate client-side. After hydration it reads the
  // real localStorage value, and re-reads when accept/decline fires our event.
  const consent = useSyncExternalStore(subscribeConsent, getConsentStatus, () => null);

  useEffect(() => {
    if (getConsentStatus() === "accepted") {
      loadGA4();
      dispatchConsentEvent("accepted");
    }
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    loadGA4();
    dispatchConsentEvent("accepted");
  }, []);

  const handleDecline = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "declined");
    dispatchConsentEvent("declined");
  }, []);

  if (consent !== null || pathname === "/tiktok-review") return null;

  return (
    <div
      role="dialog"
      aria-label={copy.ariaLabel}
      className="animate-fade-in-up fixed bottom-3 left-3 right-3 z-[9999] sm:left-5 sm:right-auto sm:bottom-5 sm:max-w-[360px] motion-reduce:animate-none"
    >
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--navy-surface)]/85 px-4 py-3.5 shadow-[0_18px_50px_-16px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        <p className="text-[12.5px] leading-relaxed text-[var(--text-secondary)]">
          {copy.message}
        </p>
        <div className="mt-3 flex justify-end gap-2">
          <button
            onClick={handleDecline}
            className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--electric-blue)]/40"
          >
            {copy.decline}
          </button>
          <button
            onClick={handleAccept}
            className="rounded-lg bg-[#FF5C4D] px-4 py-1.5 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-[#FF8473]"
          >
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
