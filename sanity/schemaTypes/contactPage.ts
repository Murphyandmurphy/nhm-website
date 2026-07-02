import { defineArrayMember, defineField, defineType } from "sanity";
import { blockNames, sectionArrayOptions } from "./blocks";

/**
 * Contact Page — a fixed page (lives at "/contact") built from stackable
 * section blocks. Use the "Contact + Form" block for the enquiry form, plus
 * any other blocks you like.
 */
export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "sections",
      title: "Sections",
      description: "Add, drag to reorder, duplicate or delete sections to build the contact page.",
      type: "array",
      options: sectionArrayOptions,
      of: blockNames.map((b) => defineArrayMember({ type: b.type })),
    }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});
