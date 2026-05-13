# Portfolio CMS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved bilingual product designer portfolio with Next.js, Sanity CMS, Figma-matched pages, typed case blocks, and a locale-prefixed `/shots` gallery.

**Architecture:** The public site uses Next.js App Router with `ru` and `en` locale-prefixed routes and Sanity as the hosted content source. Sanity stores Russian and English fields in the same document via localized objects, and frontend routes resolve localized values before rendering dedicated React components.

**Tech Stack:** Next.js, React, TypeScript, Sanity, `next-sanity`, `@sanity/image-url`, Vitest, Testing Library, CSS Modules/global CSS tokens, Vercel-ready environment variables.

---

## References

- Approved spec: `docs/superpowers/specs/2026-05-13-portfolio-cms-design.md`
- Figma homepage node: `yJGC8u5V0CavVNebOHuZRC`, node `17:859`
- Figma case page node: `yJGC8u5V0CavVNebOHuZRC`, node `18:859`
- Next.js App Router and `create-next-app` docs: https://nextjs.org/docs
- Sanity Next.js and Studio docs: https://www.sanity.io/docs

## File Structure

Create or modify these paths:

- `package.json`: app scripts, dependencies, and test scripts.
- `next.config.ts`: Next.js config.
- `tsconfig.json`: TypeScript config with `@/*` path alias.
- `vitest.config.ts`: test config using `jsdom`.
- `.env.example`: documented Sanity environment keys.
- `src/app/layout.tsx`: root layout, font variables, metadata, global shell.
- `src/app/page.tsx`: redirects root to `/ru`.
- `src/app/[locale]/page.tsx`: localized homepage route.
- `src/app/[locale]/work/[slug]/page.tsx`: localized case detail route.
- `src/app/[locale]/shots/page.tsx`: localized shots gallery route.
- `src/app/studio/[[...tool]]/page.tsx`: embedded Sanity Studio route.
- `src/app/not-found.tsx`: shared 404 page.
- `src/app/globals.css`: design tokens, reset, responsive primitives.
- `src/sanity/env.ts`: validated public Sanity config.
- `src/sanity/client.ts`: Sanity client and fetch helper.
- `src/sanity/image.ts`: Sanity image URL builder.
- `src/sanity/queries.ts`: GROQ queries.
- `src/sanity/schemaTypes/index.ts`: schema export barrel.
- `src/sanity/schemaTypes/case.ts`: case schema.
- `src/sanity/schemaTypes/caseBlocks.ts`: typed case block schemas.
- `src/sanity/schemaTypes/shot.ts`: shot schema.
- `src/sanity/schemaTypes/siteSettings.ts`: site settings schema.
- `src/sanity/schemaTypes/experience.ts`: experience schema.
- `src/sanity/schemaTypes/focusItem.ts`: focus item schema.
- `src/sanity/structure.ts`: Studio sidebar structure.
- `sanity.config.ts`: Sanity Studio config.
- `src/types/content.ts`: frontend content types.
- `src/i18n/config.ts`: locale constants and validation.
- `src/i18n/localize.ts`: helpers for resolving localized Sanity fields.
- `src/lib/format.ts`: small formatting helpers.
- `src/components/layout/Navigation.tsx`: top nav.
- `src/components/layout/Footer.tsx`: contact footer.
- `src/components/home/HomePage.tsx`: homepage composition.
- `src/components/home/FeaturedWork.tsx`: featured case list.
- `src/components/home/ShotsStrip.tsx`: homepage gallery strip.
- `src/components/home/ExperienceSection.tsx`: experience rows.
- `src/components/home/AboutFocus.tsx`: about and focus rows.
- `src/components/case/CasePage.tsx`: case page composition.
- `src/components/case/CaseBlockRenderer.tsx`: typed block dispatcher.
- `src/components/case/blocks/*.tsx`: one renderer per case block type.
- `src/components/shots/ShotsPage.tsx`: shots page composition.
- `src/components/shots/ShotLightbox.tsx`: client lightbox component.
- `src/test/fixtures/content.ts`: sample CMS payloads for tests.
- `src/components/case/CaseBlockRenderer.test.tsx`: block renderer test.
- `src/sanity/queries.test.ts`: query smoke tests.

## Task 1: Scaffold The Next.js App In The Existing Repo

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/[locale]/page.tsx`
- Create: `src/app/globals.css`
- Modify: `.gitignore`

- [ ] **Step 1: Generate a Next.js template outside the repo root**

Run this from `C:\Users\redog\Documents\Codex\2026-05-13\cms`:

```powershell
npx create-next-app@latest .next-template --ts --eslint --app --src-dir --import-alias "@/*" --use-npm --no-tailwind --disable-git
```

Expected: a `.next-template` folder is created with a Next.js app.

- [ ] **Step 2: Copy scaffolded files into the repo root**

Run:

```powershell
Copy-Item -Path ".next-template\*" -Destination "." -Recurse -Force
Remove-Item -LiteralPath ".next-template" -Recurse -Force
```

Expected: root now has `package.json`, `next.config.ts`, `tsconfig.json`, `src/app`, and related Next files.

- [ ] **Step 3: Install CMS and test dependencies**

Run:

```powershell
npm install sanity next-sanity @sanity/image-url @portabletext/react styled-components
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @types/node
```

Expected: dependencies install and `package-lock.json` is created or updated.

- [ ] **Step 4: Replace `package.json` scripts**

Ensure `package.json` has these scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 5: Add app ignore rules**

Ensure `.gitignore` contains:

```gitignore
.superpowers/
node_modules/
.next/
out/
dist/
.env
.env.local
.vercel/
coverage/
```

- [ ] **Step 6: Verify the empty scaffold**

Run:

```powershell
npm run typecheck
npm run build
```

Expected: both commands pass.

- [ ] **Step 7: Commit the scaffold**

Run:

```powershell
git add .
git commit -m "chore: scaffold next app"
```

## Task 2: Add Global Design Tokens And Base Layout

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `src/components/layout/Navigation.tsx`
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Add global CSS tokens**

Replace `src/app/globals.css` with:

```css
:root {
  --color-bg-canvas: #0a0a0a;
  --color-bg-surface: #141414;
  --color-bg-surface-raised: #262626;
  --color-border-subtle: #1d1d1d;
  --color-border-default: #262626;
  --color-text-primary: #f2f2f2;
  --color-text-secondary: #8a8a8a;
  --color-text-muted: #555555;
  --color-accent-success: #6bf29e;
  --content-width: 1000px;
  --font-base: var(--font-inter-tight), Arial, sans-serif;
  --font-hero: var(--font-instrument-serif), Georgia, serif;
  --font-mono: var(--font-jetbrains-mono), "Courier New", monospace;
}

