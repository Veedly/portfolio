import { defineArrayMember, defineField, defineType } from "sanity";
import { localizedString, localizedStringArray, localizedText } from "./localized";

const cvEntryFields = [
  localizedString("period", "Period"),
  localizedString("title", "Title"),
  localizedString("place", "Place"),
  localizedText("text", "Text", 3),
  defineField({ name: "order", type: "number", initialValue: 0 }),
];

export const cvPageType = defineType({
  name: "cvPage",
  title: "CV page",
  type: "document",
  fields: [
    localizedString("eyebrow", "Eyebrow"),
    localizedString("name", "Name"),
    localizedString("role", "Role"),
    localizedText("intro", "Intro", 3),
    localizedString("contact", "Contact line"),
    defineField({
      name: "sectionLabels",
      title: "Section labels",
      type: "object",
      fields: [
        localizedString("experience", "Experience"),
        localizedString("education", "Education"),
        localizedString("sideProjects", "Side projects"),
        localizedString("skills", "Skills"),
      ],
    }),
    defineField({
      name: "experience",
      title: "Experience",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: cvEntryFields })],
    }),
    defineField({
      name: "education",
      title: "Education",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: cvEntryFields })],
    }),
    defineField({
      name: "sideProjects",
      title: "Side projects",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: cvEntryFields })],
    }),
    localizedStringArray("skills", "Skills"),
    defineField({ name: "cvFile", title: "CV PDF", type: "file" }),
  ],
  preview: {
    prepare: () => ({ title: "CV page" }),
  },
});
