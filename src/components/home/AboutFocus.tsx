import type { FocusItem } from "@/types/content";

export function AboutFocus({ focus, locale }: { focus: FocusItem[]; locale: "ru" | "en" }) {
  const aboutTitle =
    locale === "ru"
      ? "Дизайнер, которому нравятся сложные системы и простые интерфейсы."
      : "A designer who likes complex systems and simple interfaces.";
  const aboutText =
    locale === "ru"
      ? "Работаю с продуктами, где бизнес-логика, пользовательские сценарии и точная визуальная система должны складываться вместе."
      : "I work with products where business logic, user flows, and a precise visual system need to fit together.";

  return (
    <section
      id="about"
      className="container about-focus motion-reveal"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, padding: "120px 0" }}
    >
      <div>
        <p className="mono-label">ABOUT</p>
        <h2 style={{ fontFamily: "var(--font-hero)", fontSize: 42, lineHeight: "44px", fontWeight: 400 }}>
          {aboutTitle}
        </h2>
        <p style={{ color: "var(--color-text-secondary)", lineHeight: "24px", maxWidth: 392 }}>{aboutText}</p>
      </div>
      <div>
        <p className="mono-label">FOCUS</p>
        <div style={{ marginTop: 56 }}>
          {focus.map((item, index) => (
            <div
              key={item.title}
              className="focus-row"
              style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr",
                gap: 16,
                borderTop: "1px solid var(--color-border-subtle)",
                padding: "20px 0",
              }}
            >
              <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
              <span style={{ fontSize: 18, lineHeight: "28px" }}>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
