'use client';

/**
 * Faithful implementation of "Crew People & HR · Time off (employee)" from the
 * Claude Design project — balance hero, requests (approved/pending), request
 * action. Same cool-slate token set as the scheduling design. Sits inside
 * <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: claude.ai/design 9d73e488 · "Sundae Crew People - HR.dc.html" (Time off).
 */

import { useCrewScreen } from './crewI18n';
import { LOC } from './locales/CrewTimeOffMobile.locales';

const EN = {
  title: 'Time off',
  subtitle: 'Your balance & requests',
  balanceLabel: 'Balance',
  daysLeft: 'days left',
  annual: 'Annual',
  sick: 'Sick',
  daysUnit: 'days',
  dayUnit: 'day',
  requestsLabel: 'Your requests',
  annualLeave: 'Annual leave',
  approved: 'Approved',
  pending: 'Pending',
  requestCta: 'Request time off',
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
  posk: '#4ade80',
  post: 'rgba(52,211,153,.14)',
  warn: '#f59e0b',
  warnk: '#fbbf24',
  warnt: 'rgba(245,158,11,.14)',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

function Request({ dot, when, detail, status, tone, tonet }: { dot: string; when: string; detail: string; status: string; tone: string; tonet: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 14, padding: '11px 12px' }}>
      <span style={{ width: 22, height: 22, borderRadius: '50%', background: tonet, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot }} />
      </span>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ font: `700 12.5px ${FONT}`, color: T.tx }}>{when}</div>
        <div style={{ font: `500 10.5px ${FONT}`, color: T.tx3, marginTop: 1 }}>{detail}</div>
      </div>
      <span style={{ font: `700 9px ${FONT}`, letterSpacing: '.04em', textTransform: 'uppercase', background: tonet, color: tone, borderRadius: 7, padding: '4px 8px', flex: 'none' }}>{status}</span>
    </div>
  );
}

export function CrewTimeOffMobile() {
  const { t } = useCrewScreen(EN, LOC);
  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
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

      <div style={{ margin: '14px 2px 0' }}>
        <div style={{ font: `700 20px ${FONT}`, letterSpacing: '-.02em' }}>{t.title}</div>
        <div style={{ font: `500 11px ${FONT}`, color: T.tx3, marginTop: 2 }}>{t.subtitle}</div>
      </div>

      {/* balance hero */}
      <div style={{ marginTop: 12, background: `linear-gradient(135deg, rgba(52,211,153,.16), transparent)`, border: `1px solid ${T.bd}`, borderRadius: 18, padding: 15, position: 'relative', overflow: 'hidden' }}>
        <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: T.acc }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ font: `700 10px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3 }}>{t.balanceLabel}</span>
          <span style={{ font: `600 10px ${FONT}`, color: T.tx2, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 8, padding: '3px 8px' }}>2026</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 7 }}>
          <span style={{ font: `700 30px ${FONT}`, letterSpacing: '-.02em' }}>12.5</span>
          <span style={{ font: `600 13px ${FONT}`, color: T.tx2 }}>{t.daysLeft}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <div style={{ flex: 1, background: T.surf2, border: `1px solid ${T.bd}`, borderRadius: 11, padding: '9px 11px' }}>
            <div style={{ font: `500 10px ${FONT}`, color: T.tx3 }}>{t.annual}</div>
            <div style={{ font: `700 14px ${FONT}`, marginTop: 2 }}>10 {t.daysUnit}</div>
          </div>
          <div style={{ flex: 1, background: T.surf2, border: `1px solid ${T.bd}`, borderRadius: 11, padding: '9px 11px' }}>
            <div style={{ font: `500 10px ${FONT}`, color: T.tx3 }}>{t.sick}</div>
            <div style={{ font: `700 14px ${FONT}`, marginTop: 2 }}>2.5 {t.daysUnit}</div>
          </div>
        </div>
      </div>

      {/* requests */}
      <div style={{ font: `700 10px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3, margin: '16px 2px 9px' }}>{t.requestsLabel}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        <Request dot={T.pos} when="14–16 Apr" detail={`3 ${t.daysUnit} · ${t.annualLeave}`} status={t.approved} tone={T.posk} tonet={T.post} />
        <Request dot={T.warn} when="2 May" detail={`1 ${t.dayUnit} · ${t.annualLeave}`} status={t.pending} tone={T.warnk} tonet={T.warnt} />
      </div>

      {/* thumb-zone action */}
      <div style={{ marginTop: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, minHeight: 38, borderRadius: 12, background: T.acc, color: T.acck, font: `700 12.5px ${FONT}` }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
        {t.requestCta}
      </div>
    </div>
  );
}
