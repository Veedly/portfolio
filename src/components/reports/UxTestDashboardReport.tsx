import { ArrowDown, ArrowRight, Eye, MousePointerClick, ShieldCheck, Timer } from "lucide-react";

const comparisonRows = [
  {
    label: "Success rate",
    oldValue: "45.4%",
    oldNote: "5 of 11 completed",
    newValue: "100%",
    newNote: "7 of 7 completed",
    effect: "2.2× conversion",
  },
  {
    label: "Drop-off rate",
    oldValue: "54.6%",
    oldNote: "6 of 11 abandoned",
    newValue: "0%",
    newNote: "No observed drop-offs",
    effect: "Drop-offs eliminated",
  },
  {
    label: "Median time",
    oldValue: "68.2 sec",
    oldNote: "Observed task time",
    newValue: "44.4 sec",
    newNote: "Observed task time",
    effect: "35% faster",
  },
  {
    label: "Average time",
    oldValue: "103.9 sec",
    oldNote: "All valid sessions",
    newValue: "67.9 sec",
    newNote: "All valid sessions",
    effect: "35% faster",
  },
  {
    label: "Ease score",
    oldValue: "3.0 / 5",
    oldNote: "Median 3.0",
    newValue: "4.3 / 5",
    newNote: "Median 5.0",
    effect: "+43% usability",
  },
];

const failureModes = [
  {
    number: "01",
    title: "The action looks available, but nothing happens",
    text: "Users click the buy button while the wallet is disconnected. The interface is blocked, yet the warning lives outside the active visual area at the top of the page.",
    result: "Repeated clicks, uncertainty, and eventual abandonment.",
    quote: "I felt like there was a lot of information and when I clicked on the button, nothing happened.",
    time: "128.3 sec before drop-off",
    icon: MousePointerClick,
  },
  {
    number: "02",
    title: "Visual noise competes with the core task",
    text: "Bright accents, secondary controls, and crypto terminology pull attention away from choosing an outcome and placing a bet.",
    result: "The page feels harder than the actual task.",
    quote: "The page for placing the bet had a lot of stuff that I think were unnecessary and made placing the bet near impossible.",
    time: "235.7 sec before drop-off",
    icon: Eye,
  },
  {
    number: "03",
    title: "Wallet connection breaks the linear flow",
    text: "Participants have to backtrack through the interface to discover where authorization happens.",
    result: "The betting sequence loses context and confidence.",
    quote: "I had to backtrack to connect my wallet, and it wasn't clear whether I was betting on yes or no.",
    time: "52.8 sec to completion",
    icon: ArrowDown,
  },
];

const positiveQuotes = [
  "Easy to find by scrolling on the page. A number of bet options were already shown on the screen to just press and bet.",
  "It was easy to find the market on the main page. There were easy options once clicking on the bet.",
  "The process was quick and easy.",
  "It was very straightforward.",
];

