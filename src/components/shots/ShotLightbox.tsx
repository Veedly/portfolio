"use client";

import { useState } from "react";
import type { Shot } from "@/types/content";

export function ShotLightbox({ shots }: { shots: Shot[] }) {
  const [active, setActive] = useState<Shot | null>(null);

  return (
    <>
      <div className="shots-grid" style={{ columns: "320px", columnGap: 16 }}>
        {shots.map((shot, index) => (
          <button
            key={`${shot.title || "shot"}-${index}`}
            type="button"
            onClick={() => setActive(shot)}
            style={{
              display: "block",
              width: "100%",
              breakInside: "avoid",
              margin: "0 0 16px",
              padding: 0,
              border: 0,
              background: "transparent",
              color: "inherit",
              textAlign: "left",
              cursor: "zoom-in",
            }}
          >
            <div
              style={{
                aspectRatio: index % 3 === 0 ? "4 / 5" : "4 / 3",
                background: "var(--color-bg-surface-raised)",
                borderRadius: 4,
                border: "1px solid var(--color-border-default)",
              }}
            />
            {shot.title ? <p style={{ margin: "10px 0 0", color: "var(--color-text-secondary)" }}>{shot.title}</p> : null}
          </button>
        ))}
      </div>
      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
          style={{
            position: "fixed",
            inset: 0,
            display: "grid",
            placeItems: "center",
            padding: 24,
            background: "rgba(0,0,0,.82)",
            zIndex: 50,
          }}
        >
          <div
            style={{
              width: "min(960px, 90vw)",
              minHeight: "60vh",
              background: "var(--color-bg-surface-raised)",
              border: "1px solid var(--color-border-default)",
              borderRadius: 6,
              display: "grid",
              placeItems: "center",
              padding: 24,
            }}
          >
            {active.title ? <p className="mono-label">{active.title}</p> : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
