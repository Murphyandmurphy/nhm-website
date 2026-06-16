"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./ui/Icon";
import { Button } from "./ui/Button";
import { Container } from "./layout/Container";

type NavLink = { label: string; href: string };
type Settings = {
  navItems?: NavLink[];
  navCtaLabel?: string;
  navCtaHref?: string;
};

const DEFAULT_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export function Header({ settings }: { settings?: Settings }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navItems = settings?.navItems && settings.navItems.length ? settings.navItems : DEFAULT_NAV;
  const ctaLabel = settings?.navCtaLabel || "Let's talk";
  const ctaHref = settings?.navCtaHref || "/contact";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`.trim()}>
      <Container>
        <div className="nav__inner">
          <Link href="/" aria-label="Home" style={{ display: "flex" }}>
            <Image src="/logo/nhm-logo-blue.png" className="nav__logo" alt="Nadia Henrique-Murray" width={53} height={38} priority />
          </Link>
          <nav className="nav__right">
            <ul className="nav__links">
              {navItems.map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className={`nav__link ${isActive(item.href) ? "nav__link--active" : ""}`.trim()}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {ctaLabel ? (
              <span className="nav__cta">
                <Button variant="primary" size="sm" iconRight="ArrowRight" href={ctaHref}>
                  {ctaLabel}
                </Button>
              </span>
            ) : null}
            <button className="nav__burger" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              <Icon name={open ? "X" : "Menu"} size={26} />
            </button>
          </nav>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
            style={{ overflow: "hidden", borderTop: "1px solid var(--line-200)", background: "var(--cream-100)" }}
          >
            <Container style={{ paddingBlock: "1rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {navItems.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className={`nav__link ${isActive(item.href) ? "nav__link--active" : ""}`.trim()}
                  style={{ textAlign: "left", padding: "0.75rem 0", fontSize: "1.05rem" }}
                >
                  {item.label}
                </Link>
              ))}
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
