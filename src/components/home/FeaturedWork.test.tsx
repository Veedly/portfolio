import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeaturedWork } from "./FeaturedWork";

describe("FeaturedWork", () => {
  it("renders the case cover image when one is available", () => {
    render(
      <FeaturedWork
        locale="ru"
        cases={[
          {
            title: "Brand platform",
            slug: "brand-platform",
            subtitle: "Identity and product system",
            tags: ["Brand", "UX"],
            coverImage: {
              alt: "Brand platform cover",
              asset: { url: "https://cdn.sanity.io/images/demo/project/cover.jpg" },
            },
          },
        ]}
      />,
    );

    expect(screen.getByAltText("Brand platform cover")).toBeTruthy();
    expect(document.querySelector(".image-loader-frame")).toBeNull();
  });
});
