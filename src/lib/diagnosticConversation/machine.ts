/**
 * Guided Operations Diagnostic: a small, pure state machine over Phase A's
 * question bank (`src/lib/diagnostic/questions.ts`). It holds no second copy
 * of the questions: turns, options, `showWhen` branching, parts and
 * validation all come from the bank and `flowLogic.ts`.
 *
 * - One turn per bank question, except the contact question, which the
 *   conversation asks as two turns: the email, then the company confirm.
 * - `answer`, `skip`, `back` and `edit` return a new state; nothing here
 *   touches React, storage or the network.
 * - Answers use the same `DiagnosticResponses` shape as the step-by-step
 *   form, so "Use the classic form" carries them over both ways.
 *
 * Spec: docs/diagnostic-overhaul/SPEC-diagnostic-overhaul.md, sections 3 and 6.2.
 */

import { companyFromEmail, isFreeMailEmail } from '../freeMail.ts';
import { isPlausibleName } from '../leadConversation/machine.ts';
import {
  canAdvanceDiagnosticQuestion,
  diagnosticOtherKey,
  isValidEmail,
  pruneHiddenAnswers,
  visibleQuestions,
} from '../diagnostic/flowLogic.ts';
import {
  COUNTRY_CODE_SET,
  DIAGNOSTIC_PARTS,
  QUESTION_BANK_VERSION,
  QUESTIONS_BY_ID,
  type DiagnosticPart,
  type DiagnosticResponses,
  type Question,
} from '../diagnostic/questions.ts';
import { parseLocationCount } from '../diagnostic/rules.ts';
import { withoutContactDetails } from '../diagnostic/sanitize.ts';
import { DIAGNOSTIC_CONVO_STORAGE_KEY, GUIDED_DIAGNOSTIC_SOURCE } from './session.ts';

export const DIAGNOSTIC_CONVO_VERSION = 1;
export { GUIDED_DIAGNOSTIC_SOURCE };
const MAX_NAME = 80;
const MAX_COMPANY = 120;
const MAX_OTHER = 120;
const MAX_EMAIL = 254;

/** Bank question ids, plus the two halves of the contact question. */
export type TurnId = string;
export type Position = TurnId | 'complete';

export interface Turn {
  id: TurnId;
  /** The bank question this turn renders (the contact question for email and company). */
  question: Question;
  part: DiagnosticPart;
  /** The turn number in the spec's script (3.2); email and company share 14. */
  number: number;
  optional: boolean;
}

/** Spec 3.2 numbering by bank id. */
const TURN_NUMBERS: Record<string, number> = {
  name: 1,
  concepts: 2,
  locations: 3,
  countries: 4,
  team_size: 5,
  paper_processes: 6,
  payroll_countries: 7,
  team_costs: 8,
  money_leaks: 9,
  measure_fix: 10,
  pos: 11,
  other_systems: 12,
  priority: 13,
  email: 14,
  company: 14,
  role: 15,
};

function turnsForQuestion(question: Question, index: number): Turn[] {
  const base = { question, part: question.part, optional: !!question.optional };
  if (question.kind === 'contact') {
    return [
      { ...base, id: 'email', number: TURN_NUMBERS.email },
      { ...base, id: 'company', number: TURN_NUMBERS.company },
    ];
  }
  return [{ ...base, id: question.id, number: TURN_NUMBERS[question.id] ?? index + 1 }];
}

/** The turns this visitor is asked, in order, given the answers so far. */
export function visibleTurns(responses: DiagnosticResponses): Turn[] {
  return visibleQuestions(responses).flatMap(turnsForQuestion);
}

/** Every turn the bank can ask, in order (for validation and resume). */
export const ALL_TURN_IDS: readonly TurnId[] = Object.values(QUESTIONS_BY_ID).flatMap(turnsForQuestion).map((turn) => turn.id);

export function turnById(id: TurnId, responses: DiagnosticResponses = {}): Turn | null {
  const visible = visibleTurns(responses).find((turn) => turn.id === id);
  if (visible) return visible;
  const question = QUESTIONS_BY_ID[id === 'email' || id === 'company' ? 'contact' : id];
  return question ? turnsForQuestion(question, 0).find((turn) => turn.id === id) ?? null : null;
}

/** The bank question id behind a turn (for the classic form's resume point). */
export function questionIdForTurn(id: TurnId): string {
  return id === 'email' || id === 'company' ? 'contact' : id;
}