* {
  box-sizing: border-box;
}

html {
  background: var(--color-bg-canvas);
  color: var(--color-text-primary);
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--color-bg-canvas);
  color: var(--color-text-primary);
  font-family: var(--font-base);
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
}

button {
  font: inherit;
}

.page-shell {
  min-height: 100vh;
  background: var(--color-bg-canvas);
}

.container {
  width: min(var(--content-width), calc(100vw - 32px));
  margin: 0 auto;
}

.mono-label {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  color: var(--color-text-muted);
}

.hero-display {
  font-family: var(--font-hero);
  font-size: clamp(72px, 9vw, 140px);
  font-weight: 400;
  line-height: 0.8;
  letter-spacing: 0;
}

@media (max-width: 720px) {
  :root {
    --content-width: 100%;
  }

  .container {
    width: calc(100vw - 24px);
  }
}
```

- [ ] **Step 2: Configure fonts and metadata**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter-tight",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Danil Deev — Product Designer",
  description: "Product designer portfolio with selected case studies and visual work.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${interTight.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable}`}>
      <body>
        <div className="page-shell">{children}</div>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Add `Navigation`**

Create `src/components/layout/Navigation.tsx`:

```tsx
import Link from "next/link";

type NavigationProps = {
  availabilityStatus?: string;
  locale?: "ru" | "en";
  alternateHref?: string;
};

export function Navigation({ availabilityStatus = "OPEN FOR PROJECTS", locale = "ru", alternateHref }: NavigationProps) {
  const nextLocale = locale === "ru" ? "en" : "ru";
  const baseHref = `/${locale}`;

  return (
    <header className="container" style={{ padding: "18px 0" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span aria-hidden style={{ width: 8, height: 8, borderRadius: 999, background: "var(--color-text-primary)" }} />
            <span className="mono-label" style={{ color: "var(--color-text-secondary)" }}>DD</span>
          </Link>
          <div style={{ display: "flex", gap: 16 }}>
            <Link className="mono-label" href={`${baseHref}#work`}>Work</Link>
            <Link className="mono-label" href={`${baseHref}#about`}>Обо мне</Link>
            <Link className="mono-label" href={`${baseHref}/shots`}>Shots</Link>
            <Link className="mono-label" href={`${baseHref}#contacts`}>Контакты</Link>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span className="mono-label" style={{ color: "var(--color-accent-success)" }}>{availabilityStatus}</span>
          <Link className="mono-label" href={alternateHref || `/${nextLocale}`}>RU / EN</Link>
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 4: Add `Footer`**

Create `src/components/layout/Footer.tsx`:

```tsx
type FooterProps = {
  telegram?: string;
  email?: string;
  behance?: string;
  footerNote?: string;
};

export function Footer({ telegram = "@veed_ux", email = "hello@danildeev.design", behance = "portfolio", footerNote = "© 2026 / Данил Деев" }: FooterProps) {
  return (
    <footer id="contacts" style={{ borderTop: "1px solid var(--color-border-subtle)", marginTop: 120, paddingTop: 80 }}>
      <div className="container" style={{ textAlign: "center" }}>
        <p className="mono-label">КОНТАКТЫ</p>
        <h2 style={{ fontFamily: "var(--font-hero)", fontSize: "clamp(56px, 7vw, 88px)", lineHeight: 1, fontWeight: 400, margin: "24px 0 88px" }}>
          Let&apos;s discuss<br />a project
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 24, textAlign: "left" }}>
          <ContactItem label="Telegram" value={telegram} />
          <ContactItem label="Email" value={email} />
          <ContactItem label="Behance" value={behance} />
          <ContactItem label="CV" value="Download CV" />
        </div>
        <div className="mono-label" style={{ borderTop: "1px solid var(--color-border-subtle)", marginTop: 80, padding: "20px 0", display: "flex", justifyContent: "space-between" }}>
          <span>{footerNote}</span>
          <span>Made with care</span>
        </div>
      </div>
    </footer>
  );
}

function ContactItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ color: "var(--color-text-secondary)", margin: 0 }}>{label}</p>
      <p style={{ margin: "4px 0 0" }}>{value}</p>
    </div>
  );
}
```

- [ ] **Step 5: Verify layout compiles**

Run:

```powershell
npm run typecheck
npm run build
```

Expected: both commands pass.

- [ ] **Step 6: Commit design foundation**

Run:

```powershell
git add src/app src/components/layout
git commit -m "feat: add portfolio design foundation"
```

## Task 3: Add Sanity Configuration And Schemas

**Files:**
- Create: `.env.example`
- Create: `sanity.config.ts`
- Create: `src/sanity/env.ts`
- Create: `src/sanity/client.ts`
- Create: `src/sanity/image.ts`
- Create: `src/sanity/schemaTypes/index.ts`
- Create: `src/sanity/schemaTypes/case.ts`
- Create: `src/sanity/schemaTypes/caseBlocks.ts`
- Create: `src/sanity/schemaTypes/shot.ts`
- Create: `src/sanity/schemaTypes/siteSettings.ts`
- Create: `src/sanity/schemaTypes/experience.ts`
- Create: `src/sanity/schemaTypes/focusItem.ts`
- Create: `src/sanity/structure.ts`
- Create: `src/app/studio/[[...tool]]/page.tsx`

- [ ] **Step 1: Add environment example**

Create `.env.example`:

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID=replace_with_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-13
```

- [ ] **Step 2: Add Sanity env helper**

Create `src/sanity/env.ts`:

```ts
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-13";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export function assertSanityEnv() {
  if (!projectId) {
    throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required");
  }
}
```

- [ ] **Step 3: Add Sanity client**

Create `src/sanity/client.ts`:

```ts
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export async function sanityFetch<T>(query: string, params: Record<string, string | number | boolean> = {}) {
  return client.fetch<T>(query, params, { next: { revalidate: 60 } });
}
```

- [ ] **Step 4: Add image URL builder**

Create `src/sanity/image.ts`:

```ts
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from "./env";

const builder = imageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
```

- [ ] **Step 5: Add case block schemas**

Create `src/sanity/schemaTypes/caseBlocks.ts` with schema objects named:

```ts
import { defineArrayMember, defineField, defineType } from "sanity";

const localizedString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "ru", title: "Russian", type: "string" }),
      defineField({ name: "en", title: "English", type: "string" }),
    ],
  });

const localizedText = (name: string, title: string, rows = 3) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "ru", title: "Russian", type: "text", rows }),
      defineField({ name: "en", title: "English", type: "text", rows }),
    ],
  });

