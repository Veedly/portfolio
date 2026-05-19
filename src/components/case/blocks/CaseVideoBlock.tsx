import type { CaseBlock } from "@/types/content";
import { urlFor } from "@/sanity/image";

type CaseVideo = Extract<CaseBlock, { _type: "caseVideo" }>;

export function CaseVideoBlock({ block }: { block: CaseVideo }) {
  const videoUrl = block.videoFile?.asset?.url;
  const posterUrl = getPosterUrl(block);
  const isLoop = block.mode === "loop";

  if (!videoUrl) return null;

  return (
    <section className="container case-video-block motion-reveal">
      <video
        className="case-video"
        src={videoUrl}
        poster={posterUrl || undefined}
        controls={!isLoop}
        muted
        loop={isLoop}
        autoPlay={isLoop}
        playsInline
        preload="metadata"
      />
      {block.caption ? <p className="mono-label case-video-caption">{block.caption}</p> : null}
    </section>
  );
}

function getPosterUrl(block: CaseVideo) {
  if (block.posterImage?.asset?.url) return block.posterImage.asset.url;
  if (!block.posterImage?.asset?._ref || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return "";
  return urlFor(block.posterImage).width(1400).height(900).fit("crop").url();
}
