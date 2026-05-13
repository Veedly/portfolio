import Link from "next/link";
import type { Shot } from "@/types/content";

export function ShotsStrip({ shots, locale }: { shots: Shot[]; locale: "ru" | "en" }) {
  if (!shots.length) return null;

  return (
    <section className="shots-strip" style={{ padding: "80px 0", overflow: "hidden" }}>
      <div className="container mono-label" style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
        <span>GALLERY</span>
        <Link href={`/${locale}/shots`}>VIEW ALL</Link>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 490px)",
          gap: 20,
          justifyContent: "center",
          marginLeft: -260,
          marginRight: -260,
        }}
      >
        {shots.slice(0, 4).map((shot, index) => (
          <div
            key={`${shot.title || "shot"}-${index}`}
            style={{
              height: 368,
              border: "1px solid var(--color-bg-surface-raised)",
              background: "var(--color-bg-surface)",
              display: "flex",
              alignItems: "flex-end",
              padding: 16,
            }}
          >
            {shot.title ? <span className="mono-label">{shot.title}</span> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
