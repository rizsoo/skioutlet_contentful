import { NextResponse } from "next/server";

export async function GET() {
  console.log("Cron job triggered!");
  return NextResponse.json({ ok: true });
}
