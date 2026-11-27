import type { Metadata } from "next";
import Link from "next/link";
import { Cite, SourceList, type BlogSource } from "@/components/BlogSources";
import { siteUrl } from "@/lib/localized-routes";

const pageUrl = `${siteUrl}/blog/kindle-cover-not-showing`;
const title = "Kindle Book Cover Not Showing? Why and How to Fix It";
const description =
  "Your own EPUB shows a blank or generic cover on Kindle? Here is why Amazon hides covers of sideloaded books, and four fixes that work.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title, description, url: pageUrl, type: "article" },
};

const sources: BlogSource[] = [
  {
    label: "calibre FAQ: covers for books sent to an e-ink Kindle are replaced by a generic cover",
    url: "https://manual.calibre-ebook.com/faq.html#covers-for-books-i-send-to-my-e-ink-kindle-show-up-momentarily-and-then-are-replaced-by-a-generic-cover",
  },
  {
    label: "calibre FAQ: covers do not show on Kindle ColorSoft and newer",
    url: "https://manual.calibre-ebook.com/faq.html#covers-for-books-sent-to-my-kindle-colorsoft-and-newer-do-not-show-up-in-the-book-list",
  },
  {
    label: "calibre FAQ: why Kindle only shows covers for Personal Documents or Amazon purchases",
    url: "https://manual.calibre-ebook.com/faq.html#the-covers-for-my-mobi-files-have-stopped-showing-up-in-kindle-for-pc-kindle-for-android-ipad-etc",
  },
  {
    label: "MobileRead forums: Kindle book cover thumbnails disappearing",
    url: "https://www.mobileread.com/forums/showthread.php?t=329945",
  },
  {
    label: "W3C EPUB 3.3: the cover-image property",
    url: "https://www.w3.org/TR/epub-33/#sec-cover-image",
  },
];

