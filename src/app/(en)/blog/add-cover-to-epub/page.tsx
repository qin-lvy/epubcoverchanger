import type { Metadata } from "next";
import Link from "next/link";
import { Cite, SourceList, type BlogSource } from "@/components/BlogSources";
import { siteUrl } from "@/lib/localized-routes";

const pageUrl = `${siteUrl}/blog/add-cover-to-epub`;
const title = "How to Add a Cover to an EPUB File (Free, Online)";
const description =
  "Add a cover to an EPUB that has none, free in your browser on desktop, iPhone or Android. No upload, no calibre. Plus the manual method and fixes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title, description, url: pageUrl, type: "article" },
};

const sources: BlogSource[] = [
  {
    label: "W3C EPUB 3.3: the cover-image property",
    url: "https://www.w3.org/TR/epub-33/#sec-cover-image",
  },
  {
    label: "alexwlchan: Adding cover images to EPUBs from AO3",
    url: "https://alexwlchan.net/2025/ao3-epub-covers/",
  },
  {
    label: "calibre User Manual: Editing e-book metadata (All about covers)",
    url: "https://manual.calibre-ebook.com/metadata.html",
  },
  {
    label: "calibre User Manual: The graphical user interface",
    url: "https://manual.calibre-ebook.com/gui.html",
  },
  {
    label: "Amazon KDP: eBook cover image guidelines",
    url: "https://kdp.amazon.com/en_US/help/topic/G200645690",
  },
  {
    label: "W3C EPUB 3.3: the mimetype file",
    url: "https://www.w3.org/TR/epub-33/#sec-zip-container-mime",
  },
];

