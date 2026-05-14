import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./localized";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    localizedString("name", "Name"),
    localizedString("role", "Role"),
    localizedText("intro", "Intro"),
    defineField({
      name: "heroImageDark",
      title: "Hero image - dark theme",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "heroImageLight",
      title: "Hero image - light theme",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    localizedString("availabilityStatus", "Availability status"),
    defineField({ name: "telegram", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "behance", type: "url" }),
    defineField({ name: "cvFile", type: "file" }),
    localizedString("footerNote", "Footer note"),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
