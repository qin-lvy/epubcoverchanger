import type { Metadata } from "next";
import LocalizedHome from "@/components/LocalizedHome";

const title = "Trocar capa de EPUB online grátis | Epub Cover Changer";
const description =
  "Troque a capa de qualquer arquivo EPUB online e grátis. Seus arquivos são processados no navegador, sem upload, no iPhone, Android ou computador.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://epubcoverchanger.com/pt",
    languages: {
      "x-default": "https://epubcoverchanger.com",
      en: "https://epubcoverchanger.com",
      "pt-BR": "https://epubcoverchanger.com/pt",
      es: "https://epubcoverchanger.com/es",
    },
  },
  openGraph: {
    title,
    description,
    url: "https://epubcoverchanger.com/pt",
    siteName: "Epub Cover Changer",
    images: [{ url: "https://epubcoverchanger.com/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://epubcoverchanger.com/og-image.png"],
  },
};

export default function PortugueseHome() {
  return <LocalizedHome locale="pt" />;
}
