import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login Coming Soon | Epub Cover Changer",
  description:
    "Accounts are not required for the current free EPUB cover changer. Future accounts will support saved presets, Pro access, and repeat workflows.",
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
        Accounts coming later
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950">
        No account needed today. Accounts should earn their place.
      </h1>
      <p className="mt-5 text-lg leading-8 text-gray-600">
        The free cover changer is intentionally open and fast. When accounts
        launch, they should help you save presets, join Pro early access, and
        manage repeat EPUB cover workflows.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Use the free tool
        </Link>
        <Link
          href="/#feedback"
          className="inline-flex rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Request Pro access
        </Link>
      </div>
    </section>
  );
}
