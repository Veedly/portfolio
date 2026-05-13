import Link from "next/link";
import { Component as ImageAutoSlider } from "@/components/image-auto-slider";
import type { Shot } from "@/types/content";
import { urlFor } from "@/sanity/image";

export function ShotsStrip({ shots, locale }: { shots: Shot[]; locale: "ru" | "en" }) {
  if (!shots.length) return null;

  const images = shots.map(getImageUrl).filter(Boolean);

  return (
    <section className="shots-strip" style={{ padding: "80px 0", overflow: "hidden" }}>
      <div className="container mono-label" style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
        <span>GALLERY</span>
        <span style={{ display: "flex", gap: 24 }}>
          <span>HOVER - PAUSES</span>
          <Link href={`/${locale}/shots`}>VIEW ALL</Link>
        </span>
      </div>
      <ImageAutoSlider images={images} />
    </section>
  );
}

function getImageUrl(shot: Shot) {
  if (shot.image?.asset?.url) return shot.image.asset.url;
  if (!shot.image?.asset?._ref || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return "";
  return urlFor(shot.image).width(980).height(736).fit("crop").url();
}
