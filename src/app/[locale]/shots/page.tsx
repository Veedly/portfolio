import { notFound } from "next/navigation";
import { ShotsPage } from "@/components/shots/ShotsPage";
import { isLocale, type Locale } from "@/i18n/config";
import { localizeRequired } from "@/i18n/localize";
import { sanityFetch } from "@/sanity/client";
import { shotsQuery } from "@/sanity/queries";
import type { RawLocalizedShot, Shot } from "@/types/content";

type Params = { locale: string };

const fallbackShots: Shot[] = [
  { title: "Banking dashboard", tags: ["WEB", "FINTECH"], year: "2025" },
  { title: "Finance mobile concept", tags: ["MOBILE", "FINTECH"], year: "2025" },
  { title: "Trading widgets", tags: ["WEB", "DATA"], year: "2024" },
  { title: "CRM pipeline", tags: ["B2B", "CRM"], year: "2024" },
  { title: "Design system cards", tags: ["SYSTEM"], year: "2024" },
  { title: "Onboarding flow", tags: ["UX", "MOBILE"], year: "2023" },
];

export default async function ShotsRoute({ params }: { params: Promise<Params> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const shots = await sanityFetch<RawLocalizedShot[]>(shotsQuery).catch(() => []);
  const source = shots.length ? shots : fallbackShots;
  const localizedShots = source.map((shot) => ({
    ...shot,
    title: localizeRequired(shot.title, locale, ""),
    tags: localizeRequired(shot.tags, locale, []),
  }));

  return <ShotsPage shots={localizedShots} locale={locale} />;
}
