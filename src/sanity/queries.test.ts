import { describe, expect, it } from "vitest";
import { caseBySlugQuery, homeQuery, shotsQuery } from "./queries";

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
  });

  it("filters shots to published entries", () => {
    expect(shotsQuery).toContain("published == true");
  });
});
