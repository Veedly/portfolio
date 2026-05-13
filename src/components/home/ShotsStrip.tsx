import Link from "next/link";
import type { Shot } from "@/types/content";
import { urlFor } from "@/sanity/image";

export function ShotsStrip({ shots, locale }: { shots: Shot[]; locale: "ru" | "en" }) {
  if (!shots.length) return null;

  const sliderShots = [...shots.slice(0, 6), ...shots.slice(0, 6)];

  return (
    <section className="shots-strip image-auto-slider" style={{ padding: "80px 0", overflow: "hidden" }}>
      <div className="container mono-label" style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
        <span>GALLERY</span>
        <span style={{ display: "flex", gap: 24 }}>
          <span>HOVER — PAUSES</span>
          <Link href={`/${locale}/shots`}>VIEW ALL</Link>
        </span>
      </div>
      <div className="image-auto-slider__viewport" aria-label="Featured visual shots">
        <div className="image-auto-slider__track">
          {sliderShots.map((shot, index) => (
            <ShotCard key={`${shot.title || "shot"}-${index}`} shot={shot} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ShotCard({ shot, index }: { shot: Shot; index: number }) {
  const imageUrl = getImageUrl(shot);

  return (
    <article className="image-auto-slider__card">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={shot.title || "Portfolio shot"} className="image-auto-slider__image" />
      ) : (
        <div className="image-auto-slider__placeholder" aria-hidden>
          <span>{String((index % 6) + 1).padStart(2, "0")}</span>
        </div>
      )}
      <div className="image-auto-slider__caption">
        <span>{shot.title || "Untitled shot"}</span>
        {shot.tags?.length ? <span>{shot.tags.slice(0, 2).join(" · ")}</span> : null}
      </div>
    </article>
  );
}

function getImageUrl(shot: Shot) {
  if (shot.image?.asset?.url) return shot.image.asset.url;
  if (!shot.image?.asset?._ref || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return "";
  return urlFor(shot.image).width(980).height(736).fit("crop").url();
}
