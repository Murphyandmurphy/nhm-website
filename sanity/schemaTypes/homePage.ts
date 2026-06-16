import { defineField, defineType } from "sanity";

const EM_HINT = "Wrap words in *asterisks* for blue italic, **double** for bold.";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "intro", title: "Intro" },
    { name: "how", title: "How I can help" },
    { name: "testimonials", title: "Testimonials" },
    { name: "about", title: "About teaser" },
  ],
  fields: [
    // HERO
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroTitle", title: "Title", type: "text", rows: 2, description: EM_HINT, group: "hero" }),
    defineField({ name: "heroSub", title: "Sub-paragraph 1", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroSub2", title: "Sub-paragraph 2", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroPrimaryLabel", title: "Primary button label", type: "string", group: "hero" }),
    defineField({ name: "heroPrimaryHref", title: "Primary button link", type: "string", initialValue: "/services", group: "hero" }),
    defineField({ name: "heroSecondaryLabel", title: "Secondary button label", type: "string", group: "hero" }),
    defineField({ name: "heroSecondaryHref", title: "Secondary button link", type: "string", initialValue: "/contact", group: "hero" }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true }, group: "hero" }),

    // INTRO
    defineField({ name: "introEyebrow", title: "Eyebrow", type: "string", group: "intro" }),
    defineField({ name: "introBody", title: "Body (paragraphs separated by a blank line)", type: "text", rows: 8, description: EM_HINT, group: "intro" }),
    defineField({ name: "introCtaLabel", title: "Link label", type: "string", group: "intro" }),
    defineField({ name: "introCtaHref", title: "Link", type: "string", initialValue: "/services", group: "intro" }),
    defineField({ name: "introImage", title: "Illustration", type: "image", options: { hotspot: true }, group: "intro" }),

    // HOW
    defineField({ name: "howEyebrow", title: "Eyebrow", type: "string", group: "how" }),
    defineField({ name: "howTitle", title: "Title", type: "text", rows: 2, description: EM_HINT, group: "how" }),
    defineField({ name: "howLead", title: "Lead", type: "text", rows: 3, group: "how" }),

    // TESTIMONIALS
    defineField({ name: "testimonialsEyebrow", title: "Eyebrow", type: "string", group: "testimonials" }),
    defineField({ name: "testimonialsTitle", title: "Title", type: "text", rows: 2, description: EM_HINT, group: "testimonials" }),

    // ABOUT TEASER
    defineField({ name: "aboutEyebrow", title: "Eyebrow", type: "string", group: "about" }),
    defineField({ name: "aboutTitle", title: "Title", type: "text", rows: 2, description: EM_HINT, group: "about" }),
    defineField({ name: "aboutBody", title: "Body", type: "text", rows: 6, description: EM_HINT, group: "about" }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      group: "about",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),
    defineField({ name: "aboutCtaLabel", title: "Button label", type: "string", group: "about" }),
    defineField({ name: "aboutImage", title: "Portrait", type: "image", options: { hotspot: true }, group: "about" }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
