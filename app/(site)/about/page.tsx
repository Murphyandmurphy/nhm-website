import { Sections } from "@/app/components/sections";
import { sanityFetch } from "@/sanity/lib/fetch";
import { aboutPageQuery } from "@/sanity/lib/queries";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Data = { sections?: any[] } | null;

export default async function AboutPage() {
  const data = await sanityFetch<Data>(aboutPageQuery);
  return <Sections sections={data?.sections} logoStripRecolor={false} />;
}
