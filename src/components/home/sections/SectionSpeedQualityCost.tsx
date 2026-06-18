"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useSettledReducedMotion as useReducedMotion } from "@/lib/useSettledReducedMotion";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { useTheme } from "@/components/ui/ThemeProvider";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/components_home_sections_SectionSpeedQualityCost'

/* ─── i18n copy ─── */

type LocalizedSQC = {
  eyebrow: string;
  headline: string;
  description: string;
  oldRule: string;
  sundaeRule: string;
  closing: string;
  costMetric: string;
  vertices: { label: string; headline: string; body: string; chips: [string, string, string] }[];
};

const localizedCopy: Record<"en" | "ar" | "fr" | "es", LocalizedSQC> = {
  en: {
    costMetric: "Free to start",
    eyebrow: "THE FALSE CHOICE IS OVER",
    headline: "Fast. Right. Affordable. Pick all three.",
    description: "Getting real restaurant intelligence used to mean a tradeoff - fast to deploy, genuinely good, or affordable enough to justify. Pick two. Sundae was built to deliver all three at once - that's the entire point.",
    oldRule: "Old rule: pick two",
    sundaeRule: "↓  Sundae rule: pick all three",
    closing: "That's not a tradeoff. That's your operating advantage.",
    vertices: [
      { label: "Speed", headline: "Deploy in days. Decide in seconds.", body: "Connect your stack fast. Pulse updates through the shift, and Sundae Intelligence answers with sources instead of sending teams back into the report queue.", chips: ["Days to deploy", "Live Core refresh", "Answers in seconds"] },
      { label: "Quality", headline: "Built for restaurants. Governed for decisions.", body: "Sundae ships with 500+ governed restaurant data models, peer-anchored benchmarks, and source-cited AI answers - so teams are not building from a blank BI canvas.", chips: ["500+ models", "Source-cited AI", "Peer benchmarks"] },
      { label: "Cost", headline: "Lower cost than rebuilding BI around restaurants.", body: "BI licenses are only the visible cost. The real spend is analysts, integrations, custom models, dashboard upkeep, and delayed decisions. Sundae is restaurant-ready from day one, with Report Lite free to start.", chips: ["Report Lite free", "Less custom BI", "Lower analyst load"] },
    ],
  },
  ar: {
    costMetric: "مجاناً للبدء",
    eyebrow: "انتهى زمن الاختيار الزائف",
    headline: "سريع. صحيح. ميسور. اختر الثلاثة.",
    description: "كان الحصول على ذكاء مطاعم حقيقي يعني مفاضلة - سريع في التشغيل، أو جيد فعلاً، أو ميسور بما يكفي لتبرير كلفته. اختر اثنين فقط. أما Sundae فقد بُني ليقدّم الثلاثة دفعة واحدة - وهذا هو جوهر الأمر كله.",
    oldRule: "القاعدة القديمة: اختر اثنين",
    sundaeRule: "↓ قاعدة Sundae: اختر الثلاثة",
    closing: "هذه ليست مقايضة. هذه ميزتك التشغيلية.",
    vertices: [
      { label: "السرعة", headline: "انشر في أيام. قرر في ثوانٍ.", body: "اربط مكدّسك سريعاً. Pulse يتحدث عبر الوردية، وSundae Intelligence يجيب بمصادر بدل إعادة الفِرَق إلى طابور التقارير.", chips: ["أيام للنشر", "تحديث Core حي", "إجابات في ثوانٍ"] },
      { label: "الجودة", headline: "مصمم للمطاعم. محكوم للقرارات.", body: "Sundae يأتي بأكثر من 500 نموذج بيانات مطعم محكوم، ومعايير نظراء، وإجابات AI مع مصادر - فلا تبني من لوحة BI فارغة.", chips: ["+500 نموذج", "AI بمصادر", "معايير نظراء"] },
      { label: "التكلفة", headline: "أقل تكلفة من إعادة بناء BI حول المطاعم.", body: "تراخيص BI ليست سوى التكلفة المرئية. الإنفاق الحقيقي محللون وتكاملات ونماذج مخصصة وصيانة لوحات وقرارات متأخرة. Sundae جاهز للمطاعم من اليوم الأول، مع Report Lite مجاناً.", chips: ["Report Lite مجاناً", "BI مخصص أقل", "حمل محلل أقل"] },
    ],
  },
  fr: {
    costMetric: "Gratuit pour démarrer",
    eyebrow: "LE FAUX DILEMME, C'EST FINI",
    headline: "Rapide. Juste. Abordable. Prenez les trois.",
    description: "Obtenir une vraie intelligence pour restaurants, c'était un compromis : rapide à déployer, vraiment bon, ou assez abordable pour se justifier. On en prenait deux. Sundae a été conçu pour livrer les trois d'un coup - c'est tout l'intérêt.",
    oldRule: "Ancienne règle : choisir deux",
    sundaeRule: "↓ Règle Sundae : choisir les trois",
    closing: "Ce n'est pas un compromis. C'est votre avantage opérationnel.",
    vertices: [
      { label: "Vitesse", headline: "Déployez en jours. Décidez en secondes.", body: "Connectez votre stack rapidement. Pulse se met à jour pendant le service, et Sundae Intelligence répond avec sources au lieu de renvoyer les équipes dans la file des rapports.", chips: ["Jours pour déployer", "Refresh Core live", "Réponses en secondes"] },
      { label: "Qualité", headline: "Conçu pour les restaurants. Gouverné pour décider.", body: "Sundae livre 500+ modèles de données restaurant gouvernés, des benchmarks pairs et des réponses IA sourcées - vous ne construisez pas sur une toile BI vide.", chips: ["500+ modèles", "IA sourcée", "Benchmarks pairs"] },
      { label: "Coût", headline: "Moins cher que reconstruire la BI autour des restaurants.", body: "Les licences BI ne sont que le coût visible. La vraie dépense ce sont les analystes, les intégrations, les modèles custom, la maintenance de dashboards et les décisions tardives. Sundae est prêt restaurant dès le premier jour, avec Report Lite gratuit.", chips: ["Report Lite gratuit", "Moins de BI custom", "Moins d'analystes"] },
    ],
  },
  es: {
    costMetric: "Gratis para empezar",
    eyebrow: "SE ACABÓ LA FALSA DISYUNTIVA",
    headline: "Rápido. Correcto. Asequible. Elige los tres.",
    description: "Tener inteligencia de restaurantes de verdad solía implicar una renuncia: rápido de implementar, genuinamente bueno o lo bastante asequible para justificarlo. Elegías dos. Sundae se creó para entregar los tres a la vez - ese es justamente el punto.",
    oldRule: "Regla antigua: elige dos",
    sundaeRule: "↓ Regla Sundae: elige los tres",
    closing: "Esto no es un compromiso. Es tu ventaja operativa.",
    vertices: [
      { label: "Velocidad", headline: "Despliega en días. Decide en segundos.", body: "Conecta tu stack rápido. Pulse se actualiza durante el turno, y Sundae Intelligence responde con fuentes en vez de mandar a los equipos de vuelta a la cola de reportes.", chips: ["Días para desplegar", "Refresh Core en vivo", "Respuestas en segundos"] },
      { label: "Calidad", headline: "Hecho para restaurantes. Gobernado para decidir.", body: "Sundae trae 500+ modelos de datos de restaurante gobernados, benchmarks de pares y respuestas IA con fuente - para que los equipos no construyan desde un lienzo BI en blanco.", chips: ["500+ modelos", "IA con fuente", "Benchmarks pares"] },
      { label: "Coste", headline: "Menor coste que reconstruir BI alrededor de restaurantes.", body: "Las licencias BI son solo el coste visible. El gasto real son analistas, integraciones, modelos a medida, mantenimiento de dashboards y decisiones tardías. Sundae viene listo para restaurantes desde el día uno, con Report Lite gratis.", chips: ["Report Lite gratis", "Menos BI custom", "Menos analistas"] },
    ],
  },
};

