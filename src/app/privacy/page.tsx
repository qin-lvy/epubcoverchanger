import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Epub Cover Changer",
  description:
    "Privacy policy for Epub Cover Changer, a browser-based EPUB cover replacement tool.",
  alternates: { canonical: "https://epubcoverchanger.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
        Privacy Policy
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-gray-500">Last updated: May 29, 2026</p>

      <div className="mt-10 space-y-8 text-base leading-8 text-gray-700">
        <div>
          <h2 className="text-xl font-semibold text-gray-950">
            Browser-based file processing
          </h2>
          <p className="mt-3">
            Epub Cover Changer processes EPUB files and cover images in your
            browser. The cover replacement workflow does not require uploading
            your EPUB or selected cover image to our server.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-950">
            Files you choose
          </h2>
          <p className="mt-3">
            You are responsible for the EPUB and cover images you select. We do
            not claim ownership over your files or generated EPUB output.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-950">Analytics</h2>
          <p className="mt-3">
            We use privacy-conscious product analytics to understand whether the
            site is useful, which pages people visit, and which product flows
            need improvement. Analytics events may include page views and basic
            product interaction events, but they do not include your EPUB files
            or cover images.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-950">Feedback</h2>
          <p className="mt-3">
            If you submit feedback, we collect the feedback type, your message,
            the page URL, basic browser information, and your email address only
            if you choose to provide it. Feedback is used to improve the product
            and prioritize fixes or new features.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-950">
            Accounts and paid features
          </h2>
          <p className="mt-3">
            Accounts and paid Pro workflows are not required for the current
            single-book cover replacement flow. If accounts, billing, or paid
            features are added later, this policy will be updated before those
            features are launched.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-950">Contact</h2>
          <p className="mt-3">
            Questions about privacy can be sent through the feedback form on the
            homepage.
          </p>
        </div>
      </div>
    </section>
  );
}