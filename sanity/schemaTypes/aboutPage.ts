import { defineArrayMember, defineField, defineType } from "sanity";
import { blockNames, sectionArrayOptions } from "./blocks";

/**
 * About Page — a fixed page (lives at "/about") built from stackable section
 * blocks. Add, drag to reorder, duplicate or delete sections to change it.
 */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "sections",
      title: "Sections",
      description: "Add, drag to reorder, duplicate or delete sections to build the about page.",
      type: "array",
      options: sectionArrayOptions,
      of: blockNames.map((b) => defineArrayMember({ type: b.type })),
    }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
