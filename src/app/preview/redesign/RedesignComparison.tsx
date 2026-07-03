'use client';

import { useState, type CSSProperties, type ReactNode } from 'react';
import { SundaeMark } from '@/components/ui/SundaeMark';
import { SundaeLogotype } from '@/components/ui/SundaeLogotype';

/* ------------------------------------------------------------------ *
 * Tokens
 * ------------------------------------------------------------------ */

// Proposed direction (Curfs Consult, June 2026) - values eyeballed from the deck.
const P = {
  cream: '#FAF5E1',
  creamDeep: '#F3ECCF',
  inkBlue: '#2A1FCB', // Dark / Bright Blue
  inkGreen: '#15633E', // Dark / Bright Green
  cherry: '#D72631', // Cherry Red
  yellow: '#F4C20D',
  orange: '#E8731C',
  lemon: '#F6EDA2', // Lemon Custard
  coralPink: '#F08A78',
  skyBlue: '#2E6FD0',
  emerald: '#46B189',
  choco: '#3A241B',
  silver: '#C2C4C6',
};

// Current live brand (from src/styles/tokens.css).
const C = {
  espresso: '#15110D',
  surface: '#1F1A15',
  coral: '#FF5C4D',
  amber: '#F6C66B',
  caramel: '#E9A24A',
  cherry: '#E03E48',
  brick: '#B23A1E',
  display: '#FBF8F4',
  cream: '#F6F1E8',
};

const FONT = {
  times: "'Times New Roman', Times, serif",
  arial: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
  fraunces: 'var(--font-fraunces), Georgia, serif',
  hanken: 'var(--font-hanken), system-ui, sans-serif',
  mono: 'var(--font-geist-mono), ui-monospace, monospace',
};

const SUB =
  'Sundae connects every layer of the business — revenue, labor, inventory, guests, marketing, and outlet performance — so teams can see what changed and act while it still matters.';

/* ------------------------------------------------------------------ *
 * Small graphic primitives
 * ------------------------------------------------------------------ */

function Cherry({ size = 16, color = P.cherry, stem = P.choco }: { size?: number; color?: string; stem?: string }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 40 52" aria-hidden>
      <path d="M20 14 C24 6 31 3 37 4" stroke={stem} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="16" cy="38" r="12" fill={color} />
      <ellipse cx="12" cy="33" rx="3.4" ry="2.4" fill="#fff" opacity="0.45" />
    </svg>
  );
}

function Spoon({ size = 26, color = P.silver }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size * 2.6} viewBox="0 0 40 104" aria-hidden>
      <ellipse cx="20" cy="20" rx="14" ry="19" fill={color} />
      <rect x="16.5" y="34" width="7" height="66" rx="3.5" fill={color} />
    </svg>
  );
}

// Current brand: the abstract "glass filling with business strata" + cherry.
function StrataGlass({ bands, height = 250 }: { bands: string[]; height?: number }) {
  const top = 74;
  const bottom = 186;
  const step = (bottom - top) / bands.length;
  return (
    <svg width={height * 0.86} height={height} viewBox="0 0 220 260" aria-hidden>
      <defs>
        <clipPath id="bowlClip">
          <path d="M42,74 C42,150 82,186 110,186 C138,186 178,150 178,74 Z" />
        </clipPath>
      </defs>
      {/* strata */}
      <g clipPath="url(#bowlClip)">
        {bands.map((c, i) => (
          <rect key={i} x="40" y={top + i * step} width="140" height={step + 0.6} fill={c} />
        ))}
      </g>
      {/* rim */}
      <ellipse cx="110" cy="74" rx="68" ry="13" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.4" />
      <path d="M42,74 C42,150 82,186 110,186 C138,186 178,150 178,74" fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth="2" />
      {/* stem + foot */}
      <rect x="103" y="186" width="14" height="36" fill={P.silver} opacity="0.85" />
      <ellipse cx="110" cy="226" rx="44" ry="9" fill={P.silver} opacity="0.85" />
      {/* cherry on top */}
      <path d="M126,52 C132,40 142,36 150,34" stroke={C.brick} strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="124" cy="56" r="15" fill={C.cherry} />
      <ellipse cx="119" cy="50" rx="4" ry="3" fill="#fff" opacity="0.4" />
    </svg>
  );
}

