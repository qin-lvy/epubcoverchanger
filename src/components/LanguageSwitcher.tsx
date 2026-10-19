"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLocale } from "@/lib/i18n";
import { counterpartPath } from "@/lib/localized-routes";

const LANGUAGES = [
  { locale: "en", short: "EN", label: "English", hrefLang: "en" },
  { locale: "pt", short: "PT", label: "Português (Brasil)", hrefLang: "pt-BR" },
  { locale: "es", short: "ES", label: "Español", hrefLang: "es" },
] as const;

/** Visible language picker for the header, on desktop and mobile. */
export default function LanguageSwitcher() {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const current = LANGUAGES.find((language) => language.locale === locale) ?? LANGUAGES[0];

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      const details = detailsRef.current;
      if (details?.open && !details.contains(event.target as Node)) {
        details.open = false;
      }
    };
    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, []);

  return (
    <details ref={detailsRef} className="relative">
      <summary
        className="flex cursor-pointer list-none items-center gap-1 rounded-lg border border-gray-200 px-2 py-1.5 text-sm font-medium lg:gap-1.5 lg:px-2.5 text-gray-700 hover:border-gray-300 hover:bg-gray-50 [&::-webkit-details-marker]:hidden"
        aria-label={`${t("nav.language")}: ${current.label}`}
      >
        <Globe className="h-4 w-4 text-gray-500" aria-hidden="true" />
        {current.short}
        <ChevronDown className="hidden h-3.5 w-3.5 text-gray-400 sm:block" aria-hidden="true" />
      </summary>
      <ul className="absolute right-0 z-[70] mt-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
        {LANGUAGES.map((language) => (
          <li key={language.locale}>
            <a
              href={counterpartPath(pathname, language.locale)}
              hrefLang={language.hrefLang}
              lang={language.hrefLang}
              aria-current={language.locale === locale ? "true" : undefined}
              className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              {language.label}
              {language.locale === locale && (
                <Check className="h-4 w-4 text-primary" aria-hidden="true" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
