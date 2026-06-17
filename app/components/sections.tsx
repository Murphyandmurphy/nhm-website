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
import { ContactForm } from "./interactive/ContactForm";
import { sanityFetch } from "@/sanity/lib/fetch";
import { contactPageQuery } from "@/sanity/lib/queries";
import type { SanityImageValue } from "@/app/types";

type Tone = "cream" | "white" | "paper" | "blue" | "ink";
type CardData = { icon?: IconName; number?: string; title?: string; body?: string; href?: string };

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
  return (
    <Section tone={(b.tone as Tone) || "cream"} className="hero">
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
          <SanityImage
            image={b.image as SanityImageValue}
            alt={b.eyebrow || ""}
            fallback={{ label: "Hero image", icon: "Camera" }}
            style={{ aspectRatio: "4 / 5", minHeight: "380px" }}
          />
        </Reveal>
      </div>
    </Section>
  );
}

function ImageTextBlock({ b }: { b: Block }) {
  const left = (b.imageSide || "left") === "left";
  const image = (
    <Reveal>
      <SanityImage
        image={b.image as SanityImageValue}
        alt=""
        fallback={{ label: "Image", icon: "Image", tone: "cream" }}
        style={{ aspectRatio: "1 / 1", minHeight: "320px" }}
      />
    </Reveal>
  );
  const text = (
    <Reveal delay={0.1}>
      {b.eyebrow ? <Badge variant="eyebrow">{b.eyebrow}</Badge> : null}
      {b.heading ? <h2 className="shead__title" style={{ marginTop: "1rem" }}>{parseInline(b.heading)}</h2> : null}
      <RichText text={b.body} className="prose" style={{ marginTop: "1.25rem" }} />
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
    <Section tone={(b.tone as Tone) || "white"}>
      <div className="grid-2">
        {left ? image : text}
        {left ? text : image}
      </div>
    </Section>
  );
}

function ServiceCardsBlock({ b }: { b: Block }) {
  const cards: CardData[] = b.cards || [];
  return (
    <Section tone={(b.tone as Tone) || "cream"}>
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
    <Section tone={(b.tone as Tone) || "white"}>
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

function TestimonialsBlock({ b }: { b: Block }) {
  const items: TestimonialItem[] = (b.quotes || []).map((q: TestimonialItem) => ({ quote: q.quote, name: q.name, role: q.role }));
  return (
    <Section tone={(b.tone as Tone) || "blue"}>
      <Reveal>
        <Heading eyebrow={b.eyebrow} title={b.title} />
      </Reveal>
      <TestimonialCarousel items={items} />
    </Section>
  );
}

function StatsBlock({ b }: { b: Block }) {
  const stats: { value?: string; label?: string }[] = b.stats || [];
  const dark = b.tone === "blue" || b.tone === "ink";
  return (
    <Section tone={(b.tone as Tone) || "cream"}>
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

function LogoStripBlock({ b }: { b: Block }) {
  return (
    <Section tone={(b.tone as Tone) || "cream"}>
      <Reveal>
        <Heading eyebrow={b.eyebrow} title={b.title} lead={b.lead} />
        <LogoStrip brands={b.brands || []} />
        {b.note ? (
          <p style={{ fontSize: "0.85rem", color: "var(--ink-400)", marginTop: "1.25rem", textAlign: "center" }}>{b.note}</p>
        ) : null}
      </Reveal>
    </Section>
  );
}

function CtaBlock({ b }: { b: Block }) {
  return (
    <Section tone={(b.tone as Tone) || "cream"}>
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
  const body = (
    <Reveal>
      {b.eyebrow ? <Badge variant="eyebrow">{b.eyebrow}</Badge> : null}
      {b.heading ? <h2 className="shead__title" style={{ marginTop: b.eyebrow ? "1rem" : 0, marginBottom: "1.25rem" }}>{parseInline(b.heading)}</h2> : null}
      <RichText text={b.body} className="prose" />
    </Reveal>
  );
  return (
    <Section tone={(b.tone as Tone) || "white"}>
      {b.narrow !== false ? <Container narrow style={{ padding: 0 }}>{body}</Container> : body}
    </Section>
  );
}

function InfoCardsBlock({ b }: { b: Block }) {
  const items: CardData[] = b.items || [];
  return (
    <Section tone={(b.tone as Tone) || "cream"}>
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
  const email = s.email || "hello@nadiahm.co.uk";
  const phone = s.phone || "07712 120 104";
  const linkedin = s.linkedinUrl || "https://www.linkedin.com";
  return (
    <Section tone={(b.tone as Tone) || "cream"}>
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
export function Sections({ sections }: { sections?: Block[] }) {
  if (!sections || !sections.length) return null;
  return (
    <>
      {sections.map((b, i) => {
        const key = b._key || i;
        switch (b._type) {
          case "heroSection": return <HeroBlock key={key} b={b} />;
          case "imageTextSection": return <ImageTextBlock key={key} b={b} />;
          case "serviceCardsSection": return <ServiceCardsBlock key={key} b={b} />;
          case "featureGridSection": return <FeatureGridBlock key={key} b={b} />;
          case "testimonialsSection": return <TestimonialsBlock key={key} b={b} />;
          case "statsSection": return <StatsBlock key={key} b={b} />;
          case "logoStripSection": return <LogoStripBlock key={key} b={b} />;
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
