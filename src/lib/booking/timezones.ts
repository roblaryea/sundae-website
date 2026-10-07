const FALLBACK_TIMEZONES = [
  'UTC',
  'America/Anchorage',
  'America/Bogota',
  'America/Caracas',
  'America/Chicago',
  'America/Denver',
  'America/Halifax',
  'America/Lima',
  'America/Los_Angeles',
  'America/Mexico_City',
  'America/New_York',
  'America/Panama',
  'America/Phoenix',
  'America/Puerto_Rico',
  'America/Santiago',
  'America/Sao_Paulo',
  'America/St_Johns',
  'America/Toronto',
  'Asia/Dubai',
  'Asia/Hong_Kong',
  'Asia/Kolkata',
  'Asia/Riyadh',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Sydney',
  'Europe/Amsterdam',
  'Europe/Berlin',
  'Europe/London',
  'Europe/Paris',
  'Pacific/Auckland',
] as const;

export type BookingTimezoneOption = {
  value: string;
  label: string;
};

function normalizeBookingTimezone(timezone: string): string | null {
  if (!timezone) return null;
  try {
    return new Intl.DateTimeFormat('en', { timeZone: timezone }).resolvedOptions().timeZone;
  } catch {
    return null;
  }
}

export function isValidBookingTimezone(timezone: string): boolean {
  return normalizeBookingTimezone(timezone) !== null;
}

export function detectBookingTimezone(fallback = 'UTC'): string {
  try {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const normalized = normalizeBookingTimezone(detected);
    if (normalized) return normalized;
  } catch {
    // Fall through to the configured host timezone, then UTC.
  }
  return normalizeBookingTimezone(fallback) ?? 'UTC';
}

function browserSupportedTimezones(): string[] {
  try {
    return typeof Intl.supportedValuesOf === 'function'
      ? Intl.supportedValuesOf('timeZone')
      : [...FALLBACK_TIMEZONES];
  } catch {
    return [...FALLBACK_TIMEZONES];
  }
}

function friendlyTimezoneName(timezone: string): string {
  if (timezone === 'UTC') return 'UTC';
  return timezone
    .split('/')
    .map((part) => part.replaceAll('_', ' '))
    .join(' / ');
}

export function formatBookingTimezoneLabel(
  timezone: string,
  locale = 'en',
  at: Date = new Date(),
): string {
  const name = friendlyTimezoneName(timezone);
  try {
    const offset = new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      timeZone: timezone,
      timeZoneName: 'shortOffset',
    })
      .formatToParts(at)
      .find((part) => part.type === 'timeZoneName')?.value;
    return offset && offset !== name ? `${name} · ${offset}` : name;
  } catch {
    return name;
  }
}

export function buildBookingTimezoneOptions(
  locale = 'en',
  required: Array<string | null | undefined> = [],
  supported: readonly string[] = browserSupportedTimezones(),
): BookingTimezoneOption[] {
  const values = new Set<string>(['UTC']);
  for (const timezone of [...supported, ...required]) {
    if (!timezone) continue;
    const normalized = normalizeBookingTimezone(timezone);
    if (normalized) values.add(normalized);
  }

  const collator = new Intl.Collator(locale);
  return Array.from(values)
    .map((value) => ({ value, label: formatBookingTimezoneLabel(value, locale) }))
    .sort((a, b) => collator.compare(a.label, b.label));
}
