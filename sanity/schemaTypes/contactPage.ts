import { defineField, defineType } from "sanity";

const EM_HINT = "Wrap words in *asterisks* for blue italic.";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heroTitle", title: "Title", type: "text", rows: 2, description: EM_HINT }),
    defineField({ name: "heroLead", title: "Lead", type: "text", rows: 4 }),
    defineField({ name: "successTitle", title: "Form success title", type: "string" }),
    defineField({ name: "successBody", title: "Form success body", type: "text", rows: 3 }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});
