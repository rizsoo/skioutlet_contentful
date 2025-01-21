import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("Cron job triggered with a POST request!");

  // Trigger the Vercel API call
  const vercelApiUrl =
    "https://api.vercel.com/v1/integrations/deploy/prj_iicM7lRil6yfXhzwZ4MqHFYKhy1x/1pcM1lcEHr";

  try {
    const response = await fetch(vercelApiUrl, {
      method: "POST",
    });

    if (!response.ok) {
      console.error("Failed to trigger Vercel deploy:", await response.text());
      return NextResponse.json(
        { ok: false, error: "Vercel API call failed" },
        { status: 500 }
      );
    }

    console.log("Vercel deploy triggered successfully!");
    return NextResponse.json({ ok: true, message: "Vercel deploy triggered" });
  } catch (error) {
    console.error("Error triggering Vercel deploy:", error);
    return NextResponse.json(
      { ok: false, error: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
