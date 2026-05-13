import type { Experience } from "@/types/content";

export function ExperienceSection({ items }: { items: Experience[] }) {
  if (!items.length) return null;

  return (
    <section className="container" style={{ padding: "120px 0" }}>
      <p className="mono-label">EXPERIENCE & IMPACT</p>
      <h2
        style={{
          fontFamily: "var(--font-hero)",
          fontSize: "clamp(48px, 6vw, 80px)",
          lineHeight: 1.1,
          fontWeight: 400,
          maxWidth: 750,
          margin: "18px auto 0",
        }}
      >
        2020–2026: product design for complex interfaces
      </h2>
      <p style={{ color: "var(--color-text-secondary)", lineHeight: "24px", maxWidth: 607, margin: "36px auto 0" }}>
        Worked across fintech, B2B, CRM, internal tools, and design systems: from early structure and prototypes to UI,
        tokens, and development handoff.
      </p>
      <div style={{ maxWidth: 740, margin: "56px auto 0" }}>
        {items.map((item) => (
          <div
            key={`${item.company}-${item.period}`}
            className="experience-row"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 120px",
              gap: 24,
              alignItems: "end",
              borderBottom: "1px solid var(--color-border-default)",
              padding: "12px 0",
            }}
          >
            <strong style={{ fontSize: 24, lineHeight: "30px", fontWeight: 500 }}>{item.company}</strong>
            <span style={{ fontSize: 18, lineHeight: "28px" }}>{item.role}</span>
            <span style={{ color: "var(--color-text-secondary)", textAlign: "right" }}>{item.period}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
