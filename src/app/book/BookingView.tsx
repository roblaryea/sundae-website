'use client';

/**
 * App-styled, token-gated booking surface. Renders as a self-contained
 * full-viewport screen (fixed inset-0) so it reads like an in-product Sundae
 * screen - independent of the marketing site's chrome/theme - mirroring the
 * diagnostic report shell (wordmark + coral dot, working light/dark, rounded-2xl
 * cards, coral CTAs).
 *
 * Flow: detect the visitor's time zone -> load live slots from the same-origin
 * route handlers -> confirm a slot -> confirmed state with join / add-to-calendar
 * / reschedule / cancel. An already-active booking short-circuits to a read-only
 * "you're booked" state (no management token in context, so we point back to the
 * confirmation email rather than fabricating one).
 */

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  CalendarClock,
  Clock,
  Video,
  CheckCircle2,
  ArrowUpRight,
  ArrowLeft,
  Sun,
  Moon,
  Loader2,
  AlertCircle,
  Download,
  X,
} from 'lucide-react';
import {
  websiteLocaleDirection,
  getWebsiteIntlLocale,
  type WebsiteLocale,
} from '@/lib/i18n';
import { bookingCopy, formatSlotLabel } from '@/lib/booking/copy';
import type { BookingContext, Slot, BookingDay, BookingSummary } from '@/lib/sundaeBookingClient';

// --- decouple from the parallel copy module's exact signatures ---------------
// bookingCopy may be a function (locale -> copy), a Record<locale, copy>, or a
// flat copy object; the formatters have documented arg shapes. Cast through
// unknown so this compiles regardless of the final exported types, and always
// fall back to good English if a key is missing.
const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object';

function resolveBookingCopy(locale: WebsiteLocale): Record<string, unknown> {
  const src: unknown = bookingCopy;
  try {
    if (typeof src === 'function') {
      const r = (src as (l: WebsiteLocale) => unknown)(locale);
      return isObj(r) ? r : {};
    }
    if (isObj(src)) {
      const byLocale = src[locale as keyof typeof src] ?? src.en;
      if (isObj(byLocale)) return byLocale;
      return src;
    }
  } catch {
    /* fall through to empty */
  }
  return {};
}

const fmtSlot = formatSlotLabel as unknown as (
  startUtc: string,
  tz: string,
  locale: string,
) => string;

