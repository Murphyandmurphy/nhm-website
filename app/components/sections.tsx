import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { ServiceCard } from "./ui/ServiceCard";
import { Stat } from "./ui/Stat";
import { FeatureItem } from "./ui/FeatureItem";
import type { IconName } from "./ui/Icon";
import { Icon } from "./ui/Icon";
import { Section } from "./layout/Section";
import { Container } from "./layout/Container";
import { CTABlock } from "./layout/CTABlock";
import { LogoStrip } from "./layout/LogoStrip";
import { Reveal } from "./Reveal";
import { RichText, RichHeading, parseInline } from "./rich";
import { SanityImage } from "./SanityImage";
import { TestimonialCarousel, type TestimonialItem } from "./interactive/TestimonialCarousel";
import { AnchorNav } from "./interactive/AnchorNav";
import { ContactForm } from "./interactive/ContactForm";
import { sanityFetch } from "@/sanity/lib/fetch";
import { contactPageQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageValue } from "@/app/types";

type Tone = "cream" | "white" | "paper" | "blue" | "ink";
type CardData = { icon?: IconName; number?: string; title?: string; body?: string; href?: string };

const sectionPaddingValues: Record<string, string> = {
  none: "0",
  sm: "var(--space-7)",
  md: "var(--space-9)",
  lg: "var(--space-11)",
  xl: "var(--space-12)",
};

