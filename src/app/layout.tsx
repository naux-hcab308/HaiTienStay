import type { Metadata } from "next";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "Yara Homestay – Hải Tiến",
  description: "Góc nhỏ yên lành tại Hải Tiến",
  icons: {
    icon: "/haitien/logo.jpg",
    shortcut: "/haitien/logo.jpg",
    apple: "/haitien/logo.jpg",
  },
};

import SiteHeader from "./(client-components)/(Header)/SiteHeader";
import ClientCommons from "./ClientCommons";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/components/Footer";
import FooterNav from "@/components/FooterNav";
import FloatingNewsButton from "@/components/FloatingNewsButton";
import FloatingContactButton from "@/components/FloatingContactButton";
import FloatingBackButton from "@/components/FloatingBackButton";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="vi" className={poppins.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <ClientCommons />
        <SiteHeader />
        {children}
        <FloatingNewsButton />
        <FloatingContactButton />
        <FloatingBackButton />
        <FooterNav />
        <Footer />
      </body>
    </html>
  );
}
