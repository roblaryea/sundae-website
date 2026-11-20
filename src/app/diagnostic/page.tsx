"use client";

import { getCampaignParams } from "@/lib/campaign";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, ListChecks, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import { DiagnosticFlow, type DiagnosticCompletion } from "@/components/diagnostic/DiagnosticFlow";
import { DiagnosticReport, type DiagnosticLeadData, type GuidedDelivery } from "@/components/diagnostic/DiagnosticReport";
import { DiagnosticGenerating } from "@/components/diagnostic/DiagnosticGenerating";
import { getLocalizedPathname } from "@/lib/i18n";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { countryName, runDiagnostic, type DiagnosticReport as DiagnosticReportType } from "@/lib/diagnostic/engine";
import { getDiagnosticCopy } from "@/lib/diagnostic/i18n";
import { trackEvent } from "@/lib/posthog";
import { loadProgress, clearProgress, answeredCount, type DiagnosticProgress } from "@/lib/diagnostic/progress";
import { queueDiagnosticLead, startDiagnosticLeadOutbox } from "@/lib/diagnostic/leadOutbox";
import { withoutContactDetails } from "@/lib/diagnostic/sanitize";
import { parseLocationCount } from "@/lib/diagnostic/rules";
import {
  DIAGNOSTIC_PARTS,
  POS_BRAND_NAMES,
  QUESTION_BANK_VERSION,
  ROLE_KEYS,
  ROLE_LABELS_EN,
  diagnosticOtherKey,
  type DiagnosticResponses,
  type RoleKey,
} from "@/lib/diagnostic/questions";
import type { ClassicHandback } from "@/components/diagnostic/DiagnosticConversation";
import type { DiagnosticConversationState, DiagnosticConvoMetadata } from "@/lib/diagnosticConversation/machine";
import { GUIDED_DIAGNOSTIC_SOURCE, writeGuidedSession } from "@/lib/diagnosticConversation/session";
import {
  DIAGNOSTIC_SURFACE,
  diagnosticClassicIsCertainWithoutOverride,
  resolveDiagnosticVariant,
  type DiagnosticVariant,
} from "@/lib/diagnosticConversation/variant";

// The conversation, its state machine and the booking copy it reuses are
// loaded only for the guided arm.
const DiagnosticConversation = dynamic(() => import("@/components/diagnostic/DiagnosticConversation"), {
  ssr: false,
  loading: () => <PanelPlaceholder />,
});

type Stage = "intro" | "flow" | "generating" | "report";

/** A lead that has not answered within this time shows the email ending. */
const DELIVERY_PATIENCE_MS = 12_000;

const values = (value: string | string[] | undefined): string[] =>
  Array.isArray(value) ? value : value ? [value] : [];

function primaryPos(responses: DiagnosticResponses): string {
  const first = values(responses.pos)[0];
  if (!first || first === "not_sure") return "Not sure";
  if (first === "other") return String(responses[diagnosticOtherKey("pos")] ?? "Other").trim().slice(0, 60) || "Other";
  return POS_BRAND_NAMES[first] ?? first;
}

// One decision per page view, cached so a first `split` assignment is
// written to the cookie exactly once.
let decidedVariant: DiagnosticVariant | null = null;
const subscribeNever = () => () => {};

function useDiagnosticVariant(): DiagnosticVariant | null {
  return useSyncExternalStore(
    subscribeNever,
    () => (decidedVariant ??= resolveDiagnosticVariant()),
    // Server and hydration: classic when nothing can change it without a QA
    // override (the default while the variable is unset), otherwise wait for
    // the client so no visitor sees a swap.
    () => (diagnosticClassicIsCertainWithoutOverride() ? "classic" : null),
  );
}

function PanelPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto h-[clamp(600px,78vh,720px)] w-full max-w-[560px] rounded-3xl border border-[var(--border-default)] bg-[var(--navy)] max-sm:rounded-none max-sm:border-0 max-sm:bg-transparent"
    />
  );
}

