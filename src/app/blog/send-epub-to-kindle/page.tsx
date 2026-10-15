import type { Metadata } from "next";
import Link from "next/link";
import { Cite, SourceList, type BlogSource } from "@/components/BlogSources";

const pageUrl = "https://epubcoverchanger.com/blog/send-epub-to-kindle";
const title = "How to Send an EPUB to Kindle (and Keep the Cover)";
const description =
  "Send an EPUB to your Kindle from the web, email, iPhone, Android or desktop. Size limits for each method, and how to make sure the cover shows up.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title, description, url: pageUrl, type: "article" },
};

const sources: BlogSource[] = [
  {
    label: "Amazon: Send to Kindle (supported file types and the 200 MB upload limit)",
    url: "https://www.amazon.com/sendtokindle",
  },
  {
    label: "Amazon Help: How to use the Send to Kindle email address",
    url: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G7NECT4B4ZWHQ8WV",
  },
  {
    label: "The eBook Reader: Send to Kindle apps for PC and Mac now support EPUB",
    url: "https://blog.the-ebook-reader.com/2022/12/20/send-to-kindle-apps-for-pc-and-mac-now-support-epub/",
  },
  {
    label: "Take Control Books: the Send to Kindle app's 50 MB limit",
    url: "https://www.takecontrolbooks.com/your-kindle-can-finally-read-epub-files/",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  url: pageUrl,
  datePublished: "2026-10-15",
  dateModified: "2026-10-15",
  author: { "@type": "Organization", name: "EpubCoverChanger.com", url: "https://epubcoverchanger.com" },
  publisher: { "@type": "Organization", name: "EpubCoverChanger.com", url: "https://epubcoverchanger.com" },
};

const h2 = "text-2xl font-semibold text-gray-950";
const body = "mt-12 space-y-4 text-base leading-8 text-gray-700";
const steps = "list-decimal space-y-2 pl-6";

export default function SendEpubToKindlePage() {
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
        How to send an EPUB to Kindle (and keep the cover)
      </h1>
      <p className="mt-4 text-sm text-gray-500">
        Published: October 2026 · By the EpubCoverChanger.com team
      </p>

      <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-xl font-semibold text-gray-950">Quick answer</h2>
        <p className="mt-3 leading-8 text-gray-700">
          Kindle accepts EPUB files through Amazon&apos;s Send to Kindle
          service. The easiest way is the Send to Kindle web page: sign in,
          drop in your EPUB (up to 200 MB), and it appears in your Kindle
          library
          <Cite n={1} />. You can also email it, or share it from the Kindle
          app on iPhone and Android. Before sending, make sure the EPUB has a
          cover. If it doesn&apos;t, your Kindle shows a blank or generic
          thumbnail.
        </p>
      </div>

      <section className={body}>
        <h2 className={h2}>Ways to send an EPUB to Kindle</h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Method</th>
                <th className="px-4 py-3 font-semibold">Size limit</th>
                <th className="px-4 py-3 font-semibold">Best for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3">Send to Kindle web page</td>
                <td className="px-4 py-3">200 MB per file<Cite n={1} /></td>
                <td className="px-4 py-3">Any computer; large or illustrated books</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Email to your Send to Kindle address</td>
                <td className="px-4 py-3">50 MB per email, up to 25 files<Cite n={2} /></td>
                <td className="px-4 py-3">Sending several books at once</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Kindle app on iPhone or Android (Share)</td>
                <td className="px-4 py-3">50 MB<Cite n={4} /></td>
                <td className="px-4 py-3">Books saved on your phone</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Send to Kindle app for Windows or Mac</td>
                <td className="px-4 py-3">50 MB<Cite n={4} /></td>
                <td className="px-4 py-3">Right-click sending from your desktop</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Send to Kindle converts the EPUB into a Kindle format during
          delivery
          <Cite n={3} />. Kindle e-readers do not open EPUB files copied over
          USB, so use one of the methods above instead.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Step 1: Make sure your EPUB has a cover</h2>
        <p>
          Kindle shows the image the EPUB declares as its cover. Many EPUBs
          don&apos;t have one. Between 7 and 14 October 2026, 265 people
          uploaded EPUB files to our tool 823 times; 198 of those uploads had
          no cover image we could detect, and 125 of the 265 people (47%) ran
          into at least one such file.
        </p>
        <p>
          To add or replace the cover, open{" "}
          <Link href="/" className="text-primary hover:underline">
            EpubCoverChanger.com
          </Link>
          , choose your EPUB and a new cover image, pick the{" "}
          <strong>Amazon Kindle KDP (1600 x 2560)</strong> size, and download
          the updated file. It runs in your browser, so your book is never
          uploaded. If a cover still goes missing after sending, see{" "}
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
        <h2 className={h2}>Step 2: Send it with the Send to Kindle web page</h2>
        <ol className={steps}>
          <li>Go to amazon.com/sendtokindle and sign in with your Amazon account.</li>
          <li>Drag your EPUB into the upload box, or click to choose the file.</li>
          <li>Pick your Kindle library or the specific devices to send it to.</li>
          <li>Click Send. The book appears in your library after Amazon converts it.</li>
        </ol>
      </section>

      <section className={body}>
        <h2 className={h2}>Send an EPUB to Kindle by email</h2>
        <ol className={steps}>
          <li>
            Find your Send to Kindle email address on Amazon&apos;s{" "}
            <strong>Manage Your Content and Devices</strong> page, under
            Preferences.
          </li>
          <li>
            On the same page, add the address you&apos;ll send from to your{" "}
            <strong>Approved Personal Document Email List</strong>. Emails from
            other addresses are not delivered
            <Cite n={2} />.
          </li>
          <li>
            Attach the EPUB and send. You can attach up to 25 files, 50 MB in
            total; zip larger batches
            <Cite n={2} />.
          </li>
        </ol>
      </section>

      <section className={body}>
        <h2 className={h2}>Send an EPUB to Kindle from iPhone</h2>
        <ol className={steps}>
          <li>Install the Kindle app and sign in.</li>
          <li>
            Open the Files app, long-press the EPUB, tap <strong>Share</strong>,
            and choose <strong>Kindle</strong>.
          </li>
          <li>Confirm the send. The book is added to your Kindle library.</li>
        </ol>
        <p>
          No cover yet? Open epubcoverchanger.com in Safari first, add the
          cover, tap <strong>Save or Open EPUB</strong>, and share the new file
          to Kindle from there.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Send an EPUB to Kindle from Android</h2>
        <ol className={steps}>
          <li>Install the Kindle app and sign in.</li>
          <li>
            In your Files or Downloads app, open the EPUB&apos;s share menu and
            choose <strong>Kindle</strong>.
          </li>
          <li>Confirm the send.</li>
        </ol>
      </section>

      <section className={body}>
        <h2 className={h2}>If the book doesn&apos;t arrive</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Emailed it?</strong> Check that the sending address is on
            your approved list. Amazon keeps trying to deliver for up to 60
            days
            <Cite n={2} />.
          </li>
          <li>
            <strong>Check the size</strong> against the limits in the table
            above.
          </li>
          <li>
            <strong>Make sure the EPUB is DRM-free.</strong>{" "}Store-bought books
            with DRM can&apos;t be sent this way.
          </li>
          <li>
            <strong>Rejected or garbled?</strong> See the causes and fixes in
            our{" "}
            <Link
              href="/blog/how-to-change-epub-cover"
              className="text-primary hover:underline"
            >
              Kindle cover and EPUB troubleshooting guide
            </Link>
            .
          </li>
        </ul>
      </section>

      <section className={body}>
        <h2 className={h2}>FAQ</h2>
        <h3 className="text-lg font-semibold text-gray-950">
          Do I need to convert EPUB to MOBI or AZW3 first?
        </h3>
        <p>
          No. Send to Kindle accepts EPUB directly and converts it for you
          <Cite n={1} />
          <Cite n={3} />.
        </p>
        <h3 className="text-lg font-semibold text-gray-950">
          Can I send several EPUBs at once?
        </h3>
        <p>
          Yes, by email: up to 25 attachments and 50 MB per email
          <Cite n={2} />.
        </p>
        <h3 className="text-lg font-semibold text-gray-950">
          What size should the cover be for Kindle?
        </h3>
        <p>
          Amazon&apos;s ideal is 1600 x 2560 pixels. See our{" "}
          <Link
            href="/blog/best-epub-cover-size"
            className="text-primary hover:underline"
          >
            EPUB cover size guide
          </Link>{" "}
          for other stores.
        </p>
      </section>

      <div className="mt-12 rounded-3xl bg-gray-950 p-8 text-white">
        <h2 className="text-2xl font-semibold">Add a cover before you send</h2>
        <p className="mt-3 text-white/75">
          EpubCoverChanger.com adds or replaces EPUB covers in your browser,
          on desktop, iPhone or Android, and marks the cover so Kindle can
          find it.
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
