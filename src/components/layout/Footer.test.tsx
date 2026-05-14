import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Footer } from "./Footer";

test("renders the interactive grid as footer background", () => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

  render(<Footer />);

  expect(screen.getByTestId("footer-thermodynamic-grid")).toBeTruthy();
});
