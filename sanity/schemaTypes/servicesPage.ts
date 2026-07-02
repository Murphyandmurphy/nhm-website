import { defineArrayMember, defineField, defineType } from "sanity";
import { blockNames, sectionArrayOptions } from "./blocks";

/**
 * Services Page — a fixed page (lives at "/services") built from stackable
 * section blocks. Use the "Services Hero" + "Service Detail" blocks to
 * recreate the services layout, or any other blocks you like.
 */
export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  fields: [
    defineField({
      name: "sections",
      title: "Sections",
      description: "Add, drag to reorder, duplicate or delete sections to build the services page.",
      type: "array",
      options: sectionArrayOptions,
      of: blockNames.map((b) => defineArrayMember({ type: b.type })),
    }),
  ],
  preview: { prepare: () => ({ title: "Services Page" }) },
});
