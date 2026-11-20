'use client';

/**
 * Guided Operations Diagnostic: the question bank as a short, scripted
 * conversation in Sundae's voice (spec 3.1-3.2), on the same components and
 * design as the guided booking.
 *
 * - No AI in the conversation: every line is the bank's own translated copy;
 *   branching, skip, back and edit come from `src/lib/diagnosticConversation`.
 * - Refresh resumes from sessionStorage (answers only, never tokens).
 * - "Use the classic form" hands the answers to the step-by-step form.
 * - Analytics carry turn ids, counts and timings only: no names, emails,
 *   company names or free text.
 */

import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import {
  AnswerMeta,
  Choices,
  CompanyConfirm,
  ConversationHeader,
  ErrorLine,
  MultiChoices,
  PrivacyFoot,
  ProgressSegments,
  Subline,
  SundaeLine,
  TextAnswer,
  TypingDots,
  UserBubble,
  conversationStyles as styles,
} from '@/components/conversation/parts';
import { fill } from '@/lib/diagnostic/copy';
import { getDiagnosticCopy, type DiagnosticCopy } from '@/lib/diagnostic/i18n';
import { getDiagnosticQuestionCopy } from '@/lib/diagnostic/questionTranslations';
import {
  COUNTRY_CODES,
  POS_BRAND_NAMES,
  POS_OPTIONS,
  orderPosOptions,
  type DiagnosticResponses,
} from '@/lib/diagnostic/questions';
import { diagnosticOtherKey, filterDiagnosticOptions, toggleDiagnosticMultiValue } from '@/lib/diagnostic/flowLogic';
import { MAX_LOCATIONS, MIN_LOCATIONS, parseLocationCount } from '@/lib/diagnostic/rules';
import {
  answer,
  back,
  convoMetadata,
  currentTurn,
  edit,
  fromClassic,
  previousTurn,
  progressIndex,
  PROGRESS_SEGMENTS,
  restore,
  serialize,
  skip,
  start,
  toClassicProgress,
  toCompletion,
  transcriptTurns,
  type ConversationContext,
  type DiagnosticConversationCompletion,
  type DiagnosticConversationState,
  type DiagnosticConvoMetadata,
  type Turn,
  type TurnInput,
  type ValidationError,
} from '@/lib/diagnosticConversation/machine';
import { readGuidedSession, writeGuidedSession } from '@/lib/diagnosticConversation/session';
import { companyFromEmail } from '@/lib/freeMail';
import { getGuidedBookingCopy, type GuidedBookingCopy } from '@/lib/leadConversation/copy';
import { getWebsiteIntlLocale, type WebsiteLocale } from '@/lib/i18n';
import { trackEvent } from '@/lib/posthog';
import local from './diagnosticConversation.module.css';

/** Typing indicator before each new Sundae line: within the 250-400 ms rule. */
const TYPING_MS = 320;
/** Region-relevant POS brands shown as chips before Other and Not sure. */
const LISTED_POS = 6;

/** Answers handed back by the classic form when the visitor switches back. */
export interface ClassicHandback {
  responses: DiagnosticResponses;
  questionId: string;
  /** The conversation as it was when the visitor left it, if any. */
  previous: DiagnosticConversationState | null;
}

export interface DiagnosticConversationProps {
  locale: WebsiteLocale;
  handback?: ClassicHandback | null;
  analytics: { variant: 'guided'; surface: string };
  onComplete: (completion: DiagnosticConversationCompletion, convo: DiagnosticConvoMetadata) => void;
  onSwitchToClassic: (progress: { responses: DiagnosticResponses; questionId: string }, state: DiagnosticConversationState) => void;
}

const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const readReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const list = (value: string | string[] | undefined): string[] => (Array.isArray(value) ? value : value ? [value] : []);
const msSince = (startedAt: number) => Math.max(0, Date.now() - startedAt);

function initialConversation(handback: ClassicHandback | null | undefined): DiagnosticConversationState {
  const state = (handback ? fromClassic(handback.responses, handback.questionId, handback.previous) : null)
    ?? restore(readGuidedSession())
    ?? start();
  // A finished conversation restored after a refresh asks for the last answer
  // again instead of generating (and sending) a second report on its own.
  return state.position === 'complete' ? edit(state, 'role') : state;
}

