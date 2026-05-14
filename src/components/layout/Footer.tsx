import ThermodynamicGrid from "@/components/interactive-thermodynamic-grid";

type FooterProps = {
  telegram?: string;
  email?: string;
  behance?: string;
  footerNote?: string;
};

export function Footer({
  telegram = "@veed_ux",
  email = "hello@danildeev.design",
  behance = "portfolio",
  footerNote = "© 2026 / Данил Деев",
}: FooterProps) {
  return (
    <footer id="contacts" className="site-footer motion-reveal">
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
        <div className="site-footer-contacts">
          <ContactItem label="Telegram" value={telegram} />
          <ContactItem label="Email" value={email} />
          <ContactItem label="Behance" value={behance} />
          <ContactItem label="CV" value="Download CV" />
        </div>
        <div className="mono-label site-footer-bottom">
          <span>{footerNote}</span>
          <span>Made with care</span>
        </div>
      </div>
    </footer>
  );
}

function ContactItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ color: "var(--color-text-secondary)", margin: 0 }}>{label}</p>
      <p style={{ margin: "4px 0 0" }}>{value}</p>
    </div>
  );
}
