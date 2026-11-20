'use client';

/**
 * Guided booking: a short, scripted conversation in Sundae's voice that
 * replaces the static lead form behind the NEXT_PUBLIC_GUIDED_BOOKING split.
 *
 * - No AI and no credits: every line is pre-written and translated
 *   (`src/lib/leadConversation/copy.ts`); branching is deterministic
 *   (`src/lib/leadConversation/machine.ts`).
 * - Submits the classic form's payload to `/api/cta/submit` with
 *   `source: 'guided-booking'`, `metadata.convo` and one idempotency key.
 * - Labelled as guided booking, never presented as a person.
 * - The classic form is one click away and keeps the answers given so far.
 *
 * Spec: docs/guided-booking/SPEC-conversational-walkthrough-booking.md
 */

import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Activity, ArrowRight, Clock, Database, Info, Mail } from 'lucide-react';
import {
  AnswerMeta,
  BookingOfferActions,
  BookingOfferCard,
  Choices,
  CompanyConfirm,
  ConversationHeader,
  ErrorLine,
  MultiChoices,
  PosPicker,
  PrivacyFoot,
  ProgressSegments,
  Subline,
  SundaeLine,
  TextAnswer,
  TypingDots,
  UserBubble,
} from '@/components/conversation/parts';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { getCampaignParams } from '@/lib/campaign';
import { COUNTRY_CODES } from '@/lib/countryCodes';
import { getWebsiteIntlLocale, normalizeWebsiteLocale } from '@/lib/i18n';
import { LOCATION_BUCKETS, type LeadFormValues } from '@/lib/leadFields';
import { PRICING_URL } from '@/lib/links';
import { trackEvent } from '@/lib/posthog';
import type { PricingIntent } from '@/lib/pricingIntent';
import { getGuidedBookingCopy, type GuidedBookingCopy } from '@/lib/leadConversation/copy';
import { companyFromEmail, findCountryByIso, firstName, posOptionsForCountry } from '@/lib/leadConversation/inference';
import {
  answer,
  back,
  buildContext,
  composeMessage,
  edit,
  previousStep,
  restore,
  serialize,
  start,
  storageKey,
  toClassicValues,
  toPayload,
  transcriptSteps,
  type AnswerInputs,
  type ConversationState,
  type ValidationError,
} from '@/lib/leadConversation/machine';
import { FOCUS_FACTS, FOCUS_KEYS, orderFocusForAgenda, type FocusKey } from '@/lib/leadConversation/packageNotes';
import {
  PROGRESS_SEGMENTS,
  progressIndex,
  ROLE_KEYS,
  TOPIC_KEYS,
  type ConversationContext,
  type ConversationMode,
  type StepId,
} from '@/lib/leadConversation/script';
import type { LeadSurface } from '@/lib/leadConversation/variant';
import type { BookingSummary } from '@/lib/sundaeBookingClient';
import styles from './guidedBooking/guidedBooking.module.css';
import { fill, fillText } from './guidedBooking/text';

const GuidedBookingHandoff = dynamic(() => import('./guidedBooking/GuidedBookingHandoff'), { ssr: false });

/** Typing indicator before each new Sundae line: within the 250-400 ms rule. */
const TYPING_MS = 320;
const SUPPORT_EMAIL = 'support@sundae.io';

export interface ConversationalLeadCaptureProps {
  mode: ConversationMode;
  surface: LeadSurface;
  ctaLabel: string;
  defaultMessage?: string;
  pricingIntent: PricingIntent | null;
  workflowKey: string | null;
  suggestedCountryIso: string | null;
  /** /demo only: the two-column layout with its own heading and reassurance rows. */
  layout?: 'demo';
  onSwitchToClassic: (values: Partial<LeadFormValues>) => void;
}

type SubmitStatus = 'idle' | 'submitting' | 'error' | 'sent';
type SubmitError = 'rateLimited' | 'unavailable';
type BookingState = 'offer' | 'opening' | 'booked' | 'later' | 'failed';

