"use client";

import { BookOpen, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#how-it-works", label: "How it works", isAnchor: true },
  {
    href: "/blog/how-to-change-epub-cover",
    label: "Blog",
    isAnchor: false,
  },
  { href: "/pricing", label: "Pricing", isAnchor: false },
  { href: "/about", label: "About", isAnchor: false },
];

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
  const [mobileOpen, setMobileOpen] = useState(false);

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
              href="/"
              className="flex shrink-0 items-center gap-2"
              onClick={(event) => {
                if (pathname === "/") {
                  event.preventDefault();
                  window.location.assign("/");
                }
              }}
            >
              <BookOpen className="h-7 w-7 text-primary" aria-hidden="true" />
              <LogoWordmark />
            </Link>

            <nav
              className="ml-12 hidden items-center gap-8 lg:flex"
              aria-label="Main"
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
            <Link
              href="/login"
              className="text-[15px] text-gray-600 hover:text-gray-900"
            >
              Log in
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50"
            >
              Sign up
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] bg-white transition-transform duration-300 ease-in-out lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={(event) => {
                if (pathname === "/") {
                  event.preventDefault();
                  window.location.assign("/");
                }
              }}
            >
              <BookOpen className="h-7 w-7 text-primary" />
              <LogoWordmark />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
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
              Log in
            </Link>
            <Link
              href="/login"
              className="rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