// Faithful-deck stand-in for the retro sundae photograph (illustration only).
function SundaeCoupe({ height = 250 }: { height?: number }) {
  return (
    <svg width={height * 0.86} height={height} viewBox="0 0 220 260" aria-hidden>
      {/* glass */}
      <path d="M48,96 C48,156 84,190 110,190 C136,190 172,156 172,96 Z" fill="rgba(255,255,255,0.5)" stroke={P.silver} strokeWidth="2.5" />
      <ellipse cx="110" cy="96" rx="62" ry="12" fill="rgba(255,255,255,0.65)" stroke={P.silver} strokeWidth="2.5" />
      <rect x="104" y="190" width="12" height="34" fill={P.silver} />
      <ellipse cx="110" cy="228" rx="40" ry="8" fill={P.silver} />
      {/* scoops */}
      <circle cx="92" cy="86" r="26" fill="#FBEFD4" />
      <circle cx="126" cy="84" r="24" fill="#F7E4C2" />
      {/* sauce drizzle */}
      <path d="M74,92 C84,104 96,98 104,110 C112,122 128,112 140,120" stroke={P.choco} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8" />
      {/* wafer */}
      <rect x="132" y="40" width="11" height="56" rx="2" transform="rotate(16 137 68)" fill="#E7C892" stroke={P.choco} strokeWidth="1.4" opacity="0.9" />
      {/* cherry */}
      <path d="M104,60 C110,48 120,46 128,46" stroke={P.choco} strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <circle cx="100" cy="64" r="15" fill={P.cherry} />
      <ellipse cx="95" cy="58" rx="4" ry="3" fill="#fff" opacity="0.45" />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Shared hero chrome (the "ticket / guest-check" framing from the deck)
 * ------------------------------------------------------------------ */

function TicketNav({
  ink,
  line,
  counter,
  font,
}: {
  ink: string;
  line: string;
  counter: string;
  font: string;
}) {
  const items = ['Products', 'Solutions', 'About', 'Resources', 'EN'];
  const cell: CSSProperties = {
    border: `1px solid ${line}`,
    padding: '5px 12px',
    fontFamily: font,
    fontSize: 12,
    letterSpacing: '0.02em',
    color: ink,
    whiteSpace: 'nowrap',
  };
  return (
    <div style={{ display: 'flex', alignItems: 'stretch' }}>
      {items.map((it) => (
        <div key={it} style={cell}>
          {it}
        </div>
      ))}
      <div style={{ ...cell, fontFamily: FONT.mono, color: counter, letterSpacing: '0.18em' }}>012345</div>
    </div>
  );
}

function HeroFrame({
  bg,
  border,
  children,
}: {
  bg: string;
  border: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 4,
        padding: '30px 34px 34px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 430,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Hero A - CURRENT (live brand, faithfully reconstructed, static)
 * ------------------------------------------------------------------ */

function HeroCurrent() {
  return (
    <HeroFrame bg={C.espresso} border="rgba(255,255,255,0.12)">
      {/* top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SundaeMark size={26} />
          <SundaeLogotype className="text-[#FBF8F4]" style={{ fontSize: 24 }} />
        </div>
        <div style={{ display: 'flex', gap: 18, fontFamily: FONT.hanken, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
          <span>Products</span>
          <span>Solutions</span>
          <span>About</span>
          <span>Resources</span>
          <span style={{ color: C.amber }}>Sign in</span>
        </div>
      </div>
      <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '22px 0' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 24, alignItems: 'center' }}>
        <div>
          <div
            style={{
              fontFamily: FONT.hanken,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(246,241,232,0.62)',
            }}
          >
            Decision intelligence for multi-location operators
          </div>
          <h2
            style={{
              fontFamily: FONT.fraunces,
              fontWeight: 700,
              fontSize: 46,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              color: C.display,
              margin: '14px 0 0',
            }}
          >
            See every layer
            <br />
            <span style={{ fontStyle: 'italic', color: C.amber, textShadow: `0 0 30px rgba(246,198,107,0.4)` }}>act in time</span>
          </h2>
          <p style={{ fontFamily: FONT.hanken, fontSize: 14.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.72)', margin: '18px 0 22px', maxWidth: 380 }}>
            {SUB}
          </p>
          <span
            style={{
              display: 'inline-block',
              fontFamily: FONT.hanken,
              fontWeight: 600,
              fontSize: 14,
              color: '#fff',
              padding: '11px 22px',
              borderRadius: 10,
              background: `linear-gradient(135deg, ${C.caramel}, ${C.coral} 52%, ${C.cherry})`,
              boxShadow: `0 8px 26px rgba(255,92,77,0.35)`,
            }}
          >
            Book a demo
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <StrataGlass bands={[C.amber, C.caramel, '#F7A088', C.coral, C.cherry, C.brick, C.cream]} height={240} />
        </div>
      </div>
    </HeroFrame>
  );
}

/* ------------------------------------------------------------------ *
 * Hero D - CURRENT, ELEVATED (the recommended path)
 * Keeps the warm-dark Fraunces system + strata glass + cherry entirely;
 * infuses the ONE genuinely great idea from the deck - the guest-check /
 * receipt / ticket motif - restained into the warm palette, plus a cream
 * "relief" receipt strip that makes the hero feel operational & alive.
 * ------------------------------------------------------------------ */

function PerforatedRule({ color = 'rgba(246,198,107,0.45)' }: { color?: string }) {
  return <div style={{ height: 1, borderTop: `1.5px dashed ${color}`, width: '100%' }} />;
}

function TicketNavWarm() {
  const items = ['Products', 'Solutions', 'About', 'Resources', 'EN'];
  const cell: CSSProperties = {
    border: '1px solid rgba(246,198,107,0.28)',
    padding: '5px 12px',
    fontFamily: FONT.hanken,
    fontSize: 12,
    letterSpacing: '0.02em',
    color: 'rgba(255,255,255,0.72)',
    whiteSpace: 'nowrap',
  };
  return (
    <div style={{ display: 'flex', alignItems: 'stretch' }}>
      {items.map((it) => (
        <div key={it} style={cell}>
          {it}
        </div>
      ))}
      <div style={{ ...cell, fontFamily: FONT.mono, color: C.amber, letterSpacing: '0.16em' }}>№ 012345</div>
    </div>
  );
}

// The signature infusion: a cream "guest check" strip - the deck's dashboard
// card reframed as a kitchen ticket, in the warm palette, tying product +
// brand + the proposal's one strong idea together.
function ReceiptStrip() {
  const rows: Array<[string, string, string, string]> = [
    ['REVENUE', '$41,804', '▲ 12%', '#16A34A'],
    ['COVERS', '908', '▲ 12%', '#16A34A'],
    ['LABOR %', '8.6%', 'UNDER 25%', '#16A34A'],
  ];
  return (
    <div style={{ background: C.cream, borderRadius: 10, padding: '14px 18px 16px', fontFamily: FONT.mono, color: '#2A2320', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.35)' }}>
      <div style={{ position: 'absolute', top: 0, left: 14, right: 14, borderTop: '2px dashed rgba(42,35,32,0.25)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, letterSpacing: '0.12em', color: '#6b6259', paddingTop: 6 }}>
        <span>SUNDAE · GUEST CHECK</span>
        <span>SUN 10:35 PM</span>
      </div>
      <div style={{ borderTop: '1px solid rgba(42,35,32,0.15)', margin: '10px 0' }} />
      {rows.map(([label, val, delta, dc]) => (
        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 13, padding: '3px 0' }}>
          <span style={{ color: '#6b6259', letterSpacing: '0.08em' }}>{label}</span>
          <span style={{ flex: 1, borderBottom: '1px dotted rgba(42,35,32,0.25)', margin: '0 8px', transform: 'translateY(-3px)' }} />
          <span style={{ fontWeight: 700 }}>{val}</span>
          <span style={{ color: dc, fontSize: 11, marginLeft: 10, minWidth: 64, textAlign: 'right' }}>{delta}</span>
        </div>
      ))}
      <div style={{ borderTop: '2px dashed rgba(42,35,32,0.25)', margin: '12px 0 10px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12.5 }}>
        <span style={{ color: C.cherry, fontWeight: 700, letterSpacing: '0.06em' }}>NEXT MOVE</span>
        <span style={{ color: '#2A2320' }}>Hold the 9 PM cut — 1.5h under budget</span>
      </div>
    </div>
  );
}

function HeroCurrentElevated() {
  return (
    <HeroFrame bg={C.espresso} border="rgba(246,198,107,0.22)">
      {/* top: wordmark + warm ticket nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SundaeMark size={26} />
          <SundaeLogotype className="text-[#FBF8F4]" style={{ fontSize: 24 }} />
        </div>
        <TicketNavWarm />
      </div>

      <div style={{ margin: '18px 0' }}>
        <PerforatedRule />
      </div>

      {/* guest-check header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
        <span style={{ fontFamily: FONT.hanken, fontWeight: 700, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(246,241,232,0.62)' }}>
          Decision intelligence for multi-location operators
        </span>
        <span style={{ fontFamily: FONT.mono, fontSize: 12, color: C.amber, letterSpacing: '0.08em' }}>SIGN IN</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 24, alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: FONT.fraunces, fontWeight: 700, fontSize: 46, lineHeight: 1.02, letterSpacing: '-0.03em', color: C.display, margin: 0 }}>
            See every layer
            <br />
            <span style={{ fontStyle: 'italic', color: C.amber, textShadow: '0 0 30px rgba(246,198,107,0.4)' }}>act in time</span>
          </h2>
          <p style={{ fontFamily: FONT.hanken, fontSize: 14.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.72)', margin: '18px 0 22px', maxWidth: 380 }}>{SUB}</p>
          <span
            style={{
              display: 'inline-block',
              fontFamily: FONT.hanken,
              fontWeight: 600,
              fontSize: 14,
              color: '#fff',
              padding: '11px 22px',
              borderRadius: 10,
              background: `linear-gradient(135deg, ${C.caramel}, ${C.coral} 52%, ${C.cherry})`,
              boxShadow: '0 8px 26px rgba(255,92,77,0.35)',
            }}
          >
            Book a demo
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <StrataGlass bands={[C.amber, C.caramel, '#F7A088', C.coral, C.cherry, C.brick, C.cream]} height={236} />
        </div>
      </div>

      {/* signature infusion: the cream guest-check / receipt strip */}
      <div style={{ marginTop: 26 }}>
        <ReceiptStrip />
      </div>
    </HeroFrame>
  );
}

/* ------------------------------------------------------------------ *
 * Hero B - FAITHFUL to the deck (cream-led, Times + Arial, ticket nav,
 * literal coupe illustration, cherry-red link)
 * ------------------------------------------------------------------ */

function HeroFaithful() {
  return (
    <HeroFrame bg={P.cream} border="rgba(42,31,203,0.25)">
      <Spoon size={22} />
      <div style={{ position: 'absolute', right: 30, bottom: 24, transform: 'rotate(8deg)' }}>
        <Spoon size={20} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: -28 }}>
        <span style={{ fontFamily: FONT.times, fontWeight: 700, fontSize: 28, color: P.inkBlue, letterSpacing: '-0.01em' }}>Sundae</span>
        <TicketNav ink={P.inkGreen} line={P.inkGreen} counter={P.cherry} font={FONT.arial} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${P.inkGreen}`, borderBottom: `1px solid ${P.inkGreen}`, padding: '8px 0', margin: '18px 0 24px' }}>
        <span style={{ fontFamily: FONT.arial, fontWeight: 700, fontSize: 11.5, letterSpacing: '0.04em', textTransform: 'uppercase', color: P.inkBlue }}>
          Decision Intelligence for Multi-Location Operators
        </span>
        <span style={{ fontFamily: FONT.arial, fontSize: 12, color: P.inkGreen }}>Sign in</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.85fr', gap: 24, alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: FONT.times, fontWeight: 700, fontSize: 50, lineHeight: 0.98, color: P.inkBlue, margin: 0 }}>
            See every layer
            <br />
            <span style={{ fontStyle: 'italic' }}>act in time</span>
          </h2>
          <p style={{ fontFamily: FONT.arial, fontSize: 13.5, lineHeight: 1.5, color: P.inkBlue, margin: '20px 0 24px', maxWidth: 360 }}>{SUB}</p>
          <span
            style={{
              fontFamily: FONT.times,
              fontWeight: 700,
              fontSize: 18,
              color: P.cherry,
              borderBottom: `2px solid ${P.cherry}`,
              paddingBottom: 2,
            }}
          >
            Book a demo
          </span>
          <div style={{ marginTop: 30, borderTop: `1px solid ${P.emerald}`, paddingTop: 10 }} />
          <div style={{ borderTop: `1px solid ${P.emerald}`, marginTop: 10 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SundaeCoupe height={236} />
        </div>
      </div>
      <div style={{ position: 'absolute', left: 34, bottom: 14, fontFamily: FONT.arial, fontSize: 10, color: 'rgba(58,36,27,0.5)' }}>
        illustration stands in for the deck&apos;s retro sundae photograph
      </div>
    </HeroFrame>
  );
}

/* ------------------------------------------------------------------ *
 * Hero C - BEST OF BOTH (cream-led; keeps Fraunces + abstract strata +
 * brand cherry; grafts in the guest-check ticket nav, numeric counter,
 * thin rules; proposed accent palette restained onto the strata)
 * ------------------------------------------------------------------ */

function HeroBestOfBoth() {
  return (
    <HeroFrame bg={P.cream} border="rgba(42,31,203,0.22)">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <span style={{ position: 'relative', display: 'inline-block', fontFamily: FONT.fraunces, fontWeight: 600, fontSize: 27, color: P.inkBlue, letterSpacing: '-0.018em' }}>
          sundae
          <span style={{ position: 'absolute', top: -9, right: -13 }}>
            <Cherry size={14} />
          </span>
        </span>
        <TicketNav ink={P.inkBlue} line="rgba(42,31,203,0.35)" counter={P.cherry} font={FONT.hanken} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid rgba(21,99,62,0.5)`, borderBottom: `1px solid rgba(21,99,62,0.5)`, padding: '8px 0', margin: '18px 0 24px' }}>
        <span style={{ fontFamily: FONT.hanken, fontWeight: 700, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: P.inkGreen }}>
          Decision intelligence for multi-location operators
        </span>
        <span style={{ fontFamily: FONT.hanken, fontSize: 12, color: P.inkGreen }}>Sign in</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 24, alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: FONT.fraunces, fontWeight: 700, fontSize: 47, lineHeight: 1.0, letterSpacing: '-0.025em', color: P.inkBlue, margin: 0 }}>
            See every layer
            <br />
            <span style={{ fontStyle: 'italic', color: P.cherry }}>act in time</span>
          </h2>
          <p style={{ fontFamily: FONT.hanken, fontSize: 14, lineHeight: 1.55, color: 'rgba(26,20,15,0.78)', margin: '18px 0 22px', maxWidth: 380 }}>{SUB}</p>
          <span
            style={{
              display: 'inline-block',
              fontFamily: FONT.hanken,
              fontWeight: 600,
              fontSize: 14,
              color: P.cream,
              padding: '11px 22px',
              borderRadius: 10,
              background: P.cherry,
              boxShadow: `0 8px 22px rgba(215,38,49,0.28)`,
            }}
          >
            Book a demo
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <StrataGlass bands={[P.yellow, P.orange, P.coralPink, P.cherry, P.emerald, P.inkGreen, P.skyBlue]} height={240} />
        </div>
      </div>
    </HeroFrame>
  );
}

/* ------------------------------------------------------------------ *
 * Logo lab
 * ------------------------------------------------------------------ */

function LogoTile({ label, dark, children }: { label: string; dark?: boolean; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div
        style={{
          background: dark ? P.inkBlue : P.cream,
          border: `1px solid ${dark ? 'transparent' : 'rgba(42,31,203,0.2)'}`,
          borderRadius: 6,
          height: 96,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
        }}
      >
        {children}
      </div>
      <span style={{ fontFamily: FONT.hanken, fontSize: 11.5, color: '#9a8f80', textAlign: 'center' }}>{label}</span>
    </div>
  );
}

function WordmarkCherry({ font, color, lower }: { font: string; color: string; lower?: boolean }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', fontFamily: font, fontWeight: lower ? 600 : 700, fontSize: 34, color, letterSpacing: lower ? '-0.018em' : '-0.01em' }}>
      {lower ? 'sundae' : 'Sundae'}
      <span style={{ position: 'absolute', top: -11, right: -16 }}>
        <Cherry size={17} />
      </span>
    </span>
  );
}

function LogoLab() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 22 }}>
      <LogoTile label="Current: layered-S mark + wordmark" dark>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SundaeMark size={40} />
          <SundaeLogotype className="text-[#FBF8F4]" style={{ fontSize: 30 }} />
        </div>
      </LogoTile>

      <LogoTile label="Wordmark + cherry (Fraunces) — recommended">
        <WordmarkCherry font={FONT.fraunces} color={P.inkBlue} lower />
      </LogoTile>

      <LogoTile label="Wordmark + cherry (Times, deck face)">
        <WordmarkCherry font={FONT.times} color={P.inkBlue} />
      </LogoTile>

      <LogoTile label="Bare type-only (Times) — the literal P.S. suggestion">
        <span style={{ fontFamily: FONT.times, fontWeight: 700, fontSize: 34, color: P.inkBlue }}>Sundae</span>
      </LogoTile>

      <LogoTile label="Bare type-only (Fraunces)">
        <span style={{ fontFamily: FONT.fraunces, fontWeight: 600, fontSize: 34, color: P.inkBlue, letterSpacing: '-0.018em' }}>sundae</span>
      </LogoTile>

      <LogoTile label="Wordmark + cherry on blue" dark>
        <WordmarkCherry font={FONT.fraunces} color={P.cream} lower />
      </LogoTile>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Reference: palette + type
 * ------------------------------------------------------------------ */

function Swatch({ name, hex }: { name: string; hex: string; ink?: boolean }) {
  return (
    <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)' }}>
      <div style={{ background: hex, height: 54 }} />
      <div style={{ padding: '7px 9px', background: '#fff' }}>
        <div style={{ fontFamily: FONT.hanken, fontSize: 11.5, fontWeight: 600, color: '#2A2320' }}>{name}</div>
        <div style={{ fontFamily: FONT.mono, fontSize: 10.5, color: '#9a8f80' }}>{hex}</div>
      </div>
    </div>
  );
}

