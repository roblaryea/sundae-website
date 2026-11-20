/**
 * Guided booking script: the ordered steps, the stable answer keys and the
 * rules that decide whether a step is asked. Every line the visitor sees is
 * pre-written in `copy.ts`; nothing here is generated at runtime.
 *
 * Pure module (no React) so the state machine can be unit tested.
 */

import type { LocationBucket } from '../leadFields.ts';
import type { FocusKey } from './packageNotes.ts';
import type { WorkflowKey } from './inference.ts';

export type ConversationMode = 'demo' | 'contact' | 'get-started';
export const CONVERSATION_MODES: readonly ConversationMode[] = ['demo', 'contact', 'get-started'];

export type ContextKind = 'pricing' | 'workflow' | 'default';

export const ROLE_KEYS = ['owner_ceo', 'operations', 'finance', 'hr_people', 'tech_data', 'other'] as const;
export type RoleKey = typeof ROLE_KEYS[number];

/** English labels are what `role` stores, whatever the visitor's language. */
export const ROLE_LABELS_EN: Record<RoleKey, string> = {
  owner_ceo: 'Owner or CEO',
  operations: 'Operations',
  finance: 'Finance',
  hr_people: 'HR and people',
  tech_data: 'Tech and data',
  other: 'Other',
};

/** `contact` mode: "What's this about?" */
export const TOPIC_KEYS = ['walkthrough', 'pricing', 'partnership', 'other', 'support'] as const;
export type TopicKey = typeof TOPIC_KEYS[number];

export const TOPIC_LABELS_EN: Record<TopicKey, string> = {
  walkthrough: 'Book a walkthrough',
  pricing: 'A pricing question',
  partnership: 'Partnership',
  other: 'Something else',
  support: 'Help with Sundae I already use',
};

export type PosChoice = 'listed' | 'other' | 'not_sure';

/** Stored verbatim when the visitor is unsure (spec 3.3 step 7). */
export const POS_NOT_SURE = 'Not sure';

export type StepId =
  | 'name'
  | 'email'
  | 'email_confirm'
  | 'company'
  | 'role'
  | 'locations'
  | 'topic'
  | 'focus'
  | 'message'
  | 'pos'
  | 'country'
  | 'brief'
  | 'phone';

/** Terminal positions after the last question. */
export type TerminalPosition = 'ready' | 'support';
export type Position = StepId | TerminalPosition;

export const STEP_ORDER: readonly StepId[] = [
  'name',
  'email',
  'email_confirm',
  'company',
  'role',
  'locations',
  'topic',
  'focus',
  'message',
  'pos',
  'country',
  'brief',
  'phone',
];

export interface PricingContext {
  /** Product names as priced ("Core Growth + Crew Pay"); never translated. */
  packageLabel: string;
  locations: number;
  bucket: LocationBucket | null;
  layer: 'core' | 'crew' | 'both';
}

export interface ConversationContext {
  mode: ConversationMode;
  kind: ContextKind;
  workflowKey?: WorkflowKey;
  pricing?: PricingContext;
  /** ISO 3166-1 alpha-2 from `x-vercel-ip-country`, validated. */
  suggestedCountryIso?: string;
  /** Focus preselected from the page context. */
  preselectedFocus: FocusKey[];
}

export interface Answers {
  name?: string;
  email?: string;
  /** Derived when the email is stored; drives the personal-address prompt. */
  emailIsFreeMail?: boolean;
  /** Free-mail confirmation: only 'use' is ever stored ('work' re-asks email). */
  emailChoice?: 'use';
  company?: { value: string; inferred: boolean };
  role?: { key: RoleKey; label: string };
  locations?: { bucket: LocationBucket; inferred: boolean };
  topic?: TopicKey;
  focus?: FocusKey[];
  /** Optional "Anything else?" on the focus step. */
  note?: string;
  /** `contact` mode message for non-walkthrough topics. */
  message?: string;
  pos?: { choice: PosChoice; value: string };
  country?: { iso: string; name: string; dialCode: string; inferred: boolean };
  brief?: 'confirmed';
  phone?: { skipped: boolean; value: string };
}

/** Steps shown in the 8-segment progress line, in order. */
export const PROGRESS_SEGMENTS = 8;

const PROGRESS_INDEX: Record<StepId, number> = {
  name: 0,
  email: 1,
  email_confirm: 1,
  company: 2,
  role: 3,
  locations: 4,
  topic: 5,
  focus: 5,
  message: 5,
  pos: 6,
  country: 7,
  brief: 7,
  phone: 7,
};

/** Zero-based progress segment for a position; terminal positions are complete. */
export function progressIndex(position: Position): number {
  if (position === 'ready' || position === 'support') return PROGRESS_SEGMENTS;
  return PROGRESS_INDEX[position];
}

/** Whether a step is part of this conversation at all, given the answers so far. */
export function isStepActive(step: StepId, context: ConversationContext, answers: Answers): boolean {
  const contact = context.mode === 'contact';
  switch (step) {
    case 'email_confirm':
      return answers.email !== undefined && answers.emailIsFreeMail === true;
    case 'locations':
      return !context.pricing?.bucket;
    case 'topic':
      return contact;
    case 'focus':
      return !contact || answers.topic === 'walkthrough';
    case 'message':
      return contact && answers.topic !== undefined && answers.topic !== 'walkthrough' && answers.topic !== 'support';
    default:
      return true;
  }
}

/** Whether an active step already holds a usable answer. */
export function isStepAnswered(step: StepId, answers: Answers): boolean {
  switch (step) {
    case 'name': return !!answers.name;
    case 'email': return !!answers.email;
    case 'email_confirm': return answers.emailChoice === 'use';
    case 'company': return !!answers.company;
    case 'role': return !!answers.role;
    case 'locations': return !!answers.locations;
    case 'topic': return !!answers.topic;
    case 'focus': return !!answers.focus?.length;
    case 'message': return !!answers.message;
    case 'pos': return !!answers.pos;
    case 'country': return !!answers.country;
    case 'brief': return answers.brief === 'confirmed';
    case 'phone': return !!answers.phone;
  }
}
