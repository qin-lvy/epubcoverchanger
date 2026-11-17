import type { Metadata } from "next";
import Link from "next/link";
import CoverReplacer from "@/components/CoverReplacer";
import FAQ from "@/components/FAQ";
import FeedbackSection from "@/components/FeedbackSection";
import { faqSchema } from "@/lib/faq-data";
import HowItWorks from "@/components/HowItWorks";
import StunningQuality from "@/components/StunningQuality";
import TrustBar from "@/components/TrustBar";

export const metadata: Metadata = {
  title: "Epub Cover Changer - Change EPUB Book Cover Online Free",
  description:
    "Change your EPUB cover online free in seconds. Files never leave your device: no upload, no signup. Works on iPhone, Android and desktop.",
  openGraph: {
    title: "Epub Cover Changer - Change EPUB Book Cover Online Free",
    description:
      "Change your EPUB cover online free in seconds. Files never leave your device: no upload, no signup. Works on iPhone, Android and desktop.",
    url: "https://epubcoverchanger.com",
    siteName: "Epub Cover Changer",
    images: [
      {
        url: "https://epubcoverchanger.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Epub Cover Changer - Change EPUB Book Cover Online Free",
    description:
      "Change your EPUB cover online free in seconds. Files never leave your device: no upload, no signup. Works on iPhone, Android and desktop.",
    images: ["https://epubcoverchanger.com/og-image.png"],
  },
  alternates: {
    canonical: "https://epubcoverchanger.com",
    languages: {
      "x-default": "https://epubcoverchanger.com",
      en: "https://epubcoverchanger.com",
      "pt-BR": "https://epubcoverchanger.com/pt",
      es: "https://epubcoverchanger.com/es",
    },
  },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Epub Cover Changer",
  url: "https://epubcoverchanger.com",
  description:
    "Free online tool to change EPUB ebook covers. Files processed in browser, never uploaded to server.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CoverReplacer />
      <TrustBar />
      <StunningQuality />
      <HowItWorks />
      <section className="px-6 pb-4">
        <p className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-gray-50 px-6 py-4 text-center text-base text-gray-700">
          Need to fix the title, author or language too? Try our free{" "}
          <Link href="/epub-metadata-editor" className="font-medium text-primary hover:underline">
            EPUB editor for metadata
          </Link>
          , also right in your browser.
        </p>
      </section>
      <FAQ />
      <FeedbackSection />
    </>
  );
}
