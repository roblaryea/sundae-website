"use client";

import { getCampaignParams } from "@/lib/campaign";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, ListChecks, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import { DiagnosticFlow, type DiagnosticCompletion } from "@/components/diagnostic/DiagnosticFlow";
import { DiagnosticReport, type DiagnosticLeadData } from "@/components/diagnostic/DiagnosticReport";
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

type Stage = "intro" | "flow" | "generating" | "report";

const values = (value: string | string[] | undefined): string[] =>
  Array.isArray(value) ? value : value ? [value] : [];

function primaryPos(responses: DiagnosticResponses): string {
  const first = values(responses.pos)[0];
  if (!first || first === "not_sure") return "Not sure";
  if (first === "other") return String(responses[diagnosticOtherKey("pos")] ?? "Other").trim().slice(0, 60) || "Other";
  return POS_BRAND_NAMES[first] ?? first;
}

export default function DiagnosticPage() {
  const { locale, messages } = useWebsiteI18n();
  const copy = getDiagnosticCopy(locale);
  const [stage, setStage] = useState<Stage>("intro");
  const [report, setReport] = useState<DiagnosticReportType | null>(null);
  const [responses, setResponses] = useState<DiagnosticResponses | null>(null);
  const [leadData, setLeadData] = useState<DiagnosticLeadData | null>(null);
  const [savedProgress, setSavedProgress] = useState<DiagnosticProgress | null>(null);
  const [resumeFrom, setResumeFrom] = useState<DiagnosticProgress | null>(null);
  const diagnosticSubmissionKeyRef = useRef<string>(globalThis.crypto.randomUUID());

  useEffect(() => {
    setSavedProgress(loadProgress());
    return startDiagnosticLeadOutbox(() => {
      trackEvent("diagnostic_lead_delivered", { locale });
    });
  }, [locale]);

  const handleStart = () => {
    setResumeFrom(null);
    setStage("flow");
    trackEvent("diagnostic_started", { locale, resumed: false });
  };

  const handleResume = () => {
    setResumeFrom(savedProgress);
    setStage("flow");
    trackEvent("diagnostic_resumed", { locale, answered: answeredCount(savedProgress?.responses) });
  };

  const handleStartFresh = () => {
    clearProgress();
    setSavedProgress(null);
    setResumeFrom(null);
    setStage("flow");
    trackEvent("diagnostic_started", { locale, resumed: false, restarted: true });
  };

  const handleComplete = async (data: DiagnosticCompletion) => {
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
    trackEvent("diagnostic_submitted", { locale, role: roleKey, answered: answeredCount(answers) });

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
      trackEvent("diagnostic_generation_failed", {
        locale,
        message: err instanceof Error ? err.name : "unknown",
      });
      result = runDiagnostic(answers, locale);
      aiSource = "client-rules";
    } finally {
      window.clearTimeout(generationTimeout);
    }

    setReport(result);
    trackEvent("diagnostic_report_shown", { locale, source: aiSource, tierFit: result.tierFit });

    // Persist the lead before clearing the draft. The outbox keeps this
    // idempotency key across reloads and removes the entry only after
    // /api/cta/submit acknowledges it.
    const campaign = getCampaignParams();
    const persisted = queueDiagnosticLead(
      {
        ...lead,
        ctaLabel: "Operations Diagnostic",
        sourcePage: "/diagnostic",
        utmSource: campaign.utm_source,
        utmMedium: campaign.utm_medium,
        utmCampaign: campaign.utm_campaign,
        message: `Diagnostic submitted. Profile: ${result.profileLine}. Starting package: ${result.tierFit}.`,
        locale,
        // report -> branded email + admin assessment view. aiSource is internal only.
        metadata: { responses: answers, report: result, aiSource, locale, questionBankVersion: QUESTION_BANK_VERSION },
      },
      diagnosticSubmissionKeyRef.current,
    );
    if (persisted) {
      clearProgress();
      setSavedProgress(null);
    } else {
      trackEvent("diagnostic_lead_queue_failed", { locale });
    }

    setStage("report");
  };

  if (stage === "report" && report && leadData) {
    return <DiagnosticReport report={report} leadData={leadData} responses={responses ?? {}} locale={locale} />;
  }

  if (stage === "generating" && leadData) {
    return <DiagnosticGenerating name={leadData.name} locale={locale} />;
  }

  if (stage === "flow") {
    return <DiagnosticFlow onComplete={handleComplete} locale={locale} initialProgress={resumeFrom} />;
  }

  const canResume = !!savedProgress && answeredCount(savedProgress.responses) > 0;
  const featureIcons = [ListChecks, FileText, ShieldCheck];

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
