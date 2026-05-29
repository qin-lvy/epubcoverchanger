import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Change an EPUB Cover Online | Epub Cover Changer",
  description:
    "A practical guide to replacing an EPUB cover online without uploading your ebook to a server or stretching the image.",
  alternates: {
    canonical: "https://epubcoverchanger.com/blog/how-to-change-epub-cover",
  },
};

const steps = [
  "Choose your EPUB file.",
  "Upload the new cover image you want to use.",
  "Pick the platform-ready output size.",
  "Use fit or fill mode to control whether the full image stays visible or fills the cover edge to edge.",
  "Preview the result, then download the updated EPUB.",
];

export default function HowToChangeEpubCoverPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
        EPUB guide
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
        How to change an EPUB cover online without damaging your ebook
      </h1>
      <p className="mt-5 text-lg leading-8 text-gray-600">
        Replacing an EPUB cover sounds simple, but a bad tool can stretch the
        image, crop important text, or package the EPUB incorrectly. The safest
        workflow is to preserve the original book structure and only replace the
        cover image you intentionally choose.
      </p>

      <div className="mt-10 rounded-3xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-xl font-semibold text-gray-950">Quick answer</h2>
        <p className="mt-3 leading-8 text-gray-700">
          Use a browser-based EPUB cover changer, upload your EPUB, choose a new
          JPG, PNG, or WebP cover, preview the result, and download the updated
          EPUB. If privacy matters, choose a tool that processes files locally in
          your browser.
        </p>
      </div>

      <section className="mt-12 space-y-5">
        <h2 className="text-2xl font-semibold text-gray-950">Step-by-step workflow</h2>
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li key={step} className="rounded-2xl border border-gray-200 p-5">
              <span className="text-sm font-semibold text-primary">
                Step {index + 1}
              </span>
              <p className="mt-2 text-gray-700">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 space-y-4 text-base leading-8 text-gray-700">
        <h2 className="text-2xl font-semibold text-gray-950">What to check before export</h2>
        <p>
          The original preview should show the real original cover without fake
          cropping. The new cover preview should make it clear whether the image
          is being fitted with background space or filled edge to edge with some
          cropping. A trustworthy tool should never silently stretch the image.
        </p>
        <p>
          If the image is smaller than the selected output size, resizing can make
          the file larger, but it cannot create real detail that was not in the
          source image. In that case, use the best original image you have.
        </p>
      </section>

      <div className="mt-12 rounded-3xl bg-gray-950 p-8 text-white">
        <h2 className="text-2xl font-semibold">Try it now</h2>
        <p className="mt-3 text-white/75">
          Epub Cover Changer runs in your browser and lets you preview the cover
          before downloading the updated EPUB.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Change an EPUB cover
        </Link>
      </div>
    </article>
  );
}