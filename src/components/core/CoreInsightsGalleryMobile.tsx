'use client';

/**
 * Faithful implementation of "06 · Chart-type system — instantiated"
 * (portrait · Dark variant) from the Claude Design Core / Decision Intelligence
 * phone mockups — a scrollable gallery showing each desktop chart type
 * re-rendered mobile-native (touch, not shrunk). Seven cards, each badged with
 * its rendering rule: Donut + legend, Combo, Scatter · quadrant,
 * Waterfall · vertical, Funnel · vertical, Sankey · flow list, Gauge · radial.
 * Charts are recreated with divs/SVG/conic-gradient as the design does. Same
 * cool-slate token set as the crew screens. Sits inside
 * <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: claude.ai/design · Core mobile slice, Row 06 "Chart-type gallery"
 * (portrait · Dark variant).
 */

import { useCrewScreen } from '../crew/crewI18n';
import { crewConv, crewCurrencyCode } from '../crew/crewCurrency';
import { LOC } from './locales/CoreInsightsGalleryMobile.locales';

const EN = {
  screenTitle: 'Mobile chart system',
  screenSub: '7 desktop types, re-rendered for touch',

  cardDonutTitle: 'Sales by channel',
  badgeDonut: 'Donut + legend',
  legendDineIn: 'Dine-in',
  legendBar: 'Bar',
  legendDelivery: 'Delivery',
  legendTakeaway: 'Takeaway',

  cardComboTitle: 'Covers vs labour %',
  badgeCombo: 'Combo',
  legendCovers: 'Covers',
  legendLabour: 'Labour %',
  secondAxis: '2nd axis ▾',

  cardScatterTitle: 'Item margin vs volume',
  badgeScatter: 'Scatter · quadrant',
  quadStars: 'Stars',
  quadDrop: 'Drop?',
  pointTruffle: 'Truffle pizza',
  axisLowVolume: 'low volume',
  axisHighVolume: 'high volume →',

  cardWaterfallTitle: 'Profit bridge',
  badgeWaterfall: 'Waterfall · vertical',
  rowRevenue: 'Revenue',
  rowCogs: '− COGS',
  rowLabour: '− Labour',
  rowProfit: 'Profit',

  cardFunnelTitle: 'Reservation funnel',
  badgeFunnel: 'Funnel · vertical',
  funnelViews: 'Views',
  funnelStarted: 'Started',
  funnelBooked: 'Booked',

  cardSankeyTitle: 'Where guests come from',
  badgeSankey: 'Sankey · flow list',
  flowBooked: 'Booked',
  flowWalkIn: 'Walk-in',
  expandFullFlow: 'Expand full flow ⤢',

  cardGaugeTitle: 'Food cost vs target',
  badgeGauge: 'Gauge · radial',
  gaugeTarget: 'target 28% · ▲ 3.2pt',
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
  posk: '#4ade80',
  info: '#3b82f6',
  infok: '#60a5fa',
  infot: 'rgba(59,130,246,.16)',
  warn: '#f59e0b',
  warnk: '#fbbf24',
  neg: '#ef4444',
  negk: '#f87171',
  violet: '#8b5cf6',
  track: '#1e293b',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

function Card({ title, badge, children }: { title: string; badge: string; children: React.ReactNode }) {
  return (
    <div style={{ background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 16, padding: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ font: `600 13px ${FONT}`, color: T.tx }}>{title}</span>
        <span
          style={{
            font: `600 9.5px ${FONT}`,
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            color: T.info,
            background: T.infot,
            borderRadius: 6,
            padding: '3px 7px',
          }}
        >
          {badge}
        </span>
      </div>
      {children}
    </div>
  );
}

export function CoreInsightsGalleryMobile() {
  const { t, locale } = useCrewScreen(EN, LOC);
  const ccy = crewCurrencyCode(locale);

  // Waterfall figures: AED in the design → authored as GBP integers, converted
  // at runtime. Profit is derived from converted parts so the column reconciles.
  const revGbp = 259700; // ≈ 1.21M AED
  const cogsGbp = 109000; // ≈ 508k AED
  const labourGbp = 76400; // ≈ 356k AED
  const revLoc = crewConv(locale, revGbp);
  const cogsLoc = crewConv(locale, cogsGbp);
  const labourLoc = crewConv(locale, labourGbp);
  const profitLoc = revLoc - cogsLoc - labourLoc; // ≈ 346k AED

  // Compact, locale-currency formatting for the abbreviated magnitudes (1.21M / 508k).
  const compact = (value: number) =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: ccy,
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(value);
  // Bare compact number (donut center shows the magnitude with the currency code beneath).
  const compactNum = (value: number) =>
    new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 2 }).format(value);

  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* screen header */}
      <div style={{ padding: '2px 2px 12px', borderBottom: `1px solid ${T.bd}` }}>
        <div style={{ font: `700 16px ${FONT}`, color: T.tx }}>{t.screenTitle}</div>
        <div style={{ font: `500 11px ${FONT}`, color: T.tx3, marginTop: 2 }}>{t.screenSub}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
        {/* 1 · Donut + legend */}
        <Card title={t.cardDonutTitle} badge={t.badgeDonut}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                flex: 'none',
                width: 92,
                height: 92,
                borderRadius: '50%',
                background: `conic-gradient(${T.acc} 0 42%, ${T.info} 42% 67%, ${T.violet} 67% 85%, ${T.warn} 85% 100%)`,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 17,
                  borderRadius: '50%',
                  background: T.surf,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ font: `700 14px ${FONT}`, color: T.tx }}>{compactNum(revLoc)}</span>
                <span style={{ font: `500 9px ${FONT}`, color: T.tx3 }}>{ccy}</span>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
              {[
                { c: T.acc, label: t.legendDineIn, pct: '42%' },
                { c: T.info, label: t.legendBar, pct: '25%' },
                { c: T.violet, label: t.legendDelivery, pct: '18%' },
                { c: T.warn, label: t.legendTakeaway, pct: '15%' },
              ].map((r) => (
                <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 9, height: 9, borderRadius: 3, background: r.c }} />
                  <span style={{ font: `500 12px ${FONT}`, color: T.tx2, flex: 1 }}>{r.label}</span>
                  <span style={{ font: `600 12px ${FONT}`, color: T.tx }}>{r.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* 2 · Combo (bars + line) */}
        <Card title={t.cardComboTitle} badge={t.badgeCombo}>
          <div style={{ position: 'relative', height: 96, display: 'flex', alignItems: 'flex-end', gap: 7 }}>
            {[50, 62, 58, 80, 96, 70].map((h, i) => (
              <div
                key={i}
                style={{ flex: 1, height: `${h}%`, background: T.info, opacity: 0.55, borderRadius: '3px 3px 0 0' }}
              />
            ))}
            <svg
              style={{ position: 'absolute', inset: 0 }}
              width="100%"
              height="96"
              viewBox="0 0 320 96"
              preserveAspectRatio="none"
              fill="none"
            >
              <polyline
                points="26,40 76,46 126,34 176,30 226,52 276,44"
                stroke={T.warn}
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 9 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: `500 11px ${FONT}`, color: T.tx2 }}>
              <span style={{ width: 11, height: 8, borderRadius: 2, background: T.info, opacity: 0.7 }} />
              {t.legendCovers}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: `500 11px ${FONT}`, color: T.tx2 }}>
              <span style={{ width: 12, height: 3, borderRadius: 2, background: T.warn }} />
              {t.legendLabour}
            </span>
            <button
              type="button"
              style={{
                marginLeft: 'auto',
                height: 26,
                padding: '0 9px',
                borderRadius: 8,
                border: `1px solid ${T.bd}`,
                background: T.surf2,
                color: T.tx2,
                font: `600 10.5px ${FONT}`,
                cursor: 'pointer',
              }}
            >
              {t.secondAxis}
            </button>
          </div>
        </Card>

        {/* 3 · Scatter · quadrant */}
        <Card title={t.cardScatterTitle} badge={t.badgeScatter}>
          <div style={{ position: 'relative', height: 120, borderLeft: `1.5px solid ${T.bd}`, borderBottom: `1.5px solid ${T.bd}` }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: T.bd }} />
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: T.bd }} />
            <span style={{ position: 'absolute', top: 3, right: 4, font: `600 9px ${FONT}`, color: T.posk }}>{t.quadStars}</span>
            <span style={{ position: 'absolute', bottom: 3, left: 4, font: `600 9px ${FONT}`, color: T.tx3 }}>{t.quadDrop}</span>
            <span style={{ position: 'absolute', left: '22%', top: '30%', width: 9, height: 9, borderRadius: '50%', background: T.info, transform: 'translate(-50%,-50%)' }} />
            <span style={{ position: 'absolute', left: '68%', top: '22%', width: 14, height: 14, borderRadius: '50%', background: T.acc, border: `2px solid ${T.tx}`, transform: 'translate(-50%,-50%)' }} />
            <span style={{ position: 'absolute', left: '80%', top: '38%', width: 9, height: 9, borderRadius: '50%', background: T.info, transform: 'translate(-50%,-50%)' }} />
            <span style={{ position: 'absolute', left: '40%', top: '64%', width: 9, height: 9, borderRadius: '50%', background: T.warn, transform: 'translate(-50%,-50%)' }} />
            <span style={{ position: 'absolute', left: '18%', top: '78%', width: 9, height: 9, borderRadius: '50%', background: T.neg, transform: 'translate(-50%,-50%)' }} />
            <div
              style={{
                position: 'absolute',
                left: '68%',
                top: '4%',
                transform: 'translateX(-50%)',
                background: T.bg,
                border: `1px solid ${T.acc}`,
                borderRadius: 7,
                padding: '3px 7px',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ font: `600 9.5px ${FONT}`, color: T.tx }}>{t.pointTruffle}</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
            <span style={{ font: `500 10px ${FONT}`, color: T.tx3 }}>{t.axisLowVolume}</span>
            <span style={{ font: `500 10px ${FONT}`, color: T.tx3 }}>{t.axisHighVolume}</span>
          </div>
        </Card>

        {/* 4 · Waterfall · vertical */}
        <Card title={t.cardWaterfallTitle} badge={t.badgeWaterfall}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 74, font: `500 11.5px ${FONT}`, color: T.tx2 }}>{t.rowRevenue}</span>
              <div style={{ flex: 1, height: 18, background: T.info, opacity: 0.6, borderRadius: 4 }} />
              <span style={{ width: 56, textAlign: 'right', font: `600 11.5px ${FONT}`, color: T.tx }}>{compact(revLoc)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 74, font: `500 11.5px ${FONT}`, color: T.tx2 }}>{t.rowCogs}</span>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: '42%', height: 18, background: T.neg, opacity: 0.7, borderRadius: 4 }} />
              </div>
              <span style={{ width: 56, textAlign: 'right', font: `600 11.5px ${FONT}`, color: T.negk }}>−{compact(cogsLoc)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 74, font: `500 11.5px ${FONT}`, color: T.tx2 }}>{t.rowLabour}</span>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: '30%', height: 18, background: T.neg, opacity: 0.55, borderRadius: 4 }} />
              </div>
              <span style={{ width: 56, textAlign: 'right', font: `600 11.5px ${FONT}`, color: T.negk }}>−{compact(labourLoc)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 74, font: `600 11.5px ${FONT}`, color: T.posk }}>{t.rowProfit}</span>
              <div style={{ flex: 1 }}>
                <div style={{ width: '28%', height: 18, background: T.acc, borderRadius: 4 }} />
              </div>
              <span style={{ width: 56, textAlign: 'right', font: `700 11.5px ${FONT}`, color: T.posk }}>{compact(profitLoc)}</span>
            </div>
          </div>
        </Card>

        {/* 5 · Funnel · vertical */}
        <Card title={t.cardFunnelTitle} badge={t.badgeFunnel}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
            <div
              style={{
                width: '100%',
                height: 30,
                borderRadius: 7,
                background: T.info,
                opacity: 0.75,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 12px',
              }}
            >
              <span style={{ font: `600 11.5px ${FONT}`, color: '#fff' }}>{t.funnelViews}</span>
              <span style={{ font: `600 11.5px ${FONT}`, color: '#fff' }}>12,400</span>
            </div>
            <span style={{ font: `600 10px ${FONT}`, color: T.posk }}>↓ 38%</span>
            <div
              style={{
                width: '78%',
                height: 30,
                borderRadius: 7,
                background: T.info,
                opacity: 0.6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 12px',
              }}
            >
              <span style={{ font: `600 11.5px ${FONT}`, color: '#fff' }}>{t.funnelStarted}</span>
              <span style={{ font: `600 11.5px ${FONT}`, color: '#fff' }}>4,712</span>
            </div>
            <span style={{ font: `600 10px ${FONT}`, color: T.warnk }}>↓ 64%</span>
            <div
              style={{
                width: '42%',
                height: 30,
                borderRadius: 7,
                background: T.acc,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '0 10px',
              }}
            >
              <span style={{ font: `600 11px ${FONT}`, color: T.acck }}>{t.funnelBooked} 1,704</span>
            </div>
          </div>
        </Card>

        {/* 6 · Sankey · flow list */}
        <Card title={t.cardSankeyTitle} badge={t.badgeSankey}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {[
              { from: 'Instagram', to: t.flowBooked, w: '72%', c: T.violet },
              { from: 'Talabat', to: t.flowWalkIn, w: '54%', c: T.info },
              { from: 'Google', to: t.flowBooked, w: '38%', c: T.acc },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ font: `600 11.5px ${FONT}`, color: T.tx, width: 60 }}>{r.from}</span>
                <span style={{ font: `500 11px ${FONT}`, color: T.tx3 }}>→</span>
                <div style={{ flex: 1, height: 10, borderRadius: 99, background: T.track, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: r.w, background: r.c, borderRadius: 99 }} />
                </div>
                <span style={{ font: `600 11px ${FONT}`, color: T.tx2, width: 42, textAlign: 'right' }}>{r.to}</span>
              </div>
            ))}
            <button
              type="button"
              style={{
                marginTop: 2,
                alignSelf: 'flex-start',
                height: 28,
                padding: '0 11px',
                borderRadius: 8,
                border: `1px solid ${T.bd}`,
                background: T.surf2,
                color: T.tx2,
                font: `600 11px ${FONT}`,
                cursor: 'pointer',
              }}
            >
              {t.expandFullFlow}
            </button>
          </div>
        </Card>

        {/* 7 · Gauge · radial */}
        <Card title={t.cardGaugeTitle} badge={t.badgeGauge}>
          <div style={{ position: 'relative', width: 180, height: 104, margin: '0 auto' }}>
            <svg width="180" height="104" viewBox="0 0 180 104" fill="none">
              <path d="M16 96 A 74 74 0 0 1 164 96" stroke={T.track} strokeWidth="14" strokeLinecap="round" />
              <path d="M16 96 A 74 74 0 0 1 150 56" stroke={T.warn} strokeWidth="14" strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 2, textAlign: 'center' }}>
              <div style={{ font: `700 26px ${FONT}`, color: T.tx }}>31.2%</div>
              <div style={{ font: `500 10.5px ${FONT}`, color: T.warnk }}>{t.gaugeTarget}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
