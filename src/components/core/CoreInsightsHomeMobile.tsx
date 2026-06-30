'use client';

/**
 * Faithful implementation of "01 · Insights Home — What changed" (Core /
 * Decision Intelligence phone mockups, DARK variant) from the Claude Design
 * source — an answer-first module-overview / landing: a 7-day verdict hero
 * (verdict word + colour + "just now"), a ranked feed of the biggest moves
 * (rank · metric · tone · ▲▼ magnitude · value), and the 12-module grid as the
 * index. Screen ends in an "Ask Sundae" CTA in the thumb zone. Same cool-slate
 * token set as the crew screens. Sits inside <PhoneFrame screenBg="#020617">.
 * Pure markup, no phone chrome (the PhoneFrame supplies status bar/notch/tabs).
 *
 * Source: claude.ai/design · Core mobile slice, "Insights Home" (dark variant).
 */

import { useCrewScreen } from '../crew/crewI18n';
import { crewMoney, crewCurrencyCode } from '../crew/crewCurrency';
import { LOC } from './locales/CoreInsightsHomeMobile.locales';

const EN = {
  scopeRange: '7 days',
  scopeDaypart: 'Dinner',
  stateOfBusiness: 'State of the business',
  greeting: 'Good evening, Dana',
  live: 'Live',
  verdictLabel: '7-day verdict',
  updatedJustNow: 'Updated just now',
  healthy: 'Healthy',
  verdictBody:
    'Revenue and profit are ahead of plan. Two areas want a look — delivery and labour — neither is urgent.',
  critical: 'critical',
  watch: 'watch',
  healthyCount: 'healthy',
  biggestChanges: 'Biggest changes',
  vsPrior: '7-day vs prior',
  deliveryOrders: 'Delivery orders',
  deliverySub: 'Talabat throttling · Marina',
  deliveryValue: 'ord',
  barRevenue: 'Bar revenue',
  barSub: 'Cocktail flight promo',
  labourPct: 'Labour %',
  labourSub: 'Drifting above 28% band',
  avgCheck: 'Avg check',
  avgCheckSub: 'Upsell on mains working',
  modules: 'Modules',
  modRevenue: 'Revenue',
  modLabor: 'Labor',
  modLaborDelta: '▲ 1.4pt · 29.4%',
  modInventory: 'Inventory',
  modInventoryDelta: 'On par · 2.1% waste',
  modPurchasing: 'Purchasing',
  modPurchasingDelta: '▼ 2.2% cost',
  modMarketing: 'Marketing',
  modMarketingDelta: '▲ 3.1x ROAS',
  modReservations: 'Reservations',
  modReservationsDelta: '92% seated',
  showAll: 'Show all 12 modules',
  askSundae: 'Ask Sundae about today',
} as const;

const T = {
  bg: '#020617',
  surf: '#0f172a',
  surf2: '#0b1424',
  bd: '#1e293b',
  tx: '#f1f5f9',
  tx2: '#94a3b8',
  tx3: '#64748b',
  pos: '#22c55e',
  posk: '#4ade80',
  post: 'rgba(34,197,94,.14)',
  warn: '#f59e0b',
  warnk: '#fbbf24',
  warnt: 'rgba(245,158,11,.14)',
  neg: '#ef4444',
  negk: '#f87171',
  negt: 'rgba(239,68,68,.16)',
  acc: '#34d399',
  acck: '#04140c',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

/** A scope filter chip (first chip is the active scope). */
function Chip({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: active ? 6 : 5,
        flex: 'none',
        height: 32,
        padding: '0 11px',
        borderRadius: 99,
        background: active ? T.post : T.surf,
        border: `1px solid ${active ? T.acc : T.bd}`,
        color: active ? T.acc : T.tx2,
        font: `600 12px ${FONT}`,
      }}
    >
      {active && (
        <span style={{ width: 7, height: 7, borderRadius: 2, background: T.acc, transform: 'rotate(45deg)' }} />
      )}
      {label}
    </span>
  );
}

