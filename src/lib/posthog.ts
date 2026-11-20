import posthog from "posthog-js";
import { containsBookingData, isBookingUrl } from './booking/privacy';
import { hasConsent } from './consent';
import { isPublicWebVitalsUrl, sanitizeWebVitalsProperties } from './webVitalsPrivacy';

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

let initialized = false;
let privateVisit = false;
// Guided booking opens the token-gated booking screen over a marketing page.
// While it is open nothing is captured (events, autocapture, replay), the same
// guarantee /book pages get, and capture resumes when it closes.
let bookingOverlayOpen = false;
let resumeRecording = false;

export function setBookingOverlayOpen(open: boolean) {
  if (bookingOverlayOpen === open) return;
  bookingOverlayOpen = open;
  if (!initialized || privateVisit) return;
  if (open) {
    resumeRecording = posthog.sessionRecordingStarted();
    posthog.stopSessionRecording();
  } else if (resumeRecording) {
    resumeRecording = false;
    posthog.startSessionRecording();
  }
}

export function protectBookingPrivacy(path: string) {
  if (privateVisit || !isBookingUrl(path)) return;
  privateVisit = true;
  if (initialized) posthog.stopSessionRecording();
}

export function initPostHog() {
  if (initialized || !POSTHOG_KEY || typeof window === "undefined" || !hasConsent()) return;
  protectBookingPrivacy(window.location.href);
  if (privateVisit) return;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
    capture_performance: process.env.NODE_ENV === 'production' && isPublicWebVitalsUrl(window.location.href, 'website')
      ? { network_timing: false, web_vitals: true, web_vitals_attribution: false, web_vitals_allowed_metrics: ['LCP', 'CLS', 'FCP', 'INP'] }
      : false,
    // Booking credentials and guest details never belong in analytics, including
    // autocapture/pageleave/session snapshots after navigating from the homepage.
    before_send: (event) => {
      protectBookingPrivacy(window.location.href);
      // Consent and booking privacy first; the guided-booking overlay pause only
      // adds another reason to drop an event (it never admits one).
      if (privateVisit || bookingOverlayOpen || containsBookingData(event) || !hasConsent()) return null;
      if (event?.event !== '$web_vitals') return event;
      if (!isPublicWebVitalsUrl(window.location.href, 'website') || posthog.has_opted_out_capturing()) return null;
      const properties = sanitizeWebVitalsProperties(event.properties, 'website');
      return properties ? { uuid: event.uuid, event: event.event, timestamp: event.timestamp, properties } : null;
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
  if (bookingOverlayOpen) return;
  // Development-only test seam: Playwright specs assert event names and that
  // properties carry no personal data. Compiled out of production builds.
  if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("sundae:analytics", { detail: { event, properties } }));
  }
  if (!POSTHOG_KEY || !initialized) return;
  posthog.capture(event, properties);
}

export function trackPageView(url?: string) {
  if (!POSTHOG_KEY || !initialized) return;
  posthog.capture("$pageview", { $current_url: url || window.location.href });
}

export { posthog };
