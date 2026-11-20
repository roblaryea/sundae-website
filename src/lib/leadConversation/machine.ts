/**
 * Guided booking state machine. Deterministic and side-effect free: the UI
 * renders whatever position the machine reports and calls `answer`, `back`
 * or `edit`. `toPayload` produces the exact body the classic form would send
 * to `/api/cta/submit`, plus `source: 'guided-booking'` and `metadata.convo`.
 */

import {
  composeFullPhone,
  isValidLeadEmail,
  isValidLeadPhone,
  LOCATION_BUCKETS,
  normalizePhoneForStorage,
  type LocationBucket,
} from '../leadFields.ts';
import type { PricingIntent } from '../pricingIntent.ts';
import {
  companyFromEmail,
  findCountryByIso,
  focusFromPricingIntent,
  isFreeMailEmail,
  isLocationBucket,
  isWorkflowKey,
  locationBucketFor,
  pricingPackageLabel,
  WORKFLOW_FOCUS,
} from './inference.ts';
import { FOCUS_FACTS, isFocusKey, orderFocusForAgenda, type FocusKey, type FocusLayer } from './packageNotes.ts';
import {
  CONVERSATION_MODES,
  isStepActive,
  isStepAnswered,
  POS_NOT_SURE,
  ROLE_KEYS,
  ROLE_LABELS_EN,
  STEP_ORDER,
  TOPIC_KEYS,
  TOPIC_LABELS_EN,
  type Answers,
  type ConversationContext,
  type ConversationMode,
  type PosChoice,
  type Position,
  type RoleKey,
  type StepId,
  type TopicKey,
} from './script.ts';

export const CONVERSATION_VERSION = 1;
export const GUIDED_BOOKING_SOURCE = 'guided-booking';
export const MAX_TEXT = 120;
export const MAX_NOTE = 500;

export interface ConversationState {
  version: typeof CONVERSATION_VERSION;
  context: ConversationContext;
  answers: Answers;
  position: Position;
  startedAt: number;
  /** Accepted answers, including re-answers after Edit/Back. */
  answerCount: number;
}

export interface ContextInput {
  mode: ConversationMode;
  pricingIntent?: PricingIntent | null;
  workflowKey?: string | null;
  suggestedCountryIso?: string | null;
}

/** Pick the opening context: pricing estimate, then workflow page, then default. */
export function buildContext({ mode, pricingIntent, workflowKey, suggestedCountryIso }: ContextInput): ConversationContext {
  const country = findCountryByIso(suggestedCountryIso);
  const base = { mode, suggestedCountryIso: country?.iso };
  // The contact form never receives a pricing estimate; demo and get-started do.
  if (pricingIntent && mode !== 'contact') {
    return {
      ...base,
      kind: 'pricing',
      pricing: {
        packageLabel: pricingPackageLabel(pricingIntent),
        locations: pricingIntent.locations,
        bucket: locationBucketFor(pricingIntent.locations),
        layer: pricingIntent.layer,
      },
      preselectedFocus: focusFromPricingIntent(pricingIntent),
    };
  }
  if (isWorkflowKey(workflowKey)) {
    return { ...base, kind: 'workflow', workflowKey, preselectedFocus: [WORKFLOW_FOCUS[workflowKey]] };
  }
  return { ...base, kind: 'default', preselectedFocus: [] };
}

/** Stable identity of a context, so a stored conversation only resumes on the same entry. */
export function contextSignature(context: ConversationContext): string {
  return [context.mode, context.kind, context.workflowKey ?? '', context.pricing?.packageLabel ?? '', context.pricing?.locations ?? ''].join('|');
}

function initialAnswers(context: ConversationContext): Answers {
  return context.pricing?.bucket ? { locations: { bucket: context.pricing.bucket, inferred: true } } : {};
}

export function start(context: ConversationContext, now = Date.now()): ConversationState {
  const answers = initialAnswers(context);
  return { version: CONVERSATION_VERSION, context, answers, position: nextPosition(context, answers), startedAt: now, answerCount: 0 };
}

/** The first active step without an answer, or a terminal position. */
export function nextPosition(context: ConversationContext, answers: Answers): Position {
  for (const step of STEP_ORDER) {
    if (step === 'focus' && context.mode === 'contact' && answers.topic === 'support') return 'support';
    if (!isStepActive(step, context, answers)) continue;
    if (!isStepAnswered(step, answers)) return step;
  }
  return 'ready';
}

