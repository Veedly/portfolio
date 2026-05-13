import type { CaseBlock } from "@/types/content";
import { CalloutBlock } from "./blocks/CalloutBlock";
import { ComparisonCardsBlock } from "./blocks/ComparisonCardsBlock";
import { ContextGridBlock } from "./blocks/ContextGridBlock";
import { FeatureGridBlock } from "./blocks/FeatureGridBlock";
import { GoalMetricsBlock } from "./blocks/GoalMetricsBlock";
import { ResultBulletsBlock } from "./blocks/ResultBulletsBlock";
import { RichTextSectionBlock } from "./blocks/RichTextSectionBlock";
import { SolutionsBlock } from "./blocks/SolutionsBlock";
import { TakeawaysBlock } from "./blocks/TakeawaysBlock";

export function CaseBlockRenderer({ blocks }: { blocks: CaseBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block._type) {
          case "contextGrid":
            return <ContextGridBlock key={index} block={block} />;
          case "richTextSection":
            return <RichTextSectionBlock key={index} block={block} />;
          case "goalMetrics":
            return <GoalMetricsBlock key={index} block={block} />;
          case "callout":
            return <CalloutBlock key={index} block={block} />;
          case "solutions":
            return <SolutionsBlock key={index} block={block} />;
          case "featureGrid":
            return <FeatureGridBlock key={index} block={block} />;
          case "resultBullets":
            return <ResultBulletsBlock key={index} block={block} />;
          case "comparisonCards":
            return <ComparisonCardsBlock key={index} block={block} />;
          case "takeaways":
            return <TakeawaysBlock key={index} block={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
