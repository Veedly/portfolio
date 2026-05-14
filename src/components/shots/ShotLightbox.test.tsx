import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { expect, test, vi } from "vitest";
import { ShotLightbox } from "./ShotLightbox";

vi.mock("@/components/flip-reveal", () => ({
  FlipReveal: ({ children }: { children: ReactNode }) => <div data-testid="flip-reveal">{children}</div>,
  FlipRevealItem: ({ children, flipKey }: { children: ReactNode; flipKey: string }) => (
    <div data-testid="flip-reveal-item" data-flip={flipKey}>
      {children}
    </div>
  ),
}));

test("renders shot category filters and marks the selected filter", () => {
  render(
    <ShotLightbox
      shots={[
        { title: "Dashboard", tags: ["CRM"], image: { asset: { url: "/dashboard.jpg" } } },
        { title: "Wallet", tags: ["Fintech"], image: { asset: { url: "/wallet.jpg" } } },
      ]}
    />,
  );

  expect(screen.getByRole("button", { name: "ALL" }).classList.contains("is-active")).toBe(true);
  expect(screen.getByRole("button", { name: "CRM" })).toBeTruthy();
  expect(screen.getByRole("button", { name: "Fintech" })).toBeTruthy();
  expect(screen.getAllByTestId("flip-reveal-item")).toHaveLength(2);

  fireEvent.click(screen.getByRole("button", { name: "CRM" }));

  expect(screen.getByRole("button", { name: "CRM" }).classList.contains("is-active")).toBe(true);
  expect(screen.getByRole("button", { name: "ALL" }).classList.contains("is-active")).toBe(false);
});

test("renders video shots as video media", () => {
  const { container } = render(
    <ShotLightbox
      shots={[
        {
          title: "Motion shot",
          mediaType: "video",
          tags: ["Motion"],
          image: { asset: { url: "/poster.jpg" } },
          videoFile: { asset: { url: "/motion.mp4", mimeType: "video/mp4" } },
        },
      ]}
    />,
  );

  const video = container.querySelector("video");

  expect(video).toBeTruthy();
  expect(video?.getAttribute("src")).toBe("/motion.mp4");
  expect(video?.getAttribute("poster")).toBe("/poster.jpg");
});
