export type SiteLocale = "en" | "pt" | "es";

export const siteUrl = "https://epubcoverchanger.com";

/** Every page that exists in all three languages, keyed by a stable id. */
export const localizedRoutes = {
  home: { en: "/", pt: "/pt", es: "/es" },
  changeCover: {
    en: "/blog/how-to-change-epub-cover",
    pt: "/pt/blog/trocar-capa-epub-kindle",
    es: "/es/blog/cambiar-portada-epub-kindle",
  },
  coverSize: {
    en: "/blog/best-epub-cover-size",
    pt: "/pt/blog/tamanho-capa-epub",
    es: "/es/blog/tamano-portada-epub",
  },
  sendToKindle: {
    en: "/blog/send-epub-to-kindle",
    pt: "/pt/blog/enviar-epub-para-kindle",
    es: "/es/blog/enviar-epub-a-kindle",
  },
} as const satisfies Record<string, Record<SiteLocale, string>>;

export type LocalizedRouteId = keyof typeof localizedRoutes;

function absolute(path: string) {
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}

/** Self canonical plus reciprocal hreflang links for a page in every language. */
export function localizedAlternates(id: LocalizedRouteId, locale: SiteLocale) {
  const paths = localizedRoutes[id];
  return {
    canonical: absolute(paths[locale]),
    languages: {
      "x-default": absolute(paths.en),
      en: absolute(paths.en),
      "pt-BR": absolute(paths.pt),
      es: absolute(paths.es),
    },
  };
}

export function localizedUrl(id: LocalizedRouteId, locale: SiteLocale) {
  return absolute(localizedRoutes[id][locale]);
}

/**
 * The same page in another language, or that language's home page when the
 * current page has no translation.
 */
export function counterpartPath(pathname: string | null, target: SiteLocale) {
  const path = pathname && pathname !== "/" ? pathname.replace(/\/$/, "") : "/";
  for (const paths of Object.values(localizedRoutes)) {
    if (Object.values(paths).includes(path as never)) return paths[target];
  }
  return localizedRoutes.home[target];
}
