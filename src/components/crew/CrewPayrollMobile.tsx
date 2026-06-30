'use client';

/**
 * Faithful implementation of "Crew Payroll · My Pay (employee)" from the Claude
 * Design project (Sundae Mobile PWA · Crew · Payroll) — net-pay hero, deductions
 * breakdown, year-to-date. Same cool-slate token set as the scheduling design.
 * Sits inside <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: claude.ai/design 9d73e488 · "Sundae Crew Payroll.dc.html" (My Pay).
 */

import { useCrewScreen } from './crewI18n';
import { crewConv, crewFmt, crewMoney, crewCurrencyCode } from './crewCurrency';
import { LOC } from './locales/CrewPayrollMobile.locales';

const EN = {
  myPay: 'My Pay',
  paidMonthly: 'Paid monthly',
  netPay: 'Net pay',
  march: 'March',
  paid: 'Paid',
  breakdown: 'Breakdown',
  grossPay: 'Gross pay',
  tax: 'Tax',
  pension: 'Pension',
  ytdGross: 'YTD gross',
  ytdTax: 'YTD tax',
  ytdNet: 'YTD net',
  downloadPayslip: 'Download payslip',
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
  pos: '#34d399',
  neg: '#f87171',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

function Row({ k, v, neg, bold }: { k: string; v: string; neg?: boolean; bold?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ font: `${bold ? 600 : 500} 11.5px ${FONT}`, color: bold ? T.tx : T.tx2 }}>{k}</span>
      <span style={{ font: `700 11.5px ${FONT}`, color: bold ? T.pos : neg ? T.neg : T.tx }}>{v}</span>
    </div>
  );
}

export function CrewPayrollMobile() {
  const { t, locale } = useCrewScreen(EN, LOC);
  const currencyCode = crewCurrencyCode(locale);
  const isGbp = currencyCode === 'GBP';
  const dec = isGbp ? 2 : 0;

  // Sum integrity (gross − tax − pension = net): derive net from converted parts.
  const grossC = crewConv(locale, 3240);
  const taxC = crewConv(locale, 612.4);
  const pensionC = crewConv(locale, 129.6);
  const netC = grossC - taxC - pensionC;

  // Year-to-date (gross − tax = net): derive net from converted parts.
  const ytdGrossC = crewConv(locale, 8720);
  const ytdTaxC = crewConv(locale, 1634);
  const ytdNetC = ytdGrossC - ytdTaxC;

  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 16px 16px' }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 999, padding: '5px 10px 5px 5px' }}>
          <span style={{ width: 20, height: 20, borderRadius: 6, background: T.acc, color: T.acck, font: `800 10px ${FONT}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>S</span>
          <span style={{ font: `600 12px ${FONT}`, color: T.tx }}>Sundae — DIFC</span>
          <svg width="11" height="11" viewBox="0 0 15 15" fill="none"><path d="M4 6l3.5 3.5L11 6" stroke={T.tx3} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M5 8a5 5 0 0110 0c0 4 1.5 5 1.5 5h-13S5 12 5 8z" stroke={T.tx2} strokeWidth="1.5" strokeLinejoin="round" /><path d="M8.5 16a1.6 1.6 0 003 0" stroke={T.tx2} strokeWidth="1.5" /></svg>
          <span style={{ width: 26, height: 26, borderRadius: '50%', background: T.surf2, border: `1px solid ${T.bd}` }} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '14px 2px 0' }}>
        <span style={{ font: `700 20px ${FONT}`, letterSpacing: '-.02em' }}>{t.myPay}</span>
        <span style={{ font: `500 11px ${FONT}`, color: T.tx3 }}>{t.paidMonthly} · {currencyCode}</span>
      </div>

      {/* net pay hero */}
      <div style={{ marginTop: 12, background: `linear-gradient(135deg, rgba(52,211,153,.18), transparent)`, border: `1px solid ${T.bd}`, borderRadius: 18, padding: 15, position: 'relative', overflow: 'hidden' }}>
        <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: T.acc }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ font: `700 10px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3 }}>{t.netPay} · {t.march}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 8, padding: '3px 7px', font: `600 10px ${FONT}`, color: T.tx2 }}>{currencyCode}</span>
        </div>
        <div style={{ font: `700 28px ${FONT}`, letterSpacing: '-.02em', marginTop: 8 }}>{crewFmt(locale, netC, dec)}</div>
        <div style={{ marginTop: 10 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(52,211,153,.14)', borderRadius: 8, padding: '4px 9px', font: `600 10.5px ${FONT}`, color: '#4ade80' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.acc }} /> {t.paid} · 28 Mar
          </span>
        </div>
      </div>

      {/* deductions breakdown */}
      <div style={{ marginTop: 13, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 16, padding: 14 }}>
        <div style={{ font: `700 10px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3, marginBottom: 11 }}>{t.breakdown}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <Row k={t.grossPay} v={crewFmt(locale, grossC, dec)} />
          <Row k={t.tax} v={`−${crewFmt(locale, taxC, dec)}`} neg />
          <Row k={t.pension} v={`−${crewFmt(locale, pensionC, dec)}`} neg />
          <div style={{ height: 1, background: T.bd, margin: '3px 0' }} />
          <Row k={t.netPay} v={crewFmt(locale, netC, dec)} bold />
        </div>
      </div>

      {/* year to date */}
      <div style={{ marginTop: 13, display: 'flex', gap: 8 }}>
        {[
          { k: t.ytdGross, v: crewMoney(locale, 8720, 0) },
          { k: t.ytdTax, v: crewMoney(locale, 1634, 0) },
          { k: t.ytdNet, v: crewFmt(locale, ytdNetC, 0) },
        ].map((s) => (
          <div key={s.k} style={{ flex: 1, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 13, padding: '11px 10px', textAlign: 'center' }}>
            <div style={{ font: `600 9px ${FONT}`, letterSpacing: '.06em', textTransform: 'uppercase', color: T.tx3 }}>{s.k}</div>
            <div style={{ font: `700 14px ${FONT}`, marginTop: 4 }}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* thumb-zone action */}
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 38, borderRadius: 12, background: T.acc, color: T.acck, font: `700 12.5px ${FONT}` }}>
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 2v8m0 0l3-3m-3 3L5 7M3 13h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        {t.downloadPayslip}
      </div>
    </div>
  );
}
