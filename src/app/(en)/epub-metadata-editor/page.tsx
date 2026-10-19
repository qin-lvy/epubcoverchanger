import type { Metadata } from "next";
import Link from "next/link";
import { Cite, SourceList, type BlogSource } from "@/components/BlogSources";
import MetadataEditor from "@/components/MetadataEditor";

const pageUrl = "https://epubcoverchanger.com/epub-metadata-editor";
const title = "EPUB Metadata Editor: Edit Title, Author & Language Free";
const description =
  "Edit an EPUB's title, author, language and description free in your browser, no upload. Adds the missing language that can make Send to Kindle fail.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    url: pageUrl,
    type: "website",
    images: [{ url: "https://epubcoverchanger.com/og-image.png", width: 1200, height: 630 }],
  },
};

const sources: BlogSource[] = [
  {
    label: "W3C EPUB 3.3: required metadata (identifier, title, language)",
    url: "https://www.w3.org/TR/epub-33/#sec-opf-dcmes-required",
  },
  {
    label: "W3C EPUB 3.3: the dc:language element",
    url: "https://www.w3.org/TR/epub-33/#sec-opf-dclanguage",
  },
  {
    label: "W3C EPUB 3.3: the dc:creator element and file-as sort names",
    url: "https://www.w3.org/TR/epub-33/#sec-opf-dccreator",
  },
  {
    label: "Calibre-Web-Automated: Send to Kindle E999 errors and missing language metadata",
    url: "https://github.com/crocodilestick/Calibre-Web-Automated/discussions/147",
  },
];

const faqs = [
  {
    question: "Is this EPUB metadata editor free and private?",
    answer:
      "Yes. It is free, and the book is edited inside your browser. The file is never uploaded to a server.",
  },
  {
    question: "Why does Send to Kindle fail with error E999?",
    answer:
      "One known cause is an EPUB with no language set. The EPUB standard requires a language, so add one here (for example en for English) and send the file again.",
  },
  {
    question: "Will editing the metadata change my book's text or cover?",
    answer:
      "No. Only the title, author, language, publisher and description in the book's package file change. Chapters, images, fonts and the cover stay exactly as they were.",
  },
  {
    question: "Does it work on iPhone and Android?",
    answer:
      "Yes. Open the page in Safari or Chrome, choose the EPUB from Files or Downloads, edit, and save the updated file.",
  },
  {
    question: "Can I edit a book I bought from a store?",
    answer:
      "Not if it has DRM. Store-bought books are usually DRM-protected, and the editor only works with DRM-free EPUB files.",
  },
  {
    question: "What language code should I use?",
    answer:
      "Use a short code for the language the book is written in: en for English, es for Spanish, pt-BR for Brazilian Portuguese, fr for French, de for German.",
  },
];

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "EPUB Metadata Editor by EpubCoverChanger.com",
  url: pageUrl,
  description,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (runs in the browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "EpubCoverChanger.com", url: "https://epubcoverchanger.com" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const h2 = "text-2xl font-semibold text-gray-950";
const body = "mt-12 space-y-4 text-base leading-8 text-gray-700";
const steps = "list-decimal space-y-2 pl-6";

export default function EpubMetadataEditorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-gray-50 px-6 py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-[32px] leading-[1.1] font-extrabold text-[#111827] md:text-[44px]">
            EPUB metadata editor
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
            Change an EPUB&apos;s title, author, language, publisher and
            description for free. The book is edited in your browser and never
            uploaded, on desktop, iPhone or Android.
          </p>
        </div>
        <div className="mt-8">
          <MetadataEditor />
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 pb-20">
        <div className="mt-12 rounded-3xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-semibold text-gray-950">Quick answer</h2>
          <p className="mt-3 leading-8 text-gray-700">
            An EPUB&apos;s title, author and language are stored as metadata in
            its package file. Reading apps use it for the name and author they
            show in your library. To edit EPUB metadata, open the file above,
            change the fields, and save. If the book has no language, add one:
            the EPUB standard requires it
            <Cite n={1} />, and a missing language is a known cause of Send to
            Kindle error E999
            <Cite n={4} />.
          </p>
        </div>

        <section className={body}>
          <h2 className={h2}>How to edit EPUB metadata</h2>
          <ol className={steps}>
            <li>Click <strong>Upload EPUB</strong> above and choose a DRM-free EPUB file.</li>
            <li>Change the title, the author (add or remove authors if needed) and the language.</li>
            <li>Optionally fill in the publisher and description.</li>
            <li>
              Click <strong>Save updated EPUB</strong>. On iPhone, tap{" "}
              <strong>Save or Open EPUB</strong> to save it to Files or share it
              to the Kindle app.
            </li>
          </ol>
        </section>

        <section className={body}>
          <h2 className={h2}>What each field changes</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Field</th>
                  <th className="px-4 py-3 font-semibold">Where you see it</th>
                  <th className="px-4 py-3 font-semibold">Required by EPUB?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 align-top">
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-950">Title</td>
                  <td className="px-4 py-3">The book name in your Kindle, Kobo or Apple Books library</td>
                  <td className="px-4 py-3">Yes<Cite n={1} /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-950">Author</td>
                  <td className="px-4 py-3">The name under the title, and sorting by author</td>
                  <td className="px-4 py-3">No</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-950">Language</td>
                  <td className="px-4 py-3">Not shown, but used by reading apps and by Send to Kindle</td>
                  <td className="px-4 py-3">Yes<Cite n={2} /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-950">Publisher, description</td>
                  <td className="px-4 py-3">Book details screens in some reading apps</td>
                  <td className="px-4 py-3">No</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            When you rename an author, the editor also removes the old
            &quot;file-as&quot; sort name
            <Cite n={3} />, so the book isn&apos;t sorted under the previous
            name. Fields you don&apos;t change are left exactly as they were.
          </p>
        </section>

        <section className={body}>
          <h2 className={h2}>Why Kindle shows the wrong title or author</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>The metadata is wrong or empty.</strong> Files made with
              simple converters can carry a placeholder title, such as the
              file name, or no author at all.
            </li>
            <li>
              <strong>An old copy is still in your library.</strong> Delete it
              and send the edited file again.
            </li>
            <li>
              <strong>The cover is missing too?</strong> Use our{" "}
              <Link href="/" className="text-primary hover:underline">
                EPUB cover changer
              </Link>{" "}
              and see{" "}
              <Link href="/blog/how-to-change-epub-cover" className="text-primary hover:underline">
                how to fix missing Kindle covers
              </Link>
              .
            </li>
          </ul>
          <p>
            Ready to send the fixed book? Follow{" "}
            <Link href="/blog/send-epub-to-kindle" className="text-primary hover:underline">
              how to send an EPUB to Kindle
            </Link>
            .
          </p>
        </section>

        <section className={body}>
          <h2 className={h2}>FAQ</h2>
          {faqs.map((faq) => (
            <div key={faq.question} className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-950">{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </section>

        <SourceList sources={sources} />
      </article>
    </>
  );
}