/** Active, answered steps before the current position: the visible transcript. */
export function transcriptSteps(state: ConversationState): StepId[] {
  const { context, answers, position } = state;
  const steps: StepId[] = [];
  for (const step of STEP_ORDER) {
    if (step === position) break;
    if (step === 'focus' && context.mode === 'contact' && answers.topic === 'support') break;
    if (isStepActive(step, context, answers) && isStepAnswered(step, answers)) steps.push(step);
  }
  return steps;
}

export interface AnswerInputs {
  name: string;
  email: string;
  email_confirm: 'use' | 'work';
  company: { value: string; inferred: boolean };
  role: { key: RoleKey; other?: string };
  locations: LocationBucket;
  topic: TopicKey;
  focus: { keys: readonly FocusKey[]; note?: string };
  message: string;
  pos: { choice: PosChoice; value?: string };
  country: { iso: string; inferred: boolean };
  brief: 'confirmed';
  phone: { skipped: true } | { skipped?: false; dialCode: string; number: string };
}

export type ValidationError =
  | 'nameShort'
  | 'nameInvalid'
  | 'emailInvalid'
  | 'companyRequired'
  | 'roleRequired'
  | 'focusRequired'
  | 'messageRequired'
  | 'posRequired'
  | 'countryRequired'
  | 'phoneInvalid'
  | 'notCurrent';

export type AnswerResult = { ok: true; state: ConversationState } | { ok: false; error: ValidationError };

const clip = (value: string, max = MAX_TEXT) => value.trim().replace(/\s+/g, ' ').slice(0, max);

/**
 * A name must not be an email address (ASCII or full-width at sign) or a
 * phone-style string of digits, which people paste into the first box.
 * `\p{Nd}` covers every script's decimal digits (Arabic-Indic, Devanagari,
 * Bengali, Thai, full-width...), so a number typed in local numerals is caught.
 */
export function isPlausibleName(name: string): boolean {
  if (/[@\uFF20]/.test(name)) return false;
  return !/^[\p{Nd}\s+().\-]+$/u.test(name);
}

/** Answers that appear in the brief; changing any of them asks for the brief again. */
const BRIEF_FIELDS: readonly (keyof Answers)[] = ['company', 'role', 'locations', 'topic', 'focus', 'note', 'message', 'pos', 'country'];

function applyAnswer<S extends StepId>(context: ConversationContext, prev: Answers, step: S, input: AnswerInputs[S]): Answers | ValidationError {
  const next: Answers = { ...prev };
  switch (step) {
    case 'name': {
      const name = clip(input as string);
      if (name && !isPlausibleName(name)) return 'nameInvalid';
      if (name.length < 2) return 'nameShort';
      next.name = name;
      break;
    }
    case 'email': {
      const email = (input as string).trim().toLowerCase();
      if (!isValidLeadEmail(email) || email.length > 254) return 'emailInvalid';
      if (email !== prev.email) {
        delete next.emailChoice;
        // An inferred company follows the email; a typed one is the visitor's own.
        if (prev.company?.inferred && companyFromEmail(email) !== prev.company.value) delete next.company;
      }
      next.email = email;
      next.emailIsFreeMail = isFreeMailEmail(email);
      break;
    }
    case 'email_confirm': {
      if (input === 'work') {
        delete next.email;
        delete next.emailChoice;
        delete next.emailIsFreeMail;
      } else {
        next.emailChoice = 'use';
      }
      break;
    }
    case 'company': {
      const { value, inferred } = input as AnswerInputs['company'];
      const company = clip(value);
      if (company.length < 1) return 'companyRequired';
      next.company = { value: company, inferred: !!inferred };
      break;
    }
    case 'role': {
      const { key, other } = input as AnswerInputs['role'];
      if (!(ROLE_KEYS as readonly string[]).includes(key)) return 'roleRequired';
      const label = key === 'other' ? clip(other ?? '') : ROLE_LABELS_EN[key];
      if (label.length < 2) return 'roleRequired';
      next.role = { key, label };
      break;
    }
    case 'locations': {
      if (!isLocationBucket(input)) return 'notCurrent';
      next.locations = { bucket: input as LocationBucket, inferred: false };
      break;
    }
    case 'topic': {
      const topic = input as TopicKey;
      if (!(TOPIC_KEYS as readonly string[]).includes(topic)) return 'notCurrent';
      if (topic !== prev.topic) {
        if (topic !== 'walkthrough') {
          delete next.focus;
          delete next.note;
        }
        if (topic === 'walkthrough' || topic === 'support') delete next.message;
      }
      next.topic = topic;
      break;
    }
    case 'focus': {
      const { keys, note } = input as AnswerInputs['focus'];
      const focus = [...new Set(keys.filter(isFocusKey))];
      if (!focus.length) return 'focusRequired';
      next.focus = focus;
      const trimmed = (note ?? '').trim().slice(0, MAX_NOTE);
      if (trimmed) next.note = trimmed;
      else delete next.note;
      break;
    }
    case 'message': {
      const message = (input as string).trim().slice(0, MAX_NOTE);
      if (message.length < 2) return 'messageRequired';
      next.message = message;
      break;
    }
    case 'pos': {
      const { choice, value } = input as AnswerInputs['pos'];
      if (choice === 'not_sure') next.pos = { choice, value: POS_NOT_SURE };
      else {
        const pos = clip(value ?? '');
        if (pos.length < 1) return 'posRequired';
        next.pos = { choice: choice === 'listed' ? 'listed' : 'other', value: pos };
      }
      break;
    }
    case 'country': {
      const { iso, inferred } = input as AnswerInputs['country'];
      const country = findCountryByIso(iso);
      if (!country) return 'countryRequired';
      next.country = { iso: country.iso, name: country.name, dialCode: country.code, inferred: !!inferred && country.iso === context.suggestedCountryIso };
      break;
    }
    case 'brief':
      next.brief = 'confirmed';
      break;
    case 'phone': {
      const phone = input as AnswerInputs['phone'];
      if (phone.skipped) next.phone = { skipped: true, value: '' };
      else {
        const full = composeFullPhone(phone.dialCode, phone.number);
        if (!full || !isValidLeadPhone(full)) return 'phoneInvalid';
        next.phone = { skipped: false, value: normalizePhoneForStorage(full) };
      }
      break;
    }
  }
  if (step !== 'brief' && step !== 'phone' && prev.brief && BRIEF_FIELDS.some((field) => JSON.stringify(prev[field]) !== JSON.stringify(next[field]))) {
    delete next.brief;
  }
  return next;
}

