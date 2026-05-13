import type { Shot } from "@/types/content";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { ShotLightbox } from "./ShotLightbox";

export function ShotsPage({ shots, locale }: { shots: Shot[]; locale: "ru" | "en" }) {
  const nextLocale = locale === "ru" ? "en" : "ru";
  const tags = Array.from(new Set(shots.flatMap((shot) => shot.tags || [])));
  const title =
    locale === "ru" ? "Фрагменты интерфейсов, концепты и эксперименты" : "Interface fragments, concepts and experiments";

  return (
    <>
      <Navigation locale={locale} alternateHref={`/${nextLocale}/shots`} />
      <main className="container" style={{ padding: "96px 0 0" }}>
        <p className="mono-label">VISUAL NOTES</p>
        <h1
          style={{
            fontFamily: "var(--font-hero)",
            fontSize: "clamp(64px, 8vw, 112px)",
            lineHeight: 1,
            fontWeight: 400,
            margin: "24px 0",
            maxWidth: 900,
          }}
        >
          {title}
        </h1>
        {tags.length ? (
          <div className="mono-label" style={{ display: "flex", flexWrap: "wrap", gap: 12, margin: "0 0 48px" }}>
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        ) : null}
        <ShotLightbox shots={shots} />
      </main>
      <Footer />
    </>
  );
}
