'use client';

/**
 * Faithful implementation of "Core · Foresight — Tonight's close" (the "Glance"
 * dark frame) from the Claude Design source: projected-vs-target gauge with a
 * confidence read, a "why this projection" note, and one recommended move with
 * snooze / brief-the-floor actions. Same cool-slate token set as the scheduling
 * + crew designs. Sits inside <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: claude.ai/design 9d73e488 · Foresight screen, dark "Glance" variant.
 */

import { useCrewScreen } from '../crew/crewI18n';
import { crewMoney } from '../crew/crewCurrency';
import { LOC } from './locales/CoreForesightMobile.locales';

const EN = {
  foresight: 'Foresight',
  tonightsClose: "· Tonight's close",
  projectedClose: 'Projected close · Net Revenue',
  target: 'Target',
  underTarget: 'under target',
  confidence: 'Confidence',
  high: 'High',
  whyProjection: 'Why this projection',
  whyBody:
    'Covers tracking to plan, but average check is softer than last Tuesday. Dessert attach is the swing factor.',
  recommendedAction: 'Recommended action',
  actionTitle: 'Push dessert & coffee specials',
  actionBody:
    'Brief servers to upsell dessert on remaining tables this seating.',
  closesTheGap: 'projected — closes the gap',
  snooze: 'Snooze',
  briefTheFloor: 'Brief the floor',
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
  warn: '#f59e0b',
  warnk: '#fbbf24',
  neg: '#f87171',
  info: '#3b82f6',
  // extra tokens the design needs
  posk: '#4ade80',
  cardTx: '#cbd5e1',
  actBg: '#0b1f1a',
  actBd: '#14532d',
  actBody: '#a7b6c2',
  actFootBg: '#08160f',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

export function CoreForesightMobile() {
  const { t, locale } = useCrewScreen(EN, LOC);
  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* status row: time + battery */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 12px 4px' }}>
        <span style={{ font: `600 14px ${FONT}`, color: T.tx }}>7:55</span>
        <span style={{ position: 'relative', display: 'inline-block', width: 22, height: 11, border: `1.4px solid ${T.tx2}`, borderRadius: 3 }}>
          <span style={{ position: 'absolute', top: 1.5, left: 1.5, bottom: 1.5, width: 13, background: T.acc, borderRadius: 1 }} />
        </span>
      </div>

      {/* title row: back chevron + Foresight + subtitle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 4px 2px' }}>
        <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
          <path d="M7 2L2 8l5 6" stroke={T.tx3} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ font: `600 18px ${FONT}`, color: T.tx }}>{t.foresight}</span>
        <span style={{ font: `500 12px ${FONT}`, color: T.tx3, marginTop: 3 }}>{t.tonightsClose}</span>
      </div>

      {/* projected-close gauge card */}
      <div style={{ marginTop: 6, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 22, padding: '20px 18px 18px' }}>
        <div style={{ textAlign: 'center', font: `600 11px ${FONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: T.tx3 }}>
          {t.projectedClose}
        </div>
        <div style={{ position: 'relative', width: 220, height: 128, margin: '14px auto 0' }}>
          <svg width="220" height="124" viewBox="0 0 220 124" fill="none">
            <path d="M22 110 A 88 88 0 0 1 198 110" stroke={T.bd} strokeWidth="16" strokeLinecap="round" />
            <path d="M22 110 A 88 88 0 0 1 198 110" stroke={T.warnk} strokeWidth="16" strokeLinecap="round" strokeDasharray="223 400" />
          </svg>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 6, textAlign: 'center' }}>
            <div style={{ font: `700 32px ${FONT}`, letterSpacing: '-.02em', color: T.tx, lineHeight: 1 }}>{crewMoney(locale, 13800)}</div>
            <div style={{ font: `500 12px ${FONT}`, color: T.tx3, marginTop: 4 }}>{t.target} {crewMoney(locale, 14200)}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 8 }}>
          <span style={{ font: `600 14px ${FONT}`, color: T.warnk }}>▼ {crewMoney(locale, 400)} {t.underTarget}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 14 }}>
          <span style={{ font: `600 11px ${FONT}`, letterSpacing: '.06em', textTransform: 'uppercase', color: T.tx3 }}>{t.confidence}</span>
          <span style={{ font: `700 11px ${FONT}`, letterSpacing: '.04em', textTransform: 'uppercase', background: 'rgba(34,197,94,.16)', color: T.posk, borderRadius: 8, padding: '5px 11px' }}>{t.high}</span>
        </div>
      </div>

      {/* why this projection */}
      <div style={{ marginTop: 14, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 18, padding: '14px 16px' }}>
        <div style={{ font: `600 10px ${FONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: T.tx3 }}>{t.whyProjection}</div>
        <div style={{ font: `400 13px/1.5 ${FONT}`, color: T.cardTx, marginTop: 5 }}>{t.whyBody}</div>
      </div>

      {/* recommended action */}
      <div style={{ marginTop: 14, background: T.actBg, border: `1px solid ${T.actBd}`, borderRadius: 18, overflow: 'hidden' }}>
        <div style={{ padding: '15px 16px 14px' }}>
          <div style={{ font: `600 10px ${FONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: T.posk }}>{t.recommendedAction}</div>
          <div style={{ font: `600 16px ${FONT}`, color: T.tx, marginTop: 6 }}>{t.actionTitle}</div>
          <div style={{ font: `400 13px/1.5 ${FONT}`, color: T.actBody, marginTop: 5 }}>{t.actionBody}</div>
          <div style={{ font: `600 14px ${FONT}`, color: T.acc, marginTop: 10 }}>+{crewMoney(locale, 380)} {t.closesTheGap}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, padding: '11px 14px 13px', borderTop: `1px solid ${T.actBd}`, background: T.actFootBg }}>
          <button style={{ flex: 1, minHeight: 46, border: `1px solid ${T.bd}`, borderRadius: 12, background: 'transparent', color: T.cardTx, font: `600 13px ${FONT}`, cursor: 'pointer' }}>{t.snooze}</button>
          <button style={{ flex: 2, minHeight: 46, border: 'none', borderRadius: 12, background: T.acc, color: T.acck, font: `700 13px ${FONT}`, cursor: 'pointer' }}>{t.briefTheFloor}</button>
        </div>
      </div>
    </div>
  );
}
