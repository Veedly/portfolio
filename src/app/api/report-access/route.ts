import { NextResponse } from "next/server";
import {
  createReportAccessToken,
  isReportPasswordValid,
  REPORT_ACCESS_COOKIE,
} from "@/lib/reportAccess";

export async function POST(request: Request) {
  const configuredPassword = process.env.REPORT_PASSWORD || "";
  const accessSecret = process.env.REPORT_ACCESS_SECRET || "";

  if (!configuredPassword || !accessSecret) {
    return NextResponse.json({ error: "Report access is not configured." }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as { password?: string } | null;

  if (!isReportPasswordValid(body?.password || "", configuredPassword)) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(REPORT_ACCESS_COOKIE, createReportAccessToken(accessSecret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/en/reports/ux-test-dashboard",
    maxAge: 60 * 60 * 12,
  });

  return response;
}

