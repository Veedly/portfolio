import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";
import { PageTransition } from "./PageTransition";

/* eslint-disable @next/next/no-html-link-for-pages */

let pathname = "/en";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
}));

const timeline = {
  set: vi.fn(() => timeline),
  fromTo: vi.fn(() => timeline),
  to: vi.fn(() => timeline),
  kill: vi.fn(),
};

vi.mock("gsap", () => ({
  gsap: {
    timeline: vi.fn(() => timeline),
  },
}));

beforeEach(() => {
  pathname = "/en";
  window.history.pushState({}, "", "/en");
  vi.clearAllMocks();
});

test("keeps the previous route behind the new route during a pathname change", () => {
  const { rerender } = render(
    <PageTransition>
      <a href="/en/shots" onClick={(event) => event.preventDefault()}>
        Shots
      </a>
      <main>Home page</main>
    </PageTransition>,
  );

  fireEvent.click(screen.getByText("Shots"));
  pathname = "/en/shots";
  rerender(
    <PageTransition>
      <main>Shots page</main>
    </PageTransition>,
  );

  expect(screen.getByTestId("page-transition-previous").textContent).toContain("Home page");
  expect(screen.getByTestId("page-transition-current").textContent).toContain("Shots page");
});

test("mutes and disables video playback in previous route snapshots", () => {
  const { rerender } = render(
    <PageTransition>
      <a href="/en/shots" onClick={(event) => event.preventDefault()}>
        Shots
      </a>
      <video src="/shot.mp4" autoPlay controls />
    </PageTransition>,
  );

  fireEvent.click(screen.getByText("Shots"));
  pathname = "/en/shots";
  rerender(
    <PageTransition>
      <main>Shots page</main>
    </PageTransition>,
  );

  const snapshotVideo = screen.getByTestId("page-transition-previous").querySelector("video");
  expect(snapshotVideo?.hasAttribute("muted")).toBe(true);
  expect(snapshotVideo?.hasAttribute("autoplay")).toBe(false);
  expect(snapshotVideo?.hasAttribute("controls")).toBe(false);
});
