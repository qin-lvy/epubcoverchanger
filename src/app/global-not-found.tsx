import type { Metadata } from "next";
import Link from "next/link";
import RootDocument from "@/components/RootDocument";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found | Epub Cover Changer",
};

export default function GlobalNotFound() {
  return (
    <RootDocument lang="en">
      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-950">Page not found</h1>
        <p className="mt-4 text-gray-600">This page doesn&apos;t exist.</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Change an EPUB cover
        </Link>
      </section>
    </RootDocument>
  );
}