/**
 * Section 3 - Speed / Quality / Cost Triangle (homepage-spec-v1.1, polish r4).
 *
 * Conversion job: prove differentiation. The triangle visualizes Sundae
 * collapsing the classic "fast, good, cheap - pick two" tradeoff into all
 * three at once.
 *
 * Polish r4 changes:
 *   - Tracer dot is now SYNCHRONIZED with the active vertex. The dot travels
 *     edge-to-edge over 5s; on arrival at a vertex, that vertex becomes
 *     active. No more decoupled setInterval + orbital tracer.
 *   - ViewBox extended to 700×540 with the triangle shifted inward so labels
 *     and stat callouts no longer clip at the edges.
 *   - Copy reframed for assertiveness: "Days to deploy. Seconds to answer."
 *     "Restaurant-native. Source-cited." "Cheaper than building it in BI."
 *
 * Reduced-motion fallback: 3-card stack (all three lit at once), no tracer,
 * no rotation. Same DOM as SSR / pre-mount for hydration safety.
 */

/* Vertex IDs used for stable React keys (translation-independent) */
const VERTEX_IDS = ["speed", "quality", "cost"] as const;

// Triangle geometry - viewBox 700×540 with generous label margins.
//   middle = label centered above top vertex
//   start  = label starts at labelX, extends RIGHT (bottom-right vertex)
//   end    = label ends at labelX, extends LEFT (bottom-left vertex)
//
// Tiny stat sublabels under the labels were removed in r7 - the proof chips
// in the rotating right-side card carry that information more readably and
// the labels were visually colliding with the active-vertex glow.
const trianglePoints: { x: number; y: number; labelX: number; labelY: number; anchor: "middle" | "start" | "end" }[] = [
  { x: 350, y: 90,  labelX: 350, labelY: 56,  anchor: "middle" }, // Speed (top)
  { x: 510, y: 380, labelX: 525, labelY: 416, anchor: "start"  }, // Quality (bottom-right)
  { x: 190, y: 380, labelX: 175, labelY: 416, anchor: "end"    }, // Cost (bottom-left)
];

