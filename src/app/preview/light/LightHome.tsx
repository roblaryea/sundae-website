'use client';

import { useEffect, type CSSProperties, type ReactNode } from 'react';
import { motion } from 'framer-motion';

/**
 * Light-FIRST design exploration (isolated, non-shipping). The live light mode
 * is a dimmed dark theme (additive glows go invisible on white, shadows cut 80%,
 * accents muted, --shape-strength-boost:2.5 band-aid). This page demonstrates a
 * light theme designed as its OWN system:
 *   - warm PAPER base, not cold #FFF
 *   - elevation from layered, warm-tinted SHADOWS (not glows)
 *   - atmosphere from surface tints + hairlines + a soft window-light wash
 *   - accents held at FULL saturation
 *   - the hero reimagined for light (ink-outlined glass on cream + a cast
 *     table-pool shadow), instead of the force-dark island it is today.
 *
 * Forces light mode on mount so the global nav/footer render light too; reverts
 * on unmount. Nothing global or live is changed. Delete preview/light to remove.
 */

const L = {
  paper: '#FBF6EE',
  paperDeep: '#F3EADC',
  card: '#FFFFFF',
  ink: '#2A2320',
  inkSoft: 'rgba(42,35,32,0.74)',
  inkMuted: 'rgba(42,35,32,0.54)',
  hair: 'rgba(58,40,30,0.10)',
  hairStrong: 'rgba(58,40,30,0.16)',
  coral: '#FF5C4D',
  coralInk: '#D8412C', // coral that holds AA on cream for text
  caramel: '#C2410C',
  amber: '#E9A24A',
  cherry: '#E03E48',
  brick: '#B23A1E',
  olive: '#6E7C3A',
};

// Designed light-mode elevation: multi-layer, warm-tinted (brown, not black).
const SHADOW = {
  card: '0 1px 2px rgba(74,49,32,0.05), 0 10px 26px -12px rgba(74,49,32,0.16), 0 30px 54px -26px rgba(74,49,32,0.14)',
  cardHover: '0 2px 4px rgba(74,49,32,0.06), 0 16px 34px -12px rgba(74,49,32,0.20), 0 40px 70px -28px rgba(74,49,32,0.18)',
  soft: '0 10px 34px -14px rgba(74,49,32,0.20)',
  cta: '0 14px 30px -10px rgba(224,62,72,0.40)',
  glass: '0 30px 50px -22px rgba(74,49,32,0.34)',
};

const DISPLAY = 'var(--font-fraunces), Georgia, serif';
const SANS = 'var(--font-hanken), system-ui, sans-serif';

const EASE = [0.16, 1, 0.3, 1] as const;

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: L.coralInk }}>
      {children}
    </div>
  );
}

function Reveal({ children, delay = 0, style }: { children: ReactNode; delay?: number; style?: CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ---------- the hero glass, reimagined for light ---------- */

const STRATA = [
  { c: '#F6C66B', label: 'NEXT MOVE', onLight: true },
  { c: '#E9A24A', label: 'GUESTS' },
  { c: '#F7A088', label: 'MARKETING' },
  { c: '#FF5C4D', label: 'INVENTORY' },
  { c: '#E8404A', label: 'LABOR' },
  { c: '#C9342B', label: 'REVENUE' },
  { c: '#B23A1E', label: 'FOUNDATION' },
];

function LightGlass() {
  const top = 78;
  const bot = 300;
  const step = (bot - top) / STRATA.length;
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      {/* warm "table light pool" cast shadow - depth without a glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 26,
          width: 230,
          height: 46,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(120,70,40,0.28), transparent 70%)',
          filter: 'blur(10px)',
        }}
      />
      <motion.svg
        width={320}
        height={400}
        viewBox="0 0 240 400"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
        style={{ position: 'relative', filter: `drop-shadow(${SHADOW.glass})` }}
        aria-label="A glass of business layers, every layer visible"
      >
        <defs>
          <clipPath id="lbowl">
            <path d="M52,78 C52,196 76,300 120,318 C164,300 188,196 188,78 Z" />
          </clipPath>
          <linearGradient id="lgloss" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="0.5" stopColor="rgba(255,255,255,0)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.32)" />
          </linearGradient>
          <radialGradient id="lcherry" cx="0.35" cy="0.3" r="0.85">
            <stop offset="0" stopColor="#FF8275" />
            <stop offset="0.55" stopColor="#E8404A" />
            <stop offset="1" stopColor="#A81B29" />
          </radialGradient>
        </defs>

        {/* strata */}
        <g clipPath="url(#lbowl)">
          <rect x="40" y="74" width="160" height="250" fill="#FFFDF8" />
          {STRATA.map((s, i) => {
            const y = bot - (i + 1) * step;
            return (
              <motion.rect
                key={i}
                x={40}
                y={y}
                width={160}
                height={step + 0.8}
                fill={s.c}
                style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.7, ease: EASE }}
              />
            );
          })}
          {/* menisci highlights */}
          {STRATA.map((s, i) => {
            const y = bot - (i + 1) * step;
            return <ellipse key={`m${i}`} cx="120" cy={y + 1.5} rx="62" ry="3" fill="rgba(255,255,255,0.45)" />;
          })}
          {/* in-glass labels */}
          {STRATA.map((s, i) => {
            if (i === STRATA.length - 1) return null;
            const yc = bot - (i + 0.5) * step;
            return (
              <text
                key={`t${i}`}
                x="120"
                y={yc + 2.5}
                textAnchor="middle"
                fontSize="7"
                fontWeight="700"
                fill={s.onLight ? '#7A3A18' : '#FFF6EC'}
                style={{ letterSpacing: '1px', fontFamily: SANS, opacity: 0.78 }}
              >
                {s.label}
              </text>
            );
          })}
        </g>

        {/* ink-outlined glass body (not white strokes) */}
        <path d="M52,78 C52,196 76,300 120,318 C164,300 188,196 188,78" fill="url(#lgloss)" />
        <path d="M52,78 C52,196 76,300 120,318 C164,300 188,196 188,78" fill="none" stroke="rgba(74,49,32,0.42)" strokeWidth="2" />
        <ellipse cx="120" cy="78" rx="68" ry="12" fill="rgba(255,255,255,0.6)" stroke="rgba(74,49,32,0.38)" strokeWidth="2" />
        <path d="M62,74 A68 12 0 0 1 150 71" fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="2" strokeLinecap="round" />
        {/* stem + foot */}
        <path d="M120,318 L120,360" stroke="rgba(74,49,32,0.3)" strokeWidth="7" strokeLinecap="round" />
        <ellipse cx="120" cy="366" rx="42" ry="7" fill="rgba(255,255,255,0.5)" stroke="rgba(74,49,32,0.32)" strokeWidth="2" />

        {/* cherry - the signal */}
        <motion.g initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5, duration: 0.8, ease: EASE }}>
          <path d="M117 64 C115 47 127 40 138 30" stroke="#79301C" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <circle cx="114" cy="68" r="14" fill="url(#lcherry)" />
          <ellipse cx="108" cy="62" rx="4.6" ry="3" fill="rgba(255,255,255,0.85)" />
        </motion.g>
      </motion.svg>
    </div>
  );
}

