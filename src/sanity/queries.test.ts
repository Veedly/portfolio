import { describe, expect, it } from "vitest";
import { caseBySlugQuery, featuredCaseSuggestionsQuery, homeQuery, shotsQuery } from "./queries";

describe("Sanity queries", () => {
  it("selects homepage content groups", () => {
    expect(homeQuery).toContain('"settings"');
    expect(homeQuery).toContain('"featuredCases"');
    expect(homeQuery).toContain('"featuredShots"');
    expect(homeQuery).toContain('"experience"');
    expect(homeQuery).toContain('"focus"');
  });

  it("filters case pages by slug parameter", () => {
    expect(caseBySlugQuery).toContain("slug.current == $slug");
    expect(caseBySlugQuery).toContain("showcasePreviewImage");
    expect(caseBySlugQuery).toContain("videoFile");
    expect(caseBySlugQuery).toContain("posterImage");
  });

  it("selects showcase preview images for related cases", () => {
    expect(featuredCaseSuggestionsQuery).toContain("showcasePreviewImage");
  });

  it("filters shots to published entries", () => {
    expect(shotsQuery).toContain("published == true");
    expect(shotsQuery).toContain("mediaType");
    expect(shotsQuery).toContain("videoFile");
    expect(shotsQuery).toContain('"tags": tags[]->title');
    expect(homeQuery).toContain('"tags": tags[]->title');
    expect(homeQuery).toContain("videoFile");
  });
});
