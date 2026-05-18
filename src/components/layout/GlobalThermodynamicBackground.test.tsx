import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { GlobalThermodynamicBackground } from "./GlobalThermodynamicBackground";

test("renders the global thermodynamic background", () => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

  render(<GlobalThermodynamicBackground />);

  expect(screen.getByTestId("global-thermodynamic-bg")).toBeTruthy();
});
