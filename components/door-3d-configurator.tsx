"use client";

import { useRef, useState, useCallback, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";

// Lazy load the Canvas to prevent SSR issues with Three.js
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

// ─── Door Model Component (only runs client-side inside Canvas) ─────────
function DoorModel({
  doorColor,
  panelStyle,
  handleStyle,
  width,
  height,
}: {
  doorColor: string;
  panelStyle: string;
  handleStyle: string;
  width: number;
  height: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state: { clock: { elapsedTime: number } }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  const doorHeight = height * 0.85;
  const doorWidth = width * 0.85;
  const doorDepth = 0.06;

  // Panel configurations
  const panels: { x: number; y: number; w: number; h: number }[] = [];
  if (panelStyle === "classic") {
    panels.push(
      {
        x: -doorWidth * 0.28,
        y: doorHeight * 0.22,
        w: doorWidth * 0.56,
        h: doorHeight * 0.38,
      },
      {
        x: -doorWidth * 0.28,
        y: -doorHeight * 0.22,
        w: doorWidth * 0.56,
        h: doorHeight * 0.38,
      },
    );
  } else if (panelStyle === "modern") {
    panels.push({
      x: 0,
      y: 0,
      w: doorWidth * 0.7,
      h: doorHeight * 0.85,
    });
  } else if (panelStyle === "glass") {
    panels.push(
      {
        x: -doorWidth * 0.28,
        y: doorHeight * 0.15,
        w: doorWidth * 0.56,
        h: doorHeight * 0.35,
      },
      {
        x: -doorWidth * 0.28,
        y: -doorHeight * 0.25,
        w: doorWidth * 0.56,
        h: doorHeight * 0.3,
      },
    );
  } else if (panelStyle === "arabic") {
    panels.push(
      {
        x: -doorWidth * 0.28,
        y: doorHeight * 0.22,
        w: doorWidth * 0.56,
        h: doorHeight * 0.35,
      },
      {
        x: -doorWidth * 0.28,
        y: -doorHeight * 0.22,
        w: doorWidth * 0.56,
        h: doorHeight * 0.35,
      },
    );
  }

  const isGlass = panelStyle === "glass";
  const baseColor = new THREE.Color(doorColor);
  const handleColorHex =
    handleStyle === "gold"
      ? "#d4a853"
      : handleStyle === "silver"
        ? "#c0c0c0"
        : "#1a1a1a";

  return (
    <group ref={groupRef} position={[0, doorHeight / 2 - 0.5, 0]}>
      {/* Door frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry
          args={[doorWidth + 0.16, doorHeight + 0.16, doorDepth + 0.04]}
        />
        <meshStandardMaterial
          color="#2a1f0e"
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Door body */}
      <mesh
        castShadow
        receiveShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[doorWidth, doorHeight, doorDepth]} />
        <meshStandardMaterial
          color={doorColor}
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* Wood grain texture overlay */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={`grain-${i}`}
          position={[
            0,
            doorHeight * 0.4 - i * doorHeight * 0.07,
            doorDepth / 2 + 0.001,
          ]}
        >
          <boxGeometry args={[doorWidth * 0.95, 0.003, 0.001]} />
          <meshStandardMaterial
            color={new THREE.Color(doorColor).multiplyScalar(0.85)}
            roughness={0.6}
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}

      {/* Panels */}
      {panels.map((panel, i) => (
        <group key={i}>
          {/* Panel recessed area */}
          <mesh
            position={[panel.x, panel.y, -doorDepth / 2 - 0.005]}
          >
            <boxGeometry args={[panel.w + 0.04, panel.h + 0.04, 0.02]} />
            <meshStandardMaterial
              color={new THREE.Color(doorColor).multiplyScalar(0.8)}
              roughness={0.5}
              metalness={0.02}
            />
          </mesh>

          {/* Panel inner */}
          <mesh
            position={[panel.x, panel.y, -doorDepth / 2 - 0.015]}
          >
            <boxGeometry args={[panel.w - 0.06, panel.h - 0.06, 0.01]} />
            {isGlass ? (
              <meshStandardMaterial
                color="#a8d8ea"
                roughness={0.1}
                metalness={0.3}
                transparent
                opacity={0.35}
              />
            ) : (
              <meshStandardMaterial
                color={new THREE.Color(doorColor).multiplyScalar(0.9)}
                roughness={0.3}
                metalness={0.05}
              />
            )}
          </mesh>

          {/* Panel border */}
          <mesh position={[panel.x, panel.y, -doorDepth / 2 - 0.02]}>
            <boxGeometry args={[panel.w + 0.02, panel.h + 0.02, 0.005]} />
            <meshStandardMaterial
              color={new THREE.Color(doorColor).multiplyScalar(1.1)}
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>
        </group>
      ))}

      {/* Arabic geometric pattern overlay for arabic style */}
      {panelStyle === "arabic" && (
        <mesh position={[0, 0, -doorDepth / 2 - 0.025]}>
          <boxGeometry args={[doorWidth * 0.6, doorHeight * 0.15, 0.002]} />
          <meshStandardMaterial
            color="#d4a853"
            roughness={0.3}
            metalness={0.6}
            transparent
            opacity={0.4}
          />
        </mesh>
      )}

      {/* Door handle */}
      <group position={[doorWidth / 2 - 0.12, 0, doorDepth / 2 + 0.02]}>
        {/* Handle base plate */}
        <mesh castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.35, 16]} />
          <meshStandardMaterial
            color={handleColorHex}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Handle rod */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.25, 16]} />
          <meshStandardMaterial
            color={handleColorHex}
            roughness={0.15}
            metalness={0.9}
          />
        </mesh>

        {/* Handle knob */}
        <mesh position={[0, 0.36, 0]} castShadow>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial
            color={handleColorHex}
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
          color={new THREE.Color(doorColor).multiplyScalar(1.05)}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Bottom decorative element */}
      <mesh position={[0, -doorHeight / 2 - 0.04, 0]}>
        <boxGeometry args={[doorWidth * 0.8, 0.03, doorDepth + 0.02]} />
        <meshStandardMaterial
          color={new THREE.Color(doorColor).multiplyScalar(1.05)}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Hover glow effect */}
      {hovered && (
        <mesh position={[0, 0, doorDepth / 2 + 0.05]}>
          <boxGeometry args={[doorWidth + 0.1, doorHeight + 0.1, 0.001]} />
          <meshBasicMaterial color="#d4a853" transparent opacity={0.08} />
        </mesh>
      )}
    </group>
  );
}

