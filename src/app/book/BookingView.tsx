'use client';

/**
 * App-styled, token-gated booking surface. Renders as a self-contained
 * full-viewport screen (fixed inset-0) so it reads like an in-product Sundae
 * screen - independent of the marketing site's chrome/theme - mirroring the
 * diagnostic report shell (brand lockup, working light/dark, rounded-2xl
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
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Loader2,
  AlertCircle,
  Download,
  X,
  Globe2,
  ChevronDown,
} from 'lucide-react';
import {
  websiteLocaleDirection,
  getWebsiteIntlLocale,
  getLocalizedCopy,
  type WebsiteLocale,
} from '@/lib/i18n';
import { bookingCopy } from '@/lib/booking/copy';
import { bookingControlsCopy } from '@/lib/booking/controls-copy';
import { personalBookingCopy } from '@/lib/booking/personal-copy';
import {
  buildBookingTimezoneOptions,
  detectBookingTimezone,
} from '@/lib/booking/timezones';
import type { BookingContext, Slot, BookingDay, BookingSummary } from '@/lib/sundaeBookingClient';
import type { PersonalBookingContext } from '@/lib/personalBookingClient';
import { BookingBrand } from './BookingBrand';
import { useTheme } from '@/components/ui/ThemeProvider';
import { useRouter } from 'next/navigation';

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
  googleCalendarUrl?: string;
  outlookCalendarUrl?: string;
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
  googleCalendarUrl?: string;
  outlookCalendarUrl?: string;
};

type Mode = 'select' | 'reschedule' | 'confirmed' | 'existing' | 'canceled';
type ActionError = { tone: 'warn' | 'error'; text: string };

type BookingViewProps = { token: string; locale: WebsiteLocale; ctx: BookingContext; personal?: PersonalBookingContext };

export function BookingView(props: BookingViewProps) {
  // Each public context has a fresh form nonce. A return from a private canceled
  // booking starts a new guest flow rather than reusing its client credentials.
  return <BookingState key={props.personal?.formToken || props.token} {...props} />;
}

function BookingState({
  token,
  locale,
  ctx,
  personal,
}: BookingViewProps) {
  const router = useRouter();
  const dir = websiteLocaleDirection[locale] ?? 'ltr';
  const copy = useMemo<Record<string, unknown>>(
    () => ({ ...resolveBookingCopy(locale), ...getLocalizedCopy(bookingControlsCopy, locale), ...getLocalizedCopy(personalBookingCopy, locale) }),
    [locale],
  );
  const t = useCallback(
    (key: string, fallback: string): string => {
      const v = copy[key];
      return typeof v === 'string' && v.length > 0 ? v : fallback;
    },
    [copy],
  );

  const initialActive =
    ctx.activeBooking && ctx.activeBooking.status !== 'canceled' ? ctx.activeBooking : null;

  const { theme, toggleTheme } = useTheme();
  const dark = theme === 'dark';
  const [mode, setMode] = useState<Mode>(personal?.confirmation ?
    (personal.confirmation.booking.status === 'canceled' ? 'canceled' : 'confirmed') : initialActive ? 'existing' : 'select');
  const [confirmed, setConfirmed] = useState<ConfirmedBooking | null>(personal?.confirmation || null);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationReady, setVerificationReady] = useState(false);
  const [managementEmailFailed, setManagementEmailFailed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVerificationReady(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const [visitorTz, setVisitorTz] = useState('');
  const [fromIso, setFromIso] = useState<string>(() => new Date().toISOString());
  const [slotsData, setSlotsData] = useState<SlotsData | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<'unavailable' | 'error' | null>(null);

  // Calendly-style month picker: the highlighted day + the month currently on
  // screen ("yyyy-MM"). Both are seeded/repaired from live slot data below.
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [calMonth, setCalMonth] = useState<string | null>(null);

  const [submittingSlot, setSubmittingSlot] = useState<string | null>(null);
  const [actionError, setActionError] = useState<ActionError | null>(null);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [reviewSlot, setReviewSlot] = useState<Slot | null>(null);
  const [discussion, setDiscussion] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(ctx.durationMinutes);
  const [hour12, setHour12] = useState(true);
  const slotsRequestRef = useRef(0);
  const reschedulingId = mode === 'reschedule' ? confirmed?.booking.id : undefined;
  const personalSlug = personal?.slug;
  const personalManageToken = confirmed?.manageToken;
  const isPersonal = !!personal;
  const bookedDuration = confirmed?.booking.startAt && confirmed.booking.endAt
    ? (Date.parse(confirmed.booking.endAt) - Date.parse(confirmed.booking.startAt)) / 60000 : ctx.durationMinutes;
  const requestedDuration = mode === 'reschedule' ? bookedDuration : selectedDuration;
  const durationOptions = ctx.durationOptions ?? (ctx.durationMinutes ? [ctx.durationMinutes] : []);

  const idempotencyKeyRef = useRef('');
  if (!idempotencyKeyRef.current) idempotencyKeyRef.current = makeIdempotencyKey();

  // Detect the visitor's time zone once on mount (client-only). The host zone
  // is a safe fallback for browsers that cannot expose an IANA zone; the user
  // can always override it with the visible selector below.
  useEffect(() => {
    setVisitorTz(detectBookingTimezone(ctx.teamTimezone || 'UTC'));
  }, [ctx.teamTimezone]);

  const loadSlots = useCallback(
    async (from: string, tz: string) => {
      const requestId = ++slotsRequestRef.current;
      setSlotsLoading(true);
      setSlotsError(null);
      try {
        const params = new URLSearchParams({ token, tz, from, eventType: ctx.eventTypeId || 'discovery' });
        if (reschedulingId) params.set('bookingId', reschedulingId);
        if (requestedDuration !== null) params.set('durationMinutes', String(requestedDuration));
        const endpoint = isPersonal ? (reschedulingId
          ? `/api/personal-book/manage/${reschedulingId}/slots` : `/api/personal-book/${personalSlug}/slots`) : '/api/book/slots';
        if (isPersonal && reschedulingId) params.set('token', personalManageToken || token);
        const res = await fetch(`${endpoint}?${params.toString()}`, {
          headers: { accept: 'application/json' },
        });
        if (requestId !== slotsRequestRef.current) return;
        if (!res.ok) {
          setSlotsData(null);
          setSlotsError(res.status === 503 ? 'unavailable' : 'error');
          return;
        }
        const json = (await res.json().catch(() => ({}))) as SlotsResponse;
        if (requestId !== slotsRequestRef.current) return;
        setSlotsData({
          days: Array.isArray(json.days) ? json.days : [],
          firstAvailableUtc: json.firstAvailableUtc ?? null,
          graphDegraded: !!json.graphDegraded,
          teamTimezone: json.teamTimezone ?? ctx.teamTimezone ?? null,
          visitorTimezone: json.visitorTimezone ?? tz,
          durationMinutes: json.durationMinutes ?? ctx.durationMinutes ?? null,
        });
      } catch {
        if (requestId !== slotsRequestRef.current) return;
        setSlotsData(null);
        setSlotsError('error');
      } finally {
        if (requestId === slotsRequestRef.current) setSlotsLoading(false);
      }
    },
    [token, ctx.teamTimezone, ctx.durationMinutes, ctx.eventTypeId, reschedulingId, requestedDuration, isPersonal, personalSlug, personalManageToken],
  );

  // Load slots on mount + whenever the visitor tz, window start, or slot-picking
  // mode changes. Confirmed / existing / canceled states never fetch.
  useEffect(() => {
    if (mode !== 'select' && mode !== 'reschedule') return;
    if (!visitorTz) return;
    void loadSlots(fromIso, visitorTz);
    return () => { slotsRequestRef.current += 1; };
  }, [mode, visitorTz, fromIso, loadSlots]);

  // Whenever fresh slot data arrives, seed the calendar month + selected day to
  // the first open day. If the previously selected day is no longer open, snap
  // back to the first open day (and keep the displayed month within range).
  useEffect(() => {
    const openDays = (slotsData?.days ?? []).filter((d) => (d.slots?.length ?? 0) > 0);
    if (!openDays.length) return;
    const firstOpen = openDays[0].date;
    setSelectedDate((prev) =>
      prev && openDays.some((d) => d.date === prev) ? prev : firstOpen,
    );
    setCalMonth((prev) =>
      prev && openDays.some((d) => d.date.slice(0, 7) === prev) ? prev : firstOpen.slice(0, 7),
    );
  }, [slotsData]);

  const handleBookingError = useCallback(
    (status: number, code: string | undefined) => {
      if (status === 409 || code === 'E_BOOKING_SLOT_UNAVAILABLE') setReviewSlot(null);
      if (code === 'invalid_discussion') {
        setActionError({ tone: 'warn', text: t('discussionError', 'Please answer the discussion question (up to 2,000 characters).') });
        return;
      }
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
      if (personal && !verificationId) {
        const response = await fetch(`/api/personal-book/${personal.slug}/verification`, {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ name: visitorName, email: visitorEmail, formToken: personal.formToken, website: honeypot }),
        });
        const result = await response.json();
        if (response.status !== 202 || !result.verificationId) {
          setActionError({ tone: 'error', text: t(response.status === 429 ? 'tooManyRequests' : 'verificationFailed', '') });
          return;
        }
        setVerificationId(result.verificationId);
        return;
      }
      const params = new URLSearchParams({ token });
      const endpoint = personal ? `/api/personal-book/${personal.slug}/book` : '/api/book';
      const res = await fetch(`${endpoint}?${params.toString()}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ slotStart: slot.startUtc, idempotencyKey: idempotencyKeyRef.current,
          eventTypeId: ctx.eventTypeId || 'discovery', discussion, durationMinutes: selectedDuration ?? undefined,
          ...(personal ? { verificationId, code: verificationCode } : {}) }),
      });
      const json = (await res.json().catch(() => ({}))) as BookResult;
      if (res.status === 201 && json.booking) {
        if (personal && json.manageToken) {
          const manage = new URL('/book/manage', window.location.origin);
          manage.searchParams.set('id', json.booking.id); manage.searchParams.set('token', json.manageToken);
          window.history.replaceState(null, '', manage);
        }
        setManagementEmailFailed((json as BookResult & { managementEmailSent?: boolean }).managementEmailSent === false);
        setConfirmed({
          booking: json.booking,
          joinUrl: json.joinUrl ?? json.booking.joinUrl ?? null,
          manageToken: json.manageToken ?? null,
          ics: json.ics ?? null,
          googleCalendarUrl: json.googleCalendarUrl,
          outlookCalendarUrl: json.outlookCalendarUrl,
        });
        setActionError(null);
        setMode('confirmed');
        setReviewSlot(null);
        return;
      }
      if (personal && json.error === 'invalid_or_expired_code') {
        setActionError({ tone: 'error', text: t('invalidCode', '') });
      } else handleBookingError(res.status, json.error);
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
        `${personal ? '/api/personal-book/manage' : '/api/book'}/${encodeURIComponent(confirmed.booking.id)}/reschedule?${params.toString()}`,
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
          googleCalendarUrl: json.googleCalendarUrl,
          outlookCalendarUrl: json.outlookCalendarUrl,
        });
        setActionError(null);
        setMode('confirmed');
        setReviewSlot(null);
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
        `${personal ? '/api/personal-book/manage' : '/api/book'}/${encodeURIComponent(confirmed.booking.id)}/cancel?${params.toString()}`,
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
    if (personal?.slug) {
      router.push(`/book/${encodeURIComponent(personal.slug)}`);
      return;
    }
    idempotencyKeyRef.current = makeIdempotencyKey();
    setReviewSlot(null);
    setDiscussion('');
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
  const timezoneOptions = useMemo(
    () =>
      buildBookingTimezoneOptions(getWebsiteIntlLocale(locale), [
        visitorTz,
        teamTz,
      ]),
    [locale, visitorTz, teamTz],
  );
  const duration = confirmed || initialActive ? bookedDuration : requestedDuration;
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
        hour12,
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  const slotLabel = (slot: Slot, tz: string): string => {
    try {
      return new Intl.DateTimeFormat(getWebsiteIntlLocale(locale), {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: tz || undefined,
        hour12,
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
  const muted = 'text-[var(--text-supporting)]';
  const body = 'text-[var(--text-secondary)]';
  const heading = 'text-[var(--text-display)]';
  const rule = 'border-[var(--border-default)]';
  const cardCls = 'border-[var(--border-default)] bg-[var(--navy)]';
  const chip = 'bg-[var(--trust-bg)] text-[var(--trust)]';

  const accentSolid = dark ? 'bg-[var(--accent-warm)] text-stone-950 hover:bg-[var(--link-hover)]' : 'bg-[var(--warm-deep)] text-white hover:brightness-90';
  const coralBtn =
    `inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl ${accentSolid} text-sm font-bold transition-colors disabled:opacity-60`;
  const secondaryBtn = dark
    ? 'inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-stone-200 text-sm font-semibold transition-colors disabled:opacity-60'
    : 'inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 text-sm font-semibold transition-colors disabled:opacity-60';
  const dangerSolid =
    'inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors disabled:opacity-60';
  const linkAccent = dark
    ? 'inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--link-hover)] hover:text-[var(--accent-warm)] transition-colors'
    : 'inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--warm-deep)] hover:text-[var(--accent-warm)] transition-colors';
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
            ? 'border-[var(--accent-warm)]/30 bg-[var(--accent-warm)]/10 text-[var(--link-hover)]'
            : 'border-[var(--accent-warm)]/30 bg-[var(--accent-warm)]/10 text-[var(--warm-deep)]'
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

    // --- Calendly-style layout: month calendar (left) + selected day's slots
    // (right). `days` is already filtered to open days only. ------------------
    const availableDates = new Set(days.map((d) => d.date));
    const firstAvailableMonth = days[0].date.slice(0, 7);
    const lastAvailableMonth = days[days.length - 1].date.slice(0, 7);
    const selectedDay = days.find((d) => d.date === selectedDate) ?? days[0];
    const month = calMonth ?? selectedDay.date.slice(0, 7);
    const [yStr, mStr] = month.split('-');
    const y = Number(yStr);
    const m = Number(mStr);

    const monthLabel = (() => {
      try {
        return new Intl.DateTimeFormat(getWebsiteIntlLocale(locale), {
          month: 'long',
          year: 'numeric',
          timeZone: 'UTC',
        }).format(new Date(`${month}-01T00:00:00Z`));
      } catch {
        return month;
      }
    })();

    // UTC date math only - no extra dependencies. getUTCDay() of the 1st gives
    // the leading blank count (0 = Sunday); day 0 of the next month is the last
    // day of this one.
    const leadingBlanks = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
    const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
    const weekdayNames = Array.from({ length: 7 }, (_, i) =>
      new Intl.DateTimeFormat(getWebsiteIntlLocale(locale), {
        weekday: 'short',
        timeZone: 'UTC',
      }).format(new Date(Date.UTC(2023, 0, 1 + i))),
    );

    const shiftMonth = (delta: number): string => {
      const d = new Date(Date.UTC(y, m - 1 + delta, 1));
      return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    };
    const canPrev = month > firstAvailableMonth;
    const canNext = month < lastAvailableMonth;
    const calNavBtn = dark
      ? 'grid place-items-center w-8 h-8 rounded-lg border border-white/10 text-stone-300 hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-default'
      : 'grid place-items-center w-8 h-8 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-default';

    return (
      <div className="grid gap-6 md:grid-cols-[minmax(0,280px),1fr]">
        {/* Month calendar */}
        <div className={`rounded-2xl border p-4 ${cardCls}`}>
          <div className="flex items-center justify-between gap-2 mb-3">
            <button
              type="button"
              onClick={() => canPrev && setCalMonth(shiftMonth(-1))}
              disabled={!canPrev}
              aria-label={t('prevMonth', 'Previous month')}
              className={calNavBtn}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className={`text-sm font-bold ${heading}`}>{monthLabel}</span>
            <button
              type="button"
              onClick={() => canNext && setCalMonth(shiftMonth(1))}
              disabled={!canNext}
              aria-label={t('nextMonth', 'Next month')}
              className={calNavBtn}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className={`grid grid-cols-7 gap-1 mb-1 text-center text-[11px] font-semibold ${muted}`}>
            {weekdayNames.map((wd, i) => (
              <span key={i} className="py-1">
                {wd}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: leadingBlanks }, (_, i) => (
              <span key={`blank-${i}`} aria-hidden="true" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const d = i + 1;
              const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
              const isAvailable = availableDates.has(dateStr);
              const isSelected = dateStr === selectedDay.date;
              const base =
                'relative grid place-items-center aspect-square w-full rounded-lg text-sm font-semibold transition-colors';
              let cellCls: string;
              if (isSelected) {
                cellCls = `${base} ${accentSolid}`;
              } else if (isAvailable) {
                cellCls = `${base} ring-1 ring-inset ring-[var(--accent-warm)]/30 ${
                  dark ? 'text-stone-100 hover:bg-[var(--accent-warm)]/15' : 'text-gray-900 hover:bg-[var(--accent-warm)]/10'
                }`;
              } else {
                cellCls = `${base} ${dark ? 'text-stone-600' : 'text-gray-300'}`;
              }
              return (
                <button
                  key={dateStr}
                  type="button"
                  onClick={() => isAvailable && setSelectedDate(dateStr)}
                  disabled={!isAvailable}
                  aria-pressed={isSelected}
                  aria-label={dayHeading({ date: dateStr, weekdayLabel: '', slots: [] })}
                  className={cellCls}
                >
                  {d}
                  {isAvailable && !isSelected && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent-warm)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected day's slots */}
        <div>
          <h3 className={`text-sm font-bold mb-2.5 ${heading}`}>{dayHeading(selectedDay)}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {selectedDay.slots.map((slot) => {
              const busy = submittingSlot === slot.startUtc;
              return (
                <button
                  key={slot.startUtc}
                  onClick={() => onPick(slot)}
                  disabled={!!submittingSlot}
                  aria-label={slotLabel(slot, displayTz)}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border text-sm font-semibold transition-colors disabled:opacity-50 ${
                    dark
                      ? 'border-white/10 text-stone-200 hover:border-[var(--accent-warm)]/50 hover:bg-[var(--accent-warm)]/10'
                      : 'border-gray-200 text-gray-800 hover:border-[var(--accent-warm)]/50 hover:bg-[var(--accent-warm)]/5'
                  }`}
                >
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : slotLabel(slot, displayTz)}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[var(--navy-deep)] text-[var(--text-primary)] transition-colors"
      style={{ colorScheme: dark ? 'dark' : 'light' }}
      lang={locale}
      dir={dir}
    >
      {/* App top bar */}
      <header className="shrink-0 border-b bg-[var(--navy-deep)] border-[var(--border-default)]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <BookingBrand />
            <span
              className={`hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${chip}`}
            >
              <CalendarClock className="w-3 h-3" /> {t('badge', 'Book a call')}
            </span>
          </div>
          <button
            onClick={toggleTheme}
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
              <h1 className={`text-3xl sm:text-4xl font-display font-normal mt-1 ${heading}`}>
                {mode === 'reschedule' ? t('rescheduleTitle', 'Pick a new time') : t('title', 'Book a call')}
              </h1>
              <p className={`text-sm mt-1.5 ${body}`}>
                {mode === 'reschedule'
                  ? t('rescheduleSub', 'Choose a new slot that works better for you.')
                  : ctx.offering}
              </p>
              {personal && <div className="mt-3 space-y-2">
                <p className={`font-medium ${heading}`}>{personal.displayName}</p>
                {personal.headline && <p className={`text-sm ${body}`}>{personal.headline}</p>}
                {personal.bio && <p className={`text-sm whitespace-pre-line ${body}`}>{personal.bio}</p>}
                {mode === 'select' && personal.events && personal.events.length > 1 && <nav className="flex flex-wrap gap-2 pt-2" aria-label={t('eventTypes', '')}>
                  {personal.events.map((event) => <a key={event.id} href={`/book/${personal.slug}/${event.id}`}
                    aria-current={ctx.eventTypeId === event.id ? 'page' : undefined}
                    className={ctx.eventTypeId === event.id ? coralBtn : secondaryBtn}>{event.name}</a>)}
                </nav>}
              </div>}
            </div>
          )}

          {/* SELECT / RESCHEDULE */}
          {(mode === 'select' || mode === 'reschedule') && (
            <>
              {mode === 'reschedule' && (
                <button
                  onClick={() => {
                    setActionError(null);
                    setReviewSlot(null);
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
                <div
                  className={`rounded-xl border px-3.5 py-3 sm:flex sm:items-center sm:justify-between sm:gap-4 ${cardCls}`}
                >
                  <div className="flex items-start gap-2.5">
                    <Globe2 className={`mt-0.5 h-4 w-4 shrink-0 ${muted}`} aria-hidden="true" />
                    <div>
                      <label htmlFor="booking-timezone" className={`text-sm font-semibold ${heading}`}>
                        {t('timezonePickerLabel', 'Your time zone')}
                      </label>
                      <p id="booking-timezone-help" className={`mt-0.5 text-xs ${muted}`}>
                        {t('timezonePickerHelp', 'Available times update automatically.')}
                      </p>
                    </div>
                  </div>
                  <div className="relative mt-3 sm:mt-0 sm:min-w-[17rem]">
                    <select
                      id="booking-timezone"
                      value={visitorTz}
                      onChange={(event) => {
                        if (event.target.value === visitorTz) return;
                        setReviewSlot(null);
                        setSlotsData(null);
                        setSelectedDate(null);
                        setCalMonth(null);
                        setVisitorTz(event.target.value);
                      }}
                      aria-describedby="booking-timezone-help"
                      className={`h-11 w-full appearance-none rounded-lg border py-2 ps-3 pe-9 text-sm font-medium outline-none transition-colors focus:border-[var(--accent-warm)] focus:ring-2 focus:ring-[var(--accent-warm)]/25 ${
                        dark
                          ? 'border-white/10 bg-[#0B1220] text-stone-100'
                          : 'border-gray-200 bg-white text-gray-900'
                      }`}
                    >
                      {timezoneOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className={`pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 ${muted}`}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              )}

              {mode === 'select' && durationOptions.length > 1 && (
                <div className="space-y-2">
                  <label htmlFor="booking-duration" className={`block text-sm font-semibold ${heading}`}>{t('durationLabel', 'Call duration')}</label>
                  <select id="booking-duration" value={selectedDuration ?? ''} disabled={!!submittingSlot}
                    className={`h-11 w-full rounded-lg border px-3 text-sm ${dark ? 'border-white/10 bg-[#0B1220] text-stone-100' : 'border-gray-200 bg-white text-gray-900'}`}
                    onChange={(event) => {
                      const next = Number(event.target.value);
                      if (next === selectedDuration) return;
                      slotsRequestRef.current += 1;
                      setReviewSlot(null); setSlotsData(null); setSelectedDate(null); setCalMonth(null); setActionError(null);
                      setSlotsLoading(true); setSelectedDuration(next);
                    }}>
                    {durationOptions.map((n) => <option key={n} value={n}>{n} {t('minutesLabel', 'minutes')}</option>)}
                  </select>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 text-sm" aria-label={t('timeFormat', 'Time format')}>
                {([true, false] as const).map((value) => (
                  <button key={String(value)} type="button" aria-pressed={hour12 === value}
                    onClick={() => setHour12(value)} className={hour12 === value ? coralBtn : secondaryBtn}>
                    {value ? '12h' : '24h'}
                  </button>
                ))}
              </div>

              {reviewSlot ? (
                <form className={`rounded-2xl border p-5 space-y-4 ${cardCls}`} onSubmit={(event) => {
                  event.preventDefault();
                  if (submittingSlot) return;
                  void (mode === 'reschedule' ? rescheduleSlot(reviewSlot) : bookSlot(reviewSlot));
                }}>
                  <h2 className={`text-lg font-bold ${heading}`}>{t('reviewTitle', 'Review your booking')}</h2>
                  <p className={body}>{formatWhen(reviewSlot.startUtc, displayTz)} · {displayTz}</p>
                  <p className={`text-sm ${muted}`}>{duration} {t('minutesLabel', 'minutes')} · {ctx.email}</p>
                  {personal && mode === 'select' && <div className="space-y-4">
                    <div className="space-y-2"><label htmlFor="visitor-name" className={`text-sm font-semibold ${heading}`}>{t('yourName', '')}</label>
                      <input id="visitor-name" autoComplete="name" required maxLength={120} disabled={!!verificationId} value={visitorName} onChange={(e) => setVisitorName(e.target.value)} className={`w-full rounded-lg border p-3 ${cardCls}`} /></div>
                    <div className="space-y-2"><label htmlFor="visitor-email" className={`text-sm font-semibold ${heading}`}>{t('emailAddress', '')}</label>
                      <input id="visitor-email" type="email" autoComplete="email" required maxLength={254} disabled={!!verificationId} value={visitorEmail} onChange={(e) => setVisitorEmail(e.target.value)} className={`w-full rounded-lg border p-3 ${cardCls}`} /></div>
                    <div aria-hidden="true" className="hidden"><label htmlFor="visitor-website">{t('website', '')}</label><input id="visitor-website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></div>
                    {verificationId ? <div className="space-y-2" aria-live="polite">
                      <p className={`text-sm ${body}`}>{t('codeSent', '').replace('{email}', visitorEmail)}</p>
                      <label htmlFor="verification-code" className={`block text-sm font-semibold ${heading}`}>{t('codeLabel', '')}</label>
                      <input id="verification-code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" minLength={6} maxLength={6} required value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))} className={`w-full rounded-lg border p-3 ${cardCls}`} />
                      <button type="button" disabled={!!submittingSlot} className={linkAccent} onClick={() => { setVerificationId(null); setVerificationCode(''); setActionError(null); }}>{t('requestNewCode', '')}</button>
                    </div> : <p className={`text-sm ${muted}`}>{t('verificationHelp', '')}</p>}
                  </div>}
                  {mode === 'select' && ctx.bookingQuestion?.enabled && (
                    <div className="space-y-2">
                      <label htmlFor="booking-discussion" className={`block text-sm font-semibold ${heading}`}>
                        {ctx.bookingQuestion.label} {!ctx.bookingQuestion.required && <span className={muted}>({t('optional', 'optional')})</span>}
                      </label>
                      <textarea id="booking-discussion" rows={4} maxLength={2000} required={ctx.bookingQuestion.required}
                        value={discussion} onChange={(event) => setDiscussion(event.target.value)}
                        className={`w-full rounded-lg border p-3 text-sm focus:ring-2 focus:ring-[var(--accent-warm)] outline-none ${cardCls}`} />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <button type="submit" disabled={!!submittingSlot || (!!personal && mode === 'select' && !verificationReady)} className={coralBtn}>
                      {submittingSlot && <Loader2 className="w-4 h-4 animate-spin" />}
                      {mode === 'reschedule' ? t('confirmReschedule', 'Confirm new time') : personal && !verificationId ? t('sendCode', '') : t('confirmCta', 'Confirm booking')}
                    </button>
                    <button type="button" disabled={!!submittingSlot} onClick={() => setReviewSlot(null)} className={secondaryBtn}>
                      {t('changeTime', 'Choose another time')}
                    </button>
                  </div>
                </form>
              ) : renderSlotGrid((slot) => { setActionError(null); setReviewSlot(slot); })}

              {requestAnother}
            </>
          )}

          {/* CONFIRMED */}
          {mode === 'confirmed' && confirmed && (
            <>
              <div
                className={`rounded-2xl border p-6 text-center ${
                  dark
                    ? 'border-white/10 bg-gradient-to-br from-[var(--accent-warm)]/[0.07] to-transparent'
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
                {personal && <p className={`mt-3 text-sm ${body}`}>{t('savePrivateLink', '')} {managementEmailFailed ? t('emailFailed', '') : ''}</p>}

                <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                  {joinUrl && (
                    <a href={joinUrl} target="_blank" rel="noreferrer noopener" className={coralBtn}>
                      <Video className="w-4 h-4" /> {t('join', 'Join the call')}
                    </a>
                  )}
                  {confirmed.ics && (
                    <button onClick={() => downloadIcs(confirmed.ics)} className={secondaryBtn}>
                      <Download className="w-4 h-4" /> {t('downloadIcs', 'Download ICS')}
                    </button>
                  )}
                  {confirmed.googleCalendarUrl && <a href={confirmed.googleCalendarUrl} target="_blank" rel="noreferrer noopener" className={secondaryBtn}>Google Calendar</a>}
                  {confirmed.outlookCalendarUrl && <a href={confirmed.outlookCalendarUrl} target="_blank" rel="noreferrer noopener" className={secondaryBtn}>Outlook</a>}
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

          <p className={`text-xs leading-relaxed text-center pt-2 ${muted}`}>
          {personal ? t('personalFooter', 'Booked through Sundae. A slot is reserved only when your booking is confirmed.') : t('footer', 'Booked through Sundae. Times are held briefly while you confirm.')}
          </p>
        </div>
      </main>
    </div>
  );
}
