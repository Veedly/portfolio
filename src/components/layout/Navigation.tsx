import Link from "next/link";
import { LocationTimeTag } from "./LocationTimeTag";
import { PillNav, type PillNavItem } from "./PillNav";
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
  },
  en: {
    work: "Work",
    about: "About",
    shots: "Shots",
    contacts: "Contacts",
  },
} satisfies Record<Locale, Record<string, string>>;

export function Navigation({ locale = "ru", alternateHref }: NavigationProps) {
  const nextLocale = locale === "ru" ? "en" : "ru";
  const baseHref = `/${locale}`;
  const labels = navLabels[locale];
  const items: PillNavItem[] = [
    { label: labels.work, href: `${baseHref}#work` },
    { label: labels.about, href: `${baseHref}#about` },
    { label: labels.shots, href: `${baseHref}/shots` },
    { label: labels.contacts, href: `${baseHref}#contacts` },
  ];

  return (
    <>
      <header className="container top-controls">
        <div className="top-controls-inner">
          <div className="top-controls-slot top-controls-slot--left">
            <ThemeToggle />
          </div>
          <div className="top-controls-slot top-controls-slot--center">
            <LocationTimeTag />
          </div>
          <div className="top-controls-slot top-controls-slot--right">
            <Link
              className="language-toggle"
              href={alternateHref || `/${nextLocale}`}
              aria-label={`Switch language to ${nextLocale.toUpperCase()}`}
            >
              <span className={locale === "ru" ? "active" : undefined}>RU</span>
              <span className={locale === "en" ? "active" : undefined}>EN</span>
            </Link>
          </div>
        </div>
      </header>
      <PillNav items={items} logoHref={baseHref} />
    </>
  );
}
