import type { Metadata } from "next";
import localFont from "next/font/local";
import { Hanken_Grotesk } from "next/font/google";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

const sentient = localFont({
  src: [
    { path: "../public/fonts/Sentient-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/Sentient-LightItalic.woff2", weight: "300", style: "italic" },
  ],
  variable: "--font-sentient",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nadia Henrique-Murray — Strategic marketing for food & drink",
  description:
    "Senior strategic marketing support for food and drink SMEs with real ambitions to grow.",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${hanken.variable} ${sentient.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
