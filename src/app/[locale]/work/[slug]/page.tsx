import { notFound } from "next/navigation";
import { CasePage } from "@/components/case/CasePage";
import { isLocale, type Locale } from "@/i18n/config";
import { localizeRequired, type Localized } from "@/i18n/localize";
import { sanityFetch } from "@/sanity/client";
import { caseBySlugQuery, caseSlugsQuery, featuredCaseSuggestionsQuery } from "@/sanity/queries";
import type { CaseBlock, CaseDetail, CaseSummary, RawLocalizedCase, RawLocalizedCaseSummary } from "@/types/content";

type Params = { locale: string; slug: string };
type RawBlock = Record<string, unknown> & { _type?: string };

const trillionsCoverImage = {
  alt: "Trillions crypto banking dashboard on a laptop",
  asset: { url: "/images/trillions-cover.jpg" },
};

const fallbackCase: CaseDetail = {
  title: "Trillions",
  slug: "trillions",
  subtitle: "Web version of a crypto bank",
  year: "2025",
  role: "Product Designer",
  client: "Trillions",
  scope: "Fintech · Web · Design System",
  tags: ["FINTECH", "WEB", "DESIGN SYSTEM"],
  coverImage: trillionsCoverImage,
  blocks: [
    {
      _type: "contextGrid",
      items: [
        { title: "Product", text: "A web interface for working with fiat and crypto accounts in one product." },
        { title: "Audience", text: "Users who need clear balances, transactions, transfers, and analytics." },
        { title: "Constraint", text: "The interface had to support complex finance logic without looking overloaded." },
        { title: "Scope", text: "Information architecture, UX flows, UI, and design system foundations." },
      ],
    },
    {
      _type: "richTextSection",
      label: "ПРОБЛЕМА",
      body: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "The product had many money operations, but users needed a calmer structure that made account state, movement of funds, and next actions obvious.",
            },
          ],
        },
      ],
    },
    {
      _type: "goalMetrics",
      goal: "Make core money flows easier to understand and measure the effect through activation, successful transactions, and reduced support load.",
      metrics: [
        { key: "Activation", value: "How many users complete the first important account setup step." },
        { key: "Successful transfer", value: "Share of transfer flows completed without support or repeated attempts." },
        { key: "Time to action", value: "Average time from dashboard open to a target transaction." },
      ],
    },
    {
      _type: "callout",
      label: "Гипотеза",
      text: "If balances, accounts, and actions are grouped around user intent, complex finance operations become easier to complete.",
    },
    {
      _type: "solutions",
      items: [
        {
          title: "Account model",
          text: "Separated fiat and crypto accounts while keeping the overview compact enough for fast scanning.",
          images: [{}, {}],
        },
        {
          title: "Dashboard logic",
          text: "Moved key actions and analytics into one surface so users can understand state before acting.",
          images: [{}],
        },
        {
          title: "Transaction clarity",
          text: "Structured history and transfer states around the questions users ask most often.",
          images: [{}],
        },
      ],
    },
    {
      _type: "featureGrid",
      intro: "The first version covered the core functions needed for a coherent banking web product.",
      items: [
        { title: "2FA authorization" },
        { title: "Fiat and crypto accounts" },
        { title: "Transaction history" },
        { title: "Analytics dashboards" },
        { title: "Transfers and exchange" },
        { title: "Reports" },
        { title: "Support" },
        { title: "Profile" },
      ],
    },
    {
      _type: "resultBullets",
      intro: "The result was a structured interface that could scale with new financial scenarios.",
      bullets: [
        "Simplified navigation across accounts and operations.",
        "Clearer account model for fiat and crypto balances.",
        "Reusable UI patterns for dashboards, tables, cards, and actions.",
        "A foundation for future product and design system work.",
      ],
    },
    {
      _type: "comparisonCards",
      items: [
        { label: "variant", title: "Old flow", success: "62%", giveup: "24%", time: "3:40" },
        { label: "winner", title: "Grouped actions", success: "81%", giveup: "10%", time: "2:10" },
      ],
      note: "Numbers here are placeholders for the CMS model and can be replaced with real product metrics later.",
    },
    {
      _type: "takeaways",
      items: [
        { title: "Logic first", body: "Finance UI works better when the product model is clear before visual polish starts." },
        { title: "Patterns scale", body: "Reusable account, action, and data patterns reduce future feature cost." },
        { title: "Calm surfaces", body: "Complex information can feel simpler when hierarchy and rhythm are strict." },
      ],
    },
  ],
};

