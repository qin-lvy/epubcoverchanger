"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/lib/i18n";
import { counterpartPath, localizedRoutes } from "@/lib/localized-routes";

type FooterLink =
  | {
      href: string;
      label: string;
      isAnchor: boolean;
      comingSoon?: false;
    }
  | {
      label: string;
      comingSoon: true;
    };

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export default function Footer() {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const homePath = locale === "pt" ? "/pt" : locale === "es" ? "/es" : "/";
  const localizedColumns: FooterColumn[] = [
    {
      title: t("footer.learn"),
      links: [
        { href: `${homePath}#how-it-works`, label: t("nav.howItWorks"), isAnchor: true },
        { href: localizedRoutes.coverSize[locale], label: t("footer.guide"), isAnchor: false },
        { href: localizedRoutes.sendToKindle[locale], label: t("footer.sendKindle"), isAnchor: false },
      ],
    },
    {
      title: t("footer.tools"),
      links: [
        { href: homePath, label: t("footer.changeCover"), isAnchor: false },
        ...(locale === "en" ? [{ href: "/epub-metadata-editor", label: "Edit EPUB metadata", isAnchor: false }] : []),
        { label: t("footer.batch"), comingSoon: true },
      ],
    },
    {
      title: t("footer.support"),
      links: [
        { href: `${homePath}#faq`, label: t("footer.help"), isAnchor: true },
        ...(locale === "en" ? [{ href: `${homePath}#feedback`, label: t("footer.feedback"), isAnchor: true }] : []),
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { href: localizedRoutes.changeCover[locale], label: t("nav.blog"), isAnchor: false },
        { href: "/about", label: t("nav.about"), isAnchor: false },
        { href: "/pricing", label: t("nav.pricing"), isAnchor: false },
      ],
    },
  ];
  return (
    <footer>
      <div className="bg-gray-50 px-6 pt-16 pb-12">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-8 md:grid-cols-4">
          {localizedColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-sm font-bold tracking-wider text-[#1F2937] uppercase">
                {column.title}
              </h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label} className="mb-2.5">
                    {"comingSoon" in link && link.comingSoon ? (
                      <span className="block cursor-default text-sm text-[#4B5563]">
                        {link.label}
                        {" "}
                        <span className="ml-1 text-[11px] text-gray-400 italic">
                          {t("footer.comingSoon")}
                        </span>
                      </span>
                    ) : link.isAnchor ? (
                      <a
                        href={link.href}
                        className="block text-sm text-[#4B5563] hover:text-primary"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="block text-sm text-[#4B5563] hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-600 px-6 py-5">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-[13px] text-white/70">
            (c) 2026 epubcoverchanger.com
          </p>
          <div className="flex items-center text-[13px] text-white/70">
            <Link href="/terms" className="hover:text-white">
              {t("footer.terms")}
            </Link>
            <span className="mx-3">|</span>
            <Link href="/privacy" className="hover:text-white">
              {t("footer.privacy")}
            </Link>
            <span className="mx-3">|</span>
            <Link href={`${homePath}#feedback`} className="hover:text-white">{locale === "en" ? "Feedback" : t("footer.feedback")}</Link>
          </div>
          <nav aria-label={t("nav.language")} className="flex items-center text-[13px] text-white/70">
            <Link href={counterpartPath(pathname, "en")} className={`hover:text-white ${locale === "en" ? "font-semibold text-white" : ""}`}>English</Link>
            <span className="mx-2">|</span>
            <Link href={counterpartPath(pathname, "pt")} className={`hover:text-white ${locale === "pt" ? "font-semibold text-white" : ""}`}>Português</Link>
            <span className="mx-2">|</span>
            <Link href={counterpartPath(pathname, "es")} className={`hover:text-white ${locale === "es" ? "font-semibold text-white" : ""}`}>Español</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
