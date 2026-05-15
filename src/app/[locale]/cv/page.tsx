import { notFound } from "next/navigation";
import { Navigation } from "@/components/layout/Navigation";
import { isLocale, type Locale } from "@/i18n/config";

type Params = { locale: string };

const copy = {
  ru: {
    label: "CV",
    title: "CV скоро будет здесь",
    text: "Пока это заглушка. Позже здесь можно собрать опыт, навыки, ссылку на PDF и короткую версию резюме.",
  },
  en: {
    label: "CV",
    title: "CV is coming soon",
    text: "This is a placeholder for now. Later it can become a page with experience, skills, a PDF link, and a short resume.",
  },
} satisfies Record<Locale, { label: string; title: string; text: string }>;

export default async function CvPage({ params }: { params: Promise<Params> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const nextLocale = locale === "ru" ? "en" : "ru";
  const content = copy[locale];

  return (
    <>
      <Navigation locale={locale} alternateHref={`/${nextLocale}/cv`} />
      <main className="container cv-placeholder-page">
        <section className="cv-placeholder">
          <p className="mono-label">{content.label}</p>
          <h1 className="cv-placeholder-title">{content.title}</h1>
          <p className="cv-placeholder-text">{content.text}</p>
        </section>
      </main>
    </>
  );
}