const faqs = [
  {
    q: "Why does my Kindle show a cover for a second and then a blank one?",
    a: "According to the calibre FAQ, the Kindle tries to download a cover for the book from Amazon's servers. For a book you did not buy from Amazon that download fails, and the Kindle then replaces the cover that was already there with a generic one.",
  },
  {
    q: "Do books sent with Send to Kindle keep their covers?",
    a: "Books sent to your Kindle by email are marked as Personal Documents, and the calibre FAQ notes that the Kindle does show covers for Personal Documents. The cover still has to be inside the file, so make sure the EPUB has a cover marked before you send it.",
  },
  {
    q: "Will airplane mode keep my covers?",
    a: "The calibre FAQ suggests it: the generic cover comes from a failed download from Amazon, so a Kindle that stays offline does not replace the cover. The trade-off is that you cannot buy or sync books while it is offline.",
  },
  {
    q: "My Kindle is a ColorSoft. Why do none of my own books have covers?",
    a: "The calibre FAQ says ColorSoft and newer Kindles do not show covers for books sent over USB. The only workaround it knows is to send the books as Personal Documents, which brings back covers but turns off Whispersync for those books.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Kindle book cover not showing? Why and how to fix it",
  description,
  url: pageUrl,
  dateModified: "2026-11-27",
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

export default function KindleCoverNotShowingPage() {
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
        Kindle troubleshooting
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
        Kindle book cover not showing? Why and how to fix it
      </h1>
      <p className="mt-4 text-sm text-gray-500">
        Last updated: November 2026 · By the EpubCoverChanger.com team
      </p>

      <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-xl font-semibold text-gray-950">Quick answer</h2>
        <p className="mt-3 leading-8 text-gray-700">
          A book you put on your Kindle yourself shows a blank or generic cover
          for one of two reasons. Either the file has no cover marked inside
          it, or the Kindle treats the book as an Amazon purchase, fails to
          download a cover from Amazon, and swaps in a generic one. Mark the
          cover in the EPUB first, then send the book as a Personal Document
          (Send to Kindle by email does this), or use calibre&apos;s workaround
          if you copy books over USB.
        </p>
      </div>

      <section className={body}>
        <h2 className={h2}>Why Kindle hides the cover</h2>
        <ul className="list-disc space-y-3 pl-6">
          <li>
            <strong>The EPUB has no marked cover.</strong> An EPUB names its
            cover image in its package file. EPUB 3 uses the{" "}
            <code className={code}>cover-image</code> property
            <Cite n={5} />, and older readers look for{" "}
            <code className={code}>&lt;meta name=&quot;cover&quot;&gt;</code>.
            If neither is there, the Kindle has nothing to show, however you
            send the book.
          </li>
          <li>
            <strong>The Kindle asks Amazon for the cover.</strong> The calibre
            FAQ explains that when a book on a Kindle is not marked as a
            Personal Document, the Kindle assumes you bought it from Amazon and
            tries to download its cover from Amazon&apos;s servers. When that
            fails, it does not fall back to the cover inside the file
            <Cite n={3} />.
          </li>
          <li>
            <strong>The cover appears, then disappears.</strong> On e-ink
            Kindles the cover can show for a moment after you copy the book,
            then get replaced by a generic cover once the download from Amazon
            fails
            <Cite n={1} />. MobileRead users describe exactly this on a Kindle
            Oasis: covers &quot;briefly appeared correctly but almost instantly
            vanished&quot;
            <Cite n={4} />.
          </li>
          <li>
            <strong>Your Kindle is a ColorSoft or newer.</strong> The calibre
            FAQ says these models do not show covers for books sent over USB at
            all
            <Cite n={2} />.
          </li>
        </ul>
      </section>

      <section className={body}>
        <h2 className={h2}>Fix 1: Make sure the EPUB has a cover</h2>
        <p>
          Start with the file, because none of the other fixes help if there is
          no cover inside it. Open the EPUB in{" "}
          <Link href="/" className={link}>
            EpubCoverChanger.com
          </Link>
          , choose a JPG or PNG image and download the new file. The tool marks the image with the EPUB 3{" "}
          <code className={code}>cover-image</code> property when the book is
          EPUB 3, and adds the{" "}
          <code className={code}>&lt;meta name=&quot;cover&quot;&gt;</code>{" "}
          entry for older readers. It runs in your browser, so the book is not
          uploaded anywhere.
        </p>
        <p>
          The full steps are in{" "}
          <Link href="/blog/add-cover-to-epub" className={link}>
            how to add a cover to an EPUB
          </Link>
          , and the{" "}
          <Link href="/blog/best-epub-cover-size" className={link}>
            EPUB cover size guide
          </Link>{" "}
          lists image sizes that look sharp on Kindle.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Fix 2: Send it as a Personal Document</h2>
        <p>
          The calibre FAQ notes that the Kindle shows covers for books marked
          as Personal Documents, and that books you send by email are marked
          that way automatically
          <Cite n={3} /> (the FAQ is written about MOBI files, but the rule is
          about how the book is marked, not the format). So the simplest route
          is to email the EPUB to your Kindle&apos;s Send to Kindle address.
          Our guide on{" "}
          <Link href="/blog/send-epub-to-kindle" className={link}>
            how to send an EPUB to Kindle
          </Link>{" "}
          walks through each way.
        </p>
        <p>
          The trade-off: the book shows up under Personal Documents rather than
          Books
          <Cite n={3} />.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Fix 3: Using calibre over USB? Reconnect once</h2>
        <p>
          calibre uploads its own cover thumbnail when it sends a book to an
          e-ink Kindle over USB
          <Cite n={3} />. If Amazon then replaces it with a generic cover,
          calibre 4.17 and later can put it back
          <Cite n={1} />:
        </p>
        <ol className="list-decimal space-y-3 pl-6">
          <li>Send the book to the Kindle with calibre.</li>
          <li>
            Disconnect the Kindle and wait until the cover turns generic.
          </li>
          <li>
            Connect the Kindle to calibre again. calibre restores the covers
            automatically.
          </li>
        </ol>
        <p>
          This only works for books sent with calibre 4.17 or later, and the
          calibre FAQ says the Kindle firmware should be at least 5.12.5
          <Cite n={1} />. The same FAQ points out a simpler option: keep the
          Kindle in airplane mode, so it never tries to download the cover.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Fix 4: Kindle ColorSoft and newer</h2>
        <p>
          On these models the only workaround the calibre FAQ knows is to send
          books as Personal Documents
          <Cite n={2} />. In calibre, open Preferences, then Output options,
          then MOBI output, and tick <strong>Enable sharing of book
          content</strong>. Books calibre sends after that are marked as
          Personal Documents. Covers come back, but Whispersync stops working
          for those books and they appear under Personal Documents
          <Cite n={2} />.
        </p>
        <p>
          If you re-convert a book you converted before, tick the same option
          in that book&apos;s conversion settings too, because per-book
          settings take precedence
          <Cite n={3} />.
        </p>
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
          Give your EPUB a cover before you send it
        </h2>
        <p className="mt-3 text-gray-700">
          Add or replace an EPUB cover and mark it so Kindle, Kobo and Apple
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
            <Link href="/blog/send-epub-to-kindle" className={link}>
              How to send an EPUB to Kindle
            </Link>
          </li>
          <li>
            <Link href="/blog/add-cover-to-epub" className={link}>
              How to add a cover to an EPUB
            </Link>
          </li>
          <li>
            <Link href="/blog/epub-cover-not-showing-on-kobo" className={link}>
              EPUB cover not showing on Kobo
            </Link>
          </li>
          <li>
            <Link href="/blog/best-epub-cover-size" className={link}>
              EPUB cover size for Kindle, Kobo and Apple Books
            </Link>
          </li>
        </ul>
      </section>

      <SourceList sources={sources} />
    </article>
  );
}
