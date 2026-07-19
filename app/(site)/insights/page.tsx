import Link from "next/link";
import { Badge } from "@/app/components/ui/Badge";
import { Icon } from "@/app/components/ui/Icon";
import type { IconName } from "@/app/components/ui/Icon";
import { Section } from "@/app/components/layout/Section";
import { CTABlock } from "@/app/components/layout/CTABlock";
import { NewsletterSignup } from "@/app/components/interactive/NewsletterSignup";
import { Reveal } from "@/app/components/Reveal";
import { RichHeading } from "@/app/components/rich";
import { SanityImage } from "@/app/components/SanityImage";
import { sanityFetch } from "@/sanity/lib/fetch";
import { insightsPageQuery } from "@/sanity/lib/queries";
import type { SanityImageValue } from "@/app/types";

type Post = {
  title?: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  date?: string;
  coverImage?: SanityImageValue;
};

type InsightsDoc = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroLead?: string;
  strands?: {
    mediaType?: "icon" | "image" | "none";
    icon?: IconName;
    image?: SanityImageValue;
    title?: string;
    body?: string;
  }[];
  ctaTone?: "ink" | "blue";
  ctaTitle?: string;
  ctaBody?: string;
  ctaLabel?: string;
};

type Data = {
  page: InsightsDoc | null;
  posts: Post[];
};

const FILTER_OPTIONS = [
  { value: "all", label: "All posts", categories: [] as string[] },
  { value: "strategy-advice", label: "Strategy advice", categories: ["strategy advice"] },
  { value: "work-in-practice", label: "Work in practice", categories: ["work in practice"] },
  {
    value: "food-and-drink",
    label: "What's happening in food & drink",
    categories: ["what's happening in food & drink", "whats happening in food & drink"],
  },
] as const;

function normalize(value?: string) {
  return (value || "").trim().toLowerCase();
}

function mapCategoryToFilterValue(category?: string) {
  const normalizedCategory = normalize(category);
  const match = FILTER_OPTIONS.find((opt) => opt.value !== "all" && opt.categories.some((candidate) => normalize(candidate) === normalizedCategory));
  return match?.value || null;
}

function formatDate(d?: string) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return "";
  }
}

export default async function InsightsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const params = searchParams ? await searchParams : undefined;
  const data = await sanityFetch<Data>(insightsPageQuery);
  const page: InsightsDoc = data?.page || {};
  const posts = data?.posts || [];
  const strands = page.strands || [];
  const registerLine = "Register here. I will only email sporadically when there is something new to read on this page.";
  const shouldShowNewsletter = (page.ctaBody || "").trim() === registerLine;
  const requestedFilter = normalize(params?.category) || "all";
  const activeFilter = FILTER_OPTIONS.some((opt) => opt.value === requestedFilter) ? requestedFilter : "all";
  const visiblePosts =
    activeFilter === "all"
      ? posts
      : posts.filter((post) => mapCategoryToFilterValue(post.category) === activeFilter);

  return (
    <>
      <Section tone="cream">
        <Reveal>
          {page.heroEyebrow ? <Badge variant="eyebrow">{page.heroEyebrow}</Badge> : null}
          <RichHeading as="h1" text={page.heroTitle} className="hero__title" style={{ fontSize: "var(--text-h1)", marginTop: "1rem", maxWidth: "18ch" }} />
          {page.heroLead ? (
            <p className="shead__lead" style={{ maxWidth: "54ch", marginTop: "0.5rem" }}>
              {page.heroLead}
            </p>
          ) : null}
        </Reveal>

        {/* Content strands (intro cards) */}
        {strands.length ? (
          <div className="grid-3" style={{ marginTop: "3rem" }}>
            {strands.map((s, idx) => (
              <Reveal key={s.title || idx} delay={idx * 0.08}>
                <div className="insightcard insightcard--plain">
                  {s.mediaType === "image" ? (
                    <SanityImage
                      image={s.image}
                      alt={s.title || ""}
                      fallback={{ label: s.title || "Insight", icon: s.icon || "Image", tone: "cream" }}
                      style={{ aspectRatio: "1 / 1", width: "clamp(132px, 16vw, 156px)", borderRadius: "var(--radius-md)" }}
                      imageStyle={{ mixBlendMode: "multiply", filter: "grayscale(1)", backgroundColor: "transparent" }}
                    />
                  ) : s.mediaType === "none" ? null : (
                    <div className="insightcard__icon insightcard__icon--cream">
                      <Icon name={s.icon || "Lightbulb"} size={26} stroke={1.6} />
                    </div>
                  )}
                  <h3 className="insightcard__title">{s.title}</h3>
                  <p className="insightcard__body">{s.body}</p>
                  {!posts.length ? (
                    <span className="insightcard__soon">
                      <Icon name="Clock" size={15} />
                      Coming soon
                    </span>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        ) : null}

        {/* Published posts */}
        {posts.length ? (
          <>
            <div className="insights-filter" style={{ marginTop: "3rem" }}>
              {FILTER_OPTIONS.map((opt) => {
                const href = opt.value === "all" ? "/insights" : `/insights?category=${opt.value}`;
                const active = activeFilter === opt.value;
                return (
                  <Link key={opt.value} href={href} scroll={false} className={`insights-filter__chip ${active ? "is-active" : ""}`.trim()}>
                    {opt.label}
                  </Link>
                );
              })}
            </div>
            {visiblePosts.length ? (
              <div className="grid-3" style={{ marginTop: "1.5rem" }}>
                {visiblePosts.map((p, idx) => (
                  <Reveal key={p.slug || idx} delay={(idx % 3) * 0.08}>
                    <Link href={`/insights/${p.slug}`} className="insightcard" style={{ textDecoration: "none" }}>
                      <SanityImage
                        image={p.coverImage}
                        alt={p.title || ""}
                        fallback={{ label: p.category || "Insight", icon: "Newspaper", tone: "cream" }}
                        style={{ aspectRatio: "16 / 10", borderRadius: "var(--radius-md)" }}
                      />
                      {p.category ? (
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue-600)" }}>
                          {p.category}
                        </span>
                      ) : null}
                      <h3 className="insightcard__title">{p.title}</h3>
                      {p.excerpt ? <p className="insightcard__body">{p.excerpt}</p> : null}
                      <span className="insightcard__soon" style={{ color: "var(--ink-400)" }}>
                        {formatDate(p.date)}
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            ) : (
              <p style={{ marginTop: "1.5rem", color: "var(--ink-500)" }}>No posts in this category yet.</p>
            )}
          </>
        ) : null}
      </Section>

      {page.ctaTitle ? (
        <Section tone="white">
          <Reveal>
            <CTABlock
              tone={page.ctaTone || "ink"}
              title={page.ctaTitle}
              body={shouldShowNewsletter ? undefined : page.ctaBody}
              ctaLabel={page.ctaLabel}
              href="/contact"
              hideButton={shouldShowNewsletter}
            >
              {shouldShowNewsletter ? <NewsletterSignup mode="cta" /> : null}
            </CTABlock>
          </Reveal>
        </Section>
      ) : null}
    </>
  );
}
