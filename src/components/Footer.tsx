import Link from "next/link";

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

const footerColumns: FooterColumn[] = [
  {
    title: "Learn more",
    links: [
      { href: "#how-it-works", label: "How it works", isAnchor: true },
      {
        href: "/blog/best-epub-cover-size",
        label: "EPUB cover guide",
        isAnchor: false,
      },
    ],
  },
  {
    title: "Tools",
    links: [
      { href: "/", label: "Change EPUB cover", isAnchor: false },
      {
        label: "Batch processing",
        comingSoon: true,
      },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/#faq", label: "Help & FAQ", isAnchor: true },
      { href: "/#feedback", label: "Send feedback", isAnchor: true },
    ],
  },
  {
    title: "Company",
    links: [
      {
        href: "/blog/how-to-change-epub-cover",
        label: "Blog",
        isAnchor: false,
      },
      { href: "/about", label: "About", isAnchor: false },
      { href: "/pricing", label: "Pricing", isAnchor: false },
    ],
  },
];

export default function Footer() {
  return (
    <footer>
      <div className="bg-gray-50 px-6 pt-16 pb-12">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-8 md:grid-cols-4">
          {footerColumns.map((column) => (
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
                          coming soon
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
              Terms
            </Link>
            <span className="mx-3">|</span>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <span className="mx-3">|</span>
            <Link href="/#feedback" className="hover:text-white">Feedback</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
