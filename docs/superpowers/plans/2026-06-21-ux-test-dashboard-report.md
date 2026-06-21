# UX Test Dashboard Report Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone English UX research report page for the Old vs. New bet slip study.

**Architecture:** Keep report data and markup in a dedicated server component, expose it from a locale report route, and scope all presentation through `ux-report-*` classes in the existing global stylesheet. Add one focused render test to protect the key research facts.

**Tech Stack:** Next.js App Router, React 19, TypeScript, CSS, Vitest, Testing Library, Lucide React.

---

### Task 1: Report Component

**Files:**
- Create: `src/components/reports/UxTestDashboardReport.tsx`
- Create: `src/components/reports/UxTestDashboardReport.test.tsx`

- [ ] Write a render test that asserts the research method, sample sizes, participant task, and primary success-rate result.
- [ ] Implement the report component with overview, KPI comparison, findings, flow, sample-validity note, feedback, and recommendation sections.
- [ ] Run `npm test -- --run UxTestDashboardReport`.

### Task 2: Report Route

**Files:**
- Create: `src/app/[locale]/reports/ux-test-dashboard/page.tsx`

- [ ] Add an English-only route that calls `notFound()` for unsupported locales and renders the report without navigation or footer.
- [ ] Add page metadata for the client report.

### Task 3: Styling And Verification

**Files:**
- Modify: `src/app/globals.css`

- [ ] Add scoped desktop, mobile, light-theme, and print styles for the report.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm test -- --run UxTestDashboardReport`.
- [ ] Run `npm run build`.
- [ ] Start the local server and visually inspect `/en/reports/ux-test-dashboard` at desktop and mobile widths.

### Task 4: Private Report Access

**Files:**
- Create: `src/lib/reportAccess.ts`
- Create: `src/app/api/report-access/route.ts`
- Create: `src/components/reports/ReportAccessGate.tsx`
- Modify: `src/app/[locale]/reports/ux-test-dashboard/page.tsx`
- Modify: `.env.example`

- [ ] Add tests for password verification, signed tokens, and the access form.
- [ ] Validate the password on the server and issue a route-scoped HttpOnly cookie.
- [ ] Prevent protected report markup from rendering until the signed cookie is valid.
- [ ] Verify incorrect and correct passwords in a clean browser context.
