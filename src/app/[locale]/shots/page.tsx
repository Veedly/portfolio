import { notFound } from "next/navigation";
import { ShotsPage } from "@/components/shots/ShotsPage";
import { isLocale, type Locale } from "@/i18n/config";
import { localizeRequired } from "@/i18n/localize";
import { sanityFetch } from "@/sanity/client";
import { shotTagsQuery, shotsPageQuery } from "@/sanity/queries";
import type { RawLocalizedShotTag, RawLocalizedShotsPage, Shot } from "@/types/content";

type Params = { locale: string };
const SHOTS_PAGE_SIZE = 12;

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
  const [shotsData, rawTags] = await Promise.all([
    sanityFetch<RawLocalizedShotsPage>(shotsPageQuery, { locale, tag: "all", start: 0, end: SHOTS_PAGE_SIZE }).catch(() => ({ items: [], total: 0 })),
    sanityFetch<RawLocalizedShotTag[]>(shotTagsQuery).catch(() => []),
  ]);
  const source = shotsData.items?.length ? shotsData.items : fallbackShots;
  const localizedShots = source.map((shot) => ({
    ...shot,
    title: localizeRequired(shot.title, locale, ""),
    tags: localizeRequired(shot.tags, locale, []),
  }));
  const tags = rawTags.map((tag) => localizeRequired(tag.title, locale, "")).filter(Boolean);

  return <ShotsPage shots={localizedShots} tags={tags} locale={locale} hasMore={(shotsData.total || 0) > localizedShots.length} pageSize={SHOTS_PAGE_SIZE} />;
}
