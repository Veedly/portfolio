"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";

export function ReportAccessGate() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/report-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError("Access denied. Check the password and try again.");
        setPassword("");
        return;
      }

      window.location.reload();
    } catch {
      setError("Unable to verify access. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="report-access-gate">
      <div className="report-access-grid" aria-hidden="true" />
      <div className="report-access-glow" aria-hidden="true" />

      <section className="report-access-panel">
        <div className="report-access-icon" aria-hidden="true">
          <LockKeyhole />
        </div>
        <p className="mono-label">PRIVATE CLIENT REPORT</p>
        <h1>Access denied</h1>
        <p className="report-access-description">
          This research report is protected. Enter the project password to continue.
        </p>

        <form onSubmit={handleSubmit} className={error ? "report-access-form has-error" : "report-access-form"}>
          <label htmlFor="report-password">Password</label>
          <div className="report-access-field">
            <input
              id="report-password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              autoFocus
              required
              placeholder="Enter password"
              aria-describedby={error ? "report-access-error" : undefined}
            />
            <button type="submit" disabled={isSubmitting || !password}>
              <span>{isSubmitting ? "Checking..." : "Open report"}</span>
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
          <p id="report-access-error" className="report-access-error" aria-live="polite">
            {error}
          </p>
        </form>

        <div className="report-access-meta mono-label">
          <span>PARIBOOM / UX RESEARCH</span>
          <span>AUTHORIZED ACCESS ONLY</span>
        </div>
      </section>
    </main>
  );
}

