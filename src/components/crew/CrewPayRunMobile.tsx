'use client';

/**
 * Faithful implementation of "Crew Payroll · Pay run dashboard (admin)" from the
 * Claude Design project (Sundae Mobile PWA · Crew · Payroll) — cycle status,
 * multi-country readiness meter, totals, and per-country Ready/Review status.
 * Same cool-slate token set as the scheduling design. Sits inside
 * <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: claude.ai/design 9d73e488 · "Sundae Crew Payroll.dc.html" · C · Pay run dashboard.
 *
 * Localized via useCrewScreen (EN base + per-locale overrides in
 * locales/CrewPayRunMobile.locales.ts). Money is locale-currency via crewMoney/
 * crewConv: per-country amounts carry a GBP-base integer and the grand total is
 * derived from the sum of the converted per-country values (sum integrity).
 */

import { crewConv, crewFmt, crewMoney } from './crewCurrency';
import { useCrewScreen } from './crewI18n';
import { LOC } from './locales/CrewPayRunMobile.locales';

const EN = {
  title: 'Pay run',
  monthMarch: 'March',
  pays: 'pays',
  readinessLabel: 'Pay run readiness',
  runReady: 'Run ready',
  of: 'of',
  countriesLower: 'countries',
  oneNeedsReview: '1 country needs a quick review before you send.',
  totalToPay: 'Total to pay',
  peopleSuffix: 'people',
  nextPayDate: 'Next pay date',
  inDays: 'in',
  daysSuffix: 'days',
  countries: 'Countries',
  unitedStates: 'United States',
  unitedKingdom: 'United Kingdom',
  europeanUnion: 'European Union',
  canada: 'Canada',
  needsReviewTax: 'Needs review · tax',
  ready: 'Ready',
  review: 'Review',
  coverage: '39+ countries · 100+ states, provinces & cities',
  reviewGcc: 'Review GCC',
} as const;

