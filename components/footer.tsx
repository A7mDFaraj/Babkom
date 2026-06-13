import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer id="contact" className="relative bg-dark-primary overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="morph-gradient-bg top-[-200px] left-[30%]" />
        <div className="morph-gradient-bg bottom-[-200px] right-[20%]" />
      </div>

      {/* CTA Section */}
      <div className="relative section-premium pt-0">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gold-text-gradient">
            جاهز لتحويل منزلك؟
          </h2>
          <p className="text-lg text-foreground/70 mb-10 max-w-2xl mx-auto">
            تواصل معنا اليوم واحصل على استشارة مجانية. فريقنا من الخبراء جاهز لمساعدتك في اختيار الأبواب المثالية لمنزلك أو عملك.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#products"
              className="btn-gold-primary text-lg px-10 py-4 shadow-gold hover:shadow-elevated transition-all duration-300"
            >
              تصفح المنتجات
            </a>
            <a
              href="https://wa.me/966XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-outline text-lg px-10 py-4"
            >
              تواصل واتساب
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-lg gold-gradient flex items-center justify-center shadow-gold">
                <span className="text-white font-bold">بابكم</span>
              </div>
              <div>
                <p className="font-bold text-lg text-white">بابكم للأبواب</p>
              </div>
            </div>
            <p className="text-foreground/50 leading-relaxed mb-6 max-w-md">
              نقدم أفخ أنواع أبواب WPC المصممة خصيصاً للسوق السعودي. جودة عالية، تصميم فاخر، وتحمل ممتاز للظروف المناخية.
            </p>
            <div className="flex gap-3">
              {["twitter", "instagram", "snapchat", "twitch"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-10 h-10 rounded-lg border border-dark-border bg-dark-secondary flex items-center justify-center text-foreground/40 hover:text-gold-400 hover:border-gold-500 transition-all duration-300"
                  aria-label={s}
                >
                  <span className="text-xs uppercase">{s[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5">روابط سريعة</h4>
            <ul className="space-y-3">
              {["الرئيسية", "منتجاتنا", "لماذا نحن", "آراء العملاء"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l}`}
                    className="text-foreground/50 hover:text-gold-400 transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5">تواصل معنا</h4>
            <ul className="space-y-3 text-foreground/50">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M2.25 6.75c0 8.284 6.716 15 15 15m2.25-4.575a19.314 19.314 0 01-8.35-4.277A1 1 0 0112 11.086a19.314 19.314 0 01-8.35 4.277" /></svg>
                <span dir="ltr">+966 XX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                <span>info@wpcdoors.sa</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dark-border pt-6 text-center text-foreground/30 text-sm">
          <p>© {new Date().getFullYear()} بابكم - Premium Doors. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
