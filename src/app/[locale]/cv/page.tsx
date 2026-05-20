import { notFound } from "next/navigation";
import { Navigation } from "@/components/layout/Navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { localizeRequired } from "@/i18n/localize";
import { sanityFetch } from "@/sanity/client";
import { cvPageQuery } from "@/sanity/queries";
import type { CvEntry, CvPageContent, RawLocalizedCvEntry, RawLocalizedCvPage } from "@/types/content";

type Params = { locale: string };

const fallbackContent = {
  ru: {
    eyebrow: "CV / Product Designer",
    name: "Danil Deev",
    role: "Product Designer",
    intro:
      "Проектирую цифровые продукты с нуля: от продуктовой логики, сценариев и UX-флоу до интерфейсов, дизайн-систем и прототипов.",
    contact: "Новосибирск, Россия / открыт к проектам",
    sectionLabels: {
      experience: "Опыт",
      education: "Образование",
      sideProjects: "Сайд-проекты",
      skills: "Фокус",
    },
    experience: [
      {
        period: "2025 - now",
        title: "Designer",
        place: "INFINOX",
        text: "Работа над продуктами в финтех-домене: интерфейсы, сценарии, визуальная система и поддержка продуктовых команд.",
      },
      {
        period: "2023 - 2025",
        title: "Designer",
        place: "IT Smart Finance",
        text: "Проектирование B2B и финансовых интерфейсов, сложных пользовательских флоу, таблиц, кабинетов и внутренних инструментов.",
      },
      {
        period: "2023 - 2025",
        title: "Designer",
        place: "Altessa Solutions",
        text: "Дизайн продуктовых экранов, прототипов и системных UI-паттернов для веб-продуктов.",
      },
      {
        period: "2022 - 2023",
        title: "Designer",
        place: "NLPC",
        text: "Интерфейсы, лендинги и визуальные материалы для цифровых продуктов и коммуникаций.",
      },
      {
        period: "2021 - 2022",
        title: "Designer",
        place: "Synergy Web",
        text: "Коммерческие сайты, продуктовые страницы, веб-интерфейсы и визуальная упаковка проектов.",
      },
      {
        period: "2020 - 2021",
        title: "Designer",
        place: "Maslo Media",
        text: "Первые коммерческие проекты: веб-дизайн, графика, презентации и digital-коммуникации.",
      },
    ],
    education: [
      {
        period: "2020 - now",
        title: "Self-directed practice",
        place: "Product design, UX, visual systems",
        text: "Постоянная практика в продуктовой логике, интерфейсах, дизайн-системах, 3D, AI-генерации и motion-подаче.",
      },
      {
        period: "2021 - 2024",
        title: "Design courses and workshops",
        place: "UX/UI, Blender, visual design",
        text: "Прикладное обучение через курсы, разборы, личные проекты и регулярную практику на реальных задачах.",
      },
    ],
    sideProjects: [
      {
        period: "2026",
        title: "AI visual experiments",
        place: "Image generation / art direction",
        text: "Серия визуальных экспериментов с генерацией, композицией и подачей интерфейсных идей.",
      },
      {
        period: "2024 - 2025",
        title: "3D interface posters",
        place: "Blender / product visuals",
        text: "Постеры, рендеры и промо-визуалы для интерфейсов, продуктов и личных дизайн-исследований.",
      },
      {
        period: "2021 - 2022",
        title: "WNBL Rozov",
        place: "Visual identity / 3D practice",
        text: "Серия визуальных работ и 3D-практик вокруг брендинга, графики и цифровых объектов.",
      },
    ],
    skills: ["Product logic", "UX flows", "Design systems", "Fintech interfaces", "B2B tools", "Prototyping", "3D visuals"],
  },
  en: {
    eyebrow: "CV / Product Designer",
    name: "Danil Deev",
    role: "Product Designer",
    intro:
      "I design digital products from scratch: product logic, user flows, UX structure, interfaces, design systems, and prototypes.",
    contact: "Novosibirsk, Russia / open for projects",
    sectionLabels: {
      experience: "Experience",
      education: "Education",
      sideProjects: "Side projects",
      skills: "Focus",
    },
    experience: [
      {
        period: "2025 - now",
        title: "Designer",
        place: "INFINOX",
        text: "Fintech product work across interfaces, user scenarios, visual systems, and product team support.",
      },
      {
        period: "2023 - 2025",
        title: "Designer",
        place: "IT Smart Finance",
        text: "B2B and financial interfaces, complex user flows, tables, dashboards, and internal operational tools.",
      },
      {
        period: "2023 - 2025",
        title: "Designer",
        place: "Altessa Solutions",
        text: "Product screens, prototypes, and reusable UI patterns for web products.",
      },
      {
        period: "2022 - 2023",
        title: "Designer",
        place: "NLPC",
        text: "Interfaces, landing pages, and visual materials for digital products and communications.",
      },
      {
        period: "2021 - 2022",
        title: "Designer",
        place: "Synergy Web",
        text: "Commercial websites, product pages, web interfaces, and visual project packaging.",
      },
      {
        period: "2020 - 2021",
        title: "Designer",
        place: "Maslo Media",
        text: "Early commercial projects: web design, graphics, presentations, and digital communication work.",
      },
    ],
    education: [
      {
        period: "2020 - now",
        title: "Self-directed practice",
        place: "Product design, UX, visual systems",
        text: "Ongoing practice across product logic, interfaces, design systems, 3D, AI generation, and motion presentation.",
      },
      {
        period: "2021 - 2024",
        title: "Design courses and workshops",
        place: "UX/UI, Blender, visual design",
        text: "Applied learning through courses, critiques, personal projects, and continuous real-task practice.",
      },
    ],
    sideProjects: [
      {
        period: "2026",
        title: "AI visual experiments",
        place: "Image generation / art direction",
        text: "A series of visual experiments with generation, composition, and presentation of interface ideas.",
      },
      {
        period: "2024 - 2025",
        title: "3D interface posters",
        place: "Blender / product visuals",
        text: "Posters, renders, and promo visuals for interfaces, products, and personal design research.",
      },
      {
        period: "2021 - 2022",
        title: "WNBL Rozov",
        place: "Visual identity / 3D practice",
        text: "A series of visual and 3D studies around branding, graphics, and digital objects.",
      },
    ],
    skills: ["Product logic", "UX flows", "Design systems", "Fintech interfaces", "B2B tools", "Prototyping", "3D visuals"],
  },
} satisfies Record<Locale, CvPageContent>;

