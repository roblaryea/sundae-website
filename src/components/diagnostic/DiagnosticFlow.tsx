"use client";

/**
 * Step-by-step diagnostic form (the "classic" renderer of the question bank).
 *
 * One question per screen, in five parts shown as five progress segments.
 * Conditional questions appear or disappear as answers change, optional
 * questions have a Skip, and progress is saved on this device after every
 * answer. Name is asked first; email, company and role come last.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Check, ChevronLeft, ChevronRight, MapPin, MessageCircle, Search, X } from "lucide-react";
import {
  COUNTRY_CODES,
  DIAGNOSTIC_PARTS,
  POS_BRAND_NAMES,
  QUESTIONS_BY_ID,
  orderPosOptions,
  type DiagnosticResponses,
  type Question,
  type QuestionOption,
} from "@/lib/diagnostic/questions";
import { getWebsiteIntlLocale, type WebsiteLocale } from "@/lib/i18n";
import { getDiagnosticCopy } from "@/lib/diagnostic/i18n";
import { fill } from "@/lib/diagnostic/copy";
import { getDiagnosticQuestionCopy } from "@/lib/diagnostic/questionTranslations";
import { saveProgress, type DiagnosticProgress } from "@/lib/diagnostic/progress";
// One free-mail list for every flow, identical to the backend (spec D13).
import { companyFromEmail, isFreeMailEmail } from "@/lib/freeMail";
import { MAX_LOCATIONS, MIN_LOCATIONS, parseLocationCount } from "@/lib/diagnostic/rules";
import { trackEvent } from "@/lib/posthog";
import {
  canAdvanceDiagnosticQuestion,
  diagnosticOtherKey,
  filterDiagnosticOptions,
  hasDiagnosticAnswer,
  isValidEmail,
  pruneHiddenAnswers,
  toggleDiagnosticMultiValue,
  visibleQuestions,
} from "@/lib/diagnostic/flowLogic";

export interface DiagnosticCompletion {
  responses: DiagnosticResponses;
  name: string;
  email: string;
  company: string;
  role: string;
}

interface DiagnosticFlowProps {
  locale: WebsiteLocale;
  /** When resuming, the saved draft to seed the flow from. */
  initialProgress?: DiagnosticProgress | null;
  onComplete: (data: DiagnosticCompletion) => void;
  /** Experiment properties added to every event (spec 6.4). */
  analytics?: Record<string, unknown>;
  /**
   * Set only for a guided-arm visitor who chose "Use the classic form": a
   * link back to the conversation, carrying the answers given here.
   */
  onSwitchToGuided?: (responses: DiagnosticResponses, questionId: string) => void;
  /** Called after every change, so the conversation can resume from it. */
  onProgressChange?: (responses: DiagnosticResponses, questionId: string) => void;
}

const values = (value: string | string[] | undefined): string[] =>
  Array.isArray(value) ? value : value ? [value] : [];

const inputClass =
  "w-full rounded-xl border-2 border-[var(--border-default)] bg-[var(--surface-subtle)] px-4 py-3 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--warm-coral)] focus:outline-none";

