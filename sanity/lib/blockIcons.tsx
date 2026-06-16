import React from "react";

/**
 * Wireframe icons for the page-builder section blocks. Each is a tiny
 * schematic of the layout, shown next to the section name in the "Add item"
 * menu and on each block in the stacked list. Pure inline SVG — no assets,
 * nothing to keep in sync. Uses currentColor so it adapts to the Studio theme.
 */

const F: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round">
    <rect x="1.5" y="3.5" width="21" height="17" rx="2" opacity={0.35} />
    {children}
  </svg>
);

const HeroIcon = () => (
  <F>
    <line x1="5" y1="9" x2="12" y2="9" />
    <line x1="5" y1="12" x2="11" y2="12" />
    <line x1="5" y1="15" x2="9" y2="15" />
    <rect x="15" y="8" width="5" height="8" rx="1" fill="currentColor" opacity={0.5} stroke="none" />
  </F>
);

const ImageTextIcon = () => (
  <F>
    <rect x="4" y="8" width="6" height="8" rx="1" fill="currentColor" opacity={0.5} stroke="none" />
    <line x1="13" y1="9" x2="20" y2="9" />
    <line x1="13" y1="12" x2="20" y2="12" />
    <line x1="13" y1="15" x2="17" y2="15" />
  </F>
);

const ServiceCardsIcon = () => (
  <F>
    <rect x="4" y="8" width="4.5" height="8" rx="1" />
    <rect x="9.75" y="8" width="4.5" height="8" rx="1" />
    <rect x="15.5" y="8" width="4.5" height="8" rx="1" />
  </F>
);

const FeatureGridIcon = () => (
  <F>
    <circle cx="6.5" cy="9.5" r="1.3" fill="currentColor" stroke="none" />
    <line x1="9" y1="9.5" x2="19" y2="9.5" />
    <circle cx="6.5" cy="14.5" r="1.3" fill="currentColor" stroke="none" />
    <line x1="9" y1="14.5" x2="19" y2="14.5" />
  </F>
);

const TestimonialsIcon = () => (
  <F>
    <path d="M7 9.5c-1.4 0-2.2 1-2.2 2.2 0 1 .7 1.8 1.7 1.8.3 1-.4 1.7-1.2 2" />
    <line x1="11.5" y1="10" x2="19" y2="10" />
    <line x1="11.5" y1="13" x2="17" y2="13" />
  </F>
);

const StatsIcon = () => (
  <F>
    <rect x="4.5" y="9" width="3.5" height="6" rx="0.6" fill="currentColor" opacity={0.5} stroke="none" />
    <rect x="10.25" y="9" width="3.5" height="6" rx="0.6" fill="currentColor" opacity={0.5} stroke="none" />
    <rect x="16" y="9" width="3.5" height="6" rx="0.6" fill="currentColor" opacity={0.5} stroke="none" />
  </F>
);

const LogoStripIcon = () => (
  <F>
    <rect x="4.5" y="10" width="4" height="4" rx="0.8" />
    <rect x="10" y="10" width="4" height="4" rx="0.8" />
    <rect x="15.5" y="10" width="4" height="4" rx="0.8" />
  </F>
);

const CtaIcon = () => (
  <F>
    <rect x="4.5" y="8" width="15" height="8" rx="1.5" fill="currentColor" opacity={0.18} stroke="none" />
    <rect x="9.5" y="11.5" width="5" height="2.2" rx="1.1" fill="currentColor" stroke="none" />
  </F>
);

const TextBlockIcon = () => (
  <F>
    <line x1="5" y1="9" x2="19" y2="9" />
    <line x1="5" y1="12" x2="19" y2="12" />
    <line x1="5" y1="15" x2="14" y2="15" />
  </F>
);

const InfoCardsIcon = () => (
  <F>
    <circle cx="6.5" cy="10" r="1.5" />
    <circle cx="12" cy="10" r="1.5" />
    <circle cx="17.5" cy="10" r="1.5" />
    <line x1="5" y1="14" x2="8" y2="14" />
    <line x1="10.5" y1="14" x2="13.5" y2="14" />
    <line x1="16" y1="14" x2="19" y2="14" />
  </F>
);

const ContactIcon = () => (
  <F>
    <line x1="4.5" y1="9" x2="9" y2="9" />
    <line x1="4.5" y1="12" x2="8" y2="12" />
    <rect x="12" y="8" width="8" height="8" rx="1" />
    <line x1="13.5" y1="11" x2="18.5" y2="11" />
    <line x1="13.5" y1="13.5" x2="16.5" y2="13.5" />
  </F>
);

/** Map of block type name → wireframe icon component. */
export const BLOCK_ICONS: Record<string, React.FC> = {
  heroSection: HeroIcon,
  imageTextSection: ImageTextIcon,
  serviceCardsSection: ServiceCardsIcon,
  featureGridSection: FeatureGridIcon,
  testimonialsSection: TestimonialsIcon,
  statsSection: StatsIcon,
  logoStripSection: LogoStripIcon,
  ctaSection: CtaIcon,
  textSection: TextBlockIcon,
  infoCardsSection: InfoCardsIcon,
  contactSection: ContactIcon,
};