/** A ranked "biggest change" row that lands in its module. */
function DeltaRow({
  rank,
  name,
  sub,
  accent,
  delta,
  deltaColor,
  value,
}: {
  rank: number;
  name: string;
  sub: string;
  accent: string;
  delta: string;
  deltaColor: string;
  value: string;
}) {
  return (
    <button
      type="button"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        textAlign: 'left',
        background: T.surf,
        border: `1px solid ${T.bd}`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: 14,
        padding: '12px 13px',
        cursor: 'pointer',
      }}
    >
      <span style={{ flex: 'none', width: 22, font: `700 13px ${FONT}`, color: T.tx3, textAlign: 'center' }}>{rank}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: `600 14.5px ${FONT}`, color: T.tx }}>{name}</div>
        <div style={{ font: `500 11.5px ${FONT}`, color: T.tx3, marginTop: 2 }}>{sub}</div>
      </div>
      <div style={{ flex: 'none', textAlign: 'right' }}>
        <div style={{ font: `700 15px ${FONT}`, color: deltaColor }}>{delta}</div>
        <div style={{ font: `500 11px ${FONT}`, color: T.tx3 }}>{value}</div>
      </div>
    </button>
  );
}

/** A 12-module-grid tile. */
function ModuleTile({
  icon,
  dot,
  name,
  delta,
  deltaColor,
}: {
  icon: React.ReactNode;
  dot: string;
  name: string;
  delta: string;
  deltaColor: string;
}) {
  return (
    <button
      type="button"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 9,
        background: T.surf,
        border: `1px solid ${T.bd}`,
        borderRadius: 15,
        padding: '13px 13px 14px',
        textAlign: 'left',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {icon}
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: dot }} />
      </div>
      <div>
        <div style={{ font: `600 13.5px ${FONT}`, color: T.tx }}>{name}</div>
        <div style={{ font: `600 11.5px ${FONT}`, color: deltaColor, marginTop: 2 }}>{delta}</div>
      </div>
    </button>
  );
}

