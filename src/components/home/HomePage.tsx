import type { CaseSummary, Experience, FocusItem, Shot, SiteSettings } from "@/types/content";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { AboutFocus } from "./AboutFocus";
import { ExperienceSection } from "./ExperienceSection";
import { FeaturedWork } from "./FeaturedWork";
import { ShotsStrip } from "./ShotsStrip";

type HomePageProps = {
  locale: "ru" | "en";
  settings: SiteSettings;
  featuredCases: CaseSummary[];
  featuredShots: Shot[];
  experience: Experience[];
  focus: FocusItem[];
};

export function HomePage({ locale, settings, featuredCases, featuredShots, experience, focus }: HomePageProps) {
  return (
    <>
      <Navigation
        locale={locale}
        alternateHref={`/${locale === "ru" ? "en" : "ru"}`}
        availabilityStatus={settings.availabilityStatus}
      />
      <main>
        <section
          className="container hero-section"
          style={{ minHeight: 720, display: "grid", placeItems: "center", textAlign: "center" }}
        >
          <div>
            <div
              aria-hidden
              style={{
                width: 150,
                height: 150,
                borderRadius: 32,
                background: "#d9d9d9",
                margin: "0 auto 34px",
              }}
            />
            <p className="mono-label" style={{ color: "var(--color-text-primary)" }}>
              {settings.role}
            </p>
            <h1 className="hero-display" style={{ margin: "20px 0" }}>
              {settings.name}
            </h1>
            <p style={{ color: "var(--color-text-secondary)", lineHeight: "24px", maxWidth: 420, margin: "0 auto" }}>
              {settings.intro}
            </p>
          </div>
        </section>
        <FeaturedWork cases={featuredCases} locale={locale} />
        <ShotsStrip shots={featuredShots} locale={locale} />
        <ExperienceSection items={experience} />
        <AboutFocus focus={focus} locale={locale} />
      </main>
      <Footer
        telegram={settings.telegram}
        email={settings.email}
        behance={settings.behance}
        footerNote={settings.footerNote}
      />
    </>
  );
}
