import { caseType } from "./case";
import {
  callout,
  caseVideo,
  comparisonCards,
  contextGrid,
  featureGrid,
  goalMetrics,
  problemSection,
  resultBullets,
  richTextSection,
  solutions,
  takeaways,
} from "./caseBlocks";
import { experienceType } from "./experience";
import { focusItemType } from "./focusItem";
import { shotType } from "./shot";
import { shotTagType } from "./shotTag";
import { siteSettingsType } from "./siteSettings";

export const schemaTypes = [
  caseType,
  shotTagType,
  shotType,
  siteSettingsType,
  experienceType,
  focusItemType,
  contextGrid,
  problemSection,
  richTextSection,
  goalMetrics,
  callout,
  solutions,
  featureGrid,
  resultBullets,
  comparisonCards,
  takeaways,
  caseVideo,
];