function makeIdempotencyKey(): string {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
  } catch {
    /* ignore */
  }
  return `bk-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// --- local response shapes (same-origin route handlers) ----------------------
type SlotsResponse = {
  slots?: Slot[];
  days?: BookingDay[];
  visitorTimezone?: string;
  teamTimezone?: string;
  durationMinutes?: number;
  firstAvailableUtc?: string | null;
  graphDegraded?: boolean;
};

type BookResult = {
  booking?: BookingSummary;
  joinUrl?: string | null;
  manageToken?: string | null;
  ics?: string | null;
  error?: string;
};

type SlotsData = {
  days: BookingDay[];
  firstAvailableUtc: string | null;
  graphDegraded: boolean;
  teamTimezone: string | null;
  visitorTimezone: string | null;
  durationMinutes: number | null;
};

type ConfirmedBooking = {
  booking: BookingSummary;
  joinUrl: string | null;
  manageToken: string | null;
  ics: string | null;
};

type Mode = 'select' | 'reschedule' | 'confirmed' | 'existing' | 'canceled';
type ActionError = { tone: 'warn' | 'error'; text: string };

export function BookingView({
  token,
  locale,
  ctx,
}: {
  token: string;
  locale: WebsiteLocale;
  ctx: BookingContext;
}) {
  const dir = websiteLocaleDirection[locale] ?? 'ltr';
  const copy = useMemo(() => resolveBookingCopy(locale), [locale]);
  const t = useCallback(
    (key: string, fallback: string): string => {
      const v = copy[key];
      return typeof v === 'string' && v.length > 0 ? v : fallback;
    },
    [copy],
  );

  const initialActive =
    ctx.activeBooking && ctx.activeBooking.status !== 'canceled' ? ctx.activeBooking : null;

  const [dark, setDark] = useState(true);
  const [mode, setMode] = useState<Mode>(initialActive ? 'existing' : 'select');
  const [confirmed, setConfirmed] = useState<ConfirmedBooking | null>(null);

  const [visitorTz, setVisitorTz] = useState('');
  const [fromIso, setFromIso] = useState<string>(() => new Date().toISOString());
  const [slotsData, setSlotsData] = useState<SlotsData | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<'unavailable' | 'error' | null>(null);

  const [submittingSlot, setSubmittingSlot] = useState<string | null>(null);
  const [actionError, setActionError] = useState<ActionError | null>(null);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [canceling, setCanceling] = useState(false);

  const idempotencyKeyRef = useRef('');
  if (!idempotencyKeyRef.current) idempotencyKeyRef.current = makeIdempotencyKey();

  // Detect the visitor's time zone once on mount (client-only).
  useEffect(() => {
    try {
      setVisitorTz(Intl.DateTimeFormat().resolvedOptions().timeZone || '');
    } catch {
      setVisitorTz('');
    }
  }, []);

  const loadSlots = useCallback(
    async (from: string, tz: string) => {
      setSlotsLoading(true);
      setSlotsError(null);
      try {
        const params = new URLSearchParams({ token, tz, from });
        const res = await fetch(`/api/book/slots?${params.toString()}`, {
          headers: { accept: 'application/json' },
        });
        if (!res.ok) {
          setSlotsData(null);
          setSlotsError(res.status === 503 ? 'unavailable' : 'error');
          return;
        }
        const json = (await res.json().catch(() => ({}))) as SlotsResponse;
        setSlotsData({
          days: Array.isArray(json.days) ? json.days : [],
          firstAvailableUtc: json.firstAvailableUtc ?? null,
          graphDegraded: !!json.graphDegraded,
          teamTimezone: json.teamTimezone ?? ctx.teamTimezone ?? null,
          visitorTimezone: json.visitorTimezone ?? tz,
          durationMinutes: json.durationMinutes ?? ctx.durationMinutes ?? null,
        });
      } catch {
        setSlotsData(null);
        setSlotsError('error');
      } finally {
        setSlotsLoading(false);
      }
    },
    [token, ctx.teamTimezone, ctx.durationMinutes],
  );

  // Load slots on mount + whenever the visitor tz, window start, or slot-picking
  // mode changes. Confirmed / existing / canceled states never fetch.
  useEffect(() => {
    if (mode !== 'select' && mode !== 'reschedule') return;
    if (!visitorTz) return;
    void loadSlots(fromIso, visitorTz);
  }, [mode, visitorTz, fromIso, loadSlots]);

  const handleBookingError = useCallback(
    (status: number, code: string | undefined) => {
      if (status === 409 && code === 'E_BOOKING_SLOT_TAKEN') {
        setActionError({
          tone: 'warn',
          text: t('errorTaken', 'That time was just taken - here are the latest openings.'),
        });
        if (visitorTz) void loadSlots(fromIso, visitorTz);
        return;
      }
      if (status === 409 && code === 'E_BOOKING_LEAD_ALREADY_ACTIVE') {
        setActionError({
          tone: 'warn',
          text: t(
            'errorAlreadyActive',
            'You already have a call booked. Check your confirmation email to manage it.',
          ),
        });
        return;
      }
      if (status === 422 && code === 'E_BOOKING_SLOT_UNAVAILABLE') {
        setActionError({
          tone: 'warn',
          text: t('errorUnavailable', 'That time is no longer available. Please choose another.'),
        });
        if (visitorTz) void loadSlots(fromIso, visitorTz);
        return;
      }
      if (status === 502 && code === 'E_BOOKING_GRAPH_UNAVAILABLE') {
        setActionError({
          tone: 'error',
          text: t(
            'errorGraph',
            'We could not reach the calendar just now. Please try again in a moment.',
          ),
        });
        return;
      }
      if (status === 401) {
        setActionError({
          tone: 'error',
          text: t(
            'errorExpired',
            'This booking link has expired. Reply to your email and we will send a new one.',
          ),
        });
        return;
      }
      setActionError({ tone: 'error', text: t('errorGeneric', 'Something went wrong. Please try again.') });
    },
    [t, visitorTz, fromIso, loadSlots],
  );

  const bookSlot = async (slot: Slot) => {
    setSubmittingSlot(slot.startUtc);
    setActionError(null);
    try {
      const params = new URLSearchParams({ token });
      const res = await fetch(`/api/book?${params.toString()}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ slotStart: slot.startUtc, idempotencyKey: idempotencyKeyRef.current }),
      });
      const json = (await res.json().catch(() => ({}))) as BookResult;
      if (res.status === 201 && json.booking) {
        setConfirmed({
          booking: json.booking,
          joinUrl: json.joinUrl ?? json.booking.joinUrl ?? null,
          manageToken: json.manageToken ?? null,
          ics: json.ics ?? null,
        });
        setActionError(null);
        setMode('confirmed');
        return;
      }
      handleBookingError(res.status, json.error);
    } catch {
      setActionError({ tone: 'error', text: t('errorGeneric', 'Something went wrong. Please try again.') });
    } finally {
      setSubmittingSlot(null);
    }
  };

  const rescheduleSlot = async (slot: Slot) => {
    if (!confirmed) return;
    setSubmittingSlot(slot.startUtc);
    setActionError(null);
    try {
      const params = new URLSearchParams({ token: confirmed.manageToken ?? '' });
      const res = await fetch(
        `/api/book/${encodeURIComponent(confirmed.booking.id)}/reschedule?${params.toString()}`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', accept: 'application/json' },
          body: JSON.stringify({ slotStart: slot.startUtc }),
        },
      );
      const json = (await res.json().catch(() => ({}))) as BookResult;
      if (res.ok && json.booking) {
        setConfirmed({
          booking: json.booking,
          joinUrl: json.joinUrl ?? json.booking.joinUrl ?? confirmed.joinUrl,
          manageToken: confirmed.manageToken,
          ics: json.ics ?? confirmed.ics,
        });
        setActionError(null);
        setMode('confirmed');
        return;
      }
      handleBookingError(res.status, json.error);
    } catch {
      setActionError({ tone: 'error', text: t('errorGeneric', 'Something went wrong. Please try again.') });
    } finally {
      setSubmittingSlot(null);
    }
  };

  const doCancel = async () => {
    if (!confirmed) return;
    setCanceling(true);
    setActionError(null);
    try {
      const params = new URLSearchParams({ token: confirmed.manageToken ?? '' });
      const res = await fetch(
        `/api/book/${encodeURIComponent(confirmed.booking.id)}/cancel?${params.toString()}`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', accept: 'application/json' },
          body: JSON.stringify({ reason: 'attendee_web_cancel' }),
        },
      );
      const json = (await res.json().catch(() => ({}))) as BookResult;
      if (res.ok) {
        setConfirmCancel(false);
        setMode('canceled');
        return;
      }
      if (res.status === 422 && json.error === 'E_BOOKING_CUTOFF') {
        setConfirmCancel(false);
        setActionError({
          tone: 'warn',
          text: t(
            'cutoff',
            'This call is too soon to change online. Reply to your confirmation email and we will help.',
          ),
        });
        return;
      }
      handleBookingError(res.status, json.error);
    } catch {
      setActionError({ tone: 'error', text: t('errorGeneric', 'Something went wrong. Please try again.') });
    } finally {
      setCanceling(false);
    }
  };

  const downloadIcs = (ics: string | null) => {
    if (!ics) return;
    try {
      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sundae-call.ics';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      /* download best-effort */
    }
  };

  const bookAgain = () => {
    setConfirmed(null);
    setActionError(null);
    setConfirmCancel(false);
    setFromIso(new Date().toISOString());
    setMode('select');
  };

  const retryLoad = () => {
    if (visitorTz) void loadSlots(fromIso, visitorTz);
  };

  // --- derived --------------------------------------------------------------
  const displayTz = visitorTz || slotsData?.visitorTimezone || '';
  const teamTz = ctx.teamTimezone || slotsData?.teamTimezone || null;
  const duration = ctx.durationMinutes ?? slotsData?.durationMinutes ?? null;
  const graphDegraded = !!slotsData?.graphDegraded;
  const joinUrl = confirmed?.joinUrl || confirmed?.booking?.joinUrl || null;
  const isLoadingSlots =
    slotsLoading || (!visitorTz && (mode === 'select' || mode === 'reschedule'));

  const formatWhen = (iso: string | null | undefined, tz: string): string => {
    if (!iso) return '';
    try {
      return new Intl.DateTimeFormat(getWebsiteIntlLocale(locale), {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZone: tz || undefined,
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  const slotLabel = (slot: Slot, tz: string): string => {
    if (slot.label) return slot.label;
    try {
      const l = fmtSlot(slot.startUtc, tz, locale);
      if (typeof l === 'string' && l.length > 0) return l;
    } catch {
      /* fall through */
    }
    try {
      return new Intl.DateTimeFormat(getWebsiteIntlLocale(locale), {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: tz || undefined,
      }).format(new Date(slot.startUtc));
    } catch {
      return slot.startLocal || slot.startUtc;
    }
  };

  const dayHeading = (day: BookingDay): string => {
    // day.date is the visitor-tz calendar date ("yyyy-MM-dd"); format it at UTC
    // midnight so the weekday can't drift a day in either direction.
    try {
      const h = new Intl.DateTimeFormat(getWebsiteIntlLocale(locale), {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
      }).format(new Date(`${day.date}T00:00:00Z`));
      if (h && h.length > 0) return h;
    } catch {
      /* fall through */
    }
    return day.weekdayLabel || day.date || '';
  };

  // --- theme tokens (mirror the diagnostic report shell) --------------------
  const muted = dark ? 'text-stone-400' : 'text-gray-500';
  const body = dark ? 'text-stone-300' : 'text-gray-600';
  const heading = dark ? 'text-stone-100' : 'text-gray-900';
  const rule = dark ? 'border-white/10' : 'border-gray-200';
  const cardCls = dark ? 'border-white/10 bg-white/[0.02]' : 'border-gray-200 bg-white';
  const chip = dark ? 'bg-[#FF5C4D]/15 text-[#FF8473]' : 'bg-[#FF5C4D]/10 text-[#C2410C]';

  const coralBtn =
    'inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#FF5C4D] hover:bg-[#C2410C] text-white text-sm font-bold transition-colors disabled:opacity-60';
  const secondaryBtn = dark
    ? 'inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-stone-200 text-sm font-semibold transition-colors disabled:opacity-60'
    : 'inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 text-sm font-semibold transition-colors disabled:opacity-60';
  const dangerSolid =
    'inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors disabled:opacity-60';
  const linkAccent = dark
    ? 'inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF8473] hover:text-[#FF5C4D] transition-colors'
    : 'inline-flex items-center gap-1.5 text-sm font-semibold text-[#C2410C] hover:text-[#FF5C4D] transition-colors';
  const dangerLink = dark
    ? 'text-sm font-semibold text-red-300 hover:text-red-200 transition-colors'
    : 'text-sm font-semibold text-red-600 hover:text-red-500 transition-colors';

  const metaRow = (Icon: typeof Clock, text: string) => (
    <div className="flex items-center gap-2.5">
      <span className={`grid place-items-center w-8 h-8 rounded-lg shrink-0 ${chip}`}>
        <Icon className="w-4 h-4" />
      </span>
      <span className={`text-sm ${body}`}>{text}</span>
    </div>
  );

  const errorBanner = (err: ActionError) => (
    <div
      className={`flex items-start gap-2 rounded-xl border px-3.5 py-3 text-sm ${
        err.tone === 'error'
          ? dark
            ? 'border-red-500/30 bg-red-500/10 text-red-300'
            : 'border-red-200 bg-red-50 text-red-600'
          : dark
            ? 'border-[#FF5C4D]/30 bg-[#FF5C4D]/10 text-[#FF8473]'
            : 'border-[#FF5C4D]/30 bg-[#FF5C4D]/10 text-[#C2410C]'
      }`}
    >
      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
      <span>{err.text}</span>
    </div>
  );

  const requestAnother = (
    <p className={`text-xs ${muted}`}>
      {t(
        'requestAnother',
        'Prefer a time you do not see here? Reply to your email and we will set it up.',
      )}
    </p>
  );

  const renderSlotGrid = (onPick: (slot: Slot) => void): ReactNode => {
    if (isLoadingSlots) {
      return (
        <div className="space-y-5">
          {[0, 1].map((g) => (
            <div key={g}>
              <div className={`h-4 w-28 rounded ${dark ? 'bg-white/10' : 'bg-gray-200'} animate-pulse mb-3`} />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-11 rounded-xl ${dark ? 'bg-white/[0.06]' : 'bg-gray-100'} animate-pulse`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (slotsError === 'unavailable') {
      return (
        <div className={`rounded-2xl border p-6 text-center ${cardCls}`}>
          <p className={`text-sm ${body}`}>
            {t('schedulerDown', 'Our scheduler is briefly unavailable. Please try again in a moment.')}
          </p>
          <button onClick={retryLoad} disabled={slotsLoading} className={`${secondaryBtn} mt-4`}>
            {slotsLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {t('retry', 'Try again')}
          </button>
          <div className="mt-3">{requestAnother}</div>
        </div>
      );
    }

    if (slotsError) {
      return (
        <div className={`rounded-2xl border p-6 text-center ${cardCls}`}>
          <p className={`text-sm ${body}`}>{t('loadError', 'We could not load open times just now.')}</p>
          <button onClick={retryLoad} disabled={slotsLoading} className={`${secondaryBtn} mt-4`}>
            {slotsLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {t('retry', 'Try again')}
          </button>
        </div>
      );
    }

    const days = (slotsData?.days ?? []).filter((d) => (d.slots?.length ?? 0) > 0);
    if (!days.length) {
      return (
        <div className={`rounded-2xl border p-6 text-center ${cardCls}`}>
          <p className={`text-sm ${body}`}>{t('noSlots', 'No open times in the next couple of weeks.')}</p>
          {slotsData?.firstAvailableUtc && (
            <button onClick={() => setFromIso(slotsData.firstAvailableUtc as string)} className={`${coralBtn} mt-4`}>
              {t('nextOpenDay', 'Show the next open day')} <ArrowUpRight className="w-4 h-4" />
            </button>
          )}
          <div className="mt-3">{requestAnother}</div>
        </div>
      );
    }

    return (
      <div className="space-y-5">
        {days.map((day) => (
          <div key={day.date || day.weekdayLabel}>
            <h3 className={`text-sm font-bold mb-2.5 ${heading}`}>{dayHeading(day)}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {day.slots.map((slot) => {
                const busy = submittingSlot === slot.startUtc;
                return (
                  <button
                    key={slot.startUtc}
                    onClick={() => onPick(slot)}
                    disabled={!!submittingSlot}
                    aria-label={slotLabel(slot, displayTz)}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border text-sm font-semibold transition-colors disabled:opacity-50 ${
                      dark
                        ? 'border-white/10 text-stone-200 hover:border-[#FF5C4D]/50 hover:bg-[#FF5C4D]/10'
                        : 'border-gray-200 text-gray-800 hover:border-[#FF5C4D]/50 hover:bg-[#FF5C4D]/5'
                    }`}
                  >
                    {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : slotLabel(slot, displayTz)}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col transition-colors ${
        dark ? 'bg-[#020617] text-stone-100' : 'bg-gray-50 text-gray-900'
      }`}
      style={{ colorScheme: dark ? 'dark' : 'light' }}
      lang={locale}
      dir={dir}
    >
      {/* App top bar */}
      <header className={`shrink-0 border-b ${dark ? 'bg-[#020617] border-white/10' : 'bg-white border-gray-200'}`}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-lg font-extrabold tracking-tight">
              sundae<span className="text-[#FF5C4D]">.</span>
            </span>
            <span
              className={`hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${chip}`}
            >
              <CalendarClock className="w-3 h-3" /> {t('badge', 'Book a call')}
            </span>
          </div>
          <button
            onClick={() => setDark((d) => !d)}
            className={`grid place-items-center w-9 h-9 rounded-lg border transition-colors ${
              dark ? 'border-white/10 hover:bg-white/5 text-stone-300' : 'border-gray-200 hover:bg-gray-100 text-gray-600'
            }`}
            aria-label={t('themeToggle', 'Toggle light or dark mode')}
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Scrolling canvas */}
      <main className="flex-1 min-h-0 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-5">
          {/* Hero - only for the slot-picking states */}
          {(mode === 'select' || mode === 'reschedule') && (
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider ${muted}`}>
                {ctx.company || t('brand', 'Sundae')}
              </p>
              <h1 className={`text-2xl sm:text-3xl font-bold mt-1 ${heading}`}>
                {mode === 'reschedule' ? t('rescheduleTitle', 'Pick a new time') : t('title', 'Book a call')}
              </h1>
              <p className={`text-sm mt-1.5 ${body}`}>
                {mode === 'reschedule'
                  ? t('rescheduleSub', 'Choose a new slot that works better for you.')
                  : ctx.offering}
              </p>
            </div>
          )}

          {/* SELECT / RESCHEDULE */}
          {(mode === 'select' || mode === 'reschedule') && (
            <>
              {mode === 'reschedule' && (
                <button
                  onClick={() => {
                    setActionError(null);
                    setMode('confirmed');
                  }}
                  className={`inline-flex items-center gap-1.5 text-sm ${muted} hover:opacity-80 transition-opacity`}
                >
                  <ArrowLeft className="w-4 h-4" /> {t('back', 'Back to your booking')}
                </button>
              )}

              {mode === 'select' && (
                <div className={`rounded-2xl border p-5 ${cardCls}`}>
                  <p className={`text-[15px] leading-relaxed ${dark ? 'text-stone-200' : 'text-gray-700'}`}>
                    {ctx.offering}
                  </p>
                  <div className={`mt-4 pt-4 border-t space-y-2.5 ${rule}`}>
                    {duration != null && metaRow(Clock, `${duration} ${t('minutesLabel', 'minutes')}`)}
                    {metaRow(Video, t('videoCall', 'Video call - the join link lands in your invite'))}
                    {teamTz && metaRow(CalendarClock, `${t('teamTz', 'Host time zone')}: ${teamTz}`)}
                  </div>
                </div>
              )}

              {actionError && errorBanner(actionError)}

              {graphDegraded && (
                <div
                  className={`flex items-start gap-2 rounded-xl border px-3.5 py-2.5 text-xs ${
                    dark ? 'border-amber-500/30 bg-amber-500/10 text-amber-300' : 'border-amber-200 bg-amber-50 text-amber-700'
                  }`}
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>
                    {t('degraded', 'Live availability is limited right now - these are our best current openings.')}
                  </span>
                </div>
              )}

              {displayTz && (
                <p className={`text-xs ${muted}`}>
                  {`${t('yourTzNote', 'All times shown in your time zone')} · ${displayTz}`}
                </p>
              )}

              {renderSlotGrid(mode === 'reschedule' ? rescheduleSlot : bookSlot)}

              {requestAnother}
            </>
          )}

          {/* CONFIRMED */}
          {mode === 'confirmed' && confirmed && (
            <>
              <div
                className={`rounded-2xl border p-6 text-center ${
                  dark
                    ? 'border-white/10 bg-gradient-to-br from-[#FF5C4D]/[0.07] to-transparent'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <span
                  className={`grid place-items-center w-12 h-12 rounded-full mx-auto ${
                    dark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-50 text-emerald-600'
                  }`}
                >
                  <CheckCircle2 className="w-6 h-6" />
                </span>
                <h2 className={`text-lg font-bold mt-4 ${heading}`}>{t('confirmedTitle', 'You are all set')}</h2>
                <p className={`text-sm mt-1.5 ${body}`}>{formatWhen(confirmed.booking.startAt, displayTz)}</p>
                {displayTz && <p className={`text-xs mt-1 ${muted}`}>{displayTz}</p>}

                <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                  {joinUrl && (
                    <a href={joinUrl} target="_blank" rel="noreferrer noopener" className={coralBtn}>
                      <Video className="w-4 h-4" /> {t('join', 'Join the call')}
                    </a>
                  )}
                  {confirmed.ics && (
                    <button onClick={() => downloadIcs(confirmed.ics)} className={secondaryBtn}>
                      <Download className="w-4 h-4" /> {t('addToCalendar', 'Add to calendar')}
                    </button>
                  )}
                </div>

                {confirmed.manageToken ? (
                  <div className={`mt-5 pt-4 border-t flex items-center justify-center gap-3 ${rule}`}>
                    <button
                      onClick={() => {
                        setActionError(null);
                        setConfirmCancel(false);
                        setMode('reschedule');
                      }}
                      className={linkAccent}
                    >
                      <CalendarClock className="w-4 h-4" /> {t('reschedule', 'Reschedule')}
                    </button>
                    <span className={muted}>·</span>
                    <button onClick={() => setConfirmCancel(true)} className={dangerLink}>
                      {t('cancel', 'Cancel')}
                    </button>
                  </div>
                ) : (
                  <p className={`mt-5 pt-4 border-t text-xs ${rule} ${muted}`}>
                    {t('manageNote', 'Need to change it? Reply to your confirmation email.')}
                  </p>
                )}

                {joinUrl && (
                  <p className={`mt-3 text-xs ${muted}`}>
                    {t('joinNote', 'The link is also in your calendar invite and confirmation email.')}
                  </p>
                )}
              </div>

              {actionError && errorBanner(actionError)}

              {confirmCancel && (
                <div className={`rounded-2xl border p-5 ${cardCls}`}>
                  <h3 className={`text-sm font-bold ${heading}`}>{t('confirmCancelTitle', 'Cancel this call?')}</h3>
                  <p className={`text-sm mt-1 ${body}`}>
                    {t('confirmCancelBody', 'You can book a new time whenever you are ready.')}
                  </p>
                  <div className="mt-4 flex items-center gap-2.5">
                    <button onClick={doCancel} disabled={canceling} className={dangerSolid}>
                      {canceling && <Loader2 className="w-4 h-4 animate-spin" />}
                      {t('confirmCancelYes', 'Yes, cancel')}
                    </button>
                    <button onClick={() => setConfirmCancel(false)} className={secondaryBtn}>
                      {t('keepIt', 'Keep it')}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* EXISTING active booking (no management token in context) */}
          {mode === 'existing' && initialActive && (
            <div className={`rounded-2xl border p-6 text-center ${cardCls}`}>
              <span
                className={`grid place-items-center w-12 h-12 rounded-full mx-auto ${
                  dark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-50 text-emerald-600'
                }`}
              >
                <CheckCircle2 className="w-6 h-6" />
              </span>
              <h2 className={`text-lg font-bold mt-4 ${heading}`}>{t('bookedTitle', 'You are booked')}</h2>
              <p className={`text-sm mt-1.5 ${body}`}>{formatWhen(initialActive.startAt, displayTz)}</p>
              {displayTz && <p className={`text-xs mt-1 ${muted}`}>{displayTz}</p>}

              {initialActive.joinUrl && (
                <div className="mt-5 flex items-center justify-center">
                  <a href={initialActive.joinUrl} target="_blank" rel="noreferrer noopener" className={coralBtn}>
                    <Video className="w-4 h-4" /> {t('join', 'Join the call')}
                  </a>
                </div>
              )}

              <p className={`mt-5 pt-4 border-t text-xs ${rule} ${muted}`}>
                {t('manageNote', 'Need to change it? Reply to your confirmation email.')}
              </p>
            </div>
          )}

          {/* CANCELED */}
          {mode === 'canceled' && (
            <div className={`rounded-2xl border p-6 text-center ${cardCls}`}>
              <span
                className={`grid place-items-center w-12 h-12 rounded-full mx-auto ${
                  dark ? 'bg-white/5 text-stone-400' : 'bg-gray-100 text-gray-500'
                }`}
              >
                <X className="w-6 h-6" />
              </span>
              <h2 className={`text-lg font-bold mt-4 ${heading}`}>{t('canceledTitle', 'Your call is canceled')}</h2>
              <p className={`text-sm mt-1.5 ${body}`}>
                {t('canceledBody', 'No problem - pick a new time whenever you are ready.')}
              </p>
              <button onClick={bookAgain} className={`${coralBtn} mt-5`}>
                <CalendarClock className="w-4 h-4" /> {t('bookAgain', 'Book another time')}
              </button>
            </div>
          )}

          <p className={`text-[11px] leading-relaxed text-center pt-2 ${dark ? 'text-stone-600' : 'text-gray-400'}`}>
            {t('footer', 'Booked through Sundae. Times are held briefly while you confirm.')}
          </p>
        </div>
      </main>
    </div>
  );
}
