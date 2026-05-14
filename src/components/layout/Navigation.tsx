import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

type Locale = "ru" | "en";

type NavigationProps = {
  availabilityStatus?: string;
  locale?: Locale;
  alternateHref?: string;
};

const navLabels = {
  ru: {
    work: "Работы",
    about: "Обо мне",
    shots: "Шоты",
    contacts: "Контакты",
    availability: "ОТКРЫТ ДЛЯ ПРОЕКТОВ",
  },
  en: {
    work: "Work",
    about: "About",
    shots: "Shots",
    contacts: "Contacts",
    availability: "OPEN FOR PROJECTS",
  },
} satisfies Record<Locale, Record<string, string>>;

export function Navigation({ availabilityStatus, locale = "ru", alternateHref }: NavigationProps) {
  const nextLocale = locale === "ru" ? "en" : "ru";
  const baseHref = `/${locale}`;
  const labels = navLabels[locale];

  return (
    <header className="container" style={{ padding: "18px 0" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href={baseHref} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span
              aria-hidden
              style={{ width: 8, height: 8, borderRadius: 999, background: "var(--color-text-primary)" }}
            />
            <span className="mono-label" style={{ color: "var(--color-text-secondary)" }}>
              DD
            </span>
          </Link>
          <div style={{ display: "flex", gap: 16 }}>
            <Link className="mono-label" href={`${baseHref}#work`}>
              {labels.work}
            </Link>
            <Link className="mono-label" href={`${baseHref}#about`}>
              {labels.about}
            </Link>
            <Link className="mono-label" href={`${baseHref}/shots`}>
              {labels.shots}
            </Link>
            <Link className="mono-label" href={`${baseHref}#contacts`}>
              {labels.contacts}
            </Link>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span className="mono-label" style={{ color: "var(--color-accent-success)" }}>
            {availabilityStatus || labels.availability}
          </span>
          <ThemeToggle />
          <Link
            className="language-toggle"
            href={alternateHref || `/${nextLocale}`}
            aria-label={`Switch language to ${nextLocale.toUpperCase()}`}
          >
            <span className={locale === "ru" ? "active" : undefined}>RU</span>
            <span className={locale === "en" ? "active" : undefined}>EN</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
