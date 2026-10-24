'use client';

/**
 * The host's approval page for a "request this time" submission. The signed token in the URL is the
 * credential (no login); this page only SHOWS the request, and each decision is a deliberate click
 * that POSTs through the same-origin proxy. Nothing has been sent to the visitor until Approve.
 */
import { useEffect, useState, type ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { getBookingUiCopy } from '@/lib/booking/ui-copy';
import { bookingIntlLocale, getBookingLocaleProfile, type BookingLocale } from '@/lib/booking/locales';
import { formatBookingDate } from '@/lib/booking/date-format';
import {
  classifyDecisionResponse,
  fillTemplate,
  readRequestStatus,
  splitAtToken,
  type AlternativeSlot,
  type DecisionOutcome,
} from '@/lib/booking/verification';
import type { PersonalBookingRequestDetails } from '@/lib/personalBookingClient';
import { BookingBrand } from '../BookingBrand';

const primary = 'inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 bg-[var(--warm-deep)] text-white text-sm font-bold transition-colors hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-warm)] disabled:opacity-60';
const secondary = 'inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 border border-[var(--border-emphasis)] text-[var(--text-primary)] text-sm font-semibold transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-warm)] disabled:opacity-60';

export function RequestDecision({ id, token, locale, intent, details, unavailable }: {
  id: string;
  token: string;
  locale: BookingLocale;
  intent: 'approve' | 'decline';
  details: PersonalBookingRequestDetails | null;
  unavailable: boolean;
}) {
  const copy = getBookingUiCopy(locale);
  const dir = getBookingLocaleProfile(locale).dir;
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);
  const status = readRequestStatus(details?.status);
  const [busy, setBusy] = useState<'approve' | 'decline' | string | null>(null);
  const [outcome, setOutcome] = useState<DecisionOutcome | null>(null);

  const when = (iso: string, fallback: string, timeZone?: string) => {
    try {
      return formatBookingDate(new Date(iso), locale === 'pap' ? 'pap' : bookingIntlLocale(locale), {
        weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short', timeZone: timeZone || undefined,
      });
    } catch { return fallback; }
  };

  const decide = async (action: 'approve' | 'decline', slotStart?: string) => {
    setBusy(slotStart ?? action);
    try {
      const response = await fetch(`/api/personal-book/requests/${id}/${action}`, {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token, ...(slotStart ? { slotStart } : {}) }),
      });
      setOutcome(classifyDecisionResponse(response.status, await response.json().catch(() => ({}))));
    } catch {
      setOutcome({ kind: 'error' });
    } finally {
      setBusy(null);
    }
  };

  const bdi = (template: string, token: string, value: string): ReactNode => {
    const [before, after] = splitAtToken(template, token);
    return <>{before}<bdi className="font-semibold">{value}</bdi>{after}</>;
  };
  const message = (text: string, tone: 'ok' | 'warn' = 'warn') => (
    <p role="status" className="flex items-start gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-subtle)] px-3.5 py-3 text-sm text-[var(--text-primary)]">
      {tone === 'ok' ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />}
      <span>{text}</span>
    </p>
  );

  let body: ReactNode;
  if (outcome?.kind === 'approved') body = message(fillTemplate(copy.reqApproved, { email: outcome.email }), 'ok');
  else if (outcome?.kind === 'declined') body = message(copy.reqDeclined, 'ok');
  else if (outcome?.kind === 'expired' || status === 'expired') body = message(copy.reqExpired);
  else if (outcome?.kind === 'used' || status === 'approved' || status === 'declined' || status === 'approving') body = message(copy.reqUsed);
  else if (outcome?.kind === 'invalid' || (!details && !unavailable)) body = message(copy.reqInvalid);
  else if (unavailable || !details?.visitor) body = message(copy.reqError);
  else {
    const visitor = details.visitor;
    const alternatives: AlternativeSlot[] = outcome?.kind === 'slot_taken' ? outcome.alternatives : [];
    body = (
      <div className="space-y-5">
        <p className="text-sm text-[var(--text-secondary)]">{bdi(copy.reqIntro, 'name', visitor.name)}</p>
        <dl className="grid gap-3 rounded-2xl border border-[var(--border-default)] bg-[var(--navy)] p-5 text-sm">
          <div><dt className="text-xs font-semibold uppercase tracking-wide text-[var(--text-supporting)]">{copy.reqLabelVisitor}</dt>
            <dd className="mt-1 text-[var(--text-primary)]"><bdi>{visitor.name}</bdi> · <bdi dir="ltr" className="break-all">{visitor.email}</bdi></dd></div>
          <div><dt className="text-xs font-semibold uppercase tracking-wide text-[var(--text-supporting)]">{copy.reqLabelWhen}</dt>
            <dd className="mt-1 text-[var(--text-primary)]">{details.slot ? when(details.slot.startUtc, details.slot.label, details.timezone) : ''}
              {details.durationMinutes ? <> · {copy.waitMinutes.replace('{n}', String(details.durationMinutes))}</> : null}
              {details.eventTypeName ? <> · <bdi>{details.eventTypeName}</bdi></> : null}</dd></div>
          {details.discussion ? <div><dt className="text-xs font-semibold uppercase tracking-wide text-[var(--text-supporting)]">{copy.reqLabelNote}</dt>
            <dd className="mt-1 whitespace-pre-line break-words text-[var(--text-primary)]"><bdi>{details.discussion}</bdi></dd></div> : null}
        </dl>
        {outcome?.kind === 'slot_taken' && (
          <div className="space-y-3">
            {message(copy.reqSlotTaken)}
            {alternatives.length === 0 ? <p className="text-sm text-[var(--text-secondary)]">{copy.reqNoAlternatives}</p> : (
              <div className="flex flex-wrap gap-2">
                {alternatives.map((alt) => (
                  <button key={alt.startUtc} type="button" disabled={busy !== null} onClick={() => void decide('approve', alt.startUtc)} className={secondary}>
                    {busy === alt.startUtc && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                    {fillTemplate(copy.reqApproveAt, { time: when(alt.startUtc, alt.label, details.timezone) })}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {outcome?.kind === 'already_booked' && message(copy.reqAlreadyBooked)}
        {outcome?.kind === 'error' && message(copy.reqError)}
        <div className="flex flex-wrap gap-3">
          {outcome?.kind !== 'slot_taken' && (
            <button type="button" autoFocus={intent === 'approve'} disabled={busy !== null} onClick={() => void decide('approve')} className={primary}>
              {busy === 'approve' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}{copy.reqApprove}
            </button>
          )}
          <button type="button" autoFocus={intent === 'decline'} disabled={busy !== null} onClick={() => void decide('decline')} className={secondary}>
            {busy === 'decline' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}{copy.reqDecline}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div lang={locale} dir={dir} className="min-h-screen bg-[var(--navy-deep)] text-[var(--text-primary)] px-6 py-12">
      <main className="mx-auto max-w-xl space-y-6">
        <BookingBrand />
        <h1 className="font-display text-3xl text-[var(--text-display)]">{copy.reqTitle}</h1>
        {body}
      </main>
    </div>
  );
}
