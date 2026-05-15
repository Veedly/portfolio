import { notFound } from "next/navigation";
import { HomePage } from "@/components/home/HomePage";
import { isLocale, type Locale } from "@/i18n/config";
import { localizeRequired } from "@/i18n/localize";
import { sanityFetch } from "@/sanity/client";
import { homeQuery } from "@/sanity/queries";
import type {
  CaseSummary,
  Experience,
  FocusItem,
  RawHomePayload,
  Shot,
  SiteSettings,
} from "@/types/content";

type Params = { locale: string };

const trillionsCoverImage = {
  alt: "Trillions crypto banking dashboard on a laptop",
  asset: { url: "/images/trillions-cover.jpg" },
};

const fallbackSettings: SiteSettings = {
  name: "Danil Deev",
  role: "PRODUCT DESIGNER",
  intro: "I design digital products from scratch - from research and flows to design systems and prototypes.",
  availabilityStatus: "OPEN FOR PROJECTS",
  telegram: "@veed_ux",
  email: "redogdeev31@gmail.com",
  behance: "portfolio",
  footerNote: "© 2026 / Данил Деев",
};

const fallbackCases: CaseSummary[] = [
  {
    title: "Trillions",
    slug: "trillions",
    subtitle: "Web version of a crypto bank",
    year: "2025",
    tags: ["FINTECH", "WEB", "DESIGN SYSTEM"],
    coverImage: trillionsCoverImage,
  },
  {
    title: "Nibble Invest",
    slug: "nibble-invest",
    subtitle: "Investment product interface and design system",
    year: "2024",
    tags: ["FINTECH", "MOBILE", "PRODUCT"],
  },
  {
    title: "CRM List",
    slug: "crm-list",
    subtitle: "Operational CRM for internal sales workflows",
    year: "2023",
    tags: ["B2B", "CRM", "WEB APP"],
  },
];

const fallbackShots: Shot[] = [
  { title: "Banking dashboard", tags: ["WEB", "FINTECH"], year: "2025" },
  { title: "Mobile finance concept", tags: ["MOBILE", "UI"], year: "2025" },
  { title: "CRM cards", tags: ["B2B", "SYSTEM"], year: "2024" },
  { title: "Design system tokens", tags: ["SYSTEM"], year: "2024" },
];

const fallbackExperience: Experience[] = [
  { company: "INFINOX", role: "Designer", period: "2025-now" },
  { company: "IT Smart Finance", role: "Designer", period: "2023-2025" },
  { company: "Altessa Solutions", role: "Designer", period: "2023-2025" },
  { company: "NLPC", role: "Designer", period: "2022-2023" },
  { company: "Synergy Web", role: "Designer", period: "2021-2022" },
  { company: "Maslo Media", role: "Designer", period: "2020-2021" },
];

const fallbackFocus: FocusItem[] = [
  { title: "Product logic" },
  { title: "Design systems" },
  { title: "Modern UI" },
  { title: "Fintech and B2B interfaces" },
];

export default async function LocaleHomePage({ params }: { params: Promise<Params> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;

  const data = await sanityFetch<RawHomePayload>(homeQuery).catch(() => ({
    settings: null,
    featuredCases: [],
    featuredShots: [],
    experience: [],
    focus: [],
  }));

  const settings = data.settings
    ? {
        ...fallbackSettings,
        telegram: data.settings.telegram || fallbackSettings.telegram,
        email: fallbackSettings.email,
        behance: data.settings.behance || fallbackSettings.behance,
        name: localizeRequired(data.settings.name, locale, fallbackSettings.name),
        role: localizeRequired(data.settings.role, locale, fallbackSettings.role),
        intro: localizeRequired(data.settings.intro, locale, fallbackSettings.intro),
        heroImageDark: data.settings.heroImageDark,
        heroImageLight: data.settings.heroImageLight,
        availabilityStatus: localizeRequired(
          data.settings.availabilityStatus,
          locale,
          fallbackSettings.availabilityStatus || "",
        ),
        footerNote: localizeRequired(data.settings.footerNote, locale, fallbackSettings.footerNote || ""),
      }
    : fallbackSettings;

  const hasCmsCases = Boolean(data.featuredCases?.length);
  const featuredCases = (hasCmsCases ? data.featuredCases || [] : fallbackCases).map((item) => ({
    ...item,
    title: localizeRequired(item.title, locale, item.slug),
    subtitle: localizeRequired(item.subtitle, locale, ""),
    tags: localizeRequired(item.tags, locale, []),
    coverImage: item.coverImage || (!hasCmsCases && item.slug === "trillions" ? trillionsCoverImage : undefined),
  }));

  const featuredShots = (data.featuredShots?.length ? data.featuredShots : fallbackShots).map((item) => ({
    ...item,
    title: localizeRequired(item.title, locale, ""),
    tags: localizeRequired(item.tags, locale, []),
  }));

  const experience = (data.experience?.length ? data.experience : fallbackExperience).map((item) => ({
    company: localizeRequired(item.company, locale, ""),
    role: localizeRequired(item.role, locale, ""),
    period: localizeRequired(item.period, locale, ""),
  }));

  const focus = (data.focus?.length ? data.focus : fallbackFocus).map((item) => ({
    title: localizeRequired(item.title, locale, ""),
  }));

  return (
    <HomePage
      settings={settings}
      locale={locale}
      featuredCases={featuredCases}
      featuredShots={featuredShots}
      experience={experience}
      focus={focus}
    />
  );
}
