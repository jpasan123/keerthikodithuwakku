import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SocialPopup } from "@/components/SocialPopup";
import { ScrollToTop } from "@/components/ScrollToTop";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { site } from "@/lib/site";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [{ url: "/media/hero/business-best-hq.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/media/hero/business-best-hq.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${instrument.variable} antialiased bg-kk-bg text-kk-ink`}
      >
        <GoogleAnalytics />
        <SmoothScroll />
        <SocialPopup />
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        <ChatBot />
      </body>
    </html>
  );
}
