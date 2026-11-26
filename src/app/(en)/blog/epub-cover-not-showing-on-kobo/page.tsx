import type { Metadata } from "next";
import Link from "next/link";
import { Cite, SourceList, type BlogSource } from "@/components/BlogSources";
import { siteUrl } from "@/lib/localized-routes";

const pageUrl = `${siteUrl}/blog/epub-cover-not-showing-on-kobo`;
const title = "EPUB Cover Not Showing on Kobo? How to Fix It";
const description =
  "Sideloaded EPUB shows a blank or text cover on your Kobo? Here is why it happens and five fixes, from a full restart to marking the cover in the file.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title, description, url: pageUrl, type: "article" },
};

const sources: BlogSource[] = [
  {
    label: "Kobo Labs: Kobo EPUB specification (covers and sideloading)",
    url: "https://github.com/kobolabs/epub-spec",
  },
  {
    label: "Kobo Help: Add non-protected PDF and ePub files to your Kobo eReader",
    url: "https://help.kobo.com/hc/en-us/articles/360024775093-Add-non-protected-PDF-and-ePub-files-to-your-Kobo-eReader-using-your-computer",
  },
  {
    label: "Fixing EPUB covers (notes on Kobo cover caching)",
    url: "https://bmaupin.github.io/wiki/archive/other/ebooks/fixing-epub-covers.html",
  },
  {
    label: "MobileRead forums: EPUB metadata not read on Kobo devices",
    url: "https://www.mobileread.com/forums/showthread.php?p=3753176",
  },
  {
    label: "W3C EPUB 3.3: the cover-image property",
    url: "https://www.w3.org/TR/epub-33/#sec-cover-image",
  },
];

