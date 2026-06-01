import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing | Epub Cover Changer",
  description:
    "Single EPUB cover changes are free up to 100MB. Future Pro features will focus on batch workflows, saved presets, and multi-platform exports.",
  alternates: { canonical: "https://epubcoverchanger.com/pricing" },
};

const plans = [
  {
    name: "Free",
    price: "$0",
    note: "For private, single-book cover changes today.",
    features: [
      "Change one EPUB cover at a time",
      "EPUB files up to 100MB",
      "Private browser-based processing",
      "Platform-ready cover presets",
      "Fit and Fill positioning",
      "No watermark or quality downgrade",
    ],
    cta: "Use the free tool",
    href: "/",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "Coming soon",
    note: "For creators and publishers with repeat cover workflows.",
    features: [
      "Batch EPUB cover replacement",
      "Multi-platform export bundles",
      "Saved presets and preferred settings",
      "Larger workflow limits",
      "Smart crop and background options",
      "Priority support",
    ],
    cta: "Join Pro waitlist",
    href: "/#feedback",
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
          Free for single EPUB covers. Pro will be for heavier workflows.
        </h1>
        <p className="mt-5 text-lg leading-8 text-gray-600">
          The core cover changer stays generous: no watermark, no forced account,
          and no quality downgrade. Paid features should earn their place by
          saving time for people who manage many books.
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

      <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-950">
          Why no forced login today?
        </h2>
        <p className="mt-4 leading-7 text-gray-600">
          For the current free tool, an account would mostly add friction. Login
          will make sense when it gives you something useful: saved presets,
          Pro early access, optional history, and faster repeat workflows.
        </p>
      </div>
    </section>
  );
}
