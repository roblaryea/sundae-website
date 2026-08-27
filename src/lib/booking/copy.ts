/**
 * English-first copy + formatting helpers for the customer booking page.
 *
 * Plain data + pure helpers only (no React) so it can be imported from server
 * components, route handlers, or client components alike. Locale-specific
 * transcreation can layer on later the same way the diagnostic copy does; this
 * is the canonical English source.
 */

export interface BookingCopy {
  headline: string;
  subhead: string;
  /** Prefix rendered before the backend `offering` label, e.g. "About your ". */
  offeringPrefix: string;
  /** Label preceding the resolved timezone, e.g. "Times shown in". */
  timezoneLabel: string;
  pickATime: string;
  confirmCta: string;
  confirmedTitle: string;
  confirmedBody: string;
  joinCta: string;
  rescheduleLabel: string;
  cancelLabel: string;
  addToCalendar: string;
  notFound: {
    title: string;
    body: string;
    cta: string;
  };
  errors: {
    slotTaken: string;
    unavailable: string;
    graphError: string;
    alreadyBooked: string;
    pastCutoff: string;
    expiredToken: string;
    generic: string;
  };
}

export const bookingCopy: BookingCopy = {
  headline: 'Book your Sundae session',
  subhead:
    'Pick a time that works for you - we’ll send the invite and a calendar hold straight to your inbox.',
  offeringPrefix: 'About your ',
  timezoneLabel: 'Times shown in',
  pickATime: 'Pick a time',
  confirmCta: 'Confirm booking',
  confirmedTitle: 'You’re booked',
  confirmedBody:
    'We’ve emailed your confirmation and a calendar invite. Add it to your calendar so it doesn’t slip.',
  joinCta: 'Join the meeting',
  rescheduleLabel: 'Reschedule',
  cancelLabel: 'Cancel booking',
  addToCalendar: 'Add to calendar',
  notFound: {
    title: 'This booking link has expired',
    body: 'The link you followed is no longer valid. Request a fresh link or reach out and we’ll get you rebooked.',
    cta: 'Back to Sundae',
  },
  errors: {
    slotTaken: 'That time was just taken. Please choose another slot.',
    unavailable: 'That time is no longer available. Please pick a different slot.',
    graphError: 'We couldn’t reach the calendar service. Please try again in a moment.',
    alreadyBooked:
      'You already have an active booking. Reschedule or cancel it before booking a new time.',
    pastCutoff: 'It’s too close to the meeting to change it now. Contact us and we’ll help.',
    expiredToken: 'This booking link has expired. Please request a new one.',
    generic: 'Something went wrong. Please try again.',
  },
};

/**
 * Map a backend booking error code to a customer-facing message. Falls back to
 * the generic message for unknown codes.
 */
export function bookingErrorMessage(
  code: string | null | undefined,
  copy: BookingCopy = bookingCopy
): string {
  switch (code) {
    case 'E_BOOKING_SLOT_TAKEN':
      return copy.errors.slotTaken;
    case 'E_BOOKING_SLOT_UNAVAILABLE':
      return copy.errors.unavailable;
    case 'E_BOOKING_GRAPH_UNAVAILABLE':
      return copy.errors.graphError;
    case 'E_BOOKING_LEAD_ALREADY_ACTIVE':
      return copy.errors.alreadyBooked;
    case 'E_BOOKING_CUTOFF':
      return copy.errors.pastCutoff;
    case 'invalid_or_expired_token':
      return copy.errors.expiredToken;
    default:
      return copy.errors.generic;
  }
}

/**
 * Format a slot start instant as a localized time-of-day label
 * (e.g. "9:30 AM") in the visitor's timezone. Falls back to the raw ISO on any
 * Intl error (unknown timezone / malformed date).
 */
export function formatSlotLabel(iso: string, tz: string, locale = 'en'): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: tz || undefined,
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

/**
 * Format a day key as a localized heading (e.g. "Monday, Aug 4") in the
 * visitor's timezone. Falls back to the raw ISO on any Intl error.
 */
export function formatDayHeading(iso: string, tz: string, locale = 'en'): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      timeZone: tz || undefined,
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
