import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Epub Cover Changer",
  description: "Terms of service for using Epub Cover Changer.",
  alternates: { canonical: "https://epubcoverchanger.com/terms" },
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
        Terms
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-gray-500">Last updated: May 28, 2026</p>

      <div className="mt-10 space-y-8 text-base leading-8 text-gray-700">
        <div>
          <h2 className="text-xl font-semibold text-gray-950">Use of the tool</h2>
          <p className="mt-3">
            Epub Cover Changer helps you replace EPUB cover images. You agree to
            use it only with files you own, have permission to edit, or are
            legally allowed to modify.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-950">No guarantee of platform approval</h2>
          <p className="mt-3">
            We provide platform-ready size presets, but each ebook marketplace
            may update its own requirements. You are responsible for checking the
            final EPUB against the platform where you plan to publish it.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-950">Your output</h2>
          <p className="mt-3">
            The exported EPUB is generated from the files you provide. You keep
            responsibility for the rights, quality, and distribution of that
            output.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-950">Changes</h2>
          <p className="mt-3">
            We may update these terms as the product evolves, especially when
            accounts, paid features, or batch processing are introduced.
          </p>
        </div>
      </div>
    </section>
  );
}