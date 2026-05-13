import type { CaseBlock } from "@/types/content";

type Takeaways = Extract<CaseBlock, { _type: "takeaways" }>;

export function TakeawaysBlock({ block }: { block: Takeaways }) {
  return (
    <section style={{ borderTop: "1px solid var(--color-border-subtle)", padding: "66px 0 100px" }}>
      <div className="container case-section" style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 24 }}>
        <p className="mono-label">ВЫВОДЫ</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20 }}>
          {block.items.map((item) => (
            <article key={item.title} style={{ minHeight: 334, background: "var(--color-bg-surface)", border: "1px solid var(--color-border-default)", padding: 28 }}>
              <h3 style={{ fontSize: 18, lineHeight: "28px", fontWeight: 400, margin: 0 }}>{item.title}</h3>
              <p style={{ color: "var(--color-text-secondary)", lineHeight: "24px", marginTop: 18 }}>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
