import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Insights Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Free resources", value: "Free resources" },
          { title: "Client news", value: "Client news" },
          { title: "Food & drink sector", value: "Food & drink sector" },
        ],
      },
    }),
    defineField({ name: "date", title: "Date", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({ name: "coverImage", title: "Cover image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2 - Heading Large", value: "h2" },
            { title: "H3 - Heading Medium", value: "h3" },
            { title: "H4 - Heading Small", value: "h4" },
            { title: "H5 - Heading Tiny", value: "h5" },
            { title: "Quote", value: "blockquote" },
          ],
        },
        { type: "image", options: { hotspot: true } },
      ],
    }),
  ],
  orderings: [{ title: "Newest", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "category", media: "coverImage" } },
});
