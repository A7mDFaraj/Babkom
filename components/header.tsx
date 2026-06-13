"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "الرئيسية" },
    { href: "#products", label: "منتجاتنا" },
    { href: "#features", label: "لماذا نحن" },
    { href: "#testimonials", label: "آراء العملاء" },
    { href: "#contact", label: "تواصل معنا" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "glass-morphism py-3 shadow-lg"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center shadow-lg group-hover:shadow-gold transition-shadow duration-300">
            <span className="text-white font-bold text-lg">بابكم</span>
          </div>
          <div className="hidden sm:block">
            <p className="font-bold text-lg leading-tight text-foreground">
              بابكم
            </p>
            <p className="text-xs text-muted-foreground -mt-1">Premium Doors</p>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 group py-2"
            >
              {l.label}
              <span className="absolute bottom-0 right-0 w-0 h-0.5 gold-gradient group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden md:inline-flex btn-gold-primary text-sm shadow-lg px-6 py-2 rounded-xl font-medium"
          >
            اطلب الآن
          </a>
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-border/50 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="القائمة"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-500",
          mobileOpen ? "max-h-[400px]" : "max-h-0"
        )}
      >
        <nav className="glass-morphism px-6 py-4 space-y-3 mt-3 mr-6 ml-6 rounded-2xl">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block py-2 text-foreground/80 hover:text-foreground font-medium transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="block btn-gold-primary text-center text-sm"
            onClick={() => setMobileOpen(false)}
          >
            اطلب الآن
          </a>
        </nav>
      </div>
    </header>
  );
}
