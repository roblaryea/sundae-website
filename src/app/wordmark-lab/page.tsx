"use client";

/**
 * TEMPORARY wordmark exploration lab - not linked in nav. Compares ways to
 * INTEGRATE the cherry into a letterform (the d-bowl = "discovered"; the e-eye =
 * "memorable") vs a plain control, so the wordmark feels crafted, not "typed word
 * + decorative dot". View at /wordmark-lab. Delete once locked.
 */
import { SundaeMark } from "@/components/ui/SundaeMark";

const CRISP: React.CSSProperties = { fontVariationSettings: "'opsz' 144,'SOFT' 0,'WONK' 0", fontWeight: 640 };

/** Flat coral cherry that FILLS a glyph counter (the negative space becomes the
 *  cherry) - reads as part of the letter, not a 3-D ball stuck on top. */
function Cherry({ d, left, top, glossy = false }: { d: string; left: string; top: string; glossy?: boolean }) {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        left,
        top,
        width: d,
        height: d,
        borderRadius: "50%",
        background: glossy
          ? "radial-gradient(circle at 34% 30%, #FF8275 0%, #E8404A 52%, #A81B29 100%)"
          : "#E8404A",
      }}
    />
  );
}

type Mode = "none" | "d-bowl" | "e-eye" | "e-aperture";

/**
 * Renders "sundae" with the target letter wrapped in its own relative box so a
 * cherry can be nested precisely in that glyph's counter (positions are em-based
 * so they scale with the wordmark). Tuned for Fraunces crisp display.
 */
function Word({ size, mode }: { size: number; mode: Mode }) {
  const base: React.CSSProperties = {
    fontFamily: "var(--font-display)", fontOpticalSizing: "none",
    letterSpacing: "-0.018em", lineHeight: 1.3, fontSize: size, ...CRISP,
  };
  const letter = (ch: string, cherry?: React.ReactNode) => (
    <span style={{ position: "relative", display: "inline-block" }}>{ch}{cherry}</span>
  );
  return (
    <span style={base}>
      {mode === "d-bowl" ? (
        <>sun{letter("d", <Cherry d="0.2em" left="0.12em" top="0.625em" />)}ae</>
      ) : mode === "e-eye" ? (
        <>sunda{letter("e", <Cherry d="0.16em" left="0.135em" top="0.45em" />)}</>
      ) : mode === "e-aperture" ? (
        <>sunda{letter("e", <Cherry d="0.2em" left="0.265em" top="0.6em" />)}</>
      ) : (
        <>sundae</>
      )}
    </span>
  );
}

const ROWS: { id: string; label: string; mode: Mode }[] = [
  { id: "D", label: "Cherry in the d-bowl (discovered)", mode: "d-bowl" },
  { id: "E1", label: "Cherry in the e-eye (memorable)", mode: "e-eye" },
  { id: "E2", label: "Cherry in the e-aperture", mode: "e-aperture" },
  { id: "0", label: "Control (no cherry)", mode: "none" },
];

function Panel({ dark }: { dark: boolean }) {
  return (
    <div style={{ background: dark ? "#15110D" : "#FFFFFF", color: dark ? "#FBF8F4" : "#2A2320", padding: "32px 40px", borderRadius: 18 }}>
      <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5, marginBottom: 18, fontFamily: "var(--font-hanken)" }}>{dark ? "Dark" : "Light"}</div>
      {ROWS.map((r) => (
        <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 28, padding: "20px 0", borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "#eee"}` }}>
          <div style={{ width: 220, fontSize: 12, opacity: 0.6, fontFamily: "var(--font-hanken)" }}>{r.id} · {r.label}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <SundaeMark size={28} />
            <Word size={26} mode={r.mode} />
          </div>
          <Word size={68} mode={r.mode} />
        </div>
      ))}
    </div>
  );
}

export default function WordmarkLab() {
  return (
    <div style={{ minHeight: "100vh", background: "#0b0b0d", padding: "80px 40px 120px", display: "grid", gap: 28, maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--font-display)", color: "#FBF8F4", fontSize: 32, fontVariationSettings: "'opsz' 144" }}>Wordmark lab · cherry integrated into the letterform</h1>
      <Panel dark={false} />
      <Panel dark />
    </div>
  );
}
