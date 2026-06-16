import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A single navigation / footer link. Either pick one of your builder Pages
 * from the dropdown, OR type a custom link (e.g. /services, /about, or a full
 * https:// URL). Label is what shows in the menu.
 */
const linkObject = () =>
  defineArrayMember({
    type: "object",
    name: "navLink",
    fields: [
      defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
      defineField({ name: "page", title: "Link to a Page", type: "reference", to: [{ type: "page" }] }),
      defineField({
        name: "customHref",
        title: "…or a custom link",
        type: "string",
        description: "Used if no Page is selected. e.g. /services, /about, or https://…",
      }),
    ],
    preview: { select: { title: "label", subtitle: "customHref" } },
  });

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "general", title: "General" },
    { name: "nav", title: "Navigation" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({ name: "brandName", title: "Brand name", type: "string", group: "general" }),
    defineField({ name: "email", title: "Email", type: "string", group: "general" }),
    defineField({ name: "phone", title: "Phone", type: "string", group: "general" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url", group: "general" }),

    // NAVIGATION (header)
    defineField({
      name: "navItems",
      title: "Header menu",
      description: "The links across the top. Drag to reorder, add or remove.",
      type: "array",
      of: [linkObject()],
      group: "nav",
    }),
    defineField({ name: "navCtaLabel", title: "Header button label", type: "string", group: "nav" }),
    defineField({ name: "navCtaHref", title: "Header button link", type: "string", initialValue: "/contact", group: "nav" }),

    // FOOTER
    defineField({ name: "tagline", title: "Footer tagline", type: "text", rows: 2, group: "footer" }),
    defineField({
      name: "footerLinks",
      title: 'Footer "Explore" links',
      type: "array",
      of: [linkObject()],
      group: "footer",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
