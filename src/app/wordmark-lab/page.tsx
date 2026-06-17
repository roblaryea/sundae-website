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

type Accent = "none" | "period" | "raised";

/** Stalk-free cherry: a glossy coral/red sphere with a soft glint (reads as a
 *  cherry, not a flat dot, but without the twee stem). */
function Cherry({ d = "0.26em" }: { d?: string }) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: d,
        height: d,
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 34% 30%, #FF8275 0%, #E8404A 52%, #A81B29 100%)",
        boxShadow: "inset 0 -0.02em 0.04em rgba(120,20,12,0.45)",
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "22%",
          top: "18%",
          width: "26%",
          height: "26%",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.85)",
          filter: "blur(0.2px)",
        }}
      />
    </span>
  );
}

function Accentize({ accent }: { accent: Accent }) {
  if (accent === "none") return null;
  if (accent === "period") {
    // cherry sits on the baseline as the full-stop
    return (
      <span style={{ marginLeft: "0.04em", verticalAlign: "baseline", display: "inline-block" }}>
        <Cherry d="0.24em" />
      </span>
    );
  }
  // raised: cherry floats at the top-right (the "signal" on top), no stalk
  return (
    <span style={{ position: "relative", display: "inline-block", width: 0, height: 0 }}>
      <span style={{ position: "absolute", left: "0.06em", bottom: "0.6em" }}>
        <Cherry d="0.28em" />
      </span>
    </span>
  );
}

const CANDIDATES: { id: string; label: string; style: React.CSSProperties; accent: Accent }[] = [
  { id: "1", label: "Crisp + cherry period", style: { fontVariationSettings: "'opsz' 144,'SOFT' 0,'WONK' 0", fontWeight: 640 }, accent: "period" },
  { id: "2", label: "Crisp + raised cherry", style: { fontVariationSettings: "'opsz' 144,'SOFT' 0,'WONK' 0", fontWeight: 640 }, accent: "raised" },
  { id: "3", label: "Italic + cherry period", style: { fontVariationSettings: "'opsz' 144,'SOFT' 70,'WONK' 1", fontWeight: 600, fontStyle: "italic" }, accent: "period" },
  { id: "4", label: "Soft display + cherry period", style: { fontVariationSettings: "'opsz' 144,'SOFT' 90,'WONK' 1", fontWeight: 600 }, accent: "period" },
  { id: "5", label: "Heavier + tight + cherry period", style: { fontVariationSettings: "'opsz' 144,'SOFT' 40,'WONK' 1", fontWeight: 720, letterSpacing: "-0.03em" } as React.CSSProperties, accent: "period" },
  { id: "6", label: "Crisp, no cherry (control)", style: { fontVariationSettings: "'opsz' 144,'SOFT' 0,'WONK' 0", fontWeight: 640 }, accent: "none" },
];

function Word({ style, accent, size }: { style: React.CSSProperties; accent: Accent; size: number }) {
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
      <Accentize accent={accent} />
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
            <Word style={c.style} accent={c.accent} size={26} />
          </div>
          {/* display size, standalone */}
          <Word style={c.style} accent={c.accent} size={56} />
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