const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const readReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function readStoredConversation(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStoredConversation(key: string, value: string | null) {
  try {
    if (value === null) window.sessionStorage.removeItem(key);
    else window.sessionStorage.setItem(key, value);
  } catch {
    // Storage is optional; the conversation still works without resume.
  }
}

function makeIdempotencyKey(): string {
  return `guided-${globalThis.crypto.randomUUID()}`;
}

export default function ConversationalLeadCapture(props: ConversationalLeadCaptureProps) {
  const { mode, surface, ctaLabel, pricingIntent, workflowKey, suggestedCountryIso, layout, onSwitchToClassic } = props;
  const { locale: rawLocale, dir } = useWebsiteI18n();
  const locale = normalizeWebsiteLocale(rawLocale);
  const copy = getGuidedBookingCopy(locale);
  const intlLocale = getWebsiteIntlLocale(locale);
  const rtl = dir === 'rtl';
  const key = storageKey(mode);

  const context = useMemo(
    () => buildContext({ mode, pricingIntent, workflowKey, suggestedCountryIso }),
    [mode, pricingIntent, workflowKey, suggestedCountryIso],
  );
  const [state, setState] = useState<ConversationState>(() => restore(readStoredConversation(key), context) ?? start(context));
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [submitError, setSubmitError] = useState<SubmitError | null>(null);
  // Short-lived booking credential: component memory only, never storage or URLs.
  const [bookingToken, setBookingToken] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingState | null>(null);
  const [bookedAt, setBookedAt] = useState<BookingSummary | null>(null);
  const [askedForWorkEmail, setAskedForWorkEmail] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [idempotencyKey] = useState(makeIdempotencyKey);
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, readReducedMotion, () => false);

  // Typing indicator: the newest Sundae line and its control appear after a
  // short beat when an answer is accepted (never with reduced motion).
  const target = `${state.position}#${state.answerCount}`;
  const [revealed, setRevealed] = useState(target);
  const typing = revealed !== target && status !== 'sent' && !reduceMotion;
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
  const submittingRef = useRef(false);
  const bookedTrackedRef = useRef(false);
  const latest = useRef({ position: state.position, status });
  useEffect(() => {
    latest.current = { position: state.position, status };
  });

  const experiment = { variant: 'guided' as const, surface };
  const track = (event: string, properties: Record<string, unknown> = {}) => trackEvent(event, { ...experiment, ...properties });
  const leadContext = () => ({ cta_label: ctaLabel, source_page: window.location.pathname });

  const markStarted = () => {
    interactedRef.current = true;
    if (startedRef.current) return;
    startedRef.current = true;
    track('guided_booking_started', { context: context.kind, workflowKey: context.workflowKey ?? null, locale });
    track('lead_form_started', leadContext());
  };

  // Refresh-resume: answers only, cleared after a successful submit.
  useEffect(() => {
    if (status === 'sent') writeStoredConversation(key, null);
    else writeStoredConversation(key, serialize(state));
  }, [key, state, status]);

  // Keep the newest line and the answer area in view.
  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    log.scrollTo({ top: log.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [revealed, typing, status, booking, reduceMotion]);

  // Focus follows the conversation once the visitor has started answering
  // (never on page load, so arriving visitors keep their place on the page).
  // It also lands somewhere sensible when the booking screen closes: back on
  // "Choose a time", or on the newest line when that control is gone. While
  // the booking screen is open, the dialog owns focus.
  useEffect(() => {
    if (!interactedRef.current || typing || booking === 'opening') return;
    const area = answerRef.current;
    const focusTarget = area?.querySelector<HTMLElement>('[data-autofocus]')
      ?? area?.querySelector<HTMLElement>('input:not([type=hidden]):not([tabindex="-1"]), select, textarea, button:not([disabled]), a[href]')
      ?? logRef.current?.querySelector<HTMLElement>('[data-autofocus]')
      ?? logRef.current;
    focusTarget?.focus();
  }, [revealed, typing, status, booking]);

  // Phase 2: report a completed booking once the booking screen has closed and
  // analytics capture has resumed.
  useEffect(() => {
    if (booking !== 'booked' || bookedTrackedRef.current) return;
    bookedTrackedRef.current = true;
    trackEvent('guided_booking_booked', { ...experiment });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- experiment is constant for this surface
  }, [booking]);

  // Abandonment: sent once on pagehide if the visitor started and did not submit.
  useEffect(() => {
    const onPageHide = () => {
      if (!startedRef.current || latest.current.status === 'sent') return;
      trackEvent('guided_booking_abandoned', { ...experiment, lastStepId: latest.current.position });
    };
    window.addEventListener('pagehide', onPageHide);
    return () => window.removeEventListener('pagehide', onPageHide);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- registered once; reads the latest ref
  }, []);

  const countryName = useMemo(() => {
    let names: Intl.DisplayNames | null = null;
    try {
      names = new Intl.DisplayNames([intlLocale], { type: 'region' });
    } catch {
      names = null;
    }
    return (iso: string) => {
      const english = findCountryByIso(iso)?.name ?? iso;
      try {
        return names?.of(iso) ?? english;
      } catch {
        return english;
      }
    };
  }, [intlLocale]);

  const countryOptions = useMemo(
    () => COUNTRY_CODES.map((country) => ({ iso: country.iso, code: country.code, label: countryName(country.iso) }))
      .sort((a, b) => a.label.localeCompare(b.label, intlLocale)),
    [countryName, intlLocale],
  );

  const submit = async (snapshot: ConversationState) => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setStatus('submitting');
    setSubmitError(null);
    track('lead_form_submit_attempted', leadContext());
    if (honeypot) {
      // Bots get the same ending without a lead, exactly like the classic form.
      submittingRef.current = false;
      setStatus('sent');
      return;
    }
    const campaign = getCampaignParams();
    const sourcePage = window.location.pathname;
    const payload = toPayload(snapshot, {
      ctaLabel,
      sourcePage,
      locale,
      pricingIntent,
      utmSource: campaign.utm_source,
      utmMedium: campaign.utm_medium,
      utmCampaign: campaign.utm_campaign,
    });
    try {
      const response = await fetch('/api/cta/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => ({}))) as { bookingToken?: unknown };
      submittingRef.current = false;
      if (!response.ok) {
        setSubmitError(response.status === 429 ? 'rateLimited' : 'unavailable');
        setStatus('error');
        track('lead_form_submission_failed', { ...leadContext(), status: response.status });
        return;
      }
      const token = typeof data.bookingToken === 'string' && data.bookingToken.length > 0 ? data.bookingToken : null;
      const offerBooking = !!token && (mode !== 'contact' || snapshot.answers.topic === 'walkthrough');
      setBookingToken(offerBooking ? token : null);
      setBooking(offerBooking ? 'offer' : null);
      setStatus('sent');
      track('lead_form_submitted', {
        ...leadContext(),
        utm_source: campaign.utm_source || undefined,
        utm_medium: campaign.utm_medium || undefined,
        utm_campaign: campaign.utm_campaign || undefined,
      });
      track('guided_booking_submitted', {
        locations: payload.numberOfLocations,
        focus: payload.metadata.convo.focus,
        booking_offered: offerBooking,
      });
    } catch {
      submittingRef.current = false;
      setSubmitError('unavailable');
      setStatus('error');
      track('lead_form_submission_failed', { ...leadContext(), status: 0 });
    }
  };

  const commit = <S extends StepId>(step: S, input: AnswerInputs[S]): ValidationError | null => {
    markStarted();
    const result = answer(state, step, input);
    if (!result.ok) {
      track('lead_form_validation_failed', { ...leadContext(), invalid_fields: [step] });
      return result.error;
    }
    const inferred = (step === 'company' && (input as AnswerInputs['company']).inferred)
      || (step === 'country' && (input as AnswerInputs['country']).inferred);
    track('guided_booking_step_answered', {
      stepId: step,
      stepIndex: progressIndex(step) + 1,
      inferred: !!inferred,
      msSinceStart: Date.now() - state.startedAt,
    });
    if (step === 'email_confirm') setAskedForWorkEmail(input === 'work');
    setState(result.state);
    if (result.state.position === 'brief') track('guided_booking_brief_shown', { focusCount: result.state.answers.focus?.length ?? 0 });
    if (result.state.position === 'ready') void submit(result.state);
    return null;
  };

  const rewind = (next: ConversationState) => {
    markStarted();
    setStatus('idle');
    setSubmitError(null);
    setState(next);
    setRevealed(`${next.position}#${next.answerCount}`);
  };

  const onEdit = (step: StepId) => {
    track('guided_booking_step_edited', { stepId: step });
    rewind(edit(state, step));
  };

  const onBack = () => rewind(back(state));

  const switchToClassic = () => {
    track('guided_booking_switched_to_classic', { atStepId: state.position });
    const hasMessage = !!state.answers.focus?.length || !!state.answers.message;
    onSwitchToClassic(toClassicValues(state, hasMessage ? composeMessage(state) : undefined));
  };

  // ── Lines ────────────────────────────────────────────────────────────

  const name = state.answers.name ? firstName(state.answers.name) : '';
  const workflowTopic = context.workflowKey
    ? {
      'restaurant-management-platform': copy.workflows.platform,
      'restaurant-task-management': copy.workflows.tasks,
      'restaurant-logbook': copy.workflows.logbook,
      'restaurant-tip-management': copy.workflows.tips,
    }[context.workflowKey]
    : '';

  const opening = (() => {
    if (context.kind === 'pricing' && context.pricing) {
      return fill(copy.openings.pricing, { package: context.pricing.packageLabel, n: context.pricing.locations });
    }
    if (context.kind === 'workflow') return fill(copy.openings.workflow, { workflow: workflowTopic });
    return fill(mode === 'contact' ? copy.openings.contact : copy.openings.default);
  })();

  const inferredCompany = state.answers.email && !state.answers.emailIsFreeMail ? companyFromEmail(state.answers.email) : '';
  const suggestedCountry = context.suggestedCountryIso ? findCountryByIso(context.suggestedCountryIso) : null;

  const isContactSummary = mode === 'contact' && state.answers.topic !== undefined && state.answers.topic !== 'walkthrough';

  const promptLines = (step: StepId): ReactNode[] => {
    switch (step) {
      case 'name': return [opening];
      case 'email':
        if (askedForWorkEmail) return [fill(copy.email.again)];
        return [fill(mode === 'contact' ? copy.email.promptContact : copy.email.prompt, { name })];
      case 'email_confirm': return [fill(copy.email.personal)];
      case 'company':
        return [inferredCompany ? fill(copy.company.confirm, { company: inferredCompany }, ['company']) : fill(copy.company.ask)];
      case 'role': return [fill(copy.role.prompt)];
      case 'locations': return [fill(copy.locations.prompt)];
      case 'topic': return [fill(copy.topic.prompt)];
      case 'focus': {
        const lines: ReactNode[] = [];
        if (context.pricing?.bucket) lines.push(fill(copy.locations.known, { n: context.pricing.locations }, ['n']));
        lines.push(<>{fill(copy.focus.prompt)} <span className={styles.mutedInline}>{copy.focus.pickAny}</span></>);
        return lines;
      }
      case 'message': return [fill(copy.topic.message)];
      case 'pos': return [fill(copy.pos.prompt)];
      case 'country':
        return [suggestedCountry ? fill(copy.country.suggest, { country: countryName(suggestedCountry.iso) }, ['country']) : fill(copy.country.ask)];
      case 'brief': return [fill(isContactSummary ? copy.brief.summaryIntro : copy.brief.intro)];
      case 'phone': return [fill(copy.phone.prompt)];
    }
  };

  const answerText = (step: StepId): ReactNode => {
    const a = state.answers;
    switch (step) {
      case 'name': return a.name;
      case 'email': return <bdi dir="ltr">{a.email}</bdi>;
      case 'email_confirm': return copy.email.useAnyway;
      case 'company': return a.company?.inferred ? fill(copy.company.yesAnswer, { company: a.company.value }) : <bdi>{a.company?.value}</bdi>;
      case 'role': return a.role?.key === 'other' ? <bdi>{a.role.label}</bdi> : a.role ? copy.role.options[a.role.key] : '';
      case 'locations': return a.locations?.bucket;
      case 'topic': return a.topic ? copy.topic.options[a.topic] : '';
      case 'focus':
        return (
          <>
            {orderFocusForAgenda(a.focus ?? []).map((focus) => copy.focus.options[focus]).join(', ')}
            {a.note && <span className={styles.userNote}><bdi>{a.note}</bdi></span>}
          </>
        );
      case 'message': return <bdi>{a.message}</bdi>;
      case 'pos': return a.pos?.choice === 'not_sure' ? copy.pos.notSure : <bdi>{a.pos?.value}</bdi>;
      case 'country':
        if (!a.country) return '';
        return a.country.inferred ? fill(copy.country.yesAnswer, { country: countryName(a.country.iso) }) : countryName(a.country.iso);
      case 'brief': return copy.brief.confirm;
      case 'phone': return a.phone?.skipped ? copy.phone.skip : <bdi dir="ltr">{a.phone?.value}</bdi>;
    }
  };

  const answerPlain = (step: StepId): string => {
    const a = state.answers;
    switch (step) {
      case 'name': return a.name ?? '';
      case 'email': return a.email ?? '';
      case 'company': return a.company?.value ?? '';
      case 'role': return a.role?.key === 'other' ? a.role.label : a.role ? copy.role.options[a.role.key] : '';
      case 'locations': return a.locations?.bucket ?? '';
      case 'topic': return a.topic ? copy.topic.options[a.topic] : '';
      case 'focus': return orderFocusForAgenda(a.focus ?? []).map((focus) => copy.focus.options[focus]).join(', ');
      case 'message': return a.message ?? '';
      case 'pos': return a.pos?.choice === 'not_sure' ? copy.pos.notSure : a.pos?.value ?? '';
      case 'country': return a.country ? countryName(a.country.iso) : '';
      case 'phone': return a.phone?.skipped ? copy.phone.skip : a.phone?.value ?? '';
      default: return '';
    }
  };

  // ── Render pieces ────────────────────────────────────────────────────

  const transcript = transcriptSteps(state);
  const position = state.position;
  const showCurrentPrompt = !typing && position !== 'ready' && position !== 'support';
  const terminal = status === 'sent';
  const editable = status !== 'submitting' && !terminal;

  const sundaeLine = (content: ReactNode, keyName: string, greeting = false) => (
    <SundaeLine key={keyName} greeting={greeting}>{content}</SundaeLine>
  );

  const userBubble = (step: StepId) => (
    <UserBubble
      key={`a-${step}`}
      edit={editable && step !== 'brief'
        ? { label: copy.edit, ariaLabel: fillText(copy.editLabel, { answer: answerPlain(step) || copy.edit }), onClick: () => onEdit(step) }
        : null}
    >
      {answerText(step)}
    </UserBubble>
  );

  const endingItems = (): ReactNode[] => {
    const email = state.answers.email ?? '';
    if (isContactSummary) {
      return [
        <div key="done" className={`${styles.doneCard} ${styles.enter}`}>
          <Mail className={styles.doneIcon} aria-hidden="true" strokeWidth={1.7} />
          <p className={styles.doneTitle}>{fill(copy.done.contactTitle, { name })}</p>
          <p className={styles.doneBody}>{fill(copy.done.contactBody, { email: <span dir="ltr">{email}</span> }, ['email'])}</p>
        </div>,
      ];
    }
    if (booking === 'offer' || booking === 'opening') {
      return [
        sundaeLine(fill(copy.booking.ready), 'booking-ready'),
        <BookingOfferCard key="handoff" title={copy.booking.timezoneTitle} body={fill(copy.booking.timezoneBody)} />,
      ];
    }
    const items: ReactNode[] = [];
    if (booking === 'booked' && bookedAt) {
      // Focusable so keyboard and screen-reader users land on the confirmation.
      items.push(
        <p key="booked" className={`${styles.line} ${styles.enter}`} tabIndex={-1} data-autofocus>
          {fill(copy.booking.booked, { time: formatBooking(bookedAt, intlLocale), email: <span dir="ltr">{email}</span> }, ['time'])}
        </p>,
      );
      return items;
    }
    if (booking === 'failed') items.push(sundaeLine(fill(copy.booking.failed), 'booking-failed'));
    if (booking === 'later') items.push(sundaeLine(fill(copy.booking.notBooked), 'booking-later'));
    items.push(
      <div key="done" className={`${styles.doneCard} ${styles.enter}`}>
        <Mail className={styles.doneIcon} aria-hidden="true" strokeWidth={1.7} />
        <p className={styles.doneTitle}>{fill(copy.done.title, { name })}</p>
        <p className={styles.doneBody}>{fill(copy.done.body, { email: <span dir="ltr">{email}</span> }, ['email'])}</p>
      </div>,
    );
    return items;
  };

  const logItems: ReactNode[] = [];
  transcript.forEach((step) => {
    promptLines(step).forEach((line, index) => logItems.push(sundaeLine(line, `p-${step}-${index}`, step === 'name' && index === 0)));
    if (step === 'brief') logItems.push(<BriefCard key="brief-past" state={state} copy={copy} countryName={countryName} contactSummary={isContactSummary} />);
    logItems.push(userBubble(step));
  });
  if (showCurrentPrompt) {
    promptLines(position).forEach((line, index) => logItems.push(sundaeLine(line, `p-${position}-${index}`, position === 'name' && index === 0)));
    if (position === 'brief') {
      logItems.push(
        <BriefCard
          key="brief-now"
          state={state}
          copy={copy}
          countryName={countryName}
          contactSummary={isContactSummary}
          onConfirm={() => commit('brief', 'confirmed')}
          onChange={() => onEdit(mode === 'contact' ? 'topic' : 'focus')}
        />,
      );
    }
  }
  if (position === 'support' && !typing) {
    logItems.push(sundaeLine(fill(copy.topic.support), 'support'));
  }
  if (position === 'ready' && !typing && status === 'submitting') {
    logItems.push(<p key="sending" className={`${styles.line} ${styles.mutedInline}`} role="status">{copy.submitting}</p>);
  }
  if (position === 'ready' && status === 'error' && submitError) {
    logItems.push(sundaeLine(fill(copy.errors[submitError]), `error-${submitError}`));
  }
  if (terminal) {
    logItems.push(...endingItems());
  }


  // ── Answer area ──────────────────────────────────────────────────────

  const previous = previousStep(state);
  const canGoBack = editable && !!previous && position !== 'brief';

  let control: ReactNode = null;
  if (!typing) {
    if (terminal) {
      if (booking === 'offer' || booking === 'opening') {
        control = (
          <BookingOfferActions
            chooseLabel={copy.booking.choose}
            laterLabel={copy.booking.later}
            opening={booking === 'opening'}
            onChoose={() => {
              setBooking('opening');
              track('guided_booking_booking_opened');
            }}
            onLater={() => setBooking('later')}
          />
        );
      } else if (!isContactSummary && booking !== 'booked') {
        control = <a className={styles.textLink} href={PRICING_URL}>{copy.done.explore}</a>;
      }
    } else if (position === 'ready') {
      if (status === 'error') {
        control = (
          <div className={styles.inlineRow}>
            <button type="button" className={styles.solid} data-autofocus onClick={() => void submit(state)}>{copy.errors.retry}</button>
            <button type="button" className={styles.textLink} onClick={switchToClassic}>{copy.header.classic}</button>
          </div>
        );
      }
    } else if (position === 'support') {
      control = (
        <a className={styles.solid} data-autofocus href={`mailto:${SUPPORT_EMAIL}`}>
          <Mail aria-hidden="true" />
          {copy.topic.supportLink}
        </a>
      );
    } else if (position !== 'brief') {
      control = (
        <StepControl
          key={`${position}#${state.answerCount}`}
          step={position}
          state={state}
          copy={copy}
          context={context}
          inferredCompany={inferredCompany}
          suggestedCountryIso={suggestedCountry?.iso ?? null}
          countryOptions={countryOptions}
          countryName={countryName}
          commit={commit}
        />
      );
    }
  }

  const progress = terminal ? PROGRESS_SEGMENTS : progressIndex(position);
  const sub = terminal ? (booking === 'offer' || booking === 'opening' ? copy.header.sublineLast : copy.header.sublineSent) : null;

  const panel = (
    <section
      className={`${styles.root} ${rtl ? styles.rtl : ''}`}
      aria-labelledby={titleId}
      data-guided-booking={mode}
      onFocusCapture={(event) => {
        if (answerRef.current?.contains(event.target as Node)) markStarted();
      }}
    >
      <ConversationHeader
        titleId={titleId}
        title={mode === 'contact' ? copy.header.contactTitle : copy.header.title}
        sub={sub ?? <Subline full={copy.header.subline} short={copy.header.sublineShort} />}
        classic={!terminal ? { full: copy.header.classic, short: copy.header.classicShort, onClick: switchToClassic } : null}
      />

      <ProgressSegments
        segments={PROGRESS_SEGMENTS}
        current={progress}
        label={fillText(copy.progress, { current: Math.min(progress + 1, PROGRESS_SEGMENTS), total: PROGRESS_SEGMENTS })}
      />

      <div ref={logRef} className={styles.log} role="log" aria-live="polite" aria-label={copy.logLabel} tabIndex={0}>
        {logItems}
        {typing && <TypingDots />}
      </div>

      <div ref={answerRef} className={styles.answer} hidden={!typing && !control && !canGoBack}>
        {control}
        {!typing && (canGoBack || (control && isTextStep(position) && !terminal)) && (
          <AnswerMeta
            back={canGoBack ? { label: copy.back, onClick: onBack } : null}
            hint={control && isTextStep(position) && !terminal ? copy.hint : null}
          />
        )}
      </div>

      <PrivacyFoot text={mode === 'contact' ? copy.privacyContact : copy.privacy} linkLabel={copy.privacyLink} />

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`${titleId}-website`}>Website</label>
        <input id={`${titleId}-website`} name="website_url" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
      </div>

      {booking === 'opening' && bookingToken && (
        <GuidedBookingHandoff
          token={bookingToken}
          locale={locale}
          dialogLabel={copy.booking.choose}
          closeLabel={copy.booking.close}
          loadingLabel={copy.booking.opening}
          onBooked={(summary) => setBookedAt(summary)}
          // Closing without booking keeps the offer (the token is still valid), so
          // focus returns to "Choose a time"; after a booking it lands on the confirmation.
          onClose={() => setBooking((current) => (current === 'opening' ? (bookedAt ? 'booked' : 'offer') : current))}
          onFailed={() => setBooking('failed')}
        />
      )}
    </section>
  );

  if (layout !== 'demo') return panel;

  return (
    <div className={styles.demoGrid}>
      <div className={styles.demoIntro}>
        <p className="eyebrow">{copy.header.title}</p>
        <h2 className={`section-h2 ${styles.demoHeading}`}>{copy.demoHeading}</h2>
        <ul className={styles.reassure} role="list">
          <li><Database aria-hidden="true" strokeWidth={1.7} />{copy.reassurance.data}</li>
          <li><Activity aria-hidden="true" strokeWidth={1.7} />{copy.reassurance.answers}</li>
          <li><Clock aria-hidden="true" strokeWidth={1.7} />{copy.reassurance.time}</li>
        </ul>
      </div>
      {panel}
    </div>
  );
}

