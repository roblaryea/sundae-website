"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Clock, FileText, ShieldCheck } from "lucide-react";
import { DiagnosticFlow } from "@/components/diagnostic/DiagnosticFlow";
import { DiagnosticReport } from "@/components/diagnostic/DiagnosticReport";
import { runDiagnostic, type DiagnosticResponses, type DiagnosticReport as DiagnosticReportType } from "@/lib/diagnostic/engine";

type Stage = "intro" | "flow" | "report";

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

  const handleComplete = (data: {
    responses: DiagnosticResponses;
    email: string;
    name: string;
    company: string;
    phone: string;
    role: string;
    country: string;
  }) => {
    // v1: heuristic engine. v2 swaps this for a /api/diagnostic POST that
    // wraps the Sundae AI gateway. Same return shape, no UX changes.
    const result = runDiagnostic(data.responses);
    setReport(result);
    setLeadData({
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      role: data.role,
      country: data.country,
    });

    // Fire-and-forget lead capture so we don't block the report render.
    // Wires into the same /api/cta/submit endpoint the rest of the site uses.
    // Includes ALL the info the diagnostic gathered — no re-prompting on
    // downstream CTAs.
    if (typeof window !== "undefined") {
      void fetch("/api/cta/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "diagnostic",
          name: data.name,
          email: data.email,
          company: data.company,
          phone: data.phone,
          role: data.role,
          country: data.country,
          message: `Diagnostic submitted. Profile: ${result.profileLine}. Tier fit: ${result.tierFit}.`,
          metadata: { responses: data.responses, report: result },
        }),
      }).catch(() => {
        // Non-fatal — diagnostic still renders even if lead capture fails.
      });
    }

    setStage("report");
  };

  if (stage === "report" && report && leadData) {
    return <DiagnosticReport report={report} leadData={leadData} />;
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
