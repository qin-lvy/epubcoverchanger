"use client";

import { BookOpen, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n";
import { localizedRoutes } from "@/lib/localized-routes";
import LanguageSwitcher from "./LanguageSwitcher";

function LogoWordmark() {
  return (
    <span className="text-xl">
      <span className="font-bold text-[#1F2937]">Epub</span>
      <span className="font-normal text-[#9CA3AF]">cover</span>
      <span className="font-bold text-[#1F2937]">changer</span>
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { locale, t } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const homePath = locale === "pt" ? "/pt" : locale === "es" ? "/es" : "/";
  const navLinks = [
    { href: `${homePath}#how-it-works`, label: t("nav.howItWorks"), isAnchor: true },
    { href: localizedRoutes.changeCover[locale], label: t("nav.blog"), isAnchor: false },
    { href: "/pricing", label: t("nav.pricing"), isAnchor: false },
    { href: "/about", label: t("nav.about"), isAnchor: false },
  ];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href.startsWith("#")) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
          <div className="flex items-center">
            <Link
              href={homePath}
              className="flex shrink-0 items-center gap-2"
              onClick={(event) => {
                if (pathname === homePath) {
                  event.preventDefault();
                  window.location.assign(homePath);
                }
              }}
            >
              <BookOpen className="h-7 w-7 text-primary" aria-hidden="true" />
              <LogoWordmark />
            </Link>

            <nav
              className="ml-12 hidden items-center gap-8 lg:flex"
              aria-label={t("nav.main")}
            >
              {navLinks.map((link) =>
                link.isAnchor ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[15px] text-gray-600 hover:text-gray-900"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[15px] hover:text-gray-900 ${
                      isActive(link.href)
                        ? "font-medium text-gray-900"
                        : "text-gray-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <LanguageSwitcher />
            <Link
              href="/login"
              className="text-[15px] text-gray-600 hover:text-gray-900"
            >
              {t("nav.login")}
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50"
            >
              {t("nav.signup")}
            </Link>
          </div>

          <div className="ml-3 flex shrink-0 items-center gap-3 lg:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              aria-label={t("nav.openMenu")}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] bg-white transition-transform duration-300 ease-in-out lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t("nav.mobile")}
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <Link
              href={homePath}
              className="flex items-center gap-2"
              onClick={(event) => {
                if (pathname === homePath) {
                  event.preventDefault();
                  window.location.assign(homePath);
                }
              }}
            >
              <BookOpen className="h-7 w-7 text-primary" />
              <LogoWordmark />
            </Link>
            <button
              type="button"
              aria-label={t("nav.closeMenu")}
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          <nav className="flex flex-col">
            {navLinks.map((link) =>
              link.isAnchor ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="border-b border-gray-100 px-6 py-4 text-[15px] text-gray-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-b border-gray-100 px-6 py-4 text-[15px] text-gray-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex flex-col gap-3 px-6 py-6">
            <Link
              href="/login"
              className="rounded-lg border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700"
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.login")}
            </Link>
            <Link
              href="/login"
              className="rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.signup")}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