function isTextStep(position: string): boolean {
  return position === 'name' || position === 'email' || position === 'message' || position === 'phone';
}

function formatBooking(booking: BookingSummary, intlLocale: string): string {
  if (!booking.startAt) return '';
  try {
    return new Intl.DateTimeFormat(intlLocale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    }).format(new Date(booking.startAt));
  } catch {
    return new Date(booking.startAt).toUTCString();
  }
}

// ── Brief card ─────────────────────────────────────────────────────────

function BriefCard({
  state,
  copy,
  countryName,
  contactSummary,
  onConfirm,
  onChange,
}: {
  state: ConversationState;
  copy: GuidedBookingCopy;
  countryName: (iso: string) => string;
  contactSummary: boolean;
  onConfirm?: () => void;
  onChange?: () => void;
}) {
  const { answers } = state;
  const bucket = answers.locations?.bucket ?? '';
  const locations = bucket === '1' ? copy.locations.one : fillText(copy.locations.many, { n: bucket });
  const role = answers.role?.key === 'other' ? answers.role.label : answers.role ? copy.role.options[answers.role.key] : '';
  const meta = [answers.company?.value, locations, role].filter((part): part is string => !!part);
  const country = answers.country ? countryName(answers.country.iso) : '';
  const pos = answers.pos?.choice === 'not_sure' ? copy.pos.notSure : answers.pos?.value ?? '';
  const agenda = orderFocusForAgenda(answers.focus ?? []);
  const notes = agenda.filter((key): key is keyof GuidedBookingCopy['focus']['notes'] => key in copy.focus.notes);
  return (
    <div className={styles.brief}>
      <h3 className={styles.briefTitle}>{contactSummary ? copy.brief.summaryTitle : copy.brief.title}</h3>
      <p className={styles.briefMeta}>
        {meta.map((part, index) => (
          <span key={index}>{index > 0 && ' · '}<bdi>{part}</bdi></span>
        ))}
      </p>
      {contactSummary ? (
        <>
          {answers.topic && <p className={styles.briefMessage}><b>{copy.topic.options[answers.topic]}</b></p>}
          {answers.message && <p className={styles.briefMessage}><bdi>{answers.message}</bdi></p>}
        </>
      ) : (
        <>
          <ol className={styles.agenda} role="list">
            {agenda.map((key) => (
              <li key={key}>
                <span>{copy.focus.agenda[key]}</span>
                <span className={styles.tag}>{FOCUS_FACTS[key].layer === 'crew' ? 'Crew' : 'Core'}</span>
              </li>
            ))}
          </ol>
          {notes.length > 0 && (
            <div className={styles.notes}>
              {notes.map((key) => (
                <p key={key} className={styles.note}>
                  <Info aria-hidden="true" strokeWidth={1.8} />
                  <span>{copy.focus.notes[key]}</span>
                </p>
              ))}
            </div>
          )}
        </>
      )}
      {/* "POS" is a protected product term and stays untranslated. */}
      <p className={styles.briefFoot}><bdi>POS: {pos}</bdi> · <bdi>{country}</bdi></p>
      {onConfirm && onChange && (
        <div className={styles.briefActions}>
          <button type="button" className={styles.briefPrimary} onClick={onConfirm} data-autofocus>
            {copy.brief.confirm}
            <ArrowRight aria-hidden="true" className={styles.flip} />
          </button>
          <button type="button" className={styles.briefGhost} onClick={onChange}>{copy.brief.change}</button>
        </div>
      )}
    </div>
  );
}

