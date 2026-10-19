import type { Metadata } from "next";
import LocalizedHome from "@/components/LocalizedHome";

const title = "Cambiar portada de EPUB online gratis | Epub Cover Changer";
const description =
  "Cambia la portada de cualquier archivo EPUB online y gratis. Tus archivos se procesan en el navegador, sin subirlos, desde iPhone, Android o computadora.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://epubcoverchanger.com/es",
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
    url: "https://epubcoverchanger.com/es",
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

export default function SpanishHome() {
  return <LocalizedHome locale="es" />;
}