const faqs = [
  {
    q: "Why does my Kobo show the first page instead of the cover?",
    a: "For a plain .epub file, Kobo users on MobileRead report that the device renders the first page of the book and uses it as the cover. If the first page is a title page or text, that is what you see. Make the cover image the first page of the book, on its own page.",
  },
  {
    q: "I changed the cover but my Kobo still shows the old one. Why?",
    a: "Kobo caches cover images. Delete the old copy, copy the new file over, eject, then fully power off the e-reader (hold the power button until it says it is powered off) and turn it back on.",
  },
  {
    q: "Should I rename my EPUB to .kepub.epub?",
    a: "Only if you want Kobo's kepub reading engine. Kobo's own EPUB specification warns that cover thumbnails may not display for sideloaded files renamed to .kepub.epub on e-ink readers. If your covers disappeared after renaming, go back to .epub.",
  },
  {
    q: "Can a GIF be used as a Kobo cover?",
    a: "No. Kobo's EPUB specification says GIF files are not supported for covers. Use JPG or PNG.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "EPUB cover not showing on Kobo? How to fix it",
  description,
  url: pageUrl,
  dateModified: "2026-11-26",
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
const h3 = "text-lg font-semibold text-gray-950";
const body = "mt-12 space-y-4 text-base leading-8 text-gray-700";
const link = "text-primary hover:underline";
const code = "rounded bg-gray-100 px-1 py-0.5 font-mono text-sm";

export default function EpubCoverNotShowingOnKoboPage() {
  return (
    <article className="mx-auto max-w-4xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
        Kobo troubleshooting
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
        EPUB cover not showing on Kobo? How to fix it
      </h1>
      <p className="mt-4 text-sm text-gray-500">
        Last updated: November 2026 · By the EpubCoverChanger.com team
      </p>

      <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-xl font-semibold text-gray-950">Quick answer</h2>
        <p className="mt-3 leading-8 text-gray-700">
          A sideloaded EPUB usually shows a blank, grey or text cover on a Kobo
          for one of three reasons: the cover image is not marked as the cover
          inside the file, the first page of the book is not the cover, or the
          Kobo is still showing an old cached thumbnail. Mark the cover in the
          file, make it the first page, copy the book again, then fully power
          the Kobo off and on.
        </p>
      </div>

      <section className={body}>
        <h2 className={h2}>Why Kobo does not show your cover</h2>
        <p>
          Books you buy in the Kobo store get their covers from Kobo. Books you
          copy over yourself (sideloading) do not: the e-reader has to find a
          cover inside the EPUB file. That is where things go wrong.
        </p>
        <ul className="list-disc space-y-3 pl-6">
          <li>
            <strong>The cover is not marked.</strong> An EPUB says which image
            is its cover in a file called the OPF. EPUB 2 uses{" "}
            <code className={code}>&lt;meta name=&quot;cover&quot;&gt;</code>{" "}
            pointing at the image
            <Cite n={1} />; EPUB 3 adds the{" "}
            <code className={code}>cover-image</code> property to the image
            <Cite n={5} />. Many free and converted ebooks have neither.
          </li>
          <li>
            <strong>The first page is not the cover.</strong> For plain .epub
            files, a Kobo user on MobileRead explains that the device renders
            the book&apos;s first page and uses that as the cover
            <Cite n={4} />. A title page or a page of text then becomes your
            &quot;cover&quot;.
          </li>
          <li>
            <strong>The cover is built in a way Kobo cannot read.</strong>{" "}
            Kobo&apos;s specification says cover images must sit in their own
            XHTML page, should use an <code className={code}>&lt;img&gt;</code>{" "}
            tag (a CSS background image is not picked up), and cannot be a GIF
            <Cite n={1} />.
          </li>
          <li>
            <strong>Kobo is showing an old thumbnail.</strong> Kobo caches cover
            images, so a cover you just fixed can keep looking broken until the
            device restarts
            <Cite n={3} />.
          </li>
          <li>
            <strong>The file was renamed to .kepub.epub.</strong> Kobo warns
            that on e-ink readers, cover thumbnails may not display for
            sideloaded files with that extension
            <Cite n={1} />.
          </li>
        </ul>
      </section>

      <section className={body}>
        <h2 className={h2}>Fix 1: Fully restart your Kobo</h2>
        <p>
          Try this first, because it costs nothing. Hold the power button until
          the screen says the Kobo is powered off, wait a few seconds, then turn
          it back on
          <Cite n={3} />. A normal sleep is not enough. If the cover appears,
          the file was fine and the old thumbnail was cached.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Fix 2: Mark the cover inside the EPUB</h2>
        <p>
          If the book has no cover at all, or the cover is not marked, give it
          one that readers can find. In{" "}
          <Link href="/" className={link}>
            EpubCoverChanger.com
          </Link>
          , open the EPUB, choose a JPG or PNG image, and download the new
          file. The tool adds the image to the book, marks it with the EPUB 3{" "}
          <code className={code}>cover-image</code> property when the book is
          EPUB 3, and adds the{" "}
          <code className={code}>&lt;meta name=&quot;cover&quot;&gt;</code>{" "}
          entry that older readers look for. It runs in your browser, so the
          book is not uploaded anywhere.
        </p>
        <p>
          For a book that has no cover yet, the step-by-step guide is{" "}
          <Link href="/blog/add-cover-to-epub" className={link}>
            how to add a cover to an EPUB
          </Link>
          . Use a portrait image at roughly 3:4, which is the shape
          Kobo&apos;s specification suggests
          <Cite n={1} />; our{" "}
          <Link href="/blog/best-epub-cover-size" className={link}>
            EPUB cover size guide
          </Link>{" "}
          lists safe sizes for Kobo and other stores.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Fix 3: Make the cover the first page</h2>
        <p>
          If your Kobo shows the first page of text as the cover, the book needs
          a cover page at the very start. This takes a desktop EPUB editor such
          as Sigil or calibre&apos;s Edit book:
        </p>
        <ol className="list-decimal space-y-3 pl-6">
          <li>
            Open the EPUB and check the first file in the reading order (the
            &quot;spine&quot;).
          </li>
          <li>
            If it is not a cover page, add one: a short XHTML page that contains
            only the cover image in an{" "}
            <code className={code}>&lt;img&gt;</code> tag
            <Cite n={1} />
            <Cite n={3} />.
          </li>
          <li>Move that page to the top of the reading order and save.</li>
        </ol>
        <p>
          Our tool changes the cover image but does not reorder the pages of
          the book, so use an editor for this step.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Fix 4: Keep the .epub extension</h2>
        <p>
          Renaming a file to <code className={code}>.kepub.epub</code> switches
          it to Kobo&apos;s kepub reading engine. Kobo&apos;s own specification
          notes that cover thumbnails may not display for sideloaded files
          renamed this way on e-ink readers, while a plain{" "}
          <code className={code}>.epub</code> uses the Adobe engine
          <Cite n={1} />. If your covers vanished after renaming, rename the
          file back to <code className={code}>.epub</code> and copy it again.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Fix 5: Copy the fixed book over the right way</h2>
        <p>
          After fixing the file, replace the old copy on the e-reader instead
          of adding a second one:
        </p>
        <ol className="list-decimal space-y-3 pl-6">
          <li>Connect the Kobo with a USB cable and tap Connect on the e-reader.</li>
          <li>
            Open the <strong>KOBOeReader</strong> drive on your computer, delete
            the old copy of the book, and drag the fixed EPUB in.
          </li>
          <li>
            Eject the KOBOeReader drive before unplugging; the Kobo then shows
            &quot;Importing content&quot;
            <Cite n={2} />.
          </li>
          <li>Fully power the Kobo off and on (Fix 1), then open My Books.</li>
        </ol>
      </section>

      <section className={body}>
        <h2 className={h2}>Frequently asked questions</h2>
        {faqs.map((item) => (
          <div key={item.q} className="space-y-2">
            <h3 className={h3}>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
      </section>

      <div className="mt-12 rounded-3xl border border-blue-100 bg-blue-50 p-8">
        <h2 className="text-2xl font-semibold text-gray-950">
          Fix the cover in your browser
        </h2>
        <p className="mt-3 text-gray-700">
          Add or replace an EPUB cover and mark it so Kobo, Kindle and Apple
          Books can find it. Free, no account, nothing uploaded.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Change an EPUB cover
        </Link>
      </div>

      <section className={body}>
        <h2 className={h2}>Related guides</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <Link href="/blog/how-to-change-epub-cover" className={link}>
              How to change an EPUB cover
            </Link>
          </li>
          <li>
            <Link href="/blog/add-cover-to-epub" className={link}>
              How to add a cover to an EPUB
            </Link>
          </li>
          <li>
            <Link href="/blog/best-epub-cover-size" className={link}>
              EPUB cover size for Kindle, Kobo and Apple Books
            </Link>
          </li>
          <li>
            <Link href="/epub-metadata-editor" className={link}>
              Edit EPUB metadata online
            </Link>
          </li>
        </ul>
      </section>

      <SourceList sources={sources} />
    </article>
  );
}
