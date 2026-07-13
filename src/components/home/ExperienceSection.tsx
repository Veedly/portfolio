import type { Experience } from "@/types/content";

export function ExperienceSection({ items, locale }: { items: Experience[]; locale: "ru" | "en" }) {
  if (!items.length) return null;

  return (
    <section className="container motion-reveal" style={{ padding: "120px 0" }}>
      <p className="mono-label">{locale === "ru" ? "ОПЫТ И ВКЛАД" : "EXPERIENCE & IMPACT"}</p>
      <div className="experience-content" style={{ maxWidth: 750, marginLeft: 260 }}>
        <h2 className="experience-title motion-reveal">
          {locale === "ru" ? "7+ лет в продуктовом и UX/UI-дизайне" : "7+ years in product and UX/UI design"}
        </h2>
        <p className="motion-reveal motion-delay-1" style={{ color: "var(--color-text-secondary)", lineHeight: "24px", maxWidth: 607, margin: "36px 0 0" }}>
          {locale === "ru"
            ? "Работаю с fintech-, B2B- и внутренними продуктами: от архитектуры и прототипов до UI, токенов и передачи в разработку."
            : "I work across fintech, B2B, and internal products: from architecture and prototypes to UI, tokens, and development handoff."}
        </p>
      </div>
      <div className="experience-content" style={{ maxWidth: 740, margin: "56px 0 0 260px" }}>
        {items.map((item) => (
          <div
            key={`${item.company}-${item.period}`}
            className="experience-row motion-reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "180px 1fr 120px",
              gap: 24,
              alignItems: "start",
              borderBottom: "1px solid var(--color-border-default)",
              padding: "12px 0",
            }}
          >
            <strong style={{ alignSelf: "start", fontSize: 24, lineHeight: "30px", fontWeight: 500 }}>{item.company}</strong>
            <span style={{ fontSize: 18, lineHeight: "28px" }}>
              {item.role}
              {item.summary ? <small className="experience-summary">{item.summary}</small> : null}
            </span>
            <span style={{ color: "var(--color-text-secondary)", textAlign: "right" }}>{item.period}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
