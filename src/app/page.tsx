import type { Metadata } from "next";
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
    "Free online tool to change your EPUB ebook cover instantly. No upload to server, before/after preview, works on all devices.",
  openGraph: {
    title: "Epub Cover Changer - Change EPUB Book Cover Online Free",
    description:
      "Free online tool to replace your ebook cover. 100% private - files never leave your browser.",
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
      "Free online tool to replace your ebook cover. 100% private.",
    images: ["https://epubcoverchanger.com/og-image.png"],
  },
  alternates: { canonical: "https://epubcoverchanger.com" },
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
      <FAQ />
      <FeedbackSection />
    </>
  );
}