// Centroid - the convergence point where the three tradeoffs collapse into one.
const CENTROID = {
  x: (trianglePoints[0].x + trianglePoints[1].x + trianglePoints[2].x) / 3,
  y: (trianglePoints[0].y + trianglePoints[1].y + trianglePoints[2].y) / 3,
};

// Edges, in orbit order. Segment k of the tracer's orbit IS edge k, so an edge
// brightens as the ball crosses it and stays lit until the loop resets - by the
// end of one orbit all three glow at once ("pick all three", not two).
const EDGES: [number, number][] = [[0, 1], [1, 2], [2, 0]];

// Per-vertex headline metric (language-neutral - number + universal unit, so no
// new localized strings). Each maps to a real proof point: Speed = signal→action
// time, Quality = governed data models, Cost = free to start (Report Lite).
const VERTEX_METRICS: { value: number; prefix: string; suffix: string; count: boolean }[] = [
  { value: 5,   prefix: "",  suffix: " min", count: true  }, // Speed
  { value: 500, prefix: "",  suffix: "+",    count: true  }, // Quality
  { value: 0,   prefix: "$", suffix: "",     count: false }, // Cost
];

// Timing
const SEGMENT_DUR_S = 5;
const TOTAL_LOOP_S = SEGMENT_DUR_S * 3; // 15s full triangle orbit

// Entrance choreography (ms after section enters viewport)
const ENTRANCE_SVG_DELAY = 0;        // SVG container scales in
const ENTRANCE_OUTLINE_DRAW = 800;   // triangle outline stroke draws to full
const ENTRANCE_VERTEX_STAGGER = 150; // per-vertex pop delay
const ENTRANCE_TOTAL_MS = 1600;      // tracer activates after this

// Derive ball position from a single 0..3 progress value (looping).
// Progress N → segment floor(N), local progress = N - floor(N).
function ballAt(progress: number) {
  const segIdx = Math.min(Math.floor(progress), 2);
  const segP = progress - segIdx;
  const from = trianglePoints[segIdx];
  const to = trianglePoints[(segIdx + 1) % 3];
  return {
    x: from.x + (to.x - from.x) * segP,
    y: from.y + (to.y - from.y) * segP,
  };
}

/**
 * Headline metric that counts up each time its vertex becomes active. Lives in
 * the side card (not on the triangle - r7 removed vertex stat-callouts because
 * they collided with the active-vertex glow). Reduced-motion → static value.
 */
