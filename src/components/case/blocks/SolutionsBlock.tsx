import { urlFor } from "@/sanity/image";
import type { CaseBlock, SanityImage } from "@/types/content";

type Solutions = Extract<CaseBlock, { _type: "solutions" }>;
type SolutionItem = Solutions["items"][number];

export function SolutionsBlock({ block }: { block: Solutions }) {
  return (
    <section className="case-solutions motion-reveal" style={{ padding: "80px 0" }}>
      <div
        aria-hidden
        className="mono-label"
        style={{
          display: "flex",
          gap: 36,
          justifyContent: "center",
          borderTop: "1px solid var(--color-border-subtle)",
          borderBottom: "1px solid var(--color-border-subtle)",
          padding: "20px 0",
          color: "var(--color-text-muted)",
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <span key={index}>КЛЮЧЕВЫЕ РЕШЕНИЯ</span>
        ))}
      </div>
      <div className="container" style={{ display: "grid", gap: 80, paddingTop: 80 }}>
        {block.items.map((item, index) => (
          <article key={`${item.title}-${index}`}>
            <div
              className="solution-copy"
              style={{ display: "grid", gridTemplateColumns: "40px 320px 1fr", gap: 16, marginBottom: 40 }}
            >
              <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
              <h2 style={{ fontSize: 28, lineHeight: "30px", fontWeight: 400, margin: 0 }}>{item.title}</h2>
              <p style={{ color: "var(--color-text-secondary)", lineHeight: "24px", margin: 0 }}>{item.text}</p>
            </div>
            <SolutionMedia item={item} />
          </article>
        ))}
      </div>
    </section>
  );
}

function SolutionMedia({ item }: { item: SolutionItem }) {
  const images = item.images || [];
  const videoUrl = item.videoFile?.asset?.url || "";
  const hasMedia = images.length > 0 || videoUrl;

  if (!hasMedia) {
    return <div className="solution-media-placeholder" />;
  }

  return (
    <div
      className="solution-media-grid"
      style={{
        gridTemplateColumns: images.length > 1 && !videoUrl ? "1fr 1fr" : "1fr",
      }}
    >
      {images.map((image, imageIndex) => {
        const src = getImageUrl(image);
        if (!src) return null;

        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={`${src}-${imageIndex}`} src={src} alt={image.alt || item.title} loading="lazy" />
        );
      })}
      {videoUrl ? (
        <video src={videoUrl} muted loop playsInline autoPlay preload="metadata" aria-label={item.title} />
      ) : null}
    </div>
  );
}

function getImageUrl(image: SanityImage) {
  if (image.asset?.url) return image.asset.url;
  if (!image.asset?._ref || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return "";
  return urlFor(image).width(1400).fit("max").url();
}
