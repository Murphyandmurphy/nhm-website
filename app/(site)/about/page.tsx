import { Badge } from "@/app/components/ui/Badge";
import { FeatureItem } from "@/app/components/ui/FeatureItem";
import type { IconName } from "@/app/components/ui/Icon";
import { Section } from "@/app/components/layout/Section";
import { CTABlock } from "@/app/components/layout/CTABlock";
import { LogoStrip } from "@/app/components/layout/LogoStrip";
import { Container } from "@/app/components/layout/Container";
import { Reveal } from "@/app/components/Reveal";
import { RichHeading, RichText, parseInline } from "@/app/components/rich";
import { SanityImage } from "@/app/components/SanityImage";
import { sanityFetch } from "@/sanity/lib/fetch";
import { aboutPageQuery } from "@/sanity/lib/queries";
import type { SanityImageValue } from "@/app/types";

type AboutDoc = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroBody?: string;
  heroImage?: SanityImageValue;
  storyBody?: string;
  brandsEyebrow?: string;
  brandsTitle?: string;
  brandsLead?: string;
  brands?: string[];
  brandsNote?: string;
  approachEyebrow?: string;
  approachTitle?: string;
  approach?: { icon?: IconName; title?: string; body?: string }[];
  ctaTitle?: string;
  ctaBody?: string;
  ctaLabel?: string;
};

export default async function AboutPage() {
  const page: AboutDoc = (await sanityFetch<AboutDoc | null>(aboutPageQuery)) || {};
  const approach = page.approach || [];
  const brands = page.brands || [];

  return (
    <>
      {/* INTRO */}
      <Section tone="cream">
        <div className="grid-2">
          <Reveal>
            {page.heroEyebrow ? <Badge variant="eyebrow">{page.heroEyebrow}</Badge> : null}
            <RichHeading as="h1" text={page.heroTitle} className="hero__title" style={{ fontSize: "var(--text-h1)", marginTop: "1rem" }} />
            <RichText text={page.heroBody} className="prose" style={{ marginTop: "1.25rem" }} />
          </Reveal>
          <Reveal delay={0.1}>
            <SanityImage
              image={page.heroImage}
              alt="Portrait of Nadia"
              fallback={{ label: "Portrait of Nadia", icon: "Camera" }}
              style={{ aspectRatio: "4 / 5", minHeight: "440px" }}
            />
          </Reveal>
        </div>
      </Section>

      {/* STORY */}
      {page.storyBody ? (
        <Section tone="white">
          <Container narrow style={{ padding: 0 }}>
            <Reveal>
              <RichText text={page.storyBody} className="prose" />
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* BRANDS */}
      {brands.length ? (
        <Section tone="cream">
          <Reveal>
            <div className="shead">
              {page.brandsEyebrow ? <Badge variant="eyebrow">{page.brandsEyebrow}</Badge> : null}
              <h2 className="shead__title">{parseInline(page.brandsTitle || "")}</h2>
              {page.brandsLead ? <p className="shead__lead">{page.brandsLead}</p> : null}
            </div>
            <LogoStrip brands={brands} />
            {page.brandsNote ? (
              <p style={{ fontSize: "0.85rem", color: "var(--ink-400)", marginTop: "1.25rem", textAlign: "center" }}>
                {page.brandsNote}
              </p>
            ) : null}
          </Reveal>
        </Section>
      ) : null}

      {/* APPROACH */}
      {approach.length ? (
        <Section tone="white">
          <Reveal>
            <div className="shead">
              {page.approachEyebrow ? <Badge variant="eyebrow">{page.approachEyebrow}</Badge> : null}
              <h2 className="shead__title">{parseInline(page.approachTitle || "")}</h2>
            </div>
          </Reveal>
          <div className="approach-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem 3rem" }}>
            {approach.map((a, idx) => (
              <Reveal key={a.title || idx} delay={(idx % 2) * 0.08}>
                <FeatureItem icon={a.icon || "Sparkles"} title={a.title}>
                  {a.body}
                </FeatureItem>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      {/* CTA */}
      {page.ctaTitle ? (
        <Section tone="cream">
          <Reveal>
            <CTABlock title={page.ctaTitle} body={page.ctaBody} ctaLabel={page.ctaLabel} href="/contact" />
          </Reveal>
        </Section>
      ) : null}
    </>
  );
}