export default async function CvPage({ params }: { params: Promise<Params> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const nextLocale = locale === "ru" ? "en" : "ru";
  const cmsContent = await sanityFetch<RawLocalizedCvPage | null>(cvPageQuery).catch(() => null);
  const item = localizeCvPage(cmsContent, locale);

  return (
    <>
      <Navigation locale={locale} alternateHref={`/${nextLocale}/cv`} />
      <main className="container cv-page">
        <section className="cv-hero motion-reveal">
          <p className="mono-label">{item.eyebrow}</p>
          <h1>{item.name}</h1>
          <div className="cv-hero-meta">
            <span>{item.role}</span>
            <span>{item.contact}</span>
          </div>
          <p>{item.intro}</p>
        </section>

        <CvSection title={item.sectionLabels.experience} entries={item.experience} />
        <CvSection title={item.sectionLabels.education} entries={item.education} />
        <CvSection title={item.sectionLabels.sideProjects} entries={item.sideProjects} />

        <section className="cv-section motion-reveal">
          <div className="cv-section-heading">
            <p className="mono-label">{item.sectionLabels.skills}</p>
          </div>
          <div className="cv-skills">
            {item.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

function localizeCvPage(data: RawLocalizedCvPage | null, locale: Locale): CvPageContent {
  const fallback = fallbackContent[locale];

  if (!data) return fallback;

  return {
    eyebrow: localizeRequired(data.eyebrow, locale, fallback.eyebrow),
    name: localizeRequired(data.name, locale, fallback.name),
    role: localizeRequired(data.role, locale, fallback.role),
    intro: localizeRequired(data.intro, locale, fallback.intro),
    contact: localizeRequired(data.contact, locale, fallback.contact),
    sectionLabels: {
      experience: localizeRequired(data.sectionLabels?.experience, locale, fallback.sectionLabels.experience),
      education: localizeRequired(data.sectionLabels?.education, locale, fallback.sectionLabels.education),
      sideProjects: localizeRequired(data.sectionLabels?.sideProjects, locale, fallback.sectionLabels.sideProjects),
      skills: localizeRequired(data.sectionLabels?.skills, locale, fallback.sectionLabels.skills),
    },
    experience: localizeEntries(data.experience, locale, fallback.experience),
    education: localizeEntries(data.education, locale, fallback.education),
    sideProjects: localizeEntries(data.sideProjects, locale, fallback.sideProjects),
    skills: localizeRequired(data.skills, locale, fallback.skills),
    cvFile: data.cvFile,
  };
}

function localizeEntries(entries: RawLocalizedCvEntry[] | undefined, locale: Locale, fallback: CvEntry[]) {
  if (!entries?.length) return fallback;

  return entries
    .map((entry, index) => {
      const fallbackEntry = fallback[index] ?? fallback[0];

      return {
        period: localizeRequired(entry.period, locale, fallbackEntry.period),
        title: localizeRequired(entry.title, locale, fallbackEntry.title),
        place: localizeRequired(entry.place, locale, fallbackEntry.place),
        text: localizeRequired(entry.text, locale, fallbackEntry.text),
      };
    })
    .filter((entry) => entry.period || entry.title || entry.place || entry.text);
}

function CvSection({ title, entries }: { title: string; entries: CvEntry[] }) {
  return (
    <section className="cv-section motion-reveal">
      <div className="cv-section-heading">
        <p className="mono-label">{title}</p>
      </div>
      <div className="cv-list">
        {entries.map((entry) => (
          <article className="cv-row" key={`${entry.period}-${entry.place}-${entry.title}`}>
            <p className="mono-label cv-period">{entry.period}</p>
            <div>
              <h2>{entry.place}</h2>
              <p className="cv-role">{entry.title}</p>
              <p className="cv-description">{entry.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
