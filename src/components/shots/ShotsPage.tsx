import type { Shot } from "@/types/content";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { ShotLightbox } from "./ShotLightbox";

export function ShotsPage({ shots, locale }: { shots: Shot[]; locale: "ru" | "en" }) {
  const nextLocale = locale === "ru" ? "en" : "ru";

  return (
    <>
      <Navigation locale={locale} alternateHref={`/${nextLocale}/shots`} />
      <main className="container shots-page">
        <p className="mono-label">VISUAL NOTES</p>
        <ShotLightbox shots={shots} />
      </main>
      <Footer />
    </>
  );
}
