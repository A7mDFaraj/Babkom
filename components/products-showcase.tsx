"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const doorProducts = [
  {
    id: "royal-majestic",
    name: "الملك المجيد",
    nameEn: "Royal Majestic",
    category: "كلاسيكي",
    price: "2,500 ر.س",
    description: "باب كلاسيكي فاخر بزخارف يدوية ونقوش ذهبية، مثالي للصالات الرئيسية",
    features: ["نقوش يدوية", "مقبض ذهبي مطلي", "عزل صوتي متقدم", "مقاوم للرطوبة"],
    color: "#8B6F47",
    gradient: "linear-gradient(135deg, #8B6F47 0%, #C4A265 50%, #8B6F47 100%)",
    badge: "الأكثر مبيعاً",
    rating: 4.9,
  },
  {
    id: "modern-elegance",
    name: "الأناقة العصرية",
    nameEn: "Modern Elegance",
    category: "حديث",
    price: "2,200 ر.س",
    description: "تصميم مسطح عصري بأس خطوط نظيفة، يناسب الديكورات الحديثة والحد الأدنى",
    features: ["سطح أملس", "مقبض مطفي أسود", "سطح مضاد للبصمات", "سهل التنظيف"],
    color: "#2a2a2a",
    gradient: "linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)",
    badge: "جديد",
    rating: 4.8,
  },
  {
    id: "glass-pearl",
    name: "لؤلؤة الزجاج",
    nameEn: "Glass Pearl",
    category: "زجاجي",
    price: "3,100 ر.س",
    description: "دمج مثالي بين الخشب والزجاج المقوى، يضفي إطلالة مفتوحة وأنيقة",
    features: ["زجاج مقوى 8mm", "إطار ألمنيوم", "شفافية جزئية", "عزل حراري"],
    color: "#a8d8ea",
    gradient: "linear-gradient(135deg, #6ba3be 0%, #a8d8ea 50%, #6ba3be 100%)",
    badge: "مميز",
    rating: 4.7,
  },
  {
    id: "islamic-heritage",
    name: "تراث إسلامي",
    nameEn: "Islamic Heritage",
    category: "عربي",
    price: "2,800 ر.س",
    description: "زخارف هندسية إسلامية أصيلة مع نقوش عربية تقليدية على باب WPC فاخر",
    features: ["زخارف إسلامية", "نقوش عربية", "ذهب عيار 24", "تحف فنية"],
    color: "#C4A265",
    gradient: "linear-gradient(135deg, #8B6F47 0%, #D4A853 50%, #8B6F47 100%)",
    badge: "تحفة فنية",
    rating: 5.0,
  },
  {
    id: "desert-sunset",
    name: "غروب الصحراء",
    nameEn: "Desert Sunset",
    category: "كلاسيكي",
    price: "2,400 ر.س",
    description: "ألوان دافئة مستوحاة من مناظر غروب الصحراء السعودية، تصميم فريد",
    features: ["ألوان طبيعية", "ملمس خشب حقيقي", "طبقات حماية", "ضمان 15 سنة"],
    color: "#B87333",
    gradient: "linear-gradient(135deg, #B87333 0%, #D4943A 50%, #B87333 100%)",
    badge: null,
    rating: 4.6,
  },
  {
    id: "arctic-frost",
    name: "صقيع أبيض",
    nameEn: "Arctic Frost",
    category: "حديث",
    price: "2,100 ر.س",
    description: "أبيض نقي بتصميم مودرن، مثالي للمنازل ذات الديكور الأبيض والفضي",
    features: ["أبيض نقي", "سطح لامع", "مقاوم للاصفرار", "مناسب للأطفال"],
    color: "#F5F0E8",
    gradient: "linear-gradient(135deg, #E8DCC8 0%, #FFFFFF 50%, #E8DCC8 100%)",
    badge: "الأكثر طلباً",
    rating: 4.8,
  },
];

function DoorPreview({ gradient, color }: { gradient: string; color: string }) {
  return (
    <div
      className="w-full aspect-[3/5] rounded-2xl relative overflow-hidden"
      style={{ background: gradient }}
    >
      {/* Door panel lines */}
      <div className="absolute inset-[15%] border-2 border-white/20 rounded-lg" />
      <div className="absolute top-[45%] left-[15%] right-[15%] h-[8%] border-2 border-white/20 rounded" />

      {/* Handle */}
      <div
        className="absolute top-[48%] w-2 h-10 rounded-full"
        style={{
          left: "72%",
          background: "linear-gradient(180deg, #d4a853, #b8860b)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        }}
      />

      {/* Light reflection */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, transparent 40%, white/8 50%, transparent 60%)",
        }}
      />

      {/* Bottom shadow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30%]"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)" }}
      />
    </div>
  );
}

export function ProductsShowcase() {
  const [activeFilter, setActiveFilter] = useState("الكل");
  const filters = ["الكل", "كلاسيكي", "حديث", "زجاجي", "عربي"];

  const filteredProducts = activeFilter === "الكل"
    ? doorProducts
    : doorProducts.filter((p) => p.category === activeFilter);

  return (
    <section id="products" className="relative section-premium bg-gradient-to-b from-background via-cream-50 to-background">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/10 mb-6">
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-sm text-gold-600 font-medium">مجموعتنا الحصرية</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span className="text-foreground">أبواب </span>
          <span className="gold-text-gradient">تليق بمنزلك</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          اختر من بين مجموعة متنوعة من أبواب WPC الفاخرة المصممة خصيصاً لتلبية أذواق السعوديين
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-3 mb-12 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
              activeFilter === filter
                ? "bg-gold-500 text-white shadow-lg shadow-gold/30"
                : "bg-white text-muted-foreground hover:bg-gold-50 hover:text-foreground border border-[oklch(0.88_0.01_90)]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group premium-card bg-white overflow-hidden"
          >
            {/* Door Preview */}
            <div className="relative p-6 pb-0">
              <DoorPreview gradient={product.gradient} color={product.color} />

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-8 right-8 px-3 py-1 rounded-full bg-gold-500 text-white text-xs font-bold shadow-lg">
                  {product.badge}
                </div>
              )}

              {/* Rating */}
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, si) => (
                  <svg
                    key={si}
                    className={`w-4 h-4 ${si < Math.floor(product.rating) ? "text-gold-400" : "text-gray-200"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-muted-foreground mr-1">{product.rating}</span>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6 pt-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">{product.nameEn}</p>
                </div>
                <span className="px-2 py-1 rounded-lg bg-gold-50 text-gold-600 text-xs font-semibold">
                  {product.category}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{product.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-5">
                {product.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 rounded-lg bg-secondary text-xs text-secondary-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-[oklch(0.88_0.01_90)]">
                <div>
                  <p className="text-xs text-muted-foreground">يبدأ من</p>
                  <p className="text-xl font-bold gold-text-gradient">{product.price}</p>
                </div>
                <a
                  href="#configurator"
                  className="btn-gold-primary text-sm px-5 py-2.5 shadow-gold inline-flex items-center gap-1.5 group-hover:shadow-elevated transition-all"
                >
                  صمم الآن
                  <svg className="w-4 h-4 transition-transform group-hover:-rotate-45" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
