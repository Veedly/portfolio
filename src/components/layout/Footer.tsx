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
    <footer
      id="contacts"
      style={{ borderTop: "1px solid var(--color-border-subtle)", marginTop: 120, paddingTop: 80 }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        <p className="mono-label">КОНТАКТЫ</p>
        <h2
          style={{
            fontFamily: "var(--font-hero)",
            fontSize: "clamp(56px, 7vw, 88px)",
            lineHeight: 1,
            fontWeight: 400,
            margin: "24px 0 88px",
          }}
        >
          Let&apos;s discuss
          <br />a project
        </h2>
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 24, textAlign: "left" }}
        >
          <ContactItem label="Telegram" value={telegram} />
          <ContactItem label="Email" value={email} />
          <ContactItem label="Behance" value={behance} />
          <ContactItem label="CV" value="Download CV" />
        </div>
        <div
          className="mono-label"
          style={{
            borderTop: "1px solid var(--color-border-subtle)",
            marginTop: 80,
            padding: "20px 0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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
