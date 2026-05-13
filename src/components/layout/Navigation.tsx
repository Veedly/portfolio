import Link from "next/link";

type Locale = "ru" | "en";

type NavigationProps = {
  availabilityStatus?: string;
  locale?: Locale;
  alternateHref?: string;
};

export function Navigation({
  availabilityStatus = "OPEN FOR PROJECTS",
  locale = "ru",
  alternateHref,
}: NavigationProps) {
  const nextLocale = locale === "ru" ? "en" : "ru";
  const baseHref = `/${locale}`;

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
              Work
            </Link>
            <Link className="mono-label" href={`${baseHref}#about`}>
              Обо мне
            </Link>
            <Link className="mono-label" href={`${baseHref}/shots`}>
              Shots
            </Link>
            <Link className="mono-label" href={`${baseHref}#contacts`}>
              Контакты
            </Link>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span className="mono-label" style={{ color: "var(--color-accent-success)" }}>
            {availabilityStatus}
          </span>
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
