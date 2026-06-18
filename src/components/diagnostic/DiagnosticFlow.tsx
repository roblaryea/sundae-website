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

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";
import { QUESTIONS } from "@/lib/diagnostic/questions";
import type { DiagnosticResponses } from "@/lib/diagnostic/engine";
import { getWebsiteIntlLocale, type WebsiteLocale } from "@/lib/i18n";
import { getDiagnosticCatalogCopy, getDiagnosticQuestionCopy } from "@/lib/diagnostic/questionTranslations";
import { saveProgress, type DiagnosticProgress } from "@/lib/diagnostic/progress";
import { companyFromEmail, emailDomain, isFreeMail } from "@/lib/diagnostic/enrich";
import { trackEvent } from "@/lib/posthog";

interface DiagnosticFlowProps {
  locale: WebsiteLocale;
  /** When resuming, the saved draft to seed the flow from. */
  initialProgress?: DiagnosticProgress | null;
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneOk = (v: string) => /\d{6,}/.test(v.replace(/[\s\-()]/g, ""));

// Common roles for the role dropdown - covers ICP buyer titles.
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

// Common countries - leads with our strategic hubs and expansion markets.
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

const COUNTRY_REGION_CODES: Record<string, string> = {
  "United Arab Emirates": "AE",
  "Saudi Arabia": "SA",
  Qatar: "QA",
  Kuwait: "KW",
  Bahrain: "BH",
  Oman: "OM",
  Egypt: "EG",
  "United States": "US",
  Canada: "CA",
  "United Kingdom": "GB",
  Netherlands: "NL",
  Germany: "DE",
  France: "FR",
  Spain: "ES",
  Italy: "IT",
  Singapore: "SG",
  Japan: "JP",
  Australia: "AU",
  India: "IN",
  Mexico: "MX",
  Brazil: "BR",
  "South Africa": "ZA",
};

export function DiagnosticFlow({ onComplete, locale, initialProgress }: DiagnosticFlowProps) {
  const catalog = getDiagnosticCatalogCopy(locale);
  const regionNames =
    typeof Intl.DisplayNames !== "undefined"
      ? new Intl.DisplayNames([getWebsiteIntlLocale(locale)], { type: "region" })
      : null;
  const cap = initialProgress?.capture;
  const [step, setStep] = useState(initialProgress?.step ?? 0);
  const [responses, setResponses] = useState<DiagnosticResponses>(initialProgress?.responses ?? {});
  const [showCapture, setShowCapture] = useState(initialProgress?.showCapture ?? false);
  const [email, setEmail] = useState(cap?.email ?? "");
  const [name, setName] = useState(cap?.name ?? "");
  const [company, setCompany] = useState(cap?.company ?? "");
  const [phone, setPhone] = useState(cap?.phone ?? "");
  const [role, setRole] = useState(cap?.role ?? "");
  const [country, setCountry] = useState(cap?.country ?? "");
  // Validation + enrichment UI state.
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [companyAutoFilled, setCompanyAutoFilled] = useState(false);

  const emailValid = EMAIL_RE.test(email.trim());
  const phoneValid = phoneOk(phone);
  const showEmailErr = emailTouched && email.trim().length > 0 && !emailValid;
  const showPhoneErr = phoneTouched && phone.trim().length > 0 && !phoneValid;
  const VAL_COPY: Record<string, { email: string; phone: string; autofill: string }> = {
    en: { email: "Enter a valid work email", phone: "Enter a valid phone number", autofill: "Filled from your email — edit if needed" },
    ar: { email: "أدخل بريداً إلكترونياً صالحاً", phone: "أدخل رقم هاتف صالحاً", autofill: "تم ملؤه من بريدك — عدّله إن لزم" },
    fr: { email: "Saisissez un e-mail professionnel valide", phone: "Saisissez un numéro de téléphone valide", autofill: "Rempli depuis votre e-mail — modifiable" },
  };
  const vc = VAL_COPY[locale] ?? VAL_COPY.en;

  // Persist progress on this device so a refresh / back / "finish later" never
  // wipes the answers. Parent clears it on successful submit.
  useEffect(() => {
    saveProgress({
      responses,
      step,
      showCapture,
      capture: { name, email, company, phone, role, country },
    });
  }, [responses, step, showCapture, name, email, company, phone, role, country]);

  const total = QUESTIONS.length;
  const q = QUESTIONS[step];
  const localizedQuestion = q ? getDiagnosticQuestionCopy(locale, q.id) : undefined;
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
      const next = step + 1;
      setStep(next);
      trackEvent("diagnostic_step", { locale, step: next + 1, total: total + 1, dimension: QUESTIONS[next]?.dimension });
    } else {
      setShowCapture(true);
      trackEvent("diagnostic_capture_shown", { locale });
    }
  };

  // Best-effort company prefill from a corporate email domain (no API). Only
  // fills when the user hasn't typed their own company, and is overridable.
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (EMAIL_RE.test(value.trim()) && (!company.trim() || companyAutoFilled)) {
      const guess = companyFromEmail(value.trim());
      if (guess) {
        setCompany(guess);
        setCompanyAutoFilled(true);
      }
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
    setEmailTouched(true);
    setPhoneTouched(true);
    if (
      emailValid && phoneValid && name.trim() && role.trim() &&
      country.trim() && company.trim()
    ) {
      // Capture B2B-vs-consumer + domain as lead-scoring signal (no PII beyond
      // what the prospect already submits).
      trackEvent("diagnostic_lead_captured", {
        locale, role, country,
        emailDomain: emailDomain(email),
        corporateEmail: !isFreeMail(email),
      });
      onComplete({ responses, email: email.trim(), name, company, phone, role, country });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--navy-deep)] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Progress bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            {showCapture ? catalog.navigation.finalStep : catalog.dimensions[q?.dimension ?? "profile"]}
          </span>
          <span className="text-[11px] text-[var(--text-muted)] tabular-nums">
            {showCapture ? total + 1 : step + 1} / {total + 1}
          </span>
        </div>
        <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--warm-coral)] to-emerald-400"
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
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-display)] mb-2 text-balance">
                {localizedQuestion?.prompt ?? q.prompt}
              </h2>
              {(localizedQuestion?.helper ?? q.helper) && (
                <p className="text-sm text-[var(--text-muted)] mb-8">{localizedQuestion?.helper ?? q.helper}</p>
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
                            ? "bg-[var(--warm-coral)]/12 border-[var(--warm-coral)] text-[var(--text-primary)]"
                            : "bg-white/[0.02] border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--warm-coral)]/40"
                        }`}
                      >
                        <span className={`flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? "bg-[var(--warm-coral)] border-[var(--warm-coral)]" : "border-[var(--border-default)]"
                        }`}>
                          {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                        </span>
                        <span className="text-sm font-medium">{localizedQuestion?.options?.[opt.value] ?? opt.label}</span>
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
                    placeholder={localizedQuestion?.placeholder ?? q.placeholder}
                    maxLength={q.maxLength}
                    rows={3}
                    className="w-full bg-white/[0.04] border-2 border-[var(--border-default)] focus:border-[var(--warm-coral)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none resize-none"
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
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-display)] mb-2 text-balance">
                {catalog.capture.title}
              </h2>
              <p className="text-sm text-[var(--text-muted)] mb-8">
                {catalog.capture.helper}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                    {catalog.capture.fields.name}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={catalog.capture.placeholders.name}
                    required
                    className="w-full bg-white/[0.04] border-2 border-[var(--border-default)] focus:border-[var(--warm-coral)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                    {catalog.capture.fields.role}
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="w-full bg-white/[0.04] border-2 border-[var(--border-default)] focus:border-[var(--warm-coral)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none"
                  >
                    <option value="">{catalog.capture.placeholders.role}</option>
                    {ROLE_OPTIONS.map((r) => (
                      <option key={r} value={r}>{catalog.roles[r] ?? r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                    {catalog.capture.fields.email}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    placeholder={catalog.capture.placeholders.email}
                    required
                    aria-invalid={showEmailErr}
                    className={`w-full bg-white/[0.04] border-2 rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none ${
                      showEmailErr ? "border-red-500/60 focus:border-red-500" : "border-[var(--border-default)] focus:border-[var(--warm-coral)]"
                    }`}
                  />
                  {showEmailErr && (
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-red-400">
                      <AlertCircle className="w-3 h-3" /> {vc.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                    {catalog.capture.fields.phone}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => setPhoneTouched(true)}
                    placeholder={catalog.capture.placeholders.phone}
                    required
                    aria-invalid={showPhoneErr}
                    className={`w-full bg-white/[0.04] border-2 rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none ${
                      showPhoneErr ? "border-red-500/60 focus:border-red-500" : "border-[var(--border-default)] focus:border-[var(--warm-coral)]"
                    }`}
                  />
                  {showPhoneErr && (
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-red-400">
                      <AlertCircle className="w-3 h-3" /> {vc.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                    {catalog.capture.fields.country}
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className="w-full bg-white/[0.04] border-2 border-[var(--border-default)] focus:border-[var(--warm-coral)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none"
                  >
                    <option value="">{catalog.capture.placeholders.country}</option>
                    {COUNTRY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {COUNTRY_REGION_CODES[c] && regionNames
                          ? regionNames.of(COUNTRY_REGION_CODES[c]) ?? c
                          : catalog.countries[c] ?? c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                    {catalog.capture.fields.company}
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => { setCompany(e.target.value); setCompanyAutoFilled(false); }}
                    placeholder={catalog.capture.placeholders.company}
                    required
                    className="w-full bg-white/[0.04] border-2 border-[var(--border-default)] focus:border-[var(--warm-coral)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none"
                  />
                  {companyAutoFilled && company.trim().length > 0 && (
                    <p className="mt-1 text-[11px] text-[var(--text-muted)]">{vc.autofill}</p>
                  )}
                </div>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] text-center mb-6 italic">
                {catalog.capture.requiredNote}
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
            {catalog.navigation.back}
          </button>
          {showCapture ? (
            <button
              onClick={handleSubmit}
              disabled={!emailValid || !phoneValid || !name.trim() || !role.trim() || !country.trim() || !company.trim()}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[var(--warm-coral)] to-emerald-500 text-white font-bold rounded-xl shadow-lg disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-xl transition-all"
            >
              {catalog.navigation.generate}
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canAdvance}
              className="flex items-center gap-2 px-6 py-2.5 bg-[var(--warm-coral)] text-white font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--warm-coral)]/90 transition-colors"
            >
              {step === total - 1 ? catalog.navigation.continue : catalog.navigation.next}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
