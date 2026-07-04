import Image from "next/image";
import Link from "next/link";
import { Container } from "./layout/Container";

type NavLink = { label: string; href: string };
type Settings = {
  brandName?: string;
  tagline?: string;
  email?: string;
  phone?: string;
  linkedinUrl?: string;
  footerLinks?: NavLink[];
};

const DEFAULT_LINKS: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export function Footer({ settings }: { settings?: Settings }) {
  const s = settings || {};
  const email = s.email || "nadia@helloappetit.co.uk";
  const phone = s.phone || "07712 120 104";
  const linkedin = s.linkedinUrl || "https://www.linkedin.com";
  const tagline = s.tagline || "Senior strategic marketing support for food & drink SMEs with real ambitions to grow.";
  const brand = s.brandName || "Appétit";
  const links = s.footerLinks && s.footerLinks.length ? s.footerLinks : DEFAULT_LINKS;

  return (
    <footer className="footer">
      <Container>
        <div className="footer__grid">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/nhm-logo-white.svg" className="footer__logo" alt="Nadia Henrique-Murray" />
            <p className="footer__tag">{tagline}</p>
            <p className="footer__tag" style={{ marginTop: "1rem", color: "var(--blue-300)" }}>
              {brand}
            </p>
          </div>
          <div>
            <p className="footer__h">Explore</p>
            <ul className="footer__links">
              {links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer__h">Get in touch</p>
            <ul className="footer__links">
              <li>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>
                <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
              </li>
              <li>
                <a href={linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Nadia Henrique-Murray · {brand}</span>
          <span>
            <a href="#" style={{ color: "var(--ink-300)", marginRight: "1.25rem" }}>
              Privacy
            </a>
            <a href="#" style={{ color: "var(--ink-300)" }}>
              Cookies
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}
