import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main
        className="container"
        style={{ minHeight: "70vh", display: "grid", placeItems: "center", textAlign: "center" }}
      >
        <div>
          <p className="mono-label">404</p>
          <h1
            style={{
              fontFamily: "var(--font-hero)",
              fontSize: "clamp(64px, 8vw, 88px)",
              lineHeight: 1,
              fontWeight: 400,
              margin: "20px 0",
            }}
          >
            Page not found
          </h1>
          <Link className="mono-label" href="/ru">
            ← Back home
          </Link>
        </div>
      </main>
    </>
  );
}