const localizedBlocks = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "ru", title: "Russian", type: "array", of: [{ type: "block" }] }),
      defineField({ name: "en", title: "English", type: "array", of: [{ type: "block" }] }),
    ],
  });

export const contextGrid = defineType({
  name: "contextGrid",
  title: "Context grid",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            localizedString("title", "Title"),
            localizedText("text", "Text"),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1).required(),
    }),
  ],
});

export const richTextSection = defineType({
  name: "richTextSection",
  title: "Rich text section",
  type: "object",
  fields: [
    localizedString("label", "Label"),
    localizedBlocks("body", "Body"),
  ],
});

export const goalMetrics = defineType({
  name: "goalMetrics",
  title: "Goal and metrics",
  type: "object",
  fields: [
    localizedText("goal", "Goal"),
    defineField({
      name: "metrics",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            localizedString("key", "Key"),
            localizedText("value", "Value", 2),
          ],
        }),
      ],
    }),
  ],
});

export const callout = defineType({
  name: "callout",
  title: "Callout",
  type: "object",
  fields: [
    localizedString("label", "Label"),
    localizedText("text", "Text"),
  ],
});

export const solutions = defineType({
  name: "solutions",
  title: "Solutions",
  type: "object",
  fields: [
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            localizedString("title", "Title"),
            localizedText("text", "Text", 4),
            defineField({ name: "images", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
          ],
        }),
      ],
    }),
  ],
});

export const featureGrid = defineType({
  name: "featureGrid",
  title: "Feature grid",
  type: "object",
  fields: [
    localizedText("intro", "Intro", 2),
    defineField({
      name: "items",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: [localizedString("title", "Title")] })],
    }),
  ],
});

export const resultBullets = defineType({
  name: "resultBullets",
  title: "Result bullets",
  type: "object",
  fields: [
    localizedText("intro", "Intro", 2),
    defineField({ name: "bullets", type: "array", of: [defineArrayMember({ type: "object", fields: [localizedString("text", "Text")] })], validation: (Rule) => Rule.min(1) }),
  ],
});

export const comparisonCards = defineType({
  name: "comparisonCards",
  title: "Comparison cards",
  type: "object",
  fields: [
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            localizedString("label", "Label"),
            localizedString("title", "Title"),
            defineField({ name: "success", type: "string" }),
            defineField({ name: "giveup", type: "string" }),
            defineField({ name: "time", type: "string" }),
          ],
        }),
      ],
    }),
    localizedText("note", "Note", 2),
  ],
});

export const takeaways = defineType({
  name: "takeaways",
  title: "Takeaways",
  type: "object",
  fields: [
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            localizedString("title", "Title"),
            localizedText("body", "Body", 4),
          ],
        }),
      ],
    }),
  ],
});
```

- [ ] **Step 6: Add document schemas**

Create `src/sanity/schemaTypes/case.ts`:

```ts
import { defineArrayMember, defineField, defineType } from "sanity";

const localizedString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "ru", title: "Russian", type: "string" }),
      defineField({ name: "en", title: "English", type: "string" }),
    ],
  });

const localizedText = (name: string, title: string, rows = 2) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "ru", title: "Russian", type: "text", rows }),
      defineField({ name: "en", title: "English", type: "text", rows }),
    ],
  });

const localizedStringArray = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "ru", title: "Russian", type: "array", of: [{ type: "string" }] }),
      defineField({ name: "en", title: "English", type: "array", of: [{ type: "string" }] }),
    ],
  });

export const caseType = defineType({
  name: "case",
  title: "Case",
  type: "document",
  fields: [
    localizedString("title", "Title"),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    localizedText("subtitle", "Subtitle"),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "year", type: "string" }),
    localizedString("role", "Role"),
    localizedString("client", "Client"),
    localizedString("scope", "Scope"),
    localizedStringArray("tags", "Tags"),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "featuredOrder", type: "number", initialValue: 0 }),
    defineField({
      name: "blocks",
      type: "array",
      of: [
        defineArrayMember({ type: "contextGrid" }),
        defineArrayMember({ type: "richTextSection" }),
        defineArrayMember({ type: "goalMetrics" }),
        defineArrayMember({ type: "callout" }),
        defineArrayMember({ type: "solutions" }),
        defineArrayMember({ type: "featureGrid" }),
        defineArrayMember({ type: "resultBullets" }),
        defineArrayMember({ type: "comparisonCards" }),
        defineArrayMember({ type: "takeaways" }),
      ],
    }),
  ],
});
```

Create `src/sanity/schemaTypes/shot.ts`:

```ts
import { defineField, defineType } from "sanity";

const localizedString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "ru", title: "Russian", type: "string" }),
      defineField({ name: "en", title: "English", type: "string" }),
    ],
  });

const localizedStringArray = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "ru", title: "Russian", type: "array", of: [{ type: "string" }] }),
      defineField({ name: "en", title: "English", type: "array", of: [{ type: "string" }] }),
    ],
  });

export const shotType = defineType({
  name: "shot",
  title: "Shot",
  type: "document",
  fields: [
    defineField({ name: "image", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    localizedString("title", "Title"),
    localizedStringArray("tags", "Tags"),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "relatedCase", type: "reference", to: [{ type: "case" }] }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
    defineField({ name: "published", type: "boolean", initialValue: true }),
  ],
});
```

Create `src/sanity/schemaTypes/siteSettings.ts`:

```ts
import { defineField, defineType } from "sanity";

const localizedString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "ru", title: "Russian", type: "string" }),
      defineField({ name: "en", title: "English", type: "string" }),
    ],
  });

const localizedText = (name: string, title: string, rows = 3) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "ru", title: "Russian", type: "text", rows }),
      defineField({ name: "en", title: "English", type: "text", rows }),
    ],
  });

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    localizedString("name", "Name"),
    localizedString("role", "Role"),
    localizedText("intro", "Intro"),
    localizedString("availabilityStatus", "Availability status"),
    defineField({ name: "telegram", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "behance", type: "url" }),
    defineField({ name: "cvFile", type: "file" }),
    localizedString("footerNote", "Footer note"),
  ],
});
```

Create `src/sanity/schemaTypes/experience.ts`:

```ts
import { defineField, defineType } from "sanity";

export const experienceType = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "company", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "period", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
});
```

Create `src/sanity/schemaTypes/focusItem.ts`:

```ts
import { defineField, defineType } from "sanity";

