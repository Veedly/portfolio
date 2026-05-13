import { defineField } from "sanity";

export const localizedString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "ru", title: "Russian", type: "string" }),
      defineField({ name: "en", title: "English", type: "string" }),
    ],
  });

export const localizedText = (name: string, title: string, rows = 3) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "ru", title: "Russian", type: "text", rows }),
      defineField({ name: "en", title: "English", type: "text", rows }),
    ],
  });

export const localizedStringArray = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "ru", title: "Russian", type: "array", of: [{ type: "string" }] }),
      defineField({ name: "en", title: "English", type: "array", of: [{ type: "string" }] }),
    ],
  });

export const localizedBlocks = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "ru", title: "Russian", type: "array", of: [{ type: "block" }] }),
      defineField({ name: "en", title: "English", type: "array", of: [{ type: "block" }] }),
    ],
  });
