import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { ProjectShowcase } from "./project-showcase";

test("renders related project links from props", () => {
  render(
    <ProjectShowcase
      eyebrow="More cases"
      projects={[
        {
          title: "Nibble Invest",
          description: "Investment product interface",
          year: "2024",
          link: "/en/work/nibble-invest",
          image: "/images/nibble.jpg",
        },
      ]}
    />,
  );

  expect(screen.getByText("More cases")).toBeTruthy();
  expect(screen.getByRole("link", { name: /Nibble Invest/ }).getAttribute("href")).toBe("/en/work/nibble-invest");
});
