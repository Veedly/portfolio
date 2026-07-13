import type { CaseBlock } from "@/types/content";

type GoalMetrics = Extract<CaseBlock, { _type: "goalMetrics" }>;

export function GoalMetricsBlock({ block, locale }: { block: GoalMetrics; locale: "ru" | "en" }) {
  return (
    <section
      className="container case-section motion-reveal"
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        gap: 24,
        borderTop: "1px solid var(--color-border-subtle)",
        padding: "76px 0",
      }}
    >
      <p className="mono-label">{locale === "ru" ? "ЦЕЛИ ПРОДУКТА И КРИТЕРИИ УСПЕХА" : "PRODUCT GOALS AND SUCCESS CRITERIA"}</p>
      <div>
        <p style={{ fontSize: 28, lineHeight: "36px", margin: 0, maxWidth: 760 }}>{block.goal}</p>
        <p className="mono-label" style={{ marginTop: 64 }}>
          {locale === "ru" ? "МЕТРИКИ ПОСЛЕ ЗАПУСКА" : "POST-LAUNCH METRICS"}
        </p>
        <div style={{ marginTop: 20 }}>
          {block.metrics.map((metric, index) => (
            <div
              key={`${metric.key}-${index}`}
              className="metric-row"
              style={{
                display: "grid",
                gridTemplateColumns: "40px 240px 1fr",
                gap: 16,
                borderTop: "1px solid var(--color-border-default)",
                padding: "18px 0",
              }}
            >
              <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
              <strong style={{ fontWeight: 400, lineHeight: "24px" }}>{metric.key}</strong>
              <span style={{ color: "var(--color-text-secondary)", lineHeight: "24px" }}>{metric.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
