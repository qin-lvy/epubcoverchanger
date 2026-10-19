import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Epub Cover Changer",
  description:
    "Learn why Epub Cover Changer is built around private, browser-based EPUB cover replacement.",
  alternates: { canonical: "https://epubcoverchanger.com/about" },
};

const principles = [
  "Your EPUB stays in your browser. We do not upload your book to a server.",
  "The original cover preview must stay honest. No misleading crop, stretch, or fake quality boost.",
  "Exported covers should match the selected platform size without distorting the image.",
  "The tool should stay fast enough for a simple one-off cover change.",
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
        About
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
        A focused tool for changing EPUB covers without breaking trust.
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        Epub Cover Changer exists for one specific job: replace an EPUB ebook
        cover quickly, privately, and without stretching or damaging the image.
        The product is intentionally narrow because the cover is the part readers
        judge first.
      </p>

      <div className="mt-12 rounded-3xl border border-gray-200 bg-gray-50 p-8">
        <h2 className="text-2xl font-semibold text-gray-950">Product principles</h2>
        <div className="mt-6 grid gap-4">
          {principles.map((principle) => (
            <div
              key={principle}
              className="rounded-2xl border border-gray-200 bg-white p-5 text-gray-700 shadow-sm"
            >
              {principle}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}