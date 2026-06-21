import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ReportAccessGate } from "./ReportAccessGate";

describe("ReportAccessGate", () => {
  it("renders a password form without revealing protected content", () => {
    render(<ReportAccessGate />);

    expect(screen.getByRole("heading", { name: /access denied/i })).toBeTruthy();
    expect(screen.getByLabelText(/password/i)).toBeTruthy();
    expect(screen.getByRole("button", { name: /open report/i })).toBeTruthy();
  });
});