function Chip({
  selected,
  label,
  onClick,
  multi,
}: {
  selected: boolean;
  label: string;
  onClick: () => void;
  multi: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`text-start px-4 py-3 rounded-xl border-2 transition-colors flex items-center gap-3 ${
        selected
          ? "bg-[var(--warm-coral)]/12 border-[var(--warm-coral)] text-[var(--text-primary)]"
          : "bg-[var(--surface-faint)] border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--warm-coral)]/50"
      }`}
    >
      <span
        aria-hidden
        className={`flex-shrink-0 w-4 h-4 ${multi ? "rounded" : "rounded-full"} border-2 flex items-center justify-center ${
          selected ? "bg-[var(--warm-coral)] border-[var(--warm-coral)]" : "border-[var(--border-emphasis)]"
        }`}
      >
        {selected && <Check className="w-3 h-3 text-white" />}
      </span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

export function DiagnosticFlow({ onComplete, locale, initialProgress, analytics, onSwitchToGuided, onProgressChange }: DiagnosticFlowProps) {
  const copy = getDiagnosticCopy(locale);
  const track = (event: string, properties: Record<string, unknown>) => trackEvent(event, { ...properties, ...analytics });
  const flowTopRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [responses, setResponses] = useState<DiagnosticResponses>(() => initialProgress?.responses ?? {});
  const visible = useMemo(() => visibleQuestions(responses), [responses]);
  const [questionId, setQuestionId] = useState<string>(() => {
    const saved = initialProgress?.questionId;
    const resumable = initialProgress ? visibleQuestions(initialProgress.responses) : [];
    return saved && resumable.some((question) => question.id === saved) ? saved : "name";
  });
  const [query, setQuery] = useState("");
  const [touched, setTouched] = useState(false);
  const [geoCountry, setGeoCountry] = useState<string | null>(null);
  const [companyAutoFilled, setCompanyAutoFilled] = useState(false);
  const geoApplied = useRef(Boolean(initialProgress?.responses.countries));
  const payrollSeeded = useRef(Boolean(initialProgress?.responses.payroll_countries));

  const question: Question = QUESTIONS_BY_ID[questionId] ?? visible[0];
  const index = Math.max(0, visible.findIndex((item) => item.id === question.id));
  const isLast = index === visible.length - 1;
  const questionCopy = getDiagnosticQuestionCopy(locale, question.id);
  const optionLabel = (value: string) =>
    question.kind === "pos" && POS_BRAND_NAMES[value] ? POS_BRAND_NAMES[value] : questionCopy?.options?.[value] ?? value;

  const regionNames = useMemo(() => {
    try {
      return new Intl.DisplayNames([getWebsiteIntlLocale(locale)], { type: "region" });
    } catch {
      return null;
    }
  }, [locale]);
  const countryOptions = useMemo(() => {
    const collator = new Intl.Collator(getWebsiteIntlLocale(locale));
    return COUNTRY_CODES.map((code) => ({
      value: code,
      label: regionNames?.of(code) ?? code,
      searchTerms: [code] as readonly string[],
    })).sort((a, b) => collator.compare(a.label, b.label));
  }, [locale, regionNames]);
  const countryLabel = (code: string) => countryOptions.find((option) => option.value === code)?.label ?? code;

  // Save after every change so a refresh or "finish later" keeps the answers.
  const progressListener = useRef(onProgressChange);
  useEffect(() => {
    progressListener.current = onProgressChange;
  });
  useEffect(() => {
    saveProgress({ responses, questionId: question.id });
    progressListener.current?.(responses, question.id);
  }, [responses, question.id]);

  // Each step opens at the top with focus on its question.
  useEffect(() => {
    flowTopRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
    headingRef.current?.focus({ preventScroll: true });
  }, [question.id]);

  /**
   * Preselections, applied once when a step opens: the IP country guess for
   * "Where do you operate?" and the operating countries for payroll.
   */
  const withPreselection = (nextId: string, answers: DiagnosticResponses, guess: string | null): DiagnosticResponses => {
    if (nextId === "countries" && guess && !geoApplied.current && values(answers.countries).length === 0) {
      geoApplied.current = true;
      return { ...answers, countries: [guess] };
    }
    if (nextId === "payroll_countries" && !payrollSeeded.current && values(answers.payroll_countries).length === 0) {
      payrollSeeded.current = true;
      const operating = values(answers.countries);
      if (operating.length) return { ...answers, payroll_countries: operating };
    }
    return answers;
  };

  // IP country guess. If it arrives while the countries step is open, apply it then.
  const questionIdRef = useRef(questionId);
  const responsesRef = useRef(responses);
  useEffect(() => {
    questionIdRef.current = questionId;
    responsesRef.current = responses;
  });
  useEffect(() => {
    let cancelled = false;
    fetch("/api/diagnostic/geo", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { country?: unknown } | null) => {
        const code = typeof data?.country === "string" ? data.country : null;
        if (cancelled || !code || !(COUNTRY_CODES as readonly string[]).includes(code)) return;
        setGeoCountry(code);
        if (questionIdRef.current !== "countries") return;
        const preselected = withPreselection("countries", responsesRef.current, code);
        if (preselected !== responsesRef.current) setResponses(preselected);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const update = (next: DiagnosticResponses) => setResponses(pruneHiddenAnswers(next));
  const setAnswer = (id: string, value: string | string[]) => update({ ...responses, [id]: value });

  const toggle = (value: string, options: readonly QuestionOption[]) => {
    if (question.kind === "single") {
      setAnswer(question.id, value);
      return;
    }
    const next = toggleDiagnosticMultiValue(values(responses[question.id]), value, options);
    const nextResponses: DiagnosticResponses = { ...responses, [question.id]: next };
    if (!next.includes("other")) delete nextResponses[diagnosticOtherKey(question.id)];
    update(nextResponses);
  };

  const canAdvance = canAdvanceDiagnosticQuestion(question, responses);
  const answered = hasDiagnosticAnswer(question, responses);

  const goTo = (target: number) => {
    const next = visible[target];
    if (!next) return;
    setQuery("");
    setTouched(false);
    const preselected = withPreselection(next.id, responses, geoCountry);
    if (preselected !== responses) setResponses(preselected);
    setQuestionId(next.id);
    track("diagnostic_step", { locale, step: target + 1, total: visible.length, part: next.part, questionId: next.id });
  };

  const finish = () => {
    const email = String(responses.email ?? "").trim();
    const roleKey = values(responses.role)[0] ?? "other";
    track("diagnostic_lead_captured", { locale, role: roleKey, corporateEmail: !isFreeMailEmail(email) });
    onComplete({
      responses,
      name: String(responses.name ?? "").trim(),
      email,
      company: String(responses.company ?? "").trim(),
      role: roleKey,
    });
  };

  const handleNext = () => {
    setTouched(true);
    if (!canAdvance) return;
    if (isLast) finish();
    else goTo(index + 1);
  };

  const handleSkip = () => {
    const next = { ...responses };
    delete next[question.id];
    delete next[diagnosticOtherKey(question.id)];
    update(next);
    if (isLast) finish();
    else goTo(index + 1);
  };

  const onEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey && !(event.nativeEvent as KeyboardEvent).isComposing) {
      event.preventDefault();
      handleNext();
    }
  };

  const helperId = `dgx-helper-${question.id}`;
  const errorId = `dgx-error-${question.id}`;
  const promptId = `dgx-prompt-${question.id}`;
  const showError = touched && !canAdvance;

  const renderOptions = (options: readonly QuestionOption[], searchable: boolean) => {
    const filtered = searchable ? filterDiagnosticOptions(options, optionLabel, query) : [...options];
    const groups = new Map<string, QuestionOption[]>();
    for (const option of filtered) {
      const key = option.group ?? "";
      groups.set(key, [...(groups.get(key) ?? []), option]);
    }
    const selected = values(responses[question.id]);
    return (
      <div className="mb-2">
        {searchable && (
          <label className="relative mb-4 block">
            <span className="sr-only">{copy.flow.search}</span>
            <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.flow.search}
              className={`${inputClass} ps-11 text-sm`}
            />
          </label>
        )}
        <div role="group" aria-labelledby={promptId} className="space-y-4">
          {[...groups.entries()].map(([group, groupOptions]) => (
            <div key={group || "main"}>
              {group === "restaurants" && (
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)] mb-2">{copy.flow.restaurants}</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {groupOptions.map((option) => (
                  <Chip
                    key={option.value}
                    label={optionLabel(option.value)}
                    selected={selected.includes(option.value)}
                    multi={question.kind !== "single"}
                    onClick={() => toggle(option.value, options)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && <p className="py-6 text-center text-sm text-[var(--text-muted)]">{copy.flow.noMatches}</p>}
        {selected.includes("other") && (
          <input
            type="text"
            aria-label={copy.flow.otherPlaceholder}
            value={String(responses[diagnosticOtherKey(question.id)] ?? "")}
            onChange={(event) => setResponses({ ...responses, [diagnosticOtherKey(question.id)]: event.target.value })}
            onKeyDown={onEnter}
            placeholder={copy.flow.otherPlaceholder}
            maxLength={120}
            className={`${inputClass} mt-4 text-sm`}
          />
        )}
      </div>
    );
  };

  const renderCountries = () => {
    const selected = values(responses[question.id]);
    const filtered = filterDiagnosticOptions(countryOptions, countryLabel, query);
    return (
      <div>
        {question.id === "countries" && geoCountry && (
          <p className="flex items-center gap-1.5 text-sm text-[var(--text-supporting)] mb-3">
            <MapPin className="w-4 h-4 text-[var(--accent-warm)]" aria-hidden />
            {fill(copy.flow.countryGuess, { country: countryLabel(geoCountry) })}
          </p>
        )}
        {question.id === "payroll_countries" && values(responses.countries).length > 0 && (
          <p className="text-sm text-[var(--text-supporting)] mb-3">{copy.flow.preselected}</p>
        )}
        {selected.length > 0 && (
          <ul className="flex flex-wrap gap-2 mb-4" aria-label={fill(copy.flow.selectedCount, { count: selected.length })}>
            {selected.map((code) => (
              <li key={code}>
                <button
                  type="button"
                  onClick={() => setAnswer(question.id, selected.filter((item) => item !== code))}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--warm-coral)] bg-[var(--warm-coral)]/12 px-3 py-1.5 text-sm text-[var(--text-primary)]"
                >
                  {countryLabel(code)}
                  <X className="w-3.5 h-3.5" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
        <label className="relative mb-3 block">
          <span className="sr-only">{copy.flow.search}</span>
          <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.flow.search}
            className={`${inputClass} ps-11 text-sm`}
          />
        </label>
        <div role="group" aria-labelledby={promptId} className="max-h-72 overflow-y-auto rounded-xl border border-[var(--border-default)] p-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {filtered.map((option) => (
            <Chip
              key={option.value}
              label={option.label}
              selected={selected.includes(option.value)}
              multi
              onClick={() =>
                setAnswer(
                  question.id,
                  selected.includes(option.value) ? selected.filter((item) => item !== option.value) : [...selected, option.value],
                )
              }
            />
          ))}
          {filtered.length === 0 && <p className="py-6 text-center text-sm text-[var(--text-muted)] sm:col-span-2">{copy.flow.noMatches}</p>}
        </div>
      </div>
    );
  };

  const renderInput = () => {
    switch (question.kind) {
      case "name":
        return (
          <input
            type="text"
            autoComplete="given-name"
            aria-labelledby={promptId}
            aria-invalid={showError}
            aria-describedby={showError ? errorId : undefined}
            value={String(responses.name ?? "")}
            onChange={(event) => setResponses({ ...responses, name: event.target.value })}
            onBlur={() => setTouched(true)}
            onKeyDown={onEnter}
            maxLength={question.maxLength}
            placeholder={questionCopy?.placeholder}
            className={inputClass}
          />
        );
      case "number":
        return (
          <div>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="off"
              aria-labelledby={promptId}
              aria-invalid={showError}
              aria-describedby={showError ? errorId : questionCopy?.helper ? helperId : undefined}
              value={String(responses.locations ?? "")}
              onChange={(event) => setResponses({ ...responses, locations: event.target.value.slice(0, 6) })}
              onBlur={() => setTouched(true)}
              onKeyDown={onEnter}
              placeholder={copy.flow.numberLabel}
              className={`${inputClass} max-w-xs tabular-nums`}
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {question.quickPicks?.map((pick) => (
                <button
                  key={pick}
                  type="button"
                  aria-pressed={parseLocationCount(responses.locations) === pick}
                  onClick={() => setAnswer("locations", String(pick))}
                  className={`min-w-12 rounded-full border-2 px-4 py-2 text-sm font-semibold tabular-nums transition-colors ${
                    parseLocationCount(responses.locations) === pick
                      ? "border-[var(--warm-coral)] bg-[var(--warm-coral)]/12 text-[var(--text-primary)]"
                      : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--warm-coral)]/50"
                  }`}
                >
                  {new Intl.NumberFormat(getWebsiteIntlLocale(locale)).format(pick)}
                </button>
              ))}
            </div>
          </div>
        );
      case "countries":
        return renderCountries();
      case "pos":
        return renderOptions(orderPosOptions(values(responses.countries)), true);
      case "single":
      case "multi":
        return renderOptions(question.options ?? [], (question.options?.length ?? 0) > 12);
      case "longtext": {
        const text = String(responses[question.id] ?? "");
        return (
          <div>
            <textarea
              aria-labelledby={promptId}
              aria-invalid={showError}
              value={text}
              onChange={(event) => setAnswer(question.id, event.target.value)}
              placeholder={questionCopy?.placeholder}
              maxLength={question.maxLength}
              rows={3}
              className={`${inputClass} resize-none text-sm`}
            />
            <div className="text-end text-[11px] text-[var(--text-muted)] mt-1 tabular-nums">
              {text.length} / {question.maxLength}
            </div>
          </div>
        );
      }
      case "contact": {
        const email = String(responses.email ?? "");
        const emailError = touched && email.trim() && !isValidEmail(email);
        return (
          <div className="grid grid-cols-1 gap-4 max-w-xl">
            <label className="block">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">{copy.flow.emailLabel}</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  const value = event.target.value;
                  const next: DiagnosticResponses = { ...responses, email: value };
                  if (isValidEmail(value) && (!String(responses.company ?? "").trim() || companyAutoFilled)) {
                    const guess = companyFromEmail(value.trim());
                    if (guess) {
                      next.company = guess;
                      setCompanyAutoFilled(true);
                    }
                  }
                  setResponses(next);
                }}
                onBlur={() => setTouched(true)}
                onKeyDown={onEnter}
                aria-invalid={Boolean(emailError)}
                aria-describedby={emailError ? errorId : undefined}
                placeholder={copy.flow.emailPlaceholder}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">{copy.flow.companyLabel}</span>
              <input
                type="text"
                autoComplete="organization"
                value={String(responses.company ?? "")}
                onChange={(event) => {
                  setCompanyAutoFilled(false);
                  setResponses({ ...responses, company: event.target.value });
                }}
                onKeyDown={onEnter}
                maxLength={120}
                placeholder={copy.flow.companyPlaceholder}
                className={inputClass}
              />
              {companyAutoFilled && String(responses.company ?? "").trim() && (
                <span className="mt-1 block text-[11px] text-[var(--text-muted)]">{copy.flow.companyAutofill}</span>
              )}
            </label>
          </div>
        );
      }
    }
  };

  const errorMessage =
    question.kind === "name"
      ? copy.flow.nameError
      : question.kind === "number"
        ? fill(copy.flow.numberError, { min: MIN_LOCATIONS, max: new Intl.NumberFormat(getWebsiteIntlLocale(locale)).format(MAX_LOCATIONS) })
        : question.kind === "contact"
          ? copy.flow.emailError
          : null;
  const partIndex = DIAGNOSTIC_PARTS.indexOf(question.part);

  return (
    <div ref={flowTopRef} className="min-h-screen bg-[var(--navy-deep)] pt-24 pb-16 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-3xl mx-auto mb-8">
        {onSwitchToGuided && (
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={() => onSwitchToGuided(responses, question.id)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-warm)] underline underline-offset-4 hover:text-[var(--text-primary)] transition-colors"
            >
              <MessageCircle className="w-4 h-4" aria-hidden />
              {copy.convo.backToGuided}
            </button>
          </div>
        )}
        <div className="flex justify-between items-center mb-3 gap-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            {copy.parts[question.part]}
          </span>
          <span className="text-[11px] text-[var(--text-muted)] tabular-nums">
            {fill(copy.flow.progress, { current: index + 1, total: visible.length })}
          </span>
        </div>
        <ol className="grid grid-cols-5 gap-1.5" aria-label={copy.intro.whatWeAsk}>
          {DIAGNOSTIC_PARTS.map((part, partPosition) => (
            <li
              key={part}
              aria-current={partPosition === partIndex ? "step" : undefined}
              className={`h-1.5 rounded-full ${partPosition <= partIndex ? "bg-[var(--warm-coral)]" : "bg-[var(--surface-emphasis)]"}`}
            >
              <span className="sr-only">{copy.parts[part]}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.div key={question.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          <h2
            ref={headingRef}
            id={promptId}
            tabIndex={-1}
            className="text-2xl sm:text-3xl font-bold text-[var(--text-display)] mb-2 text-balance focus:outline-none"
          >
            {questionCopy?.prompt}
          </h2>
          {questionCopy?.helper && (
            <p id={helperId} className="text-sm text-[var(--text-muted)] mb-6">{questionCopy.helper}</p>
          )}
          {!questionCopy?.helper && <div className="mb-6" />}
          {question.optional && (
            <span className="inline-flex mb-4 rounded-full border border-[var(--border-default)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              {copy.flow.optional}
            </span>
          )}
          {renderInput()}
          {showError && errorMessage && (
            <p id={errorId} role="alert" className="mt-2 flex items-center gap-1 text-sm text-red-500">
              <AlertCircle className="w-4 h-4" aria-hidden /> {errorMessage}
            </p>
          )}
        </motion.div>

        <div className="flex justify-between items-center gap-3 mt-8 pt-6 border-t border-[var(--border-default)]">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="flex items-center gap-1.5 px-4 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" aria-hidden />
            {copy.flow.back}
          </button>
          <div className="flex items-center gap-2">
            {question.optional && !answered && (
              <button
                type="button"
                onClick={handleSkip}
                className="px-4 py-2.5 text-sm font-semibold text-[var(--text-supporting)] hover:text-[var(--text-primary)] transition-colors"
              >
                {copy.flow.skip}
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              aria-disabled={!canAdvance}
              className={`flex items-center gap-2 px-6 py-2.5 text-white font-semibold rounded-xl transition-colors ${
                canAdvance ? "bg-[var(--warm-coral)] hover:bg-[var(--warm-coral)]/90" : "bg-[var(--warm-coral)]/45 cursor-not-allowed"
              }`}
            >
              {isLast ? copy.flow.generate : copy.flow.next}
              <ChevronRight className="w-4 h-4 rtl:rotate-180" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
