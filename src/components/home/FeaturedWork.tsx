import Link from "next/link";
import type { CaseSummary } from "@/types/content";

export function FeaturedWork({ cases, locale }: { cases: CaseSummary[]; locale: "ru" | "en" }) {
  if (!cases.length) return null;

  return (
    <section id="work" className="container" style={{ padding: "0 0 80px" }}>
      <div className="mono-label" style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
        <span>FEATURED WORK</span>
        <span>2020 — 2026</span>
      </div>
      <div style={{ display: "grid", gap: 16 }}>
        {cases.map((item) => (
          <Link
            key={item.slug}
            href={`/${locale}/work/${item.slug}`}
            style={{ display: "grid", gap: 24, padding: "10px 0 24px" }}
          >
            <div style={{ height: 400, borderRadius: 4, background: "var(--color-bg-surface-raised)" }} />
            <div className="project-row-meta" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-hero)",
                    fontSize: 42,
                    lineHeight: "44px",
                    fontWeight: 400,
                    margin: 0,
                  }}
                >
                  {item.title}
                </h2>
                <p className="mono-label" style={{ color: "var(--color-text-secondary)", marginTop: 4 }}>
                  {item.tags?.join(" · ")}
                </p>
              </div>
              <p style={{ margin: 0, lineHeight: "24px" }}>{item.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
