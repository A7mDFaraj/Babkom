"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";

// Deterministic random seeds to avoid React eslint-plugin-errors
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
  { x: 90, y: 75, dx: 45, dy: -95, d: 4.8, dl: 2.8 },
  { x: 50, y: 50, dx: -30, dy: -160, d: 7.2, dl: 0.3 },
  { x: 5, y: 10, dx: 95, dy: -85, d: 5.8, dl: 4.2 },
  { x: 78, y: 20, dx: -80, dy: -110, d: 6.2, dl: 1.8 },
  { x: 42, y: 65, dx: 60, dy: -70, d: 7.8, dl: 3.2 },
  { x: 95, y: 35, dx: -50, dy: -125, d: 4.2, dl: 0.6 },
  { x: 15, y: 92, dx: 75, dy: -88, d: 6.6, dl: 2.2 },
  { x: 60, y: 8, dx: -65, dy: -145, d: 5.4, dl: 3.8 },
  { x: 33, y: 48, dx: 88, dy: -72, d: 7.6, dl: 1.6 },
  { x: 85, y: 55, dx: -42, dy: -98, d: 4.6, dl: 2.6 },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

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
          transition={{ duration: 10, repeat: Infinity, delay: 2, ease: "easeInOut" }}
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
        style={{ opacity, y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="text-white">أبواب</span>
              <br />
              <span className="gold-text-gradient">WPC</span>
              <br />
              <span className="text-white">الاستثنائية</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-foreground/60 mb-4 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              اكتشف عالماً من الفخامة والأناقة لأبواب المنازل. مصنوعة بأعلى معايير الجودة،{" "}
              مقاومة للرطوبة والحرارة — مثالية للمناخ السعودي.
            </motion.p>

            <motion.p
              className="text-xl md:text-2xl font-bold text-gold-400 mb-10 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              بابكم باب راحتك
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
                  <p className="text-sm text-foreground/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 3D Door Visual */}
          <div className="order-1 lg:order-none relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              style={{ perspective: 1000 }}
              className="relative w-[320px] sm:w-[400px] md:w-[450px]"
            >
              {/* Door frame */}
              <div className="relative aspect-[3/5]">
                {/* Glow behind door */}
                <motion.div
                  className="absolute inset-[-40%] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, oklch(0.65 0.16 82 / 0.2) 0%, transparent 60%)",
                  }}
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Door body */}
                <motion.div
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #8B6F47 0%, #A0845C 25%, #C4A265 50%, #A0845C 75%, #8B6F47 100%)",
                    transformStyle: "preserve-3d",
                    boxShadow:
                      "0 50px 100px oklch(0 0 0 / 0.4), inset 0 -5px 15px oklch(0 0 0 / 0.2)",
                  }}
                  animate={{ rotateY: [0, 8, 0, -8, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Wood grain effect */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, transparent, transparent 8px, oklch(0 0 0 / 0.1) 8px, oklch(0 0 0 / 0.1) 9px)",
                    }}
                  />

                  {/* Door panels */}
                  <div className="absolute inset-[15%] border-4 border-white/20 rounded-lg" />
                  <div className="absolute inset-[45%] w-[60%] mx-auto border-4 border-white/20 rounded-lg" />

                  {/* Door handle */}
                  <motion.div
                    className="absolute top-[48%] -translate-y-1/2 w-3 h-12 left-[75%]"
                    style={{
                      background: "linear-gradient(180deg, #d4a853, #b8860b, #d4a853)",
                      borderRadius: 2,
                      boxShadow: "0 2px 8px oklch(0 0 0 / 0.3)",
                    }}
                  />

                  {/* Light reflection */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, transparent 40%, white/10 50%, transparent 60%)",
                    }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>

                {/* Door frame border */}
                <motion.div
                  className="absolute -inset-[8px] rounded-3xl pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--gold-300), var(--gold-600), var(--gold-300))",
                  }}
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Floating label */}
                <motion.div
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-morphism px-6 py-3 rounded-2xl shadow-xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <p className="text-sm font-semibold text-gold-400">✦ Premium Collection</p>
                </motion.div>
              </div>
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