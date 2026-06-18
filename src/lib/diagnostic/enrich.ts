/**
 * Lightweight, no-API lead enrichment from the work email.
 *
 * We derive a likely company name from a non-free-mail email domain and expose
 * the domain itself as a lead-scoring signal. This is intentionally local and
 * deterministic — deeper firmographic enrichment (employee count, industry,
 * revenue) would need a paid provider (e.g. Clearbit) and an API key; this
 * gives us the high-value 80% (company prefill + B2B-vs-consumer signal) for free.
 */

const FREE_MAIL = new Set([
  "gmail.com", "googlemail.com", "outlook.com", "hotmail.com", "live.com",
  "yahoo.com", "ymail.com", "icloud.com", "me.com", "aol.com", "proton.me",
  "protonmail.com", "gmx.com", "gmx.net", "mail.com", "yandex.com", "zoho.com",
  "hey.com", "msn.com", "qq.com", "163.com", "126.com",
]);

export function emailDomain(email: string): string | null {
  const at = email.lastIndexOf("@");
  if (at < 0) return null;
  const domain = email.slice(at + 1).toLowerCase().trim();
  return domain && domain.includes(".") ? domain : null;
}

export function isFreeMail(email: string): boolean {
  const d = emailDomain(email);
  return !d || FREE_MAIL.has(d);
}

/**
 * Best-effort company name from a corporate email domain.
 * "ops@alshaya-group.com" → "Alshaya Group". Returns null for free-mail or
 * unparseable domains so we never clobber a real company the user typed.
 */
export function companyFromEmail(email: string): string | null {
  const domain = emailDomain(email);
  if (!domain || FREE_MAIL.has(domain)) return null;
  const core = domain.split(".")[0];
  if (!core || core.length < 2) return null;
  return core
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
