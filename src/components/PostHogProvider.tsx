"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initPostHog, trackPageView } from "@/lib/posthog";
import { hasConsent } from "@/components/CookieConsent";

/**
 * Page-view tracker, isolated from the provider because it reads
 * useSearchParams(). That hook triggers a client-side rendering bailout of its
 * nearest Suspense boundary during static/server rendering - so it MUST sit
 * behind its own tight <Suspense> (below), otherwise it bails whatever boundary
 * is above it. Previously this hook lived at the top of PostHogProvider, inside
 * the root layout's single <Suspense fallback={null}>, which meant the entire
 * site rendered blank (the null fallback) on the server for every route.
 */
function PostHogPageView({ consentGiven }: { consentGiven: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!consentGiven || !pathname) return;
    const url = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
    trackPageView(window.location.origin + url);
  }, [pathname, searchParams, consentGiven]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
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

  return (
    <>
      {children}
      <Suspense fallback={null}>
        <PostHogPageView consentGiven={consentGiven} />
      </Suspense>
    </>
  );
}
