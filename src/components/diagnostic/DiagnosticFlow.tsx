"use client";

/**
 * Chip-based diagnostic question flow.
 *
 * Progressive single-question display with chip multi/single select
 * and limited free-text. Progress bar at top, dimension dots
 * (profile/crew/core/foresight/tech), Back/Next nav. On final submit,
 * calls onComplete with the assembled responses + the prospect's
 * email + name (captured at the end).
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { QUESTIONS } from "@/lib/diagnostic/questions";
import type { DiagnosticResponses } from "@/lib/diagnostic/engine";

interface DiagnosticFlowProps {
  onComplete: (data: {
    responses: DiagnosticResponses;
    email: string;
    name: string;
    company: string;
    phone: string;
    role: string;
    country: string;
  }) => void;
}

// Common roles for the role dropdown — covers ICP buyer titles.
const ROLE_OPTIONS = [
  "CEO / Founder / Owner",
  "COO / Operations Director",
  "CFO / Finance Director",
  "Regional / Area Manager",
  "Franchise Owner",
  "Head of People / HR",
  "Head of Marketing",
  "Head of Technology / Data",
  "General Manager",
  "Consultant / Advisor",
  "Other",
];

// Common countries — leads with our strategic hubs and expansion markets.
const COUNTRY_OPTIONS = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Egypt",
  "United States",
  "Canada",
  "United Kingdom",
  "Netherlands",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Singapore",
  "Japan",
  "Australia",
  "India",
  "Mexico",
  "Brazil",
  "South Africa",
  "Other",
];

const DIMENSION_LABELS: Record<string, string> = {
  profile: "Operation profile",
  crew: "Workforce",
  core: "Decision intelligence",
  foresight: "Foresight",
  tech: "Tech stack",
};

export function DiagnosticFlow({ onComplete }: DiagnosticFlowProps) {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<DiagnosticResponses>({});
  const [showCapture, setShowCapture] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");

  const total = QUESTIONS.length;
  const q = QUESTIONS[step];
  const progress = ((step + (showCapture ? 1 : 0)) / (total + 1)) * 100;

  const currentValue = responses[q?.id];

  const canAdvance = useMemo(() => {
    if (!q) return false;
    if (q.optional) return true;
    const v = responses[q.id];
    if (q.kind === "text") return typeof v === "string" && v.trim().length > 0;
    if (q.kind === "multi") return Array.isArray(v) && v.length > 0;
    return typeof v === "string" && v.length > 0;
  }, [q, responses]);

  const handleChipToggle = (value: string) => {
    if (!q) return;
    if (q.kind === "single") {
      setResponses({ ...responses, [q.id]: value });
    } else if (q.kind === "multi") {
      const arr = Array.isArray(responses[q.id]) ? (responses[q.id] as string[]) : [];
      setResponses({
        ...responses,
        [q.id]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      });
    }
  };

  const handleText = (value: string) => {
    if (!q) return;
    setResponses({ ...responses, [q.id]: value });
  };

  const handleNext = () => {
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      setShowCapture(true);
    }
  };

  const handleBack = () => {
    if (showCapture) {
      setShowCapture(false);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (email.trim() && name.trim() && phone.trim() && role.trim() && country.trim()) {
      onComplete({ responses, email, name, company, phone, role, country });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--navy-deep)] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Progress bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            {showCapture ? "Final step · Almost done" : DIMENSION_LABELS[q?.dimension ?? "profile"]}
          </span>
          <span className="text-[11px] text-[var(--text-muted)] tabular-nums">
            {showCapture ? total + 1 : step + 1} / {total + 1}
          </span>
        </div>
        <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--electric-blue)] to-emerald-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {!showCapture && q && (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2 text-balance">
                {q.prompt}
              </h2>
              {q.helper && (
                <p className="text-sm text-[var(--text-muted)] mb-8">{q.helper}</p>
              )}

              {/* Chip select */}
              {(q.kind === "single" || q.kind === "multi") && q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                  {q.options.map((opt) => {
                    const isSelected = q.kind === "single"
                      ? currentValue === opt.value
                      : Array.isArray(currentValue) && currentValue.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleChipToggle(opt.value)}
                        className={`text-left px-4 py-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
                          isSelected
                            ? "bg-[var(--electric-blue)]/12 border-[var(--electric-blue)] text-[var(--text-primary)]"
                            : "bg-white/[0.02] border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--electric-blue)]/40"
                        }`}
                      >
                        <span className={`flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? "bg-[var(--electric-blue)] border-[var(--electric-blue)]" : "border-[var(--border-default)]"
                        }`}>
                          {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                        </span>
                        <span className="text-sm font-medium">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Free text */}
              {q.kind === "text" && (
                <div className="mb-8">
                  <textarea
                    value={(currentValue as string) ?? ""}
                    onChange={(e) => handleText(e.target.value)}
                    placeholder={q.placeholder}
                    maxLength={q.maxLength}
                    rows={3}
                    className="w-full bg-white/[0.04] border-2 border-[var(--border-default)] focus:border-[var(--electric-blue)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none resize-none"
                  />
                  {q.maxLength && (
                    <div className="text-right text-[10px] text-[var(--text-muted)] mt-1">
                      {((currentValue as string) ?? "").length} / {q.maxLength}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {showCapture && (
            <motion.div
              key="capture"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2 text-balance">
                Where should we send your diagnostic?
              </h2>
              <p className="text-sm text-[var(--text-muted)] mb-8">
                Your personalized Sundae Operations Diagnostic is ready. We&rsquo;ll
                show it on the next screen and email a copy you can share with
                your team.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                    Full name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    required
                    className="w-full bg-white/[0.04] border-2 border-[var(--border-default)] focus:border-[var(--electric-blue)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                    Role / Title *
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="w-full bg-white/[0.04] border-2 border-[var(--border-default)] focus:border-[var(--electric-blue)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none"
                  >
                    <option value="">Select your role…</option>
                    {ROLE_OPTIONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                    Work email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full bg-white/[0.04] border-2 border-[var(--border-default)] focus:border-[var(--electric-blue)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                    Phone (with country code) *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 50 123 4567"
                    required
                    className="w-full bg-white/[0.04] border-2 border-[var(--border-default)] focus:border-[var(--electric-blue)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                    Country *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className="w-full bg-white/[0.04] border-2 border-[var(--border-default)] focus:border-[var(--electric-blue)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none"
                  >
                    <option value="">Select country…</option>
                    {COUNTRY_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                    Company <span className="text-[var(--text-muted)] normal-case font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Restaurant group / brand"
                    className="w-full bg-white/[0.04] border-2 border-[var(--border-default)] focus:border-[var(--electric-blue)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none"
                  />
                </div>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] text-center mb-6 italic">
                Fields marked * are required. Your information is captured once here and reused across the diagnostic CTAs — no second forms to fill.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav */}
        <div className="flex justify-between mt-8 pt-6 border-t border-[var(--border-default)]">
          <button
            onClick={handleBack}
            disabled={step === 0 && !showCapture}
            className="flex items-center gap-1.5 px-4 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          {showCapture ? (
            <button
              onClick={handleSubmit}
              disabled={!email.trim() || !name.trim() || !phone.trim() || !role.trim() || !country.trim()}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[var(--electric-blue)] to-emerald-500 text-white font-bold rounded-xl shadow-lg disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-xl transition-all"
            >
              Generate my diagnostic
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canAdvance}
              className="flex items-center gap-2 px-6 py-2.5 bg-[var(--electric-blue)] text-white font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--electric-blue)]/90 transition-colors"
            >
              {step === total - 1 ? "Continue" : "Next"}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