// ── Step controls ──────────────────────────────────────────────────────

interface StepControlProps {
  step: StepId;
  state: ConversationState;
  copy: GuidedBookingCopy;
  context: ConversationContext;
  inferredCompany: string;
  suggestedCountryIso: string | null;
  countryOptions: { iso: string; code: string; label: string }[];
  countryName: (iso: string) => string;
  commit: <S extends StepId>(step: S, input: AnswerInputs[S]) => ValidationError | null;
}

function StepControl({ step, state, copy, context, inferredCompany, suggestedCountryIso, countryOptions, countryName, commit }: StepControlProps) {
  const a = state.answers;
  const [error, setError] = useState<ValidationError | null>(null);
  // Sub-modes: "Different name", "Other", "Somewhere else", "Anything else?".
  const [typed, setTyped] = useState(() => (step === 'company' && !!a.company && !a.company.inferred)
    || (step === 'company' && !inferredCompany)
    || (step === 'role' && a.role?.key === 'other')
    || (step === 'pos' && a.pos?.choice === 'other')
    || (step === 'country' && (!suggestedCountryIso || (!!a.country && !a.country.inferred))));
  const [focus, setFocus] = useState<FocusKey[]>(() => a.focus ?? context.preselectedFocus);
  const [noteOpen, setNoteOpen] = useState(() => !!a.note);
  const run = <S extends StepId>(target: S, input: AnswerInputs[S]) => setError(commit(target, input));
  const errorText = error && error !== 'notCurrent' ? copy.errors[error] : null;

  switch (step) {
    case 'name':
      return <TextAnswer key="name" label={copy.name.label} placeholder={copy.name.placeholder} autoComplete="name" defaultValue={a.name} error={errorText} sendLabel={copy.send} onSubmit={(value) => run('name', value)} />;
    case 'email':
      return <TextAnswer key="email" label={copy.email.label} placeholder={copy.email.placeholder} type="email" autoComplete="email" inputMode="email" dir="ltr" defaultValue={a.email} error={errorText} sendLabel={copy.send} onSubmit={(value) => run('email', value)} />;
    case 'email_confirm':
      return (
        <Choices
          label={copy.email.personal}
          options={[{ key: 'use', label: copy.email.useAnyway }, { key: 'work', label: copy.email.addWork }]}
          onChoose={(choice) => run('email_confirm', choice as 'use' | 'work')}
        />
      );
    case 'company':
      return (
        <CompanyConfirm
          question={fillText(copy.company.confirm, { company: inferredCompany })}
          inferred={inferredCompany}
          yesLabel={copy.company.yes}
          differentLabel={copy.company.different}
          startTyped={typed}
          text={{ label: copy.company.label, placeholder: copy.company.placeholder, defaultValue: a.company && !a.company.inferred ? a.company.value : '', error: errorText, sendLabel: copy.send }}
          onConfirm={() => run('company', { value: inferredCompany, inferred: true })}
          onTyped={(value) => run('company', { value, inferred: false })}
        />
      );
    case 'role':
      if (!typed) {
        return (
          <Choices
            label={copy.role.prompt}
            selected={a.role?.key}
            options={ROLE_KEYS.map((roleKey) => ({ key: roleKey, label: copy.role.options[roleKey] }))}
            onChoose={(choice) => (choice === 'other' ? setTyped(true) : run('role', { key: choice as (typeof ROLE_KEYS)[number] }))}
          />
        );
      }
      return <TextAnswer key="role-text" label={copy.role.otherLabel} placeholder={copy.role.otherPlaceholder} autoComplete="organization-title" defaultValue={a.role?.key === 'other' ? a.role.label : ''} error={errorText} sendLabel={copy.send} onSubmit={(value) => run('role', { key: 'other', other: value })} />;
    case 'locations':
      return (
        <Choices
          label={copy.locations.label}
          selected={a.locations?.bucket}
          options={LOCATION_BUCKETS.map((bucket) => ({ key: bucket, label: bucket }))}
          onChoose={(bucket) => run('locations', bucket as (typeof LOCATION_BUCKETS)[number])}
        />
      );
    case 'topic':
      return (
        <Choices
          label={copy.topic.prompt}
          selected={a.topic}
          options={TOPIC_KEYS.map((topic) => ({ key: topic, label: copy.topic.options[topic] }))}
          onChoose={(topic) => run('topic', topic as (typeof TOPIC_KEYS)[number])}
        />
      );
    case 'focus':
      return (
        <FocusAnswer
          copy={copy}
          selected={focus}
          onToggle={(key) => {
            setError(null);
            setFocus((current) => (current.includes(key) ? current.filter((item) => item !== key) : [...current, key]));
          }}
          noteOpen={noteOpen}
          onOpenNote={() => setNoteOpen(true)}
          defaultNote={a.note ?? ''}
          error={errorText}
          onDone={(note) => run('focus', { keys: focus, note })}
        />
      );
    case 'message':
      return <TextAnswer key="message" multiline label={copy.topic.messageLabel} placeholder={copy.topic.messagePlaceholder} defaultValue={a.message} error={errorText} sendLabel={copy.send} onSubmit={(value) => run('message', value)} />;
    case 'pos':
      return (
        <PosPicker
          question={copy.pos.prompt}
          listed={posOptionsForCountry(a.country?.iso ?? suggestedCountryIso).map((pos) => ({ key: pos, label: pos }))}
          otherLabel={copy.pos.other}
          notSureLabel={copy.pos.notSure}
          selected={a.pos?.choice === 'not_sure' ? 'not_sure' : a.pos?.choice === 'listed' ? a.pos.value : undefined}
          startTyped={typed}
          text={{ label: copy.pos.otherLabel, placeholder: copy.pos.otherPlaceholder, defaultValue: a.pos?.choice === 'other' ? a.pos.value : '', error: errorText, sendLabel: copy.send }}
          onListed={(value) => run('pos', { choice: 'listed', value })}
          onNotSure={() => run('pos', { choice: 'not_sure' })}
          onOther={(value) => run('pos', { choice: 'other', value })}
        />
      );
    case 'country':
      if (!typed && suggestedCountryIso) {
        return (
          <Choices
            label={fillText(copy.country.suggest, { country: countryName(suggestedCountryIso) })}
            options={[{ key: 'yes', label: copy.country.yes }, { key: 'elsewhere', label: copy.country.elsewhere }]}
            onChoose={(choice) => (choice === 'yes' ? run('country', { iso: suggestedCountryIso, inferred: true }) : setTyped(true))}
          />
        );
      }
      return (
        <CountryAnswer
          copy={copy}
          options={countryOptions}
          defaultIso={a.country?.iso ?? suggestedCountryIso ?? ''}
          error={errorText}
          onSubmit={(iso) => run('country', { iso, inferred: false })}
        />
      );
    case 'phone':
      return (
        <PhoneAnswer
          copy={copy}
          options={countryOptions}
          defaultDial={a.country?.dialCode ?? ''}
          error={errorText}
          onSubmit={(dialCode, number) => run('phone', { dialCode, number })}
          onSkip={() => run('phone', { skipped: true })}
        />
      );
    default:
      return null;
  }
}

