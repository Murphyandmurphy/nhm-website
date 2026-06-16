import { defineField, defineType } from "sanity";
import { ICON_OPTIONS } from "../lib/iconOptions";

const EM_HINT = "Wrap words in *asterisks* for blue italic.";

export const insightsPage = defineType({
  name: "insightsPage",
  title: "Insights Page",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heroTitle", title: "Title", type: "text", rows: 2, description: EM_HINT }),
    defineField({ name: "heroLead", title: "Lead", type: "text", rows: 3 }),
    defineField({
      name: "strands",
      title: "Content strands (intro cards)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icon", type: "string", options: { list: ICON_OPTIONS } },
            { name: "title", title: "Title", type: "string" },
            { name: "body", title: "Body", type: "text", rows: 3 },
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
    defineField({
      name: "ctaTone",
      title: "CTA colour",
      type: "string",
      options: { list: [{ title: "Ink (dark)", value: "ink" }, { title: "Blue", value: "blue" }] },
      initialValue: "ink",
    }),
    defineField({ name: "ctaTitle", title: "CTA title", type: "string" }),
    defineField({ name: "ctaBody", title: "CTA body", type: "text", rows: 3 }),
    defineField({ name: "ctaLabel", title: "CTA button", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Insights Page" }) },
});