export default function DiagnosticPage() {
  const { locale, messages } = useWebsiteI18n();
  const copy = getDiagnosticCopy(locale);
  const variant = useDiagnosticVariant();
  const [stage, setStage] = useState<Stage>("intro");
  const [report, setReport] = useState<DiagnosticReportType | null>(null);
  const [responses, setResponses] = useState<DiagnosticResponses | null>(null);
  const [leadData, setLeadData] = useState<DiagnosticLeadData | null>(null);
  const [savedProgress, setSavedProgress] = useState<DiagnosticProgress | null>(null);
  const [resumeFrom, setResumeFrom] = useState<DiagnosticProgress | null>(null);
  // Guided arm: the visitor chose the classic form (answers carried over).
  const [switchedToClassic, setSwitchedToClassic] = useState(false);
  // The conversation as the visitor left it, and the answers the classic form hands back.
  const [leftConversation, setLeftConversation] = useState<DiagnosticConversationState | null>(null);
  const [handback, setHandback] = useState<ClassicHandback | null>(null);
  // Guided leads: delivery status and the short-lived booking token, held in
  // memory only (never storage, the URL or analytics).
  const [delivery, setDelivery] = useState<GuidedDelivery | null>(null);
  const diagnosticSubmissionKeyRef = useRef<string>(globalThis.crypto.randomUUID());
  const awaitingGuidedLeadRef = useRef(false);

  const analytics = { variant: variant ?? "classic", surface: DIAGNOSTIC_SURFACE };
  const analyticsRef = useRef(analytics);
  useEffect(() => {
    analyticsRef.current = analytics;
  });
  const track = (event: string, properties: Record<string, unknown>) => trackEvent(event, { ...properties, ...analytics });

  useEffect(() => {
    setSavedProgress(loadProgress());
    return startDiagnosticLeadOutbox(
      (delivered) => {
        trackEvent("diagnostic_lead_delivered", { locale, ...analyticsRef.current });
        if (!awaitingGuidedLeadRef.current || delivered.leadKey !== diagnosticSubmissionKeyRef.current) return;
        awaitingGuidedLeadRef.current = false;
        setDelivery({ status: "delivered", bookingToken: delivered.bookingToken ?? null });
      },
      (leadKey) => {
        if (!awaitingGuidedLeadRef.current || leadKey !== diagnosticSubmissionKeyRef.current) return;
        // Retries continue in the background; the report shows the email ending.
        setDelivery((current) => (current?.status === "pending" ? { status: "failed", bookingToken: null } : current));
      },
    );
  }, [locale]);

  // A slow delivery shows the email ending rather than a spinner; a token
  // that arrives later still upgrades the card.
  useEffect(() => {
    if (delivery?.status !== "pending") return;
    const timer = window.setTimeout(() => {
      setDelivery((current) => (current?.status === "pending" ? { status: "failed", bookingToken: null } : current));
    }, DELIVERY_PATIENCE_MS);
    return () => window.clearTimeout(timer);
  }, [delivery?.status]);

  const handleStart = () => {
    setResumeFrom(null);
    setStage("flow");
    track("diagnostic_started", { locale, resumed: false });
  };

  const handleResume = () => {
    setResumeFrom(savedProgress);
    setStage("flow");
    track("diagnostic_resumed", { locale, answered: answeredCount(savedProgress?.responses) });
  };

  const handleStartFresh = () => {
    clearProgress();
    setSavedProgress(null);
    setResumeFrom(null);
    setStage("flow");
    track("diagnostic_started", { locale, resumed: false, restarted: true });
  };

  const handleComplete = async (data: DiagnosticCompletion, convo?: DiagnosticConvoMetadata) => {
    // Contact details travel in the lead fields only, never to the model,
    // analytics or metadata.responses.
    const answers = withoutContactDetails(data.responses);
    const roleKey: RoleKey = (ROLE_KEYS as readonly string[]).includes(data.role) ? (data.role as RoleKey) : "other";
    const countryCode = values(answers.countries)[0] ?? "";
    const lead: DiagnosticLeadData = {
      name: data.name,
      email: data.email,
      company: data.company,
      role: ROLE_LABELS_EN[roleKey],
      country: countryCode ? countryName("en", countryCode) : "Not specified",
      countryCode,
      numberOfLocations: String(parseLocationCount(answers.locations) ?? ""),
      primaryPOS: primaryPos(answers),
    };
    setLeadData(lead);
    setResponses(answers);
    setStage("generating");
    track("diagnostic_submitted", { locale, role: roleKey, answered: answeredCount(answers) });

    // The route always answers with a complete report (AI narrative under the
    // guard, or the rules report). If the request itself fails, the browser
    // builds the same rules report, so a finished prospect always gets one.
    let result: DiagnosticReportType;
    let aiSource: string | null = null;
    const generationController = new AbortController();
    const generationTimeout = window.setTimeout(() => generationController.abort(), 36_000);
    try {
      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: generationController.signal,
        body: JSON.stringify({
          responses: answers,
          leadData: { name: data.name, role: roleKey, company: data.company },
          locale,
        }),
      });
      if (!res.ok) throw new Error(`diagnostic route returned ${res.status}`);
      const payload = await res.json();
      if (!payload?.report?.startingPackage) throw new Error("diagnostic route returned no report");
      result = payload.report as DiagnosticReportType;
      aiSource = typeof payload.source === "string" ? payload.source : null;
    } catch (err) {
      track("diagnostic_generation_failed", {
        locale,
        message: err instanceof Error ? err.name : "unknown",
      });
      result = runDiagnostic(answers, locale);
      aiSource = "client-rules";
    } finally {
      window.clearTimeout(generationTimeout);
    }

    setReport(result);
    track("diagnostic_report_shown", { locale, source: aiSource, tierFit: result.tierFit });

    // Persist the lead before clearing the draft. The outbox keeps this
    // idempotency key across reloads and removes the entry only after
    // /api/cta/submit acknowledges it. A guided lead carries metadata.convo,
    // so a new work-email lead can come back with a booking token.
    const campaign = getCampaignParams();
    if (convo) {
      awaitingGuidedLeadRef.current = true;
      setDelivery({ status: "pending", bookingToken: null });
    }
    const persisted = queueDiagnosticLead(
      {
        ...lead,
        ctaLabel: "Operations Diagnostic",
        sourcePage: "/diagnostic",
        ...(convo ? { source: GUIDED_DIAGNOSTIC_SOURCE } : {}),
        utmSource: campaign.utm_source,
        utmMedium: campaign.utm_medium,
        utmCampaign: campaign.utm_campaign,
        message: `Diagnostic submitted. Profile: ${result.profileLine}. Starting package: ${result.tierFit}.`,
        locale,
        // report -> branded email + admin assessment view. aiSource is internal only.
        metadata: {
          responses: answers,
          report: result,
          aiSource,
          locale,
          questionBankVersion: QUESTION_BANK_VERSION,
          ...(convo ? { convo } : {}),
        },
      },
      diagnosticSubmissionKeyRef.current,
    );
    if (persisted) {
      clearProgress();
      setSavedProgress(null);
      writeGuidedSession(null);
    } else {
      track("diagnostic_lead_queue_failed", { locale });
    }

    setStage("report");
  };

  const handleConversationComplete = (completion: DiagnosticCompletion, convo: DiagnosticConvoMetadata) => {
    void handleComplete(completion, convo);
  };

  const switchToClassic = (progress: { responses: DiagnosticResponses; questionId: string }, state: DiagnosticConversationState) => {
    setLeftConversation(state);
    setHandback(null);
    setResumeFrom({ version: QUESTION_BANK_VERSION, savedAt: Date.now(), ...progress });
    setSwitchedToClassic(true);
    setStage("flow");
  };

  const switchToGuided = (classicResponses: DiagnosticResponses, questionId: string) => {
    setHandback({ responses: classicResponses, questionId, previous: leftConversation });
    setSwitchedToClassic(false);
    setStage("intro");
  };

  // The classic form keeps the conversation's resume point current, so a
  // refresh after switching brings the visitor back with every answer. The
  // machine loads only for guided-arm visitors who switched.
  const mirrorClassicProgress = (classicResponses: DiagnosticResponses, questionId: string) => {
    void import("@/lib/diagnosticConversation/machine").then(({ fromClassic, serialize }) => {
      writeGuidedSession(serialize(fromClassic(classicResponses, questionId, leftConversation)));
    });
  };

  if (stage === "report" && report && leadData) {
    return (
      <DiagnosticReport
        report={report}
        leadData={leadData}
        responses={responses ?? {}}
        locale={locale}
        analytics={analytics}
        guidedDelivery={delivery}
      />
    );
  }

  if (stage === "generating" && leadData) {
    return <DiagnosticGenerating name={leadData.name} locale={locale} />;
  }

  if (stage === "flow") {
    return (
      <DiagnosticFlow
        onComplete={handleComplete}
        locale={locale}
        initialProgress={resumeFrom}
        analytics={analytics}
        onSwitchToGuided={switchedToClassic ? switchToGuided : undefined}
        onProgressChange={switchedToClassic ? mirrorClassicProgress : undefined}
      />
    );
  }

  const featureIcons = [ListChecks, FileText, ShieldCheck];

  if (variant === null) {
    // Split arm not decided yet (first paint only): no layout swap for anyone.
    return (
      <div className="min-h-screen bg-[var(--navy-deep)] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <h1 className="sr-only">{copy.intro.title}</h1>
      </div>
    );
  }

  if (variant === "guided") {
    return (
      <div className="min-h-screen bg-[var(--navy-deep)] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid items-start gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-16">
          <div className="max-w-xl lg:pt-6">
            <p className="eyebrow">{copy.intro.eyebrow}</p>
            <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text-display)] mt-3 mb-3 sm:mt-4 sm:mb-4 text-balance">{copy.intro.title}</h1>
            <p className="text-base sm:text-lg text-[var(--text-supporting)] sm:mb-8 text-pretty">{copy.intro.body}</p>
            <ul className="grid gap-4 max-sm:hidden" aria-label={copy.intro.whatYouGet}>
              {copy.features.map((feature, index) => {
                const Icon = featureIcons[index] ?? FileText;
                return (
                  <li key={feature.title} className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                    <Icon className="mt-0.5 h-5 w-5 flex-none text-[var(--trust)]" strokeWidth={1.7} aria-hidden />
                    <span>
                      <span className="font-semibold text-[var(--text-primary)]">{feature.title}.</span> {feature.detail}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <DiagnosticConversation
            locale={locale}
            handback={handback}
            analytics={{ variant: "guided", surface: DIAGNOSTIC_SURFACE }}
            onComplete={handleConversationComplete}
            onSwitchToClassic={switchToClassic}
          />
        </div>

        <div className="max-w-6xl mx-auto mt-16 rounded-2xl bg-[var(--surface-faint)] border border-[var(--border-default)] p-6 md:p-8">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)] mb-4">{copy.intro.whatWeAsk}</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            {DIAGNOSTIC_PARTS.map((part, index) => (
              <li key={part} className="text-start">
                <div className="font-bold text-[var(--text-primary)] mb-1">
                  <span className="text-[var(--accent-warm)] tabular-nums me-1">{index + 1}</span>
                  {copy.parts[part]}
                </div>
                <div className="text-xs text-[var(--text-muted)] leading-snug">{copy.partNotes[part]}</div>
              </li>
            ))}
          </ol>
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-[var(--text-muted)]">
            {copy.intro.classicDemoLead}{" "}
            <Link href={getLocalizedPathname("/demo", locale)} className="text-[var(--accent-warm)] hover:underline font-semibold">
              {messages.navbar.bookDemo}
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const canResume = !!savedProgress && answeredCount(savedProgress.responses) > 0;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--warm-coral)]/12 border border-[var(--warm-coral)]/30 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-warm)]" aria-hidden />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent-warm)]">{copy.intro.eyebrow}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-display)] mb-4 text-balance">{copy.intro.title}</h1>
          <p className="text-lg sm:text-xl text-[var(--text-supporting)] max-w-3xl mx-auto mb-10 text-balance">{copy.intro.body}</p>

          {canResume ? (
            <>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleResume}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--warm-coral)] text-white text-base font-bold rounded-xl shadow-xl shadow-[var(--warm-coral)]/25 hover:bg-[var(--warm-coral)]/90 transition-colors"
                >
                  {copy.intro.resume}
                  <Sparkles className="w-4 h-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={handleStartFresh}
                  className="inline-flex items-center gap-1.5 px-5 py-3 text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden />
                  {copy.intro.startFresh}
                </button>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-3">{copy.intro.resumeNote}</p>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleStart}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--warm-coral)] text-white text-base font-bold rounded-xl shadow-xl shadow-[var(--warm-coral)]/25 hover:bg-[var(--warm-coral)]/90 transition-colors"
              >
                {copy.intro.start}
                <Sparkles className="w-4 h-4" aria-hidden />
              </button>
              <p className="text-xs text-[var(--text-muted)] mt-3">{copy.intro.note}</p>
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
          aria-label={copy.intro.whatYouGet}
        >
          {copy.features.map((feature, index) => {
            const Icon = featureIcons[index] ?? FileText;
            return (
              <div key={feature.title} className="rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border-default)] p-5">
                <Icon className="w-6 h-6 text-[var(--accent-warm)] mb-3" aria-hidden />
                <h2 className="text-base font-bold text-[var(--text-display)] mb-2">{feature.title}</h2>
                <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{feature.detail}</p>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 rounded-2xl bg-[var(--surface-faint)] border border-[var(--border-default)] p-6 md:p-8"
        >
          <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)] mb-4">{copy.intro.whatWeAsk}</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            {DIAGNOSTIC_PARTS.map((part, index) => (
              <li key={part} className="text-start md:text-center">
                <div className="font-bold text-[var(--text-primary)] mb-1">
                  <span className="text-[var(--accent-warm)] tabular-nums me-1">{index + 1}</span>
                  {copy.parts[part]}
                </div>
                <div className="text-xs text-[var(--text-muted)] leading-snug">{copy.partNotes[part]}</div>
              </li>
            ))}
          </ol>
        </motion.div>

        <div className="text-center mt-10">
          <p className="text-sm text-[var(--text-muted)]">
            {copy.intro.classicDemoLead}{" "}
            <Link href={getLocalizedPathname("/demo", locale)} className="text-[var(--accent-warm)] hover:underline font-semibold">
              {messages.navbar.bookDemo}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
