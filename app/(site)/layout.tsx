import "../globals.css";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/lib/queries";

export type NavLink = { label: string; href: string };
export type SiteSettings = {
  brandName?: string;
  tagline?: string;
  email?: string;
  phone?: string;
  linkedinUrl?: string;
  navCtaLabel?: string;
  navCtaHref?: string;
  navItems?: NavLink[];
  footerLinks?: NavLink[];
};

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings: SiteSettings = (await sanityFetch<SiteSettings | null>(siteSettingsQuery)) || {};
  return (
    <div className="site">
      <Header settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