export function answer<S extends StepId>(state: ConversationState, step: S, input: AnswerInputs[S]): AnswerResult {
  if (state.position !== step) return { ok: false, error: 'notCurrent' };
  const result = applyAnswer(state.context, state.answers, step, input);
  if (typeof result === 'string') return { ok: false, error: result };
  return {
    ok: true,
    state: { ...state, answers: result, position: nextPosition(state.context, result), answerCount: state.answerCount + 1 },
  };
}

/** The active step before the current position, if any. */
export function previousStep(state: ConversationState): StepId | null {
  const steps = transcriptSteps(state);
  return steps.at(-1) ?? null;
}

/** Rewind one step. Answers are kept so the control is prefilled. */
export function back(state: ConversationState): ConversationState {
  const previous = previousStep(state);
  if (!previous) return state;
  return { ...state, position: previous };
}

/**
 * Rewind to an answered step. Later answers stay where still valid; once the
 * edited step is answered the conversation resumes at the first gap, and the
 * brief is shown again for confirmation.
 */
export function edit(state: ConversationState, step: StepId): ConversationState {
  const target: StepId = step === 'email_confirm' ? 'email' : step;
  if (!isStepActive(target, state.context, state.answers)) return state;
  const answers = { ...state.answers };
  delete answers.brief;
  return { ...state, answers, position: target };
}

// ── Brief and payload ──────────────────────────────────────────────────

export interface BriefItem {
  key: FocusKey;
  layer: FocusLayer;
  line: string;
}

export interface WalkthroughBrief {
  kind: 'walkthrough' | 'contact';
  company: string;
  locations: string;
  role: string;
  agenda: BriefItem[];
  notes: string[];
  pos: string;
  country: string;
  topic?: string;
  message?: string;
}

/** English brief, stored in `metadata.convo.brief` for the sales team. */
export function buildBrief(state: ConversationState): WalkthroughBrief {
  const { answers } = state;
  const order = orderFocusForAgenda(answers.focus ?? []);
  const isContactTopic = state.context.mode === 'contact' && answers.topic !== 'walkthrough';
  return {
    kind: isContactTopic ? 'contact' : 'walkthrough',
    company: answers.company?.value ?? '',
    locations: answers.locations?.bucket ?? '',
    role: answers.role?.label ?? '',
    agenda: order.map((key) => ({ key, layer: FOCUS_FACTS[key].layer, line: FOCUS_FACTS[key].agenda })),
    notes: order.flatMap((key) => (FOCUS_FACTS[key].note ? [FOCUS_FACTS[key].note as string] : [])),
    pos: answers.pos?.value ?? '',
    country: answers.country?.name ?? '',
    ...(state.context.mode === 'contact' && answers.topic ? { topic: TOPIC_LABELS_EN[answers.topic] } : {}),
    ...(isContactTopic && answers.message ? { message: answers.message } : {}),
  };
}