const T = {
  bg: '#020617',
  surf: '#0f172a',
  surf2: '#0b1424',
  bd: '#1e293b',
  tx: '#f1f5f9',
  tx2: '#94a3b8',
  tx3: '#64748b',
  acc: '#34d399',
  acck: '#04140c',
  // status
  posk: '#4ade80',
  post: 'rgba(34,197,94,.14)',
  warn: '#f59e0b',
  warnk: '#fbbf24',
  warnt: 'rgba(245,158,11,.14)',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

type Country = {
  id: string;
  flag: string;
  /** Localized display-name key; omitted for proper-noun names (e.g. GCC). */
  nameKey?: keyof typeof EN;
  /** Verbatim proper-noun name (overrides nameKey), e.g. "GCC". */
  nameLiteral?: string;
  /** People count (numeric, not currency); null when the design shows none. */
  people: number | null;
  /** Static sub-label key used in place of a people count (e.g. GCC). */
  subKey?: keyof typeof EN;
  subWarn?: boolean;
  /** GBP-base integer for FX conversion; null renders an em-dash. */
  gbp: number | null;
  status: 'Ready' | 'Review';
};

// GBP-base integers for the four ready countries sum to 412,800 — the grand
// "Total to pay" — so the converted per-country amounts always reconcile to the
// converted grand total (derived below, never converted independently).
const COUNTRIES: Country[] = [
  { id: 'us', flag: '🇺🇸', nameKey: 'unitedStates', people: 38, gbp: 98000, status: 'Ready' },
  { id: 'uk', flag: '🇬🇧', nameKey: 'unitedKingdom', people: 41, gbp: 158000, status: 'Ready' },
  { id: 'eu', flag: '🇪🇺', nameKey: 'europeanUnion', people: 26, gbp: 96000, status: 'Ready' },
  { id: 'ca', flag: '🇨🇦', nameKey: 'canada', people: 19, gbp: 60800, status: 'Ready' },
  { id: 'gcc', flag: '🇦🇪', nameLiteral: 'GCC', people: null, subKey: 'needsReviewTax', subWarn: true, gbp: null, status: 'Review' },
];

export function CrewPayRunMobile() {
  const { t, locale } = useCrewScreen(EN, LOC);

  // Grand total = sum of the converted per-country amounts (sum integrity).
  const grandTotalConv = COUNTRIES.reduce(
    (sum, c) => sum + (c.gbp != null ? crewConv(locale, c.gbp) : 0),
    0,
  );

  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* header: org switcher + bell + avatar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 2px 0' }}>
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: T.surf,
            border: `1px solid ${T.bd}`,
            borderRadius: 99,
            padding: '5px 11px 5px 6px',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              background: T.acc,
              color: T.acck,
              font: `700 10px ${FONT}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            S
          </span>
          {/* Proper noun — kept verbatim across locales. */}
          <span style={{ font: `600 11.5px ${FONT}`, color: T.tx, whiteSpace: 'nowrap' }}>Sundae — DIFC</span>
          <span style={{ font: `600 10px ${FONT}`, color: T.tx3 }}>▾</span>
        </button>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <svg width="21" height="21" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 3a5 5 0 0 0-5 5c0 4-1.5 5-1.5 5h13S15 12 15 8a5 5 0 0 0-5-5Z"
              stroke={T.tx2}
              strokeWidth="1.5"
            />
            <path d="M8.5 16a1.6 1.6 0 0 0 3 0" stroke={T.tx2} strokeWidth="1.5" />
          </svg>
          <span style={{ width: 30, height: 30, borderRadius: '50%', background: T.surf2, border: `1px solid ${T.bd}` }} />
        </div>
      </div>

      {/* title */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', margin: '16px 2px 4px' }}>
        <div>
          <h1 style={{ font: `700 23px ${FONT}`, letterSpacing: '-.02em', color: T.tx, margin: 0 }}>{t.title}</h1>
          <div style={{ font: `500 12.5px ${FONT}`, color: T.tx3, marginTop: 3 }}>
            {t.monthMarch} · {t.pays} 28 Mar
          </div>
        </div>
      </div>

      {/* readiness hero */}
      <div
        style={{
          marginTop: 12,
          background: 'linear-gradient(135deg, rgba(52,211,153,.16), transparent)',
          border: `1px solid ${T.bd}`,
          borderRadius: 20,
          padding: 17,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, background: T.acc }} />
        <div style={{ font: `700 11px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3 }}>
          {t.readinessLabel}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 8 }}>
          <span style={{ font: `700 26px ${FONT}`, letterSpacing: '-.01em', color: T.posk }}>{t.runReady}</span>
          <span style={{ font: `600 13px ${FONT}`, color: T.tx2 }}>
            4 {t.of} 5 {t.countriesLower}
          </span>
        </div>
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {([T.acc, T.acc, T.acc, T.acc, T.warn] as const).map((c, i) => (
              <span key={i} style={{ flex: 1, height: 8, borderRadius: 99, background: c }} />
            ))}
          </div>
        </div>
        <div style={{ font: `500 12px ${FONT}`, color: T.tx3, marginTop: 11 }}>{t.oneNeedsReview}</div>
      </div>

      {/* totals grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
        <div style={{ background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 16, padding: 14 }}>
          <div style={{ font: `500 11px ${FONT}`, color: T.tx3 }}>{t.totalToPay}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 7 }}>
            <span style={{ font: `700 22px ${FONT}`, letterSpacing: '-.01em', color: T.tx }}>
              {crewFmt(locale, grandTotalConv, 0)}
            </span>
          </div>
          <div style={{ font: `500 11px ${FONT}`, color: T.tx3, marginTop: 4 }}>142 {t.peopleSuffix}</div>
        </div>
        <div style={{ background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 16, padding: 14 }}>
          <div style={{ font: `500 11px ${FONT}`, color: T.tx3 }}>{t.nextPayDate}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 7 }}>
            <span style={{ font: `700 22px ${FONT}`, letterSpacing: '-.01em', color: T.tx }}>28 Mar</span>
          </div>
          <div style={{ font: `500 11px ${FONT}`, color: T.tx3, marginTop: 4 }}>
            {t.inDays} 3 {t.daysSuffix}
          </div>
        </div>
      </div>

      {/* countries */}
      <div
        style={{
          font: `700 11px ${FONT}`,
          letterSpacing: '.09em',
          textTransform: 'uppercase',
          color: T.tx3,
          margin: '18px 2px 8px',
        }}
      >
        {t.countries}
      </div>
      <div style={{ background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 18, padding: 0 }}>
        {COUNTRIES.map((c, i) => {
          const ready = c.status === 'Ready';
          // GCC keeps its proper-noun name verbatim; others use the localized key.
          const name = c.nameLiteral ?? (c.nameKey ? t[c.nameKey] : '');
          const sub = c.subKey ? t[c.subKey] : `${c.people} ${t.peopleSuffix}`;
          const amount = c.gbp != null ? crewMoney(locale, c.gbp, 0) : '—';
          return (
            <div
              key={c.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                borderTop: i === 0 ? undefined : `1px solid ${T.bd}`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  flex: 1,
                  minWidth: 0,
                  padding: '13px 15px',
                }}
              >
                <span style={{ fontSize: 22, lineHeight: 1, flex: 'none' }}>{c.flag}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: `600 14px ${FONT}`, color: T.tx }}>{name}</div>
                  <div style={{ font: `500 11.5px ${FONT}`, color: c.subWarn ? T.warnk : T.tx3, marginTop: 2 }}>
                    {sub}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ font: `700 13px ${FONT}`, color: T.tx }}>{amount}</span>
                  <span
                    style={{
                      font: `700 10px ${FONT}`,
                      letterSpacing: '.04em',
                      textTransform: 'uppercase',
                      background: ready ? T.post : T.warnt,
                      color: ready ? T.posk : T.warnk,
                      borderRadius: 7,
                      padding: '5px 9px',
                      flex: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {ready ? t.ready : t.review}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* coverage pill */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}>
        <span
          style={{
            font: `500 11px ${FONT}`,
            color: T.tx3,
            background: T.surf2,
            border: `1px solid ${T.bd}`,
            borderRadius: 99,
            padding: '7px 14px',
            textAlign: 'center',
          }}
        >
          {t.coverage}
        </span>
      </div>

      {/* thumb-zone action */}
      <button
        style={{
          width: '100%',
          minHeight: 48,
          marginTop: 18,
          border: 'none',
          borderRadius: 14,
          background: T.acc,
          color: T.acck,
          font: `700 14px ${FONT}`,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        {t.reviewGcc}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M5 3l5 5-5 5" stroke={T.acck} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