function Reference() {
  const swatches: Array<[string, string]> = [
    ['Soft Cream', P.cream],
    ['Dark Bright Blue', P.inkBlue],
    ['Dark Bright Green', P.inkGreen],
    ['Cherry Red', P.cherry],
    ['Yellow', P.yellow],
    ['Orange', P.orange],
    ['Lemon Custard', P.lemon],
    ['Coral Pink', P.coralPink],
    ['Sky Blue', P.skyBlue],
    ['Light Emerald', P.emerald],
    ['Chocolate Brown', P.choco],
    ['Silver Grey', P.silver],
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 26 }}>
      <div>
        <SectionLabel>Proposed palette</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12 }}>
          {swatches.map(([n, h]) => (
            <Swatch key={n} name={n} hex={h} />
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
        <TypeSpecimen title="Deck: Times New Roman / Arial" head={FONT.times} body={FONT.arial} />
        <TypeSpecimen title="Current: Fraunces / Hanken Grotesk" head={FONT.fraunces} body={FONT.hanken} lowerHead />
      </div>
    </div>
  );
}

function TypeSpecimen({ title, head, body, lowerHead }: { title: string; head: string; body: string; lowerHead?: boolean }) {
  return (
    <div style={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8, padding: 18, background: '#fff' }}>
      <div style={{ fontFamily: FONT.hanken, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9a8f80' }}>{title}</div>
      <div style={{ fontFamily: head, fontWeight: 700, fontSize: 36, color: '#1A140F', margin: '10px 0 2px', letterSpacing: lowerHead ? '-0.02em' : 0 }}>
        See every layer <span style={{ fontStyle: 'italic' }}>act in time</span>
      </div>
      <div style={{ fontFamily: body, fontSize: 13, lineHeight: 1.5, color: '#6b6259' }}>
        Sundae connects every layer of the business so teams can see what changed and act while it still matters.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Layout shell
 * ------------------------------------------------------------------ */

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontFamily: FONT.hanken, fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9a8f80', marginBottom: 14 }}>
      {children}
    </div>
  );
}

function Column({ tag, tagColor, title, verdict, children }: { tag: string; tagColor: string; title: string; verdict: string; children: ReactNode }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontFamily: FONT.mono, fontSize: 11, fontWeight: 600, color: '#fff', background: tagColor, padding: '2px 8px', borderRadius: 4 }}>{tag}</span>
        <span style={{ fontFamily: FONT.hanken, fontSize: 15, fontWeight: 700, color: '#1A140F' }}>{title}</span>
      </div>
      <div style={{ fontFamily: FONT.hanken, fontSize: 12.5, lineHeight: 1.5, color: '#6b6259', marginBottom: 14, maxWidth: 560 }}>{verdict}</div>
      {children}
    </div>
  );
}

