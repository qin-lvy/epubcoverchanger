import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing | Epub Cover Changer",
  description:
    "Single EPUB cover changes are free. Future Pro features will focus on batch workflows, saved presets, and multi-platform exports.",
  alternates: { canonical: "https://epubcoverchanger.com/pricing" },
};

const plans = [
  {
    name: "Free",
    price: "$0",
    note: "For single-book cover changes today.",
    features: [
      "Change one EPUB cover at a time",
      "Browser-based file processing",
      "Platform-ready cover presets",
      "Fit, fill, and original image modes",
    ],
    cta: "Use the free tool",
    href: "/",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "Coming soon",
    note: "For creators who need faster multi-book workflows.",
    features: [
      "Batch EPUB cover replacement",
      "Saved presets",
      "Multi-platform export bundles",
      "Higher workflow limits and priority support",
    ],
    cta: "Not available yet",
    href: "/",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
          Pricing
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
          Start free. Upgrade only when heavier workflows arrive.
        </h1>
        <p className="mt-5 text-lg leading-8 text-gray-600">
          Single EPUB cover replacement is free today. Paid features will focus on heavier workflows like batch processing, saved presets, and multi-platform exports.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-3xl border p-8 shadow-sm ${
              plan.highlighted
                ? "border-primary bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <h2 className="text-2xl font-semibold text-gray-950">{plan.name}</h2>
            <p className="mt-4 text-4xl font-bold text-gray-950">{plan.price}</p>
            <p className="mt-3 text-gray-600">{plan.note}</p>
            <ul className="mt-8 space-y-3 text-gray-700">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href={plan.href}
              className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold ${
                plan.highlighted
                  ? "bg-primary text-white hover:bg-blue-700"
                  : "border border-gray-300 text-gray-600"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}