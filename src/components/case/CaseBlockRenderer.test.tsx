import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { caseFixture } from "@/test/fixtures/content";
import { CaseBlockRenderer } from "./CaseBlockRenderer";

describe("CaseBlockRenderer", () => {
  it("renders supported case blocks", () => {
    render(<CaseBlockRenderer blocks={caseFixture.blocks} />);

    expect(screen.getByText("Product")).toBeTruthy();
    expect(screen.getByText("Гипотеза")).toBeTruthy();
    expect(screen.getByText("Simplified navigation")).toBeTruthy();
  });
});
