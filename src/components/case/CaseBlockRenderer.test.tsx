import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { caseFixture } from "@/test/fixtures/content";
import { CaseBlockRenderer } from "./CaseBlockRenderer";

describe("CaseBlockRenderer", () => {
  it("renders supported case blocks", () => {
    render(<CaseBlockRenderer blocks={caseFixture.blocks} locale="en" />);

    expect(screen.getByText("Product")).toBeTruthy();
    const video = document.querySelector(".case-video");
    expect(video?.getAttribute("src")).toBe("/case-demo.mp4");
    expect((video as HTMLVideoElement | null)?.muted).toBe(true);
    expect(screen.getByText("Mobile flows did not fit the web context.")).toBeTruthy();
    expect(screen.getByText("Flow length")).toBeTruthy();
    expect(screen.getByText("Гипотеза")).toBeTruthy();
    expect(screen.getByText("Simplified navigation")).toBeTruthy();
  });
});
