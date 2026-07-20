import { defineArrayMember, defineField, defineType } from "sanity";
import { ICON_OPTIONS } from "../lib/iconOptions";
import { BLOCK_ICONS } from "../lib/blockIcons";

/**
 * SECTION BLOCKS — reusable templates for the page builder.
 * Each block mirrors a section from the original site. Editors stack these
 * in the "Pages" → Sections field to build new pages, in any order.
 */

const EM = "Wrap words in *asterisks* for blue italic, **double** for bold.";

// Shared "background colour" control, reused by every block.
const toneField = defineField({
  name: "tone",
  title: "Background",
  type: "string",
  options: {
    list: [
      { title: "Cream", value: "cream" },
      { title: "White", value: "white" },
      { title: "Paper (light cream)", value: "paper" },
      { title: "Blue", value: "blue" },
      { title: "Ink (dark)", value: "ink" },
    ],
    layout: "radio",
  },
  initialValue: "cream",
});

const sectionSpacingFields = () => [
  defineField({
    name: "paddingTop",
    title: "Top spacing",
    type: "string",
    options: {
      list: [
        { title: "Default", value: "default" },
        { title: "None", value: "none" },
        { title: "Small", value: "sm" },
        { title: "Medium", value: "md" },
        { title: "Large", value: "lg" },
        { title: "Extra large", value: "xl" },
      ],
      layout: "dropdown",
    },
    initialValue: "default",
  }),
  defineField({
    name: "paddingBottom",
    title: "Bottom spacing",
    type: "string",
    options: {
      list: [
        { title: "Default", value: "default" },
        { title: "None", value: "none" },
        { title: "Small", value: "sm" },
        { title: "Medium", value: "md" },
        { title: "Large", value: "lg" },
        { title: "Extra large", value: "xl" },
      ],
      layout: "dropdown",
    },
    initialValue: "default",
  }),
];

const cardItem = (withHref = false) =>
  defineArrayMember({
    type: "object",
    name: withHref ? "linkCard" : "iconCard",
    fields: [
      defineField({ name: "icon", title: "Icon", type: "string", options: { list: ICON_OPTIONS } }),
      ...(withHref ? [defineField({ name: "number", title: "Number label", type: "string" })] : []),
      defineField({ name: "title", title: "Title", type: "string" }),
      defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
      ...(withHref ? [defineField({ name: "href", title: "Link", type: "string" })] : []),
    ],
    preview: { select: { title: "title", subtitle: "body" } },
  });

/* 1. HERO — the big intro band (title, two paragraphs, two buttons, image). */
export const heroSection = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "text", rows: 2, description: EM }),
    defineField({ name: "sub", title: "Paragraph 1", type: "text", rows: 3 }),
    defineField({ name: "sub2", title: "Paragraph 2", type: "text", rows: 3 }),
    defineField({ name: "primaryLabel", title: "Primary button label", type: "string" }),
    defineField({ name: "primaryHref", title: "Primary button link", type: "string" }),
    defineField({ name: "secondaryLabel", title: "Secondary button label", type: "string" }),
    defineField({ name: "secondaryHref", title: "Secondary button link", type: "string" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "heroSlides",
      title: "Hero slideshow images",
      description: "Up to 5 images for the automatically scrolling slideshow on the right-hand side of the hero.",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
      validation: (Rule) => Rule.max(5),
    }),
    defineField({ name: "logoTickerHeading", title: "Logo ticker heading", type: "string", initialValue: "I've helped..." }),
    defineField({
      name: "logoTickerBrands",
      title: "Logo ticker brands",
      description: "Logos shown in the scrolling strip at the bottom of the hero.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "brand",
          fields: [
            defineField({ name: "name", title: "Brand name", type: "string" }),
            defineField({ name: "logo", title: "Logo", type: "image" }),
          ],
          preview: { select: { title: "name", media: "logo" } },
        }),
      ],
    }),
    toneField,
    ...sectionSpacingFields(),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: "Hero", subtitle: title }) },
});

