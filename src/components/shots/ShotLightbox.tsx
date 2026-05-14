"use client";

import { useMemo, useState } from "react";
import { FlipReveal, FlipRevealItem } from "@/components/flip-reveal";
import { urlFor } from "@/sanity/image";
import type { Shot } from "@/types/content";

export function ShotLightbox({ shots }: { shots: Shot[] }) {
  const [active, setActive] = useState<Shot | null>(null);
  const [activeTag, setActiveTag] = useState("all");
  const tags = useMemo(() => Array.from(new Set(shots.flatMap((shot) => shot.tags || []))), [shots]);

  return (
    <>
      <div className="shots-filter-bar" aria-label="Shot categories">
        <FilterButton active={activeTag === "all"} onClick={() => setActiveTag("all")}>
          ALL
        </FilterButton>
        {tags.map((tag) => (
          <FilterButton key={tag} active={activeTag === tag} onClick={() => setActiveTag(tag)}>
            {tag}
          </FilterButton>
        ))}
      </div>

      <FlipReveal keys={[activeTag]} className="shots-grid" showClass="shot-card--visible" hideClass="shot-card--hidden">
        {shots.map((shot, index) => {
          const media = getShotMedia(shot);
          const flipKey = shot.tags?.length ? shot.tags.join("|") : "uncategorized";

          return (
            <FlipRevealItem key={`${shot.title || "shot"}-${index}`} flipKey={flipKey} className="shot-card">
              <button type="button" onClick={() => setActive(shot)} className="shot-card-button">
                <div className="shot-card-media">
                  {media?.type === "video" ? (
                    <video src={media.src} poster={media.poster} muted loop playsInline autoPlay preload="metadata" />
                  ) : media?.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={media.src} alt={shot.title || "Shot"} loading="lazy" />
                  ) : null}
                </div>
                <div className="shot-card-meta">
                  {shot.title ? <p>{shot.title}</p> : <p>Untitled</p>}
                  {shot.tags?.length ? <span className="mono-label">{shot.tags.join(" · ")}</span> : null}
                </div>
              </button>
            </FlipRevealItem>
          );
        })}
      </FlipReveal>

      {active ? (
        <div role="dialog" aria-modal="true" onClick={() => setActive(null)} className="shot-lightbox">
          <div className="shot-lightbox-panel">
            {getShotMedia(active)?.type === "video" ? (
              <video src={getShotMedia(active)?.src} poster={getShotMedia(active)?.poster} controls autoPlay playsInline />
            ) : getShotMedia(active)?.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={getShotMedia(active)?.src} alt={active.title || "Shot"} />
            ) : null}
            {active.title ? <p className="mono-label">{active.title}</p> : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

function FilterButton({ active, children, onClick }: { active: boolean; children: string; onClick: () => void }) {
  return (
    <button type="button" className={active ? "shots-filter is-active" : "shots-filter"} onClick={onClick}>
      {children}
    </button>
  );
}

function getShotMedia(shot: Shot) {
  const imageUrl = getShotImageUrl(shot);
  const videoUrl = shot.videoFile?.asset?.url || "";

  if (shot.mediaType === "video" && videoUrl) {
    return { type: "video" as const, src: videoUrl, poster: imageUrl };
  }

  if (!imageUrl) return null;
  return { type: "image" as const, src: imageUrl };
}

function getShotImageUrl(shot: Shot) {
  if (shot.image?.asset?.url) return shot.image.asset.url;
  if (!shot.image?.asset?._ref || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return "";
  return urlFor(shot.image).width(900).height(1100).fit("crop").url();
}
