"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "أحمد الشمري",
    location: "الرياض",
    text: "باب رائع جداً! الجودة ممتازة والتصميم يفوق الخيال. الفريق كان محترفاً جداً من القياس حتى التركيب. أنصح الجميع بالتعامل معهم.",
    rating: 5,
    doorType: "كلاسيكي - الملك المجيد",
    avatar: "أش",
  },
  {
    name: "فاطمة العتيبي",
    location: "جدة",
    text: "اخترت الباب الزجاجي لمدخل المنزل والنتيجة مذهلة! الزوار كلهم يسألون عنه. العزل الصوتي ممتاز والأسعار معقولة مقارنة بالجودة.",
    rating: 5,
    doorType: "زجاجي - لؤلؤة الزجاج",
    avatar: "فع",
  },
  {
    name: "محمد القحطاني",
    location: "مكة المكرمة",
    text: "أبواب WPC كانت أفضل قرار اتخذته. لم أكن أعرف عنها الكثير لكن بعد التجربة أصبحت أنصح بها كل من يسأل. مقاومة للحرارة فعلاً.",
    rating: 5,
    doorType: "حديث - الأناقة العصرية",
    avatar: "مق",
  },
  {
    name: "نورة السبيعي",
    location: "المدينة المنورة",
    text: "صممت باب بمقاسات خاصة لي والنتيجة كانت مثالية. التصميم العربي الإسلامي جميل جداً ويضيف لمسة حضارية للمنزل.",
    rating: 5,
    doorType: "عربي - تراث إسلامي",
    avatar: "نس",
  },
  {
    name: "خالد الدوسري",
    location: "الدمام",
    text: "ركبت 5 أبواب في منزلي الجديد. الجودة موحدة في كل الأبواب والتركيب كان نظيف وسريع. شكراً لفريق العمل على الاحترافية.",
    rating: 4,
    doorType: "كلاسيكي - غروب الصحراء",
    avatar: "خد",
  },
  {
    name: "سارة المالكي",
    location: "القصيم",
    text: "الباب الأبيض الكريمي أضفى جمالاً كبيراً لمنزلي. اللون مطابق تماماً للصورة والمقبض الذهبي يضيف لمسة فاخرة. تجربة شراء ممتازة!",
    rating: 5,
    doorType: "حديث - صقيع أبيض",
    avatar: "سم",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative section-premium bg-gradient-to-b from-background to-cream-50">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/10 mb-6">
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-sm text-gold-600 font-medium">آراء عملائنا</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span className="text-foreground">ماذا يقول </span>
          <span className="gold-text-gradient">عملاؤنا</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          نفخر بثقة أكثر من 5000 عميل في جميع أنحاء المملكة العربية السعودية
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="premium-card bg-white p-8 relative"
          >
            {/* Quote mark */}
            <div className="absolute top-4 left-4 text-6xl text-gold-200 font-serif leading-none opacity-50">"</div>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, si) => (
                <svg
                  key={si}
                  className={`w-5 h-5 ${si < t.rating ? "text-gold-400" : "text-gray-200"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Text */}
            <p className="text-foreground/80 leading-relaxed mb-6 relative z-10">{t.text}</p>

            {/* Door type badge */}
            {t.doorType && (
              <span className="inline-block px-3 py-1 rounded-lg bg-gold-50 text-gold-700 text-xs font-semibold mb-4">
                {t.doorType}
              </span>
            )}

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-bold text-sm">
                {t.avatar}
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust logos / partners */}
      <div className="mt-20 text-center">
        <p className="text-sm text-muted-foreground mb-8">موثوق من قبل أفضل العلامات التجارية</p>
        <div className="flex justify-center items-center gap-12 flex-wrap opacity-40">
          {["SABIC", "Almarai", "STC", "Elm", "Aramco"].map((brand) => (
            <span key={brand} className="text-xl font-bold text-muted-foreground">{brand}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
