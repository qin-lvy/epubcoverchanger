"use client";

import {
  Bug,
  Crown,
  Lightbulb,
  Loader2,
  MessageSquareHeart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { captureEvent } from "@/lib/analytics";

const feedbackOptions = [
  {
    value: "bug",
    title: "Report a bug",
    description:
      "Something failed, looked wrong, or did not work the way you expected.",
    icon: Bug,
  },
  {
    value: "feature",
    title: "Request a feature",
    description:
      "Tell us what would make your ebook cover workflow faster or easier.",
    icon: Lightbulb,
  },
  {
    value: "general",
    title: "Share feedback",
    description:
      "Good or bad, your notes help decide what gets improved next.",
    icon: MessageSquareHeart,
  },
  {
    value: "pro",
    title: "Join Pro early access",
    description:
      "Get notified about publish-ready checks, batch workflows, and early offers.",
    icon: Crown,
  },
] as const;

type FeedbackType = (typeof feedbackOptions)[number]["value"];
type SubmitState = "idle" | "submitting" | "success" | "error";
const emailPattern = /^\S+@\S+\.\S+$/;

export default function FeedbackSection() {
  const [type, setType] = useState<FeedbackType>("bug");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("feedback") === "pro") {
        setType("pro");
      }
    }, 0);

    captureEvent("feedback_viewed");

    return () => window.clearTimeout(timer);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isProInterest = type === "pro";
    const trimmedMessage = message.trim();
    const trimmedEmail = email.trim();

    if (isProInterest) {
      if (!trimmedEmail || !emailPattern.test(trimmedEmail)) {
        setSubmitState("error");
        setErrorMessage(
          "Please enter a valid email address to join Pro early access.",
        );
        return;
      }
    } else {
      if (!trimmedMessage) {
        setSubmitState("error");
        setErrorMessage(
          "Please tell us what happened or what you would like improved.",
        );
        return;
      }

      if (trimmedEmail && !emailPattern.test(trimmedEmail)) {
        setSubmitState("error");
        setErrorMessage("Please enter a valid email address or leave it blank.");
        return;
      }
    }

    setSubmitState("submitting");
    setErrorMessage("");
    captureEvent("feedback_submit_clicked", { feedback_type: type });

    const response = await fetch(isProInterest ? "/api/pro-waitlist" : "/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        message: trimmedMessage,
        email: trimmedEmail,
        website,
        pageUrl: window.location.href,
      }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      setSubmitState("error");
      setErrorMessage(data?.error ?? "Feedback could not be submitted yet.");
      captureEvent("feedback_submit_failed", { feedback_type: type });
      return;
    }

    setSubmitState("success");
    setMessage("");
    setEmail("");
    captureEvent("feedback_submitted", { feedback_type: type });
  }

  return (
    <section id="feedback" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-[1040px] rounded-[2rem] border border-blue-100 bg-blue-50/70 p-8 shadow-sm md:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
            Feedback
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
            Help shape the next version of Epub Cover Changer
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600">
            If something feels confusing, broken, or missing, tell us. This tool
            should grow from real ebook workflows, not guesses made in a vacuum.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-10">
          <div className="grid gap-4 md:grid-cols-4">
            {feedbackOptions.map((option) => {
              const Icon = option.icon;
              const selected = type === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setType(option.value);
                    setSubmitState("idle");
                    setErrorMessage("");
                  }}
                  className={`group rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md ${
                    selected ? "border-primary ring-2 ring-primary/15" : "border-white"
                  }`}
                  aria-pressed={selected}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                      selected
                        ? "bg-primary text-white"
                        : "bg-blue-100 text-primary group-hover:bg-primary group-hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-gray-950">
                    {option.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-5 rounded-2xl bg-white p-5 shadow-sm">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-gray-700">
                Tell us more {type === "pro" ? "(optional)" : ""}
              </span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={
                  type === "pro"
                    ? "What Pro workflow would save you the most time? Batch changes, platform checks, saved presets, or something else?"
                    : "What happened? What would you like improved?"
                }
                className="min-h-32 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-gray-700">
                Email {type === "pro" ? "(required for Pro early access)" : "(optional)"}
              </span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={
                  type === "pro"
                    ? "So we can invite you when Pro opens"
                    : "Only if you want a reply"
                }
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </label>

            <label className="hidden">
              Website
              <input
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                {type === "pro"
                  ? "Pro interest is stored separately from general feedback."
                  : "Your EPUB and cover images are not sent with feedback."}
              </p>
              <button
                type="submit"
                disabled={submitState === "submitting"}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-wait disabled:opacity-75"
              >
                {submitState === "submitting" && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {type === "pro" ? "Join Pro early access" : "Submit feedback"}
              </button>
            </div>

            {submitState === "success" && (
              <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                {type === "pro"
                  ? "Thanks. You are on the Pro early access list."
                  : "Thanks. Your feedback was received and will help shape the next version."}
              </p>
            )}

            {submitState === "error" && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {errorMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
