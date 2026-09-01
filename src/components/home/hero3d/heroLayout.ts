/**
 * Pure (three.js-free) layout math for the hero glass — shared by the R3F scene
 * (HeroGlass3D) and the label rail (SectionCinematicIntro). Kept dependency-free
 * so importing the fractions into the rail does NOT pull the heavy 3D bundle into
 * the main chunk (the scene itself stays code-split via next/dynamic).
 */

// Bottom → top, matching the brand strata order/colors.
export const LAYER_COLORS = ["#B23A1E", "#E03E48", "#FF5C4D", "#F7A088", "#E9A24A", "#F6C66B", "#F6F1E8"];
export const N = LAYER_COLORS.length;

// Bowl INTERIOR profile (radius at height y), sampled bottom→rim. A tall footed
// sundae/parfait bowl so all seven strata read as distinct bands.
export const INNER: [number, number][] = [
  [-0.62, 0.3],
  [-0.45, 0.41],
  [-0.2, 0.49],
  [0.1, 0.54],
  [0.4, 0.575],
  [0.6, 0.585],
];
export const LIQUID_BOTTOM = -0.62;
export const LIQUID_TOP = 0.6;

export function innerRadius(y: number): number {
  if (y <= INNER[0][0]) return INNER[0][1];
  if (y >= INNER[INNER.length - 1][0]) return INNER[INNER.length - 1][1];
  for (let i = 0; i < INNER.length - 1; i++) {
    const [y0, r0] = INNER[i];
    const [y1, r1] = INNER[i + 1];
    if (y >= y0 && y <= y1) {
      const t = (y - y0) / (y1 - y0);
      return r0 + (r1 - r0) * t;
    }
  }
  return INNER[INNER.length - 1][1];
}

// Camera framing — single source of truth shared by the <Canvas> and the rail.
// The camera looks horizontally (down -Z) at height `y`, so a world-height `h`
// projects to a vertical screen fraction (0 = top of canvas, 1 = bottom).
export const HERO_CAM = { y: -0.2, dist: 6.0, fov: 35 };
const VIS_HALF = HERO_CAM.dist * Math.tan(((HERO_CAM.fov / 2) * Math.PI) / 180);

export function heightToScreenFraction(h: number): number {
  return (1 - (h - HERO_CAM.y) / VIS_HALF) / 2;
}

// Vertical screen fraction of each stratum's centre, index 0 = bottom layer.
export const HERO_LAYER_FRACTIONS: number[] = Array.from({ length: N }, (_, i) => {
  const band = (LIQUID_TOP - LIQUID_BOTTOM) / N;
  return heightToScreenFraction(LIQUID_BOTTOM + (i + 0.5) * band);
});

// The cherry — "the signal" — sits above the strata; its world height + screen
// fraction so the rail can attribute a label to it like the layers.
export const CHERRY_Y = 0.86;
export const HERO_CHERRY_FRACTION = heightToScreenFraction(CHERRY_Y);
