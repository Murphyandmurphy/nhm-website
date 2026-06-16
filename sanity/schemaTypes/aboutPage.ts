import { defineField, defineType } from "sanity";
import { ICON_OPTIONS } from "../lib/iconOptions";

const EM_HINT = "Wrap words in *asterisks* for blue italic, **double** for bold.";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "intro", title: "Intro" },
    { name: "story", title: "Story" },
    { name: "brands", title: "Brands" },
    { name: "approach", title: "Approach" },
    { name: "cta", title: "CTA" },
  ],
  fields: [
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string", group: "intro" }),
    defineField({ name: "heroTitle", title: "Title", type: "text", rows: 2, description: EM_HINT, group: "intro" }),
    defineField({ name: "heroBody", title: "Intro body", type: "text", rows: 6, description: EM_HINT, group: "intro" }),
    defineField({ name: "heroImage", title: "Portrait", type: "image", options: { hotspot: true }, group: "intro" }),

    defineField({ name: "storyBody", title: "Story (paragraphs separated by a blank line)", type: "text", rows: 12, description: EM_HINT, group: "story" }),

    defineField({ name: "brandsEyebrow", title: "Eyebrow", type: "string", group: "brands" }),
    defineField({ name: "brandsTitle", title: "Title", type: "text", rows: 2, description: EM_HINT, group: "brands" }),
    defineField({ name: "brandsLead", title: "Lead", type: "text", rows: 2, group: "brands" }),
    defineField({ name: "brands", title: "Brand names", type: "array", of: [{ type: "string" }], group: "brands" }),
    defineField({ name: "brandsNote", title: "Note under logos", type: "string", group: "brands" }),

    defineField({ name: "approachEyebrow", title: "Eyebrow", type: "string", group: "approach" }),
    defineField({ name: "approachTitle", title: "Title", type: "text", rows: 2, description: EM_HINT, group: "approach" }),
    defineField({
      name: "approach",
      title: "Principles",
      type: "array",
      group: "approach",
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

    defineField({ name: "ctaTitle", title: "CTA title", type: "string", group: "cta" }),
    defineField({ name: "ctaBody", title: "CTA body", type: "text", rows: 3, group: "cta" }),
    defineField({ name: "ctaLabel", title: "CTA button", type: "string", group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
