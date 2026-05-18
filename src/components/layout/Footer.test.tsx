import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Footer } from "./Footer";

test("does not render a duplicate thermodynamic grid inside the footer", () => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

  render(<Footer />);

  expect(screen.queryByTestId("footer-thermodynamic-grid")).toBeNull();
});

test("renders primary footer contact actions", () => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

  render(<Footer telegram="@veed_ux" email="redogdeev31@gmail.com" />);

  expect(screen.getByRole("link", { name: /Написать в Telegram@veed_ux/i }).getAttribute("href")).toBe(
    "https://t.me/veed_ux",
  );
  expect(screen.getByRole("link", { name: /На почтуredogdeev31@gmail.com/i }).getAttribute("href")).toBe(
    "mailto:redogdeev31@gmail.com",
  );
  expect(screen.queryByRole("link", { name: "Behance" })).toBeNull();
  expect(screen.queryByRole("link", { name: "Download CV" })).toBeNull();
});