function contextLabel(context: ConversationContext): string {
  if (context.kind === 'workflow') return `workflow: ${context.workflowKey}`;
  if (context.kind === 'pricing') return 'pricing estimate';
  return context.mode === 'contact' ? 'contact' : 'default';
}

/** The `message` the route requires, composed so the visitor never has to write one. */
export function composeMessage(state: ConversationState, pricingIntent?: PricingIntent | null): string {
  const { answers, context } = state;
  const source = `Source: guided booking (${contextLabel(context)}).`;
  let message: string;
  if (context.mode === 'contact' && answers.topic && answers.topic !== 'walkthrough') {
    message = `${answers.message ?? ''}\n\nTopic: ${TOPIC_LABELS_EN[answers.topic]}. ${source}`;
  } else {
    const focus = orderFocusForAgenda(answers.focus ?? []).map((key) => FOCUS_FACTS[key].label).join(', ');
    message = `Walkthrough focus: ${focus}. ${source}`;
    if (answers.note) message += `\n\n${answers.note}`;
  }
  // Same suffix the classic form appends, so sales sees the priced selection either way.
  if (pricingIntent) message += `\n\nPricing selection (recheck pricing and eligibility before activation): ${JSON.stringify(pricingIntent)}`;
  return message;
}

export interface PayloadEnvironment {
  ctaLabel: string;
  sourcePage: string;
  locale: string;
  now?: number;
  pricingIntent?: PricingIntent | null;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface ConvoMetadata {
  version: typeof CONVERSATION_VERSION;
  mode: ConversationMode;
  context: ConversationContext['kind'];
  workflowKey?: string;
  focus: FocusKey[];
  roleKey?: RoleKey;
  topic?: TopicKey;
  posChoice?: PosChoice;
  inferred: { company: boolean; locations: boolean; country: boolean };
  brief: WalkthroughBrief;
  steps: number;
  durationMs: number;
}

export interface GuidedLeadPayload {
  name: string;
  email: string;
  company: string;
  role: string;
  country: string;
  countryCode: string;
  phone: string;
  numberOfLocations: string;
  primaryPOS: string;
  message: string;
  ctaLabel: string;
  sourcePage: string;
  source: typeof GUIDED_BOOKING_SOURCE;
  locale: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  metadata: { convo: ConvoMetadata };
}

export function isReadyToSubmit(state: ConversationState): boolean {
  return state.position === 'ready';
}

export function toPayload(state: ConversationState, env: PayloadEnvironment): GuidedLeadPayload {
  const { answers, context } = state;
  const focus = orderFocusForAgenda(answers.focus ?? []);
  const steps = STEP_ORDER.filter((step) => isStepActive(step, context, answers) && isStepAnswered(step, answers)).length;
  return {
    name: answers.name ?? '',
    email: answers.email ?? '',
    company: answers.company?.value ?? '',
    role: answers.role?.label ?? '',
    country: answers.country?.name ?? '',
    countryCode: answers.country?.dialCode ?? '',
    phone: answers.phone?.value ?? '',
    numberOfLocations: answers.locations?.bucket ?? '',
    primaryPOS: answers.pos?.value ?? '',
    message: composeMessage(state, env.pricingIntent),
    ctaLabel: env.ctaLabel,
    sourcePage: env.sourcePage,
    source: GUIDED_BOOKING_SOURCE,
    locale: env.locale,
    ...(env.utmSource ? { utmSource: env.utmSource } : {}),
    ...(env.utmMedium ? { utmMedium: env.utmMedium } : {}),
    ...(env.utmCampaign ? { utmCampaign: env.utmCampaign } : {}),
    metadata: {
      convo: {
        version: CONVERSATION_VERSION,
        mode: context.mode,
        context: context.kind,
        ...(context.workflowKey ? { workflowKey: context.workflowKey } : {}),
        focus,
        ...(answers.role ? { roleKey: answers.role.key } : {}),
        ...(context.mode === 'contact' && answers.topic ? { topic: answers.topic } : {}),
        ...(answers.pos ? { posChoice: answers.pos.choice } : {}),
        inferred: {
          company: !!answers.company?.inferred,
          locations: !!answers.locations?.inferred,
          country: !!answers.country?.inferred,
        },
        brief: buildBrief(state),
        steps,
        durationMs: Math.max(0, (env.now ?? Date.now()) - state.startedAt),
      },
    },
  };
}

/** Values for the classic form when the visitor switches part-way through. */
export function toClassicValues(state: ConversationState, composedMessage?: string) {
  const { answers } = state;
  const dialCode = answers.country?.dialCode;
  const phone = answers.phone?.value ?? '';
  return {
    name: answers.name ?? '',
    email: answers.email ?? '',
    company: answers.company?.value ?? '',
    role: answers.role?.label ?? '',
    country: answers.country?.name ?? '',
    ...(dialCode ? { countryCode: dialCode } : {}),
    // The classic form shows the national part beside a dial-code select.
    phone: dialCode && phone.startsWith(dialCode.replace(/-/g, '')) ? phone.slice(dialCode.replace(/-/g, '').length) : phone,
    numberOfLocations: answers.locations?.bucket ?? '',
    primaryPOS: answers.pos?.value ?? '',
    ...(composedMessage ? { message: composedMessage } : {}),
  };
}

// ── Refresh-resume (sessionStorage) ───────────────────────────────────

export function storageKey(mode: ConversationMode): string {
  return `sundae_convo_${mode}_v1`;
}

interface StoredConversation {
  v: typeof CONVERSATION_VERSION;
  sig: string;
  startedAt: number;
  answerCount: number;
  answers: Answers;
}

/** Answers only - no tokens or idempotency keys are ever stored. */
export function serialize(state: ConversationState): string {
  const stored: StoredConversation = {
    v: CONVERSATION_VERSION,
    sig: contextSignature(state.context),
    startedAt: state.startedAt,
    answerCount: state.answerCount,
    answers: state.answers,
  };
  return JSON.stringify(stored);
}

const isRecord = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const str = (value: unknown) => (typeof value === 'string' ? value : undefined);

/**
 * Rebuild a stored conversation for the same entry context. Every field is
 * re-validated through the same rules as a live answer; anything unexpected
 * is dropped rather than trusted.
 */
export function restore(raw: string | null, context: ConversationContext): ConversationState | null {
  if (!raw) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!isRecord(parsed) || parsed.v !== CONVERSATION_VERSION || parsed.sig !== contextSignature(context) || !isRecord(parsed.answers)) return null;
  if (!CONVERSATION_MODES.includes(context.mode)) return null;
  const a = parsed.answers;
  let answers: Answers = initialAnswers(context);
  const tryApply = <S extends StepId>(step: S, input: AnswerInputs[S] | undefined) => {
    if (input === undefined) return;
    const result = applyAnswer(context, answers, step, input);
    if (typeof result !== 'string') answers = result;
  };
  tryApply('name', str(a.name));
  tryApply('email', str(a.email));
  if (a.emailChoice === 'use') tryApply('email_confirm', 'use');
  if (isRecord(a.company) && str(a.company.value)) tryApply('company', { value: str(a.company.value) as string, inferred: a.company.inferred === true });
  if (isRecord(a.role) && str(a.role.key)) {
    const key = a.role.key as RoleKey;
    tryApply('role', { key, other: key === 'other' ? str(a.role.label) : undefined });
  }
  if (isRecord(a.locations) && !answers.locations && isLocationBucket(a.locations.bucket)) tryApply('locations', a.locations.bucket);
  if (str(a.topic)) tryApply('topic', a.topic as TopicKey);
  if (Array.isArray(a.focus)) tryApply('focus', { keys: a.focus.filter(isFocusKey), note: str(a.note) });
  if (str(a.message)) tryApply('message', a.message as string);
  if (isRecord(a.pos) && (a.pos.choice === 'listed' || a.pos.choice === 'other' || a.pos.choice === 'not_sure')) {
    tryApply('pos', { choice: a.pos.choice, value: str(a.pos.value) });
  }
  if (isRecord(a.country) && str(a.country.iso)) tryApply('country', { iso: a.country.iso as string, inferred: a.country.inferred === true });
  if (isRecord(a.phone)) {
    if (a.phone.skipped === true) tryApply('phone', { skipped: true });
    else if (str(a.phone.value)) tryApply('phone', { dialCode: '', number: a.phone.value as string });
  }
  // The brief is always confirmed again after a refresh.
  delete answers.brief;
  const startedAt = typeof parsed.startedAt === 'number' && Number.isFinite(parsed.startedAt) ? parsed.startedAt : Date.now();
  const answerCount = typeof parsed.answerCount === 'number' && parsed.answerCount >= 0 ? Math.floor(parsed.answerCount) : 0;
  return { version: CONVERSATION_VERSION, context, answers, position: nextPosition(context, answers), startedAt, answerCount };
}

export { LOCATION_BUCKETS };
