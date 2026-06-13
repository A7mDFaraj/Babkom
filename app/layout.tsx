import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "أبواب الواح - WPC Premium Doors | أبواب إف بي سي للواح",
  description:
    "اكتشف مجموعتنا الفاخرة من أبواب WPC عالية الجودة المناسبة للسعودية. أبواب أنيقة، مستدامة ومتينة لكل منزل أو عمل.",
  keywords: [
    "أبواب WPC",
    "أبواب فاخرة",
    "أبواب السعودية",
    "WPC doors",
    "luxury doors",
    "Saudi Arabia doors",
  ],
  authors: [{ name: "WPC Premium Doors" }],
  openGraph: {
    title: "أبواب الواح - WPC Premium Doors",
    description: "اكتشف مجموعتنا الفاخرة من أبواب WPC عالية الجودة",
    type: "website",
    locale: "ar_SA",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <head>
        {/* Preconnect to Google Fonts for Arabic support */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-tajawal antialiased overflow-x-hidden">
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-gradient-to-b from-gold-100/20 via-background to-background z-50" />
          }
        >
          <Header />
          <main className="relative">{children}</main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}