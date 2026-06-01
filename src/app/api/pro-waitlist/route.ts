import { NextResponse } from "next/server";

function getSupabaseConfig() {
  return {
    url: process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const pageUrl = typeof body.pageUrl === "string" ? body.pageUrl.slice(0, 500) : "";
    const website = typeof body.website === "string" ? body.website.trim() : "";

    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address to join Pro early access." },
        { status: 400 },
      );
    }

    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { error: "Please tell us what Pro workflow you want, between 10 and 2000 characters." },
        { status: 400 },
      );
    }

    const { url, key } = getSupabaseConfig();
    if (!url || !key) {
      return NextResponse.json(
        { error: "Pro waitlist storage is not configured yet." },
        { status: 503 },
      );
    }

    const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/pro_waitlist`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        email,
        message,
        page_url: pageUrl || null,
        user_agent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
        status: "new",
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Pro waitlist could not be saved yet. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Pro waitlist request could not be submitted." },
      { status: 500 },
    );
  }
}
