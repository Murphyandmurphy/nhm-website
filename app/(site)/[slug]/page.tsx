import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sections } from "@/app/components/sections";
import { sanityFetch } from "@/sanity/lib/fetch";
import { client } from "@/sanity/lib/client";
import { pageBySlugQuery, pageSlugsQuery } from "@/sanity/lib/queries";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PageDoc = { title?: string; sections?: any[] } | null;

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(pageSlugsQuery);
  return (slugs || []).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await sanityFetch<PageDoc>(pageBySlugQuery, { slug });
  return { title: page?.title ? `${page.title} — Nadia Henrique-Murray` : "Nadia Henrique-Murray" };
}

export default async function BuilderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await sanityFetch<PageDoc>(pageBySlugQuery, { slug });
  if (!page) notFound();
  return <Sections sections={page.sections} />;
}
