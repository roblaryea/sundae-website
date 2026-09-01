'use client';

/**
 * Faithful implementation of "Sundae Crew Payroll · B · Payslip detail (employee)"
 * from the Claude Design project (Sundae Mobile PWA · Crew · Payroll) — DARK variant.
 * Earnings → deductions → employer contributions → net-pay verdict, with a period
 * selector in the header. Same cool-slate token set as CrewPayrollMobile.
 * Sits inside <PhoneFrame screenBg="#020617">. Pure markup, no props.
 *
 * Source: claude.ai/design 9d73e488 · "Sundae Crew Payroll.dc.html" · B · Payslip detail.
 */

import { useCrewScreen } from './crewI18n';
import { crewConv, crewFmt, crewMoney } from './crewCurrency';
import { LOC } from './locales/CrewPayslipDetailMobile.locales';

const EN = {
  title: 'Payslip',
  paysPrefix: 'pays',
  earnings: 'Earnings',
  basicSalary: 'Basic salary',
  overtime: 'Overtime',
  serviceCharge: 'Service charge',
  grossPay: 'Gross pay',
  deductions: 'Deductions',
  incomeTax: 'Income tax',
  pension: 'Pension',
  totalDeductions: 'Total deductions',
  employerContributions: 'Employer contributions',
  nationalInsurance: 'National insurance',
  netPay: 'Net pay',
  downloadPdf: 'Download PDF',
};

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
  posk: '#4ade80',
  neg: '#f87171',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

function LineRow({ k, v, neg, total }: { k: string; v: string; neg?: boolean; total?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: total ? '9px 0 2px' : '9px 0',
      }}
    >
      <span style={{ font: `${total ? 700 : 500} 13.5px ${FONT}`, color: total ? T.tx : T.tx2 }}>{k}</span>
      <span style={{ font: `700 ${total ? 15 : 14}px ${FONT}`, color: neg ? T.neg : T.tx }}>{v}</span>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 12, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 18, padding: '4px 16px 12px' }}>
      <div style={{ font: `700 11px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3, padding: '2px 0' }}>{title}</div>
      {children}
    </div>
  );
}

export function CrewPayslipDetailMobile() {
  const { t, locale } = useCrewScreen(EN, LOC);

  // Sum integrity: convert each GBP line to the locale's currency, then derive
  // gross / total-deductions / net from the converted parts (never convert a
  // total independently) so the payslip reconciles after FX conversion.
  const basicC = crewConv(locale, 2800);
  const overtimeC = crewConv(locale, 280);
  const serviceC = crewConv(locale, 160);
  const grossC = basicC + overtimeC + serviceC;

  const incomeTaxC = crewConv(locale, 612);
  const pensionDedC = crewConv(locale, 130);
  const totalDedC = incomeTaxC + pensionDedC;

  const netC = grossC - totalDedC;

  // For GBP we keep the design's 2 decimals; converted currencies show whole
  // units (crewMoney handles that). Compose totals with crewFmt off the
  // derived integers so they exactly equal the sum of their line items.
  const isGbp = locale === 'en';
  const fmtTotal = (value: number, gbp: number) => (isGbp ? crewMoney(locale, gbp, 2) : crewFmt(locale, value, 0));
  const neg = (s: string) => `−${s}`;

  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* header: back · title · period selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '2px 2px 0' }}>
        <button
          style={{
            width: 36,
            height: 36,
            borderRadius: 11,
            background: T.surf,
            border: `1px solid ${T.bd}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flex: 'none',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M9 3L5 7.5l4 4.5" stroke={T.tx2} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div style={{ font: `700 16px ${FONT}`, color: T.tx, flex: 1, minWidth: 0 }}>{t.title}</div>
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: T.surf,
            border: `1px solid ${T.bd}`,
            borderRadius: 99,
            padding: '7px 13px',
            font: `600 12px ${FONT}`,
            color: T.tx,
            cursor: 'pointer',
            flex: 'none',
          }}
        >
          March 2026 <span style={{ color: T.tx3 }}>▾</span>
        </button>
      </div>

      {/* sub-line */}
      <div style={{ margin: '14px 2px 2px' }}>
        <div style={{ font: `500 12px ${FONT}`, color: T.tx3 }}>Sundae UK Ltd · {t.paysPrefix} 28 Mar</div>
      </div>

      {/* earnings */}
      <SectionCard title={t.earnings}>
        <LineRow k={t.basicSalary} v={crewMoney(locale, 2800, 2)} />
        <LineRow k={`${t.overtime} · 8h`} v={crewMoney(locale, 280, 2)} />
        <LineRow k={t.serviceCharge} v={crewMoney(locale, 160, 2)} />
        <div style={{ height: 1, background: T.bd, margin: '2px 0' }} />
        <LineRow k={t.grossPay} v={fmtTotal(grossC, 3240)} total />
      </SectionCard>

      {/* deductions */}
      <SectionCard title={t.deductions}>
        <LineRow k={t.incomeTax} v={neg(crewMoney(locale, 612, 2))} neg />
        <LineRow k={`${t.pension} · 4%`} v={neg(crewMoney(locale, 130, 2))} neg />
        <div style={{ height: 1, background: T.bd, margin: '2px 0' }} />
        <LineRow k={t.totalDeductions} v={neg(fmtTotal(totalDedC, 742))} neg total />
      </SectionCard>

      {/* employer contributions */}
      <SectionCard title={t.employerContributions}>
        <LineRow k={`${t.pension} · 5%`} v={crewMoney(locale, 162, 2)} />
        <LineRow k={t.nationalInsurance} v={crewMoney(locale, 298, 2)} />
      </SectionCard>

      {/* net pay verdict */}
      <div
        style={{
          marginTop: 12,
          background: 'linear-gradient(135deg, rgba(52,211,153,.18), transparent)',
          border: `1px solid ${T.bd}`,
          borderRadius: 20,
          padding: '16px 17px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, background: T.acc }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ font: `700 13px ${FONT}`, letterSpacing: '.04em', textTransform: 'uppercase', color: T.posk }}>{t.netPay}</span>
          <span style={{ font: `700 26px ${FONT}`, letterSpacing: '-.01em', color: T.posk }}>{fmtTotal(netC, 2498)}</span>
        </div>
      </div>

      {/* download action */}
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
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {t.downloadPdf}
      </button>
    </div>
  );
}
