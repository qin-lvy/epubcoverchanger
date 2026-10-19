import AnalyticsProvider from "@/components/AnalyticsProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { LocaleProvider } from "@/lib/i18n";

/**
 * Shared <html> shell for the per-language root layouts. Each language has
 * its own root layout so the static HTML carries the right lang attribute
 * without reading the request (which would make every page dynamic).
 */
export default function RootDocument({
  lang,
  children,
}: Readonly<{ lang: "en" | "pt-BR" | "es"; children: React.ReactNode }>) {
  return (
    <html lang={lang}>
      <body className="flex min-h-full flex-col bg-white text-gray-800 antialiased">
        <LocaleProvider>
          <AnalyticsProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </AnalyticsProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