/* 2. IMAGE & TEXT — two columns, image one side, prose the other. */
export const imageTextSection = defineType({
  name: "imageTextSection",
  title: "Image & Text",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading (optional)", type: "text", rows: 2, description: EM }),
    defineField({ name: "body", title: "Body (blank line = new paragraph)", type: "text", rows: 8, description: EM }),
    defineField({ name: "ctaLabel", title: "Link label", type: "string" }),
    defineField({ name: "ctaHref", title: "Link", type: "string" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "imageSide",
      title: "Image position",
      type: "string",
      options: { list: [{ title: "Left", value: "left" }, { title: "Right", value: "right" }], layout: "radio" },
      initialValue: "left",
    }),
    defineField({
      name: "imageAspect",
      title: "Image shape",
      type: "string",
      options: {
        list: [
          { title: "Square", value: "square" },
          { title: "Portrait (tall)", value: "portrait" },
          { title: "Landscape (wide)", value: "landscape" },
        ],
        layout: "radio",
      },
      initialValue: "square",
    }),
    defineField({
      name: "stats",
      title: "Stats (optional)",
      description: "Big numbers shown under the text, e.g. 25+ / years' experience.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    toneField,
    ...sectionSpacingFields(),
  ],
  preview: { select: { subtitle: "heading" }, prepare: ({ subtitle }) => ({ title: "Image & Text", subtitle }) },
});

/* 3. SERVICE CARDS — the three-up "How I can help" row. */
export const serviceCardsSection = defineType({
  name: "serviceCardsSection",
  title: "Service Cards (3-up)",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "text", rows: 2, description: EM }),
    defineField({ name: "lead", title: "Lead", type: "text", rows: 3 }),
    defineField({ name: "cards", title: "Cards", type: "array", of: [cardItem(true)] }),
    toneField,
    ...sectionSpacingFields(),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: "Service Cards", subtitle: title }) },
});

/* 4. FEATURE GRID — icon + heading + body items ("My approach"). */
export const featureGridSection = defineType({
  name: "featureGridSection",
  title: "Feature Grid",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "text", rows: 2, description: EM }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "number",
      options: { list: [2, 3] },
      initialValue: 2,
    }),
    defineField({ name: "items", title: "Items", type: "array", of: [cardItem(false)] }),
    toneField,
    ...sectionSpacingFields(),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: "Feature Grid", subtitle: title }) },
});

/* 5. TESTIMONIALS — rotating client quotes carousel. */
export const testimonialsSection = defineType({
  name: "testimonialsSection",
  title: "Testimonials",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "text", rows: 2, description: EM }),
    defineField({
      name: "quotes",
      title: "Quotes",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "quote",
          fields: [
            defineField({ name: "quote", title: "Quote", type: "text", rows: 3, description: "Use *asterisks* for blue italic." }),
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "role", title: "Role / company", type: "string" }),
          ],
          preview: { select: { title: "name", subtitle: "role" } },
        }),
      ],
    }),
    defineField({
      name: "tone",
      title: "Background",
      type: "string",
      options: {
        list: [
          { title: "Cream", value: "cream" },
          { title: "White", value: "white" },
          { title: "Paper (light cream)", value: "paper" },
          { title: "Blue", value: "blue" },
          { title: "Ink (dark)", value: "ink" },
        ],
        layout: "radio",
      },
      initialValue: "blue",
    }),
    ...sectionSpacingFields(),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: "Testimonials", subtitle: title }) },
});

/* 6. STATS ROW — big editorial numbers. */
export const statsSection = defineType({
  name: "statsSection",
  title: "Stats Row",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Heading (optional)", type: "text", rows: 2, description: EM }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    toneField,
    ...sectionSpacingFields(),
  ],
  preview: { prepare: () => ({ title: "Stats Row" }) },
});

/* 7. LOGO STRIP — brand / client logo chips. */
export const logoStripSection = defineType({
  name: "logoStripSection",
  title: "Logo Strip",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "text", rows: 2, description: EM }),
    defineField({ name: "lead", title: "Lead", type: "text", rows: 2 }),
    defineField({
      name: "brands",
      title: "Brands",
      description: "Each brand shows its logo if uploaded, otherwise the name as text.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "brand",
          fields: [
            defineField({ name: "name", title: "Brand name", type: "string" }),
            defineField({ name: "logo", title: "Logo (transparent PNG)", type: "image" }),
          ],
          preview: { select: { title: "name", media: "logo" } },
        }),
      ],
    }),
    defineField({ name: "note", title: "Note under logos", type: "string" }),
    toneField,
    ...sectionSpacingFields(),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: "Logo Strip", subtitle: title }) },
});

/* 8. CALL TO ACTION — the highlighted blue/ink band with a button. */
export const ctaSection = defineType({
  name: "ctaSection",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
    defineField({ name: "buttonLabel", title: "Button label", type: "string" }),
    defineField({ name: "buttonHref", title: "Button link", type: "string", initialValue: "/contact" }),
    defineField({
      name: "ctaColour",
      title: "Panel colour",
      type: "string",
      options: { list: [{ title: "Blue", value: "blue" }, { title: "Ink (dark)", value: "ink" }], layout: "radio" },
      initialValue: "blue",
    }),
    toneField,
    ...sectionSpacingFields(),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: "Call to Action", subtitle: title }) },
});

