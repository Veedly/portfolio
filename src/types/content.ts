import type { Localized } from "@/i18n/localize";

export type SanityImage = {
  asset?: {
    _ref?: string;
    url?: string;
  };
  alt?: string;
};

export type SiteSettings = {
  name: string;
  role: string;
  intro: string;
  heroImageDark?: SanityImage;
  heroImageLight?: SanityImage;
  availabilityStatus?: string;
  telegram?: string;
  email?: string;
  behance?: string;
  footerNote?: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
};

export type FocusItem = {
  title: string;
};

export type CaseSummary = {
  title: string;
  slug: string;
  subtitle?: string;
  coverImage?: SanityImage;
  showcasePreviewImage?: SanityImage;
  year?: string;
  tags?: string[];
};

export type Shot = {
  title?: string;
  image?: SanityImage;
  tags?: string[];
  year?: string;
};

export type CaseBlock =
  | { _type: "contextGrid"; items: { title: string; text: string }[] }
  | { _type: "richTextSection"; label: string; body: unknown[] }
  | { _type: "goalMetrics"; goal: string; metrics: { key: string; value: string }[] }
  | { _type: "callout"; label: string; text: string }
  | { _type: "solutions"; items: { title: string; text: string; images?: SanityImage[] }[] }
  | { _type: "featureGrid"; intro?: string; items: { title: string }[] }
  | { _type: "resultBullets"; intro?: string; bullets: string[] }
  | {
      _type: "comparisonCards";
      items: { label?: string; title: string; success?: string; giveup?: string; time?: string }[];
      note?: string;
    }
  | { _type: "takeaways"; items: { title: string; body: string }[] };

export type CaseDetail = CaseSummary & {
  role?: string;
  client?: string;
  scope?: string;
  blocks: CaseBlock[];
};

export type RawLocalizedSiteSettings = {
  name?: Localized<string>;
  role?: Localized<string>;
  intro?: Localized<string>;
  heroImageDark?: SanityImage;
  heroImageLight?: SanityImage;
  availabilityStatus?: Localized<string>;
  telegram?: string;
  email?: string;
  behance?: string;
  footerNote?: Localized<string>;
};

export type RawLocalizedExperience = {
  company?: Localized<string>;
  role?: Localized<string>;
  period?: Localized<string>;
};

export type RawLocalizedFocusItem = {
  title?: Localized<string>;
};

export type RawLocalizedCaseSummary = Omit<CaseSummary, "title" | "subtitle" | "tags"> & {
  title?: Localized<string>;
  subtitle?: Localized<string>;
  tags?: Localized<string[]>;
};

export type RawLocalizedShot = Omit<Shot, "title" | "tags"> & {
  title?: Localized<string>;
  tags?: Localized<string[]>;
};

export type RawLocalizedCase = Omit<
  CaseDetail,
  "title" | "subtitle" | "role" | "client" | "scope" | "tags" | "blocks"
> & {
  title?: Localized<string>;
  subtitle?: Localized<string>;
  role?: Localized<string>;
  client?: Localized<string>;
  scope?: Localized<string>;
  tags?: Localized<string[]>;
  blocks?: unknown[];
};

export type RawHomePayload = {
  settings?: RawLocalizedSiteSettings | null;
  featuredCases?: RawLocalizedCaseSummary[];
  featuredShots?: RawLocalizedShot[];
  experience?: RawLocalizedExperience[];
  focus?: RawLocalizedFocusItem[];
};
