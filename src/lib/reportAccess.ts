import { createHmac, createHash, timingSafeEqual } from "node:crypto";

export const REPORT_ACCESS_COOKIE = "ux-report-access";

const REPORT_ID = "ux-test-dashboard";

export function createReportAccessToken(secret: string) {
  return createHmac("sha256", secret).update(REPORT_ID).digest("hex");
}

export function isReportAccessTokenValid(token: string | undefined, secret: string) {
  if (!token || !secret) return false;
  return safeCompare(token, createReportAccessToken(secret));
}

export function isReportPasswordValid(candidate: string, configuredPassword: string) {
  if (!candidate || !configuredPassword) return false;
  return safeCompare(hash(candidate), hash(configuredPassword));
}

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

