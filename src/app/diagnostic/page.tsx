"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Clock, FileText, ShieldCheck } from "lucide-react";
import { DiagnosticFlow } from "@/components/diagnostic/DiagnosticFlow";
import { DiagnosticReport } from "@/components/diagnostic/DiagnosticReport";
import { DiagnosticGenerating } from "@/components/diagnostic/DiagnosticGenerating";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { runDiagnostic, type DiagnosticResponses, type DiagnosticReport as DiagnosticReportType } from "@/lib/diagnostic/engine";
import { getDiagnosticCopy } from "@/lib/diagnostic/i18n";
import { getDiagnosticCatalogCopy } from "@/lib/diagnostic/questionTranslations";

type Stage = "intro" | "flow" | "generating" | "report" | "error";

export default function DiagnosticPage() {
  const { locale } = useWebsiteI18n();
  const copy = getDiagnosticCopy(locale);
  const catalog = getDiagnosticCatalogCopy(locale);
  const [stage, setStage] = useState<Stage>("intro");
  const [report, setReport] = useState<DiagnosticReportType | null>(null);
  const [leadData, setLeadData] = useState<{
    name: string;
    email: string;
    company: string;
    phone: string;
    role: string;
    country: string;
  } | null>(null);

  const handleStart = () => setStage("flow");

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
    setStage("generating");

    // Call AI gateway (Sonnet 4.6 primary → GPT-5 fallback). English can use
    // the deterministic heuristic safety net; other locales fail in-language
    // rather than showing an English report.
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
      if (locale !== "en") {
        setStage("error");
        return;
      }
      result = runDiagnostic(data.responses, locale);
      aiSource = "client-heuristic";
    }

    setReport(result);

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
    return <DiagnosticReport report={report} leadData={leadData} locale={locale} />;
  }

  if (stage === "generating" && leadData) {
    return <DiagnosticGenerating name={leadData.name} locale={locale} />;
  }

  if (stage === "error") {
    return (
      <div className="min-h-screen bg-[var(--navy-deep)] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
            {copy.share.notFoundTitle}
          </h1>
          <p className="text-base text-[var(--text-supporting)] mb-8">
            {copy.share.notFoundBody}
          </p>
          <button
            onClick={() => setStage("flow")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--warm-coral)] text-white text-sm font-bold rounded-xl"
          >
            {copy.share.notFoundCta}
          </button>
        </div>
      </div>
    );
  }

  if (stage === "flow") {
    return <DiagnosticFlow onComplete={handleComplete} locale={locale} />;
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-4 text-balance">
            {copy.intro.title}
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-supporting)] max-w-3xl mx-auto mb-10 text-balance">
            {copy.intro.body}
          </p>

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
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">{feat.title}</h3>
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
