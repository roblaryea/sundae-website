'use client';

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionCinematicIntro } from '@/components/home/SectionCinematicIntro';

/**
 * "Current brand, elevated" - a REAL, animated, full-page preview (isolated,
 * non-shipping). It reuses the actual cinematic hero unchanged, then wraps it in
 * the one strong idea borrowed from the Curfs Consult deck - the guest-check /
 * receipt motif - restained into the warm brand and extended into a SYSTEM:
 * a live-ops guest-check ticker, a receipt "next move" card, perforated tear
 * dividers, a KPI ledger, and a closing restaurant-check CTA.
 *
 * Nothing here is global; nothing edits the live hero. Delete the
 * `preview/elevated` folder to remove entirely.
 */

const T = {
  espresso: '#15110D',
  surface: '#1F1A15',
  surface2: '#29221B',
  cream: '#F6F1E8',
  creamInk: '#2A2320',
  amber: '#F6C66B',
  caramel: '#E9A24A',
  coral: '#FF5C4D',
  cherry: '#E03E48',
  brick: '#B23A1E',
  display: '#FBF8F4',
  positive: '#16A34A',
};
const MONO = 'var(--font-geist-mono), ui-monospace, monospace';
const SANS = 'var(--font-hanken), system-ui, sans-serif';
const DISPLAY = 'var(--font-fraunces), Georgia, serif';

const pad6 = (n: number) => n.toString().padStart(6, '0');

/* ---------- shared parts ---------- */

function Cherry({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 40 52" aria-hidden>
      <path d="M20 14 C24 6 31 3 37 4" stroke={T.brick} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="16" cy="38" r="12" fill={T.cherry} />
      <ellipse cx="12" cy="33" rx="3.4" ry="2.4" fill="#fff" opacity="0.45" />
    </svg>
  );
}

// A faux receipt barcode (fixed pattern - no RNG so SSR/CSR match).
function Barcode({ color = T.creamInk, h = 26 }: { color?: string; h?: number }) {
  const widths = [2, 1, 3, 1, 1, 2, 1, 4, 1, 2, 1, 1, 3, 2, 1, 1, 2, 1, 3, 1, 1, 2, 4, 1, 1, 2, 1, 3, 1, 2, 1, 1, 2];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: h }} aria-hidden>
      {widths.map((w, i) => (
        <span key={i} style={{ width: w, height: i % 7 === 0 ? h : h - 4, background: color, opacity: 0.85 }} />
      ))}
    </div>
  );
}

// Perforated tear divider - the receipt edge as a section seam.
function ReceiptDivider({ pageBg = T.espresso }: { pageBg?: string }) {
  return (
    <div style={{ position: 'relative', height: 34, display: 'flex', alignItems: 'center' }}>
      <div style={{ flex: 1, borderTop: `1.5px dashed rgba(246,198,107,0.32)` }} />
      {/* end notches read as a torn-off stub */}
      <span style={{ position: 'absolute', left: -17, width: 34, height: 34, borderRadius: '50%', background: pageBg }} />
      <span style={{ position: 'absolute', right: -17, width: 34, height: 34, borderRadius: '50%', background: pageBg }} />
    </div>
  );
}

function Eyebrow({ children, color = T.coral }: { children: ReactNode; color?: string }) {
  return (
    <div style={{ fontFamily: SANS, fontSize: 11.5, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color }}>
      {children}
    </div>
  );
}

/* ---------- 1 · live-ops guest-check ticker (top ribbon) ---------- */

