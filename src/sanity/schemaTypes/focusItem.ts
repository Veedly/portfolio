import { defineField, defineType } from "sanity";
import { localizedString } from "./localized";

export const focusItemType = defineType({
  name: "focusItem",
  title: "Focus item",
  type: "document",
  fields: [localizedString("title", "Title"), defineField({ name: "order", type: "number", initialValue: 0 })],
  preview: {
    select: {
      title: "title.en",
    },
  },
});