export interface DiagnosticConversationState {
  version: typeof DIAGNOSTIC_CONVO_VERSION;
  responses: DiagnosticResponses;
  position: Position;
  /** Optional turns the visitor skipped. */
  skipped: TurnId[];
  /** Whether a preselected guess was accepted unchanged. */
  inferred: { company: boolean; countries: boolean };
  startedAt: number;
  /** Accepted answers, including re-answers after Edit and Back. */
  answerCount: number;
}

export interface ConversationContext {
  /** ISO code from `x-vercel-ip-country`, when known. */
  suggestedCountry?: string | null;
}

const list = (value: string | string[] | undefined): string[] => (Array.isArray(value) ? value : value ? [value] : []);

/** Whether a turn holds a usable answer (or was skipped, when optional). */
export function isTurnAnswered(turn: Turn, state: Pick<DiagnosticConversationState, 'responses' | 'skipped'>): boolean {
  const { responses } = state;
  switch (turn.id) {
    case 'name': {
      const name = String(responses.name ?? '').trim();
      return name.length >= 2 && isPlausibleName(name);
    }
    case 'email':
      return isValidEmail(String(responses.email ?? ''));
    case 'company':
      return String(responses.company ?? '').trim().length > 0;
    default:
      if (turn.optional && state.skipped.includes(turn.id)) return true;
      return canAdvanceDiagnosticQuestion({ ...turn.question, optional: false }, responses);
  }
}

/** The first visible turn without an answer, or `complete`. */
export function nextPosition(state: Pick<DiagnosticConversationState, 'responses' | 'skipped'>): Position {
  for (const turn of visibleTurns(state.responses)) {
    if (!isTurnAnswered(turn, state)) return turn.id;
  }
  return 'complete';
}

export function start(now = Date.now()): DiagnosticConversationState {
  return {
    version: DIAGNOSTIC_CONVO_VERSION,
    responses: {},
    position: 'name',
    skipped: [],
    inferred: { company: false, countries: false },
    startedAt: now,
    answerCount: 0,
  };
}

/** Answered (or skipped) turns before the current position: the visible transcript. */
export function transcriptTurns(state: DiagnosticConversationState): Turn[] {
  const turns: Turn[] = [];
  for (const turn of visibleTurns(state.responses)) {
    if (turn.id === state.position) break;
    if (isTurnAnswered(turn, state)) turns.push(turn);
  }
  return turns;
}

export function currentTurn(state: DiagnosticConversationState): Turn | null {
  return state.position === 'complete' ? null : turnById(state.position, state.responses);
}

// ── Answers ────────────────────────────────────────────────────────────

export type TurnInput =
  | { kind: 'text'; value: string }
  | { kind: 'choices'; values: readonly string[]; other?: string }
  | { kind: 'company'; value: string; inferred: boolean };

export type ValidationError =
  | 'nameShort'
  | 'nameInvalid'
  | 'numberInvalid'
  | 'emailInvalid'
  | 'companyRequired'
  | 'choiceRequired'
  | 'otherRequired'
  | 'textRequired'
  | 'notCurrent';

export type AnswerResult = { ok: true; state: DiagnosticConversationState } | { ok: false; error: ValidationError };

const clip = (value: string, max: number) => value.trim().replace(/\s+/g, ' ').slice(0, max);

function validChoices(question: Question, values: readonly string[]): string[] | null {
  const allowed = new Set((question.options ?? []).map((option) => option.value));
  const exclusive = new Set((question.options ?? []).filter((option) => option.exclusive).map((option) => option.value));
  const picked = [...new Set(values)].filter((value) => allowed.has(value));
  if (picked.length !== new Set(values).size) return null;
  // An exclusive option ("None", "Not sure") stands alone.
  const lone = picked.find((value) => exclusive.has(value));
  return lone ? [lone] : picked;
}

/**
 * Applies one turn's answer to the responses. Returns the new responses or
 * a validation error. Shared by live answers and by resume, so a restored
 * answer passes exactly the rules a typed one does.
 */
