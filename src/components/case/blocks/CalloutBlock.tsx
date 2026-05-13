import type { CaseBlock } from "@/types/content";

type Callout = Extract<CaseBlock, { _type: "callout" }>;

export function CalloutBlock({ block }: { block: Callout }) {
  return (
    <section className="container" style={{ padding: "40px 0 80px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "160px 1fr",
          gap: 16,
          border: "1px solid var(--color-border-default)",
          background: "var(--color-bg-surface)",
          padding: "20px 32px",
        }}
      >
        <p className="mono-label">{block.label}</p>
        <p style={{ fontSize: 24, lineHeight: "36px", margin: 0 }}>{block.text}</p>
      </div>
    </section>
  );
}
