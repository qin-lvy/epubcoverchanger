import { NextResponse } from "next/server";

const FEEDBACK_TYPES = ["bug", "feature", "general"] as const;
type FeedbackType = (typeof FEEDBACK_TYPES)[number];

function isFeedbackType(value: unknown): value is FeedbackType {
  return typeof value === "string" && FEEDBACK_TYPES.includes(value as FeedbackType);
}

function getSupabaseConfig() {
  return {
    url: process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const type = body.type;
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const pageUrl = typeof body.pageUrl === "string" ? body.pageUrl.slice(0, 500) : "";
    const website = typeof body.website === "string" ? body.website.trim() : "";

    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!isFeedbackType(type)) {
      return NextResponse.json(
        { error: "Please choose a valid feedback type." },
        { status: 400 },
      );
    }

    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { error: "Feedback must be between 10 and 2000 characters." },
        { status: 400 },
      );
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address or leave it blank." },
        { status: 400 },
      );
    }

    const { url, key } = getSupabaseConfig();
    if (!url || !key) {
      return NextResponse.json(
        { error: "Feedback storage is not configured yet." },
        { status: 503 },
      );
    }

    const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/feedback`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        type,
        message,
        email: email || null,
        page_url: pageUrl || null,
        user_agent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
        status: "new",
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Feedback could not be saved yet. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Feedback could not be submitted." },
      { status: 500 },
    );
  }
}