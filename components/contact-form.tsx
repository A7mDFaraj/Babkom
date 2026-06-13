"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    doorType: "",
    width: "",
    height: "",
    color: "",
    panelStyle: "",
    handleStyle: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const cities = [
    "الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام",
    "الخبر", "الظهران", "أبها", "تبوك", "القصيم",
    "حائل", "الطائف", "جيزان", "نجران", "عرعر",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the data to your backend or WhatsApp
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative section-premium bg-gradient-to-b from-background via-cream-50 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-sm text-gold-600 font-medium">اطلب الآن</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">أرسل </span>
            <span className="gold-text-gradient">طلبك</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            املأ النموذج أدناه وسيتواصل معك فريقنا خلال 24 ساعة لتقديم استشارة مجانية وعرض سعر مخصص
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Contact */}
            <div className="glass-morphism rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-foreground">تواصل مباشر</h3>

              {/* WhatsApp */}
              <a
                href="https://wa.me/966XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 hover:bg-green-100 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground">واتساب</p>
                  <p className="text-sm text-muted-foreground" dir="ltr">+966 XX XXX XXXX</p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+966XXXXXXXXX"
                className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M2.25 6.75c0 8.284 6.716 15 15 15m2.25-4.575a19.314 19.314 0 01-8.35-4.277A1 1 0 0112 11.086a19.314 19.314 0 01-8.35 4.277" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground">اتصل بنا</p>
                  <p className="text-sm text-muted-foreground" dir="ltr">+966 XX XXX XXXX</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@wpcdoors.sa"
                className="flex items-center gap-4 p-4 rounded-2xl bg-purple-50 hover:bg-purple-100 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground">البريد الإلكتروني</p>
                  <p className="text-sm text-muted-foreground">info@wpcdoors.sa</p>
                </div>
              </a>
            </div>

            {/* Working Hours */}
            <div className="glass-morphism rounded-3xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">ساعات العمل</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الأحد - الخميس</span>
                  <span className="font-semibold">9 ص - 9 م</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الجمعة</span>
                  <span className="font-semibold">4 م - 9 م</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">السبت</span>
                  <span className="font-semibold">10 ص - 6 م</span>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {["ضمان الجودة ✓", "شحن مجاني ✓", "تركيب مجاني ✓"].map((badge) => (
                <span
                  key={badge}
                  className="px-4 py-2 rounded-xl bg-gold-50 text-gold-700 text-sm font-semibold"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-morphism rounded-3xl p-8 space-y-6">
              {submitted && (
                <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-700 text-center font-semibold">
                  ✓ تم إرسال طلبك بنجاح! سنتواصل معك قريباً.
                </div>
              )}

              {/* Name & Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">الاسم الكامل *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="أدخل اسمك"
                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">رقم الجوال *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="05XXXXXXXX"
                    dir="ltr"
                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email & City */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@email.com"
                    dir="ltr"
                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">المدينة *</label>
                  <select
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all text-foreground"
                  >
                    <option value="">اختر المدينة</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Door Type */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">نوع الباب *</label>
                <select
                  required
                  value={formData.doorType}
                  onChange={(e) => setFormData({ ...formData, doorType: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all text-foreground"
                >
                  <option value="">اختر نوع الباب</option>
                  <option value="classic">كلاسيكي</option>
                  <option value="modern">حديث</option>
                  <option value="glass">زجاجي</option>
                  <option value="arabic">عربي إسلامي</option>
                  <option value="custom">تصميم مخصص</option>
                </select>
              </div>

              {/* Dimensions */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">العرض (سم) *</label>
                  <input
                    type="number"
                    required
                    value={formData.width}
                    onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                    placeholder="90"
                    dir="ltr"
                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">الارتفاع (سم) *</label>
                  <input
                    type="number"
                    required
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    placeholder="210"
                    dir="ltr"
                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Color, Panel, Handle */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">اللون</label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all text-foreground"
                  >
                    <option value="">اختر اللون</option>
                    <option value="gold">ذهبي كلاسيكي</option>
                    <option value="dark-brown">بني غامق</option>
                    <option value="white">أبيض كريمي</option>
                    <option value="black">أسود فاخر</option>
                    <option value="gray">رمادي حديث</option>
                    <option value="green">أخضر ملكي</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">التصميم</label>
                  <select
                    value={formData.panelStyle}
                    onChange={(e) => setFormData({ ...formData, panelStyle: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all text-foreground"
                  >
                    <option value="">اختر التصميم</option>
                    <option value="classic">كلاسيكي</option>
                    <option value="modern">حديث</option>
                    <option value="glass">زجاجي</option>
                    <option value="arabic">عربي</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">المقبض</label>
                  <select
                    value={formData.handleStyle}
                    onChange={(e) => setFormData({ ...formData, handleStyle: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all text-foreground"
                  >
                    <option value="">اختر المقبض</option>
                    <option value="gold">ذهبي</option>
                    <option value="silver">فضي</option>
                    <option value="black">أسود مطفي</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">ملاحظات إضافية</label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="أي تفاصيل إضافية تريد مشاركتها..."
                  className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full btn-gold-primary text-lg py-4 shadow-gold inline-flex items-center justify-center gap-3 group"
              >
                إرسال الطلب
                <svg
                  className="w-5 h-5 transition-transform group-hover:-rotate-45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>

              <p className="text-center text-xs text-muted-foreground">
                بالضغط على "إرسال الطلب" فإنك توافق على سياسة الخصوصية وشروط الخدمة
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
