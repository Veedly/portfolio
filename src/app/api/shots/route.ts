import { localizeRequired } from "@/i18n/localize";
import { sanityFetch } from "@/sanity/client";
import { shotsPageQuery } from "@/sanity/queries";
import type { RawLocalizedShotsPage, Shot } from "@/types/content";

const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 30;
const locales = new Set(["ru", "en"]);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = locales.has(url.searchParams.get("locale") || "") ? (url.searchParams.get("locale") as "ru" | "en") : "en";
  const start = clampNumber(url.searchParams.get("start"), 0, 10000, 0);
  const limit = clampNumber(url.searchParams.get("limit"), 1, MAX_LIMIT, DEFAULT_LIMIT);
  const tag = url.searchParams.get("tag") || "all";
  const end = start + limit;

  const data = await sanityFetch<RawLocalizedShotsPage>(shotsPageQuery, {
    locale,
    tag,
    start,
    end,
  });

  const shots = localizeShots(data.items || [], locale);

  return Response.json({
    shots,
    total: data.total || 0,
    nextStart: start + shots.length,
    hasMore: start + shots.length < (data.total || 0),
  });
}

function localizeShots(shots: RawLocalizedShotsPage["items"], locale: "ru" | "en"): Shot[] {
  return (shots || []).map((shot) => ({
    ...shot,
    title: localizeRequired(shot.title, locale, ""),
    tags: localizeRequired(shot.tags, locale, []),
  }));
}

function clampNumber(value: string | null, min: number, max: number, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(Math.trunc(parsed), min), max);
}
