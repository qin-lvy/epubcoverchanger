import type { Metadata } from "next";
import Link from "next/link";
import { contactEmail, siteUrl } from "@/lib/localized-routes";

export const metadata: Metadata = {
  title: "Contact | EpubCoverChanger.com",
  description:
    "Contact EpubCoverChanger.com by email at hello@epubcoverchanger.com for bug reports, privacy questions, feature requests, or partnership inquiries.",
  alternates: { canonical: `${siteUrl}/contact` },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact EpubCoverChanger.com",
  url: `${siteUrl}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: "EpubCoverChanger.com",
    url: siteUrl,
    email: contactEmail,
  },
};

const topics = [
  {
    title: "Something didn't work",
    body: "Tell us which tool you used, what you expected, and what happened instead. Your device, browser, and any error message help a lot. Please don't attach a book unless we ask for it.",
  },
  {
    title: "Privacy questions",
    body: "Ask what we collect, or ask us to delete feedback or an email address you sent us.",
  },
  {
    title: "Feature ideas",
    body: "Tell us what would make your EPUB workflow faster, such as a format, a reading app, or a batch job you repeat.",
  },
  {
    title: "Partnerships and press",
    body: "For tool directories, reviews, or collaborations, a short note with a link is enough.",
  },
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
        Contact
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950">
        Contact us
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        The fastest way to reach us is email. A real person reads every message,
        and we aim to reply within a few days.
      </p>

      <div className="mt-8 rounded-3xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
        <p className="text-sm font-semibold text-gray-500">Email</p>
        <a
          href={`mailto:${contactEmail}`}
          className="mt-2 inline-block text-lg font-semibold break-all text-primary hover:underline sm:text-2xl"
        >
          {contactEmail}
        </a>
        <p className="mt-4 text-sm leading-6 text-gray-600">
          Prefer a form? Use the{" "}
          <Link href="/#feedback" className="font-medium text-primary hover:underline">
            feedback form
          </Link>{" "}
          on the homepage. Leave an email address there if you want a reply.
        </p>
      </div>

      <h2 className="mt-14 text-2xl font-semibold text-gray-950">What to write to us about</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {topics.map((topic) => (
          <div key={topic.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-gray-950">{topic.title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">{topic.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm leading-6 text-gray-500">
        We can&apos;t remove DRM or help with books you don&apos;t have the right
        to modify. See our{" "}
        <Link href="/terms" className="text-primary hover:underline">Terms</Link> and{" "}
        <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
      </p>
    </section>
  );
}
