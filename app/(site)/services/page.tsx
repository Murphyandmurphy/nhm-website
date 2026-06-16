import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { Icon } from "@/app/components/ui/Icon";
import type { IconName } from "@/app/components/ui/Icon";
import { Section } from "@/app/components/layout/Section";
import { CTABlock } from "@/app/components/layout/CTABlock";
import { Reveal } from "@/app/components/Reveal";
import { RichHeading, RichText } from "@/app/components/rich";
import { AnchorNav } from "@/app/components/interactive/AnchorNav";
import { sanityFetch } from "@/sanity/lib/fetch";
import { servicesPageQuery } from "@/sanity/lib/queries";

type Service = {
  id: string;
  icon?: IconName;
  number?: string;
  title?: string;
  need?: string;
  solution?: string;
  items?: string[];
  ctaLabel?: string;
};

type Data = {
  page: {
    heroEyebrow?: string;
    heroTitle?: string;
    heroLead?: string;
    ctaTitle?: string;
    ctaBody?: string;
    ctaLabel?: string;
  } | null;
  services: Service[];
};

type ServicesDoc = NonNullable<Data["page"]>;

function Need({ k, children }: { k: string; children?: string }) {
  if (!children) return null;
  return (
    <div className="needblock">
      <p className="needblock__k">{k}</p>
      <RichText text={children} />
    </div>
  );
}

export default async function ServicesPage() {
  const data = await sanityFetch<Data>(servicesPageQuery);
  const page: ServicesDoc = data?.page || {};
  const services = data?.services || [];

  return (
    <>
      <Section tone="cream" style={{ paddingBottom: "var(--space-7)" }}>
        <Reveal>
          {page.heroEyebrow ? <Badge variant="eyebrow">{page.heroEyebrow}</Badge> : null}
          <RichHeading
            as="h1"
            text={page.heroTitle}
            className="hero__title"
            style={{ fontSize: "var(--text-h1)", marginTop: "1rem", maxWidth: "16ch" }}
          />
          {page.heroLead ? (
            <p className="shead__lead" style={{ maxWidth: "52ch", marginTop: "0.5rem" }}>
              {page.heroLead}
            </p>
          ) : null}
          <AnchorNav
            items={services.map((s) => ({ id: s.id, num: s.number?.replace(/\D/g, "") || "", name: s.title || "" }))}
          />
        </Reveal>
      </Section>

      <Section tone="white" style={{ paddingTop: 0 }}>
        {services.map((s) => (
          <div className="svc" id={"svc-" + s.id} key={s.id}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span className="svc__num">{s.number?.replace(/\D/g, "") || ""}</span>
              </div>
              {s.icon ? (
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "var(--radius-md)",
                    background: "var(--blue-50)",
                    color: "var(--blue-600)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "1rem 0",
                  }}
                >
                  <Icon name={s.icon} size={26} stroke={1.6} />
                </div>
              ) : null}
              <h2 className="svc__name">{s.title}</h2>
              {s.ctaLabel ? (
                <div style={{ marginTop: "1.5rem" }}>
                  <Button variant="primary" iconRight="ArrowRight" href="/contact">
                    {s.ctaLabel}
                  </Button>
                </div>
              ) : null}
            </Reveal>
            <Reveal delay={0.08}>
              <Need k="The need">{s.need}</Need>
              <Need k="The solution">{s.solution}</Need>
              {s.items && s.items.length ? (
                <>
                  <p className="needblock__k">What it looks like</p>
                  <ul className="checklist">
                    {s.items.map((it, i) => (
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
        ))}
      </Section>

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
