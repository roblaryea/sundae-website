"use client";

/**
 * TEMPORARY wordmark exploration lab - not linked in nav. Lets us compare
 * candidate Sundae logotypes (Fraunces display variants, with/without the
 * cherry "signal", plus the fully custom hand-drawn SVG) side by side, in
 * light and dark, at lockup + display sizes. Delete once the wordmark is locked.
 *
 * View at /wordmark-lab.
 */
import { SundaeMark } from "@/components/ui/SundaeMark";
import { SundaeWordmark } from "@/components/home/sections/SundaeWordmark";

/** Raised coral cherry "signal" accent that perches at the top-right of the word. */
function CherrySignal({ size = 0.46 }: { size?: number }) {
  return (
    <span style={{ position: "relative", display: "inline-block", width: 0, height: 0 }} aria-hidden>
      <svg
        width={`${size}em`}
        height={`${size * 1.18}em`}
        viewBox="0 0 22 26"
        style={{ position: "absolute", left: "0.06em", bottom: "0.42em" }}
      >
        <path d="M5 11 C7 6 12 4 19 3" stroke="#7d1f12" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <circle cx="6.5" cy="16" r="5.6" fill="#E8404A" />
        <ellipse cx="4.8" cy="13.8" rx="1.6" ry="1" fill="#FF8275" />
      </svg>
    </span>
  );
}

const CANDIDATES: { id: string; label: string; style: React.CSSProperties; cherry?: boolean }[] = [
  { id: "1", label: "Crisp display", style: { fontVariationSettings: "'opsz' 144,'SOFT' 0,'WONK' 0", fontWeight: 640 } },
  { id: "2", label: "Crisp + cherry signal (recommended)", style: { fontVariationSettings: "'opsz' 144,'SOFT' 0,'WONK' 0", fontWeight: 640 }, cherry: true },
  { id: "3", label: "Italic display", style: { fontVariationSettings: "'opsz' 144,'SOFT' 70,'WONK' 1", fontWeight: 600, fontStyle: "italic" } },
  { id: "4", label: "Italic + cherry signal", style: { fontVariationSettings: "'opsz' 144,'SOFT' 70,'WONK' 1", fontWeight: 600, fontStyle: "italic" }, cherry: true },
  { id: "5", label: "Soft display + cherry (current direction)", style: { fontVariationSettings: "'opsz' 144,'SOFT' 90,'WONK' 1", fontWeight: 600 }, cherry: true },
];

function Word({ style, cherry, size }: { style: React.CSSProperties; cherry?: boolean; size: number }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-display)",
        fontOpticalSizing: "none",
        letterSpacing: "-0.018em",
        lineHeight: 1.25,
        fontSize: size,
        ...style,
      }}
    >
      sundae
      {cherry && <CherrySignal />}
    </span>
  );
}

function Panel({ dark }: { dark: boolean }) {
  return (
    <div
      style={{
        background: dark ? "#15110D" : "#FFFFFF",
        color: dark ? "#FBF8F4" : "#2A2320",
        padding: "32px 40px",
        borderRadius: 18,
      }}
    >
      <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5, marginBottom: 18 }}>
        {dark ? "Dark" : "Light"}
      </div>
      {CANDIDATES.map((c) => (
        <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 28, padding: "16px 0", borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "#eee"}` }}>
          <div style={{ width: 180, fontSize: 12, opacity: 0.6, fontFamily: "var(--font-hanken)" }}>{c.id} · {c.label}</div>
          {/* lockup size (navbar) */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <SundaeMark size={28} />
            <Word style={c.style} cherry={c.cherry} size={26} />
          </div>
          {/* display size, standalone */}
          <Word style={c.style} cherry={c.cherry} size={56} />
        </div>
      ))}
      {/* existing fully custom geometric SVG wordmark, for reference */}
      <div style={{ display: "flex", alignItems: "center", gap: 28, paddingTop: 20 }}>
        <div style={{ width: 180, fontSize: 12, opacity: 0.6, fontFamily: "var(--font-hanken)" }}>C · Custom SVG (existing, geometric sans)</div>
        <SundaeWordmark className="h-7 w-auto" style={{ color: dark ? "#FBF8F4" : "#2A2320" }} />
        <SundaeWordmark className="h-12 w-auto" style={{ color: dark ? "#FBF8F4" : "#2A2320" }} />
      </div>
    </div>
  );
}

export default function WordmarkLab() {
  return (
    <div style={{ minHeight: "100vh", background: "#0b0b0d", padding: "80px 40px 120px", display: "grid", gap: 28, maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--font-display)", color: "#FBF8F4", fontSize: 32, fontVariationSettings: "'opsz' 144" }}>
        Wordmark lab
      </h1>
      <Panel dark={false} />
      <Panel dark />
    </div>
  );
}
