import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { CaseBlock } from "@/types/content";

type RichTextSection = Extract<CaseBlock, { _type: "richTextSection" }>;

export function RichTextSectionBlock({ block }: { block: RichTextSection }) {
  return (
    <section
      className="container case-section motion-reveal"
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        gap: 24,
        borderTop: "1px solid var(--color-border-subtle)",
        padding: "96px 0",
      }}
    >
      <p className="mono-label">{block.label}</p>
      <div style={{ fontSize: 32, lineHeight: "40px", maxWidth: 760 }}>
        <PortableText value={block.body as PortableTextBlock[]} />
      </div>
    </section>
  );
}
