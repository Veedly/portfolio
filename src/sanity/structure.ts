import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio CMS")
    .items([
      S.listItem()
        .title("Site settings")
        .schemaType("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("CV page")
        .schemaType("cvPage")
        .child(S.document().schemaType("cvPage").documentId("cvPage")),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !["siteSettings", "cvPage"].includes(item.getId() ?? "")),
    ]);