export default function DiagnosticConversation({ locale, handback, analytics, onComplete, onSwitchToClassic }: DiagnosticConversationProps) {
  const copy = getDiagnosticCopy(locale);
  const chat = getGuidedBookingCopy(locale);
  const intlLocale = getWebsiteIntlLocale(locale);
  const rtl = copy.dir === 'rtl';
  const [state, setState] = useState<DiagnosticConversationState>(() => initialConversation(handback));
  const [geoCountry, setGeoCountry] = useState<string | null>(null);
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, readReducedMotion, () => false);
  const context: ConversationContext = { suggestedCountry: geoCountry };

  const target = `${state.position}#${state.answerCount}`;
  const [revealed, setRevealed] = useState(target);
  const typing = revealed !== target && !reduceMotion;
  useEffect(() => {
    if (revealed === target) return;
    const timer = window.setTimeout(() => setRevealed(target), reduceMotion ? 0 : TYPING_MS);
    return () => window.clearTimeout(timer);
  }, [target, revealed, reduceMotion]);

  const titleId = useId();
  const logRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const interactedRef = useRef(false);
  const completedRef = useRef(false);
  const resumedRef = useRef(state.answerCount > 0);

  const track = (event: string, properties: Record<string, unknown> = {}) => trackEvent(event, { ...analytics, locale, ...properties });

  const markStarted = () => {
    interactedRef.current = true;
    if (startedRef.current) return;
    startedRef.current = true;
    track('diagnostic_started', { resumed: resumedRef.current });
  };

  // Refresh-resume: answers only.
  useEffect(() => {
    if (!completedRef.current) writeGuidedSession(serialize(state));
  }, [state]);

  // IP country guess for "Where do you operate?" (preselected, never forced).
  useEffect(() => {
    let cancelled = false;
    fetch('/api/diagnostic/geo', { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { country?: unknown } | null) => {
        const code = typeof data?.country === 'string' ? data.country : null;
        if (!cancelled && code && (COUNTRY_CODES as readonly string[]).includes(code)) setGeoCountry(code);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Keep the newest line and the answer area in view.
  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    log.scrollTo({ top: log.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [revealed, typing, reduceMotion]);

  // When the answer area grows (an "Other" field, search results), the log
  // shrinks: keep its newest line, the current question, in view.
  useEffect(() => {
    const log = logRef.current;
    if (!log || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => {
      log.scrollTop = log.scrollHeight;
    });
    observer.observe(log);
    return () => observer.disconnect();
  }, []);

  // Focus follows the conversation once the visitor has started answering
  // (never on page load, so arriving visitors keep their place on the page).
  useEffect(() => {
    if (!interactedRef.current || typing) return;
    const area = answerRef.current;
    const focusTarget = area?.querySelector<HTMLElement>('[data-autofocus]')
      ?? area?.querySelector<HTMLElement>('input:not([type=hidden]):not([tabindex="-1"]), select, textarea, button:not([disabled]), a[href]')
      ?? logRef.current;
    focusTarget?.focus();
  }, [revealed, typing]);

  const regionNames = useMemo(() => {
    try {
      return new Intl.DisplayNames([intlLocale], { type: 'region' });
    } catch {
      return null;
    }
  }, [intlLocale]);
  const englishNames = useMemo(() => {
    try {
      return new Intl.DisplayNames(['en'], { type: 'region' });
    } catch {
      return null;
    }
  }, []);
  const countryName = (code: string) => {
    try {
      return regionNames?.of(code) ?? code;
    } catch {
      return code;
    }
  };
  const countryOptions = useMemo(() => {
    const collator = new Intl.Collator(intlLocale);
    return COUNTRY_CODES.map((code) => {
      let label: string = code;
      let english: string = code;
      try {
        label = regionNames?.of(code) ?? code;
        english = englishNames?.of(code) ?? code;
      } catch {
        // Unknown region in this runtime: the code is still searchable.
      }
      return { value: code, label, searchTerms: [code, english] as readonly string[] };
    }).sort((a, b) => collator.compare(a.label, b.label));
  }, [intlLocale, regionNames, englishNames]);

  const finish = (next: DiagnosticConversationState) => {
    completedRef.current = true;
    const completion = toCompletion(next);
    const convo = convoMetadata(next);
    track('diagnostic_lead_captured', { role: completion.role, corporateEmail: !convo.freeMail });
    onComplete(completion, convo);
  };

  const commit = (turn: Turn, input: TurnInput): ValidationError | null => {
    markStarted();
    const result = answer(state, turn.id, input, context);
    if (!result.ok) return result.error;
    track('diagnostic_turn_answered', {
      turnId: turn.id,
      index: turn.number,
      skipped: false,
      msSinceStart: msSince(state.startedAt),
    });
    setState(result.state);
    if (result.state.position === 'complete') finish(result.state);
    return null;
  };

  const onSkip = (turn: Turn) => {
    markStarted();
    const result = skip(state, turn.id);
    if (!result.ok) return;
    track('diagnostic_turn_answered', { turnId: turn.id, index: turn.number, skipped: true, msSinceStart: msSince(state.startedAt) });
    setState(result.state);
    if (result.state.position === 'complete') finish(result.state);
  };

  const rewind = (next: DiagnosticConversationState) => {
    markStarted();
    setState(next);
    setRevealed(`${next.position}#${next.answerCount}`);
  };

  const onEdit = (turn: Turn) => {
    track('diagnostic_turn_edited', { turnId: turn.id });
    rewind(edit(state, turn.id));
  };

  const onBack = () => rewind(back(state));

  const switchToClassic = () => {
    track('diagnostic_switched_to_classic', { atTurnId: state.position });
    onSwitchToClassic(toClassicProgress(state), state);
  };

  // ── Lines ────────────────────────────────────────────────────────────

  const responses = state.responses;
  const inferredCompany = responses.email ? companyFromEmail(String(responses.email)) : '';
  const questionCopy = (turn: Turn) => getDiagnosticQuestionCopy(locale, turn.question.id);

  const promptLine = (turn: Turn): ReactNode => {
    const q = questionCopy(turn);
    const helper = (text?: string) => (text ? <> <span className={styles.mutedInline}>{text}</span></> : null);
    switch (turn.id) {
      case 'name':
        return q?.prompt;
      case 'countries':
        return (
          <>
            {geoCountry ? `${fill(copy.flow.countryGuess, { country: countryName(geoCountry) })} ` : ''}
            {q?.prompt}
            {helper(q?.helper)}
          </>
        );
      case 'payroll_countries':
        return <>{q?.prompt}{helper(list(responses.countries).length ? copy.flow.preselected : q?.helper)}</>;
      case 'company':
        return inferredCompany ? fill(chat.company.confirm, { company: inferredCompany }) : chat.company.ask;
      default:
        return <>{q?.prompt}{helper(q?.helper)}</>;
    }
  };

  const optionLabel = (turn: Turn, value: string) => {
    if (turn.question.kind === 'pos' && POS_BRAND_NAMES[value]) return POS_BRAND_NAMES[value];
    return questionCopy(turn)?.options?.[value] ?? value;
  };

  const answerText = (turn: Turn): ReactNode => {
    if (turn.optional && state.skipped.includes(turn.id)) return copy.convo.skipped;
    const id = turn.question.id;
    switch (turn.id) {
      case 'name': return <bdi>{String(responses.name ?? '')}</bdi>;
      case 'email': return <bdi dir="ltr">{String(responses.email ?? '')}</bdi>;
      case 'company':
        return String(responses.company ?? '') === inferredCompany && inferredCompany
          ? fill(chat.company.yesAnswer, { company: inferredCompany })
          : <bdi>{String(responses.company ?? '')}</bdi>;
    }
    switch (turn.question.kind) {
      case 'number': {
        const count = parseLocationCount(responses[id]);
        return count === null ? '' : new Intl.NumberFormat(intlLocale).format(count);
      }
      case 'longtext': return <bdi>{String(responses[id] ?? '')}</bdi>;
      case 'countries': return list(responses[id]).map(countryName).join(', ');
      case 'pos':
        return list(responses[id]).map((value) => (value === 'other' ? String(responses[diagnosticOtherKey(id)] ?? '') : optionLabel(turn, value))).join(', ');
      default:
        return list(responses[id])
          .map((value) => (value === 'other' && responses[diagnosticOtherKey(id)] ? String(responses[diagnosticOtherKey(id)]) : optionLabel(turn, value)))
          .join(', ');
    }
  };

  const answerPlain = (turn: Turn): string => {
    const text = answerText(turn);
    if (typeof text === 'string') return text;
    if (turn.id === 'name') return String(responses.name ?? '');
    if (turn.id === 'email') return String(responses.email ?? '');
    if (turn.id === 'company') return String(responses.company ?? '');
    return String(responses[turn.question.id] ?? '');
  };

  // ── Render ───────────────────────────────────────────────────────────

  const transcript = transcriptTurns(state);
  const turn = currentTurn(state);
  const editable = state.position !== 'complete';
  const logItems: ReactNode[] = [];
  transcript.forEach((past) => {
    logItems.push(<SundaeLine key={`p-${past.id}`} greeting={past.id === 'name'}>{promptLine(past)}</SundaeLine>);
    logItems.push(
      <UserBubble
        key={`a-${past.id}`}
        edit={editable ? { label: chat.edit, ariaLabel: fill(chat.editLabel, { answer: answerPlain(past) || chat.edit }), onClick: () => onEdit(past) } : null}
      >
        {answerText(past)}
      </UserBubble>,
    );
  });
  if (turn && !typing) {
    logItems.push(<SundaeLine key={`p-${turn.id}`} greeting={turn.id === 'name'}>{promptLine(turn)}</SundaeLine>);
  }

  const previous = previousTurn(state);
  const canGoBack = editable && !!previous;
  const textTurn = !!turn && (turn.id === 'name' || turn.id === 'email' || turn.question.kind === 'number' || turn.question.kind === 'longtext');

  const control = !typing && turn ? (
    <TurnControl
      key={`${turn.id}#${state.answerCount}`}
      turn={turn}
      state={state}
      copy={copy}
      chat={chat}
      intlLocale={intlLocale}
      geoCountry={geoCountry}
      inferredCompany={inferredCompany}
      countryOptions={countryOptions}
      optionLabel={(value) => optionLabel(turn, value)}
      commit={(input) => commit(turn, input)}
      onSkip={() => onSkip(turn)}
    />
  ) : null;

  const progress = progressIndex(state);
  const partName = turn ? copy.parts[turn.part] : copy.parts.report;

  return (
    <section
      className={`${styles.root} ${rtl ? styles.rtl : ''}`}
      aria-labelledby={titleId}
      data-guided-diagnostic
      onFocusCapture={(event) => {
        if (answerRef.current?.contains(event.target as Node)) markStarted();
      }}
    >
      <ConversationHeader
        titleId={titleId}
        title={copy.intro.eyebrow}
        sub={<Subline full={`${copy.convo.subline} · ${partName}`} short={partName} />}
        classic={{ full: chat.header.classic, short: chat.header.classicShort, onClick: switchToClassic }}
      />

      <ProgressSegments
        segments={PROGRESS_SEGMENTS}
        current={progress}
        label={fill(copy.convo.progress, { current: Math.min(progress + 1, PROGRESS_SEGMENTS), total: PROGRESS_SEGMENTS, part: partName })}
      />

      <div ref={logRef} className={styles.log} role="log" aria-live="polite" aria-label={chat.logLabel} tabIndex={0}>
        {logItems}
        {typing && <TypingDots />}
      </div>

      <div ref={answerRef} className={`${styles.answer} ${local.answer}`} hidden={!typing && !control && !canGoBack}>
        {control}
        {!typing && (canGoBack || (control && textTurn)) && (
          <AnswerMeta back={canGoBack ? { label: chat.back, onClick: onBack } : null} hint={control && textTurn ? chat.hint : null} />
        )}
      </div>

      <PrivacyFoot text={copy.convo.privacy} linkLabel={chat.privacyLink} />
    </section>
  );
}

// ── Turn controls ──────────────────────────────────────────────────────

interface TurnControlProps {
  turn: Turn;
  state: DiagnosticConversationState;
  copy: DiagnosticCopy;
  chat: GuidedBookingCopy;
  intlLocale: string;
  geoCountry: string | null;
  inferredCompany: string;
  countryOptions: { value: string; label: string; searchTerms: readonly string[] }[];
  optionLabel: (value: string) => string;
  commit: (input: TurnInput) => ValidationError | null;
  onSkip: () => void;
}

function TurnControl({ turn, state, copy, chat, intlLocale, geoCountry, inferredCompany, countryOptions, optionLabel, commit, onSkip }: TurnControlProps) {
  const { responses } = state;
  const { question } = turn;
  const q = getDiagnosticQuestionCopy(copy.locale, question.id);
  const [error, setError] = useState<ValidationError | null>(null);
  const [selected, setSelected] = useState<string[]>(() => list(responses[question.id]));
  const [typedOther, setTypedOther] = useState(() => question.kind === 'single' && list(responses[question.id])[0] === 'other');
  const [choseOther, setChoseOther] = useState(false);
  const run = (input: TurnInput) => setError(commit(input));
  const number = new Intl.NumberFormat(intlLocale);

  const errorText = (() => {
    switch (error) {
      case null:
      case 'notCurrent': return null;
      case 'nameShort': return chat.errors.nameShort;
      case 'nameInvalid': return chat.errors.nameInvalid;
      case 'numberInvalid': return fill(copy.flow.numberError, { min: MIN_LOCATIONS, max: number.format(MAX_LOCATIONS) });
      case 'emailInvalid': return chat.errors.emailInvalid;
      case 'companyRequired': return chat.errors.companyRequired;
      case 'otherRequired': return question.id === 'role' ? chat.errors.roleRequired : chat.errors.posRequired;
      case 'textRequired': return copy.convo.priorityRequired;
      case 'choiceRequired': return question.kind === 'countries' ? chat.errors.countryRequired : chat.errors.focusRequired;
    }
  })();

  if (turn.id === 'name') {
    return <TextAnswer key="name" label={copy.flow.nameLabel} placeholder={q?.placeholder ?? copy.flow.nameLabel} autoComplete="name" maxLength={80} defaultValue={String(responses.name ?? '')} error={errorText} sendLabel={chat.send} onSubmit={(value) => run({ kind: 'text', value })} />;
  }
  if (turn.id === 'email') {
    return <TextAnswer key="email" label={copy.flow.emailLabel} placeholder={copy.flow.emailPlaceholder} type="email" autoComplete="email" inputMode="email" dir="ltr" defaultValue={String(responses.email ?? '')} error={errorText} sendLabel={chat.send} onSubmit={(value) => run({ kind: 'text', value })} />;
  }
  if (turn.id === 'company') {
    const current = String(responses.company ?? '');
    return (
      <CompanyConfirm
        question={fill(chat.company.confirm, { company: inferredCompany })}
        inferred={inferredCompany}
        yesLabel={chat.company.yes}
        differentLabel={chat.company.different}
        startTyped={!!current && current !== inferredCompany}
        text={{ label: copy.flow.companyLabel, placeholder: copy.flow.companyPlaceholder, defaultValue: current !== inferredCompany ? current : '', error: errorText, sendLabel: chat.send }}
        onConfirm={() => run({ kind: 'company', value: inferredCompany, inferred: true })}
        onTyped={(value) => run({ kind: 'company', value, inferred: false })}
        focusTyped
      />
    );
  }

  switch (question.kind) {
    case 'number': {
      const count = parseLocationCount(responses[question.id]);
      return (
        <div className={styles.stack}>
          <TextAnswer key="number" label={copy.flow.numberLabel} placeholder={copy.flow.numberLabel} inputMode="numeric" autoComplete="off" maxLength={6} defaultValue={count === null ? '' : String(count)} error={errorText} sendLabel={chat.send} onSubmit={(value) => run({ kind: 'text', value })} />
          <Choices
            label={copy.flow.numberLabel}
            selected={count === null ? undefined : String(count)}
            options={(question.quickPicks ?? []).map((pick) => ({ key: String(pick), label: number.format(pick) }))}
            onChoose={(value) => run({ kind: 'text', value })}
          />
        </div>
      );
    }
    case 'longtext':
      return <TextAnswer key="text" multiline label={q?.prompt ?? ''} placeholder={q?.placeholder ?? ''} maxLength={question.maxLength} defaultValue={String(responses[question.id] ?? '')} error={errorText} sendLabel={chat.send} onSubmit={(value) => run({ kind: 'text', value })} />;
    case 'single': {
      const current = list(responses[question.id])[0];
      const otherKey = diagnosticOtherKey(question.id);
      if (typedOther) {
        // "Other" (role): a short detail, like the step-by-step form's "Which one?".
        return (
          <TextAnswer
            key="other-text"
            autoFocus={choseOther ? true : undefined}
            label={copy.flow.otherPlaceholder}
            placeholder={copy.flow.otherPlaceholder}
            autoComplete={question.id === 'role' ? 'organization-title' : 'off'}
            defaultValue={current === 'other' ? String(responses[otherKey] ?? '') : ''}
            error={errorText}
            sendLabel={chat.send}
            onSubmit={(value) => run({ kind: 'choices', values: ['other'], other: value })}
          />
        );
      }
      return (
        <Choices
          label={q?.prompt ?? ''}
          selected={current}
          options={(question.options ?? []).map((option) => ({ key: option.value, label: optionLabel(option.value) }))}
          onChoose={(value) => {
            if (value !== 'other') run({ kind: 'choices', values: [value] });
            else {
              setTypedOther(true);
              setChoseOther(true);
            }
          }}
        />
      );
    }
    case 'countries': {
      // Answered before, else the operating countries (payroll), else the IP guess.
      const suggested = list(responses[question.id]).length
        ? list(responses[question.id])
        : question.id === 'payroll_countries'
          ? list(responses.countries)
          : geoCountry ? [geoCountry] : [];
      return (
        <CountryMulti
          label={q?.prompt ?? ''}
          options={countryOptions}
          suggested={suggested}
          searchLabel={copy.flow.search}
          noMatches={copy.flow.noMatches}
          selectedLabel={copy.flow.selectedCount}
          doneCount={chat.focus.doneCount}
          error={errorText}
          onDone={(codes) => run({ kind: 'choices', values: codes })}
        />
      );
    }
    case 'pos': {
      // Several POS systems are common in multi-brand groups, so this turn is
      // multi-select like the step-by-step form ("Choose all that apply").
      const ordered = orderPosOptions(list(responses.countries)).filter((option) => option.value !== 'other' && option.value !== 'not_sure');
      return (
        <PosMulti
          question={q?.prompt ?? ''}
          listed={ordered.slice(0, LISTED_POS).map((option) => option.value)}
          otherLabel={q?.options?.other ?? chat.pos.other}
          notSureLabel={q?.options?.not_sure ?? chat.pos.notSure}
          initial={list(responses.pos)}
          initialOther={String(responses[diagnosticOtherKey('pos')] ?? '')}
          otherFieldLabel={chat.pos.otherLabel}
          otherPlaceholder={chat.pos.otherPlaceholder}
          searchLabel={copy.flow.search}
          doneLabel={chat.focus.done}
          doneCount={chat.focus.doneCount}
          error={errorText}
          onDone={(values, other) => run({ kind: 'choices', values, other })}
          onEdit={() => setError(null)}
        />
      );
    }
    default: {
      const options = (question.options ?? []).map((option) => ({ key: option.value, label: optionLabel(option.value) }));
      const multi = (
        <MultiChoices
          label={q?.prompt ?? ''}
          options={options}
          selected={selected}
          onToggle={(value) => {
            setError(null);
            setSelected((now) => toggleDiagnosticMultiValue(now, value, question.options));
          }}
          doneLabel={selected.length ? fill(chat.focus.doneCount, { count: selected.length }) : chat.focus.done}
          onDone={() => run({ kind: 'choices', values: selected })}
          describedBy={errorText ? `dgc-${turn.id}-error` : undefined}
          doneBarClassName={options.length > 8 ? local.doneBar : undefined}
        />
      );
      return (
        <div className={styles.stack}>
          {multi}
          {turn.optional && (
            <div>
              <button type="button" className={styles.chip} onClick={onSkip}>{copy.flow.skip}</button>
            </div>
          )}
          <ErrorLine id={`dgc-${turn.id}-error`} text={errorText} />
        </div>
      );
    }
  }
}

// ── POS: region-aware brands, search, Other with a name, Not sure ─────

const POS_BRANDS = POS_OPTIONS.filter((option) => POS_BRAND_NAMES[option.value]);
const brandName = (value: string) => POS_BRAND_NAMES[value] ?? value;

function PosMulti({
  question,
  listed,
  otherLabel,
  notSureLabel,
  initial,
  initialOther,
  otherFieldLabel,
  otherPlaceholder,
  searchLabel,
  doneLabel,
  doneCount,
  error,
  onDone,
  onEdit,
}: {
  question: string;
  /** Brand values most used where the visitor operates. */
  listed: string[];
  otherLabel: string;
  notSureLabel: string;
  initial: string[];
  initialOther: string;
  otherFieldLabel: string;
  otherPlaceholder: string;
  searchLabel: string;
  doneLabel: string;
  doneCount: string;
  error: string | null;
  onDone: (values: string[], other: string) => void;
  onEdit: () => void;
}) {
  const id = useId();
  const [picked, setPicked] = useState<string[]>(initial);
  const [other, setOther] = useState(initialOther);
  const [query, setQuery] = useState('');
  const [focusOther, setFocusOther] = useState(false);
  const toggle = (value: string) => {
    onEdit();
    const next = toggleDiagnosticMultiValue(picked, value, POS_OPTIONS);
    if (value === 'other' && next.includes('other')) setFocusOther(true);
    setPicked(next);
  };
  // Brands found by search stay on screen as chips once picked.
  const shown = [...listed, ...picked.filter((value) => POS_BRAND_NAMES[value] && !listed.includes(value))];
  const options = [
    ...shown.map((value) => ({ key: value, label: brandName(value) })),
    { key: 'other', label: otherLabel },
    { key: 'not_sure', label: notSureLabel },
  ];
  const matches = query.trim()
    ? filterDiagnosticOptions(POS_BRANDS, brandName, query).filter((option) => !shown.includes(option.value)).slice(0, 6)
    : [];
  const done = () => {
    // A typed name that is a listed brand counts as that brand.
    const brand = POS_BRANDS.find((option) => brandName(option.value).toLocaleLowerCase() === other.trim().toLocaleLowerCase());
    const values = brand && picked.includes('other')
      ? [...new Set([...picked.filter((value) => value !== 'other'), brand.value])]
      : picked;
    onDone(values, values.includes('other') ? other : '');
  };
  return (
    <div className={styles.stack}>
      <div className={styles.chips} role="group" aria-label={question} aria-describedby={error ? `${id}-error` : undefined}>
        {options.map((option) => {
          const on = picked.includes(option.key);
          return (
            <button key={option.key} type="button" aria-pressed={on} className={`${styles.chip} ${on ? styles.chipOn : ''}`} onClick={() => toggle(option.key)}>
              {on && <CheckMark />}
              <bdi>{option.label}</bdi>
            </button>
          );
        })}
      </div>
      {picked.includes('other') && (
        <input
          className={styles.field}
          value={other}
          maxLength={120}
          aria-label={otherFieldLabel}
          placeholder={otherPlaceholder}
          autoComplete="off"
          autoFocus={focusOther || undefined}
          onChange={(event) => {
            onEdit();
            setOther(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              done();
            }
          }}
        />
      )}
      <input
        type="search"
        className={styles.field}
        value={query}
        placeholder={searchLabel}
        aria-label={searchLabel}
        autoComplete="off"
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && matches.length) {
            event.preventDefault();
            toggle(matches[0].value);
            setQuery('');
          }
        }}
      />
      {matches.length > 0 && (
        <div className={styles.chips} role="group" aria-label={searchLabel}>
          {matches.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={false}
              className={styles.chip}
              onClick={() => {
                toggle(option.value);
                setQuery('');
              }}
            >
              <bdi>{brandName(option.value)}</bdi>
            </button>
          ))}
        </div>
      )}
      <div className={local.doneBar}>
        <button type="button" className={`${styles.chip} ${styles.chipDone}`} onClick={done}>
          {picked.length ? fill(doneCount, { count: picked.length }) : doneLabel}
        </button>
      </div>
      <ErrorLine id={`${id}-error`} text={error} />
    </div>
  );
}

