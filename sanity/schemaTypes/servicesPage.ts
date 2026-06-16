import { defineField, defineType } from "sanity";

const EM_HINT = "Wrap words in *asterisks* for blue italic.";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heroTitle", title: "Title", type: "text", rows: 2, description: EM_HINT }),
    defineField({ name: "heroLead", title: "Lead", type: "text", rows: 3 }),
    defineField({ name: "ctaTitle", title: "Closing CTA title", type: "string" }),
    defineField({ name: "ctaBody", title: "Closing CTA body", type: "text", rows: 3 }),
    defineField({ name: "ctaLabel", title: "Closing CTA button", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Services Page" }) },
});
