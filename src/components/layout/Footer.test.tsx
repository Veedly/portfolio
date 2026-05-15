import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Footer } from "./Footer";

test("renders the interactive grid as footer background", () => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

  render(<Footer />);

  expect(screen.getByTestId("footer-thermodynamic-grid")).toBeTruthy();
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