export const focusItemType = defineType({
  name: "focusItem",
  title: "Focus item",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
});
```

- [ ] **Step 7: Export schema types**

Create `src/sanity/schemaTypes/index.ts`:

```ts
import { caseType } from "./case";
import {
  callout,
  comparisonCards,
  contextGrid,
  featureGrid,
  goalMetrics,
  resultBullets,
  richTextSection,
  solutions,
  takeaways,
} from "./caseBlocks";
import { experienceType } from "./experience";
import { focusItemType } from "./focusItem";
import { shotType } from "./shot";
import { siteSettingsType } from "./siteSettings";

export const schemaTypes = [
  caseType,
  shotType,
  siteSettingsType,
  experienceType,
  focusItemType,
  contextGrid,
  richTextSection,
  goalMetrics,
  callout,
  solutions,
  featureGrid,
  resultBullets,
  comparisonCards,
  takeaways,
];
```

- [ ] **Step 8: Add Sanity config and Studio route**

Create `sanity.config.ts`:

```ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "portfolio-cms",
  title: "Portfolio CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
```

Create `src/app/studio/[[...tool]]/page.tsx`:

```tsx
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

- [ ] **Step 9: Verify Sanity setup**

Create `.env.local` from `.env.example` with the real `NEXT_PUBLIC_SANITY_PROJECT_ID`, then run:

```powershell
npm run typecheck
npm run build
```

Expected: TypeScript and build pass. If the project ID is not available yet, set `NEXT_PUBLIC_SANITY_PROJECT_ID=dummy` temporarily for local compilation only.

- [ ] **Step 10: Commit CMS setup**

Run:

```powershell
git add .env.example sanity.config.ts src/sanity src/app/studio package.json package-lock.json
git commit -m "feat: add sanity cms setup"
```

## Task 4: Add Content Types, Queries, And Query Tests

**Files:**
- Create: `src/i18n/config.ts`
- Create: `src/i18n/localize.ts`
- Create: `src/types/content.ts`
- Create: `src/sanity/queries.ts`
- Create: `vitest.config.ts`
- Create: `src/sanity/queries.test.ts`

- [ ] **Step 0: Add locale helpers**

Create `src/i18n/config.ts`:

```ts
export const locales = ["ru", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
```

Create `src/i18n/localize.ts`:

```ts
import { defaultLocale, type Locale } from "./config";

export type Localized<T> = Partial<Record<Locale, T>>;

export function localize<T>(value: Localized<T> | T | null | undefined, locale: Locale): T | undefined {
  if (!value) return undefined;
  if (typeof value !== "object" || Array.isArray(value)) return value as T;

  const localized = value as Localized<T>;
  return localized[locale] ?? localized[defaultLocale];
}

export function localizeRequired<T>(value: Localized<T> | T | null | undefined, locale: Locale, fallback: T): T {
  return localize(value, locale) ?? fallback;
}
```

- [ ] **Step 1: Add frontend content types**

Create `src/types/content.ts` with exported types:

```ts
import type { Localized } from "@/i18n/localize";

export type SanityImage = {
  asset?: { _ref?: string; url?: string };
  alt?: string;
};

export type SiteSettings = {
  name: string;
  role: string;
  intro: string;
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
  | { _type: "comparisonCards"; items: { label?: string; title: string; success?: string; giveup?: string; time?: string }[]; note?: string }
  | { _type: "takeaways"; items: { title: string; body: string }[] };

export type CaseDetail = CaseSummary & {
  role?: string;
  client?: string;
  scope?: string;
  blocks: CaseBlock[];
};

export type RawLocalizedCase = Omit<CaseDetail, "title" | "subtitle" | "role" | "client" | "scope" | "tags" | "blocks"> & {
  title: Localized<string>;
  subtitle?: Localized<string>;
  role?: Localized<string>;
  client?: Localized<string>;
  scope?: Localized<string>;
  tags?: Localized<string[]>;
  blocks: unknown[];
};
```

- [ ] **Step 2: Add GROQ queries**

Create `src/sanity/queries.ts`:

```ts
export const homeQuery = `{
  "settings": *[_type == "siteSettings"][0]{
    name, role, intro, availabilityStatus, telegram, email, behance, footerNote
  },
  "featuredCases": *[_type == "case" && featured == true] | order(featuredOrder asc) {
    title,
    "slug": slug.current,
    subtitle,
    year,
    tags,
    coverImage
  },
  "featuredShots": *[_type == "shot" && published == true && featured == true] | order(order asc) {
    title,
    image,
    tags,
    year
  },
  "experience": *[_type == "experience"] | order(order asc) {
    company, role, period
  },
  "focus": *[_type == "focusItem"] | order(order asc) {
    title
  }
}`;

export const caseSlugsQuery = `*[_type == "case" && defined(slug.current)]{ "slug": slug.current }`;

export const caseBySlugQuery = `*[_type == "case" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  subtitle,
  coverImage,
  year,
  role,
  client,
  scope,
  tags,
  blocks
}`;

export const shotsQuery = `*[_type == "shot" && published == true] | order(order asc) {
  title,
  image,
  tags,
  year
}`;
```

These queries intentionally return localized objects such as `title.ru` and
`title.en`. Route code resolves them with `localize(...)` after fetching because
the same query payload can serve both locales.

- [ ] **Step 3: Add Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
  },
});
```

- [ ] **Step 4: Add query smoke tests**

Create `src/sanity/queries.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { caseBySlugQuery, homeQuery, shotsQuery } from "./queries";

describe("Sanity queries", () => {
  it("selects homepage content groups", () => {
    expect(homeQuery).toContain('"settings"');
    expect(homeQuery).toContain('"featuredCases"');
    expect(homeQuery).toContain('"featuredShots"');
    expect(homeQuery).toContain('"experience"');
    expect(homeQuery).toContain('"focus"');
  });

  it("filters case pages by slug parameter", () => {
    expect(caseBySlugQuery).toContain("slug.current == $slug");
  });

  it("filters shots to published entries", () => {
    expect(shotsQuery).toContain("published == true");
  });
});
```

- [ ] **Step 5: Run tests**

Run:

```powershell
npm run test
npm run typecheck
```

Expected: all tests and typecheck pass.

- [ ] **Step 6: Commit content data layer**

Run:

```powershell
git add src/types src/sanity/queries.ts src/sanity/queries.test.ts vitest.config.ts package.json package-lock.json
git commit -m "feat: add sanity queries and content types"
```

## Task 5: Build Homepage From CMS Data

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/app/[locale]/page.tsx`
- Create: `src/components/home/HomePage.tsx`
- Create: `src/components/home/FeaturedWork.tsx`
- Create: `src/components/home/ShotsStrip.tsx`
- Create: `src/components/home/ExperienceSection.tsx`
- Create: `src/components/home/AboutFocus.tsx`

- [ ] **Step 1: Add homepage composition**

Create `src/components/home/HomePage.tsx`:

