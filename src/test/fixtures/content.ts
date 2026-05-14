import type { CaseDetail } from "@/types/content";

export const caseFixture: CaseDetail = {
  title: "Trillions",
  slug: "trillions",
  subtitle: "Web version of a crypto bank",
  year: "2025",
  role: "Product Designer",
  client: "Trillions",
  scope: "Fintech · Web · Design System",
  tags: ["FINTECH", "WEB", "DESIGN SYSTEM"],
  blocks: [
    { _type: "contextGrid", items: [{ title: "Product", text: "Crypto banking interface." }] },
    {
      _type: "problemSection",
      label: "ПРОБЛЕМА",
      title: "Mobile flows did not fit the web context.",
      description: "The web product needed a different information structure.",
      items: [{ title: "Flow length", text: "Mobile steps had to be compressed into one web screen." }],
    },
    { _type: "callout", label: "Гипотеза", text: "A clearer money flow increases successful transactions." },
    { _type: "resultBullets", intro: "Result", bullets: ["Simplified navigation", "Clearer account model"] },
  ],
};