function applyTurn(responses: DiagnosticResponses, turn: Turn, input: TurnInput): DiagnosticResponses | ValidationError {
  const next: DiagnosticResponses = { ...responses };
  const { question } = turn;
  switch (turn.id) {
    case 'name': {
      if (input.kind !== 'text') return 'notCurrent';
      const name = clip(input.value, MAX_NAME);
      if (name && !isPlausibleName(name)) return 'nameInvalid';
      if (name.length < 2) return 'nameShort';
      next.name = name;
      return next;
    }
    case 'email': {
      if (input.kind !== 'text') return 'notCurrent';
      const email = input.value.trim().toLowerCase();
      if (!isValidEmail(email) || email.length > MAX_EMAIL) return 'emailInvalid';
      next.email = email;
      return next;
    }
    case 'company': {
      if (input.kind !== 'company') return 'notCurrent';
      const company = clip(input.value, MAX_COMPANY);
      if (!company) return 'companyRequired';
      next.company = company;
      return next;
    }
  }
  switch (question.kind) {
    case 'number': {
      if (input.kind !== 'text') return 'notCurrent';
      const count = parseLocationCount(input.value);
      if (count === null) return 'numberInvalid';
      next[question.id] = String(count);
      return next;
    }
    case 'longtext': {
      if (input.kind !== 'text') return 'notCurrent';
      const text = input.value.trim().slice(0, question.maxLength ?? 280);
      if (text.length < 2) return 'textRequired';
      next[question.id] = text;
      return next;
    }
    case 'countries': {
      if (input.kind !== 'choices') return 'notCurrent';
      const codes = [...new Set(input.values)].filter((code) => COUNTRY_CODE_SET.has(code));
      if (!codes.length || codes.length !== new Set(input.values).size) return 'choiceRequired';
      next[question.id] = codes;
      return next;
    }
    case 'single': {
      if (input.kind !== 'choices') return 'notCurrent';
      const picked = validChoices(question, input.values);
      if (!picked || picked.length !== 1) return 'choiceRequired';
      next[question.id] = picked[0];
      return next;
    }
    case 'multi':
    case 'pos': {
      if (input.kind !== 'choices') return 'notCurrent';
      const picked = validChoices(question, input.values);
      if (!picked || !picked.length) return 'choiceRequired';
      next[question.id] = picked;
      const otherKey = diagnosticOtherKey(question.id);
      if (picked.includes('other')) {
        const detail = clip(input.other ?? '', MAX_OTHER);
        if (!detail) return 'otherRequired';
        next[otherKey] = detail;
      } else {
        delete next[otherKey];
      }
      return next;
    }
    default:
      return 'notCurrent';
  }
}

function withAnswer(state: DiagnosticConversationState, turn: Turn, responses: DiagnosticResponses, input: TurnInput, context: ConversationContext): DiagnosticConversationState {
  let next = pruneHiddenAnswers(responses);
  const inferred = { ...state.inferred };
  if (turn.id === 'email' && state.responses.email !== next.email && state.inferred.company) {
    // An inferred company follows the email; a typed one is the visitor's own.
    if (companyFromEmail(String(next.email)) !== state.responses.company) {
      next = { ...next };
      delete next.company;
      inferred.company = false;
    }
  }
  if (turn.id === 'company' && input.kind === 'company') {
    inferred.company = input.inferred && input.value.trim() === companyFromEmail(String(next.email ?? ''));
  }
  if (turn.id === 'countries') {
    const codes = list(next.countries);
    inferred.countries = !!context.suggestedCountry && codes.length === 1 && codes[0] === context.suggestedCountry;
  }
  const skipped = state.skipped.filter((id) => id !== turn.id && visibleTurns(next).some((visible) => visible.id === id));
  const base = { responses: next, skipped };
  return { ...state, ...base, inferred, position: nextPosition(base), answerCount: state.answerCount + 1 };
}

export function answer(state: DiagnosticConversationState, turnId: TurnId, input: TurnInput, context: ConversationContext = {}): AnswerResult {
  if (state.position !== turnId) return { ok: false, error: 'notCurrent' };
  const turn = turnById(turnId, state.responses);
  if (!turn) return { ok: false, error: 'notCurrent' };
  const result = applyTurn(state.responses, turn, input);
  if (typeof result === 'string') return { ok: false, error: result };
  return { ok: true, state: withAnswer(state, turn, result, input, context) };
}

/** Skip an optional turn ("Anything else running the operation?"). */
export function skip(state: DiagnosticConversationState, turnId: TurnId): AnswerResult {
  if (state.position !== turnId) return { ok: false, error: 'notCurrent' };
  const turn = turnById(turnId, state.responses);
  if (!turn?.optional) return { ok: false, error: 'notCurrent' };
  const responses = { ...state.responses };
  delete responses[turn.question.id];
  delete responses[diagnosticOtherKey(turn.question.id)];
  const skipped = [...state.skipped.filter((id) => id !== turnId), turnId];
  const base = { responses, skipped };
  return { ok: true, state: { ...state, ...base, position: nextPosition(base), answerCount: state.answerCount + 1 } };
}