/* ---------- sections ---------- */

function Hero() {
  return (
    <section style={{ position: 'relative', padding: '120px 28px 70px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 40, alignItems: 'center' }}>
        <div style={{ minWidth: 0 }}>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <Eyebrow>Decision intelligence for multi-location operators</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
            style={{ fontFamily: DISPLAY, fontWeight: 300, fontSize: 'clamp(46px,6.4vw,92px)', lineHeight: 0.96, letterSpacing: '-0.04em', color: L.ink, margin: '18px 0 0' }}
          >
            See every layer.
            <span style={{ display: 'block', fontStyle: 'italic', fontWeight: 500, color: L.caramel, fontSize: 'clamp(30px,4.4vw,62px)', marginTop: '0.08em' }}>
              Act in time.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.18 }}
            style={{ fontFamily: SANS, fontSize: 'clamp(16px,1.5vw,19px)', lineHeight: 1.62, color: L.inkSoft, margin: '26px 0 32px', maxWidth: 480 }}
          >
            Sundae connects every layer of the business - revenue, labor, inventory, guests, marketing, and outlet performance - so teams can see what changed and act while it still matters.
          </motion.p>
          <motion.a
            href="/demo"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.28 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontFamily: SANS,
              fontWeight: 600,
              fontSize: 16,
              color: '#fff',
              padding: '14px 28px',
              borderRadius: 999,
              textDecoration: 'none',
              background: `linear-gradient(180deg, #FF7E6F, ${L.cherry})`,
              boxShadow: SHADOW.cta,
            }}
          >
            Book a demo
          </motion.a>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LightGlass />
        </div>
      </div>
    </section>
  );
}

