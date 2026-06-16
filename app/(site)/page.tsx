import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { ServiceCard } from "@/app/components/ui/ServiceCard";
import { Stat } from "@/app/components/ui/Stat";
import { Section } from "@/app/components/layout/Section";
import { Reveal } from "@/app/components/Reveal";
import { RichHeading, RichText, parseInline } from "@/app/components/rich";
import { SanityImage } from "@/app/components/SanityImage";
import { TestimonialCarousel, type TestimonialItem } from "@/app/components/interactive/TestimonialCarousel";
import type { IconName } from "@/app/components/ui/Icon";
import { sanityFetch } from "@/sanity/lib/fetch";
import { homePageQuery } from "@/sanity/lib/queries";
import type { SanityImageValue } from "@/app/types";

type HomeDoc = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroSub?: string;
  heroSub2?: string;
  heroPrimaryLabel?: string;
  heroPrimaryHref?: string;
  heroSecondaryLabel?: string;
  heroSecondaryHref?: string;
  heroImage?: SanityImageValue;
  introEyebrow?: string;
  introBody?: string;
  introCtaLabel?: string;
  introCtaHref?: string;
  introImage?: SanityImageValue;
  howEyebrow?: string;
  howTitle?: string;
  howLead?: string;
  testimonialsEyebrow?: string;
  testimonialsTitle?: string;
  aboutEyebrow?: string;
  aboutTitle?: string;
  aboutBody?: string;
  stats?: { value?: string; label?: string }[];
  aboutCtaLabel?: string;
  aboutImage?: SanityImageValue;
};

type HomeData = {
  page: HomeDoc | null;
  services: { icon?: IconName; number?: string; title?: string; shortDescription?: string }[];
  testimonials: TestimonialItem[];
};

export default async function HomePage() {
  const data = await sanityFetch<HomeData>(homePageQuery);
  const page: HomeDoc = data?.page || {};
  const services = data?.services || [];
  const testimonials = data?.testimonials || [];

  return (
    <>
      {/* HERO */}
      <Section tone="cream" className="hero">
        <div className="hero__grid">
          <div>
            <Reveal>
              {page.heroEyebrow ? <Badge variant="eyebrow">{page.heroEyebrow}</Badge> : null}
              <RichHeading as="h1" text={page.heroTitle} className="hero__title" style={{ marginTop: "1rem" }} />
              {page.heroSub ? <p className="hero__sub">{page.heroSub}</p> : null}
              {page.heroSub2 ? <p className="hero__sub2">{page.heroSub2}</p> : null}
              <div className="hero__ctas">
                {page.heroPrimaryLabel ? (
                  <Button variant="primary" size="lg" iconRight="ArrowRight" href={page.heroPrimaryHref || "/services"}>
                    {page.heroPrimaryLabel}
                  </Button>
                ) : null}
                {page.heroSecondaryLabel ? (
                  <Button variant="secondary" size="lg" href={page.heroSecondaryHref || "/contact"}>
                    {page.heroSecondaryLabel}
                  </Button>
                ) : null}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <SanityImage
              image={page.heroImage}
              alt="Nadia Henrique-Murray"
              fallback={{ label: "Hero image", sublabel: "Portrait of Nadia, or unbranded food & drink", icon: "Camera" }}
              style={{ aspectRatio: "4 / 5", minHeight: "380px" }}
            />
          </Reveal>
        </div>
      </Section>

      {/* EXPANDED INTRO */}
      <Section tone="white">
        <div className="grid-2">
          <Reveal>
            <SanityImage
              image={page.introImage}
              alt=""
              fallback={{ label: "Marketing-land illustration", sublabel: "Brand illustration", icon: "Map", tone: "cream" }}
              style={{ aspectRatio: "1 / 1", minHeight: "320px" }}
            />
          </Reveal>
          <Reveal delay={0.1}>
            {page.introEyebrow ? <Badge variant="eyebrow">{page.introEyebrow}</Badge> : null}
            <RichText text={page.introBody} className="prose" style={{ marginTop: "1.25rem" }} />
            {page.introCtaLabel ? (
              <div style={{ marginTop: "1.75rem" }}>
                <Button variant="ghost" iconRight="ArrowRight" href={page.introCtaHref || "/services"}>
                  {page.introCtaLabel}
                </Button>
              </div>
            ) : null}
          </Reveal>
        </div>
      </Section>

      {/* HOW I CAN HELP */}
      <Section tone="cream">
        <Reveal>
          <div className="shead">
            {page.howEyebrow ? <Badge variant="eyebrow">{page.howEyebrow}</Badge> : null}
            <h2 className="shead__title">{parseInline(page.howTitle || "")}</h2>
            {page.howLead ? <p className="shead__lead">{page.howLead}</p> : null}
          </div>
        </Reveal>
        <div className="grid-3">
          {services.map((s, idx) => (
            <Reveal key={s.number || idx} delay={idx * 0.08}>
              <ServiceCard icon={s.icon} number={s.number} title={s.title} href="/services">
                {s.shortDescription}
              </ServiceCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section tone="blue">
        <Reveal>
          <div className="shead">
            {page.testimonialsEyebrow ? <Badge variant="eyebrow">{page.testimonialsEyebrow}</Badge> : null}
            <h2 className="shead__title">{parseInline(page.testimonialsTitle || "")}</h2>
          </div>
        </Reveal>
        <TestimonialCarousel items={testimonials} />
      </Section>

      {/* BRIEF ABOUT ME */}
      <Section tone="white">
        <div className="grid-2">
          <Reveal>
            {page.aboutEyebrow ? <Badge variant="eyebrow">{page.aboutEyebrow}</Badge> : null}
            <h2 className="shead__title" style={{ marginTop: "1rem" }}>{parseInline(page.aboutTitle || "")}</h2>
            <RichText text={page.aboutBody} className="prose" style={{ marginTop: "1.25rem" }} />
            {page.stats && page.stats.length ? (
              <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap", margin: "2rem 0" }}>
                {page.stats.map((st, i) => (
                  <Stat key={i} value={st.value} label={st.label} />
                ))}
              </div>
            ) : null}
            {page.aboutCtaLabel ? (
              <Button variant="secondary" iconRight="ArrowRight" href="/about">
                {page.aboutCtaLabel}
              </Button>
            ) : null}
          </Reveal>
          <Reveal delay={0.1}>
            <SanityImage
              image={page.aboutImage}
              alt="Portrait of Nadia"
              fallback={{ label: "Portrait of Nadia", icon: "Camera" }}
              style={{ aspectRatio: "4 / 5", minHeight: "420px" }}
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
