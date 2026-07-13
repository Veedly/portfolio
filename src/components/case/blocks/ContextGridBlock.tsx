import type { CaseBlock } from "@/types/content";

type ContextGrid = Extract<CaseBlock, { _type: "contextGrid" }>;

export function ContextGridBlock({ block, locale }: { block: ContextGrid; locale: "ru" | "en" }) {
  return (
    <section
      className="container case-section case-context motion-reveal"
      style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 24, padding: "96px 0" }}
    >
      <p className="mono-label">{locale === "ru" ? "КОНТЕКСТ" : "CONTEXT"}</p>
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
