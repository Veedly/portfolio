"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FlipReveal, FlipRevealItem } from "@/components/flip-reveal";
import { urlFor } from "@/sanity/image";
import type { Shot } from "@/types/content";

type ShotsApiResponse = {
  shots: Shot[];
  nextStart: number;
  hasMore: boolean;
};

export function ShotLightbox({
  shots: initialShots,
  tags,
  locale = "en",
  hasMore: initialHasMore = false,
  pageSize = 12,
}: {
  shots: Shot[];
  tags?: string[];
  locale?: "ru" | "en";
  hasMore?: boolean;
  pageSize?: number;
}) {
  const [shots, setShots] = useState(initialShots);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState("all");
  const [nextStart, setNextStart] = useState(initialShots.length);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const filterTags = tags?.length ? tags : Array.from(new Set(initialShots.flatMap((shot) => shot.tags || [])));
  const active = activeIndex === null ? null : shots[activeIndex] || null;
  const hasMultipleShots = shots.length > 1;

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showPrevious = useCallback(() => {
    setActiveIndex((index) => {
      if (index === null || !shots.length) return index;
      return (index - 1 + shots.length) % shots.length;
    });
  }, [shots.length]);

  const fetchShots = useCallback(
    async (tag: string, start: number, signal?: AbortSignal): Promise<ShotsApiResponse> => {
      const params = new URLSearchParams({
        locale,
        tag,
        start: String(start),
        limit: String(pageSize),
      });
      const response = await fetch(`/api/shots?${params.toString()}`, { signal });

      if (!response.ok) {
        throw new Error("Failed to load shots");
      }

      return response.json();
    },
    [locale, pageSize],
  );

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const data = await fetchShots(activeTag, nextStart);
      setShots((currentShots) => [...currentShots, ...data.shots]);
      setNextStart(data.nextStart);
      setHasMore(data.hasMore);
    } finally {
      setIsLoading(false);
    }
  }, [activeTag, fetchShots, hasMore, isLoading, nextStart]);

  useEffect(() => {
    setActiveIndex(null);

    if (activeTag === "all") {
      setShots(initialShots);
      setNextStart(initialShots.length);
      setHasMore(initialHasMore);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);

    fetchShots(activeTag, 0, controller.signal)
      .then((data) => {
        setShots(data.shots);
        setNextStart(data.nextStart);
        setHasMore(data.hasMore);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setShots([]);
          setNextStart(0);
          setHasMore(false);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [activeTag, fetchShots, initialHasMore, initialShots]);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void loadMore();
        }
      },
      { rootMargin: "640px 0px" },
    );

    observer.observe(loader);

    return () => observer.disconnect();
  }, [hasMore, loadMore]);

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
        {filterTags.map((tag) => (
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
                    <video ref={muteVideoElement} src={media.src} poster={media.poster} muted loop playsInline autoPlay preload="metadata" />
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

      <div ref={loaderRef} className="shots-load-more" aria-live="polite">
        {isLoading ? "Loading..." : hasMore ? "Scroll to load more" : shots.length ? "All shots loaded" : "No shots"}
      </div>

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
                  <video ref={muteVideoElement} src={getShotMedia(active)?.src} poster={getShotMedia(active)?.poster} controls muted autoPlay playsInline />
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

function muteVideoElement(video: HTMLVideoElement | null) {
  if (!video) return;
  video.defaultMuted = true;
  video.muted = true;
  video.volume = 0;
}
