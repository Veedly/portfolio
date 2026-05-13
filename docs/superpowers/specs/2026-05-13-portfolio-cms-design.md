# Portfolio CMS Design

Date: 2026-05-13

## Goal

Build a portfolio website for a product designer with a CMS-managed case system.
The site should match the provided Figma design and allow the owner to publish
full case studies plus a separate Dribbble-style gallery for smaller visual work.

## Approved Stack

- Frontend: Next.js with React and TypeScript.
- CMS: Sanity as a hosted CMS service.
- Hosting: Vercel for the public site.
- CMS route: embedded or connected Sanity Studio at `/studio`.

This stack keeps maintenance low while preserving full control over the public
portfolio design.

## Pages

### Home: `/`

The homepage follows the Figma frame `Claude Portfolio / Home recreated`.
It contains:

- Navigation with brand mark, section links, project availability, and language toggle.
- Hero section with name, role, and short introduction.
- Featured work list sourced from CMS cases.
- Gallery strip sourced from featured shots.
- Experience and impact section.
- About and focus section.
- Contact footer.

### Case Detail: `/work/[slug]`

The case page follows the Figma frame `Claude Portfolio / Trillions case recreated`.
It is a structured case study page, not a free-form article.

The page contains:

- Back navigation.
- Case hero with title, subtitle, year, role, client, and scope.
- Cover image.
- Context items.
- Problem section.
- Goal and metrics section.
- Hypothesis callout.
- Key solutions with text and images.
- Functionality grid.
- Result section with bullets and optional UX comparison cards.
- Takeaways.
- Shared contact footer.

### Shots Gallery: `/shots`

The shots page is a Dribbble-style gallery for visual work that does not need a
full case study.

It contains:

- Page header and short description.
- Masonry or responsive grid of images.
- Optional tag filters.
- Image lightbox for viewing details without creating a separate page per shot.

The homepage gallery can reuse shots marked as featured.

### Sanity Studio: `/studio`

Sanity Studio is used by one owner. No multi-user role system is required in the
first version.

## CMS Model

### `case`

Represents a full portfolio case study.

Fields:

- `title`: case title.
- `slug`: URL slug.
- `subtitle`: short description under the title.
- `coverImage`: main case image.
- `year`: display year or year range.
- `role`: designer role.
- `client`: client or product name.
- `scope`: project scope.
- `tags`: categories such as fintech, web, design system.
- `featured`: whether the case appears on the homepage.
- `featuredOrder`: ordering for homepage featured work.
- `blocks`: typed content blocks for the case detail page.

### Case Blocks

The case detail page should use typed blocks instead of a fully free page
builder. This preserves the Figma layout rhythm and keeps editing predictable.

Supported blocks:

- `contextGrid`: numbered context facts with title and text.
- `richTextSection`: labelled long text section, used for problem-style content.
- `goalMetrics`: goal text plus metric rows.
- `callout`: label and highlighted text, used for hypothesis.
- `solutions`: numbered solution sections with title, text, and one or more images.
- `featureGrid`: numbered feature cards.
- `resultBullets`: result intro and numbered bullet list.
- `comparisonCards`: UX data cards for before/after or variant comparison.
- `takeaways`: takeaway cards with title and body.

### `shot`

Represents a standalone visual item for the `/shots` page and homepage gallery.

Fields:

- `image`: main visual.
- `title`: optional short caption.
- `tags`: categories for filtering.
- `year`: optional year.
- `relatedCase`: optional reference to a case.
- `featured`: whether it appears in the homepage gallery.
- `order`: manual display order.
- `published`: publish toggle.

### `siteSettings`

Global editable site content.

Fields:

- `name`: designer name.
- `role`: role label.
- `intro`: short hero intro.
- `availabilityStatus`: current availability text.
- `telegram`: Telegram contact.
- `email`: email contact.
- `behance`: Behance link.
- `cvFile`: downloadable CV.
- `footerNote`: small footer text.

### `experience`

Represents experience rows on the homepage.

Fields:

- `company`
- `role`
- `period`
- `order`

### `focusItem`

Represents focus rows on the homepage.

Fields:

- `title`
- `order`

## Content Flow

1. The owner creates or edits content in Sanity Studio.
2. Next.js fetches published content from Sanity.
3. The homepage renders featured cases and featured shots.
4. Case pages render typed case blocks through dedicated React components.
5. The shots page renders published shots in a responsive gallery with lightbox.

## Design System

The implementation should map Figma styles into project-level tokens:

- Dark canvas background.
- Surface and raised-surface colors for image placeholders and cards.
- Muted borders.
- Primary, secondary, muted, and success text colors.
- Hero serif display typography.
- Base sans typography.
- Mono label typography.

The implementation should not rely on Figma's absolute positioning. It should
recreate the visual structure with responsive layout primitives.

## Error Handling

- Missing case slug should render a 404.
- Missing optional shot metadata should not block rendering.
- Unpublished cases and shots should not appear on the public site.
- Empty CMS lists should render clean fallback states in development and avoid
broken sections in production.

## Testing And Verification

Minimum verification:

- TypeScript check.
- Lint check.
- Build check.
- Manual browser verification for `/`, `/work/[slug]`, `/shots`, and `/studio`.
- Responsive checks for desktop and mobile widths.

Visual verification should compare the homepage and case page against the Figma
screenshots section by section.

## Initial Scope

In scope for the first build:

- Next.js project setup.
- Sanity schema setup.
- Homepage from Figma.
- Case detail page from Figma.
- Shots gallery page.
- Sanity Studio route.
- Basic responsive behavior.

Out of scope for the first build:

- Multi-user roles.
- Full localization workflow.
- Analytics dashboard.
- Comments or public user accounts.
- Advanced animation beyond simple interaction and hover states.
