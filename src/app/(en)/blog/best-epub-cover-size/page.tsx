import type { Metadata } from "next";
import Link from "next/link";
import { Cite, SourceList, type BlogSource } from "@/components/BlogSources";
import { localizedAlternates } from "@/lib/localized-routes";

const pageUrl = "https://epubcoverchanger.com/blog/best-epub-cover-size";
const title = "EPUB Cover Size for Kindle, Kobo & Apple Books (2026)";
const description =
  "Official cover sizes for Kindle (1600 x 2560), Apple Books, Kobo and Google Play Books in one table, with sources and the safest size to export.";

export const metadata: Metadata = {
  title,
  description,
  alternates: localizedAlternates("coverSize", "en"),
  openGraph: { title, description, url: pageUrl, type: "article" },
};

const sources: BlogSource[] = [
  {
    label: "Amazon KDP: eBook cover image guidelines",
    url: "https://kdp.amazon.com/en_US/help/topic/G200645690",
  },
  {
    label: "Apple Books Asset Guide: cover art",
    url: "https://help.apple.com/itc/booksassetguide/en.lproj/itc1bda991ba.html",
  },
  {
    label: "Kobo Writing Life Help Center: Setting up a new eBook",
    url: "https://kobowritinglife.zendesk.com/hc/en-us/articles/360058975732-Setting-up-a-New-eBook",
  },
  {
    label: "Google Play Books Partner Center: Book file guidelines",
    url: "https://support.google.com/books/partner/answer/3424254",
  },
  {
    label: "W3C: EPUB 3.3",
    url: "https://www.w3.org/TR/epub-33/",
  },
];

const sizes = [
  {
    platform: "Amazon Kindle (KDP)",
    official:
      "Ideal 2560 x 1600 px (height x width); min 1000 x 625; max 10,000 px per side; ratio at least 1.6:1; JPEG or TIFF; RGB; under 50 MB",
    recommended: "1600 x 2560",
    source: 1,
  },
  {
    platform: "Apple Books",
    official:
      "At least 1400 px on the shorter side; JPEG or PNG; RGB; no upscaled or blurry images",
    recommended: "1600 x 2400",
    source: 2,
  },
  {
    platform: "Kobo",
    official:
      "300 DPI recommended; no larger than 5 MB; JPG or PNG. Kobo does not publish a required pixel size, and its e-readers have a 1448 x 1072 screen (about 3:4)",
    recommended: "1600 x 2400, or 1500 x 2000 to match the screen shape",
    source: 3,
  },
  {
    platform: "Google Play Books",
    official: "At least 640 px; max 7,200 px per side; JPEG, PNG, TIFF or PDF",
    recommended: "1600 x 2400",
    source: 4,
  },
  {
    platform: "Standard EPUB",
    official: "The EPUB standard sets no cover size",
    recommended: "1600 x 2400",
    source: 5,
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "EPUB cover size for Kindle, Kobo, Apple Books and Google Play",
  description,
  url: pageUrl,
  dateModified: "2026-10-21",
  author: { "@type": "Organization", name: "EpubCoverChanger.com", url: "https://epubcoverchanger.com" },
  publisher: { "@type": "Organization", name: "EpubCoverChanger.com", url: "https://epubcoverchanger.com" },
};

const h2 = "text-2xl font-semibold text-gray-950";
const body = "mt-12 space-y-4 text-base leading-8 text-gray-700";

export default function BestEpubCoverSizePage() {
  return (
    <article className="mx-auto max-w-4xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
        Cover size guide
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
        EPUB cover size for Kindle, Kobo, Apple Books and Google Play
      </h1>
      <p className="mt-4 text-sm text-gray-500">
        Last updated: October 2026 · By the EpubCoverChanger.com team
      </p>

      <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-xl font-semibold text-gray-950">Quick answer</h2>
        <p className="mt-3 leading-8 text-gray-700">
          There is no single EPUB cover size. Use <strong>1600 x 2560 px</strong>{" "}
          for Kindle, which is Amazon&apos;s stated ideal. Use{" "}
          <strong>1600 x 2400 px</strong>{" "}(2:3) for Apple Books, Kobo and Google
          Play Books; it meets all three stores&apos; minimums. Export as RGB
          JPEG, under 5 MB.
        </p>
      </div>

      <section className={body}>
        <h2 className={h2}>Cover size by platform</h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Platform</th>
                <th className="px-4 py-3 font-semibold">What the store officially requires</th>
                <th className="px-4 py-3 font-semibold">Size we recommend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 align-top">
              {sizes.map((item) => (
                <tr key={item.platform}>
                  <td className="px-4 py-4 font-semibold text-gray-950">
                    {item.platform}
                  </td>
                  <td className="px-4 py-4 leading-6">
                    {item.official}
                    <Cite n={item.source} />
                  </td>
                  <td className="px-4 py-4 font-medium text-primary">
                    {item.recommended}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <strong>One file for every store:</strong> export 1600 x 2400 px. It
          clears Apple&apos;s 1400 px floor, Google&apos;s 640 px floor and
          Kobo&apos;s 5 MB cap. For Kindle only, 1600 x 2560 matches
          Amazon&apos;s 1.6:1 ideal exactly. If your Kindle cover is missing
          after Send to Kindle, see{" "}
          <Link
            href="/blog/how-to-change-epub-cover"
            className="text-primary hover:underline"
          >
            how to fix missing Kindle covers
          </Link>
          .
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Why sizes differ</h2>
        <p>
          Each store fits the cover to different screens and thumbnails.
          Amazon&apos;s 1.6:1 shape is taller than the 2:3 (1.5:1) shape most
          other stores use. A 2:3 cover still works on Kindle, but it will be
          shown with slightly different cropping or margins than a 1.6:1 cover.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Fit vs fill</h2>
        <p>
          <em>Fit</em> keeps the whole image visible and fills the leftover
          space with a background colour. <em>Fill</em> covers the page edge to
          edge and may crop the edges. Use <em>Fit</em> when there is text near
          the edges, and <em>Fill</em> for full-bleed artwork. Never stretch the
          image to hit a size.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Quality rule</h2>
        <p>
          Start from the largest original image you have. Resizing a small image
          up to 1600 x 2560 makes the file bigger but adds no detail, and Apple
          explicitly rejects upscaled covers
          <Cite n={2} />.
        </p>
      </section>

      <div className="mt-12 rounded-3xl border border-blue-100 bg-blue-50 p-8">
        <h2 className="text-2xl font-semibold text-gray-950">
          Need to export one of these sizes?
        </h2>
        <p className="mt-3 text-gray-700">
          EpubCoverChanger.com includes Kindle, Apple Books, Kobo and Google Play
          presets and never stretches your image.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Export a cover at the right size
        </Link>
      </div>

      <SourceList sources={sources} />
    </article>
  );
}
