import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/app/components/ui/Badge";
import { Icon } from "@/app/components/ui/Icon";
import { Section } from "@/app/components/layout/Section";
import { Container } from "@/app/components/layout/Container";
import { Reveal } from "@/app/components/Reveal";
import { SanityImage } from "@/app/components/SanityImage";
import { PostBody } from "@/app/components/PostBody";
import { sanityFetch } from "@/sanity/lib/fetch";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries";
import type { SanityImageValue } from "@/app/types";

type Post = {
  title?: string;
  category?: string;
  date?: string;
  excerpt?: string;
  coverImage?: SanityImageValue;
  body?: unknown;
} | null;

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(postSlugsQuery);
  return (slugs || []).map((s) => ({ slug: s.slug }));
}

function formatDate(d?: string) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return "";
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await sanityFetch<Post>(postBySlugQuery, { slug });
  if (!post) notFound();

  return (
    <Section tone="cream">
      <Container narrow style={{ padding: 0 }}>
        <Reveal>
          <Link href="/insights" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.9rem", fontWeight: 600 }}>
            <Icon name="ArrowLeft" size={16} />
            All insights
          </Link>
          {post.category ? (
            <div style={{ marginTop: "1.5rem" }}>
              <Badge variant="eyebrow">{post.category}</Badge>
            </div>
          ) : null}
          <h1 className="hero__title" style={{ fontSize: "var(--text-h1)", marginTop: "1rem" }}>
            {post.title}
          </h1>
          {post.date ? (
            <p style={{ color: "var(--ink-400)", fontSize: "0.95rem", marginTop: "0.5rem" }}>{formatDate(post.date)}</p>
          ) : null}
        </Reveal>

        {post.coverImage?.asset ? (
          <Reveal delay={0.05}>
            <SanityImage
              image={post.coverImage}
              alt={post.title || ""}
              fallback={{ label: "Cover", icon: "Image" }}
              style={{ aspectRatio: "16 / 9", margin: "2.5rem 0" }}
            />
          </Reveal>
        ) : null}

        <Reveal delay={0.1}>
          <div style={{ marginTop: post.coverImage?.asset ? 0 : "2.5rem" }}>
            <PostBody value={post.body} />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
