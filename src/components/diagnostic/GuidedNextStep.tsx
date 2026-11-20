"use client";

/**
 * Phase C: the guided diagnostic's final card (spec 3.4).
 *
 * - While the lead is being delivered, it says the report is being sent.
 * - If the delivery came back with a booking token (a new lead with a work
 *   email), it offers **Choose a time**, which opens the guided booking's
 *   `GuidedBookingHandoff`: focus moves into the dialog and stays there;
 *   Escape or Back returns it to "Choose a time".
 * - Otherwise (personal or repeat email, slow or failed delivery, or the
 *   visitor prefers the email link) it shows the email ending.
 *
 * The token arrives as a prop from the page's memory and goes only to the
 * booking screen: never storage, the URL or analytics. Loaded only for
 * guided visitors, with the booking copy it reuses.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { CalendarDays, Loader2 } from "lucide-react";
import { BookingOfferCard } from "@/components/conversation/parts";
import { CalculatorLink, EmailNextStep, NextStepBanner, NextStepFrame, type NextStepProps } from "@/components/diagnostic/DiagnosticNextStep";
import { fill } from "@/lib/diagnostic/copy";
import { getDiagnosticCopy } from "@/lib/diagnostic/i18n";
import { getWebsiteIntlLocale } from "@/lib/i18n";
import { getGuidedBookingCopy } from "@/lib/leadConversation/copy";
import { trackEvent } from "@/lib/posthog";
import type { BookingSummary } from "@/lib/sundaeBookingClient";

const GuidedBookingHandoff = dynamic(() => import("@/components/marketing/guidedBooking/GuidedBookingHandoff"), { ssr: false });

export interface GuidedDelivery {
  status: "pending" | "delivered" | "failed";
  bookingToken: string | null;
}

type BookingUi = "offer" | "opening" | "booked" | "later" | "failed";

function formatBooking(booking: BookingSummary, intlLocale: string): string {
  if (!booking.startAt) return "";
  try {
    return new Intl.DateTimeFormat(intlLocale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(new Date(booking.startAt));
  } catch {
    return new Date(booking.startAt).toUTCString();
  }
}

export default function GuidedNextStep(props: NextStepProps & { delivery: GuidedDelivery }) {
  const { delivery, leadData, locale, analytics } = props;
  const copy = getDiagnosticCopy(locale);
  const chat = getGuidedBookingCopy(locale);
  const [ui, setUi] = useState<BookingUi>("offer");
  const [bookedAt, setBookedAt] = useState<BookingSummary | null>(null);
  const chooseRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLSpanElement>(null);
  const noticeRef = useRef<HTMLDivElement>(null);
  const previousUi = useRef<BookingUi>(ui);
  const bookedTracked = useRef(false);
  const token = delivery.bookingToken;
  // Only the card's first state fades in with the report.
  const [firstStatus] = useState(delivery.status);
  const appear = delivery.status === firstStatus && ui === "offer";

  // Focus returns to "Choose a time" when the booking screen closes without a
  // booking, and lands on the confirmation (or the fallback note) otherwise.
  useEffect(() => {
    const was = previousUi.current;
    previousUi.current = ui;
    if (was !== "opening") return;
    if (ui === "offer") chooseRef.current?.focus();
    else if (ui === "booked") confirmRef.current?.focus();
    else if (ui === "failed") noticeRef.current?.focus();
  }, [ui]);

  // A completed booking is reported once the booking screen has closed and
  // analytics capture has resumed.
  useEffect(() => {
    if (ui !== "booked" || bookedTracked.current) return;
    bookedTracked.current = true;
    trackEvent("diagnostic_booking_booked", { locale, ...analytics });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- analytics is constant for this page view
  }, [ui]);

  const email = <span dir="ltr">{leadData.email}</span>;

  if (delivery.status === "pending") {
    return (
      <NextStepFrame
        locale={locale}
        appear={appear}
        banner={
          <NextStepBanner icon={<Loader2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5 animate-spin" aria-hidden />}>
            <span role="status">{fill(copy.report.sendingReport, { email: leadData.email })}</span>
          </NextStepBanner>
        }
        actions={<CalculatorLink {...props} />}
      />
    );
  }

  if (ui === "booked" && bookedAt) {
    return (
      <NextStepFrame
        locale={locale}
        appear={false}
        banner={
          <NextStepBanner>
            <span ref={confirmRef} tabIndex={-1} className="outline-none" data-diagnostic-booked>
              {fillNode(chat.booking.booked, { time: formatBooking(bookedAt, getWebsiteIntlLocale(locale)), email })}
            </span>
          </NextStepBanner>
        }
        actions={<CalculatorLink {...props} />}
      />
    );
  }

  if (!token || ui === "later" || ui === "failed") {
    const notice = ui === "failed" ? chat.booking.failed : ui === "later" ? chat.booking.notBooked : null;
    return (
      <div ref={noticeRef} tabIndex={-1} className="outline-none">
        <EmailNextStep {...props} notice={notice ?? undefined} appear={appear} />
      </div>
    );
  }

  return (
    <>
      <NextStepFrame
        locale={locale}
        appear={appear}
        banner={<NextStepBanner>{fillNode(copy.report.bookingOffer, { email })}</NextStepBanner>}
        actions={
          <>
            <button
              ref={chooseRef}
              type="button"
              disabled={ui === "opening"}
              onClick={() => {
                setUi("opening");
                trackEvent("diagnostic_booking_opened", { locale, ...analytics });
              }}
              // Coral with ink text in dark (6.0:1), deep coral with white in light (5.0:1).
              className="rounded-xl font-bold px-6 py-3 flex items-center justify-center gap-2 transition-colors bg-[var(--accent-warm)] text-[var(--ink)] hover:opacity-90 disabled:cursor-default [html.light_&]:text-white"
            >
              <CalendarDays className="w-4 h-4" aria-hidden />
              {chat.booking.choose}
            </button>
            <CalculatorLink {...props} />
          </>
        }
        footnote={
          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="w-full max-w-xl text-start">
              <BookingOfferCard title={chat.booking.timezoneTitle} body={chat.booking.timezoneBody} />
            </div>
            <button
              type="button"
              onClick={() => setUi("later")}
              className="text-sm font-semibold text-[var(--action-on-tint)] underline underline-offset-4 hover:text-[var(--text-primary)]"
            >
              {chat.booking.later}
            </button>
          </div>
        }
      />
      {ui === "opening" && (
        <GuidedBookingHandoff
          token={token}
          locale={locale}
          dialogLabel={chat.booking.choose}
          closeLabel={copy.report.bookingClose}
          loadingLabel={chat.booking.opening}
          onBooked={(summary) => setBookedAt(summary)}
          // Closing without booking keeps the offer (the token is still
          // valid), so focus returns to "Choose a time".
          onClose={() => setUi((current) => (current === "opening" ? (bookedAt ? "booked" : "offer") : current))}
          onFailed={() => setUi("failed")}
        />
      )}
    </>
  );
}

/** Fills `{placeholders}` with text or elements (for the left-to-right email). */
function fillNode(template: string, vars: Record<string, ReactNode>) {
  const parts = template.split(/(\{\w+\})/g);
  return parts.map((part, index) => {
    const match = /^\{(\w+)\}$/.exec(part);
    return match && match[1] in vars ? <span key={index}>{vars[match[1]]}</span> : part;
  });
}
