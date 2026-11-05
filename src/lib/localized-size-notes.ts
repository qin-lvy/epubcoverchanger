type TranslatedLocale = "pt" | "es";

/** Preset notes for the translated home pages; English uses the note in cover-sizes.ts. */
const sizeNotes: Record<TranslatedLocale, Record<string, string>> = {
  pt: {
    "epub-standard": "O EPUB não exige um único tamanho de capa.",
    kindle: "A Amazon recomenda 1600 x 2560 px para obter a melhor qualidade.",
    "apple-books": "A Apple exige uma capa de alta qualidade; este tamanho mantém o lado menor acima de 1400 px.",
    kobo: "A Kobo não exige um tamanho específico; 3:4 é uma proporção adequada para suas telas.",
    "google-play": "O Google define limites de arquivo e pixels, em vez de um único tamanho fixo.",
    original: "Ideal quando sua imagem já é a capa final.",
  },
  es: {
    "epub-standard": "El EPUB no exige un único tamaño de portada.",
    kindle: "Amazon recomienda 1600 x 2560 px para obtener la mejor calidad.",
    "apple-books": "Apple exige una portada de alta calidad; este preajuste mantiene el lado corto por encima de 1400 px.",
    kobo: "Kobo no exige un tamaño concreto; la proporción 3:4 se adapta bien a sus pantallas.",
    "google-play": "Google establece límites de archivo y píxeles, no un único tamaño fijo.",
    original: "Ideal cuando tu imagen ya es la portada final.",
  },
};

export function localizedSizeNote(locale: string, sizeId: string, englishNote: string): string {
  if (locale !== "pt" && locale !== "es") return englishNote;
  return sizeNotes[locale][sizeId] ?? englishNote;
}
