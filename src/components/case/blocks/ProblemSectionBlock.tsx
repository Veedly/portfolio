import type { CaseBlock } from "@/types/content";

type ProblemSection = Extract<CaseBlock, { _type: "problemSection" }>;

export function ProblemSectionBlock({ block }: { block: ProblemSection }) {
  return (
    <section className="container case-section case-problem-section motion-reveal">
      <p className="mono-label">{block.label || "PROBLEM"}</p>
      <div className="case-problem-content">
        <h2>{block.title}</h2>
        {block.description ? <p>{block.description}</p> : null}
        {block.items?.length ? (
          <div className="case-problem-list">
            {block.items.map((item, index) => (
              <div key={`${item.title}-${index}`} className="case-problem-row">
                <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
