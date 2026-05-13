import Link from "next/link";
import type { CaseDetail } from "@/types/content";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { CaseBlockRenderer } from "./CaseBlockRenderer";

export function CasePage({ item, locale }: { item: CaseDetail; locale: "ru" | "en" }) {
  const nextLocale = locale === "ru" ? "en" : "ru";

  return (
    <>
      <Navigation locale={locale} alternateHref={`/${nextLocale}/work/${item.slug}`} />
      <main>
        <section className="container" style={{ padding: "48px 0 40px" }}>
          <div className="mono-label" style={{ display: "flex", justifyContent: "space-between" }}>
            <Link href={`/${locale}#work`}>← Назад ко всем работам</Link>
            <span>{item.year}</span>
          </div>
          <div style={{ textAlign: "center", marginTop: 38 }}>
            <h1
              style={{
                fontFamily: "var(--font-hero)",
                fontSize: "clamp(64px, 8vw, 88px)",
                lineHeight: 1,
                fontWeight: 400,
                margin: 0,
              }}
            >
              {item.title}
            </h1>
            <p style={{ fontSize: 18, lineHeight: "28px", color: "var(--color-text-secondary)" }}>{item.subtitle}</p>
          </div>
          <div
            className="case-meta-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 20, marginTop: 52 }}
          >
            <Meta label="Год" value={item.year} />
            <Meta label="Роль" value={item.role} />
            <Meta label="Клиент" value={item.client} />
            <Meta label="Скоуп" value={item.scope} />
          </div>
        </section>
        <div className="container" style={{ height: 655, borderRadius: 4, background: "var(--color-bg-surface-raised)" }} />
        <CaseBlockRenderer blocks={item.blocks || []} />
      </main>
      <Footer />
    </>
  );
}

function Meta({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="mono-label">{label}</p>
      <p style={{ margin: "8px 0 0" }}>{value || "—"}</p>
    </div>
  );
}
