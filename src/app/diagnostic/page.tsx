"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Clock, FileText, ShieldCheck } from "lucide-react";
import { DiagnosticFlow } from "@/components/diagnostic/DiagnosticFlow";
import { DiagnosticReport } from "@/components/diagnostic/DiagnosticReport";
import { DiagnosticGenerating } from "@/components/diagnostic/DiagnosticGenerating";
import { runDiagnostic, type DiagnosticResponses, type DiagnosticReport as DiagnosticReportType } from "@/lib/diagnostic/engine";

type Stage = "intro" | "flow" | "generating" | "report";

export default function DiagnosticPage() {
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

    // Call AI gateway (Sonnet 4.6 primary → GPT-5 fallback → heuristic safety net).
    // The API route guarantees a report is always returned — graceful degradation
    // across all three engines means we never error to the user.
    let result: DiagnosticReportType;
    // Internal-only: which engine produced the report (for sales/debug). Never
    // surfaced to the prospect — only attached to the lead metadata.
    let aiSource: string | null = null;
    try {
      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responses: data.responses,
          leadData: { name: data.name, role: data.role, country: data.country, company: data.company },
        }),
      });
      if (!res.ok) throw new Error(`AI gateway returned ${res.status}`);
      const payload = await res.json();
      result = payload.report as DiagnosticReportType;
      aiSource = typeof payload.source === "string" ? payload.source : null;
    } catch (err) {
      // Client-side last-resort fallback if even the API endpoint is unreachable
      console.error("[diagnostic] API unreachable, falling to client heuristic:", err);
      result = runDiagnostic(data.responses);
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
          // report → branded email + admin AI Assessment drawer.
          // aiSource is internal-only (engine used); never shown to the prospect.
          metadata: { responses: data.responses, report: result, aiSource },
        }),
      }).catch(() => {});
    }

    setStage("report");
  };

  if (stage === "report" && report && leadData) {
    return <DiagnosticReport report={report} leadData={leadData} />;
  }

  if (stage === "generating" && leadData) {
    return <DiagnosticGenerating name={leadData.name} />;
  }

  if (stage === "flow") {
    return <DiagnosticFlow onComplete={handleComplete} />;
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--electric-blue)]/12 border border-[var(--electric-blue)]/30 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[var(--electric-blue)]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--electric-blue)]">
              AI-powered · 10 minutes
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-4 text-balance">
            Get your Sundae Operations Diagnostic.
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-supporting)] max-w-3xl mx-auto mb-10 text-balance">
            Answer 15 strategic questions about your operation. Sundae generates
            a personalized diagnostic showing the margin leaks we&rsquo;d surface,
            the recommended stack, and a 30/60/90 plan you can share with your
            team.
          </p>

          <button
            onClick={handleStart}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--electric-blue)] to-emerald-500 text-white text-base font-bold rounded-xl shadow-2xl shadow-[var(--electric-blue)]/30 hover:shadow-[var(--electric-blue)]/50 transition-all"
          >
            Start your diagnostic
            <Sparkles className="w-4 h-4" />
          </button>
          <p className="text-xs text-[var(--text-muted)] mt-3">
            Takes ~10 minutes · No credit card · Premium report at the end
          </p>
        </motion.div>

        {/* What you get */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { icon: Clock, title: "10 minutes", detail: "15 chip-based questions across operation, workforce, decision intelligence, foresight, and tech stack." },
            { icon: FileText, title: "Premium report", detail: "Top-3 margin leak hypotheses, recommended Sundae stack, expected impact ranges, 30/60/90 plan — premium-styled and shareable." },
            { icon: ShieldCheck, title: "Honest output", detail: "Directional ranges only, never customer-specific projections. We tell you what we'd surface, not what we'd promise." },
          ].map((feat, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/[0.025] border border-[var(--border-default)] p-5"
            >
              <feat.icon className="w-6 h-6 text-[var(--electric-blue)] mb-3" />
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">{feat.title}</h3>
              <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{feat.detail}</p>
            </div>
          ))}
        </motion.div>

        {/* What we ask */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 rounded-2xl bg-white/[0.02] border border-[var(--border-default)] p-6 md:p-8"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)] mb-3">
            What we&rsquo;ll ask about
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
            {[
              { label: "Operation profile", note: "Segment · outlets · region" },
              { label: "Workforce", note: "Scheduling · payroll · pain points" },
              { label: "Decision intelligence", note: "KPIs you track + wish you tracked" },
              { label: "Foresight", note: "Forecasting · scenarios · blind spots" },
              { label: "Tech stack", note: "POS · ops tools · 90-day priority" },
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
            Prefer a classic demo request?{" "}
            <Link href="/demo" className="text-[var(--electric-blue)] hover:underline font-semibold">
              Use the contact form here
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
