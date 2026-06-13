"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

// Lazy load the 3D canvas to avoid SSR issues with Three.js
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

// Deterministic seeds for particles (reduced to 10 for performance)
const SEEDS = [
  { x: 12, y: 45, dx: 80, dy: -120, d: 5, dl: 1 },
  { x: 35, y: 70, dx: -60, dy: -90, d: 7, dl: 3 },
  { x: 58, y: 25, dx: 100, dy: -150, d: 6, dl: 0.5 },
  { x: 72, y: 60, dx: -40, dy: -80, d: 8, dl: 2 },
  { x: 20, y: 85, dx: 70, dy: -110, d: 4.5, dl: 4 },
  { x: 45, y: 15, dx: -90, dy: -60, d: 5.5, dl: 1.5 },
  { x: 80, y: 40, dx: 50, dy: -130, d: 6.5, dl: 2.5 },
  { x: 10, y: 55, dx: -70, dy: -100, d: 7.5, dl: 0.8 },
  { x: 65, y: 90, dx: 85, dy: -75, d: 5.2, dl: 3.5 },
  { x: 28, y: 30, dx: -55, dy: -140, d: 6.8, dl: 1.2 },
];

// ─── Inline 3D Door Component for Hero ──────────────────────────────────
function HeroDoorModel() {
  const groupRef = useRef<THREE.Group>(null);

  const doorColor = new THREE.Color("#8B6F47");
  const frameColor = new THREE.Color("#2a1f0e");
  const handleColor = new THREE.Color("#d4a853");
  const grainColor = new THREE.Color("#8B6F47").multiplyScalar(0.85);
  const panelOuterColor = new THREE.Color("#8B6F47").multiplyScalar(0.8);
  const panelInnerColor = new THREE.Color("#8B6F47").multiplyScalar(0.9);
  const panelBorderColor = new THREE.Color("#8B6F47").multiplyScalar(1.1);



  useFrame((state: { clock: { elapsedTime: number } }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
    }
  });

  const doorWidth = 0.76;
  const doorHeight = 1.78;
  const doorDepth = 0.06;

  return (
    <group ref={groupRef} position={[0, doorHeight / 2 - 0.5, 0]}>
      {/* Door frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry
          args={[doorWidth + 0.16, doorHeight + 0.16, doorDepth + 0.04]}
        />
        <meshStandardMaterial
          color={frameColor}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Door body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[doorWidth, doorHeight, doorDepth]} />
        <meshStandardMaterial
          color={doorColor}
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* Wood grain lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={`grain-${i}`}
          position={[
            0,
            doorHeight * 0.4 - i * doorHeight * 0.1,
            doorDepth / 2 + 0.001,
          ]}
        >
          <boxGeometry args={[doorWidth * 0.95, 0.003, 0.001]} />
          <meshStandardMaterial
            color={grainColor}
            roughness={0.6}
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}

      {/* Classic panels - top */}
      <group>
        <mesh
          position={[
            -doorWidth * 0.28,
            doorHeight * 0.22,
            -doorDepth / 2 - 0.005,
          ]}
        >
          <boxGeometry
            args={[doorWidth * 0.56 + 0.04, doorHeight * 0.38 + 0.04, 0.02]}
          />
          <meshStandardMaterial
            color={panelOuterColor}
            roughness={0.5}
            metalness={0.02}
          />
        </mesh>
        <mesh
          position={[
            -doorWidth * 0.28,
            doorHeight * 0.22,
            -doorDepth / 2 - 0.015,
          ]}
        >
          <boxGeometry
            args={[doorWidth * 0.56 - 0.06, doorHeight * 0.38 - 0.06, 0.01]}
          />
          <meshStandardMaterial
            color={panelInnerColor}
            roughness={0.3}
            metalness={0.05}
          />
        </mesh>
        <mesh
          position={[
            -doorWidth * 0.28,
            doorHeight * 0.22,
            -doorDepth / 2 - 0.02,
          ]}
        >
          <boxGeometry
            args={[doorWidth * 0.56 + 0.02, doorHeight * 0.38 + 0.02, 0.005]}
          />
          <meshStandardMaterial
            color={panelBorderColor}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* Classic panels - bottom */}
      <group>
        <mesh
          position={[
            -doorWidth * 0.28,
            -doorHeight * 0.22,
            -doorDepth / 2 - 0.005,
          ]}
        >
          <boxGeometry
            args={[doorWidth * 0.56 + 0.04, doorHeight * 0.38 + 0.04, 0.02]}
          />
          <meshStandardMaterial
            color={panelOuterColor}
            roughness={0.5}
            metalness={0.02}
          />
        </mesh>
        <mesh
          position={[
            -doorWidth * 0.28,
            -doorHeight * 0.22,
            -doorDepth / 2 - 0.015,
          ]}
        >
          <boxGeometry
            args={[doorWidth * 0.56 - 0.06, doorHeight * 0.38 - 0.06, 0.01]}
          />
          <meshStandardMaterial
            color={panelInnerColor}
            roughness={0.3}
            metalness={0.05}
          />
        </mesh>
      </group>

      {/* Door handle */}
      <group position={[doorWidth / 2 - 0.12, 0, doorDepth / 2 + 0.02]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.35, 16]} />
          <meshStandardMaterial
            color={handleColor}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <mesh position={[0, 0.22, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.25, 16]} />
          <meshStandardMaterial
            color={handleColor}
            roughness={0.15}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[0, 0.36, 0]} castShadow>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial
            color={handleColor}
            roughness={0.1}
            metalness={0.95}
          />
        </mesh>
      </group>

      {/* Keyhole */}
      <mesh
        position={[doorWidth / 2 - 0.12, -0.05, doorDepth / 2 + 0.03]}
      >
        <cylinderGeometry args={[0.012, 0.012, 0.01, 8]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>

      {/* Top decorative element */}
      <mesh position={[0, doorHeight / 2 + 0.04, 0]}>
        <boxGeometry args={[doorWidth * 0.8, 0.03, doorDepth + 0.02]} />
        <meshStandardMaterial
          color={panelBorderColor}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Bottom decorative element */}
      <mesh position={[0, -doorHeight / 2 - 0.04, 0]}>
        <boxGeometry args={[doorWidth * 0.8, 0.03, doorDepth + 0.02]} />
        <meshStandardMaterial
          color={panelBorderColor}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

