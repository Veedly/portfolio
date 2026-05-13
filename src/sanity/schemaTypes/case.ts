import { defineArrayMember, defineField, defineType } from "sanity";
import { localizedString, localizedStringArray, localizedText } from "./localized";

export const caseType = defineType({
  name: "case",
  title: "Case",
  type: "document",
  fields: [
    localizedString("title", "Title"),
    defineField({ name: "slug", type: "slug", options: { source: "title.en" }, validation: (Rule) => Rule.required() }),
    localizedText("subtitle", "Subtitle", 2),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "year", type: "string" }),
    localizedString("role", "Role"),
    localizedString("client", "Client"),
    localizedString("scope", "Scope"),
    localizedStringArray("tags", "Tags"),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "featuredOrder", type: "number", initialValue: 0 }),
    defineField({
      name: "blocks",
      type: "array",
      of: [
        defineArrayMember({ type: "contextGrid" }),
        defineArrayMember({ type: "richTextSection" }),
        defineArrayMember({ type: "goalMetrics" }),
        defineArrayMember({ type: "callout" }),
        defineArrayMember({ type: "solutions" }),
        defineArrayMember({ type: "featureGrid" }),
        defineArrayMember({ type: "resultBullets" }),
        defineArrayMember({ type: "comparisonCards" }),
        defineArrayMember({ type: "takeaways" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "year",
      media: "coverImage",
    },
  },
});
