import { Badge } from "@/app/components/ui/Badge";
import { Icon } from "@/app/components/ui/Icon";
import { Section } from "@/app/components/layout/Section";
import { Reveal } from "@/app/components/Reveal";
import { RichHeading } from "@/app/components/rich";
import { ContactForm } from "@/app/components/interactive/ContactForm";
import { sanityFetch } from "@/sanity/lib/fetch";
import { contactPageQuery } from "@/sanity/lib/queries";

type ContactDoc = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroLead?: string;
  successTitle?: string;
  successBody?: string;
};

type Data = {
  page: ContactDoc | null;
  settings: ContactSettings | null;
};

type ContactSettings = { email?: string; phone?: string; linkedinUrl?: string };

export default async function ContactPage() {
  const data = await sanityFetch<Data>(contactPageQuery);
  const page: ContactDoc = data?.page || {};
  const s: ContactSettings = data?.settings || {};
  const email = s.email || "nadia@helloappetit.co.uk";
  const phone = s.phone || "07712 120 104";
  const linkedin = s.linkedinUrl || "https://www.linkedin.com";

  return (
    <Section tone="cream">
      <div className="contact__grid">
        <Reveal>
          {page.heroEyebrow ? <Badge variant="eyebrow">{page.heroEyebrow}</Badge> : null}
          <RichHeading as="h1" text={page.heroTitle} className="hero__title" style={{ fontSize: "var(--text-h1)", marginTop: "1rem" }} />
          {page.heroLead ? (
            <p className="shead__lead" style={{ marginTop: "0.5rem", maxWidth: "42ch" }}>
              {page.heroLead}
            </p>
          ) : null}
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
              <a href={linkedin} target="_blank" rel="noreferrer">
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm successTitle={page.successTitle} successBody={page.successBody} />
        </Reveal>
      </div>
    </Section>
  );
}