/** The answered turn before the current position, if any. */
export function previousTurn(state: DiagnosticConversationState): Turn | null {
  return transcriptTurns(state).at(-1) ?? null;
}

/** Rewind one turn. Answers are kept so the control opens prefilled. */
export function back(state: DiagnosticConversationState): DiagnosticConversationState {
  const previous = previousTurn(state);
  return previous ? { ...state, position: previous.id } : state;
}

/**
 * Rewind to an answered turn. Later answers stay where they are still valid;
 * once the edited turn is answered the conversation resumes at the first gap
 * (a newly shown branch, such as payroll countries, is asked there).
 */
export function edit(state: DiagnosticConversationState, turnId: TurnId): DiagnosticConversationState {
  const turn = visibleTurns(state.responses).find((item) => item.id === turnId);
  if (!turn || !isTurnAnswered(turn, state)) return state;
  return { ...state, position: turnId };
}

// ── Progress ───────────────────────────────────────────────────────────

export const PROGRESS_SEGMENTS = DIAGNOSTIC_PARTS.length;

/** Index of the current part (0-4), or the segment count once complete. */
export function progressIndex(state: DiagnosticConversationState): number {
  const turn = currentTurn(state);
  return turn ? DIAGNOSTIC_PARTS.indexOf(turn.part) : PROGRESS_SEGMENTS;
}

// ── Completion, lead metadata and the classic form ─────────────────────

export interface DiagnosticConversationCompletion {
  responses: DiagnosticResponses;
  name: string;
  email: string;
  company: string;
  role: string;
}

/** The same shape the step-by-step form hands to the page on completion. */
export function toCompletion(state: DiagnosticConversationState): DiagnosticConversationCompletion {
  const { responses } = state;
  return {
    responses,
    name: String(responses.name ?? '').trim(),
    email: String(responses.email ?? '').trim(),
    company: String(responses.company ?? '').trim(),
    role: list(responses.role)[0] ?? 'other',
  };
}

export interface DiagnosticConvoMetadata {
  version: typeof DIAGNOSTIC_CONVO_VERSION;
  questionBankVersion: number;
  variant: 'guided';
  /** Answers by question id; never the name, email or company. */
  answers: DiagnosticResponses;
  turns: number;
  skipped: TurnId[];
  inferred: { company: boolean; countries: boolean };
  freeMail: boolean;
  durationMs: number;
}

/** `metadata.convo` for the lead. Its presence is what the backend reads. */
export function convoMetadata(state: DiagnosticConversationState, now = Date.now()): DiagnosticConvoMetadata {
  const turns = visibleTurns(state.responses).filter((turn) => isTurnAnswered(turn, state));
  return {
    version: DIAGNOSTIC_CONVO_VERSION,
    questionBankVersion: QUESTION_BANK_VERSION,
    variant: 'guided',
    answers: withoutContactDetails(state.responses),
    turns: new Set(turns.map((turn) => turn.number)).size,
    skipped: [...state.skipped],
    inferred: { ...state.inferred },
    freeMail: isFreeMailEmail(String(state.responses.email ?? '')),
    durationMs: Math.max(0, now - state.startedAt),
  };
}

/** Where the step-by-step form should open when the visitor switches. */
export function toClassicProgress(state: DiagnosticConversationState): { responses: DiagnosticResponses; questionId: string } {
  const position = state.position === 'complete' ? 'role' : state.position;
  return { responses: { ...state.responses }, questionId: questionIdForTurn(position) };
}

// ── Resume (sessionStorage) and the classic form's answers ─────────────

export const STORAGE_KEY = DIAGNOSTIC_CONVO_STORAGE_KEY;

interface StoredConversation {
  v: typeof DIAGNOSTIC_CONVO_VERSION;
  bank: number;
  startedAt: number;
  answerCount: number;
  responses: DiagnosticResponses;
  skipped: TurnId[];
  inferred: { company: boolean; countries: boolean };
}

/** Answers only: no tokens, idempotency keys or report content are stored. */
export function serialize(state: DiagnosticConversationState): string {
  const stored: StoredConversation = {
    v: DIAGNOSTIC_CONVO_VERSION,
    bank: QUESTION_BANK_VERSION,
    startedAt: state.startedAt,
    answerCount: state.answerCount,
    responses: state.responses,
    skipped: state.skipped,
    inferred: state.inferred,
  };
  return JSON.stringify(stored);
}

const isRecord = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);

