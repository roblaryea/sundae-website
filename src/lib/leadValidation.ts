/**
 * Phone is required on lead forms except the diagnostic flows and guided
 * booking, where it is an optional reminder number (decision D1, 20 Nov 2026).
 * The classic form still requires it client-side.
 */
export function isPhoneRequiredForLead(
  sourcePage?: string | null,
  source?: string | null,
): boolean {
  return sourcePage !== "/diagnostic" && source !== "diagnostic-call-request" && source !== "guided-booking";
}

export function isValidOptionalPhone(phone?: string | null): boolean {
  if (!phone?.trim()) return true;
  return /\d{6,}/.test(phone.replace(/[\s\-()]/g, ""));
}
