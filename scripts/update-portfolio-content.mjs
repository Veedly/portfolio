import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-05-13" });
const dryRun = process.env.DRY_RUN === "1";

const localized = (ru, en) => ({ ru, en });

const experienceUpdates = {
  "experience-infinox": {
    role: localized("Product Designer · Contract", "Product Designer · Contract"),
    period: localized("2025 — н.в.", "2025 — now"),
    summary: localized("Криптобанкинг, торговые платформы, дизайн-системы", "Crypto banking, trading platforms, design systems"),
    order: 1,
  },
  "experience-nlpc": {
    role: localized("Lead Product Designer", "Lead Product Designer"),
    period: localized("2021 — н.в.", "2021 — now"),
    summary: localized("Международные клиентские продукты для healthcare, EdTech и fintech", "International client products for healthcare, EdTech and fintech"),
    order: 2,
  },
  "experience-it-smart-finance": {
    role: localized("Product Designer", "Product Designer"),
    period: localized("2023 — 2025", "2023 — 2025"),
    summary: localized("Личный кабинет, внутренние системы, инвестиционные продукты", "Personal account, internal systems, investment products"),
    order: 3,
  },
  "experience-altessa": {
    company: localized("Altessa Solution", "Altessa Solution"),
    role: localized("Senior UX/UI Designer", "Senior UX/UI Designer"),
    period: localized("2022 — 2023", "2022 — 2023"),
    order: 4,
  },
  "experience-synergy": {
    role: localized("Lead Designer", "Lead Designer"),
    period: localized("2020 — 2021", "2020 — 2021"),
    order: 5,
  },
  "experience-maslo": {
    role: localized("Web Designer", "Web Designer"),
    period: localized("2019 — 2020", "2019 — 2020"),
    order: 6,
  },
};

const statusUpdates = {
  "case-trillions": {
    status: localized("В разработке · Запуск осенью 2026", "In development · Launching Fall 2026"),
    statusDetails: localized(
      "MVP находится в активной разработке. Публичный запуск мобильного и веб-продукта запланирован на осень 2026 года.",
      "The MVP is in active development. The public launch of the mobile and web product is planned for Fall 2026.",
    ),
  },
  "case-nibble-invest": {
    status: localized("Дизайн передан", "Design delivered"),
    statusDetails: localized("Финальные макеты готовы и переданы команде.", "Final designs are complete and handed off to the team."),
  },
  "case-crm-list": {
    status: localized("Запущен", "Launched"),
    statusDetails: localized("MVP запущен и используется во внутренних процессах компании.", "The MVP is live and used in the company's internal operations."),
  },
};

const cases = await client.fetch(`*[_id in ["case-trillions", "case-nibble-invest", "case-crm-list"]]{_id,blocks}`);
const transaction = client.transaction();

transaction.patch("siteSettings", (patch) => patch.set({
  role: localized("Senior Product Designer", "Senior Product Designer"),
  intro: localized(
    "Проектирую fintech-, crypto- и B2B-продукты: от архитектуры и сложных пользовательских сценариев до дизайн-системы и запуска.",
    "I design fintech, crypto, and B2B products: from architecture and complex user flows to design systems and launch.",
  ),
  heroMeta: localized(
    "7+ лет опыта · Mobile & Web · Fintech · Design Systems · Motion & 3D",
    "7+ years of experience · Mobile & Web · Fintech · Design Systems · Motion & 3D",
  ),
}));

for (const [id, values] of Object.entries(experienceUpdates)) {
  transaction.patch(id, (patch) => patch.set(values));
}

for (const item of cases) {
  const blocks = updateCaseBlocks(item._id, item.blocks || []);
  transaction.patch(item._id, (patch) => patch.set({ ...statusUpdates[item._id], blocks }));
}

const cv = await client.fetch(`*[_type == "cvPage"][0]{_id,experience}`);
if (cv?._id && Array.isArray(cv.experience)) {
  const byKey = {
    infinox: ["Product Designer · Contract", "2025 — now", 10],
    nlpc: ["Lead Product Designer", "2021 — now", 20],
    "it-smart-finance": ["Product Designer", "2023 — 2025", 30],
    "altessa-solutions": ["Senior UX/UI Designer", "2022 — 2023", 40],
    "synergy-web": ["Lead Designer", "2020 — 2021", 50],
    "maslo-media": ["Web Designer", "2019 — 2020", 60],
  };
  const experience = cv.experience.map((entry) => {
    const update = byKey[entry._key];
    if (!update) return entry;
    return { ...entry, title: localized(update[0], update[0]), period: localized(update[1].replace("now", "настоящее время"), update[1]), order: update[2] };
  });
  transaction.patch(cv._id, (patch) => patch.set({ experience }));
}

const untitledShots = await client.fetch(`*[_type == "shot" && !defined(title.ru) && !defined(title.en)]._id`);
for (const id of untitledShots) {
  transaction.patch(id, (patch) => patch.set({ published: false, featured: false }));
}

if (dryRun) {
  console.log(JSON.stringify({ cases: cases.map((item) => item._id), experience: Object.keys(experienceUpdates), hiddenUntitledShots: untitledShots }, null, 2));
} else {
  const result = await transaction.commit({ autoGenerateArrayKeys: true });
  console.log(`Updated ${result.results.length} documents.`);
}

