import type { CaseBlock } from "@/types/content";
import { CalloutBlock } from "./blocks/CalloutBlock";
import { CaseVideoBlock } from "./blocks/CaseVideoBlock";
import { ComparisonCardsBlock } from "./blocks/ComparisonCardsBlock";
import { ContextGridBlock } from "./blocks/ContextGridBlock";
import { FeatureGridBlock } from "./blocks/FeatureGridBlock";
import { GoalMetricsBlock } from "./blocks/GoalMetricsBlock";
import { ProblemSectionBlock } from "./blocks/ProblemSectionBlock";
import { ResultBulletsBlock } from "./blocks/ResultBulletsBlock";
import { RichTextSectionBlock } from "./blocks/RichTextSectionBlock";
import { SolutionsBlock } from "./blocks/SolutionsBlock";
import { TakeawaysBlock } from "./blocks/TakeawaysBlock";

export function CaseBlockRenderer({ blocks, locale }: { blocks: CaseBlock[]; locale: "ru" | "en" }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block._type) {
          case "contextGrid":
            return <ContextGridBlock key={index} block={block} locale={locale} />;
          case "problemSection":
            return <ProblemSectionBlock key={index} block={block} />;
          case "richTextSection":
            return <RichTextSectionBlock key={index} block={block} />;
          case "goalMetrics":
            return <GoalMetricsBlock key={index} block={block} locale={locale} />;
          case "callout":
            return <CalloutBlock key={index} block={block} />;
          case "solutions":
            return <SolutionsBlock key={index} block={block} locale={locale} />;
          case "featureGrid":
            return <FeatureGridBlock key={index} block={block} locale={locale} />;
          case "resultBullets":
            return <ResultBulletsBlock key={index} block={block} locale={locale} />;
          case "comparisonCards":
            return <ComparisonCardsBlock key={index} block={block} locale={locale} />;
          case "takeaways":
            return <TakeawaysBlock key={index} block={block} locale={locale} />;
          case "caseVideo":
            return <CaseVideoBlock key={index} block={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
