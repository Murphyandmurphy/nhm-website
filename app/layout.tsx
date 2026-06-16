import type { Metadata } from "next";
import localFont from "next/font/local";
import { Hanken_Grotesk } from "next/font/google";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

const larken = localFont({
  src: [
    { path: "../public/fonts/larken-light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/larken-light-italic.ttf", weight: "300", style: "italic" },
  ],
  variable: "--font-larken",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nadia Henrique-Murray — Strategic marketing for food & drink",
  description:
    "Senior strategic marketing support for food and drink SMEs with real ambitions to grow.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${hanken.variable} ${larken.variable}`}>
      <body>{children}</body>
    </html>
  );
}