function updateCaseBlocks(caseId, blocks) {
  return blocks.map((block) => {
    if (block._type === "contextGrid") return { ...block, items: addResponsibilityItems(caseId, block.items || []) };

    if (caseId === "case-trillions" && block._type === "goalMetrics") {
      return {
        ...block,
        goal: localized(
          "Запустить MVP веб-версии и проверить востребованность веб-канала среди B2C- и B2B-пользователей.",
          "Launch the web MVP and validate demand for a web channel among B2C and B2B users.",
        ),
        metrics: [
          metric("activation", "Activation Rate", "Activation Rate", "Доля пользователей, совершивших первое целевое действие в веб-версии.", "Share of users who complete the first target action in the web version."),
          metric("task-completion", "Task Completion Rate", "Task Completion Rate", "Доля успешно завершённых ключевых сценариев.", "Share of successfully completed core scenarios."),
          metric("retention", "Retention", "Retention", "Возвращаются ли пользователи в веб-продукт после первого использования.", "Whether users return to the web product after their first session."),
          metric("drop-off", "Drop-off Rate", "Drop-off Rate", "Доля пользователей, покинувших ключевой сценарий до завершения.", "Share of users who leave a core scenario before completion."),
          metric("csat", "CSAT", "CSAT", "Оценка удобства после завершения операции.", "Ease-of-use rating after completing an operation."),
        ],
      };
    }

    if (caseId === "case-trillions" && block._type === "solutions") {
      return {
        ...block,
        items: (block.items || []).map((item) => item._key === "s3" ? {
          ...item,
          text: localized(
            "Дизайн-система обеспечила единый набор компонентов и токенов для мобильной и веб-команд.",
            "The design system provided a shared set of components and tokens for the mobile and web teams.",
          ),
        } : item),
      };
    }

    if (caseId === "case-trillions" && block._type === "resultBullets") {
      return {
        ...block,
        intro: localized(
          "MVP находится в активной разработке. Результаты дизайн-этапа:",
          "The MVP is in active development. Design stage outcomes:",
        ),
        bullets: [
          bullet("sections", "Спроектированы 11 разделов веб-платформы.", "11 web platform sections designed."),
          bullet("flows", "Ключевые мобильные сценарии адаптированы под десктоп.", "Key mobile scenarios adapted to desktop."),
          bullet("system", "Создана единая дизайн-система.", "A shared design system created."),
          bullet("handoff", "Токены и компоненты переданы в разработку.", "Tokens and components handed to development."),
        ],
      };
    }

    if (caseId === "case-nibble-invest" && block._type === "goalMetrics") {
      return {
        ...block,
        goal: localized(
          "Привлечь больше заёмщиков на платформу и повысить конверсию в регистрацию. Эффект на CAC должен оцениваться после запуска.",
          "Attract more borrowers and increase registration conversion. The effect on CAC should be measured after launch.",
        ),
      };
    }

    if (caseId === "case-nibble-invest" && block._type === "solutions") {
      return {
        ...block,
        items: (block.items || []).map((item) => item._key === "s1" ? {
          ...item,
          text: localized(
            "Разделение воронок позволяет направлять рекламный трафик на релевантные посадочные страницы и создаёт основу для снижения CAC после запуска.",
            "Separating the funnels makes it possible to direct paid traffic to relevant landing pages and creates a foundation for reducing CAC after launch.",
          ),
        } : item),
      };
    }

    if (caseId === "case-nibble-invest" && block._type === "resultBullets") {
      return {
        ...block,
        bullets: (block.bullets || []).map((item) => item._key === "b2" ? {
          ...item,
          text: localized(
            "По результатам модерируемого usability-тестирования task success rate вырос с 60% до 100%, а среднее время выполнения сценария снизилось с 72 до 51 секунды.",
            "In a moderated usability test, task success rate increased from 60% to 100%, while average scenario completion time decreased from 72 to 51 seconds.",
          ),
        } : item),
      };
    }

    if (caseId === "case-crm-list" && block._type === "solutions") {
      return {
        ...block,
        items: (block.items || []).map((item) => item._key === "s2" ? {
          ...item,
          text: localized(
            "Side Panel позволяет редактировать данные сотрудника, не покидая таблицу и не теряя контекст текущего объекта.",
            "The Side Panel lets managers edit employee data without leaving the table or losing the context of the current site.",
          ),
        } : item),
      };
    }

    if (caseId === "case-crm-list" && block._type === "resultBullets") {
      return {
        ...block,
        bullets: (block.bullets || []).map((item) => item._key === "b4" ? {
          ...item,
          text: localized(
            "Side Panel позволяет редактировать данные сотрудника, не покидая таблицу и не теряя контекст текущего объекта.",
            "The Side Panel lets managers edit employee data without leaving the table or losing the context of the current site.",
          ),
        } : item),
      };
    }

    return block;
  });
}

function addResponsibilityItems(caseId, items) {
  const withoutOldScope = items.filter((item) => !["responsibility", "outside-scope"].includes(item._key));
  const detail = caseId === "case-crm-list"
    ? "Архитектура продукта, пользовательские сценарии, UX/UI, прототипирование, дизайн-система и поддержка разработки."
    : "Архитектура продукта, пользовательские флоу, UX/UI, прототипирование, дизайн-система и поддержка разработки.";
  return [
    ...withoutOldScope,
    {
      _key: "responsibility",
      _type: "object",
      title: localized("Моя зона ответственности", "My responsibility"),
      text: localized(detail, "Product architecture, user flows, UX/UI, prototyping, design system, and development support."),
    },
    {
      _key: "outside-scope",
      _type: "object",
      title: localized("Вне моей зоны ответственности", "Outside my responsibility"),
      text: localized("Пострелизная аналитика, backend и маркетинговая стратегия.", "Post-launch analytics, backend, and marketing strategy."),
    },
  ];
}

function metric(key, ruKey, enKey, ruValue, enValue) {
  return { _key: key, _type: "object", key: localized(ruKey, enKey), value: localized(ruValue, enValue) };
}

function bullet(key, ru, en) {
  return { _key: key, _type: "object", text: localized(ru, en) };
}