export function CoreInsightsHomeMobile() {
  const { t, locale } = useCrewScreen(EN, LOC);
  const ccy = crewCurrencyCode(locale);

  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* scope filter chips */}
      <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 2 }}>
        <Chip label="Sundae Group · DIFC ▾" active />
        <Chip label="Marina Social ▾" />
        <Chip label={`${t.scopeRange} ▾`} />
        <Chip label={ccy} />
        <Chip label={`${t.scopeDaypart} ▾`} />
      </div>

      {/* heading row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
        <div>
          <div style={{ font: `600 11px ${FONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: T.tx3 }}>
            {t.stateOfBusiness}
          </div>
          <div style={{ font: `600 21px/1.2 ${FONT}`, color: T.tx, marginTop: 5 }}>{t.greeting}</div>
        </div>
        <button
          type="button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            height: 30,
            padding: '0 10px',
            borderRadius: 99,
            background: T.post,
            border: '1px solid transparent',
            color: T.posk,
            font: `600 11px ${FONT}`,
            cursor: 'pointer',
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: T.pos }} />
          {t.live} · 98%
        </button>
      </div>

      {/* verdict hero */}
      <div
        style={{
          marginTop: 14,
          borderRadius: 22,
          border: `1px solid ${T.bd}`,
          background: `linear-gradient(180deg,${T.post},transparent 70%),${T.surf}`,
          padding: '20px 18px 18px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ font: `600 11px ${FONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: T.tx3 }}>
            {t.verdictLabel}
          </span>
          <span style={{ font: `500 11px ${FONT}`, color: T.tx3 }}>{t.updatedJustNow}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 11, marginTop: 12 }}>
          <span style={{ font: `700 38px/1 ${FONT}`, letterSpacing: '-.025em', color: T.posk }}>{t.healthy}</span>
          <span style={{ font: `600 15px ${FONT}`, color: T.pos }}>▲ 6.4%</span>
        </div>
        <div style={{ font: `400 13.5px/1.5 ${FONT}`, color: T.tx2, marginTop: 8 }}>{t.verdictBody}</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 15 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              height: 28,
              padding: '0 11px',
              borderRadius: 9,
              background: T.negt,
              color: T.negk,
              font: `600 11px ${FONT}`,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.neg }} />1 {t.critical}
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              height: 28,
              padding: '0 11px',
              borderRadius: 9,
              background: T.warnt,
              color: T.warnk,
              font: `600 11px ${FONT}`,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.warn }} />2 {t.watch}
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              height: 28,
              padding: '0 11px',
              borderRadius: 9,
              background: T.post,
              color: T.posk,
              font: `600 11px ${FONT}`,
            }}
          >
            9 {t.healthyCount}
          </span>
        </div>
      </div>

      {/* biggest changes header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '22px 4px 11px' }}>
        <span style={{ font: `600 11px ${FONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: T.tx2 }}>
          {t.biggestChanges}
        </span>
        <span style={{ font: `600 11px ${FONT}`, color: T.tx3 }}>{t.vsPrior}</span>
      </div>

      {/* ranked biggest-changes feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        <DeltaRow
          rank={1}
          name={t.deliveryOrders}
          sub={t.deliverySub}
          accent={T.neg}
          delta="▼ 12%"
          deltaColor={T.negk}
          value={`1,840 ${t.deliveryValue}`}
        />
        <DeltaRow
          rank={2}
          name={t.barRevenue}
          sub={t.barSub}
          accent={T.pos}
          delta="▲ 18%"
          deltaColor={T.posk}
          value={crewMoney(locale, 20600)}
        />
        <DeltaRow
          rank={3}
          name={t.labourPct}
          sub={t.labourSub}
          accent={T.warn}
          delta="▲ 1.4pt"
          deltaColor={T.warnk}
          value="29.4%"
        />
        <DeltaRow
          rank={4}
          name={t.avgCheck}
          sub={t.avgCheckSub}
          accent={T.pos}
          delta="▲ 4.1%"
          deltaColor={T.posk}
          value={crewMoney(locale, 46)}
        />
      </div>

      {/* modules header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '24px 4px 11px' }}>
        <span style={{ font: `600 11px ${FONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: T.tx2 }}>
          {t.modules}
        </span>
        <span style={{ font: `600 11px ${FONT}`, color: T.tx3 }}>12</span>
      </div>

      {/* 12-module grid (6 shown + "show all") */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
        <ModuleTile
          dot={T.pos}
          name={t.modRevenue}
          delta={`▲ 6.4% · ${crewMoney(locale, 260000)}`}
          deltaColor={T.posk}
          icon={
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path d="M2 13l4-5 3 3 6-8" stroke={T.tx2} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />
        <ModuleTile
          dot={T.warn}
          name={t.modLabor}
          delta={t.modLaborDelta}
          deltaColor={T.warnk}
          icon={
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <circle cx="6" cy="6" r="2.4" stroke={T.tx2} strokeWidth="1.6" />
              <path d="M2 14a4.5 4.5 0 0 1 9 0" stroke={T.tx2} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          }
        />
        <ModuleTile
          dot={T.pos}
          name={t.modInventory}
          delta={t.modInventoryDelta}
          deltaColor={T.posk}
          icon={
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <rect x="3" y="3" width="11" height="11" rx="2" stroke={T.tx2} strokeWidth="1.6" />
              <path d="M3 7h11" stroke={T.tx2} strokeWidth="1.6" />
            </svg>
          }
        />
        <ModuleTile
          dot={T.pos}
          name={t.modPurchasing}
          delta={t.modPurchasingDelta}
          deltaColor={T.posk}
          icon={
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path d="M3 5h11l-1.4 7H4.4L3 5z" stroke={T.tx2} strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
          }
        />
        <ModuleTile
          dot={T.pos}
          name={t.modMarketing}
          delta={t.modMarketingDelta}
          deltaColor={T.posk}
          icon={
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path d="M3 8.5l11-5v10L3 8.5z" stroke={T.tx2} strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
          }
        />
        <ModuleTile
          dot={T.pos}
          name={t.modReservations}
          delta={t.modReservationsDelta}
          deltaColor={T.posk}
          icon={
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <rect x="3" y="4" width="11" height="10" rx="2" stroke={T.tx2} strokeWidth="1.6" />
              <path d="M6 2.5v3M11 2.5v3" stroke={T.tx2} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          }
        />
      </div>
      <button
        type="button"
        style={{
          marginTop: 10,
          width: '100%',
          minHeight: 44,
          border: `1px solid ${T.bd}`,
          borderRadius: 13,
          background: 'transparent',
          color: T.tx2,
          font: `600 12.5px ${FONT}`,
          cursor: 'pointer',
        }}
      >
        {t.showAll}
      </button>

      {/* Ask Sundae CTA (thumb zone) */}
      <button
        type="button"
        style={{
          marginTop: 18,
          width: '100%',
          minHeight: 52,
          border: 'none',
          borderRadius: 16,
          background: T.acc,
          color: T.acck,
          font: `700 15px ${FONT}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 9,
          boxShadow: '0 14px 30px -8px rgba(52,211,153,.45)',
          cursor: 'pointer',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M9 1.5l1.7 4.6 4.8.4-3.7 3 1.2 4.7L9 11.8 4.7 14.2l1.2-4.7L2.2 6.5l4.8-.4L9 1.5z"
            fill={T.acck}
          />
        </svg>
        {t.askSundae}
      </button>
    </div>
  );
}
