import { describe, expect, it } from "vitest";
import { caseBySlugQuery, cvPageQuery, featuredCaseSuggestionsQuery, homeQuery, shotsQuery } from "./queries";

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

  it("selects CV page content", () => {
    expect(cvPageQuery).toContain('*[_type == "cvPage"][0]');
    expect(cvPageQuery).toContain("sideProjects");
    expect(cvPageQuery).toContain("cvFile");
  });

  it("filters shots to published entries", () => {
    expect(shotsQuery).toContain("published == true");
    expect(shotsQuery).toContain("mediaType");
    expect(shotsQuery).toContain("videoFile");
    expect(shotsQuery).toContain('"ru": tags[]->title.ru');
    expect(shotsQuery).toContain('"en": tags[]->title.en');
    expect(homeQuery).toContain('"ru": tags[]->title.ru');
    expect(homeQuery).toContain("videoFile");
  });
});
