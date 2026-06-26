"use client";

/**
 * HeroGlass3D — the photoreal R3F replacement for the hero's SVG "business in a
 * glass". A lathe-revolved coupe with a real transmission/refraction material,
 * seven translucent strata revolved to the bowl's INNER wall (so they curve with
 * the glass instead of reading as stacked pucks), a cream dome, a glossy cherry
 * (the signal), HDRI image-based lighting, a grounded contact shadow, and a
 * restrained bloom/vignette pass.
 *
 * Realism levers (vs the earlier real-time-WebGL concept): (1) a real HDRI env
 * map drives reflection/refraction; (2) MeshTransmissionMaterial with samples +
 * chromatic aberration; (3) layers conform to the bowl profile; (4) a real
 * contact shadow + post.
 *
 * Interactivity preserved from the SVG: hovering a stratum (here, pointer over a
 * layer mesh) reports its index up so the label rail and the 3D highlight stay
 * in sync; an external `active` index highlights one layer and dims the rest.
 *
 * This component renders ONLY the <Canvas> object on a transparent background —
 * the section supplies the navy stage, ambient glows, and label rail around it.
 */

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree, type ThreeElements } from "@react-three/fiber";
import { Environment, ContactShadows, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { LAYER_COLORS, N, LIQUID_BOTTOM, LIQUID_TOP, innerRadius, HERO_CAM, CHERRY_Y } from "./heroLayout";

// A solid layer of revolution between yb..yt whose outer edge follows the bowl
// wall. Points start and end on the axis (x=0) so the lathe closes into a solid.
function makeLayerGeometry(yb: number, yt: number): THREE.LatheGeometry {
  const pts: THREE.Vector2[] = [];
  const steps = 6;
  pts.push(new THREE.Vector2(0, yb));
  for (let i = 0; i <= steps; i++) {
    const y = yb + ((yt - yb) * i) / steps;
    pts.push(new THREE.Vector2(Math.max(0.01, innerRadius(y) * 0.985), y));
  }
  pts.push(new THREE.Vector2(0, yt));
  return new THREE.LatheGeometry(pts, 96);
}

// The glass body itself — foot, stem, bowl — as an open profile (a shell).
function makeGlassGeometry(): THREE.LatheGeometry {
  const p: [number, number][] = [
    [0.02, -1.5],
    [0.46, -1.48],
    [0.46, -1.41],
    [0.085, -1.36],
    [0.075, -0.95],
    [0.12, -0.82],
    [0.3, -0.66],
    [0.45, -0.45],
    [0.55, -0.12],
    [0.6, 0.28],
    [0.64, 0.62],
    [0.62, 0.74],
  ];
  return new THREE.LatheGeometry(
    p.map(([r, y]) => new THREE.Vector2(r, y)),
    96,
  );
}

type LayerMeshProps = {
  index: number;
  color: string;
  active: number | null;
  onHover: (i: number | null) => void;
};

function LayerMesh({ index, color, active, onHover }: LayerMeshProps) {
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const geo = useMemo(() => {
    const band = (LIQUID_TOP - LIQUID_BOTTOM) / N;
    const yb = LIQUID_BOTTOM + index * band;
    return makeLayerGeometry(yb, yb + band * 1.02);
  }, [index]);

  // Smoothly resolve highlight/dim state so hover feels liquid, not steppy.
  useFrame((_, dt) => {
    const m = matRef.current;
    if (!m) return;
    const isActive = active === index;
    const targetEmissive = active === null ? 0.2 : isActive ? 0.62 : 0.06;
    const targetEnv = isActive ? 1.5 : active === null ? 1.0 : 0.5;
    const k = 1 - Math.pow(0.0015, dt); // frame-rate-independent lerp
    m.emissiveIntensity += (targetEmissive - m.emissiveIntensity) * k;
    m.envMapIntensity += (targetEnv - m.envMapIntensity) * k;
  });

  const c = useMemo(() => new THREE.Color(color), [color]);

  return (
    <mesh
      geometry={geo}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(index);
      }}
      onPointerOut={() => onHover(null)}
    >
      <meshPhysicalMaterial
        ref={matRef}
        color={c}
        emissive={c}
        emissiveIntensity={0.2}
        roughness={0.26 - index * 0.01}
        metalness={0}
        transmission={0.05 + index * 0.008}
        thickness={0.4}
        ior={1.36}
        clearcoat={0.7}
        clearcoatRoughness={0.22}
        attenuationColor={c}
        attenuationDistance={3.5}
        transparent
        envMapIntensity={1.0}
      />
    </mesh>
  );
}

