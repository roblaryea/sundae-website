"use client";

import { useState, useEffect, useCallback } from "react";

const CONSENT_KEY = "sundae_cookie_consent";

type ConsentStatus = "accepted" | "declined" | null;

export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === "accepted" || value === "declined") return value;
  return null;
}

export function hasConsent(): boolean {
  return getConsentStatus() === "accepted";
}

/**
 * Dynamically loads Google Analytics 4 after consent is given.
 */
function loadGA4() {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  if (!ga4Id || typeof window === "undefined") return;

  // Don't load twice
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

/**
 * Dispatches a custom event so PostHogProvider can react to consent changes.
 */
function dispatchConsentEvent(status: ConsentStatus) {
  window.dispatchEvent(new CustomEvent("sundae_consent_change", { detail: status }));
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const status = getConsentStatus();
    if (status === null) {
      setVisible(true);
    } else if (status === "accepted") {
      // Already accepted — ensure analytics are loaded
      loadGA4();
      dispatchConsentEvent("accepted");
    }
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    loadGA4();
    dispatchConsentEvent("accepted");
  }, []);

  const handleDecline = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
    dispatchConsentEvent("declined");
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-white/10 bg-slate-900/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-4 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-sm text-slate-300 text-center sm:text-left">
          We use cookies to improve your experience and analyze site usage.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={handleDecline}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
