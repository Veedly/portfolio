import { defineField, defineType } from "sanity";
import { localizedString, localizedStringArray } from "./localized";

export const shotType = defineType({
  name: "shot",
  title: "Shot",
  type: "document",
  fields: [
    defineField({
      name: "mediaType",
      title: "Media type",
      type: "string",
      initialValue: "image",
      options: {
        layout: "radio",
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image / video poster",
      type: "image",
      options: { hotspot: true },
      description: "For image shots this is the main media. For video shots this is used as poster/preview.",
      validation: (Rule) =>
        Rule.custom((image, context) => {
          const parent = context.parent as { mediaType?: string; videoFile?: unknown } | undefined;
          if (parent?.mediaType === "video" && parent.videoFile) return true;
          return image ? true : "Add an image or upload a video file";
        }),
    }),
    defineField({
      name: "videoFile",
      title: "Video file",
      type: "file",
      options: {
        accept: "video/*",
      },
      hidden: ({ parent }) => parent?.mediaType !== "video",
      validation: (Rule) =>
        Rule.custom((file, context) => {
          const parent = context.parent as { mediaType?: string; image?: unknown } | undefined;
          if (parent?.mediaType !== "video") return true;
          if (file || parent.image) return true;
          return "Upload a video file or add a poster image";
        }),
    }),
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