// ─── Scene Component ────────────────────────────────────────────────────
function DoorScene({
  doorColor,
  panelStyle,
  handleStyle,
  width,
  height,
}: {
  doorColor: string;
  panelStyle: string;
  handleStyle: string;
  width: number;
  height: number;
}) {
  return (
    <>
      <perspectiveCamera />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
      />
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
      <spotLight
        position={[0, 5, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.6}
        castShadow
      />

      {/* Door model */}
      <DoorModel
        doorColor={doorColor}
        panelStyle={panelStyle}
        handleStyle={handleStyle}
        width={width}
        height={height}
      />

      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.51, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color="#1a1410"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Contact shadows */}
      <ContactShadows
        position={[0, -0.5, 0]}
        opacity={0.6}
        scale={10}
        blur={2.5}
        far={4}
        frames={1}
        resolution={512}
      />
    </>
  );
}

// ─── Loading Component ──────────────────────────────────────────────────
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-dark-primary/50">
      <div className="w-12 h-12 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
      <span className="text-gold-400 text-sm">
        جاري تحميل النموذج ثلاثي الأبعاد...
      </span>
    </div>
  );
}

// ─── Main Configurator Component ─────────────────────────────────────────
const doorColors = [
  { name: "ذهبي كلاسيكي", value: "#8B6F47", hex: "#8B6F47" },
  { name: "بني غامق", value: "#3E2723", hex: "#3E2723" },
  { name: "أبيض كريمي", value: "#F5F0E8", hex: "#F5F0E8" },
  { name: "أسود فاخر", value: "#1a1a1a", hex: "#1A1A1A" },
  { name: "رمادي حديث", value: "#6B7280", hex: "#6B7280" },
  { name: "أخضر ملكي", value: "#1B5E20", hex: "#1B5E20" },
  { name: "أحمر داكن", value: "#4A1414", hex: "#4A1414" },
  { name: "كريمي فاتح", value: "#E8DCC8", hex: "#E8DCC8" },
];

const panelStyles = [
  { id: "classic", name: "كلاسيكي", desc: "لوحين تقليديين أنيقين" },
  { id: "modern", name: "حديث", desc: "تصميم مسطح عصري" },
  { id: "glass", name: "زجاجي", desc: "ألواح زجاجية شفافة" },
  { id: "arabic", name: "عربي", desc: "زخارف عربية إسلامية" },
];

const handleStyles = [
  { id: "gold", name: "ذهبي", icon: "🟡" },
  { id: "silver", name: "فضي", icon: "⚪" },
  { id: "black", name: "أسود مطفي", icon: "⬛" },
];