const fallbackRelatedCases: CaseSummary[] = [
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

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(caseSlugsQuery).catch(() => [{ slug: "trillions" }]);
  return ["ru", "en"].flatMap((locale) => slugs.map((item) => ({ locale, slug: item.slug })));
}

export default async function WorkCasePage({ params }: { params: Promise<Params> }) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const [item, relatedItems] = await Promise.all([
    sanityFetch<RawLocalizedCase | null>(caseBySlugQuery, { slug }).catch(() => null),
    sanityFetch<RawLocalizedCaseSummary[]>(featuredCaseSuggestionsQuery, { slug }).catch(() => []),
  ]);
  const source = item || (slug === fallbackCase.slug ? fallbackCase : null);
  const isFallbackCase = !item;

  if (!source) notFound();

  const localizedItem: CaseDetail = {
    ...source,
    title: localizeRequired(source.title, locale, source.slug),
    subtitle: localizeRequired(source.subtitle, locale, ""),
    role: localizeRequired(source.role, locale, ""),
    client: localizeRequired(source.client, locale, ""),
    scope: localizeRequired(source.scope, locale, ""),
    tags: localizeRequired(source.tags, locale, []),
    coverImage: source.coverImage || (isFallbackCase && source.slug === "trillions" ? trillionsCoverImage : undefined),
    blocks: localizeCaseBlocks(source.blocks || [], locale),
  };

  const relatedCases = (relatedItems.length ? relatedItems : fallbackRelatedCases)
    .filter((relatedCase) => relatedCase.slug !== slug)
    .map((relatedCase) => ({
      ...relatedCase,
      title: localizeRequired(relatedCase.title, locale, relatedCase.slug),
      subtitle: localizeRequired(relatedCase.subtitle, locale, ""),
      tags: localizeRequired(relatedCase.tags, locale, []),
    }));

  return <CasePage item={localizedItem} locale={locale} relatedCases={relatedCases} />;
}

function localizeCaseBlocks(blocks: unknown[], locale: Locale): CaseBlock[] {
  return blocks
    .map((block) => localizeCaseBlock(block as RawBlock, locale))
    .filter((block): block is CaseBlock => Boolean(block));
}

function localizeCaseBlock(block: RawBlock, locale: Locale): CaseBlock | null {
  switch (block._type) {
    case "contextGrid":
      return {
        _type: "contextGrid",
        items: localizeArray<RawBlock>(block.items).map((item) => ({
          title: text(item.title, locale),
          text: text(item.text, locale),
        })),
      };
    case "richTextSection":
      return {
        _type: "richTextSection",
        label: text(block.label, locale),
        body: localizeRequired(block.body as Localized<unknown[]> | unknown[], locale, []),
      };
    case "goalMetrics":
      return {
        _type: "goalMetrics",
        goal: text(block.goal, locale),
        metrics: localizeArray<RawBlock>(block.metrics).map((metric) => ({
          key: text(metric.key, locale),
          value: text(metric.value, locale),
        })),
      };
    case "callout":
      return { _type: "callout", label: text(block.label, locale), text: text(block.text, locale) };
    case "solutions":
      return {
        _type: "solutions",
        items: localizeArray<RawBlock>(block.items).map((item) => ({
          title: text(item.title, locale),
          text: text(item.text, locale),
          images: localizeArray(item.images),
        })),
      };
    case "featureGrid":
      return {
        _type: "featureGrid",
        intro: text(block.intro, locale),
        items: localizeArray<RawBlock>(block.items).map((item) => ({ title: text(item.title, locale) })),
      };
    case "resultBullets":
      return {
        _type: "resultBullets",
        intro: text(block.intro, locale),
        bullets: localizeArray<RawBlock | string>(block.bullets)
          .map((item) => (typeof item === "string" ? item : text(item.text, locale)))
          .filter(Boolean),
      };
    case "comparisonCards":
      return {
        _type: "comparisonCards",
        items: localizeArray<RawBlock>(block.items).map((item) => ({
          label: text(item.label, locale),
          title: text(item.title, locale),
          success: text(item.success, locale),
          giveup: text(item.giveup, locale),
          time: text(item.time, locale),
        })),
        note: text(block.note, locale),
      };
    case "takeaways":
      return {
        _type: "takeaways",
        items: localizeArray<RawBlock>(block.items).map((item) => ({
          title: text(item.title, locale),
          body: text(item.body, locale),
        })),
      };
    default:
      return null;
  }
}

function text(value: unknown, locale: Locale) {
  return localizeRequired(value as Localized<string> | string | null | undefined, locale, "");
}

function localizeArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}
