import { defineField, defineType } from "sanity";
import { ICON_OPTIONS } from "../lib/iconOptions";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Controls the order services appear (1, 2, 3…).",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: ICON_OPTIONS },
    }),
    defineField({
      name: "number",
      title: "Number label",
      type: "string",
      description: 'e.g. "Service 01" — shown on the home card and as the big number.',
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "shortDescription",
      title: "Short description (home card)",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "need", title: "The need", type: "text", rows: 4 }),
    defineField({ name: "solution", title: "The solution", type: "text", rows: 4 }),
    defineField({
      name: "items",
      title: "What it looks like (checklist)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "ctaLabel", title: "Button label", type: "string" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "number" } },
});
