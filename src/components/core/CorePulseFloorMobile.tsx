'use client';

/**
 * Faithful implementation of "Pulse — Floor Mode" (DARK variant, "Glance" /
 * Watch state) from the Claude Design Core source — the default one-screen
 * Shift Snapshot: answer-first verdict (Watch · slightly behind pace), sales-pace
 * bar with target marker, top driver, next-best-action card, status chips, and an
 * expanded Watch alert + good-news / done rows. Same cool-slate token set as the
 * crew screens. Sits inside <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: Claude Design Core source · "core_pulse.html" · 02 · Pulse — Floor Mode · Glance (dark).
 */

import { useCrewScreen } from '../crew/crewI18n';
import { crewMoney } from '../crew/crewCurrency';
import { LOC } from './locales/CorePulseFloorMobile.locales';

const EN = {
  floorMode: 'Floor Mode',
  twoMinAgo: '2m ago',
  subtitle: 'Intraday Operations Monitor — detect, act, confirm within the shift.',
  shiftSnapshot: 'Shift snapshot',
  watch: 'Watch',
  dinnerBehind: 'Dinner · slightly behind pace',
  salesPace: 'Sales pace',
  topDriver: 'Top driver',
  topDriverText: 'Bar covers down 14% vs a typical Tuesday.',
  nextBestAction: 'Next best action',
  nextBestActionText: 'Move a server to the bar rail.',
  byClose: 'by close',
  doIt: 'Do it',
  critical: 'Critical',
  watchCount: 'Watch',
  good: 'Good',
  done: 'Done',
  watchTag: 'WATCH',
  bar: 'Bar',
  fourMinAgo: '4m ago',
  barCoversDown: 'Bar covers down 14%',
  whatToDo: 'What to do',
  whatToDoText: 'Pull a server from the patio to cover the bar rail through the 8 PM wave.',
  expectedImpact: 'Expected impact',
  expectedImpactText: 'in bar sales by close',
  acknowledge: 'Acknowledge',
  assign: 'Assign',
  snooze: 'Snooze',
  open: 'Open',
  goodNews: 'GOOD NEWS',
  dessertAttach: 'Dessert attach ▲ 9%',
  doneTag: 'DONE',
  compResolved: 'Comp issue resolved',
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
  negk: '#fca5a5',
  info: '#3b82f6',
  posk: '#4ade80',
  // extra tokens the design needs beyond the base set
  tx2b: '#cbd5e1', // brighter secondary text used in body copy
  txe: '#e2e8f0', // emphasised body text
  warnTrack0: '#b45309', // pace-bar gradient start (amber)
  greenSurf: '#0b1f1a', // next-best-action card bg
  greenBd: '#14532d', // green border
  greenTab: '#9ca3af', // "done" tag text
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

function StatusChip({ label, count, tone }: { label: string; count: number; tone: 'crit' | 'watch' | 'muted' }) {
  const styles: Record<string, React.CSSProperties> = {
    crit: { background: 'rgba(239,68,68,.14)', color: T.negk },
    watch: { background: 'rgba(245,158,11,.18)', color: T.warnk, border: '1px solid rgba(245,158,11,.45)' },
    muted: { background: T.surf, color: T.tx3 },
  };
  return (
    <span
      style={{
        flex: 1,
        textAlign: 'center',
        font: `600 11px ${FONT}`,
        borderRadius: 999,
        padding: '8px 4px',
        ...styles[tone],
      }}
    >
      {label} {count}
    </span>
  );
}

function ActionBtn({ label, primary }: { label: string; primary?: boolean }) {
  return (
    <button
      style={{
        flex: 1,
        minHeight: 46,
        border: 'none',
        borderRadius: 11,
        background: primary ? T.acc : T.bd,
        color: primary ? T.acck : T.tx2b,
        font: `${primary ? 700 : 600} 11.5px ${FONT}`,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}

function MiniRow({ tag, tagBg, tagColor, text }: { tag: string; tagBg: string; tagColor: string; text: string }) {
  return (
    <div
      style={{
        background: T.surf,
        border: `1px solid ${T.bd}`,
        borderRadius: 18,
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <span style={{ font: `700 10px ${FONT}`, letterSpacing: '.08em', background: tagBg, color: tagColor, borderRadius: 6, padding: '3px 7px' }}>
        {tag}
      </span>
      <span style={{ font: `600 14px ${FONT}`, color: T.txe }}>{text}</span>
      <span style={{ marginLeft: 'auto', font: `600 13px ${FONT}`, color: T.tx3 }}>›</span>
    </div>
  );
}

export function CorePulseFloorMobile() {
  const { t, locale } = useCrewScreen(EN, LOC);
  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* title row */}
      <div style={{ padding: '4px 4px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ font: `600 22px ${FONT}`, color: T.tx }}>{t.floorMode}</span>
          <span style={{ font: `500 11px ${FONT}`, color: '#475569' }}>{t.twoMinAgo}</span>
        </div>
        <div style={{ font: `400 12px ${FONT}`, lineHeight: 1.45, color: T.tx3, marginTop: 4 }}>{t.subtitle}</div>
      </div>

      {/* shift snapshot card */}
      <div style={{ marginTop: 14, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 20, padding: 18 }}>
        <div style={{ font: `600 11px ${FONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: T.tx3 }}>{t.shiftSnapshot}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
          <span style={{ font: `700 13px ${FONT}`, letterSpacing: '.03em', textTransform: 'uppercase', background: 'rgba(245,158,11,.16)', color: T.warnk, borderRadius: 9, padding: '7px 13px' }}>
            {t.watch}
          </span>
          <span style={{ font: `500 13px ${FONT}`, color: T.tx2 }}>{t.dinnerBehind}</span>
        </div>

        {/* sales pace bar */}
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', font: `600 11px ${FONT}`, letterSpacing: '.04em', textTransform: 'uppercase', color: T.tx3 }}>
            <span>{t.salesPace}</span>
            <span style={{ color: T.tx2b }}>
              {crewMoney(locale, 8280)} / {crewMoney(locale, 9000)} · 92%
            </span>
          </div>
          <div style={{ marginTop: 8, height: 9, borderRadius: 99, background: T.bd, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '92%', background: `linear-gradient(90deg, ${T.warnTrack0}, ${T.warnk})`, borderRadius: 99 }} />
          </div>
          <div style={{ position: 'relative', height: 0 }}>
            <div style={{ position: 'absolute', top: -13, left: '100%', width: 2, height: 13, background: '#e2e8f0' }} />
          </div>
        </div>

        {/* top driver */}
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${T.bd}` }}>
          <div style={{ font: `600 10px ${FONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: T.tx3 }}>{t.topDriver}</div>
          <div style={{ font: `500 13.5px ${FONT}`, lineHeight: 1.45, color: T.txe, marginTop: 3 }}>{t.topDriverText}</div>
        </div>

        {/* next best action */}
        <div style={{ marginTop: 12, background: T.greenSurf, border: `1px solid ${T.greenBd}`, borderRadius: 14, padding: '12px 14px' }}>
          <div style={{ font: `600 10px ${FONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: T.posk }}>{t.nextBestAction}</div>
          <div style={{ font: `500 13.5px ${FONT}`, lineHeight: 1.45, color: T.txe, marginTop: 3 }}>{t.nextBestActionText}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 11 }}>
            <span style={{ font: `600 12px ${FONT}`, color: T.acc }}>+{crewMoney(locale, 420)} {t.byClose}</span>
            <button style={{ minHeight: 40, border: 'none', borderRadius: 10, background: T.acc, color: T.acck, font: `700 12px ${FONT}`, padding: '0 16px', cursor: 'pointer' }}>
              {t.doIt}
            </button>
          </div>
        </div>
      </div>

      {/* status chips */}
      <div style={{ display: 'flex', gap: 7, margin: '20px 0 12px' }}>
        <StatusChip label={t.critical} count={1} tone="crit" />
        <StatusChip label={t.watchCount} count={2} tone="watch" />
        <StatusChip label={t.good} count={3} tone="muted" />
        <StatusChip label={t.done} count={4} tone="muted" />
      </div>

      {/* expanded WATCH alert */}
      <div style={{ background: T.surf, border: '1px solid rgba(245,158,11,.35)', borderRadius: 18, overflow: 'hidden', marginBottom: 12 }}>
        <div style={{ padding: '14px 16px 13px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ font: `700 10px ${FONT}`, letterSpacing: '.08em', background: 'rgba(245,158,11,.14)', color: T.warnk, borderRadius: 6, padding: '3px 7px' }}>{t.watchTag}</span>
            <span style={{ font: `600 11px ${FONT}`, letterSpacing: '.06em', textTransform: 'uppercase', color: T.tx3 }}>{t.bar}</span>
            <span style={{ marginLeft: 'auto', font: `500 11px ${FONT}`, color: '#475569' }}>{t.fourMinAgo}</span>
          </div>
          <div style={{ font: `600 16px ${FONT}`, color: T.tx, marginTop: 10 }}>{t.barCoversDown}</div>
          <div style={{ marginTop: 14, paddingTop: 13, borderTop: `1px solid ${T.bd}` }}>
            <div style={{ font: `600 10px ${FONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: T.tx3 }}>{t.whatToDo}</div>
            <div style={{ font: `400 13px ${FONT}`, lineHeight: 1.5, color: T.tx2b, marginTop: 3 }}>{t.whatToDoText}</div>
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ font: `600 10px ${FONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: T.tx3 }}>{t.expectedImpact}</div>
            <div style={{ font: `600 14px ${FONT}`, color: T.acc, marginTop: 3 }}>+{crewMoney(locale, 420)} {t.expectedImpactText}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, padding: '11px 12px 13px', borderTop: `1px solid ${T.bd}`, background: T.surf2 }}>
          <ActionBtn label={t.acknowledge} />
          <ActionBtn label={t.assign} primary />
          <ActionBtn label={t.snooze} />
          <ActionBtn label={t.open} />
        </div>
      </div>

      {/* good news row */}
      <div style={{ marginBottom: 12 }}>
        <MiniRow tag={t.goodNews} tagBg="rgba(34,197,94,.14)" tagColor={T.posk} text={t.dessertAttach} />
      </div>

      {/* done row */}
      <MiniRow tag={t.doneTag} tagBg="rgba(107,114,128,.18)" tagColor={T.greenTab} text={t.compResolved} />
    </div>
  );
}
