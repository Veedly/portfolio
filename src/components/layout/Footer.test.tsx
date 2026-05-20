import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Footer } from "./Footer";

test("uses the global thermodynamic background instead of a duplicate footer grid", () => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

  const { container } = render(<Footer />);

  expect(screen.queryByTestId("footer-thermodynamic-grid")).toBeNull();
  expect(container.querySelector(".site-footer")?.classList.contains("motion-reveal")).toBe(false);
  expect(container.querySelector(".site-footer .motion-reveal")).toBeNull();
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
