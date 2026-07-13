import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { ProjectShowcase, type ShowcaseProject } from "@/components/project-showcase";
import { urlFor } from "@/sanity/image";
import type { CaseDetail, CaseSummary } from "@/types/content";
import { CaseBlockRenderer } from "./CaseBlockRenderer";

export function CasePage({ item, locale, relatedCases = [] }: { item: CaseDetail; locale: "ru" | "en"; relatedCases?: CaseSummary[] }) {
  const nextLocale = locale === "ru" ? "en" : "ru";
  const coverUrl = getCaseCoverUrl(item);
  const showcaseProjects = relatedCases.map((relatedCase) => toShowcaseProject(relatedCase, locale));
  const labels = locale === "ru"
    ? { back: "← Назад ко всем работам", year: "Год", status: "Статус", role: "Роль", client: "Клиент", scope: "Скоуп" }
    : { back: "← Back to all work", year: "Year", status: "Status", role: "Role", client: "Client", scope: "Scope" };

  return (
    <>
      <Navigation locale={locale} alternateHref={`/${nextLocale}/work/${item.slug}`} />
      <main>
        <section className="container motion-reveal" style={{ padding: "48px 0 40px" }}>
          <div className="mono-label motion-reveal" style={{ display: "flex", justifyContent: "space-between" }}>
            <Link href={`/${locale}#work`}>{labels.back}</Link>
            <span>{item.year}</span>
          </div>
          <div style={{ textAlign: "center", marginTop: 38 }}>
            <h1
              className="motion-reveal motion-delay-1"
              style={{
                fontFamily: "var(--font-hero)",
                fontSize: "clamp(64px, 8vw, 88px)",
                lineHeight: 1,
                fontWeight: 400,
                margin: 0,
              }}
            >
              {item.title}
            </h1>
            <p
              className="motion-reveal motion-delay-2"
              style={{ fontSize: 18, lineHeight: "28px", color: "var(--color-text-secondary)" }}
            >
              {item.subtitle}
            </p>
          </div>
          <div
            className="case-meta-grid motion-reveal motion-delay-3"
            style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 20, marginTop: 52 }}
          >
            <Meta label={labels.year} value={item.year} />
            <Meta label={labels.status} value={item.status} />
            <Meta label={labels.role} value={item.role} />
            <Meta label={labels.client} value={item.client} />
            <Meta label={labels.scope} value={item.scope} />
          </div>
          {item.statusDetails ? <p className="case-status-details motion-reveal motion-delay-4">{item.statusDetails}</p> : null}
        </section>
        <div className="container motion-reveal motion-delay-4">
          {coverUrl ? (
            <div className="case-cover-media case-cover-media--detail">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverUrl} alt={item.coverImage?.alt || item.title} loading="eager" />
            </div>
          ) : (
            <div className="case-cover-placeholder" aria-label={item.title}>
              <span className="mono-label">{item.year}</span>
              <strong>{item.title}</strong>
            </div>
          )}
        </div>
        <CaseBlockRenderer blocks={item.blocks || []} locale={locale} />
        <div className="container motion-reveal">
          <ProjectShowcase eyebrow={locale === "ru" ? "Другие кейсы" : "More cases"} projects={showcaseProjects} />
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}

function Meta({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="mono-label">{label}</p>
      <p style={{ margin: "8px 0 0" }}>{value || "—"}</p>
    </div>
  );
}

function getCaseCoverUrl(item: CaseDetail) {
  if (item.coverImage?.asset?.url) return item.coverImage.asset.url;
  if (!item.coverImage?.asset?._ref || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return "";
  return urlFor(item.coverImage).width(1400).height(917).fit("crop").url();
}

function toShowcaseProject(item: CaseSummary, locale: "ru" | "en"): ShowcaseProject {
  return {
    title: item.title,
    description: item.subtitle,
    year: item.year,
    link: `/${locale}/work/${item.slug}`,
    image: getShowcasePreviewUrl(item),
  };
}

function getShowcasePreviewUrl(item: CaseSummary) {
  const previewImage = item.showcasePreviewImage || item.coverImage;
  if (previewImage?.asset?.url) return previewImage.asset.url;
  if (!previewImage?.asset?._ref || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return "";
  return urlFor(previewImage).width(600).height(392).fit("crop").url();
}
