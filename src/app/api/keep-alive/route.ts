import { NextResponse } from "next/server";

// Supabase pauses free projects that see no activity for about a week.
// A Vercel cron job (vercel.json) calls this route twice a week and makes one
// tiny read so the database stays awake. Nothing from the database is returned.

export const dynamic = "force-dynamic";

function getSupabaseConfig() {
  return {
    url: process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY,
  };
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { url, key } = getSupabaseConfig();
  if (!url || !key) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  try {
    const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/pro_waitlist?select=id&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    return NextResponse.json({ ok: response.ok }, { status: response.ok ? 200 : 502 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
