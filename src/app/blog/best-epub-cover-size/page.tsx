import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best EPUB Cover Size for Kindle, Apple Books, Kobo and Google Play",
  description:
    "A practical EPUB cover size guide covering Standard EPUB, Amazon Kindle KDP, Apple Books, Kobo, and Google Play Books.",
  alternates: {
    canonical: "https://epubcoverchanger.com/blog/best-epub-cover-size",
  },
};

const sizes = [
  {
    platform: "Standard EPUB",
    size: "1600 x 2400px",
    note: "A practical 2:3 preset. EPUB itself does not enforce one universal cover size.",
  },
  {
    platform: "Amazon Kindle KDP",
    size: "1600 x 2560px",
    note: "Amazon's common ideal ebook cover size uses a 5:8 portrait ratio.",
  },
  {
    platform: "Apple Books",
    size: "1600 x 2400px",
    note: "A high-quality 2:3 preset that keeps the short side above 1400px.",
  },
  {
    platform: "Kobo",
    size: "1500 x 2000px",
    note: "Kobo guidance favors a 3:4 portrait ratio, so this preset keeps that shape.",
  },
  {
    platform: "Google Play Books",
    size: "1600 x 2400px",
    note: "Google focuses on fixed pixel bounds rather than one required cover size.",
  },
];

export default function BestEpubCoverSizePage() {
  return (
    <article className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
        Cover size guide
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
        Best EPUB cover size for Kindle, Apple Books, Kobo, and Google Play
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
        There is no single EPUB cover size that every store requires. The better
        approach is to choose a preset based on where you plan to publish, then
        avoid stretching the artwork just to hit a number.
      </p>

      <div className="mt-12 overflow-hidden rounded-3xl border border-gray-200">
        <div className="grid grid-cols-3 bg-gray-50 px-5 py-3 text-sm font-semibold text-gray-500">
          <span>Platform</span>
          <span>Recommended preset</span>
          <span>Why it matters</span>
        </div>
        {sizes.map((item) => (
          <div
            key={item.platform}
            className="grid grid-cols-1 gap-3 border-t border-gray-200 px-5 py-5 md:grid-cols-3"
          >
            <span className="font-semibold text-gray-950">{item.platform}</span>
            <span className="font-medium text-primary">{item.size}</span>
            <span className="leading-7 text-gray-700">{item.note}</span>
          </div>
        ))}
      </div>

      <section className="mt-12 space-y-4 text-base leading-8 text-gray-700">
        <h2 className="text-2xl font-semibold text-gray-950">Fit vs fill</h2>
        <p>
          If you choose fit mode, the entire source image stays visible and empty
          space is filled with a background color. If you choose fill mode, the
          image fills the cover edge to edge, but some edges may be cropped. Both
          are valid, but stretching is not.
        </p>
        <p>
          For covers with important text near the edges, start with fit mode. For
          full-bleed photographic covers, fill mode may look more polished if the
          crop does not cut off important content.
        </p>
      </section>

      <section className="mt-12 space-y-4 text-base leading-8 text-gray-700">
        <h2 className="text-2xl font-semibold text-gray-950">Quality rule</h2>
        <p>
          Use the highest-quality original cover image you have. A tool can resize
          and package the image correctly, but it cannot magically restore detail
          from a low-resolution source.
        </p>
      </section>

      <div className="mt-12 rounded-3xl border border-blue-100 bg-blue-50 p-8">
        <h2 className="text-2xl font-semibold text-gray-950">
          Need to export one of these sizes?
        </h2>
        <p className="mt-3 text-gray-700">
          Epub Cover Changer includes platform-ready presets and keeps the image
          from being stretched.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Change EPUB cover size
        </Link>
      </div>
    </article>
  );
}