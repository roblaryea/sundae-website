"use client";

/**
 * TEMPORARY wordmark lab. Goal: the bowl of the `d` IS a red cherry - a custom
 * glyph (black stem + solid red round bowl) spliced into the Fraunces word, so
 * the cherry is part of the letter, not an inserted dot. View at /wordmark-lab.
 */
import { SundaeMark } from "@/components/ui/SundaeMark";

const CRISP: React.CSSProperties = { fontVariationSettings: "'opsz' 144,'SOFT' 0,'WONK' 0", fontWeight: 640 };

/**
 * Custom lowercase `d` whose bowl is a solid red cherry, joined to a black
 * ascender stem. Drawn in an em-based viewBox so it scales with the wordmark
 * and sits on the text baseline beside the Fraunces letters.
 *
 * Coordinate system: 1000 units = 1em. Baseline at y=780 (≈ leaves room for
 * descenders below). x-height ≈ 520, ascender top ≈ 60.
 */
function CherryD({ stem = "currentColor", glossy = false }: { stem?: string; glossy?: boolean }) {
  // viewBox: 740 tall = ascender height; the SVG's BOTTOM edge sits on the text
  // baseline (vertical-align: baseline). x-height ≈ 520, so the bowl (a circle
  // resting on the baseline) tops out exactly at x-height like the other letters.
  const W = 560, H = 740, xh = 520;
  const r = xh / 2;          // 260
  const cy = H - r;          // 480 -> bottom on baseline (y=740)
  const cx = r;              // 260 -> bowl left-aligned
  const stemW = 96;
  const stemX = W - stemW - 4; // 460 -> stem at the right, overlapping the bowl
  const serif = 70;          // small serif foot half-width
  return (
    <span style={{ display: "inline-block", verticalAlign: "baseline", width: `${W / 1000}em`, height: `${H / 1000}em`, position: "relative" }} aria-label="d">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ display: "block", overflow: "visible" }}>
        <defs>
          <radialGradient id="cherryGloss" cx="0.36" cy="0.3" r="0.75">
            <stop offset="0" stopColor="#FF8275" />
            <stop offset="0.5" stopColor="#E8404A" />
            <stop offset="1" stopColor="#B7212B" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={r} fill={glossy ? "url(#cherryGloss)" : "#E8404A"} />
        {/* stem with a small serif foot so it harmonises with the Fraunces letters */}
        <rect x={stemX} y={0} width={stemW} height={H} rx={4} fill={stem} />
        <rect x={stemX - serif} y={H - 26} width={stemW + serif * 2} height={26} rx={6} fill={stem} />
      </svg>
    </span>
  );
}

type Variant = "flat" | "glossy" | "none";

function Word({ size, variant }: { size: number; variant: Variant }) {
  const base: React.CSSProperties = {
    fontFamily: "var(--font-display)", fontOpticalSizing: "none",
    letterSpacing: "-0.018em", lineHeight: 1.3, fontSize: size, ...CRISP,
  };
  return (
    <span style={base}>
      {variant === "none" ? <>sundae</> : <>sun<CherryD glossy={variant === "glossy"} />ae</>}
    </span>
  );
}

function Panel({ dark }: { dark: boolean }) {
  return (
    <div style={{ background: dark ? "#15110D" : "#FFFFFF", color: dark ? "#FBF8F4" : "#2A2320", padding: "32px 40px", borderRadius: 18 }}>
      <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5, marginBottom: 18, fontFamily: "var(--font-hanken)" }}>{dark ? "Dark" : "Light"}</div>
      {([["D1 · cherry bowl (flat)", "flat"], ["D2 · cherry bowl (glossy)", "glossy"], ["0 · control", "none"]] as [string, Variant][]).map(([label, variant]) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 28, padding: "22px 0", borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "#eee"}` }}>
          <div style={{ width: 170, fontSize: 12, opacity: 0.6, fontFamily: "var(--font-hanken)" }}>{label}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <SundaeMark size={28} />
            <Word size={28} variant={variant} />
          </div>
          <Word size={80} variant={variant} />
        </div>
      ))}
    </div>
  );
}

export default function WordmarkLab() {
  return (
    <div style={{ minHeight: "100vh", background: "#0b0b0d", padding: "80px 40px 120px", display: "grid", gap: 28, maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--font-display)", color: "#FBF8F4", fontSize: 30, fontVariationSettings: "'opsz' 144" }}>Wordmark lab · the d-bowl IS the cherry</h1>
      <Panel dark={false} />
      <Panel dark />
    </div>
  );
}
