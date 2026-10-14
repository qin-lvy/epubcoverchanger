import type { Metadata } from "next";
import Link from "next/link";
import { Cite, SourceList, type BlogSource } from "@/components/BlogSources";

const pageUrl = "https://epubcoverchanger.com/blog/how-to-change-epub-cover";
const title = "Change an EPUB Cover for Kindle & Fix Missing Covers";
const description =
  "Kindle not showing your EPUB cover after Send to Kindle? See why it happens and how to add or change the cover free on iPhone, Android or desktop.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title, description, url: pageUrl, type: "article" },
};

const sources: BlogSource[] = [
  {
    label: "The eBook Reader: Send to Kindle apps for PC and Mac now support EPUB",
    url: "https://blog.the-ebook-reader.com/2022/12/20/send-to-kindle-apps-for-pc-and-mac-now-support-epub/",
  },
  {
    label: "alexwlchan: Adding cover images to EPUBs from AO3",
    url: "https://alexwlchan.net/2025/ao3-epub-covers/",
  },
  {
    label: "W3C EPUB 3.3: the cover-image property",
    url: "https://www.w3.org/TR/epub-33/#sec-cover-image",
  },
  {
    label: "W3C EPUB 3.3: the mimetype file",
    url: "https://www.w3.org/TR/epub-33/#sec-zip-container-mime",
  },
  {
    label: "kindle-epub-fix on GitHub: fixing EPUB encoding for Send to Kindle",
    url: "https://github.com/innocenat/kindle-epub-fix",
  },
  {
    label: "Calibre-Web-Automated: Send to Kindle E999 errors and missing language metadata",
    url: "https://github.com/crocodilestick/Calibre-Web-Automated/discussions/147",
  },
  {
    label: "The eBook Reader: the Send to Kindle web page accepts EPUBs up to 200 MB",
    url: "https://blog.the-ebook-reader.com/2022/11/17/new-send-to-kindle-webpage-can-send-epubs-and-documents-to-kindles/",
  },
  {
    label: "Take Control Books: the Send to Kindle app's 50 MB limit",
    url: "https://www.takecontrolbooks.com/your-kindle-can-finally-read-epub-files/",
  },
  {
    label: "TidBITS: Dealing with Send to Kindle's 50 MB limit",
    url: "https://tidbits.com/2016/08/15/dealing-with-send-to-kindles-50-mb-limit/",
  },
  {
    label: "Amazon KDP: eBook cover image guidelines",
    url: "https://kdp.amazon.com/en_US/help/topic/G200645690",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How to Change an EPUB Cover for Kindle (and Fix Missing Covers)",
  description,
  url: pageUrl,
  dateModified: "2026-10-21",
  author: { "@type": "Organization", name: "EpubCoverChanger.com", url: "https://epubcoverchanger.com" },
  publisher: { "@type": "Organization", name: "EpubCoverChanger.com", url: "https://epubcoverchanger.com" },
};

const h2 = "text-2xl font-semibold text-gray-950";
const body = "mt-12 space-y-4 text-base leading-8 text-gray-700";
const steps = "list-decimal space-y-2 pl-6";
const code = "rounded bg-gray-100 px-1 py-0.5 text-sm";

export default function HowToChangeEpubCoverPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
        Kindle guide
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
        How to change an EPUB cover for Kindle (and fix missing covers)
      </h1>
      <p className="mt-4 text-sm text-gray-500">
        Last updated: October 2026 · By the EpubCoverChanger.com team
      </p>

      <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-xl font-semibold text-gray-950">Quick answer</h2>
        <p className="mt-3 leading-8 text-gray-700">
          Kindle shows an EPUB&apos;s cover only when the file clearly marks one
          image as the cover. To change or add a cover, replace the image inside
          the EPUB and make sure it is declared as the cover, then send the file
          with Send to Kindle.{" "}
          <Link href="/" className="font-medium text-primary hover:underline">
            EpubCoverChanger.com
          </Link>{" "}
          does both steps in your browser, on desktop or phone, without
          uploading your book.
        </p>
      </div>

      <section className={body}>
        <h2 className={h2}>Why Kindle shows no cover after Send to Kindle</h2>
        <p>
          Send to Kindle converts your EPUB into a Kindle format before
          delivery
          <Cite n={1} />. During that conversion, Kindle looks for the image the
          EPUB declares as its cover. The cover goes missing when:
        </p>
        <ol className={steps}>
          <li>
            <strong>The EPUB has no cover at all.</strong> This is more common
            than people expect. Between 7 and 12 October 2026, 195 people
            uploaded EPUB files to our tool 610 times; 147 of those uploads had
            no cover image we could detect, and 91 of the 195 people ran into at
            least one such file. Fanfiction downloads are a typical case: EPUBs
            downloaded from AO3 come without a cover image
            <Cite n={2} />.
          </li>
          <li>
            <strong>The cover is declared in only one of the two standard ways.</strong>{" "}
            EPUB 3 marks the cover with a <code className={code}>cover-image</code>{" "}
            property in the package file
            <Cite n={3} />. Older readers and converters look for a{" "}
            <code className={code}>&lt;meta name=&quot;cover&quot;&gt;</code> tag
            instead. A file that has only one of them may show a cover in one app
            and not in another.
          </li>
          <li>
            <strong>The image does not match what the file says it is.</strong>{" "}
            For example, PNG data saved under a name and type that say JPEG. Some
            apps tolerate this, and some do not.
          </li>
          <li>
            <strong>The file breaks a packaging rule.</strong> The EPUB standard
            requires the first file in the archive,{" "}
            <code className={code}>mimetype</code>, to be stored uncompressed
            <Cite n={4} />. Missing language metadata and wrong text encoding are
            other known reasons Send to Kindle rejects a file or garbles it
            <Cite n={5} />
            <Cite n={6} />.
          </li>
        </ol>
      </section>

      <section className={body}>
        <h2 className={h2}>How to change an EPUB cover for Kindle (desktop)</h2>
        <ol className={steps}>
          <li>
            Open{" "}
            <Link href="/" className="text-primary hover:underline">
              EpubCoverChanger.com
            </Link>{" "}
            and choose your EPUB file. It is processed in your browser and never
            uploaded.
          </li>
          <li>Upload the new cover image (JPG, PNG or WebP).</li>
          <li>
            Pick <strong>Amazon Kindle KDP (1600 x 2560)</strong> as the output
            size.
          </li>
          <li>
            Choose <em>Fit</em> to keep the whole image, or <em>Fill</em> to
            cover the page edge to edge, then confirm.
          </li>
          <li>
            Download the updated EPUB. The tool replaces the cover image, marks
            it as the cover in both standard ways, and saves it in the format the
            book declares.
          </li>
          <li>Send the new file to your Kindle (see the three options below).</li>
        </ol>
      </section>

      <section className={body}>
        <h2 className={h2}>How to change an EPUB cover on iPhone</h2>
        <ol className={steps}>
          <li>Open epubcoverchanger.com in Safari.</li>
          <li>
            Tap <strong>Upload EPUB</strong> and pick the book from the Files app.
          </li>
          <li>
            Tap <strong>Upload New Cover</strong> and choose a photo or image.
          </li>
          <li>
            Adjust the cover, then tap <strong>Download Updated EPUB</strong>.
          </li>
          <li>
            Tap <strong>Save or Open EPUB</strong>. Choose{" "}
            <strong>Save to Files</strong>, or share the file directly to the
            Kindle app, which can send EPUBs to your Kindle library
            <Cite n={1} />.
          </li>
        </ol>
      </section>

      <section className={body}>
        <h2 className={h2}>How to change an EPUB cover on Android</h2>
        <ol className={steps}>
          <li>Open epubcoverchanger.com in Chrome.</li>
          <li>
            Choose the EPUB from your Downloads or Files app, then choose the new
            cover image.
          </li>
          <li>Download the updated EPUB. It is saved to your Downloads folder.</li>
          <li>
            Open the file&apos;s share menu and send it to the Kindle app, or use
            one of the options below.
          </li>
        </ol>
      </section>

      <section className={body}>
        <h2 className={h2}>Three ways to send the EPUB to Kindle</h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Method</th>
                <th className="px-4 py-3 font-semibold">Size limit</th>
                <th className="px-4 py-3 font-semibold">Best for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3">Send to Kindle web page (amazon.com/sendtokindle)</td>
                <td className="px-4 py-3">200 MB<Cite n={7} /></td>
                <td className="px-4 py-3">Large or illustrated books</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Send to Kindle app (desktop) or Kindle app share</td>
                <td className="px-4 py-3">50 MB<Cite n={8} /></td>
                <td className="px-4 py-3">Everyday use</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Email to your @kindle.com address</td>
                <td className="px-4 py-3">50 MB<Cite n={9} /></td>
                <td className="px-4 py-3">Quick sends from any device</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Amazon changes these limits from time to time, so check its Send to
          Kindle page if a file is rejected. Kindle e-readers do not open EPUB
          files copied over USB; use Send to Kindle so the file gets converted.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Still no cover? Checklist</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Re-send the fixed file</strong> and delete the old copy from
            your library, so the Kindle does not keep showing the old one.
          </li>
          <li>
            <strong>Make sure the EPUB is DRM-free.</strong> Books bought from
            stores are usually DRM-protected and cannot be edited by any tool.
          </li>
          <li>
            <strong>Check the file size</strong> against the limits above.
          </li>
          <li>
            <strong>If text looks garbled,</strong> the file&apos;s encoding is
            the problem, not the cover
            <Cite n={5} />.
          </li>
        </ul>
      </section>

      <section className={body}>
        <h2 className={h2}>What size should a Kindle cover be?</h2>
        <p>
          Amazon KDP&apos;s ideal ebook cover is{" "}
          <strong>2,560 pixels tall by 1,600 pixels wide</strong>, a
          height-to-width ratio of at least 1.6:1. The minimum is 1,000 x 625
          pixels, and the file must be under 50 MB in RGB
          <Cite n={10} />. For Kobo, Apple Books and Google Play sizes, see our{" "}
          <Link
            href="/blog/best-epub-cover-size"
            className="text-primary hover:underline"
          >
            EPUB cover size guide
          </Link>
          .
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>FAQ</h2>
        <h3 className="text-lg font-semibold text-gray-950">
          Can Kindle read EPUB files?
        </h3>
        <p>
          Yes, through Send to Kindle. Amazon converts the EPUB into a Kindle
          format during delivery
          <Cite n={1} />.
        </p>
        <h3 className="text-lg font-semibold text-gray-950">
          Why does my book show the file name instead of the title?
        </h3>
        <p>
          Kindle may use the file name when the EPUB&apos;s title metadata is
          missing or not recognised. Renaming the file to the book title is a
          quick workaround.
        </p>
        <h3 className="text-lg font-semibold text-gray-950">
          Can I change the cover of a book I bought on Amazon?
        </h3>
        <p>
          No. Store-bought Kindle books are DRM-protected, and no tool can edit
          them.
        </p>
      </section>

      <div className="mt-12 rounded-3xl bg-gray-950 p-8 text-white">
        <h2 className="text-2xl font-semibold">Fix your cover now</h2>
        <p className="mt-3 text-white/75">
          EpubCoverChanger.com runs in your browser, works on iPhone and Android,
          and marks the new cover so Kindle can find it.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Change your EPUB cover
        </Link>
      </div>

      <SourceList sources={sources} />
    </article>
  );
}
