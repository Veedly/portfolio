import ThermodynamicGrid from "@/components/interactive-thermodynamic-grid";

type FooterProps = {
  locale?: "ru" | "en";
  telegram?: string;
  email?: string;
  behance?: string;
  footerNote?: string;
  cvHref?: string;
};

export function Footer({
  locale = "ru",
  telegram = "@veed_ux",
  email = "redogdeev31@gmail.com",
  footerNote = "© 2026 / Данил Деев",
  cvHref,
}: FooterProps) {
  const copy = locale === "ru"
    ? {
        eyebrow: "ОБСУДИТЬ ПРОЕКТ",
        title: "Открыт предложениям",
        description: "Рассматриваю удалённую работу и международные продуктовые команды.",
        telegram: "Написать в Telegram",
        email: "Написать на email",
        cv: cvHref ? "Скачать CV PDF" : "Открыть CV",
        madeWith: "Сделано с вниманием",
      }
    : {
        eyebrow: "LET'S WORK TOGETHER",
        title: "Open to Senior Product Designer opportunities",
        description: "I am considering remote roles and international product teams.",
        telegram: "Message on Telegram",
        email: "Send an email",
        cv: cvHref ? "Download CV PDF" : "View CV",
        madeWith: "Made with care",
      };

  return (
    <footer id="contacts" className="site-footer">
      <ThermodynamicGrid
        data-testid="footer-thermodynamic-grid"
        className="site-footer-grid"
        resolution={12}
        coolingFactor={0.975}
        aria-hidden="true"
      />
      <div className="site-footer-vignette" aria-hidden="true" />
      <div className="container site-footer-content">
        <p className="mono-label">{copy.eyebrow}</p>
        <h2 className="site-footer-title">{copy.title}</h2>
        <p className="site-footer-description">{copy.description}</p>
        <div className="site-footer-actions" aria-label="Contact actions">
          <ContactAction href={getTelegramHref(telegram)} label={copy.telegram} value={telegram} external />
          <ContactAction href={`mailto:${email}`} label={copy.email} value={email} />
          <ContactAction
            href={cvHref || `/${locale}/cv`}
            label={copy.cv}
            value="PDF"
            external={Boolean(cvHref?.startsWith("http"))}
          />
        </div>
        <div className="mono-label site-footer-bottom">
          <span>{footerNote}</span>
          <span>{copy.madeWith}</span>
        </div>
      </div>
    </footer>
  );
}

function ContactAction({ href, label, value, external = false }: { href: string; label: string; value: string; external?: boolean }) {
  return (
    <a className="site-footer-action" href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
      <span className="site-footer-action-stack">
        <span>{label}</span>
        <span>{value}</span>
      </span>
    </a>
  );
}

function getTelegramHref(value: string) {
  const username = value.replace(/^@/, "").trim();
  return username ? `https://t.me/${username}` : "https://t.me/";
}
