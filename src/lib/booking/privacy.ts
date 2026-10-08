/** Booking URLs carry private credentials. Reject current and queued/referrer data. */
export function isBookingUrl(value: string): boolean {
  try {
    return /(^|\/)(?:book|personal-book)(?:\/|$)/.test(new URL(value, 'https://sundae.io').pathname);
  } catch { return false; }
}

export function containsBookingData(value: unknown): boolean {
  if (typeof value === 'string') return isBookingUrl(value) || /[?&](?:token|verificationId)=/.test(value);
  if (Array.isArray(value)) return value.some(containsBookingData);
  if (value && typeof value === 'object') return Object.values(value).some(containsBookingData);
  return false;
}
