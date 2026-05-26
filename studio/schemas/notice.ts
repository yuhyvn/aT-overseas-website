import { defineField, defineType } from "sanity";

export const notice = defineType({
  name: "notice",
  title: "Notice",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Export Support", value: "export-support" },
          { title: "Trade Exhibition", value: "trade-exhibition" },
          { title: "Buyer Matching", value: "buyer-matching" },
          { title: "Industry Update", value: "industry-update" },
          { title: "Import Regulation", value: "import-regulation" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "actionLabel",
      title: "Button Label",
      type: "string",
    }),
    defineField({
      name: "actionHref",
      title: "Button Link",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
    },
  },
});
