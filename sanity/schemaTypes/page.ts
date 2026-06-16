import { defineArrayMember, defineField, defineType } from "sanity";
import { blockNames } from "./blocks";

/**
 * Page — a builder page. Editors set a title + URL, then stack section
 * blocks in any order. Lives at yoursite.com/<slug>.
 */
export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Page title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      description: 'The web address. e.g. "our-process" → yoursite.com/our-process',
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      description: "Add, drag to reorder, duplicate or delete sections to build the page.",
      type: "array",
      of: blockNames.map((b) => defineArrayMember({ type: b.type })),
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare: ({ title, slug }) => ({ title, subtitle: slug ? "/" + slug : "no URL set" }),
  },
});
