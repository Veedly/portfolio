import type { CaseBlock } from "@/types/content";

type FeatureGrid = Extract<CaseBlock, { _type: "featureGrid" }>;

export function FeatureGridBlock({ block }: { block: FeatureGrid }) {
  return (
    <section
      className="container case-section"
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        gap: 24,
        borderTop: "1px solid var(--color-border-subtle)",
        padding: "40px 0 96px",
      }}
    >
      <p className="mono-label">ФУНКЦИОНАЛ</p>
      <div>
        {block.intro ? <p style={{ fontSize: 18, lineHeight: "28px", margin: 0, maxWidth: 720 }}>{block.intro}</p> : null}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", marginTop: 60 }}>
          {block.items.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              style={{ minHeight: 120, border: "1px solid var(--color-border-default)", padding: 22 }}
            >
              <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
              <h3 style={{ fontSize: 18, lineHeight: "24px", fontWeight: 400, margin: "20px 0 0" }}>{item.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
