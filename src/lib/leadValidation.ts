export function isPhoneRequiredForLead(
  sourcePage?: string | null,
  source?: string | null,
): boolean {
  return sourcePage !== "/diagnostic" && source !== "diagnostic-call-request";
}

export function isValidOptionalPhone(phone?: string | null): boolean {
  if (!phone?.trim()) return true;
  return /\d{6,}/.test(phone.replace(/[\s\-()]/g, ""));
}
