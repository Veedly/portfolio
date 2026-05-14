import Link from "next/link";
import { Component as ImageAutoSlider, type SliderMediaItem } from "@/components/image-auto-slider";
import { urlFor } from "@/sanity/image";
import type { Shot } from "@/types/content";

export function ShotsStrip({ shots, locale }: { shots: Shot[]; locale: "ru" | "en" }) {
  if (!shots.length) return null;

  const items = shots.map(getMediaItem).filter((item): item is SliderMediaItem => Boolean(item));

  return (
    <section className="shots-strip motion-reveal" style={{ padding: "80px 0", overflow: "hidden" }}>
      <div className="container mono-label" style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
        <span>GALLERY</span>
        <span style={{ display: "flex", gap: 24 }}>
          <span>HOVER - PAUSES</span>
          <Link href={`/${locale}/shots`}>VIEW ALL</Link>
        </span>
      </div>
      <ImageAutoSlider items={items} />
    </section>
  );
}

function getMediaItem(shot: Shot): SliderMediaItem | null {
  const imageUrl = getImageUrl(shot);
  const videoUrl = getVideoUrl(shot);

  if (shot.mediaType === "video" && videoUrl) {
    return { type: "video", src: videoUrl, poster: imageUrl, alt: shot.title || "Shot video" };
  }

  if (!imageUrl) return null;
  return { type: "image", src: imageUrl, alt: shot.title || "Shot image" };
}

function getImageUrl(shot: Shot) {
  if (shot.image?.asset?.url) return shot.image.asset.url;
  if (!shot.image?.asset?._ref || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return "";
  return urlFor(shot.image).width(980).height(736).fit("crop").url();
}

function getVideoUrl(shot: Shot) {
  return shot.videoFile?.asset?.url || "";
}
