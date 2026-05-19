import type { Shot } from "@/types/content";
import { Navigation } from "@/components/layout/Navigation";
import { ShotLightbox } from "./ShotLightbox";

export function ShotsPage({ shots, locale }: { shots: Shot[]; locale: "ru" | "en" }) {
  const nextLocale = locale === "ru" ? "en" : "ru";

  return (
    <>
      <Navigation locale={locale} alternateHref={`/${nextLocale}/shots`} />
      <main className="container shots-page motion-reveal">
        <p className="mono-label motion-reveal">VISUAL NOTES</p>
        <ShotLightbox shots={shots} />
      </main>
    </>
  );
}