// Thin cream lines at every layer boundary — how real layered parfaits/cocktails
// read, and what makes all seven strata legible regardless of lighting.
function Separators() {
  const rings = useMemo(() => {
    const band = (LIQUID_TOP - LIQUID_BOTTOM) / N;
    const arr: { y: number; r: number }[] = [];
    for (let i = 1; i < N; i++) {
      const y = LIQUID_BOTTOM + i * band;
      arr.push({ y, r: innerRadius(y) * 0.992 });
    }
    return arr;
  }, []);
  return (
    <>
      {rings.map((s, i) => (
        <mesh key={i} position={[0, s.y, 0]}>
          <cylinderGeometry args={[s.r, s.r, 0.022, 80]} />
          <meshPhysicalMaterial
            color="#FFF6EA"
            emissive="#FFEFDC"
            emissiveIntensity={0.14}
            roughness={0.3}
            clearcoat={0.6}
            clearcoatRoughness={0.28}
            envMapIntensity={1}
          />
        </mesh>
      ))}
    </>
  );
}

function CreamDome({ active }: { active: number | null }) {
  const ref = useRef<THREE.MeshPhysicalMaterial>(null);
  useFrame((_, dt) => {
    const m = ref.current;
    if (!m) return;
    const target = active === null || active === N - 1 ? 0.04 : 0.015;
    m.emissiveIntensity += (target - m.emissiveIntensity) * (1 - Math.pow(0.0015, dt));
  });
  return (
    <mesh position={[0, 0.6, 0]} scale={[1, 0.42, 1]}>
      <sphereGeometry args={[0.52, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshPhysicalMaterial
        ref={ref}
        color="#F3E7D2"
        emissive="#F6F1E8"
        emissiveIntensity={0.04}
        roughness={0.55}
        clearcoat={0.35}
        clearcoatRoughness={0.45}
        envMapIntensity={0.85}
      />
    </mesh>
  );
}

function Cherry() {
  const grp = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshPhysicalMaterial>(null);
  const glow = useRef<THREE.Mesh>(null);
  const stemCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.02, 0.16, 0),
        new THREE.Vector3(0.1, 0.42, 0.03),
        new THREE.Vector3(-0.01, 0.64, -0.02),
        new THREE.Vector3(-0.15, 0.78, 0),
      ]),
    [],
  );
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Very gentle "breathe" — no emissive flare (that, with bloom, caused the
    // periodic shining burst), and a small, steady glow that never balloons.
    const pulse = 0.5 + 0.5 * Math.sin(t * 0.8);
    if (grp.current) grp.current.scale.setScalar(1 + pulse * 0.01);
    if (mat.current) mat.current.emissiveIntensity = 0.1;
    if (glow.current) {
      (glow.current.material as THREE.MeshBasicMaterial).opacity = 0.04 + pulse * 0.025;
    }
  });
  return (
    <group ref={grp} position={[0, CHERRY_Y, 0]}>
      <mesh ref={glow} position={[0, 0.01, -0.05]}>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshBasicMaterial color="#FF8A76" transparent opacity={0.05} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.17, 64, 64]} />
        <meshPhysicalMaterial
          ref={mat}
          color="#9E0C1C"
          emissive="#260005"
          emissiveIntensity={0.14}
          roughness={0.09}
          clearcoat={1}
          clearcoatRoughness={0.04}
          envMapIntensity={1.5}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[stemCurve, 40, 0.013, 10, false]} />
        <meshStandardMaterial color="#5A3A1E" roughness={0.6} />
      </mesh>
    </group>
  );
}

