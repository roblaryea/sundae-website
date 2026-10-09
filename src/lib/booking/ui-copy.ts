import { bookingControlsCopy } from './controls-copy';
import { bookingFlowCopy } from './flow-copy';
import { personalBookingCopy } from './personal-copy';
import { meetingDetailsCopy } from './meeting-details-copy';
import { bookingSkipCopy } from './skip-copy';
import type { BookingLocale } from './locales';

export function getBookingUiCopy(locale: BookingLocale) {
  const flow = bookingFlowCopy[locale];
  const personal = personalBookingCopy[locale];
  return { ...flow, ...bookingControlsCopy[locale], ...personal,
    brand: 'Sundae', badge: flow.title, footer: personal.personalFooter, meetingDetails: meetingDetailsCopy[locale], skipToContent: bookingSkipCopy[locale] };
}

export type BookingUiKey = keyof ReturnType<typeof getBookingUiCopy>;
