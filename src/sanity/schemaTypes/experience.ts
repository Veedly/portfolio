import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./localized";

export const experienceType = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    localizedString("company", "Company"),
    localizedString("role", "Role"),
    localizedString("period", "Period"),
    localizedText("summary", "Scale and product context", 2),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: {
      title: "company.en",
      subtitle: "period.en",
    },
  },
});
