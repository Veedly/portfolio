import { defineField, defineType } from "sanity";
import { localizedString, localizedStringArray } from "./localized";

export const shotType = defineType({
  name: "shot",
  title: "Shot",
  type: "document",
  fields: [
    defineField({ name: "image", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    localizedString("title", "Title"),
    localizedStringArray("tags", "Tags"),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "relatedCase", type: "reference", to: [{ type: "case" }] }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
    defineField({ name: "published", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "year",
      media: "image",
    },
  },
});
