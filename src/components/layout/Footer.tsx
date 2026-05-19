import ThermodynamicGrid from "@/components/interactive-thermodynamic-grid";

type FooterProps = {
  telegram?: string;
  email?: string;
  behance?: string;
  footerNote?: string;
};

export function Footer({
  telegram = "@veed_ux",
  email = "redogdeev31@gmail.com",
  footerNote = "© 2026 / Данил Деев",
}: FooterProps) {
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
        <p className="mono-label">КОНТАКТЫ</p>
        <h2 className="site-footer-title">
          Let&apos;s discuss
          <br />a project
        </h2>
        <div className="site-footer-actions" aria-label="Contact actions">
          <ContactAction href={getTelegramHref(telegram)} label="Написать в Telegram" value={telegram} external />
          <ContactAction href={`mailto:${email}`} label="На почту" value={email} />
        </div>
        <div className="mono-label site-footer-bottom">
          <span>{footerNote}</span>
          <span>Made with care</span>
        </div>
      </div>
    </footer>
  );
}

function ContactAction({
  href,
  label,
  value,
  external = false,
}: {
  href: string;
  label: string;
  value: string;
  external?: boolean;
}) {
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
