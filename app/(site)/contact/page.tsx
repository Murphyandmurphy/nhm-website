import { Sections } from "@/app/components/sections";
import { sanityFetch } from "@/sanity/lib/fetch";
import { contactPageQuery } from "@/sanity/lib/queries";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Data = { sections?: any[] } | null;

export default async function ContactPage() {
  const data = await sanityFetch<Data>(contactPageQuery);
  return <Sections sections={data?.sections} />;
}
