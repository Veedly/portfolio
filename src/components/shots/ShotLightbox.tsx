"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { FlipReveal, FlipRevealItem } from "@/components/flip-reveal";
import { urlFor } from "@/sanity/image";
import type { Shot } from "@/types/content";

export function ShotLightbox({ shots }: { shots: Shot[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState("all");
  const tags = useMemo(() => Array.from(new Set(shots.flatMap((shot) => shot.tags || []))), [shots]);
  const active = activeIndex === null ? null : shots[activeIndex] || null;
  const hasMultipleShots = shots.length > 1;

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showPrevious = useCallback(() => {
    setActiveIndex((index) => {
      if (index === null || !shots.length) return index;
      return (index - 1 + shots.length) % shots.length;
    });
  }, [shots.length]);

  const showNext = useCallback(() => {
    setActiveIndex((index) => {
      if (index === null || !shots.length) return index;
      return (index + 1) % shots.length;
    });
  }, [shots.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, closeLightbox, showNext, showPrevious]);

  return (
    <>
      <div className="shots-filter-bar motion-reveal motion-delay-1" aria-label="Shot categories">
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
              <button type="button" onClick={() => setActiveIndex(index)} className="shot-card-button">
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

      {active && typeof document !== "undefined"
        ? createPortal(
            <div role="dialog" aria-modal="true" onClick={closeLightbox} className="shot-lightbox">
              <div
                className="shot-lightbox-panel"
                onClick={(event) => {
                  const target = event.target;
                  if (target instanceof Element && target.closest("img, video")) {
                    event.stopPropagation();
                    return;
                  }

                  closeLightbox();
                }}
              >
                {hasMultipleShots ? (
                  <>
                    <button
                      type="button"
                      className="shot-lightbox-nav shot-lightbox-nav--prev"
                      aria-label="Previous shot"
                      onClick={(event) => {
                        event.stopPropagation();
                        showPrevious();
                      }}
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      className="shot-lightbox-nav shot-lightbox-nav--next"
                      aria-label="Next shot"
                      onClick={(event) => {
                        event.stopPropagation();
                        showNext();
                      }}
                    >
                      →
                    </button>
                  </>
                ) : null}
                {getShotMedia(active)?.type === "video" ? (
                  <video src={getShotMedia(active)?.src} poster={getShotMedia(active)?.poster} controls autoPlay playsInline />
                ) : getShotMedia(active)?.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={getShotMedia(active)?.src} alt={active.title || "Shot"} />
                ) : null}
                {active.title ? <p className="mono-label">{active.title}</p> : null}
              </div>
            </div>,
            document.body,
          )
        : null}
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