```tsx
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
      <Navigation locale={locale} alternateHref={`/${locale === "ru" ? "en" : "ru"}`} availabilityStatus={settings.availabilityStatus} />
      <main>
        <section className="container" style={{ minHeight: 720, display: "grid", placeItems: "center", textAlign: "center" }}>
          <div>
            <p className="mono-label" style={{ color: "var(--color-text-primary)" }}>{settings.role}</p>
            <h1 className="hero-display" style={{ margin: "20px 0" }}>{settings.name}</h1>
            <p style={{ color: "var(--color-text-secondary)", lineHeight: "24px", maxWidth: 420, margin: "0 auto" }}>{settings.intro}</p>
          </div>
        </section>
        <FeaturedWork cases={featuredCases} />
        <ShotsStrip shots={featuredShots} />
        <ExperienceSection items={experience} />
        <AboutFocus focus={focus} />
      </main>
      <Footer telegram={settings.telegram} email={settings.email} behance={settings.behance} footerNote={settings.footerNote} />
    </>
  );
}
```

- [ ] **Step 2: Add featured work section**

Create `src/components/home/FeaturedWork.tsx`:

```tsx
import Link from "next/link";
import type { CaseSummary } from "@/types/content";

export function FeaturedWork({ cases }: { cases: CaseSummary[] }) {
  return (
    <section id="work" className="container" style={{ padding: "80px 0" }}>
      <div className="mono-label" style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
        <span>FEATURED WORK</span>
        <span>2020 — 2026</span>
      </div>
      <div style={{ display: "grid", gap: 16 }}>
        {cases.map((item) => (
          <Link key={item.slug} href={`/work/${item.slug}`} style={{ display: "grid", gap: 24, padding: "10px 0 24px" }}>
            <div style={{ height: 400, borderRadius: 4, background: "var(--color-bg-surface-raised)" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-hero)", fontSize: 42, lineHeight: "44px", fontWeight: 400, margin: 0 }}>{item.title}</h2>
                <p className="mono-label" style={{ color: "var(--color-text-secondary)", marginTop: 4 }}>{item.tags?.join(" · ")}</p>
              </div>
              <p style={{ margin: 0, lineHeight: "24px" }}>{item.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add shots strip, experience, and about/focus components**

Create `src/components/home/ShotsStrip.tsx`:

```tsx
import Link from "next/link";
import type { Shot } from "@/types/content";

