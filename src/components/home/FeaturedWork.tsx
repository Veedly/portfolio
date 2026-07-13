import Link from "next/link";
import { urlFor } from "@/sanity/image";
import type { CaseSummary } from "@/types/content";

export function FeaturedWork({ cases, locale }: { cases: CaseSummary[]; locale: "ru" | "en" }) {
  if (!cases.length) return null;

  return (
    <section id="work" className="container motion-reveal" style={{ padding: "0 0 80px" }}>
      <div className="mono-label motion-reveal" style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
        <span>{locale === "ru" ? "ИЗБРАННЫЕ ПРОЕКТЫ" : "FEATURED WORK"}</span>
        <span>2020 - 2026</span>
      </div>
      <div style={{ display: "grid", gap: 16 }}>
        {cases.map((item, index) => {
          const imageUrl = getCaseImageUrl(item);

          return (
            <Link
              key={item.slug}
              href={`/${locale}/work/${item.slug}`}
              className="project-card motion-reveal"
              style={{ display: "grid", gap: 24, padding: "10px 0 24px" }}
            >
              {imageUrl ? (
                <div className="case-cover-media case-cover-media--preview">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageUrl} alt={item.coverImage?.alt || item.title} loading="lazy" />
                </div>
              ) : (
                <CaseImagePlaceholder index={index} title={item.title} />
              )}
              <div className="project-row-meta" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-hero)",
                      fontSize: 42,
                      lineHeight: "44px",
                      fontWeight: 400,
                      margin: 0,
                    }}
                  >
                    {item.title}
                  </h2>
                  <p className="mono-label" style={{ color: "var(--color-text-secondary)", marginTop: 4 }}>
                    {item.tags?.join(" · ")}
                  </p>
                </div>
                <div>
                  {item.status ? <p className="mono-label project-status">{item.status}</p> : null}
                  <p style={{ margin: item.status ? "12px 0 0" : 0, lineHeight: "24px" }}>{item.subtitle}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function getCaseImageUrl(item: CaseSummary) {
  if (item.coverImage?.asset?.url) return item.coverImage.asset.url;
  if (!item.coverImage?.asset?._ref || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return "";
  return urlFor(item.coverImage).width(1000).height(600).fit("crop").url();
}

function CaseImagePlaceholder({ index, title }: { index: number; title: string }) {
  return (
    <div className="case-image-placeholder" aria-label={title}>
      <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
      <strong>{title}</strong>
    </div>
  );
}
