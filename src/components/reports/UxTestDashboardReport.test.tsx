import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UxTestDashboardReport } from "./UxTestDashboardReport";

describe("UxTestDashboardReport", () => {
  it("renders the research setup and primary result", () => {
    render(<UxTestDashboardReport />);

    expect(screen.getByRole("heading", { name: /Bet slip UX study/i })).toBeTruthy();
    expect(screen.getByText(/Unmoderated usability test/i)).toBeTruthy();
    expect(screen.getByText("7 participants per variant")).toBeTruthy();
    expect(screen.getByText("11 current / 7 new valid participants")).toBeTruthy();
    expect(screen.getByText("$50")).toBeTruthy();
    expect(screen.getAllByText("45.4%").length).toBeGreaterThan(0);
    expect(screen.getAllByText("100%").length).toBeGreaterThan(0);
    expect(screen.getByText("What kind of app or service do you think this is?")).toBeTruthy();
    expect(screen.getByAltText(/Current production screen/)).toBeTruthy();
    expect(screen.getByAltText(/New concept screen/)).toBeTruthy();
    expect(screen.getByRole("heading", { name: /not ready for production launch/i })).toBeTruthy();
  });
});