function FocusAnswer({
  copy,
  selected,
  onToggle,
  noteOpen,
  onOpenNote,
  defaultNote,
  error,
  onDone,
}: {
  copy: GuidedBookingCopy;
  selected: FocusKey[];
  onToggle: (key: FocusKey) => void;
  noteOpen: boolean;
  onOpenNote: () => void;
  defaultNote: string;
  error: string | null;
  onDone: (note: string) => void;
}) {
  const id = useId();
  const [note, setNote] = useState(defaultNote);
  return (
    <div className={styles.stack}>
      <MultiChoices
        label={copy.focus.label}
        options={FOCUS_KEYS.map((key) => ({ key, label: copy.focus.options[key] }))}
        selected={selected}
        onToggle={(key) => onToggle(key as FocusKey)}
        doneLabel={selected.length ? fillText(copy.focus.doneCount, { count: selected.length }) : copy.focus.done}
        onDone={() => onDone(note)}
        describedBy={error ? `${id}-error` : undefined}
      />
      {noteOpen ? (
        <textarea
          id={`${id}-note`}
          className={styles.field}
          rows={2}
          maxLength={500}
          aria-label={copy.focus.noteLabel}
          placeholder={copy.focus.notePlaceholder}
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      ) : (
        <div>
          <button type="button" className={styles.quietLink} onClick={onOpenNote}>{copy.focus.anythingElse}</button>
        </div>
      )}
      <ErrorLine id={`${id}-error`} text={error} />
    </div>
  );
}