export function RedesignComparison() {
  const [stacked, setStacked] = useState(true);

  return (
    <div style={{ background: '#F4EFE7', minHeight: '100vh', padding: '40px 0 90px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px' }}>
        {/* header */}
        <div style={{ marginBottom: 34 }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 12, color: P.cherry, letterSpacing: '0.1em' }}>INTERNAL PREVIEW · /preview/redesign</div>
          <h1 style={{ fontFamily: FONT.fraunces, fontWeight: 700, fontSize: 40, color: '#1A140F', margin: '10px 0 8px', letterSpacing: '-0.02em' }}>
            Design direction — side by side
          </h1>
          <p style={{ fontFamily: FONT.hanken, fontSize: 15, lineHeight: 1.55, color: '#6b6259', maxWidth: 720 }}>
            Direction: <strong style={{ color: '#1A140F' }}>keep the current brand</strong>, and infuse only the one genuinely strong idea
            from the proposal — the <strong style={{ color: '#1A140F' }}>guest-check / receipt motif</strong> — restained into the warm
            palette. The three-way deck comparison is kept below for reference. Nothing here ships or touches global styles.
          </p>
          <button
            onClick={() => setStacked((s) => !s)}
            style={{ marginTop: 16, fontFamily: FONT.hanken, fontSize: 13, fontWeight: 600, color: '#1A140F', background: '#fff', border: '1px solid rgba(0,0,0,0.15)', borderRadius: 8, padding: '8px 16px', cursor: 'pointer' }}
          >
            {stacked ? 'View side-by-side (wide)' : 'View stacked'}
          </button>
        </div>

        {/* featured: current brand, elevated */}
        <SectionLabel>★ Recommended — current brand, elevated</SectionLabel>
        <div style={{ marginBottom: 56, maxWidth: 760 }}>
          <Column
            tag="NEW"
            tagColor={C.coral}
            title="Current brand, elevated"
            verdict="Your warm-dark Fraunces system, untouched — same headline, italic amber accent, coral CTA, strata glass, cherry. Infused with the deck's one strong idea: a guest-check ticket nav (warm-toned, with a live № counter), a perforated tear-line, and a cream 'guest check' receipt strip that turns the hero operational. No Times, no cobalt, no literal dessert photo."
          >
            <HeroCurrentElevated />
          </Column>
          <p style={{ fontFamily: FONT.hanken, fontSize: 12.5, lineHeight: 1.5, color: '#9a8f80', marginTop: 12 }}>
            Note: this is a static reconstruction. The live brand also animates (glass fills, cherry drops, glow pulses), so the real
            thing reads richer than this still.
          </p>
        </div>

        {/* heroes */}
        <SectionLabel>For reference — the three deck options</SectionLabel>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: stacked ? '1fr' : 'repeat(3, 1fr)',
            gap: 26,
            marginBottom: 56,
          }}
        >
          <Column tag="LIVE" tagColor="#1A140F" title="Current brand" verdict="Warm dark-first, Fraunces serif, abstract strata-glass metaphor, cherry as signal. High-craft and ownable — the bar to beat.">
            <HeroCurrent />
          </Column>
          <Column tag="DECK" tagColor={P.inkBlue} title="Proposal, faithful" verdict="Cream + cobalt, Times New Roman + Arial, ticket nav, literal sundae photo. Charming and editorial, but Times/Arial risk reading 'unstyled' and a literal dessert can undercut the serious positioning.">
            <HeroFaithful />
          </Column>
          <Column tag="SYNTH" tagColor={P.cherry} title="Best of both" verdict="Keeps Fraunces + the abstract metaphor + brand cherry; grafts in the cream ground, guest-check ticket nav, numeric counter, thin rules, and proposed accents. The recommended path.">
            <HeroBestOfBoth />
          </Column>
        </div>

        {/* logos */}
        <SectionLabel>02 · Logo lab — your two P.S. notes, tested</SectionLabel>
        <div style={{ fontFamily: FONT.hanken, fontSize: 13, lineHeight: 1.55, color: '#6b6259', marginBottom: 18, maxWidth: 720 }}>
          P.S.1 (type-only) and P.S.2 (no &quot;S&quot; beside &quot;Sundae&quot;), rendered both ways. The cherry is your most ownable, on-name asset
          — bare type throws it away. Recommendation: lead with the wordmark + cherry; keep the layered-S for the app icon only.
        </div>
        <div style={{ marginBottom: 56 }}>
          <LogoLab />
        </div>

        {/* reference */}
        <SectionLabel>03 · Reference — palette &amp; type</SectionLabel>
        <Reference />
      </div>
    </div>
  );
}
