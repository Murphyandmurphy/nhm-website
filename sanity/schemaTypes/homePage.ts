import { defineArrayMember, defineField, defineType } from "sanity";
import { blockNames, sectionArrayOptions } from "./blocks";

/**
 * Home Page — a fixed page (lives at "/") built from stackable section
 * blocks. Add, drag to reorder, duplicate or delete sections to change it.
 */
export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "sections",
      title: "Sections",
      description: "Add, drag to reorder, duplicate or delete sections to build the home page.",
      type: "array",
      options: sectionArrayOptions,
      of: blockNames.map((b) => defineArrayMember({ type: b.type })),
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
