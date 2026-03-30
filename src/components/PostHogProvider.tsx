"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initPostHog, trackPageView } from "@/lib/posthog";
import { hasConsent } from "@/components/CookieConsent";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [consentGiven, setConsentGiven] = useState(() => hasConsent());

  // Listen for consent changes
  useEffect(() => {
    if (consentGiven) {
      initPostHog();
    }

    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === "accepted") {
        setConsentGiven(true);
        initPostHog();
      }
    };

    window.addEventListener("sundae_consent_change", handler);
    return () => window.removeEventListener("sundae_consent_change", handler);
  }, [consentGiven]);

  // Track page views only if consent is given
  useEffect(() => {
    if (!consentGiven || !pathname) return;
    const url = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
    trackPageView(window.location.origin + url);
  }, [pathname, searchParams, consentGiven]);

  return <>{children}</>;
}
