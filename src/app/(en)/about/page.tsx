import type { Metadata } from "next";
import Link from "next/link";
import { contactEmail, localizedRoutes, siteUrl } from "@/lib/localized-routes";

export const metadata: Metadata = {
  title: "About EpubCoverChanger.com | Free, Private EPUB Tools",
  description:
    "EpubCoverChanger.com is an independent site with free browser-based tools to change EPUB covers and edit EPUB metadata. Your books never leave your device.",
  alternates: { canonical: `${siteUrl}/about` },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About EpubCoverChanger.com",
  url: `${siteUrl}/about`,
  mainEntity: {
    "@type": "Organization",
    name: "EpubCoverChanger.com",
    url: siteUrl,
    email: contactEmail,
    description:
      "Free browser-based tools for changing EPUB covers and editing EPUB metadata.",
  },
};

const principles = [
  "Your EPUB stays in your browser. We do not upload your book to a server.",
  "The original cover preview must stay honest. No misleading crop, stretch, or fake quality boost.",
  "Exported covers should match the selected platform size without distorting the image.",
  "The tool should stay fast enough for a simple one-off cover change.",
];

const tools = [
  {
    href: "/",
    title: "EPUB cover changer",
    body: "Replace or add a cover, sized for Kindle, Apple Books, Kobo, or Google Play. Also in Portuguese and Spanish.",
  },
  {
    href: "/epub-metadata-editor",
    title: "EPUB metadata editor",
    body: "Fix the title, author, language, publisher, and description that reading apps show.",
  },
];

const guides = [
  { href: localizedRoutes.changeCover.en, title: "How to change an EPUB cover for Kindle" },
  { href: localizedRoutes.coverSize.en, title: "Best EPUB cover size for each platform" },
  { href: localizedRoutes.sendToKindle.en, title: "How to send an EPUB to Kindle" },
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
        About
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
        About EpubCoverChanger.com
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        EpubCoverChanger.com is an independent website with free tools for
        fixing EPUB ebooks: changing the cover and editing the book&apos;s
        metadata. Everything runs in your browser, so your books never leave
        your device. There is no account to create.
      </p>
      <p className="mt-4 text-lg leading-8 text-gray-600">
        We started with one job, replacing an EPUB cover without stretching or
        damaging the image, because the cover is the part readers judge first.
        We keep the tools narrow on purpose and add one only when readers keep
        running into the same problem.
      </p>

      <h2 className="mt-14 text-2xl font-semibold text-gray-950">What we make</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:border-primary"
          >
            <h3 className="font-semibold text-gray-950">{tool.title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">{tool.body}</p>
          </Link>
        ))}
      </div>
      <p className="mt-6 text-gray-700">Guides, in English, Portuguese, and Spanish:</p>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
        {guides.map((guide) => (
          <li key={guide.href}>
            <Link href={guide.href} className="text-primary hover:underline">
              {guide.title}
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 text-2xl font-semibold text-gray-950">Who uses it</h2>
      <p className="mt-4 leading-8 text-gray-700">
        From October 15 to November 4, 2026, about 900 people opened 4,156 EPUB
        files in the cover tool and saved 3,324 updated books. About a third of
        those books (35%) had no cover at all, which is why adding a missing
        cover works the same way as replacing one. These counts come from our
        own anonymous usage statistics. We never see the books themselves.
      </p>

      <div className="mt-14 rounded-3xl border border-gray-200 bg-gray-50 p-8">
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

      <h2 className="mt-14 text-2xl font-semibold text-gray-950">Contact</h2>
      <p className="mt-4 leading-8 text-gray-700">
        Questions, bug reports, or ideas: email{" "}
        <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
          {contactEmail}
        </a>{" "}
        or see the <Link href="/contact" className="text-primary hover:underline">contact page</Link>.
      </p>
    </section>
  );
}