const faqs = [
  {
    q: "Can I add a cover to an EPUB without calibre?",
    a: "Yes. EpubCoverChanger.com adds the cover in your browser, so there is nothing to install and the book is never uploaded. It works on Windows, Mac, iPhone and Android.",
  },
  {
    q: "Is it free?",
    a: "Yes. Adding or changing the cover of a single EPUB is free, with no watermark and no account.",
  },
  {
    q: "Does adding a cover change the text of my book?",
    a: "No. Only the cover image and the package file that lists it are changed. Chapters, styles and fonts stay exactly as they were.",
  },
  {
    q: "What image size should I use for an EPUB cover?",
    a: "1600 x 2560 pixels is Amazon KDP's ideal size and works almost everywhere. 1600 x 2400 (2:3) suits Apple Books and Google Play. Start from the largest image you have.",
  },
  {
    q: "Which image formats can I use?",
    a: "JPG, PNG or WebP, up to 10 MB. When a book has no cover yet, the tool saves the new cover as a JPEG, the format every reading app supports.",
  },
  {
    q: "Can I add a cover to a book I bought?",
    a: "Usually not. Store-bought books are normally DRM-protected, and no tool should edit them. DRM-free EPUBs, such as your own files, fanfiction downloads or public-domain books, work.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How to add a cover to an EPUB file",
  description,
  url: pageUrl,
  inLanguage: "en",
  image: `${siteUrl}/og-image.png`,
  datePublished: "2026-11-05",
  dateModified: "2026-11-05",
  author: { "@type": "Organization", name: "EpubCoverChanger.com", url: siteUrl },
  publisher: { "@type": "Organization", name: "EpubCoverChanger.com", url: siteUrl },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const h2 = "text-2xl font-semibold text-gray-950";
const body = "mt-12 space-y-4 text-base leading-8 text-gray-700";
const steps = "list-decimal space-y-2 pl-6";
const code = "rounded bg-gray-100 px-1 py-0.5 text-sm";
const pre = "overflow-x-auto rounded-2xl bg-gray-950 p-4 text-sm leading-6 text-gray-100";

export default function AddCoverToEpubPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
        EPUB guide
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
        How to add a cover to an EPUB file
      </h1>
      <p className="mt-4 text-sm text-gray-500">
        Last updated: November 2026 · By the EpubCoverChanger.com team
      </p>

      <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-xl font-semibold text-gray-950">Quick answer</h2>
        <p className="mt-3 leading-8 text-gray-700">
          To add a cover to an EPUB, put the image inside the book and mark it as
          the cover in the book&apos;s package file. The easiest way: open{" "}
          <Link href="/" className="font-medium text-primary hover:underline">
            EpubCoverChanger.com
          </Link>
          , choose your EPUB, choose an image, and download the updated book. It
          is free, works on desktop and phone, and your book never leaves your
          browser.
        </p>
      </div>

      <section className={body}>
        <h2 className={h2}>How common are EPUBs without a cover?</h2>
        <p>
          More common than you might think. From October 15 to November 4,
          2026, people opened 4,156 EPUB files in our cover tool, and{" "}
          <strong>1,453 of them (35%) had no cover image</strong> we could
          detect. In an earlier week (October 7 to 14), 125 of 265 people, almost
          half, opened at least one EPUB without a cover.
        </p>
        <p>
          Typical sources are fanfiction downloads (EPUBs from AO3 come without a
          cover image
          <Cite n={2} />
          ), books exported from writing apps or scripts, and files converted
          from other formats. Without a cover, reading apps show a blank or
          generic tile, which makes the book hard to spot in your library.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Add a cover online (Windows, Mac, Chromebook)</h2>
        <ol className={steps}>
          <li>
            Open{" "}
            <Link href="/" className="text-primary hover:underline">
              EpubCoverChanger.com
            </Link>{" "}
            and click <strong>Upload EPUB</strong>. If the book has no cover,
            you&apos;ll see: &quot;No cover image found in this EPUB. You can
            still add one by uploading your cover image.&quot;
          </li>
          <li>
            Click <strong>Upload New Cover</strong> and choose a JPG, PNG or WebP
            image (up to 10 MB).
          </li>
          <li>
            Pick an output size. <strong>Amazon Kindle KDP (1600 x 2560)</strong>{" "}
            is a safe choice for any reader. See the size table below.
          </li>
          <li>
            Choose <em>Fit</em> to keep the whole image, or <em>Fill</em> to
            cover the page edge to edge.
          </li>
          <li>
            Click <strong>Download Updated EPUB</strong>. The new file is saved
            with <code className={code}>-new-cover</code> added to its name, and
            your original file is not changed.
          </li>
        </ol>
      </section>

      <section className={body}>
        <h2 className={h2}>Add a cover on iPhone or Android</h2>
        <ol className={steps}>
          <li>Open epubcoverchanger.com in Safari (iPhone) or Chrome (Android).</li>
          <li>
            Tap <strong>Upload EPUB</strong> and pick the book from Files or
            Downloads.
          </li>
          <li>
            Tap <strong>Upload New Cover</strong> and choose a photo or a saved
            image.
          </li>
          <li>
            Tap <strong>Download Updated EPUB</strong>. On iPhone, tap{" "}
            <strong>Save or Open EPUB</strong>, then choose Save to Files or open
            it in Apple Books. On Android, the file goes to Downloads.
          </li>
        </ol>
      </section>

      <section className={body}>
        <h2 className={h2}>What the tool changes inside your EPUB</h2>
        <p>
          A cover only shows up when the book says which image is the cover.
          Here is exactly what gets written, so you know nothing else is
          touched:
        </p>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Change</th>
                <th className="px-4 py-3 font-semibold">Why it matters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3">
                  Image saved as <code className={code}>images/cover.jpg</code>
                </td>
                <td className="px-4 py-3">JPEG opens in every reading app</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Image listed in the manifest</td>
                <td className="px-4 py-3">Readers ignore files that are not listed</td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <code className={code}>properties=&quot;cover-image&quot;</code> (EPUB 3 books)
                </td>
                <td className="px-4 py-3">
                  The EPUB 3 way to mark the cover; only one image may carry it
                  <Cite n={1} />
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <code className={code}>&lt;meta name=&quot;cover&quot;&gt;</code>
                </td>
                <td className="px-4 py-3">
                  The older EPUB 2 convention that many readers and
                  converters still look for
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <code className={code}>mimetype</code> kept first and uncompressed
                </td>
                <td className="px-4 py-3">
                  Required by the EPUB standard
                  <Cite n={6} />; strict readers reject files that break it
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Chapters, styles, fonts and metadata stay as they were. The tool does
          not insert an extra cover page at the start of the book. The cover
          appears as the book&apos;s thumbnail in your library. Some apps also
          show it as the first page, and others don&apos;t.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>What size should the cover be?</h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Where you read</th>
                <th className="px-4 py-3 font-semibold">Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3">Kindle (via Send to Kindle)</td>
                <td className="px-4 py-3">
                  1600 x 2560 px, Amazon KDP&apos;s ideal
                  <Cite n={5} />
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">Apple Books, Google Play Books</td>
                <td className="px-4 py-3">1600 x 2400 px (2:3)</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Kobo</td>
                <td className="px-4 py-3">1500 x 2000 px (3:4) matches its screens</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Not sure</td>
                <td className="px-4 py-3">1600 x 2560 px works almost everywhere</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Sources and minimums for each platform are in our{" "}
          <Link href="/blog/best-epub-cover-size" className="text-primary hover:underline">
            EPUB cover size guide
          </Link>
          . Use the largest original image you have. Enlarging a small image
          makes the file bigger without adding detail.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Other ways to add a cover</h2>
        <h3 className="text-lg font-semibold text-gray-950">calibre</h3>
        <p>
          calibre is a free desktop e-book manager. Select the book, click{" "}
          <strong>Edit metadata</strong> (or press E), and set the cover from a
          file on your computer, or by dropping an image onto the cover area
          <Cite n={3} />. calibre works on its own copy of the book and leaves
          your original file untouched
          <Cite n={4} />. Export the book from calibre afterwards, then check
          that the cover shows in your reading app. calibre is a good choice if
          you already manage your library with it. For a single book, the
          browser tool is quicker.
        </p>

        <h3 className="text-lg font-semibold text-gray-950">By hand (for the curious)</h3>
        <p>
          An EPUB is a ZIP file. You can add a cover yourself if you are
          comfortable editing XML:
        </p>
        <ol className={steps}>
          <li>Make a copy of the book and rename it from .epub to .zip.</li>
          <li>
            Find the package file (usually <code className={code}>content.opf</code>
            ; <code className={code}>META-INF/container.xml</code> says where it
            is) and put your image in the same folder or a subfolder.
          </li>
          <li>Add the image to the manifest and point the cover meta at it:</li>
        </ol>
        <pre className={pre}>
          <code>{`<manifest>
  <item id="cover-img" href="images/cover.jpg"
        media-type="image/jpeg" properties="cover-image"/>
  ...
</manifest>

<metadata>
  ...
  <meta name="cover" content="cover-img"/>
</metadata>`}</code>
        </pre>
        <p>
          Leave out <code className={code}>properties=&quot;cover-image&quot;</code>{" "}
          if the package says <code className={code}>version=&quot;2.0&quot;</code>.
          The catch is re-zipping: the <code className={code}>mimetype</code>{" "}
          file must be the first entry and stored without compression
          <Cite n={6} />. Most zip tools don&apos;t do this by default, which is
          a common reason a hand-edited EPUB stops opening.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Cover still not showing?</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Delete the old copy first.</strong> Libraries and devices
            often keep the old thumbnail. Remove the original book, then add the
            new file.
          </li>
          <li>
            <strong>On Kindle, re-send the file</strong> with Send to Kindle.
            Copying an EPUB over USB does not work on Kindle. See{" "}
            <Link href="/blog/how-to-change-epub-cover" className="text-primary hover:underline">
              fixing missing covers on Kindle
            </Link>{" "}
            and{" "}
            <Link href="/blog/send-epub-to-kindle" className="text-primary hover:underline">
              how to send an EPUB to Kindle
            </Link>
            .
          </li>
          <li>
            <strong>Check for DRM.</strong> DRM-protected books cannot be edited,
            and the tool will tell you if it finds DRM.
          </li>
          <li>
            <strong>Title or author looks wrong too?</strong> Fix it with the{" "}
            <Link href="/epub-metadata-editor" className="text-primary hover:underline">
              EPUB metadata editor
            </Link>
            .
          </li>
        </ul>
      </section>

      <section className={body}>
        <h2 className={h2}>FAQ</h2>
        {faqs.map((item) => (
          <div key={item.q}>
            <h3 className="text-lg font-semibold text-gray-950">{item.q}</h3>
            <p className="mt-2">{item.a}</p>
          </div>
        ))}
      </section>

      <div className="mt-12 rounded-3xl bg-gray-950 p-8 text-white">
        <h2 className="text-2xl font-semibold">Add your cover now</h2>
        <p className="mt-3 text-white/75">
          Free, in your browser, on desktop or phone. Your book is never
          uploaded.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Add a cover to your EPUB
        </Link>
      </div>

      <SourceList sources={sources} />
    </article>
  );
}