function VertexStat({ idx, reduceMotion, text }: { idx: number; reduceMotion: boolean; text?: string }) {
  const m = VERTEX_METRICS[idx];
  const [display, setDisplay] = useState(m.value);
  useEffect(() => {
    if (reduceMotion || !m.count) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(m.value);
      return;
    }
    const controls = animate(0, m.value, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [idx, m, reduceMotion]);
  // A localized phrase (Cost = "Free to start") reads honestly where a bare "$0"
  // would misleadingly imply the whole product is free. Sized down as it's words.
  if (text) {
    return (
      <span className="font-display text-2xl sm:text-[28px] font-bold leading-tight text-[var(--warm-coral)] text-right">
        {text}
      </span>
    );
  }
  return (
    <span className="font-display text-3xl sm:text-4xl font-bold leading-none text-[var(--warm-coral)] tabular-nums">
      {m.prefix}
      {display}
      {m.suffix}
    </span>
  );
}

export function SectionSpeedQualityCost() {
  const reduceMotion = useReducedMotion();
  const { locale } = useWebsiteI18n();
  const { theme } = useTheme();
  const copy = localizedCopy[locale as keyof typeof localizedCopy] ?? getGeneratedLocalCopy(localizedCopy, generatedLocalCopy.localizedCopy, locale) ?? localizedCopy.en;

  const vertices = copy.vertices;
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);

  // Theme-aware SVG fills: white pops on dark, navy on light. The theme is only
  // known after hydration (ThemeProvider reads localStorage on the first client
  // render, but SSR rendered the dark default), so gate the light fills behind the
  // canonical `mounted` flag - otherwise the SVG fill attributes mismatch the
  // server HTML in light mode (a hydration warning). First render = dark = SSR.
  const isLight = mounted && theme === "light";
  const vertexFillActive = isLight ? "#0F172A" : "#FFFFFF";
  const vertexFillIdle = isLight ? "rgba(15,23,42,0.45)" : "rgba(255,255,255,0.45)";
  const vertexDotFillIdle = isLight ? "rgba(15,23,42,0.55)" : "rgba(255,255,255,0.55)";
  const tracerBallFill = isLight ? "#FF5C4D" : "#FFFFFF";
  const triHighlightStrong = isLight ? "rgba(255,92,77,0.18)" : "rgba(255,255,255,0.25)";
  const triHighlightMid = isLight ? "rgba(255,92,77,0.05)" : "rgba(255,255,255,0.06)";

  // In-view trigger - entrance fires when section reaches the viewport.
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15% 0px" });

  useEffect(() => {
    // Canonical hydration-safe mount detection.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // After section enters view, wait for the entrance choreography to finish,
  // THEN flip entranceDone - which activates the orbit.
  useEffect(() => {
    if (reduceMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEntranceDone(true);
      return;
    }
    if (!inView) return;
    const id = setTimeout(() => setEntranceDone(true), ENTRANCE_TOTAL_MS);
    return () => clearTimeout(id);
  }, [inView, reduceMotion]);

  const useAnimated = mounted && !reduceMotion && entranceDone;

  /**
   * Single source of truth for ball position AND activeIdx.
   * progress: 0..3, looping. floor(progress) = segment = activeIdx.
   * Ball x/y derived via useTransform → guaranteed in sync with activeIdx
   * even across pause/resume (animate.pause() preserves the MotionValue).
   */
  const progress = useMotionValue(0);
  const ballX = useTransform(progress, (p) => ballAt(p).x);
  const ballY = useTransform(progress, (p) => ballAt(p).y);

  // Progressive edge accumulation (#2): edge k brightens as the ball crosses
  // segment k, then stays lit until the loop wraps - all three end lit.
  const edge0Opacity = useTransform(progress, (p) => (p >= 1 ? 0.95 : p >= 0 ? 0.22 + 0.73 * Math.min(1, p) : 0.16));
  const edge1Opacity = useTransform(progress, (p) => (p >= 2 ? 0.95 : p >= 1 ? 0.22 + 0.73 * (p - 1) : 0.16));
  const edge2Opacity = useTransform(progress, (p) => (p >= 2 ? 0.22 + 0.73 * (p - 2) : 0.16));
  const edgeOpacities = [edge0Opacity, edge1Opacity, edge2Opacity];

  // Comet trail (#3): a streak from just behind the ball to the ball, kept
  // within the current segment so it never jumps across a vertex.
  const TRAIL = 0.16;
  const trailX = useTransform(progress, (p) => ballAt(Math.max(Math.floor(p), p - TRAIL)).x);
  const trailY = useTransform(progress, (p) => ballAt(Math.max(Math.floor(p), p - TRAIL)).y);

  // Autonomous drift (#4): gentle continuous Z-sway layered under mouse-parallax.
  const driftZ = useMotionValue(0);

  // Convergence burst (#1): re-keyed each time the orbit loops (3 → 0), firing
  // the inward beams + core ring that visualize "three become one".
  const [burst, setBurst] = useState(0);
  const lastProgressRef = useRef(0);

  /**
   * Mouse-parallax tilt - gives the triangle a "hologram" depth.
   * Subtle: ±5deg max. Springed for liquid feel.
   */
  const pointerX = useMotionValue(0); // -1..1
  const pointerY = useMotionValue(0); // -1..1
  const tiltX = useTransform(pointerY, [-1, 1], [5, -5]);
  const tiltY = useTransform(pointerX, [-1, 1], [-7, 7]);
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };
  const handlePointerLeaveTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  // Sync activeIdx from progress on every frame - React no-ops if value is
  // unchanged, so this only re-renders at segment boundaries.
  useMotionValueEvent(progress, "change", (latest) => {
    const next = Math.min(Math.floor(latest), 2);
    setActiveIdx((prev) => (prev === next ? prev : next));
    // Detect the 3 → 0 wrap and fire a convergence burst.
    if (latest < lastProgressRef.current - 1) setBurst((b) => b + 1);
    lastProgressRef.current = latest;
  });

  // Autonomous drift (#4) - subtle ±1.3° Z-sway, mirror-looping. Honors reduced motion.
  useEffect(() => {
    if (!useAnimated) return;
    const c = animate(driftZ, [-1.3, 1.3], {
      duration: 7,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    });
    return () => c.stop();
  }, [useAnimated, driftZ]);

  // Drive the orbit: animate progress 0→3 linearly over 15s, loop forever.
  // animate() returns controls with .pause() / .play() - we use these for
  // hover-pause so ball + content stay perfectly synced through pause cycles.
  const orbitRef = useRef<ReturnType<typeof animate<number>> | null>(null);
  useEffect(() => {
    if (!useAnimated) return;
    const controls = animate(progress, [0, 3], {
      duration: TOTAL_LOOP_S,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    orbitRef.current = controls;
    return () => {
      controls.stop();
      orbitRef.current = null;
    };
  }, [useAnimated, progress]);

  useEffect(() => {
    const c = orbitRef.current;
    if (!c) return;
    if (paused) c.pause();
    else c.play();
  }, [paused]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="sqc-headline"
      className="relative bg-mesh"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <div className="eyebrow mb-4">{copy.eyebrow}</div>
          <h2 id="sqc-headline" className="section-h2 text-balance mb-5">
            {copy.headline}
          </h2>
          <p className="body-lg max-w-2xl mx-auto">{copy.description}</p>
        </div>

        <div
          className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Triangle SVG - 3D perspective container with mouse-parallax tilt */}
          <motion.div
            className="relative w-full max-w-xl mx-auto"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={
              inView || reduceMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.92 }
            }
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: ENTRANCE_SVG_DELAY / 1000 }}
            style={{ perspective: 1400 }}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeaveTilt}
          >
            {/* Ambient backdrop spotlight - sits BEHIND the triangle, never moves with parallax */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 72% 58% at 50% 44%, rgba(255,92,77,0.26) 0%, rgba(255,92,77,0.09) 36%, transparent 72%)",
                filter: "blur(8px)",
              }}
            />

            {/* Entrance attention burst */}
            {!reduceMotion && (
              <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={inView ? { opacity: [0, 0.9, 0], scale: [0.6, 1.4, 1.8] } : {}}
                transition={{ duration: 1.6, ease: "easeOut", delay: 0.1 }}
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(255,132,115,0.45) 0%, rgba(255,92,77,0.18) 35%, transparent 65%)",
                }}
              />
            )}

            {/* Old-rule banner */}
            <div className="text-center mb-5 relative z-10">
              <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[var(--text-muted)] line-through decoration-[var(--text-faint)] decoration-1">
                {copy.oldRule}
              </div>
              <div className="mt-2 text-[13px] uppercase tracking-[0.18em] text-[var(--warm-coral)] font-bold">
                {copy.sundaeRule}
              </div>
            </div>

            {/* 3D tilt wrapper - the SVG and its floor reflection live inside */}
            <motion.div
              className="relative"
              style={{
                transformStyle: "preserve-3d",
                rotateX: tiltX,
                rotateY: tiltY,
                rotateZ: driftZ,
                transition: "transform 0.15s ease-out",
              }}
            >
              {/* Floor reflection - mirrored, blurred, low-opacity triangle suggesting it floats over a surface */}
              <div
                aria-hidden
                className="absolute inset-x-0 pointer-events-none"
                style={{
                  top: "70%",
                  height: "40%",
                  background:
                    "radial-gradient(ellipse 50% 80% at 50% 0%, rgba(255,92,77,0.22) 0%, rgba(255,92,77,0.06) 40%, transparent 75%)",
                  filter: "blur(14px)",
                  transform: "translateZ(-30px)",
                }}
              />

            <svg
              viewBox="0 0 700 540"
              className="w-full h-auto relative z-10"
              aria-hidden
              style={{ transformStyle: "preserve-3d" }}
            >
              <defs>
                {/* Premium edge gradient - light-source at top-left for specular feel */}
                <linearGradient id="triEdge" x1="0.15" y1="0.1" x2="0.85" y2="0.95">
                  <stop offset="0%" stopColor="rgba(255,201,176,1)" />
                  <stop offset="30%" stopColor="rgba(255,132,115,0.85)" />
                  <stop offset="65%" stopColor="rgba(255,92,77,0.5)" />
                  <stop offset="100%" stopColor="rgba(255,181,158,0.25)" />
                </linearGradient>
                {/* Multi-stop specular fill - gives the surface a "lit" 3D feel */}
                <radialGradient id="triFill" cx="38%" cy="32%" r="75%">
                  <stop offset="0%" stopColor="rgba(255,181,158,0.42)" />
                  <stop offset="22%" stopColor="rgba(255,132,115,0.26)" />
                  <stop offset="55%" stopColor="rgba(255,92,77,0.13)" />
                  <stop offset="100%" stopColor="rgba(255,92,77,0)" />
                </radialGradient>
                {/* Convergence-core radial glow */}
                <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,201,176,0.95)" />
                  <stop offset="45%" stopColor="rgba(255,132,115,0.45)" />
                  <stop offset="100%" stopColor="rgba(255,92,77,0)" />
                </radialGradient>
                {/* Top-vertex specular highlight - sharp, focused */}
                <radialGradient id="triHighlight" cx="50%" cy="20%" r="42%">
                  <stop offset="0%" stopColor={triHighlightStrong} />
                  <stop offset="40%" stopColor={triHighlightMid} />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
                {/* Ball glow filter */}
                <filter id="tracerGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="7" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="vertexGlow" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="4" />
                </filter>
                {/* Drop-shadow for the entire triangle - gives it "lift" */}
                <filter id="triShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
                  <feOffset dx="0" dy="8" result="offsetBlur" />
                  <feFlood floodColor="rgba(255,92,77,0.35)" />
                  <feComposite in2="offsetBlur" operator="in" />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Filled triangle - fades + breathes subtly, with drop shadow for "lift" */}
              <motion.polygon
                points={trianglePoints.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="url(#triFill)"
                stroke="none"
                filter="url(#triShadow)"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={
                  inView || reduceMotion
                    ? useAnimated
                      ? { opacity: [0.85, 1, 0.85] }
                      : { opacity: 1 }
                    : { opacity: 0 }
                }
                transition={
                  useAnimated
                    ? { duration: 6, ease: "easeInOut", repeat: Infinity }
                    : { duration: 0.7, delay: 0.6, ease: "easeOut" }
                }
              />
              {/* Specular highlight - overlay polygon with concentrated light at top vertex */}
              <motion.polygon
                points={trianglePoints.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="url(#triHighlight)"
                stroke="none"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={inView || reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.9, delay: 0.8, ease: "easeOut" }}
              />

              {/* Triangle outline - stroke draws around the perimeter */}
              <motion.path
                d={`M ${trianglePoints[0].x} ${trianglePoints[0].y} L ${trianglePoints[1].x} ${trianglePoints[1].y} L ${trianglePoints[2].x} ${trianglePoints[2].y} Z`}
                fill="none"
                stroke="url(#triEdge)"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={
                  inView || reduceMotion
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{
                  pathLength: { duration: ENTRANCE_OUTLINE_DRAW / 1000, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
                  opacity: { duration: 0.2, delay: 0.2 },
                }}
              />

              {/* Progressive edge accumulation (#2) - each edge brightens as the
                  tracer crosses it and stays lit through the loop. */}
              {useAnimated && EDGES.map(([a, c], k) => (
                <motion.line
                  key={`edge-${k}`}
                  x1={trianglePoints[a].x}
                  y1={trianglePoints[a].y}
                  x2={trianglePoints[c].x}
                  y2={trianglePoints[c].y}
                  stroke="url(#triEdge)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{ opacity: edgeOpacities[k] }}
                />
              ))}

              {/* Convergence (#1) - inward beams + glowing core where the three
                  tradeoffs collapse into one. Beams re-key each loop wrap. */}
              {useAnimated && (
                <g>
                  <g key={`beams-${burst}`}>
                    {trianglePoints.map((p, i) => (
                      <motion.line
                        key={i}
                        x1={p.x}
                        y1={p.y}
                        x2={CENTROID.x}
                        y2={CENTROID.y}
                        stroke="#FF8473"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.7, 0] }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.07 }}
                      />
                    ))}
                  </g>
                  {/* burst ring radiating from the core each loop */}
                  <motion.circle
                    key={`coreRing-${burst}`}
                    cx={CENTROID.x}
                    cy={CENTROID.y}
                    r="6"
                    fill="none"
                    stroke="#FF8473"
                    strokeWidth="1.4"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 0.65, 0], scale: [0.5, 4.2, 5.4] }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ transformOrigin: `${CENTROID.x}px ${CENTROID.y}px` }}
                  />
                  {/* persistent breathing core */}
                  <circle cx={CENTROID.x} cy={CENTROID.y} r="18" fill="url(#coreGlow)" />
                  <motion.circle
                    cx={CENTROID.x}
                    cy={CENTROID.y}
                    r="4.5"
                    fill="#FFC9B0"
                    filter="url(#tracerGlow)"
                    animate={{ opacity: [0.55, 0.95, 0.55], scale: [1, 1.25, 1] }}
                    transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                    style={{ transformOrigin: `${CENTROID.x}px ${CENTROID.y}px` }}
                  />
                </g>
              )}

              {/* Active-vertex pulse rings - single source of truth = activeIdx */}
              {useAnimated && (
                <g key={`pulse-${activeIdx}`}>
                  {[0, 1].map((ringIdx) => (
                    <motion.circle
                      key={ringIdx}
                      cx={trianglePoints[activeIdx].x}
                      cy={trianglePoints[activeIdx].y}
                      r="20"
                      fill="none"
                      stroke="#FF8473"
                      strokeWidth="1.2"
                      initial={{ opacity: 0, scale: 1 }}
                      animate={{ opacity: [0, 0.55, 0], scale: [1, 3.2, 3.6] }}
                      transition={{
                        duration: 2.4,
                        delay: ringIdx * 1.2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      style={{ transformOrigin: `${trianglePoints[activeIdx].x}px ${trianglePoints[activeIdx].y}px` }}
                    />
                  ))}
                </g>
              )}

              {/* Tracer ball - position bound to motion value, perfect sync with activeIdx */}
              {useAnimated && (
                <>
                  {/* Comet trail (#3) - energy streak behind the ball */}
                  <motion.line
                    stroke="#FF8473"
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity={0.55}
                    filter="url(#tracerGlow)"
                    x1={trailX}
                    y1={trailY}
                    x2={ballX}
                    y2={ballY}
                  />
                  <motion.circle r="13" fill="#FF8473" opacity="0.45" filter="url(#tracerGlow)" cx={ballX} cy={ballY} />
                  <motion.circle r="8" fill={tracerBallFill} cx={ballX} cy={ballY} />
                </>
              )}

              {/* Vertices - clickable, with stat callouts. Pop in sequentially after the outline draws. */}
              {trianglePoints.map((p, i) => {
                const isActive = !useAnimated || i === activeIdx;
                const v = vertices[i];
                const vertexId = VERTEX_IDS[i];
                const vertexDelay = (ENTRANCE_OUTLINE_DRAW + ENTRANCE_VERTEX_STAGGER * i) / 1000;
                return (
                  <motion.g
                    key={vertexId}
                    onClick={() => {
                      setActiveIdx(i);
                      setPaused(true);
                    }}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={`Show ${v.label}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveIdx(i);
                        setPaused(true);
                      }
                    }}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
                    animate={
                      inView || reduceMotion
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.4 }
                    }
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                      delay: vertexDelay,
                    }}
                    style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                  >
                    {/* Halo (soft blurred glow) - only visible when active */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isActive ? 38 : 16}
                      fill="#FF8473"
                      opacity={isActive ? 0.22 : 0.06}
                      filter="url(#vertexGlow)"
                      style={{ transition: "all 0.55s cubic-bezier(0.22, 1, 0.36, 1)" }}
                    />
                    {/* Concentric ring (depth) */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isActive ? 18 : 12}
                      fill="none"
                      stroke="#FF8473"
                      strokeWidth={isActive ? 1 : 0.8}
                      opacity={isActive ? 0.55 : 0.25}
                      style={{ transition: "all 0.55s cubic-bezier(0.22, 1, 0.36, 1)" }}
                    />
                    {/* Solid core dot */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isActive ? 9 : 7}
                      fill={isActive ? vertexFillActive : vertexDotFillIdle}
                      style={{ transition: "all 0.45s ease-out" }}
                    />
                    {/* Label - premium typography: bumped for mobile legibility */}
                    <text
                      x={p.labelX}
                      y={p.labelY}
                      textAnchor={p.anchor}
                      fontSize={isActive ? "28" : "22"}
                      fontWeight="700"
                      letterSpacing="0.24em"
                      fill={isActive ? vertexFillActive : vertexFillIdle}
                      style={{ transition: "all 0.55s cubic-bezier(0.22, 1, 0.36, 1)" }}
                    >
                      {v.label.toUpperCase()}
                    </text>
                    {/* Sublabel - small "0X" beneath label, only when active */}
                    <text
                      x={p.labelX}
                      y={p.labelY + 22}
                      textAnchor={p.anchor}
                      fontSize="11"
                      fontWeight="600"
                      letterSpacing="0.32em"
                      fill={isActive ? "#FF8473" : "transparent"}
                      style={{ transition: "fill 0.4s ease-out" }}
                    >
                      0{i + 1}
                    </text>
                  </motion.g>
                );
              })}
            </svg>
            </motion.div>
          </motion.div>

          {/* Detail panel */}
          {!useAnimated ? (
            // Static path: 3-card stack, all visible (SSR + reduced-motion)
            <div className="space-y-3">
              {vertices.map((v, vi) => (
                <div
                  key={VERTEX_IDS[vi]}
                  className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-5"
                >
                  <div className="text-[11px] uppercase tracking-wider text-[var(--warm-coral)] font-bold mb-2">
                    {v.label}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {v.headline}
                  </h3>
                  <p className="body-base mb-4">{v.body}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {v.chips.map((chip) => (
                      <span
                        key={chip}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[var(--warm-coral)]/15 text-[var(--warm-coral)] border border-[var(--warm-coral)]/25"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Animated: rotating single panel with proof chips at the bottom
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-6 sm:p-8 min-h-[300px] flex flex-col">
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="text-[11px] uppercase tracking-wider text-[var(--warm-coral)] font-bold mt-1.5">
                        {vertices[activeIdx].label}
                      </div>
                      <VertexStat idx={activeIdx} reduceMotion={!!reduceMotion} text={activeIdx === 2 ? copy.costMetric : undefined} />
                    </div>
                    <h3 className="section-h3 mb-4">
                      {vertices[activeIdx].headline}
                    </h3>
                    <p className="body-lg">{vertices[activeIdx].body}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Proof chips for the active dimension - replaces dot
                  indicators with concrete factual signals. Triangle vertices
                  remain clickable for direct navigation. */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeIdx}-chips`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6 pt-5 border-t border-[var(--border-default)] flex flex-wrap gap-2"
                >
                  {vertices[activeIdx].chips.map((chip) => (
                    <span
                      key={chip}
                      className="text-[12px] font-semibold px-3 py-1.5 rounded-full bg-[var(--warm-coral)]/15 text-[var(--warm-coral)] border border-[var(--warm-coral)]/25"
                    >
                      {chip}
                    </span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        <p className="mt-12 sm:mt-14 text-center text-xl sm:text-2xl text-[var(--text-primary)] italic font-light">
          {copy.closing}
        </p>
      </div>
    </section>
  );
}