function sectionStyle(b: Block, base?: React.CSSProperties) {
  const style: React.CSSProperties = { ...(base || {}) };
  const top = b.paddingTop as string | undefined;
  const bottom = b.paddingBottom as string | undefined;

  if (top && top !== "default" && sectionPaddingValues[top]) {
    style.paddingTop = sectionPaddingValues[top];
  }
  if (bottom && bottom !== "default" && sectionPaddingValues[bottom]) {
    style.paddingBottom = sectionPaddingValues[bottom];
  }

  return Object.keys(style).length ? style : undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Block = any;

function Heading({ eyebrow, title, lead }: { eyebrow?: string; title?: string; lead?: string }) {
  if (!eyebrow && !title && !lead) return null;
  return (
    <div className="shead">
      {eyebrow ? <Badge variant="eyebrow">{eyebrow}</Badge> : null}
      {title ? <h2 className="shead__title">{parseInline(title)}</h2> : null}
      {lead ? <p className="shead__lead">{lead}</p> : null}
    </div>
  );
}

function HeroBlock({ b }: { b: Block }) {
  const heroSlides: SanityImageValue[] = Array.isArray(b.heroSlides) && b.heroSlides.length
    ? (b.heroSlides.slice(0, 5) as SanityImageValue[])
    : b.image
      ? [b.image as SanityImageValue]
      : [];
  const tickerHeading = b.logoTickerHeading as string | undefined;
  const tickerBrands: { name?: string; logo?: SanityImageValue }[] = b.logoTickerBrands || [];
  const hasTicker = tickerBrands.length > 0;
  const loopBrands = [...tickerBrands, ...tickerBrands];

  return (
    <Section tone={(b.tone as Tone) || "cream"} className="hero" style={sectionStyle(b)}>
      <div className="hero__grid">
        <div>
          <Reveal>
            {b.eyebrow ? <Badge variant="eyebrow">{b.eyebrow}</Badge> : null}
            <RichHeading as="h1" text={b.title} className="hero__title" style={{ marginTop: "1rem" }} />
            {b.sub ? <p className="hero__sub">{b.sub}</p> : null}
            {b.sub2 ? <p className="hero__sub2">{b.sub2}</p> : null}
            <div className="hero__ctas">
              {b.primaryLabel ? (
                <Button variant="primary" size="lg" iconRight="ArrowRight" href={b.primaryHref || "/contact"}>
                  {b.primaryLabel}
                </Button>
              ) : null}
              {b.secondaryLabel ? (
                <Button variant="secondary" size="lg" href={b.secondaryHref || "/about"}>
                  {b.secondaryLabel}
                </Button>
              ) : null}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="hero__slideshow">
            {heroSlides.length ? (
              heroSlides.map((image, index) => (
                <div
                  key={image?.asset?._ref || index}
                  className="hero__slide"
                  style={{ animationDelay: `${index * 5}s` }}
                >
                  <SanityImage
                    image={image}
                    alt={index === 0 ? (b.eyebrow || "") : ""}
                    fallback={{ label: "Hero image", icon: "Camera" }}
                    style={{ aspectRatio: "4 / 5", minHeight: "380px", height: "100%" }}
                  />
                </div>
              ))
            ) : (
              <SanityImage
                image={b.image as SanityImageValue}
                alt={b.eyebrow || ""}
                fallback={{ label: "Hero image", icon: "Camera" }}
                style={{ aspectRatio: "4 / 5", minHeight: "380px" }}
              />
            )}
          </div>
        </Reveal>
      </div>
      {hasTicker ? (
        <Reveal delay={0.08} y={0}>
          <div className="hero__ticker">
            {tickerHeading ? <p className="hero__ticker-heading">{tickerHeading}</p> : null}
            <div className="hero__ticker-viewport">
              <div className="hero__ticker-track" aria-hidden="true">
                {loopBrands.map((brand, i) => (
                  <div className="hero__ticker-item" key={`${brand.name || "brand"}-${i}`}>
                    {brand.logo?.asset?._ref ? (
                      <img
                        src={urlFor(brand.logo as never).height(192).dpr(2).fit("max").auto("format").url()}
                        alt={brand.name || "Client logo"}
                        className="hero__ticker-logo"
                      />
                    ) : (
                      <span className="hero__ticker-name">{brand.name || "Brand"}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      ) : null}
    </Section>
  );
}

function ImageTextBlock({ b }: { b: Block }) {
  const left = (b.imageSide || "left") === "left";
  const aspect = b.imageAspect === "portrait" ? "4 / 5" : b.imageAspect === "landscape" ? "3 / 2" : "1 / 1";
  const stats: { value?: string; label?: string }[] = b.stats || [];
  const dark = b.tone === "blue" || b.tone === "ink";
  const image = (
    <Reveal>
      <SanityImage
        image={b.image as SanityImageValue}
        alt=""
        fallback={{ label: "Image", icon: "Image", tone: "cream" }}
        style={{ aspectRatio: aspect, minHeight: "320px" }}
      />
    </Reveal>
  );
  const text = (
    <Reveal delay={0.1}>
      {b.eyebrow ? <Badge variant="eyebrow">{b.eyebrow}</Badge> : null}
      {b.heading ? <h2 className="shead__title" style={{ marginTop: "1rem" }}>{parseInline(b.heading)}</h2> : null}
      <RichText text={b.body} className="prose" style={{ marginTop: "1.25rem" }} />
      {stats.length ? (
        <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap", margin: "2rem 0" }}>
          {stats.map((st, i) => (
            <Stat key={i} value={st.value} label={st.label} tone={dark ? "onblue" : "default"} />
          ))}
        </div>
      ) : null}
      {b.ctaLabel ? (
        <div style={{ marginTop: "1.75rem" }}>
          <Button variant="ghost" iconRight="ArrowRight" href={b.ctaHref || "/contact"}>
            {b.ctaLabel}
          </Button>
        </div>
      ) : null}
    </Reveal>
  );
  return (
    <Section tone={(b.tone as Tone) || "white"} style={sectionStyle(b)}>
      <div className="grid-2">
        {left ? image : text}
        {left ? text : image}
      </div>
    </Section>
  );
}

function ServicesHeroBlock({ b, navItems }: { b: Block; navItems: { id: string; num: string; name: string }[] }) {
  return (
    <Section tone={(b.tone as Tone) || "cream"} style={sectionStyle(b, { paddingBottom: "var(--space-7)" })}>
      <Reveal>
        {b.eyebrow ? <Badge variant="eyebrow">{b.eyebrow}</Badge> : null}
        <RichHeading as="h1" text={b.title} className="hero__title" style={{ fontSize: "var(--text-h1)", marginTop: "1rem", maxWidth: "16ch" }} />
        {b.lead ? <p className="shead__lead" style={{ maxWidth: "52ch", marginTop: "0.5rem" }}>{b.lead}</p> : null}
        {b.showJumpNav !== false && navItems.length ? <AnchorNav items={navItems} /> : null}
      </Reveal>
    </Section>
  );
}

function ServiceDetailBlock({ b, anchorId, first, flushBottom }: { b: Block; anchorId: string; first?: boolean; flushBottom?: boolean }) {
  const baseStyle: React.CSSProperties = {};
  if (first) baseStyle.paddingTop = 0;
  if (flushBottom) baseStyle.paddingBottom = 0;
  return (
    <Section tone={(b.tone as Tone) || "white"} style={sectionStyle(b, Object.keys(baseStyle).length ? baseStyle : undefined)}>
      <div className="svc" id={"svc-" + anchorId}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span className="svc__num">{b.number?.replace(/\D/g, "") || ""}</span>
          </div>
          {b.icon ? (
            <div style={{ width: 52, height: 52, borderRadius: "var(--radius-md)", background: "var(--blue-50)", color: "var(--blue-600)", display: "flex", alignItems: "center", justifyContent: "center", margin: "1rem 0" }}>
              <Icon name={b.icon as IconName} size={26} stroke={1.6} />
            </div>
          ) : null}
          <h2 className="svc__name">{b.title}</h2>
          {b.ctaLabel ? (
            <div style={{ marginTop: "1.5rem" }}>
              <Button variant="primary" iconRight="ArrowRight" href={b.ctaHref || "/contact"}>{b.ctaLabel}</Button>
            </div>
          ) : null}
        </Reveal>
        <Reveal delay={0.08}>
          {b.need ? (
            <div className="needblock">
              <p className="needblock__k">The need</p>
              <RichText text={b.need} />
            </div>
          ) : null}
          {b.solution ? (
            <div className="needblock">
              <p className="needblock__k">The solution</p>
              <RichText text={b.solution} />
            </div>
          ) : null}
          {b.items && b.items.length ? (
            <>
              <p className="needblock__k">What it looks like</p>
              <ul className="checklist">
                {b.items.map((it: string, i: number) => (
                  <li key={i}>
                    <Icon name="Check" size={20} stroke={2} />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </Reveal>
      </div>
    </Section>
  );
}

function ServiceCardsBlock({ b, flushBottom }: { b: Block; flushBottom?: boolean }) {
  const cards: CardData[] = b.cards || [];
  const hasHeading = Boolean(b.eyebrow || b.title || b.lead);
  if (!cards.length && !hasHeading) return null;
  return (
    <Section tone={(b.tone as Tone) || "cream"} style={sectionStyle(b, flushBottom ? { paddingBottom: 0 } : undefined)}>
      <Reveal>
        <Heading eyebrow={b.eyebrow} title={b.title} lead={b.lead} />
      </Reveal>
      <div className="grid-3">
        {cards.map((c, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <ServiceCard icon={c.icon} number={c.number} title={c.title} href={c.href || "/contact"}>
              {c.body}
            </ServiceCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function FeatureGridBlock({ b }: { b: Block }) {
  const items: CardData[] = b.items || [];
  const cols = b.columns === 3 ? 3 : 2;
  return (
    <Section tone={(b.tone as Tone) || "white"} style={sectionStyle(b)}>
      <Reveal>
        <Heading eyebrow={b.eyebrow} title={b.title} />
      </Reveal>
      <div className="approach-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "2.5rem 3rem" }}>
        {items.map((it, i) => (
          <Reveal key={i} delay={(i % cols) * 0.08}>
            <FeatureItem icon={it.icon || "Sparkles"} title={it.title}>
              {it.body}
            </FeatureItem>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function TestimonialsBlock({ b, flushTop }: { b: Block; flushTop?: boolean }) {
  const items: TestimonialItem[] = (b.quotes || []).map((q: TestimonialItem) => ({ quote: q.quote, name: q.name, role: q.role }));
  const hasHeader = Boolean(b.eyebrow || b.title);
  if (!items.length && !hasHeader) return null;
  const dark = b.tone === "blue" || b.tone === "ink";
  return (
    <Section tone={(b.tone as Tone) || "blue"} style={sectionStyle(b, flushTop ? { paddingTop: 0 } : undefined)}>
      {hasHeader ? (
        <Reveal>
          <div className="shead">
            {b.eyebrow ? (
              <span className="nhm-badge nhm-badge--eyebrow" style={{ color: "var(--cream-100)" }}>
                {b.eyebrow}
              </span>
            ) : null}
            {b.title ? <h2 className="shead__title">{parseInline(b.title)}</h2> : null}
          </div>
        </Reveal>
      ) : null}
      <TestimonialCarousel items={items} tone={dark ? "onblue" : "default"} />
    </Section>
  );
}

function StatsBlock({ b }: { b: Block }) {
  const stats: { value?: string; label?: string }[] = b.stats || [];
  const dark = b.tone === "blue" || b.tone === "ink";
  return (
    <Section tone={(b.tone as Tone) || "cream"} style={sectionStyle(b)}>
      <Reveal>
        <Heading title={b.title} eyebrow={b.eyebrow} />
        <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          {stats.map((s, i) => (
            <Stat key={i} value={s.value} label={s.label} tone={dark ? "onblue" : "default"} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function LogoStripBlock({ b, logoRecolor = true }: { b: Block; logoRecolor?: boolean }) {
  const hasHeading = Boolean(b.eyebrow || b.title || b.lead);
  return (
    <Section tone={(b.tone as Tone) || "cream"} style={sectionStyle(b)}>
      <Reveal y={0}>
        <Heading eyebrow={b.eyebrow} title={b.title} lead={b.lead} />
        <div style={hasHeading ? undefined : { marginTop: "clamp(1rem, 2vw, 1.5rem)" }}>
          <LogoStrip brands={b.brands || []} recolor={logoRecolor} />
        </div>
        {b.note ? (
          <p style={{ fontSize: "0.85rem", color: "var(--ink-400)", marginTop: "1.25rem", textAlign: "center" }}>{b.note}</p>
        ) : null}
      </Reveal>
    </Section>
  );
}

function CtaBlock({ b }: { b: Block }) {
  return (
    <Section tone={(b.tone as Tone) || "cream"} style={sectionStyle(b)}>
      <Reveal>
        <CTABlock
          tone={b.ctaColour === "ink" ? "ink" : "blue"}
          title={b.title}
          body={b.body}
          ctaLabel={b.buttonLabel || "Get in touch"}
          href={b.buttonHref || "/contact"}
        />
      </Reveal>
    </Section>
  );
}

function TextBlock({ b }: { b: Block }) {
  const hasBody = Array.isArray(b.body) ? b.body.length > 0 : Boolean(b.body);
  if (!b.eyebrow && !b.heading && !hasBody) return null;
  const body = (
    <Reveal>
      {b.eyebrow ? <Badge variant="eyebrow">{b.eyebrow}</Badge> : null}
      {b.heading ? <h2 className="shead__title" style={{ marginTop: b.eyebrow ? "1rem" : 0, marginBottom: "1.25rem" }}>{parseInline(b.heading)}</h2> : null}
      <RichText text={b.body} className="prose" />
    </Reveal>
  );
  return (
    <Section tone={(b.tone as Tone) || "white"} style={sectionStyle(b)}>
      {b.narrow !== false ? <Container narrow style={{ padding: 0 }}>{body}</Container> : body}
    </Section>
  );
}

function InfoCardsBlock({ b }: { b: Block }) {
  const items: CardData[] = b.items || [];
  return (
    <Section tone={(b.tone as Tone) || "cream"} style={sectionStyle(b)}>
      <Reveal>
        <Heading eyebrow={b.eyebrow} title={b.title} lead={b.lead} />
      </Reveal>
      <div className="grid-3" style={{ marginTop: "1rem" }}>
        {items.map((it, i) => (
          <Reveal key={i} delay={(i % 3) * 0.08}>
            <div className="insightcard">
              <div className="insightcard__icon">
                <Icon name={it.icon || "Lightbulb"} size={26} stroke={1.6} />
              </div>
              <h3 className="insightcard__title">{it.title}</h3>
              <p className="insightcard__body">{it.body}</p>
              {b.showComingSoon ? (
                <span className="insightcard__soon">
                  <Icon name="Clock" size={15} />
                  Coming soon
                </span>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

async function ContactBlock({ b }: { b: Block }) {
  const data = await sanityFetch<{ settings: { email?: string; phone?: string; linkedinUrl?: string } | null }>(contactPageQuery);
  const s = data?.settings || {};
  const email = s.email || "nadia@helloappetit.co.uk";
  const phone = s.phone || "07712 120 104";
  const linkedin = s.linkedinUrl || "https://www.linkedin.com";
  return (
    <Section tone={(b.tone as Tone) || "cream"} style={sectionStyle(b)}>
      <div className="contact__grid">
        <Reveal>
          {b.eyebrow ? <Badge variant="eyebrow">{b.eyebrow}</Badge> : null}
          <RichHeading as="h1" text={b.title} className="hero__title" style={{ fontSize: "var(--text-h1)", marginTop: "1rem" }} />
          {b.lead ? <p className="shead__lead" style={{ marginTop: "0.5rem", maxWidth: "42ch" }}>{b.lead}</p> : null}
          <div style={{ marginTop: "2rem" }}>
            <div className="contactline">
              <Icon name="Mail" size={21} />
              <a href={`mailto:${email}`}>{email}</a>
            </div>
            <div className="contactline">
              <Icon name="Phone" size={21} />
              <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
            </div>
            <div className="contactline" style={{ borderBottom: "none" }}>
              <Icon name="Linkedin" size={21} />
              <a href={linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn</a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm successTitle={b.successTitle} successBody={b.successBody} />
        </Reveal>
      </div>
    </Section>
  );
}

/** Sections — renders a stack of builder blocks in order. */
export function Sections({ sections, logoStripRecolor = true }: { sections?: Block[]; logoStripRecolor?: boolean }) {
  if (!sections || !sections.length) return null;
  // Build the "jump to" nav from any Service Detail blocks on the page.
  const details = sections.filter((b) => b._type === "serviceDetailSection");
  const navItems = details.map((b, i) => ({
    id: b._key || String(i),
    num: b.number?.replace(/\D/g, "") || "",
    name: b.title || "",
  }));
  const firstDetailKey: string | null = details.length ? (details[0]._key || "0") : null;
  return (
    <>
      {sections.map((b, i) => {
        const key = b._key || i;
        const prevType = i > 0 ? sections[i - 1]?._type : undefined;
        const nextType = i < sections.length - 1 ? sections[i + 1]?._type : undefined;
        switch (b._type) {
          case "heroSection": return <HeroBlock key={key} b={b} />;
          case "servicesHeroSection": return <ServicesHeroBlock key={key} b={b} navItems={navItems} />;
          case "serviceDetailSection": {
            const anchorId = b._key || String(i);
            const isFirst = anchorId === firstDetailKey;
            return <ServiceDetailBlock key={key} b={b} anchorId={anchorId} first={isFirst} flushBottom={nextType === "testimonialsSection"} />;
          }
          case "imageTextSection": return <ImageTextBlock key={key} b={b} />;
          case "serviceCardsSection": return <ServiceCardsBlock key={key} b={b} flushBottom={nextType === "testimonialsSection"} />;
          case "featureGridSection": return <FeatureGridBlock key={key} b={b} />;
          case "testimonialsSection": return <TestimonialsBlock key={key} b={b} flushTop={prevType === "serviceCardsSection" || prevType === "serviceDetailSection"} />;
          case "statsSection": return <StatsBlock key={key} b={b} />;
          case "logoStripSection": return <LogoStripBlock key={key} b={b} logoRecolor={logoStripRecolor} />;
          case "ctaSection": return <CtaBlock key={key} b={b} />;
          case "textSection": return <TextBlock key={key} b={b} />;
          case "infoCardsSection": return <InfoCardsBlock key={key} b={b} />;
          case "contactSection": return <ContactBlock key={key} b={b} />;
          default: return null;
        }
      })}
    </>
  );
}