// ─── Hero 3D Scene ──────────────────────────────────────────────────────
function HeroDoorScene() {
  return (
    <>
      <perspectiveCamera />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight
        position={[-3, 5, -2]}
        intensity={0.5}
        color="#f0e6d3"
      />
      <pointLight
        position={[0, 3, 2]}
        intensity={0.8}
        color="#fff5e6"
        distance={10}
      />

      <HeroDoorModel />

      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.51, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1a1410" roughness={0.8} metalness={0.1} />
      </mesh>
    </>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  // FIX: useTransform must be called at top level, not inside JSX
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const particles = useMemo(
    () =>
      SEEDS.map((s, i) => ({
        ...s,
        id: i,
      })),
    [],
  );

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-dark-primary"
    >
      {/* Animated background layers */}
      <div className="absolute inset-0">
        {/* Dark base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-primary via-dark-secondary to-dark-primary" />

        {/* Floating gold orbs */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[10%] right-[10%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut",
          }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23d4a853\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />

        {/* Floating particles */}
        {particles.map((s) => (
          <motion.div
            key={s.id}
            className="absolute w-1 h-1 bg-gold-400/30 rounded-full"
            style={{ willChange: "transform, opacity" }}
            initial={{ x: `${s.x}%`, y: `${s.y}%`, scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
              x: `calc(${s.x}% + ${s.dx}px)`,
              y: `calc(${s.y}% - ${s.dy}px)`,
            }}
            transition={{
              duration: s.d,
              repeat: Infinity,
              delay: s.dl,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-6 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen pt-32 pb-20">
          {/* Text content */}
          <div className="order-2 lg:order-none">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/10 mb-8">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                <span className="text-sm text-gold-300 font-medium">
                  أبواب WPC الفاخرة — صُنعت للسعودية
                </span>
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="gold-text-gradient text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] drop-shadow-2xl">
                بابكم
              </span>
            </motion.h1>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 drop-shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="gold-text-gradient">بابكم</span> باب راحتك
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-foreground/80 mb-10 max-w-lg leading-relaxed bg-dark-secondary/40 p-6 rounded-2xl border border-gold-500/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              اكتشف عالماً من الفخامة والأناقة لأبواب المنازل (WPC). مصنوعة
              بأعلى معايير الجودة،{" "}
              مقاومة للرطوبة والحرارة — مثالية للمناخ السعودي.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#products"
                className="btn-gold-primary text-lg px-10 py-4 shadow-gold inline-flex items-center gap-2 group"
              >
                اكتشف المنتجات
                <svg
                  className="w-5 h-5 transition-transform group-hover:-rotate-45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
              <a
                href="#features"
                className="btn-gold-outline text-lg px-10 py-4 inline-flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                </svg>
                لماذا WPC؟
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-dark-border/50"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {[
                { value: "+500", label: "عميل سعيد" },
                { value: "+50", label: "تصميم حصري" },
                { value: "10+", label: "سنوات ضمان" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl md:text-3xl font-bold gold-text-gradient">
                    {stat.value}
                  </p>
                  <p className="text-sm text-foreground/50 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 3D Door Visual — Real Three.js */}
          <div className="order-1 lg:order-none relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className="relative w-[320px] sm:w-[400px] md:w-[450px] aspect-[3/4]"
            >
              {/* Glow behind door */}
              <motion.div
                className="absolute inset-[-40%] rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(212, 168, 83, 0.2) 0%, transparent 60%)",
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* 3D Canvas */}
              {isMounted ? (
                <Suspense
                  fallback={
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
                    </div>
                  }
                >
                  <Canvas
                    shadows
                    camera={{ position: [0, 1.2, 3], fov: 45 }}
                    gl={{ antialias: true, alpha: true }}
                    style={{ background: "transparent" }}
                  >
                    <HeroDoorScene />
                  </Canvas>
                </Suspense>
              ) : (
                /* CSS fallback for SSR */
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
                </div>
              )}

              {/* Floating label */}
              <motion.div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-morphism px-6 py-3 rounded-2xl shadow-xl z-10"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-sm font-semibold text-gold-400">
                  ✦ Premium Collection
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-gold-500/30 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-gold-400"
            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}