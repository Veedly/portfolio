import type { CaseBlock } from "@/types/content";

type Solutions = Extract<CaseBlock, { _type: "solutions" }>;

export function SolutionsBlock({ block }: { block: Solutions }) {
  return (
    <section className="case-solutions" style={{ padding: "80px 0" }}>
      <div
        aria-hidden
        className="mono-label"
        style={{
          display: "flex",
          gap: 36,
          justifyContent: "center",
          borderTop: "1px solid var(--color-border-subtle)",
          borderBottom: "1px solid var(--color-border-subtle)",
          padding: "20px 0",
          color: "var(--color-text-muted)",
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <span key={index}>КЛЮЧЕВЫЕ РЕШЕНИЯ</span>
        ))}
      </div>
      <div className="container" style={{ display: "grid", gap: 80, paddingTop: 80 }}>
        {block.items.map((item, index) => (
          <article key={`${item.title}-${index}`}>
            <div
              className="solution-copy"
              style={{ display: "grid", gridTemplateColumns: "40px 320px 1fr", gap: 16, marginBottom: 40 }}
            >
              <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
              <h2 style={{ fontSize: 28, lineHeight: "30px", fontWeight: 400, margin: 0 }}>{item.title}</h2>
              <p style={{ color: "var(--color-text-secondary)", lineHeight: "24px", margin: 0 }}>{item.text}</p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: item.images && item.images.length > 1 ? "1fr 1fr" : "1fr",
                gap: 16,
              }}
            >
              {(item.images?.length ? item.images : [undefined]).map((_, imageIndex) => (
                <div
                  key={imageIndex}
                  style={{
                    minHeight: imageIndex === 0 && index === 1 ? 540 : 462,
                    borderRadius: 4,
                    background: "var(--color-bg-surface-raised)",
                  }}
                />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