function GlassBody() {
  const geo = useMemo(() => makeGlassGeometry(), []);
  return (
    <mesh geometry={geo}>
      <MeshTransmissionMaterial
        samples={8}
        resolution={1024}
        transmission={1}
        thickness={1.1}
        roughness={0.06}
        ior={1.5}
        chromaticAberration={0.02}
        anisotropicBlur={0.06}
        distortion={0.02}
        distortionScale={0.15}
        temporalDistortion={0.04}
        clearcoat={1}
        clearcoatRoughness={0.1}
        attenuationColor="#FFF1E6"
        attenuationDistance={5}
        color="#FFFAF4"
        envMapIntensity={0.95}
        background={new THREE.Color("#1b1410")}
      />
    </mesh>
  );
}

// Measure where each stratum ACTUALLY projects on screen through the live camera
// (no hand-derived math / lookAt assumptions), and report the vertical fractions
// up so the label rail lines up exactly with the rendered layers. Re-runs on resize.
function LayoutReporter({ onLayout }: { onLayout?: (fractions: number[]) => void }) {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  useEffect(() => {
    if (!onLayout) return;
    camera.updateMatrixWorld();
    const band = (LIQUID_TOP - LIQUID_BOTTOM) / N;
    const v = new THREE.Vector3();
    const fractions: number[] = [];
    for (let i = 0; i < N; i++) {
      v.set(0, LIQUID_BOTTOM + (i + 0.5) * band, 0).project(camera);
      fractions.push((1 - v.y) / 2); // NDC y (+1 top) → screen fraction (0 top)
    }
    // index N = the cherry, so the rail can attribute a label to it.
    v.set(0, CHERRY_Y, 0).project(camera);
    fractions.push((1 - v.y) / 2);
    onLayout(fractions);
  }, [camera, size, onLayout]);
  return null;
}

type SceneProps = { active: number | null; onHover: (i: number | null) => void };

function Scene({ active, onHover }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  // Slow idle drift so the hero is alive at rest without spinning.
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.18) * 0.12;
    group.current.position.y = Math.sin(t * 0.13) * 0.015;
  });

  return (
    <>
      <Environment files="/hdri/warm_studio_1k.hdr" environmentIntensity={0.7} />
      {/* warm key + cool rim + neutral front fill so layer colors read true */}
      <directionalLight position={[-3, 4, 4]} intensity={1.25} color="#ffe0bc" />
      <directionalLight position={[2.8, 1.6, -4]} intensity={1.5} color="#aebfff" />
      <directionalLight position={[0, 1.2, 5]} intensity={0.3} color="#fff4e8" />

      <group ref={group}>
        {/* strata first, then the glass shell over them, then dome + cherry */}
        {LAYER_COLORS.map((color, i) => (
          <LayerMesh key={i} index={i} color={color} active={active} onHover={onHover} />
        ))}
        <Separators />
        <CreamDome active={active} />
        <GlassBody />
        <Cherry />
      </group>

      {/* tight, soft grounding shadow — not a wide "plate" that reads as a stage */}
      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={3.4} blur={3.4} far={2.2} color="#140803" />

      {/* Bloom only; NO vignette here — a vignette on the transparent canvas
          darkens its corners into a visible rectangle (the "container" look). */}
      <EffectComposer enableNormalPass={false}>
        <Bloom intensity={0.3} luminanceThreshold={0.86} luminanceSmoothing={0.22} mipmapBlur />
      </EffectComposer>
    </>
  );
}

export type HeroGlass3DProps = {
  active: number | null;
  onHover: (i: number | null) => void;
  onLayout?: (fractions: number[]) => void;
  className?: string;
  style?: React.CSSProperties;
};

export default function HeroGlass3D({ active, onHover, onLayout, className, style }: HeroGlass3DProps) {
  return (
    <Canvas
      className={className}
      style={style}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: HERO_CAM.fov, position: [0, HERO_CAM.y, HERO_CAM.dist], near: 0.1, far: 100 }}
      onPointerMissed={() => onHover(null)}
    >
      <Scene active={active} onHover={onHover} />
      <LayoutReporter onLayout={onLayout} />
    </Canvas>
  );
}

// Satisfy the unused-type import lint if tree-shaken in some builds.
export type { ThreeElements };
