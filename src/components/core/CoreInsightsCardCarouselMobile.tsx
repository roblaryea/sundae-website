'use client';

/**
 * Faithful implementation of "03 · Chart-card spec + carousel" (Dark variant)
 * from the Claude Design Core / Decision Intelligence phone mockups — the
 * swipeable stack of chart cards. A back-chrome header ("Revenue · charts" /
 * "Swipe ← → · 7 visuals"), a carousel viewport with peeking neighbour cards and
 * a focused chart card (answer line, collab button with unread dot, a ranked
 * horizontal bar stack recreated with divs, and a Drill · Discuss · ⤢ thumb
 * row), the carousel dots / page indicator, and a "Card anatomy" legend. The
 * numbered blue badges (① … ⑤) from the spec annotate each part. Same cool-slate
 * token set as the crew screens. Sits inside <PhoneFrame screenBg="#020617">.
 * Pure markup.
 *
 * Source: claude.ai/design · Core mobile slice, Row 03 "Chart-card spec +
 * carousel" (Dark variant).
 */

import { useCrewScreen } from '../crew/crewI18n';
import { crewMoney } from '../crew/crewCurrency';
import { LOC } from './locales/CoreInsightsCardCarouselMobile.locales';

const EN = {
  headerTitle: 'Revenue · charts',
  headerMeta: 'Swipe ← → · 7 visuals',
  answerLine: 'Five items make 38% of revenue — the truffle pizza leads.',
  itemTrufflePizza: 'Truffle pizza',
  itemWagyuBurger: 'Wagyu burger',
  itemCocktailFlight: 'Cocktail flight',
  itemLambOuzi: 'Lamb ouzi',
  itemSeaBass: 'Sea bass',
  drill: 'Drill ↗',
  discuss: 'Discuss',
  pagerLabel: 'Top items · 3 / 7',
  anatomyTitle: 'Card anatomy',
  anatomy1Lead: 'Answer line',
  anatomy1Rest: ' — a sentence, not a chart title',
  anatomy2Lead: 'Collab button',
  anatomy2Rest: ' — unread dot, thread at this snapshot',
  anatomy3Lead: 'Chart',
  anatomy3Rest: ' — touch to filter/inspect, never hover',
  anatomy4Lead: 'Thumb row',
  anatomy4Rest: ' — Drill · Discuss · Expand',
  anatomy5Lead: 'Carousel dots',
  anatomy5Rest: ' — page the module’s 7 charts',
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
  info: '#3b82f6',
  neg: '#ef4444',
  violet: '#8b5cf6',
  warn: '#f59e0b',
  track: '#1e293b',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

/** Small numbered annotation badge (the blue ①…⑤ markers from the spec). */
function Badge({ n, style }: { n: number; style: React.CSSProperties }) {
  return (
    <span
      aria-hidden
      style={{
        position: 'absolute',
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: T.info,
        color: '#fff',
        font: `700 9px ${FONT}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        ...style,
      }}
    >
      {n}
    </span>
  );
}

function AnatomyRow({ n, lead, rest }: { n: number; lead: string; rest: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <span
        style={{
          flex: 'none',
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: T.info,
          color: '#fff',
          font: `700 10px ${FONT}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {n}
      </span>
      <span style={{ font: `500 12px ${FONT}`, color: T.tx2 }}>
        <b style={{ color: T.tx }}>{lead}</b>
        {rest}
      </span>
    </div>
  );
}

export function CoreInsightsCardCarouselMobile() {
  const { t, locale } = useCrewScreen(EN, LOC);

  // Five ranked items. Amounts authored as GBP integers (the design's AED 142k …
  // 58k, FX-converted to GBP base), localized at runtime via crewMoney. Bar
  // widths and colours are taken verbatim from the design.
  const items = [
    { label: t.itemTrufflePizza, gbp: 30472, width: 100, color: T.acc },
    { label: t.itemWagyuBurger, gbp: 25322, width: 83, color: T.info },
    { label: t.itemCocktailFlight, gbp: 20601, width: 67, color: T.violet },
    { label: t.itemLambOuzi, gbp: 15236, width: 50, color: T.warn },
    { label: t.itemSeaBass, gbp: 12446, width: 41, color: T.tx3 },
  ];

  // Carousel dots: 7 pages, the 3rd is active (wide).
  const dots = [0, 1, 2, 3, 4, 5, 6];
  const activeDot = 2;

  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* header: back · title · swipe meta */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '2px 2px 12px',
          borderBottom: `1px solid ${T.bd}`,
        }}
      >
        <button
          type="button"
          aria-label="Back"
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
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
            <path d="M7 2L2 7.5l5 5.5" stroke={T.tx2} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: `700 16px ${FONT}`, color: T.tx }}>{t.headerTitle}</div>
          <div style={{ font: `500 11px ${FONT}`, color: T.tx3 }}>{t.headerMeta}</div>
        </div>
      </div>

      {/* carousel viewport */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '14px 0 0' }}>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 12 }}>
          {/* peek left */}
          <div
            aria-hidden
            style={{
              flex: 'none',
              width: 22,
              borderRadius: '18px 0 0 18px',
              border: `1px solid ${T.bd}`,
              borderRight: 'none',
              background: T.surf,
              opacity: 0.5,
            }}
          />

          {/* focused card */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              background: T.surf,
              border: `1px solid ${T.bd}`,
              borderRadius: 18,
              overflow: 'hidden',
              boxShadow: '0 18px 40px -22px rgba(0,0,0,.6)',
            }}
          >
            {/* answer line + collab button */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, padding: '14px 14px 6px' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
                <Badge n={1} style={{ left: -8, top: 0 }} />
                <div style={{ font: `600 14px ${FONT}`, lineHeight: 1.35, color: T.tx }}>{t.answerLine}</div>
              </div>
              <button
                type="button"
                aria-label={t.discuss}
                style={{
                  position: 'relative',
                  flex: 'none',
                  width: 30,
                  height: 30,
                  borderRadius: 9,
                  border: `1px solid ${T.bd}`,
                  background: T.surf2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3.5h10v7H7l-3 2.5V10.5H3v-7z" stroke={T.tx2} strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <Badge n={2} style={{ left: -14, top: -6 }} />
                {/* unread dot */}
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: -3,
                    right: -3,
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    background: T.neg,
                    border: `1.5px solid ${T.surf}`,
                  }}
                />
              </button>
            </div>

            {/* chart: ranked horizontal bar stack */}
            <div style={{ position: 'relative', padding: '6px 14px 12px' }}>
              <Badge n={3} style={{ left: -6, top: 8 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {items.map((it) => (
                  <div key={it.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ font: `600 12px ${FONT}`, color: T.tx }}>{it.label}</span>
                      <span style={{ font: `600 12px ${FONT}`, color: T.tx2 }}>{crewMoney(locale, it.gbp)}</span>
                    </div>
                    <div style={{ height: 9, borderRadius: 99, background: T.track, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${it.width}%`, borderRadius: 99, background: it.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* thumb row: Drill · Discuss · Expand */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                gap: 7,
                padding: '10px 12px 11px',
                borderTop: `1px solid ${T.bd}`,
                background: T.surf2,
              }}
            >
              <Badge n={4} style={{ left: -6, top: '50%', transform: 'translateY(-50%)' }} />
              <button
                type="button"
                style={{
                  flex: 1,
                  minHeight: 40,
                  borderRadius: 11,
                  border: 'none',
                  background: T.acc,
                  color: T.acck,
                  font: `700 12px ${FONT}`,
                  cursor: 'pointer',
                }}
              >
                {t.drill}
              </button>
              <button
                type="button"
                style={{
                  flex: 1,
                  minHeight: 40,
                  borderRadius: 11,
                  border: `1px solid ${T.bd}`,
                  background: T.surf,
                  color: T.tx2,
                  font: `600 12px ${FONT}`,
                  cursor: 'pointer',
                }}
              >
                {t.discuss}
              </button>
              <button
                type="button"
                aria-label="Expand"
                style={{
                  flex: 'none',
                  width: 42,
                  minHeight: 40,
                  borderRadius: 11,
                  border: `1px solid ${T.bd}`,
                  background: T.surf,
                  color: T.tx2,
                  font: `700 15px ${FONT}`,
                  cursor: 'pointer',
                }}
              >
                ⤢
              </button>
            </div>
          </div>

          {/* peek right */}
          <div
            aria-hidden
            style={{
              flex: 'none',
              width: 22,
              borderRadius: '0 18px 18px 0',
              border: `1px solid ${T.bd}`,
              borderLeft: 'none',
              background: T.surf,
              opacity: 0.5,
            }}
          />
        </div>

        {/* carousel dots + page label */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '14px 0 4px' }}>
          <Badge n={5} style={{ left: 0, top: 13 }} />
          {dots.map((d) =>
            d === activeDot ? (
              <span key={d} style={{ width: 16, height: 5, borderRadius: 3, background: T.acc }} />
            ) : (
              <span key={d} style={{ width: 5, height: 5, borderRadius: '50%', background: T.bd }} />
            ),
          )}
          <span style={{ font: `500 10.5px ${FONT}`, color: T.tx3, marginLeft: 5 }}>{t.pagerLabel}</span>
        </div>
      </div>

      {/* card anatomy legend */}
      <div style={{ margin: '16px 0 0', border: `1px dashed ${T.bd}`, borderRadius: 14, padding: '13px 14px', background: T.surf2 }}>
        <div style={{ font: `600 10.5px ${FONT}`, letterSpacing: '.08em', textTransform: 'uppercase', color: T.tx3, marginBottom: 10 }}>
          {t.anatomyTitle}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <AnatomyRow n={1} lead={t.anatomy1Lead} rest={t.anatomy1Rest} />
          <AnatomyRow n={2} lead={t.anatomy2Lead} rest={t.anatomy2Rest} />
          <AnatomyRow n={3} lead={t.anatomy3Lead} rest={t.anatomy3Rest} />
          <AnatomyRow n={4} lead={t.anatomy4Lead} rest={t.anatomy4Rest} />
          <AnatomyRow n={5} lead={t.anatomy5Lead} rest={t.anatomy5Rest} />
        </div>
      </div>
    </div>
  );
}