export function Door3DConfigurator() {
  const [selectedColor, setSelectedColor] = useState("#8B6F47");
  const [selectedPanel, setSelectedPanel] = useState("classic");
  const [selectedHandle, setSelectedHandle] = useState("gold");
  const [doorWidth, setDoorWidth] = useState(90);
  const [doorHeight, setDoorHeight] = useState(210);
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setSelectedColor(color);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  }, []);

  const handleReset = useCallback(() => {
    setSelectedColor("#8B6F47");
    setSelectedPanel("classic");
    setSelectedHandle("gold");
    setDoorWidth(90);
    setDoorHeight(210);
    setCustomWidth("");
    setCustomHeight("");
  }, []);

  const widthDisplay = customWidth ? `${customWidth} سم` : `${doorWidth} سم`;
  const heightDisplay = customHeight
    ? `${customHeight} سم`
    : `${doorHeight} سم`;

  return (
    <section
      id="configurator"
      className="relative section-premium bg-dark-primary overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(212, 168, 83, 0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(82, 183, 136, 0.2) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-sm text-gold-300 font-medium">
              تصميم تفاعلي ثلاثي الأبعاد
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">صمم بابك</span>{" "}
            <span className="gold-text-gradient">بأحجامك</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            اختر اللون والتصميم والأحجام المخصصة ثم أرسل طلبك مباشرة. شاهد
            بابك بشكل ثلاثي الأبعاد في الوقت الفعلي!
          </p>
        </div>

        {/* Main Configurator Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* 3D Viewer */}
          <div className="relative">
            <div
              className="relative rounded-3xl overflow-hidden border border-gold-500/20"
              style={{
                background:
                  "linear-gradient(135deg, #0d0a06 0%, #1a1410 50%, #0d0a06 100%)",
              }}
            >
              {/* Canvas */}
              <div className="aspect-[4/5] lg:aspect-square relative">
                {isMounted ? (
                  <Suspense fallback={<LoadingFallback />}>
                    <Canvas
                      shadows
                      camera={{ position: [0, 1.5, 3.5], fov: 45 }}
                      gl={{ antialias: true, alpha: false }}
                    >
                      <DoorScene
                        doorColor={selectedColor}
                        panelStyle={selectedPanel}
                        handleStyle={selectedHandle}
                        width={doorWidth / 100}
                        height={doorHeight / 100}
                      />
                    </Canvas>
                  </Suspense>
                ) : (
                  <LoadingFallback />
                )}

                {/* Overlay info */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setIsAnimating(true)}
                    className="glass-morphism px-3 py-2 rounded-xl text-xs text-gold-400 hover:bg-gold-500/20 transition-all"
                    title="إعادة تعيين العرض"
                  >
                    ↻ إعادة تدوير
                  </button>
                </div>

                {/* Bottom info bar */}
                <div className="absolute bottom-4 inset-x-4 glass-morphism rounded-2xl p-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-muted-foreground text-xs">
                          العرض:
                        </span>
                        <span className="text-gold-400 font-bold mr-1">
                          {widthDisplay}
                        </span>
                      </div>
                      <div className="w-px h-6 bg-border" />
                      <div>
                        <span className="text-muted-foreground text-xs">
                          الارتفاع:
                        </span>
                        <span className="text-gold-400 font-bold mr-1">
                          {heightDisplay}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full animate-pulse bg-green-500" />
                      <span className="text-xs text-muted-foreground">
                        تفاعلي • اسحب للتدوير
                      </span>
                    </div>
                  </div>
                </div>

                {/* Zoom hint */}
                <div className="absolute top-4 left-4 glass-morphism px-3 py-2 rounded-xl">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <span>اسحب للتدوير • عجلة للتكبير</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="space-y-8">
            {/* Color Selection */}
            <div className="glass-morphism rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center text-gold-400">
                  🎨
                </span>
                اختر اللون
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {doorColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorChange(color.value)}
                    className={`relative group rounded-2xl p-3 transition-all duration-300 ${
                      selectedColor === color.value
                        ? "ring-2 ring-gold-400 ring-offset-2 ring-offset-dark-primary scale-105"
                        : "hover:scale-105"
                    }`}
                    style={{ background: color.value }}
                    title={color.name}
                  >
                    {selectedColor === color.value && (
                      <div className="absolute inset-0 rounded-2xl border-2 border-gold-400" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        ["#F5F0E8", "#E8DCC8"].includes(color.value)
                          ? "text-gray-700"
                          : "text-white"
                      }`}
                    >
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Panel Style */}
            <div className="glass-morphism rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center text-gold-400">
                  📐
                </span>
                اختر التصميم
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {panelStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedPanel(style.id)}
                    className={`relative p-4 rounded-2xl text-right transition-all duration-300 ${
                      selectedPanel === style.id
                        ? "bg-gold-500/20 border-2 border-gold-400"
                        : "bg-dark-secondary/50 border border-dark-border hover:border-gold-500/30"
                    }`}
                  >
                    <p
                      className={`font-bold text-sm ${selectedPanel === style.id ? "text-gold-400" : "text-white"}`}
                    >
                      {style.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {style.desc}
                    </p>
                    {selectedPanel === style.id && (
                      <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-gold-400 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-dark-primary"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Handle Style */}
            <div className="glass-morphism rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center text-gold-400">
                  🚪
                </span>
                اختر المقبض
              </h3>
              <div className="flex gap-3">
                {handleStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedHandle(style.id)}
                    className={`flex-1 p-4 rounded-2xl text-center transition-all duration-300 ${
                      selectedHandle === style.id
                        ? "bg-gold-500/20 border-2 border-gold-400"
                        : "bg-dark-secondary/50 border border-dark-border hover:border-gold-500/30"
                    }`}
                  >
                    <span className="text-xl block mb-1">{style.icon}</span>
                    <p
                      className={`font-bold text-sm ${selectedHandle === style.id ? "text-gold-400" : "text-white"}`}
                    >
                      {style.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Dimensions */}
            <div className="glass-morphism rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center text-gold-400">
                  📏
                </span>
                الأحجام المخصصة
              </h3>

              {/* Standard sizes */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { w: 80, h: 200 },
                  { w: 90, h: 210 },
                  { w: 100, h: 210 },
                  { w: 120, h: 210 },
                ].map((size) => (
                  <button
                    key={`${size.w}-${size.h}`}
                    onClick={() => {
                      setDoorWidth(size.w);
                      setDoorHeight(size.h);
                      setCustomWidth("");
                      setCustomHeight("");
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      doorWidth === size.w &&
                      doorHeight === size.h &&
                      !customWidth
                        ? "bg-gold-500/20 border-2 border-gold-400 text-gold-400"
                        : "bg-dark-secondary/50 border border-dark-border text-muted-foreground hover:border-gold-500/30"
                    }`}
                  >
                    {size.w} × {size.h}
                  </button>
                ))}
              </div>

              {/* Custom input */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    العرض (سم)
                  </label>
                  <input
                    type="number"
                    value={customWidth}
                    onChange={(e) => {
                      setCustomWidth(e.target.value);
                      setDoorWidth(parseInt(e.target.value) || 90);
                    }}
                    placeholder="مثال: 95"
                    className="w-full px-4 py-3 rounded-xl bg-dark-secondary/80 border border-dark-border text-white placeholder:text-muted-foreground focus:border-gold-400 focus:ring-1 focus:ring-gold-400 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    الارتفاع (سم)
                  </label>
                  <input
                    type="number"
                    value={customHeight}
                    onChange={(e) => {
                      setCustomHeight(e.target.value);
                      setDoorHeight(parseInt(e.target.value) || 210);
                    }}
                    placeholder="مثال: 220"
                    className="w-full px-4 py-3 rounded-xl bg-dark-secondary/80 border border-dark-border text-white placeholder:text-muted-foreground focus:border-gold-400 focus:ring-1 focus:ring-gold-400 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Summary & CTA */}
            <div className="glass-morphism rounded-3xl p-6 space-y-4 border-gold-500/30">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center text-gold-400">
                  ✨
                </span>
                ملخص تصميمك
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-dark-border/50">
                  <span className="text-muted-foreground">اللون:</span>
                  <span className="text-white font-medium">
                    {doorColors.find((c) => c.value === selectedColor)?.name}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-dark-border/50">
                  <span className="text-muted-foreground">التصميم:</span>
                  <span className="text-white font-medium">
                    {panelStyles.find((s) => s.id === selectedPanel)?.name}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-dark-border/50">
                  <span className="text-muted-foreground">المقبض:</span>
                  <span className="text-white font-medium">
                    {handleStyles.find((s) => s.id === selectedHandle)?.name}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-dark-border/50">
                  <span className="text-muted-foreground">الأبعاد:</span>
                  <span className="text-gold-400 font-bold">
                    {widthDisplay} × {heightDisplay}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="flex-1 btn-gold-outline text-sm py-3"
                >
                  إعادة تعيين
                </button>
                <a
                  href="#contact"
                  className="flex-[2] btn-gold-primary text-sm py-3 shadow-gold inline-flex items-center justify-center gap-2 group"
                >
                  أرسل الطلب الآن
                  <svg
                    className="w-4 h-4 transition-transform group-hover:-rotate-45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
