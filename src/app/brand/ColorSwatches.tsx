"use client";

import { useState } from "react";

type Swatch = { name: string; hex: string; role: string; dark?: boolean };

const WARM: Swatch[] = [
  { name: "Coral", hex: "#FF5C4D", role: "Primary accent" },
  { name: "Cherry", hex: "#E03E48", role: "The signal" },
  { name: "Rose", hex: "#F7A088", role: "Warm mid" },
  { name: "Caramel", hex: "#E9A24A", role: "Warm mid" },
  { name: "Amber", hex: "#F6C66B", role: "Warm light" },
  { name: "Clay", hex: "#B23A1E", role: "Deep base" },
  { name: "Burnt", hex: "#C2410C", role: "Gradient anchor" },
];

const NEUTRAL: Swatch[] = [
  { name: "Cream", hex: "#F6F1E8", role: "Warm relief" },
  { name: "Espresso", hex: "#171210", role: "Mark tile", dark: true },
  { name: "Canvas", hex: "#15110D", role: "Page ground", dark: true },
];

function readable(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? "#1A140F" : "#F6F1E8";
}

function SwatchTile({ s }: { s: Swatch }) {
  const [copied, setCopied] = useState(false);
  const ink = readable(s.hex);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(s.hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${s.name} ${s.hex}`}
      className="group relative flex h-32 w-full flex-col justify-end overflow-hidden rounded-2xl border border-[var(--border-default)] p-4 text-left transition-transform duration-200 hover:-translate-y-0.5"
      style={{ backgroundColor: s.hex }}
    >
      <span
        className="absolute right-3 top-3 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ color: ink, backgroundColor: "rgba(255,255,255,0.14)" }}
      >
        {copied ? "Copied" : "Copy"}
      </span>
      <span className="font-display text-lg leading-none" style={{ color: ink }}>
        {s.name}
      </span>
      <span
        className="mt-1 font-mono text-xs uppercase tracking-wide"
        style={{ color: ink, opacity: 0.85 }}
      >
        {s.hex}
      </span>
      <span className="mt-0.5 text-xs" style={{ color: ink, opacity: 0.6 }}>
        {s.role}
      </span>
    </button>
  );
}

export function ColorSwatches() {
  return (
    <div className="space-y-10">
      {/* The mark gradient — the brand's signature */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="eyebrow">Signature gradient</span>
          <span className="font-mono text-xs text-[var(--text-muted)]">
            cream → clay, top to bottom
          </span>
        </div>
        <div
          className="h-16 w-full rounded-2xl border border-[var(--border-default)]"
          style={{
            background:
              "linear-gradient(180deg,#F6F1E8 0%,#F6C66B 15%,#E9A24A 33%,#F7A088 52%,#FF5C4D 68%,#E03E48 84%,#B23A1E 100%)",
          }}
        />
      </div>

      <div>
        <span className="eyebrow mb-3 block">Warm signature</span>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {WARM.map((s) => (
            <SwatchTile key={s.hex} s={s} />
          ))}
        </div>
      </div>

      <div>
        <span className="eyebrow mb-3 block">Neutrals</span>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {NEUTRAL.map((s) => (
            <SwatchTile key={s.hex} s={s} />
          ))}
        </div>
      </div>

      <p className="text-sm text-[var(--text-muted)]">
        Click any swatch to copy its hex. Coral{" "}
        <span className="font-mono text-[var(--text-supporting)]">#FF5C4D</span> is
        the primary accent; the cherry is always the signal.
      </p>
    </div>
  );
}

export default ColorSwatches;
