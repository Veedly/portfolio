import type { CaseBlock } from "@/types/content";

type ComparisonCards = Extract<CaseBlock, { _type: "comparisonCards" }>;

export function ComparisonCardsBlock({ block, locale }: { block: ComparisonCards; locale: "ru" | "en" }) {
  return (
    <section className="container motion-reveal" style={{ padding: "0 0 96px", display: "grid", gridTemplateColumns: "180px 1fr", gap: 24 }}>
      <span />
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {block.items.map((item, index) => (
            <article key={`${item.title}-${index}`} style={{ border: "1px solid var(--color-border-default)", padding: 22 }}>
              <p className="mono-label">{item.label}</p>
              <h3 style={{ fontSize: 24, lineHeight: "28px", fontWeight: 400 }}>{item.title}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, borderTop: "1px solid var(--color-border-default)", paddingTop: 20 }}>
                <Metric value={item.success} label={locale === "ru" ? "успешно" : "success"} />
                <Metric value={item.giveup} label={locale === "ru" ? "сдались" : "gave up"} />
                <Metric value={item.time} label={locale === "ru" ? "среднее" : "average"} />
              </div>
            </article>
          ))}
        </div>
        {block.note ? <p style={{ color: "var(--color-text-secondary)", lineHeight: "24px", marginTop: 32 }}>{block.note}</p> : null}
      </div>
    </section>
  );
}

function Metric({ value, label }: { value?: string; label: string }) {
  return (
    <div>
      <p style={{ fontSize: 24, lineHeight: "30px", margin: 0 }}>{value || "—"}</p>
      <p className="mono-label" style={{ marginTop: 4 }}>
        {label}
      </p>
    </div>
  );
}
