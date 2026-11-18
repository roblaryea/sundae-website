export type Theme = 'dark' | 'light';
export const THEME_COOKIE = 'sundae_theme';
const valid = (value: string | null | undefined): value is Theme => value === 'dark' || value === 'light';

/** An explicit shared cookie wins over the older origin-local preference. */
export function readThemePreference(): Theme {
  try {
    const cookie = document.cookie.match(/(?:^|;\s*)sundae_theme=(light|dark)(?:;|$)/)?.[1];
    if (valid(cookie)) return cookie;
  } catch { /* storage restrictions must not prevent rendering */ }
  try {
    const local = localStorage.getItem('sundae-theme');
    if (valid(local)) return local;
  } catch { /* deliberate dark default */ }
  return 'dark';
}

export function writeThemePreference(theme: Theme) {
  try { localStorage.setItem('sundae-theme', theme); } catch { /* cookie still carries it */ }
  try {
    const host = location.hostname;
    const domain = host === 'sundae.io' || host.endsWith('.sundae.io') ? '; Domain=.sundae.io' : '';
    document.cookie = `${THEME_COOKIE}=${theme}; Path=/; Max-Age=31536000; SameSite=Lax${domain}${location.protocol === 'https:' ? '; Secure' : ''}`;
  } catch { /* local choice still works */ }
}