export function UxTestDashboardReport() {
  return (
    <main className="ux-report">
      <header className="ux-report-hero">
        <div className="ux-report-shell">
          <div className="ux-report-topline">
            <span className="mono-label">CLIENT RESEARCH REPORT / 2026</span>
            <span className="ux-report-status">
              <span aria-hidden="true" />
              Research completed
            </span>
          </div>

          <div className="ux-report-hero-copy">
            <p className="mono-label">OLD FLOW VS. NEW CONCEPT</p>
            <h1>Bet slip UX study</h1>
            <p>
              An unmoderated usability study on Wynde evaluating how clearly users can discover a market, configure a
              bet, connect their wallet, and complete the transaction.
            </p>
          </div>

        </div>
      </header>

      <section className="ux-report-section ux-report-shell">
        <SectionHeading index="01" eyebrow="RESEARCH SETUP" title="What we tested" />
        <div className="ux-report-setup-grid">
          <div className="ux-report-lead">
            <p>
              The study combined a five-second first-impression test with a scenario-based interactive prototype test.
              Both variants were tested remotely and without a moderator.
            </p>
          </div>
          <dl className="ux-report-definition-list">
            <div>
              <dt>Method</dt>
              <dd>Unmoderated usability test</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd>Wynde</dd>
            </div>
            <div>
              <dt>Five-second test</dt>
              <dd>7 participants per variant</dd>
            </div>
            <div>
              <dt>Scenario UX test</dt>
              <dd>11 current / 7 new valid participants</dd>
            </div>
          </dl>
        </div>

      </section>

      <section className="ux-report-section ux-report-section--band">
        <div className="ux-report-shell">
          <SectionHeading index="02" eyebrow="STAGE ONE" title="Five-second test" />
          <div className="ux-report-stage-intro">
            <p>
              Seven participants saw each mobile screen for five seconds. We measured product recognition, the first
              visual anchor, intended first interaction, and perceived trust.
            </p>
          </div>

          <div className="ux-report-stimuli">
            <figure>
              <div className="ux-report-stimulus-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/reports/ux-test-dashboard/old-five-second.png" alt="Current production screen shown in the five-second test" />
              </div>
              <figcaption>
                <span className="mono-label">CURRENT PRODUCTION</span>
                <strong>2 / 7</strong>
                <p>explicitly identified a prediction or betting product</p>
              </figcaption>
            </figure>
            <figure>
              <div className="ux-report-stimulus-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/reports/ux-test-dashboard/new-five-second.png" alt="New concept screen shown in the five-second test" />
              </div>
              <figcaption>
                <span className="mono-label">NEW CONCEPT</span>
                <strong>6 / 7</strong>
                <p>identified betting, sportsbook, or prediction markets</p>
              </figcaption>
            </figure>
          </div>

          <div className="ux-report-five-second-questions">
            <span className="mono-label">QUESTIONS ASKED AFTER EXPOSURE</span>
            <ol>
              <li>What kind of app or service do you think this is?</li>
              <li>What stood out to you the most on the screen?</li>
              <li>Which button or element did you want to click first?</li>
              <li>How professional and trustworthy does this design look? (1–5)</li>
            </ol>
          </div>

          <div className="ux-report-five-second-findings">
            <article>
              <span className="mono-label">PRODUCT RECOGNITION</span>
              <strong>2 / 7 → 6 / 7</strong>
              <p>
                The concept communicated the betting category much faster. The current screen was also interpreted as
                social media, messaging, or generic trading.
              </p>
            </article>
            <article>
              <span className="mono-label">FIRST-CLICK INTENT</span>
              <strong>4 / 7 → 5 / 7</strong>
              <p>
                Most participants in both variants gravitated toward a prominent button or price control. The CTA
                dominated attention before users formed a complete mental model of the service.
              </p>
            </article>
            <article>
              <span className="mono-label">TRUST SCORE</span>
              <strong>3.0 → 3.6</strong>
              <p>
                The new visual direction improved perceived professionalism, although the category and interaction
                model still benefit from clearer explanatory cues.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="ux-report-section ux-report-shell">
        <SectionHeading index="03" eyebrow="STAGE TWO" title="Scenario-based usability test" />
        <div className="ux-report-task">
          <span className="mono-label">PARTICIPANT TASK</span>
          <p>
            Find the “Will Apple launch iPhone 18 in 2026?” market, select <strong>Yes</strong>, enter{" "}
            <strong>$50</strong>, and place the bet.
          </p>
        </div>
        <p className="ux-report-sample-note">
          The new-flow scenario test initially included 11 sessions. Four were excluded as invalid because of Wynde
          platform failures, leaving 7 valid sessions for analysis.
        </p>
        <div className="ux-report-metric-summary">
          <div>
            <MousePointerClick aria-hidden="true" />
            <span className="mono-label">COMPLETION</span>
            <strong>+54.6 pp</strong>
            <p>Success increased from 45.4% to 100%.</p>
          </div>
          <div>
            <Timer aria-hidden="true" />
            <span className="mono-label">FLOW SPEED</span>
            <strong>−35%</strong>
            <p>Observed median task time dropped from 68.2 to 44.4 seconds.</p>
          </div>
          <div>
            <ShieldCheck aria-hidden="true" />
            <span className="mono-label">EASE</span>
            <strong>4.3 / 5</strong>
            <p>Clean UX score reaches 4.66/5 after removing one display issue.</p>
          </div>
        </div>

        <div className="ux-report-comparison-table">
          <div className="ux-report-comparison-header" aria-hidden="true">
            <span>Metric</span>
            <span>Current production</span>
            <span>New concept</span>
            <span>Effect</span>
          </div>
          {comparisonRows.map((row, index) => (
            <div className="ux-report-comparison-row" key={row.label}>
              <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{row.label}</strong>
              </div>
              <div className="is-old">
                <strong>{row.oldValue}</strong>
                <small>{row.oldNote}</small>
              </div>
              <div className="is-new">
                <strong>{row.newValue}</strong>
                <small>{row.newNote}</small>
              </div>
              <div className="ux-report-effect">{row.effect}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="ux-report-section ux-report-section--band">
        <div className="ux-report-shell">
          <SectionHeading index="04" eyebrow="FAILURE ANALYSIS" title="Why the current flow breaks" />
          <p className="ux-report-section-lead">
            More than half of participants could not complete a basic $50 transaction in the current product.
            Interaction logs reveal three recurring failure modes.
          </p>

          <div className="ux-report-findings">
            {failureModes.map((finding) => {
              const Icon = finding.icon;
              return (
                <article key={finding.number}>
                  <div className="ux-report-finding-index">
                    <span className="mono-label">{finding.number}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <div className="ux-report-finding-copy">
                    <h3>{finding.title}</h3>
                    <p>{finding.text}</p>
                    <p className="ux-report-finding-result">
                      <strong>Observed result:</strong> {finding.result}
                    </p>
                  </div>
                  <blockquote>
                    “{finding.quote}”
                    <cite>{finding.time}</cite>
                  </blockquote>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ux-report-section ux-report-shell">
        <SectionHeading index="05" eyebrow="DESIGN RESPONSE" title="How the new flow resolves the issue" />
        <div className="ux-report-flow">
          <div className="is-old">
            <span className="mono-label">OLD FLOW</span>
            <ol>
              <li>Select Buy</li>
              <li>Nothing visible happens</li>
              <li>Search for wallet warning</li>
              <li>Backtrack to connect</li>
              <li>Return or abandon</li>
            </ol>
          </div>
          <ArrowRight aria-hidden="true" />
          <div className="is-new">
            <span className="mono-label">NEW FLOW</span>
            <ol>
              <li>Configure the $50 bet</li>
              <li>Primary action changes contextually</li>
              <li>Connect wallet inside the bet slip</li>
              <li>Continue without losing context</li>
            </ol>
          </div>
        </div>

        <div className="ux-report-solution-points">
          <article>
            <span className="mono-label">01</span>
            <h3>Contextual primary action</h3>
            <p>The purchase button becomes “Connect Wallet to Place Bet” when authorization is required.</p>
          </article>
          <article>
            <span className="mono-label">02</span>
            <h3>Linear visual focus</h3>
            <p>Market selection, amount, wallet state, and the next action stay inside one transaction surface.</p>
          </article>
          <article>
            <span className="mono-label">03</span>
            <h3>Lower commitment anxiety</h3>
            <p>Users configure the bet first and connect the wallet only when the transaction is ready.</p>
          </article>
        </div>
      </section>

      <section className="ux-report-section ux-report-shell">
        <SectionHeading index="06" eyebrow="USER VOICE" title="What participants said" />
        <div className="ux-report-quotes">
          <div className="is-old">
            <span className="mono-label">CURRENT PRODUCTION</span>
            <blockquote>“It was not clear that I needed to link my wallet first.”</blockquote>
            <blockquote>“I did not see confirmation that I had placed the bet.”</blockquote>
            <blockquote>“It is confusing. I would like it to be straightforward.”</blockquote>
          </div>
          <div className="is-new">
            <span className="mono-label">NEW CONCEPT / 5 OF 5</span>
            {positiveQuotes.map((quote) => (
              <blockquote key={quote}>“{quote}”</blockquote>
            ))}
          </div>
        </div>
      </section>

      <footer className="ux-report-conclusion">
        <div className="ux-report-shell">
          <span className="mono-label">FINAL VERDICT</span>
          <h2>The current product is not ready for production launch.</h2>
          <div className="ux-report-verdict">
            <p>
              The current experience should not be released in its present form. Users struggle to understand where
              to begin, the interface is overloaded with competing information, and key controls provide insufficient
              feedback when an action is unavailable or incomplete.
            </p>
            <p>
              The 45.4% task-success rate and 54.6% drop-off rate indicate a structural usability problem rather than
              isolated visual issues. Wallet connection, bet configuration, confirmation, and recovery states need to
              be redesigned as coherent end-to-end scenarios.
            </p>
          </div>
          <div className="ux-report-launch-gate">
            <span className="mono-label">REQUIRED BEFORE LAUNCH</span>
            <ol>
              <li>Audit and redesign every core transaction scenario, including error and recovery states.</li>
              <li>Reduce information density and establish a clear visual hierarchy around the primary action.</li>
              <li>Make system status and blocked actions explicit, contextual, and immediately responsive.</li>
              <li>Validate the revised production flow with another usability round before release.</li>
            </ol>
          </div>
          <p className="ux-report-verdict-recommendation">
            The new contextual bet slip is a strong direction and should become the foundation for the redesign, but
            the broader platform still requires detailed UX work across all core journeys before it can be considered
            launch-ready.
          </p>
          <div className="ux-report-conclusion-meta">
            <span>Prepared for client review</span>
            <span>Unmoderated UX research / Wynde</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SectionHeading({ index, eyebrow, title }: { index: string; eyebrow: string; title: string }) {
  return (
    <div className="ux-report-section-heading">
      <span className="mono-label">{index}</span>
      <div>
        <p className="mono-label">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
    </div>
  );
}