function ProofCards() {
  const cards: Array<[string, string, string]> = [
    ['5 min', 'Signal to action', 'From a shift-floor change to the decision that fixes it.'],
    ['18', 'Decisions surfaced daily', 'Sundae brings the move to you - you stop hunting reports.'],
    ['12', 'Operating domains unified', 'Revenue, labor, inventory, guests, marketing, outlets - one truth.'],
    ['6', 'Intelligence layers', 'Every layer of the business, visible at once.'],
  ];
  return (
    <section style={{ padding: '20px 28px 80px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <Reveal>
          <Eyebrow>What you get</Eyebrow>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 'clamp(28px,3.4vw,42px)', letterSpacing: '-0.02em', color: L.ink, margin: '14px 0 36px' }}>
            Depth you can feel - even in daylight.
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 22 }}>
          {cards.map(([num, label, body], i) => (
            <Reveal key={label} delay={i * 0.07}>
              <div
                style={{
                  background: L.card,
                  border: `1px solid ${L.hair}`,
                  borderRadius: 18,
                  padding: '26px 24px 24px',
                  boxShadow: SHADOW.card,
                  height: '100%',
                }}
              >
                <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: 999, background: L.coral, boxShadow: `0 0 0 4px ${L.coral}1f` }} />
                <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 46, lineHeight: 1, color: L.ink, margin: '18px 0 8px' }}>{num}</div>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 14, color: L.ink }}>{label}</div>
                <p style={{ fontFamily: SANS, fontSize: 13.5, lineHeight: 1.55, color: L.inkMuted, margin: '8px 0 0' }}>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorialSplit() {
  return (
    <section style={{ padding: '20px 28px 84px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <Reveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.1fr',
              gap: 0,
              borderRadius: 22,
              overflow: 'hidden',
              border: `1px solid ${L.hair}`,
              boxShadow: SHADOW.card,
              background: L.card,
            }}
          >
            <div style={{ padding: '46px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Eyebrow>What we believe</Eyebrow>
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 'clamp(26px,3vw,38px)', lineHeight: 1.08, letterSpacing: '-0.02em', color: L.ink, margin: '16px 0 0' }}>
                The best decisions happen <span style={{ fontStyle: 'italic', color: L.caramel }}>while the shift is still alive.</span>
              </h2>
              <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.6, color: L.inkSoft, margin: '20px 0 0', maxWidth: 420 }}>
                Restaurants don&apos;t fail in reports. They slip in moments - a section slows, labor drifts, covers fall behind. Sundae catches them while there&apos;s still time to change the outcome.
              </p>
              {/* live moments - cream insets, ink type, hairline */}
              <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  ['7:15 PM', 'Covers falling behind'],
                  ['7:22 PM', 'Labor crossing target'],
                  ['7:31 PM', 'Table wait risk'],
                ].map(([t, m]) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 14, background: L.paperDeep, border: `1px solid ${L.hair}`, borderRadius: 12, padding: '10px 14px' }}>
                    <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: 12, color: L.coralInk, minWidth: 58 }}>{t}</span>
                    <span style={{ fontFamily: SANS, fontSize: 14, color: L.ink }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* warm-tinted "image" panel - depth via hairline + inset shadow, not a glow */}
            <div
              style={{
                position: 'relative',
                minHeight: 360,
                background: `linear-gradient(135deg, ${L.paperDeep}, #EADBC8 60%, #E3C9A6)`,
                display: 'flex',
                alignItems: 'flex-end',
                padding: 28,
              }}
            >
              <div aria-hidden style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 80px rgba(120,70,40,0.12)' }} />
              <div aria-hidden style={{ position: 'absolute', top: 0, right: 0, width: 240, height: 240, background: 'radial-gradient(circle at 70% 30%, rgba(255,205,140,0.5), transparent 60%)' }} />
              <div style={{ position: 'relative', fontFamily: SANS, fontSize: 12.5, color: '#7A5230', letterSpacing: '0.04em' }}>
                Then the signal arrives.
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section style={{ padding: '10px 28px 110px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <Reveal>
          <div
            style={{
              position: 'relative',
              borderRadius: 24,
              overflow: 'hidden',
              background: `radial-gradient(120% 120% at 50% -10%, rgba(255,193,120,0.30), transparent 55%), ${L.paperDeep}`,
              border: `1px solid ${L.hairStrong}`,
              boxShadow: SHADOW.card,
              padding: 'clamp(44px,6vw,76px) 28px',
              textAlign: 'center',
            }}
          >
            <Eyebrow>Stop guessing</Eyebrow>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(30px,4.2vw,52px)', lineHeight: 1.04, letterSpacing: '-0.03em', color: L.ink, margin: '14px 0 0' }}>
              Stop running your restaurants
              <br />
              on <span style={{ fontStyle: 'italic', color: L.caramel }}>yesterday&apos;s numbers.</span>
            </h2>
            <a
              href="/demo"
              style={{
                display: 'inline-flex',
                marginTop: 30,
                fontFamily: SANS,
                fontWeight: 600,
                fontSize: 16,
                color: '#fff',
                padding: '15px 32px',
                borderRadius: 999,
                textDecoration: 'none',
                background: `linear-gradient(180deg, #FF7E6F, ${L.cherry})`,
                boxShadow: SHADOW.cta,
              }}
            >
              Book a demo
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function LightHome() {
  // Force light mode so the global nav/footer render light alongside this page;
  // revert on unmount so the preview never persists a theme change.
  useEffect(() => {
    const html = document.documentElement;
    const had = html.classList.contains('light');
    html.classList.add('light');
    return () => {
      if (!had) html.classList.remove('light');
    };
  }, []);

  return (
    <div
      style={{
        background: `radial-gradient(120% 90% at 86% -8%, rgba(255,196,120,0.20), transparent 52%), radial-gradient(80% 60% at 4% 102%, rgba(255,120,90,0.08), transparent 55%), ${L.paper}`,
        minHeight: '100vh',
      }}
    >
      <Hero />
      <ProofCards />
      <EditorialSplit />
      <ClosingCTA />
    </div>
  );
}