function CountryAnswer({
  copy,
  options,
  defaultIso,
  error,
  onSubmit,
}: {
  copy: GuidedBookingCopy;
  options: { iso: string; label: string }[];
  defaultIso: string;
  error: string | null;
  onSubmit: (iso: string) => void;
}) {
  const id = useId();
  const [iso, setIso] = useState(defaultIso);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(iso);
      }}
      noValidate
    >
      <div className={styles.fieldRow}>
        <select
          className={styles.field}
          value={iso}
          aria-label={copy.country.label}
          autoComplete="country"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(event) => setIso(event.target.value)}
        >
          <option value="">{copy.country.placeholder}</option>
          {options.map((option) => (
            <option key={option.iso} value={option.iso}>{option.label}</option>
          ))}
        </select>
        <button type="submit" className={styles.send} aria-label={copy.country.confirm}>
          <ArrowRight aria-hidden="true" strokeWidth={2.2} className={styles.flip} />
        </button>
      </div>
      <ErrorLine id={`${id}-error`} text={error} />
    </form>
  );
}

function PhoneAnswer({
  copy,
  options,
  defaultDial,
  error,
  onSubmit,
  onSkip,
}: {
  copy: GuidedBookingCopy;
  options: { iso: string; code: string; label: string }[];
  defaultDial: string;
  error: string | null;
  onSubmit: (dialCode: string, number: string) => void;
  onSkip: () => void;
}) {
  const id = useId();
  const [dial, setDial] = useState(defaultDial || '+971');
  const [number, setNumber] = useState('');
  const [showError, setShowError] = useState(true);
  const visibleError = showError ? error : null;
  const dialOptions = useMemo(() => {
    const seen = new Set<string>();
    return options.filter((option) => (seen.has(option.code) ? false : (seen.add(option.code), true)));
  }, [options]);
  return (
    <div className={styles.stack}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setShowError(true);
          onSubmit(dial, number);
        }}
        noValidate
      >
        <div className={styles.fieldRow}>
          <select
            className={`${styles.field} ${styles.dial}`}
            value={dial}
            aria-label={copy.phone.dialLabel}
            autoComplete="tel-country-code"
            dir="ltr"
            onChange={(event) => setDial(event.target.value)}
          >
            {dialOptions.map((option) => (
              <option key={option.iso} value={option.code} title={option.label}>{option.iso} {option.code}</option>
            ))}
          </select>
          <input
            className={styles.field}
            type="tel"
            inputMode="tel"
            dir="ltr"
            autoComplete="tel-national"
            enterKeyHint="send"
            maxLength={20}
            data-autofocus
            aria-label={copy.phone.label}
            placeholder={copy.phone.placeholder}
            aria-invalid={!!visibleError}
            aria-describedby={visibleError ? `${id}-error` : undefined}
            value={number}
            onChange={(event) => {
              setNumber(event.target.value);
              setShowError(false);
            }}
          />
          <button type="submit" className={styles.send} aria-label={copy.send}>
            <ArrowRight aria-hidden="true" strokeWidth={2.2} className={styles.flip} />
          </button>
        </div>
        <ErrorLine id={`${id}-error`} text={visibleError} />
      </form>
      <div>
        <button type="button" className={styles.chip} onClick={onSkip}>{copy.phone.skip}</button>
      </div>
    </div>
  );
}
