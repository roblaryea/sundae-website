/**
 * One free-mail list for every website lead flow (guided booking, the
 * Operations Diagnostic in both variants), plus company-from-domain.
 * Moved verbatim from `leadConversation/inference.ts`, which re-exports it,
 * so the diagnostic's classic page can use it without loading the booking's
 * inference module (diagnostic spec D13).
 *
 * Pure module with no imports so `node --test` can load it.
 */

/**
 * Free-mail providers. Exact, lower-cased domain match. This list must stay
 * identical to the backend helper that decides whether a guided-booking lead
 * may receive a short-lived booking token (spec section 6.4).
 */
export const FREE_MAIL_DOMAINS = [
  'gmail.com',
  'googlemail.com',
  'hotmail.com',
  'hotmail.co.uk',
  'hotmail.fr',
  'outlook.com',
  'live.com',
  'msn.com',
  'yahoo.com',
  'yahoo.co.uk',
  'ymail.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'gmx.com',
  'gmx.de',
  'yandex.com',
  'mail.ru',
  'qq.com',
  '163.com',
] as const;

const FREE_MAIL_SET: ReadonlySet<string> = new Set(FREE_MAIL_DOMAINS);

export function emailDomain(email: string): string {
  const at = email.trim().lastIndexOf('@');
  return at === -1 ? '' : email.trim().slice(at + 1).toLowerCase();
}

export function isFreeMailDomain(domain: string): boolean {
  return FREE_MAIL_SET.has(domain.trim().toLowerCase());
}

export function isFreeMailEmail(email: string): boolean {
  return isFreeMailDomain(emailDomain(email));
}

/**
 * Second-level public suffixes in common use by hospitality groups in our
 * markets. Not a full public-suffix list: an unknown two-part suffix only
 * means we suggest a slightly different company name, which the visitor can
 * correct with "Different name".
 */
const SECOND_LEVEL_SUFFIXES = new Set([
  'co.uk', 'org.uk', 'ltd.uk', 'plc.uk', 'me.uk',
  'com.au', 'net.au', 'org.au', 'co.nz', 'org.nz',
  'com.sa', 'net.sa', 'com.qa', 'com.bh', 'com.kw', 'com.om', 'com.eg', 'com.jo', 'com.lb',
  'co.ae', 'net.ae', 'org.ae', 'co.il',
  'com.tr', 'com.br', 'com.mx', 'com.ar', 'com.co',
  'co.in', 'net.in', 'com.pk', 'com.bd',
  'com.sg', 'com.my', 'co.id', 'co.th', 'com.vn', 'com.ph', 'com.cn', 'com.hk', 'com.tw',
  'co.jp', 'co.kr', 'co.za',
]);

/**
 * Suggest a company name from a work domain: the label before the public
 * suffix, title-cased ("harbor-group.co.uk" -> "Harbor Group"). Returns ''
 * for free-mail or unusable domains.
 */
export function companyFromDomain(domain: string): string {
  const clean = domain.trim().toLowerCase().replace(/\.$/, '');
  if (!clean || isFreeMailDomain(clean)) return '';
  const labels = clean.split('.').filter(Boolean);
  if (labels.length < 2) return '';
  const suffixLength = labels.length >= 3 && SECOND_LEVEL_SUFFIXES.has(labels.slice(-2).join('.')) ? 2 : 1;
  const label = labels[labels.length - suffixLength - 1];
  if (!label || /^\d+$/.test(label) || label.startsWith('xn--')) return '';
  return label
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function companyFromEmail(email: string): string {
  return companyFromDomain(emailDomain(email));
}
