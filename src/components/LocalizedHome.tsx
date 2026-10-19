import CoverReplacer from "@/components/CoverReplacer";
import FAQ from "@/components/FAQ";
import HowItWorks from "@/components/HowItWorks";
import StunningQuality from "@/components/StunningQuality";
import TrustBar from "@/components/TrustBar";
import { type Locale } from "@/lib/i18n";
import { getServerFaqMessages } from "@/lib/localized-faq";

export default function LocalizedHome({ locale }: { locale: Exclude<Locale, "en"> }) {
  const faqItems = getServerFaqMessages(locale);
  const baseUrl = "https://epubcoverchanger.com";
  const path = locale === "pt" ? "/pt" : "/es";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Epub Cover Changer",
    url: `${baseUrl}${path}`,
    description: locale === "pt" ? "Mude a capa do seu EPUB em segundos" : "Cambia la portada de tu EPUB en segundos",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CoverReplacer />
      <TrustBar />
      <StunningQuality />
      <HowItWorks />
      <FAQ />
    </>
  );
}
