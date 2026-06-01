"use client";

/**
 * Premium-styled diagnostic report renderer.
 * Receives a DiagnosticReport from the engine and renders:
 *   • Hero with profile line + summary
 *   • Top-3 ranked leak hypotheses (cards w/ impact band)
 *   • Recommended Sundae stack (visual stack diagram)
 *   • Expected impact ranges
 *   • 30/60/90 quick wins (timeline)
 *   • Three CTAs: book deep-dive, pricing simulator, Crew trial
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, TrendingUp, Layers, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
import type { DiagnosticReport } from "@/lib/diagnostic/engine";

interface DiagnosticReportProps {
  report: DiagnosticReport;
  name: string;
  email: string;
}

const layerColor: Record<string, string> = {
  core: "from-violet-500/20 to-violet-600/5 border-violet-500/40",
  crew: "from-cyan-500/20 to-cyan-600/5 border-cyan-500/40",
  watchtower: "from-amber-500/20 to-amber-600/5 border-amber-500/40",
  intelligence: "from-pink-500/20 to-pink-600/5 border-pink-500/40",
  foresight: "from-sky-500/20 to-sky-600/5 border-sky-500/40",
};

const layerAccent: Record<string, string> = {
  core: "text-violet-300",
  crew: "text-cyan-300",
  watchtower: "text-amber-300",
  intelligence: "text-pink-300",
  foresight: "text-sky-300",
};

const impactBandStyle: Record<string, string> = {
  high: "bg-red-500/15 text-red-300 border-red-500/30",
  medium: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  low: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
};

export function DiagnosticReport({ report, name }: DiagnosticReportProps) {
  const firstName = name.split(" ")[0] || "there";

  return (
    <div className="min-h-screen bg-[var(--navy-deep)] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--electric-blue)]/12 border border-[var(--electric-blue)]/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[var(--electric-blue)]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--electric-blue)]">
              Sundae Operations Diagnostic
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-3 text-balance">
            {firstName}, here&rsquo;s what Sundae would surface.
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-supporting)] max-w-2xl mx-auto">
            {report.profileLine}
          </p>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="rounded-2xl bg-gradient-to-br from-[var(--electric-blue)]/8 to-transparent border border-[var(--electric-blue)]/30 p-6 md:p-8 mb-8"
        >
          <p className="text-base md:text-lg text-[var(--text-primary)] leading-relaxed">
            {report.summary}
          </p>
        </motion.div>

        {/* Top 3 leak hypotheses */}
        {report.topLeaks.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[var(--electric-blue)]" />
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                Top {report.topLeaks.length} margin-leak hypotheses
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {report.topLeaks.map((leak, i) => (
                <motion.div
                  key={leak.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  className="rounded-2xl bg-white/[0.025] border border-[var(--border-default)] p-5 hover:border-[var(--electric-blue)]/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--electric-blue)]/15 border border-[var(--electric-blue)]/30 text-[var(--electric-blue)] text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${impactBandStyle[leak.impactBand]}`}>
                      {leak.impactBand} impact
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">
                    {leak.title}
                  </h3>
                  <p className="text-xs text-[var(--text-supporting)] leading-relaxed mb-3">
                    {leak.detail}
                  </p>
                  <div className="pt-3 border-t border-[var(--border-default)]">
                    <p className="text-[11px] text-emerald-300 leading-snug italic">
                      {leak.impactCopy}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Recommended stack */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-[var(--electric-blue)]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              Recommended Sundae stack
            </h2>
          </div>
          <div className="rounded-2xl border-2 border-dashed border-[var(--electric-blue)]/30 bg-[var(--electric-blue)]/[0.04] p-5 mb-4">
            <p className="text-[11px] uppercase tracking-[0.16em] font-bold text-[var(--electric-blue)] mb-1">
              Tier fit
            </p>
            <p className="text-lg font-bold text-[var(--text-primary)]">{report.tierFit}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {report.recommendedStack.map((s, i) => (
              <motion.div
                key={`${s.layer}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
                className={`rounded-xl bg-gradient-to-br border p-4 ${layerColor[s.layer] ?? "from-white/[0.025] to-transparent border-[var(--border-default)]"}`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${layerAccent[s.layer] ?? "text-[var(--text-muted)]"}`}>
                      {s.layer}
                    </p>
                    <h4 className="text-sm font-bold text-[var(--text-primary)]">{s.label}</h4>
                    <p className="text-[11px] text-[var(--text-supporting)]">{s.detail}</p>
                  </div>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] leading-snug pt-2 border-t border-white/[0.05]">
                  {s.why}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Expected impact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              Expected impact ranges
            </h2>
          </div>
          <p className="text-xs text-[var(--text-muted)] mb-4 italic">
            Directional ranges derived from comparable operator engagements.
            Not customer-specific projections.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {report.expectedImpact.map((item) => (
              <div
                key={item.metric}
                className="rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20 p-4"
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 mb-1">
                  {item.metric}
                </p>
                <p className="text-lg font-bold text-[var(--text-primary)]">{item.range}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 30/60/90 Quick Wins */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-[var(--electric-blue)]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              30/60/90-day plan
            </h2>
          </div>
          <div className="space-y-3">
            {report.quickWins.map((win, i) => (
              <motion.div
                key={win.horizon}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                className="flex gap-4 items-start rounded-xl bg-white/[0.025] border border-[var(--border-default)] p-4"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[var(--electric-blue)]/12 border border-[var(--electric-blue)]/30 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-[var(--electric-blue)] leading-none tabular-nums">{win.horizon}</span>
                  <span className="text-[9px] uppercase text-[var(--electric-blue)]/70 tracking-wider">days</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">{win.title}</h4>
                  <p className="text-xs text-[var(--text-supporting)] leading-relaxed">{win.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTAs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-br from-[var(--electric-blue)]/15 via-[var(--electric-blue)]/8 to-emerald-500/8 border border-[var(--electric-blue)]/30 p-6 md:p-10 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2 text-balance">
            Want to see this on your real data?
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-supporting)] mb-6 max-w-2xl mx-auto">
            Three ways to move forward — pick the one that fits where you are.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-[var(--electric-blue)] text-white font-bold px-5 py-3 hover:bg-[var(--electric-blue)]/90 transition-colors flex items-center justify-center gap-2"
            >
              Book deep-dive call
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="https://pricing.sundae.io"
              target="_blank"
              rel="noopener"
              className="rounded-xl bg-white/[0.06] border border-[var(--border-default)] text-[var(--text-primary)] font-bold px-5 py-3 hover:bg-white/[0.1] transition-colors flex items-center justify-center gap-2"
            >
              Open pricing simulator
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/crew"
              className="rounded-xl bg-white/[0.06] border border-[var(--border-default)] text-[var(--text-primary)] font-bold px-5 py-3 hover:bg-white/[0.1] transition-colors flex items-center justify-center gap-2"
            >
              Start with Crew Lite
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] mt-6 italic">
            Your diagnostic has been emailed for your records. Share it with
            your COO / CFO / operations partner — every CTA above gives them a
            substantive next step.
          </p>
        </motion.section>
      </div>
    </div>
  );
}