function GuestCheckTicker() {
  const reduce = useReducedMotion();
  const [n, setN] = useState(1287);
  useEffect(() => {
    const id = setInterval(() => setN((v) => v + 1), 4200);
    return () => clearInterval(id);
  }, []);

  const cellStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '0 22px',
    fontFamily: MONO,
    fontSize: 12.5,
    color: 'rgba(251,248,244,0.82)',
    borderRight: '1px solid rgba(246,198,107,0.16)',
    whiteSpace: 'nowrap',
  };
  const up = <span style={{ color: T.positive }}>▲</span>;
  const cells = (
    <>
      <span style={{ ...cellStyle, color: T.amber }}>№ {pad6(n)}</span>
      <span style={cellStyle}>GUEST CHECK · SUN 10:35 PM</span>
      <span style={cellStyle}>REVENUE&nbsp;<b style={{ color: T.display }}>$41,804</b>&nbsp;{up} 12%</span>
      <span style={cellStyle}>COVERS&nbsp;<b style={{ color: T.display }}>908</b>&nbsp;{up} 12%</span>
      <span style={cellStyle}>AVG CHECK&nbsp;<b style={{ color: T.display }}>$45</b></span>
      <span style={cellStyle}>LABOR&nbsp;<b style={{ color: T.display }}>8.6%</b>&nbsp;· UNDER 25%</span>
      <span style={{ ...cellStyle, color: T.coral }}>NEXT MOVE — Hold the 9 PM cut</span>
    </>
  );

  return (
    <div
      style={{
        position: 'relative',
        background: T.surface,
        borderTop: '1px solid rgba(246,198,107,0.18)',
        borderBottom: '1px solid rgba(246,198,107,0.18)',
        overflow: 'hidden',
        height: 46,
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {reduce ? (
        <div style={{ display: 'flex', overflowX: 'auto', width: '100%' }}>{cells}</div>
      ) : (
        <motion.div
          style={{ display: 'flex', flexShrink: 0 }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 34, ease: 'linear', repeat: Infinity }}
        >
          <div style={{ display: 'flex', flexShrink: 0 }}>{cells}</div>
          <div style={{ display: 'flex', flexShrink: 0 }} aria-hidden>
            {cells}
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ---------- 2 · the receipt "next move" card (hero companion) ---------- */

function NextMoveReceipt() {
  const reduce = useReducedMotion();
  const rows: Array<[string, string, string]> = [
    ['REVENUE PACE', '$41,804', '▲ 12%'],
    ['END-OF-DAY PROJ.', '$44,888', '+$27K vs target'],
    ['COVERS', '908', '▲ 12%'],
    ['LABOR %', '8.6%', 'UNDER 25%'],
  ];
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28, rotate: -2.4 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: 'min(420px, 86vw)',
        background: T.cream,
        color: T.creamInk,
        borderRadius: 12,
        padding: '20px 22px 18px',
        fontFamily: MONO,
        boxShadow: '0 26px 60px -20px rgba(0,0,0,0.6)',
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 16, right: 16, borderTop: '2px dashed rgba(42,35,32,0.22)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12.5, letterSpacing: '0.1em', color: '#6b6259' }}>
          <Cherry size={13} /> SUNDAE · GUEST CHECK
        </span>
        <span style={{ fontSize: 11, color: '#9a8f80' }}>TABLE — DECISION INTELLIGENCE</span>
      </div>
      <div style={{ borderTop: '1px solid rgba(42,35,32,0.14)', margin: '12px 0' }} />
      {rows.map(([l, v, d]) => (
        <div key={l} style={{ display: 'flex', alignItems: 'baseline', fontSize: 13, padding: '4px 0' }}>
          <span style={{ color: '#6b6259', letterSpacing: '0.06em' }}>{l}</span>
          <span style={{ flex: 1, borderBottom: '1px dotted rgba(42,35,32,0.28)', margin: '0 8px', transform: 'translateY(-3px)' }} />
          <span style={{ fontWeight: 700 }}>{v}</span>
          <span style={{ color: T.positive, fontSize: 11, marginLeft: 10, minWidth: 84, textAlign: 'right' }}>{d}</span>
        </div>
      ))}
      <div style={{ borderTop: '2px dashed rgba(42,35,32,0.22)', margin: '12px 0 12px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: T.cherry, fontWeight: 700, fontSize: 13, letterSpacing: '0.05em' }}>NEXT MOVE</span>
        <span style={{ fontSize: 12.5 }}>Hold the 9 PM cut — 1.5h under</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 16 }}>
        <Barcode />
        <span style={{ fontSize: 10, color: '#9a8f80' }}>5 MIN · SIGNAL→ACTION</span>
      </div>
    </motion.div>
  );
}

/* ---------- 3 · KPI ledger (deck's stat row, warm + ticketed) ---------- */

function Ledger() {
  const stats: Array<[string, string]> = [
    ['5', 'MIN FROM SIGNAL TO ACTION'],
    ['18', 'DECISIONS SURFACED TODAY'],
    ['12', 'OPERATING DOMAINS UNIFIED'],
    ['6', 'INTELLIGENCE LAYERS, ONE TRUTH'],
  ];
  return (
    <section style={{ background: T.espresso, padding: '10px 24px 64px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <Eyebrow color={T.caramel}>The check, read at a glance</Eyebrow>
        <div
          style={{
            marginTop: 22,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            border: '1px solid rgba(246,198,107,0.22)',
            borderRadius: 14,
            overflow: 'hidden',
          }}
        >
          {stats.map(([num, label], i) => (
            <div
              key={label}
              style={{
                padding: '26px 24px',
                borderRight: i < stats.length - 1 ? '1px solid rgba(246,198,107,0.16)' : 'none',
                borderBottom: '1px solid rgba(246,198,107,0.16)',
                display: 'flex',
                alignItems: 'baseline',
                gap: 14,
              }}
            >
              <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 52, lineHeight: 1, color: T.caramel }}>{num}</span>
              <span style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: '0.08em', color: 'rgba(251,248,244,0.78)', lineHeight: 1.4 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 4 · closing restaurant-check CTA ---------- */

function ClosingCheck() {
  const reduce = useReducedMotion();
  return (
    <section style={{ background: T.espresso, padding: '20px 24px 110px', position: 'relative' }}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(60% 60% at 50% 30%, rgba(255,92,77,0.10), transparent 60%)',
        }}
      />
      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 'clamp(30px,4vw,46px)', lineHeight: 1.04, letterSpacing: '-0.03em', color: T.display, margin: 0 }}>
          Stop running your restaurants
          <br />
          on <span style={{ fontStyle: 'italic', color: T.amber }}>yesterday&apos;s numbers</span>
        </h2>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 26, rotate: 1.6 }}
          whileInView={{ opacity: 1, y: 0, rotate: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 'min(440px, 88vw)',
            margin: '34px auto 0',
            background: T.cream,
            color: T.creamInk,
            borderRadius: 12,
            padding: '22px 26px 20px',
            fontFamily: MONO,
            boxShadow: '0 26px 60px -20px rgba(0,0,0,0.6)',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 16, right: 16, borderTop: '2px dashed rgba(42,35,32,0.22)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, letterSpacing: '0.1em', color: '#6b6259', paddingTop: 8 }}>
            <span>SUNDAE</span>
            <span>THE CHECK</span>
          </div>
          <div style={{ borderTop: '1px solid rgba(42,35,32,0.14)', margin: '12px 0' }} />
          {[
            ['Decision intelligence', 'INCLUDED'],
            ['Every layer, one truth', 'INCLUDED'],
            ['Time-to-action', '5 MIN'],
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'baseline', fontSize: 13, padding: '4px 0' }}>
              <span style={{ color: '#6b6259' }}>{l}</span>
              <span style={{ flex: 1, borderBottom: '1px dotted rgba(42,35,32,0.28)', margin: '0 8px', transform: 'translateY(-3px)' }} />
              <span style={{ fontWeight: 700 }}>{v}</span>
            </div>
          ))}
          <div style={{ borderTop: '2px dashed rgba(42,35,32,0.22)', margin: '12px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <span style={{ fontSize: 13, color: '#6b6259' }}>TOTAL</span>
            <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 22, color: T.creamInk }}>One clear move</span>
          </div>
          <a
            href="/demo"
            style={{
              display: 'block',
              textAlign: 'center',
              fontFamily: SANS,
              fontWeight: 700,
              fontSize: 15,
              color: '#fff',
              padding: '13px 22px',
              borderRadius: 10,
              textDecoration: 'none',
              background: `linear-gradient(180deg, #FF7E6F, ${T.cherry})`,
              boxShadow: '0 14px 38px -12px rgba(224,62,72,.6)',
            }}
          >
            Book a demo
          </a>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 16 }}>
            <Barcode />
            <span style={{ fontSize: 10, color: '#9a8f80' }}>THANK YOU — PLEASE COME AGAIN</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- page ---------- */

export function ElevatedHome() {
  return (
    <div style={{ background: T.espresso }}>
      {/* clear the fixed global navbar (it is h-20 = 80px tall) */}
      <div style={{ height: 80 }} />
      <GuestCheckTicker />

      {/* the REAL animated hero, untouched */}
      <SectionCinematicIntro />

      {/* receipt "next move" card, overlapping the hero seam */}
      <div style={{ position: 'relative', zIndex: 20, marginTop: -54, display: 'flex', justifyContent: 'center', padding: '0 24px 8px' }}>
        <NextMoveReceipt />
      </div>

      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <ReceiptDivider />
      </div>

      <Ledger />

      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <ReceiptDivider />
      </div>

      <ClosingCheck />
    </div>
  );
}
