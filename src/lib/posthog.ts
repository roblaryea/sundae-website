import posthog from "posthog-js";
import { containsBookingData, isBookingUrl } from './booking/privacy';

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

let initialized = false;
let privateVisit = false;

export function protectBookingPrivacy(path: string) {
  if (privateVisit || !isBookingUrl(path)) return;
  privateVisit = true;
  if (initialized) posthog.stopSessionRecording();
}

export function initPostHog() {
  if (initialized || !POSTHOG_KEY || typeof window === "undefined") return;
  protectBookingPrivacy(window.location.href);
  if (privateVisit) return;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
    // Booking credentials and guest details never belong in analytics, including
    // autocapture/pageleave/session snapshots after navigating from the homepage.
    before_send: (event) => {
      protectBookingPrivacy(window.location.href);
      return privateVisit || containsBookingData(event) ? null : event;
    },
    session_recording: {
      maskAllInputs: true,
    },
    loaded: (ph) => {
      if (privateVisit) ph.stopSessionRecording();
      if (process.env.NODE_ENV === "development") ph.opt_out_capturing();
    },
  });
  initialized = true;
}

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (!POSTHOG_KEY || !initialized) return;
  posthog.capture(event, properties);
}

export function trackPageView(url?: string) {
  if (!POSTHOG_KEY || !initialized) return;
  posthog.capture("$pageview", { $current_url: url || window.location.href });
}

export { posthog };