function inputFromStored(turn: Turn, responses: Record<string, unknown>): TurnInput | null {
  const read = (key: string) => responses[key];
  const text = (value: unknown) => (typeof value === 'string' ? value : null);
  const strings = (value: unknown) => (Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : typeof value === 'string' ? [value] : null);
  switch (turn.id) {
    case 'name':
    case 'email': {
      const value = text(read(turn.id));
      return value === null ? null : { kind: 'text', value };
    }
    case 'company': {
      const value = text(read('company'));
      return value === null ? null : { kind: 'company', value, inferred: false };
    }
  }
  const id = turn.question.id;
  switch (turn.question.kind) {
    case 'number':
    case 'longtext': {
      const value = text(read(id));
      return value === null ? null : { kind: 'text', value };
    }
    default: {
      const values = strings(read(id));
      if (!values?.length) return null;
      const other = text(read(diagnosticOtherKey(id))) ?? undefined;
      return { kind: 'choices', values, other };
    }
  }
}

/**
 * Rebuild answers from any untrusted source (sessionStorage, or the classic
 * form's responses). Each answer is re-checked with the live rules in turn
 * order; anything that fails is dropped rather than trusted.
 */
export function rebuildResponses(raw: unknown): DiagnosticResponses {
  if (!isRecord(raw)) return {};
  let responses: DiagnosticResponses = {};
  for (const id of ALL_TURN_IDS) {
    const turn = turnById(id, responses);
    if (!turn) continue;
    const input = inputFromStored(turn, raw);
    if (!input) continue;
    const result = applyTurn(responses, turn, input);
    if (typeof result !== 'string') responses = result;
  }
  return pruneHiddenAnswers(responses);
}

export function restore(raw: string | null, context: ConversationContext = {}, now = Date.now()): DiagnosticConversationState | null {
  if (!raw) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!isRecord(parsed) || parsed.v !== DIAGNOSTIC_CONVO_VERSION || parsed.bank !== QUESTION_BANK_VERSION) return null;
  const responses = rebuildResponses(parsed.responses);
  const visibleIds = new Set(visibleTurns(responses).filter((turn) => turn.optional).map((turn) => turn.id));
  const skipped = Array.isArray(parsed.skipped)
    ? [...new Set(parsed.skipped.filter((id): id is string => typeof id === 'string' && visibleIds.has(id) && responses[id] === undefined))]
    : [];
  const storedInferred = isRecord(parsed.inferred) ? parsed.inferred : {};
  const inferred = {
    company: storedInferred.company === true && String(responses.company ?? '') === companyFromEmail(String(responses.email ?? '')),
    countries: storedInferred.countries === true && list(responses.countries).length === 1 && list(responses.countries)[0] === context.suggestedCountry,
  };
  const startedAt = typeof parsed.startedAt === 'number' && Number.isFinite(parsed.startedAt) && parsed.startedAt <= now ? parsed.startedAt : now;
  const answerCount = typeof parsed.answerCount === 'number' && parsed.answerCount >= 0 ? Math.floor(parsed.answerCount) : 0;
  const base = { responses, skipped };
  return { version: DIAGNOSTIC_CONVO_VERSION, ...base, inferred, position: nextPosition(base), startedAt, answerCount };
}

/**
 * Pick up the classic form's answers when the visitor switches back to the
 * conversation. Optional questions the form left blank before its current
 * question count as skipped, so the conversation resumes where the form was.
 */
export function fromClassic(
  responses: DiagnosticResponses,
  questionId: string | null,
  previous: DiagnosticConversationState | null,
  context: ConversationContext = {},
  now = Date.now(),
): DiagnosticConversationState {
  const rebuilt = rebuildResponses(responses);
  const turns = visibleTurns(rebuilt);
  const stopAt = questionId ? turns.findIndex((turn) => questionIdForTurn(turn.id) === questionId) : -1;
  const skipped = turns
    .filter((turn, index) => turn.optional && rebuilt[turn.question.id] === undefined && (stopAt === -1 || index < stopAt))
    .map((turn) => turn.id);
  const base = { responses: rebuilt, skipped };
  const inferred = {
    company: !!previous?.inferred.company && String(rebuilt.company ?? '') === String(previous.responses.company ?? ''),
    countries: !!context.suggestedCountry && list(rebuilt.countries).length === 1 && list(rebuilt.countries)[0] === context.suggestedCountry && !!previous?.inferred.countries,
  };
  return {
    version: DIAGNOSTIC_CONVO_VERSION,
    ...base,
    inferred,
    position: nextPosition(base),
    startedAt: previous?.startedAt ?? now,
    answerCount: previous?.answerCount ?? 0,
  };
}
