"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Clock, FileText, ShieldCheck, RotateCcw } from "lucide-react";
import { DiagnosticFlow } from "@/components/diagnostic/DiagnosticFlow";
import { DiagnosticReport } from "@/components/diagnostic/DiagnosticReport";
import { DiagnosticGenerating } from "@/components/diagnostic/DiagnosticGenerating";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { runDiagnostic, type DiagnosticResponses, type DiagnosticReport as DiagnosticReportType } from "@/lib/diagnostic/engine";
import { getDiagnosticCopy } from "@/lib/diagnostic/i18n";
import { getDiagnosticCatalogCopy } from "@/lib/diagnostic/questionTranslations";
import { trackEvent } from "@/lib/posthog";
import { loadProgress, clearProgress, answeredCount, type DiagnosticProgress } from "@/lib/diagnostic/progress";

type Stage = "intro" | "flow" | "generating" | "report";

export default function DiagnosticPage() {
  const { locale } = useWebsiteI18n();
  const copy = getDiagnosticCopy(locale);
  const catalog = getDiagnosticCatalogCopy(locale);
  const [stage, setStage] = useState<Stage>("intro");
  const [report, setReport] = useState<DiagnosticReportType | null>(null);
  const [responses, setResponses] = useState<DiagnosticResponses | null>(null);
  const [leadData, setLeadData] = useState<{
    name: string;
    email: string;
    company: string;
    phone: string;
    role: string;
    country: string;
  } | null>(null);
  // Resume support: detect an in-progress diagnostic saved on this device.
  const [savedProgress, setSavedProgress] = useState<DiagnosticProgress | null>(null);
  const [resumeFrom, setResumeFrom] = useState<DiagnosticProgress | null>(null);

  useEffect(() => {
    setSavedProgress(loadProgress());
  }, []);

  const handleStart = () => {
    setResumeFrom(null);
    setStage("flow");
    trackEvent("diagnostic_started", { locale, resumed: false });
  };

  const handleResume = () => {
    setResumeFrom(savedProgress);
    setStage("flow");
    trackEvent("diagnostic_resumed", {
      locale,
      answered: answeredCount(savedProgress?.responses),
    });
  };

  const handleStartFresh = () => {
    clearProgress();
    setSavedProgress(null);
    setResumeFrom(null);
    setStage("flow");
    trackEvent("diagnostic_started", { locale, resumed: false, restarted: true });
  };

  const handleComplete = async (data: {
    responses: DiagnosticResponses;
    email: string;
    name: string;
    company: string;
    phone: string;
    role: string;
    country: string;
  }) => {
    const lead = {
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      role: data.role,
      country: data.country,
    };
    setLeadData(lead);
    setResponses(data.responses);
    setStage("generating");
    // The diagnostic is submitted — local draft is no longer needed.
    clearProgress();
    setSavedProgress(null);
    trackEvent("diagnostic_submitted", {
      locale,
      role: data.role,
      country: data.country,
      answered: answeredCount(data.responses),
    });

    // Call AI gateway (Sonnet 4.6 primary → GPT-5 fallback). On any failure we
    // fall back to the deterministic engine (with a localized note for non-EN)
    // rather than dead-ending — a prospect who finished 20 questions should
    // always get a report.
    let result: DiagnosticReportType;
    // Internal-only: which engine produced the report (for sales/debug). Never
    // surfaced to the prospect - only attached to the lead metadata.
    let aiSource: string | null = null;
    try {
      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responses: data.responses,
          leadData: { name: data.name, role: data.role, country: data.country, company: data.company },
          locale,
        }),
      });
      if (!res.ok) throw new Error(`AI gateway returned ${res.status}`);
      const payload = await res.json();
      result = payload.report as DiagnosticReportType;
      aiSource = typeof payload.source === "string" ? payload.source : null;
    } catch (err) {
      console.error("[diagnostic] generation failed:", err);
      trackEvent("diagnostic_generation_failed", {
        locale,
        message: err instanceof Error ? err.message : "unknown",
      });
      // Graceful fallback for EVERY locale. runDiagnostic appends a localized
      // "regenerate for the fully native narrative" note for non-EN, so the
      // operator still gets their report instead of an error dead-end.
      result = runDiagnostic(data.responses, locale);
      aiSource = "client-heuristic";
    }

    setReport(result);
    trackEvent("diagnostic_report_shown", { locale, source: aiSource, tierFit: result.tierFit });

    // Fire-and-forget lead capture. Includes the AI-generated report in
    // metadata so the backend can email the branded report AND sales sees the
    // full assessment in admin. numberOfLocations + primaryPOS are required by
    // /api/cta/submit, so derive them from the responses (the flow doesn't
    // collect them as separate capture fields).
    if (typeof window !== "undefined") {
      const OUTLET_LABELS: Record<string, string> = {
        "1": "1", "2_5": "2-5", "6_15": "6-15",
        "16_50": "16-50", "51_150": "51-150", "150_plus": "150+",
      };
      const outletsRaw = Array.isArray(data.responses.outlets)
        ? data.responses.outlets[0]
        : data.responses.outlets;
      const numberOfLocations = OUTLET_LABELS[String(outletsRaw ?? "")] ?? "Not specified";
      const posRaw = Array.isArray(data.responses.pos)
        ? data.responses.pos
        : data.responses.pos
          ? [data.responses.pos]
          : [];
      const primaryPOS = posRaw[0]
        ? String(posRaw[0]).charAt(0).toUpperCase() + String(posRaw[0]).slice(1)
        : "Not specified";

      void fetch("/api/cta/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          phone: data.phone,
          role: data.role,
          country: data.country,
          numberOfLocations,
          primaryPOS,
          ctaLabel: "Operations Diagnostic",
          sourcePage: "/diagnostic",
          message: `Diagnostic submitted. Profile: ${result.profileLine}. Tier fit: ${result.tierFit}.`,
          locale,
          // report → branded email + admin AI Assessment drawer.
          // aiSource is internal-only (engine used); never shown to the prospect.
          metadata: { responses: data.responses, report: result, aiSource, locale },
        }),
      }).catch(() => {});
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

  return (
    <div className="min-h-screen bg-[var(--navy-deep)] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--warm-coral)]/12 border border-[var(--warm-coral)]/30 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[var(--warm-coral)]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--warm-coral)]">
              {copy.intro.eyebrow}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-display)] mb-4 text-balance">
            {copy.intro.title}
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-supporting)] max-w-3xl mx-auto mb-10 text-balance">
            {copy.intro.body}
          </p>

          {(() => {
            const canResume = !!savedProgress && answeredCount(savedProgress.responses) > 0;
            const RESUME_COPY: Record<string, { resume: string; fresh: string; note: (n: number) => string }> = {
              en: { resume: "Resume your diagnostic", fresh: "Start fresh", note: (n) => `We saved your progress on this device — ${n} question${n === 1 ? "" : "s"} answered.` },
              ar: { resume: "استأنف تشخيصك", fresh: "ابدأ من جديد", note: (n) => `حفظنا تقدمك على هذا الجهاز — تمت الإجابة على ${n} سؤال.` },
              fr: { resume: "Reprendre votre diagnostic", fresh: "Recommencer", note: (n) => `Nous avons enregistré votre progression sur cet appareil — ${n} question(s) répondues.` },
            };
            const rl = RESUME_COPY[locale as keyof typeof RESUME_COPY] ?? RESUME_COPY.en;
            if (canResume) {
              return (
                <>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleResume}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--warm-coral)] to-emerald-500 text-white text-base font-bold rounded-xl shadow-2xl shadow-[var(--warm-coral)]/30 hover:shadow-[var(--warm-coral)]/50 transition-all"
                    >
                      {rl.resume}
                      <Sparkles className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleStartFresh}
                      className="inline-flex items-center gap-1.5 px-5 py-3 text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      {rl.fresh}
                    </button>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-3">
                    {rl.note(answeredCount(savedProgress?.responses))}
                  </p>
                </>
              );
            }
            return (
              <>
                <button
                  onClick={handleStart}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--warm-coral)] to-emerald-500 text-white text-base font-bold rounded-xl shadow-2xl shadow-[var(--warm-coral)]/30 hover:shadow-[var(--warm-coral)]/50 transition-all"
                >
                  {copy.intro.start}
                  <Sparkles className="w-4 h-4" />
                </button>
                <p className="text-xs text-[var(--text-muted)] mt-3">
                  {copy.intro.note}
                </p>
              </>
            );
          })()}
        </motion.div>

        {/* What you get */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {copy.features.map((feat, i) => {
            const Icon = i === 0 ? Clock : i === 1 ? FileText : ShieldCheck;
            return (
            <div
              key={i}
              className="rounded-2xl bg-white/[0.025] border border-[var(--border-default)] p-5"
            >
              <Icon className="w-6 h-6 text-[var(--warm-coral)] mb-3" />
              <h3 className="text-base font-bold text-[var(--text-display)] mb-2">{feat.title}</h3>
              <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{feat.detail}</p>
            </div>
          )})}
        </motion.div>

        {/* What we ask */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 rounded-2xl bg-white/[0.02] border border-[var(--border-default)] p-6 md:p-8"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)] mb-3">
            {copy.intro.whatWeAsk}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
            {[
              { label: copy.dimensions.profile, note: `${catalog.questions.segment.prompt} · ${catalog.questions.outlets.prompt}` },
              { label: copy.dimensions.crew, note: `${catalog.questions.scheduling_tool.prompt} · ${catalog.questions.labor_pain.prompt}` },
              { label: copy.dimensions.core, note: `${catalog.questions.kpis_measured.prompt} · ${catalog.questions.kpis_wished.prompt}` },
              { label: copy.dimensions.foresight, note: `${catalog.questions.forecasting.prompt} · ${catalog.questions.scenario_wish.prompt}` },
              { label: copy.dimensions.tech, note: `${catalog.questions.pos.prompt} · ${catalog.questions.priority.prompt}` },
            ].map((dim, i) => (
              <div key={i} className="text-center">
                <div className="font-bold text-[var(--text-primary)] mb-1">{dim.label}</div>
                <div className="text-[10px] text-[var(--text-muted)] leading-snug">{dim.note}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Alternative path */}
        <div className="text-center mt-10">
          <p className="text-sm text-[var(--text-muted)]">
            {copy.intro.classicDemoLead}{" "}
            <Link href="/demo" className="text-[var(--warm-coral)] hover:underline font-semibold">
              {copy.intro.classicDemoLink}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
