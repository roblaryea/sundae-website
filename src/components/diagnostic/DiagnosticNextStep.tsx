"use client";

/**
 * The report's final "Next step" card. The classic ending (the report and a
 * booking link are in the inbox, plus "Request a walkthrough") lives here;
 * the guided diagnostic's inline booking (`GuidedNextStep`) reuses the same
 * frame and falls back to this ending whenever there is no booking token.
 */

import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, ClipboardList, Loader2 } from "lucide-react";
import type { DiagnosticReport as DiagnosticReportType } from "@/lib/diagnostic/engine";
import { fill } from "@/lib/diagnostic/copy";
import { getDiagnosticCopy } from "@/lib/diagnostic/i18n";
import type { WebsiteLocale } from "@/lib/i18n";
import { trackEvent } from "@/lib/posthog";

export interface DiagnosticLeadData {
  name: string;
  email: string;
  company: string;
  role: string;
  country: string;
  countryCode: string;
  numberOfLocations: string;
  primaryPOS: string;
}

export interface NextStepProps {
  report: DiagnosticReportType;
  leadData: DiagnosticLeadData;
  locale: WebsiteLocale;
  analytics?: Record<string, unknown>;
}

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.35, duration: 0.4 },
};

export function NextStepFrame({
  locale,
  banner,
  actions,
  footnote,
  appear = true,
}: {
  locale: WebsiteLocale;
  banner: ReactNode;
  actions: ReactNode;
  footnote?: ReactNode;
  /** Fade in with the report; later state changes swap in place. */
  appear?: boolean;
}) {
  const copy = getDiagnosticCopy(locale);
  return (
    <motion.section
      {...fadeIn}
      initial={appear ? fadeIn.initial : false}
      className="dgx-no-print rounded-3xl border border-[var(--warm-coral)]/30 bg-[var(--warm-coral)]/[0.07] p-6 md:p-10 text-center"
      aria-labelledby="dgx-next"
    >
      {banner}
      <h2 id="dgx-next" className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2 text-balance">{copy.report.nextTitle}</h2>
      <p className="text-sm sm:text-base text-[var(--text-supporting)] mb-6 max-w-2xl mx-auto">{copy.report.nextBody}</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">{actions}</div>
      {footnote}
    </motion.section>
  );
}

/** The green pill above the heading. */
export function NextStepBanner({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <div className="inline-flex items-start gap-2 px-4 py-2 mb-5 rounded-full bg-emerald-500/12 border border-emerald-500/30 text-start max-w-xl mx-auto">
      {icon ?? <ClipboardList className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden />}
      <span className="text-xs text-[var(--text-primary)] leading-snug">{children}</span>
    </div>
  );
}

export function CalculatorLink({ report, locale, analytics }: Pick<NextStepProps, "report" | "locale" | "analytics">) {
  const copy = getDiagnosticCopy(locale);
  return (
    <a
      href={report.startingPackage.calculatorUrl}
      target="_blank"
      rel="noopener"
      onClick={() => trackEvent("diagnostic_cta_click", { cta: "pricing_calculator", locale, ...analytics })}
      className="rounded-xl border-2 border-[var(--warm-coral)]/45 text-[var(--text-primary)] font-bold px-6 py-3 hover:bg-[var(--warm-coral)]/10 transition-colors flex items-center justify-center gap-2"
    >
      {copy.report.calculator}
      <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden />
    </a>
  );
}

/**
 * "Request a walkthrough": the prospect already gave every contact detail,
 * so the request reuses them (source 'diagnostic-call-request' so sales can
 * prioritise it).
 */
export function RequestWalkthroughButton({ report, leadData, locale, analytics }: NextStepProps) {
  const copy = getDiagnosticCopy(locale);
  const [bookingState, setBookingState] = useState<"idle" | "loading" | "done">("idle");
  const bookingSubmissionKeyRef = useRef<string>(globalThis.crypto.randomUUID());

  const handleBookCall = async () => {
    if (bookingState !== "idle") return;
    trackEvent("diagnostic_cta_click", { cta: "book_call", locale, tierFit: report.tierFit, ...analytics });
    setBookingState("loading");
    try {
      const response = await fetch("/api/cta/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": bookingSubmissionKeyRef.current },
        body: JSON.stringify({
          source: "diagnostic-call-request",
          name: leadData.name,
          email: leadData.email,
          company: leadData.company,
          role: leadData.role,
          country: leadData.country,
          countryCode: leadData.countryCode,
          numberOfLocations: leadData.numberOfLocations,
          primaryPOS: leadData.primaryPOS,
          locale,
          message: `[Walkthrough requested from diagnostic]\nProfile: ${report.profileLine}\nStarting package: ${report.tierFit}\nFirst hypothesis: ${report.topLeaks[0]?.title ?? "-"}`,
          metadata: { report, locale },
        }),
      });
      if (!response.ok) throw new Error("booking_request_failed");
      setBookingState("done");
    } catch {
      setBookingState("idle");
    }
  };

  return (
    <button
      type="button"
      onClick={handleBookCall}
      disabled={bookingState !== "idle"}
      aria-live="polite"
      className={`rounded-xl font-bold px-6 py-3 flex items-center justify-center gap-2 transition-colors disabled:cursor-default ${
        bookingState === "done"
          ? "bg-emerald-500/15 border-2 border-emerald-500/40 text-[var(--text-primary)]"
          : "bg-[var(--warm-coral)] text-white hover:bg-[var(--warm-coral)]/90"
      }`}
    >
      {bookingState === "loading" ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
          {copy.report.sending}
        </>
      ) : bookingState === "done" ? (
        <>
          <Check className="w-4 h-4" aria-hidden />
          {copy.report.sent}
        </>
      ) : (
        <>
          {copy.report.bookCall}
          <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden />
        </>
      )}
    </button>
  );
}

/** The email ending: the report and a booking link are in the inbox. */
export function EmailNextStep(props: NextStepProps & { notice?: ReactNode; appear?: boolean }) {
  const { leadData, locale, notice, appear } = props;
  const copy = getDiagnosticCopy(locale);
  return (
    <NextStepFrame
      locale={locale}
      appear={appear}
      banner={<NextStepBanner>{notice ?? fill(copy.report.ready, { email: leadData.email })}</NextStepBanner>}
      actions={
        <>
          <RequestWalkthroughButton {...props} />
          <CalculatorLink {...props} />
        </>
      }
      footnote={<p className="text-[11px] text-[var(--text-muted)] mt-6 italic">{copy.report.contactReuse}</p>}
    />
  );
}
