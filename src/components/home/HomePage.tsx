import type { CaseSummary, Experience, FocusItem, Shot, SiteSettings } from "@/types/content";
import { urlFor } from "@/sanity/image";
import { BGPattern } from "@/components/bg-pattern";
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
  const darkHeroImageUrl = getHeroImageUrl(settings.heroImageDark);
  const lightHeroImageUrl = getHeroImageUrl(settings.heroImageLight);
  const hasHeroImage = darkHeroImageUrl || lightHeroImageUrl;

  return (
    <>
      <Navigation
        locale={locale}
        alternateHref={`/${locale === "ru" ? "en" : "ru"}`}
        availabilityStatus={settings.availabilityStatus}
      />
      <main>
        <section className="hero-section">
          <BGPattern variant="dots" mask="fade-center" size={22} className="hero-bg-pattern" aria-hidden="true" />
          <div className="container hero-section-inner">
            {hasHeroImage ? (
              <div className="hero-photo-stack motion-reveal">
                {darkHeroImageUrl ? (
                  <div className="hero-photo hero-photo--dark">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={darkHeroImageUrl} alt={settings.heroImageDark?.alt || settings.name} />
                  </div>
                ) : null}
                {lightHeroImageUrl ? (
                  <div className="hero-photo hero-photo--light">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={lightHeroImageUrl} alt={settings.heroImageLight?.alt || settings.name} />
                  </div>
                ) : null}
              </div>
            ) : (
              <div aria-hidden className="hero-mark motion-reveal" />
            )}
            <h1 className="hero-display motion-reveal motion-delay-1" style={{ margin: 0 }}>
              {settings.name}
            </h1>
            <p
              className="mono-label hero-role motion-reveal motion-delay-2"
              style={{ color: "var(--color-text-primary)", margin: "16px 0 0" }}
            >
              {settings.role}
            </p>
            <p
              className="motion-reveal motion-delay-3"
              style={{ color: "var(--color-text-secondary)", lineHeight: "24px", maxWidth: 420, margin: "21px auto 0" }}
            >
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

function getHeroImageUrl(image: SiteSettings["heroImageDark"]) {
  if (image?.asset?.url) return image.asset.url;
  if (!image?.asset?._ref || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return "";
  return urlFor(image).width(420).height(420).fit("crop").url();
}
