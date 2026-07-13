import type { CaseBlock } from "@/types/content";

type ResultBullets = Extract<CaseBlock, { _type: "resultBullets" }>;

export function ResultBulletsBlock({ block, locale }: { block: ResultBullets; locale: "ru" | "en" }) {
  return (
    <section
      className="container case-section motion-reveal"
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        gap: 24,
        borderTop: "1px solid var(--color-border-subtle)",
        padding: "48px 0 96px",
      }}
    >
      <p className="mono-label">{locale === "ru" ? "РЕЗУЛЬТАТЫ ДИЗАЙН-ЭТАПА" : "DESIGN STAGE OUTCOMES"}</p>
      <div>
        {block.intro ? <p style={{ fontSize: 18, lineHeight: "28px", margin: 0 }}>{block.intro}</p> : null}
        <div style={{ marginTop: 52 }}>
          {block.bullets.map((bullet, index) => (
            <div
              key={`${bullet}-${index}`}
              style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr",
                gap: 16,
                borderTop: "1px solid var(--color-border-default)",
                padding: "18px 0",
              }}
            >
              <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
              <span style={{ lineHeight: "24px" }}>{bullet}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