// ── Countries: preselected, searchable, multi ──────────────────────────

function CountryMulti({
  label,
  options,
  suggested,
  searchLabel,
  noMatches,
  selectedLabel,
  doneCount,
  error,
  onDone,
}: {
  label: string;
  options: { value: string; label: string; searchTerms: readonly string[] }[];
  /** Preselection until the visitor changes anything (a late IP guess still shows up). */
  suggested: string[];
  searchLabel: string;
  noMatches: string;
  selectedLabel: string;
  doneCount: string;
  error: string | null;
  onDone: (codes: string[]) => void;
}) {
  const id = useId();
  const [picked, setPicked] = useState<string[] | null>(null);
  const codes = picked ?? suggested;
  const [query, setQuery] = useState('');
  const [showError, setShowError] = useState(true);
  const labelFor = (code: string) => options.find((option) => option.value === code)?.label ?? code;
  const toggle = (code: string) => {
    setPicked(codes.includes(code) ? codes.filter((item) => item !== code) : [...codes, code]);
    setShowError(false);
  };
  const matches = query.trim() ? filterDiagnosticOptions(options, labelFor, query).slice(0, 8) : [];
  const visibleError = showError ? error : null;
  return (
    <div className={styles.stack}>
      <div className={styles.chips} role="group" aria-label={`${label} ${fill(selectedLabel, { count: codes.length })}`} aria-describedby={visibleError ? `${id}-error` : undefined}>
        {codes.map((code) => (
          <button key={code} type="button" aria-pressed className={`${styles.chip} ${styles.chipOn}`} onClick={() => toggle(code)}>
            <CheckMark />
            <bdi>{labelFor(code)}</bdi>
          </button>
        ))}
        {codes.length > 0 && (
          <button
            type="button"
            className={`${styles.chip} ${styles.chipDone}`}
            data-autofocus
            onClick={() => {
              setShowError(true);
              onDone(codes);
            }}
          >
            {fill(doneCount, { count: codes.length })}
          </button>
        )}
      </div>
      <input
        type="search"
        className={styles.field}
        value={query}
        placeholder={searchLabel}
        aria-label={searchLabel}
        autoComplete="off"
        data-autofocus={codes.length ? undefined : true}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key !== 'Enter') return;
          event.preventDefault();
          if (matches.length) {
            toggle(matches[0].value);
            setQuery('');
          } else if (!query.trim()) {
            setShowError(true);
            onDone(codes);
          }
        }}
      />
      {matches.length > 0 && (
        <div className={styles.chips} role="group" aria-label={searchLabel}>
          {matches.map((option) => {
            const on = codes.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={on}
                className={`${styles.chip} ${on ? styles.chipOn : ''}`}
                onClick={() => {
                  toggle(option.value);
                  setQuery('');
                }}
              >
                {on && <CheckMark />}
                <bdi>{option.label}</bdi>
              </button>
            );
          })}
        </div>
      )}
      {query.trim() && matches.length === 0 && <p className={styles.mutedInline} role="status">{noMatches}</p>}
      <ErrorLine id={`${id}-error`} text={visibleError} />
    </div>
  );
}

function CheckMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

