# UX Test Dashboard Report Design

## Goal

Create a standalone English client report at `/en/reports/ux-test-dashboard` that presents the Old vs. New bet slip UX study in the visual language of the portfolio without exposing the page in site navigation.

## Content

- Research overview: unmoderated usability study run on Wynde.
- Five-second test sample: 7 participants per variant.
- Scenario UX test sample: 11 valid sessions for the current product and 11 valid sessions for the new concept after excluding 4 invalid Wynde sessions from 15 collected sessions.
- Participant task: find the specified market, choose “Yes”, enter $50, and place the bet.
- Stage 1: five-second test stimuli, the four questions asked, product recognition, first-click intent, and trust score.
- Stage 2: scenario-based usability test with success, drop-off, time, and CES metrics.
- Failure analysis: blind action button, visual noise, and authorization backtracking.
- New-flow explanation: contextual Connect Wallet action inside the bet slip.
- A concise sample-validity note and raw user feedback.
- Client-facing conclusion and recommendation.

## Visual Direction

- Standalone report without portfolio navigation or footer.
- Existing dark/light theme tokens, 1000 px content width, mono labels, serif display type, thin rules, and restrained green success accents.
- Dashboard-style KPI hero, comparison rows, horizontal bars, numbered findings, process flow, quote panels, and methodology notes.
- Responsive single-column layout on mobile and print-friendly styles.

## Constraints

- Static content in code; no Sanity schema or navigation changes.
- Server-side password protection using an HttpOnly signed access cookie.
- The report password and signing secret are configured through server-only environment variables.
- No external charting dependency; visuals use semantic HTML and CSS.
