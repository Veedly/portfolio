import { defineField, defineType } from "sanity";
import { localizedString } from "./localized";

export const shotTagType = defineType({
  name: "shotTag",
  title: "Shot tag",
  type: "document",
  fields: [
    localizedString("title", "Title"),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "slug.current",
    },
  },
});
