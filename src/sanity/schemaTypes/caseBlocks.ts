import { defineArrayMember, defineField, defineType } from "sanity";
import { localizedBlocks, localizedString, localizedText } from "./localized";

export const contextGrid = defineType({
  name: "contextGrid",
  title: "Context grid",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [localizedString("title", "Title"), localizedText("text", "Text")],
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});

export const richTextSection = defineType({
  name: "richTextSection",
  title: "Rich text section",
  type: "object",
  fields: [localizedString("label", "Label"), localizedBlocks("body", "Body")],
});

export const problemSection = defineType({
  name: "problemSection",
  title: "Problem section",
  type: "object",
  fields: [
    localizedString("label", "Label"),
    localizedText("title", "Title", 3),
    localizedText("description", "Description", 6),
    defineField({
      name: "items",
      title: "List items",
      description: "Optional structured list below the main problem text.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [localizedString("title", "Title"), localizedText("text", "Text", 2)],
        }),
      ],
    }),
  ],
});

export const goalMetrics = defineType({
  name: "goalMetrics",
  title: "Goal and metrics",
  type: "object",
  fields: [
    localizedText("goal", "Goal"),
    defineField({
      name: "metrics",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [localizedString("key", "Key"), localizedText("value", "Value", 2)],
        }),
      ],
    }),
  ],
});

export const callout = defineType({
  name: "callout",
  title: "Callout",
  type: "object",
  fields: [localizedString("label", "Label"), localizedText("text", "Text")],
});

export const solutions = defineType({
  name: "solutions",
  title: "Solutions",
  type: "object",
  fields: [
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            localizedString("title", "Title"),
            localizedText("text", "Text", 4),
            defineField({ name: "images", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
          ],
        }),
      ],
    }),
  ],
});

export const featureGrid = defineType({
  name: "featureGrid",
  title: "Feature grid",
  type: "object",
  fields: [
    localizedText("intro", "Intro", 2),
    defineField({
      name: "items",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: [localizedString("title", "Title")] })],
    }),
  ],
});

export const resultBullets = defineType({
  name: "resultBullets",
  title: "Result bullets",
  type: "object",
  fields: [
    localizedText("intro", "Intro", 2),
    defineField({
      name: "bullets",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: [localizedString("text", "Text")] })],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});

export const comparisonCards = defineType({
  name: "comparisonCards",
  title: "Comparison cards",
  type: "object",
  fields: [
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            localizedString("label", "Label"),
            localizedString("title", "Title"),
            defineField({ name: "success", type: "string" }),
            defineField({ name: "giveup", type: "string" }),
            defineField({ name: "time", type: "string" }),
          ],
        }),
      ],
    }),
    localizedText("note", "Note", 2),
  ],
});

export const takeaways = defineType({
  name: "takeaways",
  title: "Takeaways",
  type: "object",
  fields: [
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [localizedString("title", "Title"), localizedText("body", "Body", 4)],
        }),
      ],
    }),
  ],
});
