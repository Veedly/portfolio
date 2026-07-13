import { notFound } from "next/navigation";
import { HomePage } from "@/components/home/HomePage";
import { isLocale, type Locale } from "@/i18n/config";
import { localizeRequired } from "@/i18n/localize";
import { sanityFetch } from "@/sanity/client";
import { homeQuery } from "@/sanity/queries";
import type {
  CaseSummary,
  Experience,
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
  role: "Senior Product Designer",
  intro: "I design fintech, crypto, and B2B products: from architecture and complex user flows to design systems and launch.",
  heroMeta: "7+ years of experience · Mobile & Web · Fintech · Design Systems · Motion & 3D",
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
    status: "In development · Launching Fall 2026",
    coverImage: trillionsCoverImage,
  },
  {
    title: "Nibble Invest",
    slug: "nibble-invest",
    subtitle: "Investment product interface and design system",
    year: "2024",
    tags: ["FINTECH", "MOBILE", "PRODUCT"],
    status: "Design delivered",
  },
  {
    title: "CRM List",
    slug: "crm-list",
    subtitle: "Operational CRM for internal sales workflows",
    year: "2023",
    tags: ["B2B", "CRM", "WEB APP"],
    status: "Launched",
  },
];

const fallbackShots: Shot[] = [
  { title: "Banking dashboard", tags: ["WEB", "FINTECH"], year: "2025" },
  { title: "Mobile finance concept", tags: ["MOBILE", "UI"], year: "2025" },
  { title: "CRM cards", tags: ["B2B", "SYSTEM"], year: "2024" },
  { title: "Design system tokens", tags: ["SYSTEM"], year: "2024" },
];

const fallbackExperience: Experience[] = [
  { company: "INFINOX", role: "Product Designer · Contract", period: "2025 — н.в.", summary: "Crypto banking, trading platforms, design systems" },
  { company: "NLPC", role: "Lead Product Designer", period: "2021 — н.в.", summary: "International client products for healthcare, EdTech and fintech" },
  { company: "IT Smart Finance", role: "Product Designer", period: "2023-2025", summary: "Personal account, internal systems, investment products" },
  { company: "Altessa Solution", role: "Senior UX/UI Designer", period: "2022-2023" },
  { company: "Synergy Web", role: "Lead Designer", period: "2020-2021" },
  { company: "Maslo Media", role: "Web Designer", period: "2019-2020" },
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
        heroMeta: localizeRequired(data.settings.heroMeta, locale, fallbackSettings.heroMeta || ""),
        heroImageDark: data.settings.heroImageDark,
        heroImageLight: data.settings.heroImageLight,
        availabilityStatus: localizeRequired(
          data.settings.availabilityStatus,
          locale,
          fallbackSettings.availabilityStatus || "",
        ),
        footerNote: localizeRequired(data.settings.footerNote, locale, fallbackSettings.footerNote || ""),
        cvFile: data.settings.cvFile,
      }
    : fallbackSettings;

  const hasCmsCases = Boolean(data.featuredCases?.length);
  const featuredCases = (hasCmsCases ? data.featuredCases || [] : fallbackCases).map((item) => ({
    ...item,
    title: localizeRequired(item.title, locale, item.slug),
    subtitle: localizeRequired(item.subtitle, locale, ""),
    tags: localizeRequired(item.tags, locale, []),
    status: localizeRequired(item.status, locale, ""),
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
    summary: localizeRequired(item.summary, locale, ""),
  }));

  return (
    <HomePage
      settings={settings}
      locale={locale}
      featuredCases={featuredCases}
      featuredShots={featuredShots}
      experience={experience}
    />
  );
}
