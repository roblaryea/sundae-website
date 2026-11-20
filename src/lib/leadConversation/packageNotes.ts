/**
 * Walkthrough focus areas and the package facts attached to them.
 *
 * One shared source so the guided-booking brief, the admin lead view
 * (`metadata.convo.brief`) and any other page quoting these facts cannot
 * drift. Facts follow pricing catalogue v1.8.2 and the entitlement files as
 * approved in the conversational walkthrough booking spec (section 3.4).
 *
 * English text here is the canonical, stored form. Visitors see the
 * translation of the same key from `copy.ts`; `tests/guided-booking.test.mjs`
 * checks that every locale has exactly the notes listed here.
 */

export const FOCUS_KEYS = [
  'scheduling_attendance',
  'payroll',
  'tasks_logbook',
  'tips',
  'margin_performance',
  'forecasting',
  'competitors_market',
] as const;
export type FocusKey = typeof FOCUS_KEYS[number];

export type FocusLayer = 'crew' | 'core';

export interface FocusFact {
  key: FocusKey;
  layer: FocusLayer;
  /** Chip label (English, stored in metadata only). */
  label: string;
  /** Agenda line in the walkthrough brief. */
  agenda: string;
  /** Package note shown only when this focus is selected. */
  note?: string;
}

export const FOCUS_FACTS: Record<FocusKey, FocusFact> = {
  scheduling_attendance: {
    key: 'scheduling_attendance',
    layer: 'crew',
    label: 'Scheduling and attendance',
    agenda: "Build a week's schedule and approve hours",
  },
  payroll: {
    key: 'payroll',
    layer: 'crew',
    label: 'Payroll',
    agenda: 'Preview a pay cycle for your country',
    note: 'Payroll availability is confirmed for your country before setup.',
  },
  tasks_logbook: {
    key: 'tasks_logbook',
    layer: 'crew',
    label: 'Tasks and logbook',
    agenda: 'Opening checklist, shift logbook and handover',
    note: 'Tasks and the logbook are in Crew Operating and Crew Complete.',
  },
  tips: {
    key: 'tips',
    layer: 'crew',
    label: 'Tips',
    agenda: 'Tip rules through to payroll handoff',
    note: 'Tip workflows are in Crew Operating and Crew Complete, or with Crew Payroll.',
  },
  margin_performance: {
    key: 'margin_performance',
    layer: 'core',
    label: 'Margin and performance',
    agenda: 'A live shift, a margin leak, and the measured recovery',
  },
  forecasting: {
    key: 'forecasting',
    layer: 'core',
    label: 'Forecasting',
    agenda: 'The next 14 days and one what-if',
    note: 'Foresight is included in Core Performance and available with the other packages.',
  },
  competitors_market: {
    key: 'competitors_market',
    layer: 'core',
    label: 'Competitors and market',
    agenda: 'Competitor and local event signals',
    note: 'Watchtower is available with Core Growth and Core Performance.',
  },
};

/** Keys that carry a package note, in canonical order. */
export const FOCUS_KEYS_WITH_NOTES = FOCUS_KEYS.filter((key) => FOCUS_FACTS[key].note);

export function isFocusKey(value: unknown): value is FocusKey {
  return typeof value === 'string' && (FOCUS_KEYS as readonly string[]).includes(value);
}

/** Agenda order: Crew items first, then Core, each in canonical order. */
export function orderFocusForAgenda(keys: readonly FocusKey[]): FocusKey[] {
  const selected = new Set(keys);
  const ordered = FOCUS_KEYS.filter((key) => selected.has(key));
  return [
    ...ordered.filter((key) => FOCUS_FACTS[key].layer === 'crew'),
    ...ordered.filter((key) => FOCUS_FACTS[key].layer === 'core'),
  ];
}
