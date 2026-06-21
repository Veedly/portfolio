import { describe, expect, it } from "vitest";
import { createReportAccessToken, isReportAccessTokenValid, isReportPasswordValid } from "./reportAccess";

describe("report access", () => {
  it("validates the configured password without exposing it to the client", () => {
    expect(isReportPasswordValid("pariboom", "pariboom")).toBe(true);
    expect(isReportPasswordValid("wrong", "pariboom")).toBe(false);
  });

  it("creates and validates a signed access token", () => {
    const token = createReportAccessToken("test-secret");

    expect(isReportAccessTokenValid(token, "test-secret")).toBe(true);
    expect(isReportAccessTokenValid(token, "different-secret")).toBe(false);
    expect(isReportAccessTokenValid("forged-token", "test-secret")).toBe(false);
  });
});

