// src/app/api/ping/route.ts  (ou app/api/ping/route.ts)
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const maskEmail = (v?: string) => {
  if (!v) return null;
  const [n, d] = v.split("@");
  return d ? `${(n ?? "").slice(0,2)}***@${d}` : "***";
};
const mask = (v?: string) => (v ? `*** (${v.length} chars)` : null);

export async function GET() {
  const host = (process.env.SMTP_HOST || "").trim();
  const port = (process.env.SMTP_PORT || "").trim();
  const user = (process.env.SMTP_USER || "").trim();
  const pass = (process.env.SMTP_PASS || "").trim();
  const to   = (process.env.MAIL_TO || "").trim();

  return NextResponse.json({
    seenByServer: true,
    SMTP_HOST: host || null,
    SMTP_PORT: port || null,
    SMTP_USER_masked: maskEmail(user),
    SMTP_PASS_masked: mask(pass),
    MAIL_TO_masked: maskEmail(to),
  });
}