/* 9. TEXT BLOCK — a heading + body paragraphs. */
export const textSection = defineType({
  name: "textSection",
  title: "Text Block",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading (optional)", type: "text", rows: 2, description: EM }),
    defineField({ name: "body", title: "Body (blank line = new paragraph)", type: "text", rows: 10, description: EM }),
    defineField({ name: "narrow", title: "Narrow width (easier reading)", type: "boolean", initialValue: true }),
    toneField,
    ...sectionSpacingFields(),
  ],
  preview: { select: { subtitle: "heading" }, prepare: ({ subtitle }) => ({ title: "Text Block", subtitle }) },
});

/* 10. INFO CARDS — three-up icon cards (the Insights strands). */
export const infoCardsSection = defineType({
  name: "infoCardsSection",
  title: "Info Cards (3-up)",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "text", rows: 2, description: EM }),
    defineField({ name: "lead", title: "Lead", type: "text", rows: 3 }),
    defineField({ name: "items", title: "Cards", type: "array", of: [cardItem(false)] }),
    defineField({ name: "showComingSoon", title: 'Show "Coming soon" label', type: "boolean", initialValue: false }),
    toneField,
    ...sectionSpacingFields(),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: "Info Cards", subtitle: title }) },
});

/* 11. CONTACT — details + the contact form. */
export const contactSection = defineType({
  name: "contactSection",
  title: "Contact + Form",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "text", rows: 2, description: EM }),
    defineField({ name: "lead", title: "Lead", type: "text", rows: 4 }),
    defineField({ name: "successTitle", title: "Form success title", type: "string" }),
    defineField({ name: "successBody", title: "Form success body", type: "text", rows: 3 }),
    toneField,
    ...sectionSpacingFields(),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: "Contact + Form", subtitle: title }) },
});

/* 12. SERVICES HERO — the Services page intro with an auto "jump to" nav. */
export const servicesHeroSection = defineType({
  name: "servicesHeroSection",
  title: "Services Hero (with jump nav)",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "text", rows: 2, description: EM }),
    defineField({ name: "lead", title: "Lead", type: "text", rows: 3 }),
    defineField({
      name: "showJumpNav",
      title: 'Show "jump to" buttons',
      description: "Automatically lists every Service Detail block below on this page.",
      type: "boolean",
      initialValue: true,
    }),
    toneField,
    ...sectionSpacingFields(),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: "Services Hero", subtitle: title }) },
});

/* 13. SERVICE DETAIL — one in-depth service (need / solution / checklist). */
export const serviceDetailSection = defineType({
  name: "serviceDetailSection",
  title: "Service Detail",
  type: "object",
  fields: [
    defineField({ name: "number", title: "Number", type: "string", description: 'e.g. "01"' }),
    defineField({ name: "icon", title: "Icon", type: "string", options: { list: ICON_OPTIONS } }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "need", title: "The need", type: "text", rows: 4, description: EM }),
    defineField({ name: "solution", title: "The solution", type: "text", rows: 4, description: EM }),
    defineField({ name: "items", title: "What it looks like (checklist)", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "ctaLabel", title: "Button label", type: "string" }),
    defineField({ name: "ctaHref", title: "Button link", type: "string", initialValue: "/contact" }),
    toneField,
    ...sectionSpacingFields(),
  ],
  preview: { select: { title: "title", subtitle: "number" }, prepare: ({ title, subtitle }) => ({ title: title || "Service Detail", subtitle }) },
});

const rawBlockTypes = [
  heroSection,
  servicesHeroSection,
  serviceDetailSection,
  imageTextSection,
  serviceCardsSection,
  featureGridSection,
  testimonialsSection,
  statsSection,
  logoStripSection,
  ctaSection,
  textSection,
  infoCardsSection,
  contactSection,
];

// Attach each block's wireframe icon (shown in the "Add item" menu + list).
export const blockTypes = rawBlockTypes.map((t) => ({
  ...t,
  icon: BLOCK_ICONS[t.name],
}));

export const blockNames = blockTypes.map((b) => ({ type: b.name }));

/**
 * Shared options for every "Sections" array field. Turns the "Add item"
 * picker into a visual GRID of section tiles (layout icon + name) so a
 * non-technical editor can see what each section looks like before adding it.
 */
export const sectionArrayOptions = {
  insertMenu: {
    showIcons: true,
    views: [{ name: "grid" as const }, { name: "list" as const }],
  },
};
