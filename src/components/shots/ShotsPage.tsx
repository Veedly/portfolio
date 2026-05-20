import type { Shot } from "@/types/content";
import { Navigation } from "@/components/layout/Navigation";
import { ShotLightbox } from "./ShotLightbox";

export function ShotsPage({
  shots,
  tags,
  locale,
  hasMore,
  pageSize,
}: {
  shots: Shot[];
  tags: string[];
  locale: "ru" | "en";
  hasMore: boolean;
  pageSize: number;
}) {
  const nextLocale = locale === "ru" ? "en" : "ru";

  return (
    <>
      <Navigation locale={locale} alternateHref={`/${nextLocale}/shots`} />
      <main className="container shots-page motion-reveal">
        <p className="mono-label motion-reveal">VISUAL NOTES</p>
        <ShotLightbox shots={shots} tags={tags} locale={locale} hasMore={hasMore} pageSize={pageSize} />
      </main>
    </>
  );
}
