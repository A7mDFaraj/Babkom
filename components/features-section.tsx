"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.375 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    title: "مقاوم للحرارة السعودية",
    description: "تصميم متقدم يتحمل درجات الحرارة العالية في المملكة دون تشوه أو انكماش، مع ثبات أبعاد مضمون.",
    color: "#FF6B35",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.113H6.622a2.25 2.25 0 01-2.247-2.113L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    title: "عزل مائي كامل",
    description: "تقنية WPC توفر عزلًا مائيًا بنسبة 100%، مثالية للمطابخ والحمامات والمناطق الرطبة.",
    color: "#0077B6",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "ضمان 10 سنوات",
    description: "نقدم ضمان شامل لمدة 10 سنوات ضد عيوب التصنيع والتشوه، مع خدمة صيانة مجانية.",
    color: "#2D6A4F",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M11.48 14.21a4.5 4.5 0 01-6.96-6.96 4.5 4.5 0 00-3.18 1.32 3 3 0 004.24 4.24l5.9-5.9a6 6 0 018.48 8.48l-.7.7a2.12 2.12 0 01-3 0l-.7-.7a4.5 4.5 0 00-6.36-6.36z" />
      </svg>
    ),
    title: "صديق للبيئة",
    description: "مصنوع من مواد معاد تدويرها 100%، خالي من الفورمالديهايد، ومتوافق مع معايير الاستدامة.",
    color: "#52B788",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    title: "تصميم فاخر",
    description: "ملمس خشب طبيعي حقيقي مع إمكانية التخصيص الكامل للألوان والزخارف حسب ذوقك.",
    color: "#C4A265",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "تركيب احترافي",
    description: "فريق متخصص يقوم بالقياس والتركيب في نفس اليوم مع ضمان جودة التركيب وخدمة ما بعد البيع.",
    color: "#7B2CBF",
  },
];

const stats = [
  { value: "+5000", label: "باب تم تركيبه", icon: "🚪" },
  { value: "98%", label: "رضا العملاء", icon: "⭐" },
  { value: "+50", label: "تصميم حصري", icon: "🎨" },
  { value: "24/7", label: "دعم فني", icon: "📞" },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative section-premium bg-dark-primary overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, oklch(0.72 0.17 82 / 0.4) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, oklch(0.55 0.14 145 / 0.3) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-sm text-gold-300 font-medium">لماذا أبواب WPC؟</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">مميزات </span>
            <span className="gold-text-gradient">تجعلنا مختلفين</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            أبواب WPC ليست مجرد أبواب — إنها استثمار في جودة منزلك وجماله لسنوات طويلة
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group glass-morphism rounded-3xl p-8 relative overflow-hidden premium-shadow-hover"
            >
              {/* Hover gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 30% 30%, ${feature.color}15 0%, transparent 60%)` }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${feature.color}20`,
                    color: feature.color,
                  }}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="glass-morphism rounded-3xl p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <span className="text-3xl block mb-2">{stat.icon}</span>
                <p className="text-3xl md:text-4xl font-bold gold-text-gradient mb-2">{stat.value}</p>
                <p className="text-sm text-foreground/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
