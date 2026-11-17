"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { captureEvent } from "@/lib/analytics";

const SOURCE = "metadata_editor_page";

type Status = "idle" | "open" | "sending" | "done" | "error";

export function EditorProSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");

  function openForm() {
    captureEvent("pro_interest_clicked", { source: SOURCE });
    setStatus("open");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      const response = await fetch("/api/pro-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          message: "[EPUB Editor Pro] batch editing + pre-publish check",
          pageUrl: window.location.href,
          website,
        }),
      });
      if (!response.ok) throw new Error("save failed");
      captureEvent("pro_waitlist_joined", { source: SOURCE });
      setStatus("done");
    } catch {
      setError("Sorry, that didn't go through. Please try again later.");
      setStatus("open");
    }
  }

  return (
    <section className="mt-12 rounded-3xl border border-gray-200 bg-gray-50 p-6 md:p-8">
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">Coming soon</p>
      <h2 className="mt-2 text-2xl font-semibold text-gray-950">EPUB Editor Pro</h2>
      <p className="mt-3 leading-8 text-gray-700">
        Editing one book stays free. Pro is for people who look after many books:
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-6 leading-8 text-gray-700">
        <li>
          <strong>Batch editing:</strong> change the metadata and covers of many
          EPUB files in one go.
        </li>
        <li>
          <strong>Pre-publish check:</strong> a report on your EPUB against common
          Amazon KDP and Apple Books requirements, before you upload it.
        </li>
      </ul>

      {status === "idle" && (
        <button
          type="button"
          onClick={openForm}
          className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          Notify me when Pro launches
        </button>
      )}

      {(status === "open" || status === "sending") && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-3" noValidate>
          <p className="text-sm text-gray-700">
            Pro isn&apos;t available yet. Leave your email and we&apos;ll let you know when it is.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="pro-email" className="sr-only">
              Email
            </label>
            <input
              id="pro-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm sm:max-w-xs"
            />
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              className="hidden"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Notify me"}
            </button>
          </div>
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <p className="text-xs text-gray-500">
            We only use your email to tell you about Pro. See our{" "}
            <Link href="/privacy" className="underline">
              privacy policy
            </Link>
            .
          </p>
        </form>
      )}

      {status === "done" && (
        <p className="mt-6 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800" role="status">
          Thanks! We&apos;ll email you when EPUB Editor Pro launches.
        </p>
      )}
    </section>
  );
}

export function AudiobookSiteLink() {
  return (
    <a
      href="https://m4bconverter.com/"
      className="text-primary hover:underline"
      onClick={() => captureEvent("sister_site_clicked", { source: SOURCE, target: "m4bconverter" })}
    >
      M4B Converter
    </a>
  );
}
