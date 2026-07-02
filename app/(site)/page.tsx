import { Sections } from "@/app/components/sections";
import { sanityFetch } from "@/sanity/lib/fetch";
import { homePageQuery } from "@/sanity/lib/queries";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Data = { sections?: any[] } | null;

export default async function HomePage() {
  const data = await sanityFetch<Data>(homePageQuery);
  return <Sections sections={data?.sections} />;
}
