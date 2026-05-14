import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

vi.mock("gsap", () => ({
  gsap: {
    context: (callback: () => void) => {
      callback();
      return { revert: vi.fn() };
    },
    fromTo: vi.fn(),
    registerPlugin: vi.fn(),
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {},
}));

import ScrollReveal from "./ScrollReveal";

test("splits string children into animated word spans", () => {
  render(<ScrollReveal>Product design systems</ScrollReveal>);

  expect(screen.getByText("Product").classList.contains("word")).toBe(true);
  expect(screen.getByText("design").classList.contains("word")).toBe(true);
  expect(screen.getByText("systems").classList.contains("word")).toBe(true);
  expect(screen.getByTestId("scroll-reveal").classList.contains("scroll-reveal")).toBe(true);
});
