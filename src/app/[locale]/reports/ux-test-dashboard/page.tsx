import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ReportAccessGate } from "@/components/reports/ReportAccessGate";
import { UxTestDashboardReport } from "@/components/reports/UxTestDashboardReport";
import { isReportAccessTokenValid, REPORT_ACCESS_COOKIE } from "@/lib/reportAccess";

type Params = { locale: string };

export const metadata: Metadata = {
  title: "Bet Slip UX Study | Client Research Report",
  description: "Old vs. New bet slip usability study conducted as an unmoderated test on Wynde.",
};

export default async function UxTestDashboardPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (locale !== "en") notFound();

  const cookieStore = await cookies();
  const token = cookieStore.get(REPORT_ACCESS_COOKIE)?.value;
  const accessSecret = process.env.REPORT_ACCESS_SECRET || "";

  if (!isReportAccessTokenValid(token, accessSecret)) {
    return <ReportAccessGate />;
  }

  return <UxTestDashboardReport />;
}
