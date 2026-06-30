'use client';

/**
 * Faithful implementation of "04 · Full-screen chart" (portrait · Dark variant)
 * from the Claude Design Core / Decision Intelligence phone mockups — an
 * immersive, touch-first chart view: close/expand chrome, an answer-first value
 * + delta, a 300px area chart recreated in SVG (gridlines, accent line, dashed
 * comparison line, touch crosshair + scrubber dot + value tooltip), a drag
 * scrubber track, tap-to-filter legend chips, a compare segmented control, a
 * "rotate for the full series" affordance, and a thumb-zone footer (Drill +
 * discuss + alert). Same cool-slate token set as the crew screens. Sits inside
 * <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: claude.ai/design · Core mobile slice, Row 04 "Full-screen chart"
 * (portrait · Dark variant).
 */

import { useCrewScreen } from '../crew/crewI18n';
import { crewMoney } from '../crew/crewCurrency';
import { LOC } from './locales/CoreInsightsChartMobile.locales';

const EN = {
  chartTitle: 'Net Revenue',
  chartMeta: '· 7 days · AED',
  deltaVsPrior: '▲ 9% vs prior',
  dragHint: '— drag to read any point',
  scrubMon: 'Mon',
  scrubThu: 'Thu',
  scrubSun: 'Sun',
  legendThisWeek: 'This week',
  legendPriorWeek: 'Prior week',
  legendTargetOff: 'Target · off',
  compareTo: 'Compare to',
  compareOff: 'Off',
  comparePrevPeriod: 'Prev period',
  compareYoY: 'YoY',
  rotateForSeries: 'Rotate for the full series',
  drill: 'Drill ↗',
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
  warnk: '#fbbf24',
  track: '#1e293b',
  postBg: 'rgba(34,197,94,.14)',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

export function CoreInsightsChartMobile() {
  const { t, locale } = useCrewScreen(EN, LOC);
  // AED 18,400 in the design → authored as a GBP integer, localized at runtime.
  const peakValue = crewMoney(locale, 3948);
  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* top chrome: close · centered title · expand */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 0 12px' }}>
        <button
          type="button"
          aria-label="Close"
          style={{
            flex: 'none',
            width: 34,
            height: 34,
            borderRadius: 11,
            border: `1px solid ${T.bd}`,
            background: T.surf,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2l10 10M12 2L2 12" stroke={T.tx2} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ font: `700 15px ${FONT}`, color: T.tx }}>{t.chartTitle}</div>
          <div style={{ font: `500 11px ${FONT}`, color: T.tx3 }}>
            Marina Social {t.chartMeta}
          </div>
        </div>
        <button
          type="button"
          aria-label="Expand"
          style={{
            flex: 'none',
            width: 34,
            height: 34,
            borderRadius: 11,
            border: `1px solid ${T.bd}`,
            background: T.surf,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 2H2v4M10 2h4v4M10 14h4v-4M6 14H2v-4" stroke={T.tx2} strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* answer-first value + delta */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '0 2px' }}>
        <span style={{ font: `700 30px ${FONT}`, letterSpacing: '-.02em', lineHeight: 1, color: T.tx }}>{peakValue}</span>
        <span style={{ font: `600 13px ${FONT}`, color: T.posk }}>{t.deltaVsPrior}</span>
      </div>
      <div style={{ font: `500 12px ${FONT}`, color: T.tx3, marginTop: 5 }}>
        Sat 6 Jul · 18:00 {t.dragHint}
      </div>

      {/* the chart: area + accent line + dashed comparison + crosshair + dot + tooltip */}
      <div style={{ position: 'relative', height: 300, marginTop: 14 }}>
        <svg width="100%" height="300" viewBox="0 0 360 300" preserveAspectRatio="none" fill="none">
          <line x1="0" y1="60" x2="360" y2="60" stroke={T.bd} strokeWidth="1" strokeDasharray="3 6" />
          <line x1="0" y1="130" x2="360" y2="130" stroke={T.bd} strokeWidth="1" strokeDasharray="3 6" />
          <line x1="0" y1="200" x2="360" y2="200" stroke={T.bd} strokeWidth="1" strokeDasharray="3 6" />
          {/* area fill under the current-week line */}
          <path d="M0 230 L52 210 L104 222 L156 170 L208 184 L242 150 L300 120 L360 86 L360 300 L0 300 Z" fill={T.acc} fillOpacity="0.12" />
          {/* current-week line */}
          <path
            d="M0 230 L52 210 L104 222 L156 170 L208 184 L242 150 L300 120 L360 86"
            stroke={T.acc}
            strokeWidth="2.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* prior-week comparison (dashed) */}
          <path
            d="M0 246 L52 236 L104 240 L156 224 L208 232 L242 214 L300 206 L360 196"
            stroke={T.tx3}
            strokeWidth="1.6"
            strokeDasharray="4 4"
            fill="none"
          />
        </svg>
        {/* crosshair */}
        <div style={{ position: 'absolute', left: '67%', top: 0, bottom: 0, width: 2, background: T.acc, opacity: 0.55 }} />
        {/* scrubber dot on the line */}
        <div
          style={{
            position: 'absolute',
            left: '67%',
            top: 150,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: T.bg,
            border: `3px solid ${T.acc}`,
            transform: 'translate(-50%,-50%)',
            boxShadow: '0 0 0 4px rgba(52,211,153,.18)',
          }}
        />
        {/* value tooltip at the finger */}
        <div
          style={{
            position: 'absolute',
            left: '67%',
            top: 6,
            transform: 'translateX(-50%)',
            background: T.surf,
            border: `1px solid ${T.acc}`,
            borderRadius: 10,
            padding: '6px 10px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 20px -8px rgba(0,0,0,.6)',
          }}
        >
          <div style={{ font: `700 13px ${FONT}`, color: T.tx }}>{peakValue}</div>
          <div style={{ font: `500 10px ${FONT}`, color: T.tx3 }}>Sat · 18:00</div>
        </div>
      </div>

      {/* drag scrubber track */}
      <div style={{ marginTop: 4, padding: '0 2px' }}>
        <div
          style={{
            position: 'relative',
            height: 34,
            borderRadius: 10,
            background: T.surf,
            border: `1px solid ${T.bd}`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
          }}
        >
          <div style={{ position: 'absolute', left: 12, right: 12, height: 3, borderRadius: 2, background: T.track }} />
          <div style={{ position: 'absolute', left: 12, width: '55%', height: 3, borderRadius: 2, background: T.acc }} />
          <div
            style={{
              position: 'absolute',
              left: 'calc(12px + 55%)',
              transform: 'translateX(-50%)',
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: T.acc,
              border: `3px solid ${T.bg}`,
              boxShadow: '0 4px 10px -2px rgba(0,0,0,.5)',
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          <span style={{ font: `500 10px ${FONT}`, color: T.tx3 }}>{t.scrubMon}</span>
          <span style={{ font: `500 10px ${FONT}`, color: T.tx3 }}>{t.scrubThu}</span>
          <span style={{ font: `500 10px ${FONT}`, color: T.tx3 }}>{t.scrubSun}</span>
        </div>
      </div>

      {/* tap-to-filter legend chips */}
      <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
        <button
          type="button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            height: 34,
            padding: '0 12px',
            borderRadius: 99,
            background: T.postBg,
            border: `1px solid ${T.acc}`,
            color: T.tx,
            font: `600 12px ${FONT}`,
            cursor: 'pointer',
          }}
        >
          <span style={{ width: 12, height: 3, borderRadius: 2, background: T.acc }} />
          {t.legendThisWeek}
        </button>
        <button
          type="button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            height: 34,
            padding: '0 12px',
            borderRadius: 99,
            background: T.surf,
            border: `1px solid ${T.bd}`,
            color: T.tx2,
            font: `600 12px ${FONT}`,
            cursor: 'pointer',
          }}
        >
          <span style={{ width: 12, height: 0, borderTop: `2px dashed ${T.tx3}` }} />
          {t.legendPriorWeek}
        </button>
        <button
          type="button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            height: 34,
            padding: '0 12px',
            borderRadius: 99,
            background: T.surf,
            border: `1px solid ${T.bd}`,
            color: T.tx3,
            font: `600 12px ${FONT}`,
            cursor: 'pointer',
            opacity: 0.6,
          }}
        >
          <span style={{ width: 12, height: 3, borderRadius: 2, background: T.tx3 }} />
          {t.legendTargetOff}
        </button>
      </div>

      {/* compare segmented control */}
      <div style={{ marginTop: 14 }}>
        <div style={{ font: `600 10.5px ${FONT}`, letterSpacing: '.08em', textTransform: 'uppercase', color: T.tx3, marginBottom: 8 }}>
          {t.compareTo}
        </div>
        <div style={{ display: 'flex', background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 11, padding: 3 }}>
          <span style={{ flex: 1, textAlign: 'center', padding: '8px 0', borderRadius: 8, font: `600 12px ${FONT}`, color: T.tx3 }}>
            {t.compareOff}
          </span>
          <span
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '8px 0',
              borderRadius: 8,
              background: T.acc,
              color: T.acck,
              font: `700 12px ${FONT}`,
            }}
          >
            {t.comparePrevPeriod}
          </span>
          <span style={{ flex: 1, textAlign: 'center', padding: '8px 0', borderRadius: 8, font: `600 12px ${FONT}`, color: T.tx3 }}>
            {t.compareYoY}
          </span>
        </div>
      </div>

      {/* rotate for the full series */}
      <button
        type="button"
        style={{
          marginTop: 14,
          width: '100%',
          minHeight: 46,
          borderRadius: 13,
          border: `1px dashed ${T.bd}`,
          background: T.surf2,
          color: T.tx2,
          font: `600 12.5px ${FONT}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          cursor: 'pointer',
        }}
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <rect x="3" y="2" width="10" height="12" rx="2" stroke={T.tx2} strokeWidth="1.5" />
          <path d="M9.5 13.5l3-3" stroke={T.acc} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {t.rotateForSeries}
      </button>

      {/* thumb-zone footer: drill + discuss + alert */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginTop: 16,
          paddingTop: 14,
          borderTop: `1px solid ${T.bd}`,
        }}
      >
        <button
          type="button"
          style={{
            flex: 1,
            minHeight: 46,
            borderRadius: 13,
            border: 'none',
            background: T.acc,
            color: T.acck,
            font: `700 13px ${FONT}`,
            cursor: 'pointer',
          }}
        >
          {t.drill}
        </button>
        <button
          type="button"
          aria-label="Discuss"
          style={{
            flex: 'none',
            width: 50,
            minHeight: 46,
            borderRadius: 13,
            border: `1px solid ${T.bd}`,
            background: T.surf,
            color: T.tx2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <svg width="17" height="17" viewBox="0 0 16 16" fill="none">
            <path d="M3 3.5h10v7H7l-3 2.5V10.5H3v-7z" stroke={T.tx2} strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Alert"
          style={{
            flex: 'none',
            width: 50,
            minHeight: 46,
            borderRadius: 13,
            border: `1px solid ${T.bd}`,
            background: T.surf,
            color: T.warnk,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <svg width="17" height="17" viewBox="0 0 16 16" fill="none">
            <path d="M8 2a4 4 0 0 0-4 4c0 4-1.5 5-1.5 5h11S12 10 12 6a4 4 0 0 0-4-4z" stroke={T.warnk} strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M6.5 13.5a1.5 1.5 0 0 0 3 0" stroke={T.warnk} strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
