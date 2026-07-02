import { Sections } from "@/app/components/sections";
import { sanityFetch } from "@/sanity/lib/fetch";
import { servicesPageQuery } from "@/sanity/lib/queries";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Data = { sections?: any[] } | null;

export default async function ServicesPage() {
  const data = await sanityFetch<Data>(servicesPageQuery);
  return <Sections sections={data?.sections} />;
}