export function ShotsStrip({ shots }: { shots: Shot[] }) {
  if (!shots.length) return null;

  return (
    <section className="container" style={{ padding: "80px 0" }}>
      <div className="mono-label" style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
        <span>GALLERY</span>
        <Link href="/shots">VIEW ALL</Link>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 20 }}>
        {shots.slice(0, 4).map((shot, index) => (
          <div key={`${shot.title || "shot"}-${index}`} style={{ height: 368, border: "1px solid var(--color-bg-surface-raised)", background: "var(--color-bg-surface)" }}>
            <span className="mono-label" style={{ display: "block", padding: 16 }}>{shot.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

Create `src/components/home/ExperienceSection.tsx`:

```tsx
import type { Experience } from "@/types/content";

export function ExperienceSection({ items }: { items: Experience[] }) {
  if (!items.length) return null;

  return (
    <section className="container" style={{ padding: "120px 0" }}>
      <p className="mono-label">EXPERIENCE & IMPACT</p>
      <h2 style={{ fontFamily: "var(--font-hero)", fontSize: "clamp(48px, 6vw, 80px)", lineHeight: 1.1, fontWeight: 400, maxWidth: 750 }}>
        2020–2026: product design for complex interfaces
      </h2>
      <div style={{ maxWidth: 740, margin: "56px auto 0" }}>
        {items.map((item) => (
          <div key={`${item.company}-${item.period}`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 120px", gap: 24, alignItems: "end", borderBottom: "1px solid var(--color-border-default)", padding: "12px 0" }}>
            <strong style={{ fontSize: 24, lineHeight: "30px", fontWeight: 500 }}>{item.company}</strong>
            <span style={{ fontSize: 18, lineHeight: "28px" }}>{item.role}</span>
            <span style={{ color: "var(--color-text-secondary)", textAlign: "right" }}>{item.period}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

Create `src/components/home/AboutFocus.tsx`:

```tsx
import type { FocusItem } from "@/types/content";

export function AboutFocus({ focus }: { focus: FocusItem[] }) {
  return (
    <section id="about" className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, padding: "120px 0" }}>
      <div>
        <p className="mono-label">ABOUT</p>
        <h2 style={{ fontFamily: "var(--font-hero)", fontSize: 42, lineHeight: "44px", fontWeight: 400 }}>
          A designer who likes complex systems and simple interfaces.
        </h2>
        <p style={{ color: "var(--color-text-secondary)", lineHeight: "24px", maxWidth: 392 }}>
          I work with products where business logic, user flows, and a precise visual system need to fit together.
        </p>
      </div>
      <div>
        <p className="mono-label">FOCUS</p>
        <div style={{ marginTop: 56 }}>
          {focus.map((item, index) => (
            <div key={item.title} style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: 16, borderTop: "1px solid var(--color-border-subtle)", padding: "20px 0" }}>
              <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
              <span style={{ fontSize: 18, lineHeight: "28px" }}>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add root redirect**

Replace `src/app/page.tsx` with:

```tsx
import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
```

- [ ] **Step 5: Fetch homepage data in localized route**

Create `src/app/[locale]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { HomePage } from "@/components/home/HomePage";
import { isLocale, type Locale } from "@/i18n/config";
import { localizeRequired } from "@/i18n/localize";
import { sanityFetch } from "@/sanity/client";
import { homeQuery } from "@/sanity/queries";
import type { CaseSummary, Experience, FocusItem, Shot, SiteSettings } from "@/types/content";

type HomePayload = {
  settings: SiteSettings | null;
  featuredCases: CaseSummary[];
  featuredShots: Shot[];
  experience: Experience[];
  focus: FocusItem[];
};

const fallbackSettings: SiteSettings = {
  name: "Danil Deev",
  role: "PRODUCT DESIGNER",
  intro: "I design digital products from scratch — from research and flows to design systems and prototypes.",
  availabilityStatus: "OPEN FOR PROJECTS",
};

type Params = { locale: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;

  const data = await sanityFetch<HomePayload>(homeQuery).catch(() => ({
    settings: fallbackSettings,
    featuredCases: [],
    featuredShots: [],
    experience: [],
    focus: [],
  }));

  const settings = data.settings
    ? {
        ...data.settings,
        name: localizeRequired(data.settings.name, locale, fallbackSettings.name),
        role: localizeRequired(data.settings.role, locale, fallbackSettings.role),
        intro: localizeRequired(data.settings.intro, locale, fallbackSettings.intro),
        availabilityStatus: localizeRequired(data.settings.availabilityStatus, locale, fallbackSettings.availabilityStatus || ""),
        footerNote: localizeRequired(data.settings.footerNote, locale, ""),
      }
    : fallbackSettings;

  const featuredCases = data.featuredCases.map((item) => ({
    ...item,
    title: localizeRequired(item.title, locale, item.slug),
    subtitle: localizeRequired(item.subtitle, locale, ""),
    tags: localizeRequired(item.tags, locale, []),
  }));

  const featuredShots = data.featuredShots.map((item) => ({
    ...item,
    title: localizeRequired(item.title, locale, ""),
    tags: localizeRequired(item.tags, locale, []),
  }));

  const experience = data.experience.map((item) => ({
    ...item,
    company: localizeRequired(item.company, locale, ""),
    role: localizeRequired(item.role, locale, ""),
    period: localizeRequired(item.period, locale, ""),
  }));

  const focus = data.focus.map((item) => ({
    ...item,
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
```

- [ ] **Step 6: Verify homepage**

Run:

```powershell
npm run typecheck
npm run build
```

Expected: homepage route compiles.

- [ ] **Step 7: Commit homepage**

Run:

```powershell
git add src/app/page.tsx src/app/[locale]/page.tsx src/components/home src/i18n
git commit -m "feat: build cms driven homepage"
```

## Task 6: Build Case Detail Page And Block Renderer

**Files:**
- Create: `src/components/case/CasePage.tsx`
- Create: `src/components/case/CaseBlockRenderer.tsx`
- Create: `src/components/case/blocks/ContextGridBlock.tsx`
- Create: `src/components/case/blocks/RichTextSectionBlock.tsx`
- Create: `src/components/case/blocks/GoalMetricsBlock.tsx`
- Create: `src/components/case/blocks/CalloutBlock.tsx`
- Create: `src/components/case/blocks/SolutionsBlock.tsx`
- Create: `src/components/case/blocks/FeatureGridBlock.tsx`
- Create: `src/components/case/blocks/ResultBulletsBlock.tsx`
- Create: `src/components/case/blocks/ComparisonCardsBlock.tsx`
- Create: `src/components/case/blocks/TakeawaysBlock.tsx`
- Create: `src/components/case/CaseBlockRenderer.test.tsx`
- Create: `src/test/fixtures/content.ts`
- Create: `src/app/[locale]/work/[slug]/page.tsx`

- [ ] **Step 1: Write renderer test first**

Create `src/test/fixtures/content.ts`:

```ts
import type { CaseDetail } from "@/types/content";

export const caseFixture: CaseDetail = {
  title: "Trillions",
  slug: "trillions",
  subtitle: "Web version of a crypto bank",
  year: "2025",
  role: "Product Designer",
  client: "Trillions",
  scope: "Fintech · Web · Design System",
  tags: ["FINTECH", "WEB", "DESIGN SYSTEM"],
  blocks: [
    { _type: "contextGrid", items: [{ title: "Product", text: "Crypto banking interface." }] },
    { _type: "callout", label: "Гипотеза", text: "A clearer money flow increases successful transactions." },
    { _type: "resultBullets", intro: "Result", bullets: ["Simplified navigation", "Clearer account model"] },
  ],
};
```

Create `src/components/case/CaseBlockRenderer.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { caseFixture } from "@/test/fixtures/content";
import { CaseBlockRenderer } from "./CaseBlockRenderer";

describe("CaseBlockRenderer", () => {
  it("renders supported case blocks", () => {
    render(<CaseBlockRenderer blocks={caseFixture.blocks} />);

    expect(screen.getByText("Product")).toBeTruthy();
    expect(screen.getByText("Гипотеза")).toBeTruthy();
    expect(screen.getByText("Simplified navigation")).toBeTruthy();
  });
});
```

Run:

```powershell
npm run test -- CaseBlockRenderer
```

Expected: FAIL because `CaseBlockRenderer` does not exist yet.

- [ ] **Step 2: Implement minimal block renderer**

Create `src/components/case/CaseBlockRenderer.tsx`:

```tsx
import type { CaseBlock } from "@/types/content";
import { CalloutBlock } from "./blocks/CalloutBlock";
import { ContextGridBlock } from "./blocks/ContextGridBlock";
import { ResultBulletsBlock } from "./blocks/ResultBulletsBlock";

export function CaseBlockRenderer({ blocks }: { blocks: CaseBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block._type) {
          case "contextGrid":
            return <ContextGridBlock key={index} block={block} />;
          case "callout":
            return <CalloutBlock key={index} block={block} />;
          case "resultBullets":
            return <ResultBulletsBlock key={index} block={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
```

Create the three referenced block components with semantic section markup.

- [ ] **Step 3: Run test to verify it passes**

Run:

```powershell
npm run test -- CaseBlockRenderer
```

Expected: PASS.

- [ ] **Step 4: Add remaining block components**

Extend `CaseBlockRenderer` to dispatch all block types from `CaseBlock`:

```tsx
import type { CaseBlock } from "@/types/content";
import { CalloutBlock } from "./blocks/CalloutBlock";
import { ComparisonCardsBlock } from "./blocks/ComparisonCardsBlock";
import { ContextGridBlock } from "./blocks/ContextGridBlock";
import { FeatureGridBlock } from "./blocks/FeatureGridBlock";
import { GoalMetricsBlock } from "./blocks/GoalMetricsBlock";
import { ResultBulletsBlock } from "./blocks/ResultBulletsBlock";
import { RichTextSectionBlock } from "./blocks/RichTextSectionBlock";
import { SolutionsBlock } from "./blocks/SolutionsBlock";
import { TakeawaysBlock } from "./blocks/TakeawaysBlock";

export function CaseBlockRenderer({ blocks }: { blocks: CaseBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block._type) {
          case "contextGrid":
            return <ContextGridBlock key={index} block={block} />;
          case "richTextSection":
            return <RichTextSectionBlock key={index} block={block} />;
          case "goalMetrics":
            return <GoalMetricsBlock key={index} block={block} />;
          case "callout":
            return <CalloutBlock key={index} block={block} />;
          case "solutions":
            return <SolutionsBlock key={index} block={block} />;
          case "featureGrid":
            return <FeatureGridBlock key={index} block={block} />;
          case "resultBullets":
            return <ResultBulletsBlock key={index} block={block} />;
          case "comparisonCards":
            return <ComparisonCardsBlock key={index} block={block} />;
          case "takeaways":
            return <TakeawaysBlock key={index} block={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
```

Use this pattern for each block component:

```tsx
import type { CaseBlock } from "@/types/content";

type ContextGrid = Extract<CaseBlock, { _type: "contextGrid" }>;

export function ContextGridBlock({ block }: { block: ContextGrid }) {
  return (
    <section className="container" style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 24, padding: "96px 0" }}>
      <p className="mono-label">КОНТЕКСТ</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        {block.items.map((item, index) => (
          <article key={`${item.title}-${index}`} style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: 14 }}>
            <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2 style={{ margin: 0, fontSize: 18, lineHeight: "28px", fontWeight: 400 }}>{item.title}</h2>
              <p style={{ color: "var(--color-text-secondary)", lineHeight: "24px" }}>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
```

Create `src/components/case/blocks/RichTextSectionBlock.tsx`:

```tsx
import { PortableText } from "@portabletext/react";
import type { CaseBlock } from "@/types/content";

type RichTextSection = Extract<CaseBlock, { _type: "richTextSection" }>;

export function RichTextSectionBlock({ block }: { block: RichTextSection }) {
  return (
    <section className="container" style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 24, borderTop: "1px solid var(--color-border-subtle)", padding: "96px 0" }}>
      <p className="mono-label">{block.label}</p>
      <div style={{ fontSize: 32, lineHeight: "40px", maxWidth: 760 }}>
        <PortableText value={block.body} />
      </div>
    </section>
  );
}
```

Create the remaining block components with these exact render contracts:

- `GoalMetricsBlock`: render `block.goal` as the lead text and `block.metrics` as rows with key/value columns.
- `SolutionsBlock`: render each solution as a numbered section with title, text, and gray image frames for every image entry.
- `FeatureGridBlock`: render `block.intro` and a 4-column feature grid from `block.items`.
- `ResultBulletsBlock`: render `block.intro` and numbered rows from `block.bullets`.
- `ComparisonCardsBlock`: render cards with `label`, `title`, `success`, `giveup`, and `time`.
- `TakeawaysBlock`: render a 3-column card grid with title and body.

- [ ] **Step 5: Add case page route**

Create `src/app/[locale]/work/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { CasePage } from "@/components/case/CasePage";
import { isLocale, type Locale } from "@/i18n/config";
import { localizeRequired } from "@/i18n/localize";
import { sanityFetch } from "@/sanity/client";
import { caseBySlugQuery, caseSlugsQuery } from "@/sanity/queries";
import type { CaseDetail } from "@/types/content";

type Params = { locale: string; slug: string };

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(caseSlugsQuery).catch(() => []);
  return ["ru", "en"].flatMap((locale) => slugs.map((item) => ({ locale, slug: item.slug })));
}

export default async function WorkCasePage({ params }: { params: Promise<Params> }) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const item = await sanityFetch<CaseDetail | null>(caseBySlugQuery, { slug }).catch(() => null);

  if (!item) {
    notFound();
  }

  const localizedItem = {
    ...item,
    title: localizeRequired(item.title, locale, item.slug),
    subtitle: localizeRequired(item.subtitle, locale, ""),
    role: localizeRequired(item.role, locale, ""),
    client: localizeRequired(item.client, locale, ""),
    scope: localizeRequired(item.scope, locale, ""),
    tags: localizeRequired(item.tags, locale, []),
  };

  return <CasePage item={localizedItem} locale={locale} />;
}
```

- [ ] **Step 6: Add case page composition**

Create `src/components/case/CasePage.tsx`:

```tsx
import Link from "next/link";
import type { CaseDetail } from "@/types/content";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { CaseBlockRenderer } from "./CaseBlockRenderer";

export function CasePage({ item, locale }: { item: CaseDetail; locale: "ru" | "en" }) {
  const nextLocale = locale === "ru" ? "en" : "ru";

  return (
    <>
      <Navigation locale={locale} alternateHref={`/${nextLocale}/work/${item.slug}`} />
      <main>
        <section className="container" style={{ padding: "48px 0 40px" }}>
          <div className="mono-label" style={{ display: "flex", justifyContent: "space-between" }}>
            <Link href="/">← Назад ко всем работам</Link>
            <span>{item.year}</span>
          </div>
          <div style={{ textAlign: "center", marginTop: 38 }}>
            <h1 style={{ fontFamily: "var(--font-hero)", fontSize: 88, lineHeight: 1, fontWeight: 400, margin: 0 }}>{item.title}</h1>
            <p style={{ fontSize: 18, lineHeight: "28px", color: "var(--color-text-secondary)" }}>{item.subtitle}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 20, marginTop: 52 }}>
            <Meta label="Год" value={item.year} />
            <Meta label="Роль" value={item.role} />
            <Meta label="Клиент" value={item.client} />
            <Meta label="Скоуп" value={item.scope} />
          </div>
        </section>
        <div className="container" style={{ height: 655, borderRadius: 4, background: "var(--color-bg-surface-raised)" }} />
        <CaseBlockRenderer blocks={item.blocks || []} />
      </main>
      <Footer />
    </>
  );
}

function Meta({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="mono-label">{label}</p>
      <p style={{ margin: "8px 0 0" }}>{value || "—"}</p>
    </div>
  );
}
```

- [ ] **Step 7: Verify case page**

Run:

```powershell
npm run test
npm run typecheck
npm run build
```

Expected: tests, typecheck, and build pass.

- [ ] **Step 8: Commit case page**

Run:

```powershell
git add src/app/[locale]/work src/components/case src/test
git commit -m "feat: build typed case pages"
```

## Task 7: Build Shots Gallery Page

**Files:**
- Create: `src/app/[locale]/shots/page.tsx`
- Create: `src/components/shots/ShotsPage.tsx`
- Create: `src/components/shots/ShotLightbox.tsx`

- [ ] **Step 1: Add client lightbox**

Create `src/components/shots/ShotLightbox.tsx`:

```tsx
"use client";

import { useState } from "react";
import type { Shot } from "@/types/content";

export function ShotLightbox({ shots }: { shots: Shot[] }) {
  const [active, setActive] = useState<Shot | null>(null);

  return (
    <>
      <div style={{ columns: "320px", columnGap: 16 }}>
        {shots.map((shot, index) => (
          <button
            key={`${shot.title || "shot"}-${index}`}
            type="button"
            onClick={() => setActive(shot)}
            style={{ display: "block", width: "100%", breakInside: "avoid", margin: "0 0 16px", padding: 0, border: 0, background: "transparent", color: "inherit", textAlign: "left", cursor: "zoom-in" }}
          >
            <div style={{ aspectRatio: index % 3 === 0 ? "4 / 5" : "4 / 3", background: "var(--color-bg-surface-raised)", borderRadius: 4 }} />
            {shot.title ? <p style={{ margin: "10px 0 0", color: "var(--color-text-secondary)" }}>{shot.title}</p> : null}
          </button>
        ))}
      </div>
      {active ? (
        <div role="dialog" aria-modal="true" onClick={() => setActive(null)} style={{ position: "fixed", inset: 0, display: "grid", placeItems: "center", padding: 24, background: "rgba(0,0,0,.82)", zIndex: 50 }}>
          <div style={{ width: "min(960px, 90vw)", minHeight: "60vh", background: "var(--color-bg-surface-raised)", borderRadius: 6 }} />
        </div>
      ) : null}
    </>
  );
}
```

- [ ] **Step 2: Add shots page composition**

Create `src/components/shots/ShotsPage.tsx`:

```tsx
import type { Shot } from "@/types/content";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { ShotLightbox } from "./ShotLightbox";

export function ShotsPage({ shots, locale }: { shots: Shot[]; locale: "ru" | "en" }) {
  const nextLocale = locale === "ru" ? "en" : "ru";
  const tags = Array.from(new Set(shots.flatMap((shot) => shot.tags || [])));

  return (
    <>
      <Navigation locale={locale} alternateHref={`/${nextLocale}/shots`} />
      <main className="container" style={{ padding: "96px 0 0" }}>
        <p className="mono-label">VISUAL NOTES</p>
        <h1 style={{ fontFamily: "var(--font-hero)", fontSize: "clamp(64px, 8vw, 112px)", lineHeight: 1, fontWeight: 400, margin: "24px 0" }}>
          Interface fragments,<br />concepts and experiments
        </h1>
        {tags.length ? (
          <div className="mono-label" style={{ display: "flex", flexWrap: "wrap", gap: 12, margin: "0 0 48px" }}>
            {tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        ) : null}
        <ShotLightbox shots={shots} />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Add locale-prefixed shots route**

Create `src/app/[locale]/shots/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { ShotsPage } from "@/components/shots/ShotsPage";
import { isLocale, type Locale } from "@/i18n/config";
import { localizeRequired } from "@/i18n/localize";
import { sanityFetch } from "@/sanity/client";
import { shotsQuery } from "@/sanity/queries";
import type { Shot } from "@/types/content";

type Params = { locale: string };

export default async function ShotsRoute({ params }: { params: Promise<Params> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const shots = await sanityFetch<Shot[]>(shotsQuery).catch(() => []);
  const localizedShots = shots.map((shot) => ({
    ...shot,
    title: localizeRequired(shot.title, locale, ""),
    tags: localizeRequired(shot.tags, locale, []),
  }));

  return <ShotsPage shots={localizedShots} locale={locale} />;
}
```

- [ ] **Step 4: Verify shots page**

Run:

```powershell
npm run typecheck
npm run build
```

Expected: `/[locale]/shots` compiles.

- [ ] **Step 5: Commit shots page**

Run:

```powershell
git add src/app/[locale]/shots src/components/shots
git commit -m "feat: add shots gallery"
```

## Task 8: Add 404, Responsive Polish, And Final Verification

**Files:**
- Create: `src/app/not-found.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/components/layout/Navigation.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/home/FeaturedWork.tsx`
- Modify: `src/components/case/CasePage.tsx`

- [ ] **Step 1: Add 404 page**

Create `src/app/not-found.tsx`:

```tsx
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="container" style={{ minHeight: "70vh", display: "grid", placeItems: "center", textAlign: "center" }}>
        <div>
          <p className="mono-label">404</p>
          <h1 style={{ fontFamily: "var(--font-hero)", fontSize: 88, lineHeight: 1, fontWeight: 400, margin: "20px 0" }}>Page not found</h1>
          <Link className="mono-label" href="/">← Back home</Link>
        </div>
      </main>
    </>
  );
}
```

- [ ] **Step 2: Add responsive CSS helpers**

Append these mobile rules to `src/app/globals.css`:

```css
@media (max-width: 720px) {
  header nav,
  footer .container > div,
  section {
    max-width: 100%;
  }

  header nav {
    align-items: flex-start;
    flex-direction: column;
  }

  [style*="grid-template-columns: repeat(4"],
  [style*="grid-template-columns: repeat(3"],
  [style*="grid-template-columns: 1fr 1fr"],
  [style*="grid-template-columns: 180px 1fr"],
  [style*="grid-template-columns: 40px 1fr"] {
    grid-template-columns: 1fr !important;
  }

  [style*="height: 655px"],
  [style*="height: 400px"],
  [style*="height: 368px"] {
    height: auto !important;
    min-height: 260px;
  }
}
```

- [ ] **Step 3: Run full verification**

Run:

```powershell
npm run test
npm run lint
npm run typecheck
npm run build
```

Expected: every command passes.

- [ ] **Step 4: Start local app**

Run:

```powershell
npm run dev
```

Expected: Next.js starts and prints a local URL, normally `http://localhost:3000`.

- [ ] **Step 5: Browser verification**

Open these routes in the in-app browser:

```text
http://localhost:3000/
http://localhost:3000/ru
http://localhost:3000/en
http://localhost:3000/ru/shots
http://localhost:3000/en/shots
http://localhost:3000/ru/work/trillions
http://localhost:3000/en/work/trillions
http://localhost:3000/studio
```

Expected:

- `/` redirects to `/ru`.
- `/ru` and `/en` render without overlap at desktop width.
- `/ru/shots` and `/en/shots` render a gallery and lightbox opens on click.
- `/ru/work/trillions` and `/en/work/trillions` render 404 until Sanity has a `trillions` case, or render the case if content exists.
- `/studio` loads the Sanity Studio shell when environment variables are valid.

- [ ] **Step 6: Commit final polish**

Run:

```powershell
git add src
git commit -m "feat: finalize portfolio cms first build"
```

## Self-Review

Spec coverage:

- Next.js project setup: Task 1.
- Sanity schema setup: Task 3.
- Homepage from Figma: Tasks 2 and 5.
- Case detail page from Figma: Task 6.
- Shots gallery page: Task 7.
- Sanity Studio route: Task 3.
- Basic responsive behavior: Task 8.
- TypeScript, lint, test, and build verification: Tasks 1, 4, 5, 6, 7, and 8.

Plan checks:

- No unsupported multi-user role work is included.
- Full public RU/EN localization is included with locale-prefixed routes.
- Case builder is typed by block schemas and renderer components.
- Shots are a separate `shot` collection and locale-prefixed `/[locale]/shots` page.
- The plan accounts for the existing non-empty repository by generating the Next.js app in `.next-template` first.
