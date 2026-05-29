import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login Coming Soon | Epub Cover Changer",
  description:
    "Accounts are not required for the current free EPUB cover changer. Login is planned for future Pro workflows.",
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
        Accounts coming later
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950">
        You do not need an account to change an EPUB cover today.
      </h1>
      <p className="mt-5 text-lg leading-8 text-gray-600">
        Login and signup will be added when Pro workflows need accounts. For now,
        the free tool is intentionally open and fast.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Go to the cover changer
      </Link>
    </section>
  );
}