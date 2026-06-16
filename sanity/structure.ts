import type { StructureResolver } from "sanity/structure";

/** Singletons shown as single editable items; collections as lists. */
const SINGLETONS: [string, string][] = [
  ["siteSettings", "Site Settings"],
  ["homePage", "Home Page"],
  ["servicesPage", "Services Page"],
  ["aboutPage", "About Page"],
  ["insightsPage", "Insights Page"],
  ["contactPage", "Contact Page"],
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Page builder
      S.documentTypeListItem("page").title("Pages"),
      S.divider(),
      // Fixed pages
      ...SINGLETONS.map(([type, title]) =>
        S.listItem()
          .title(title)
          .id(type)
          .child(S.document().schemaType(type).documentId(type))
      ),
      S.divider(),
      // Collections
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("post").title("Insights Posts"),
    ]);
