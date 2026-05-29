import type { Metadata } from "next";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Epub Cover Changer - Change EPUB Book Cover Online Free",
  description:
    "Free online tool to change your EPUB ebook cover instantly. No upload to server, before/after preview, works on all devices. Replace epub cover in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-full flex-col bg-white text-gray-800 antialiased">
        <AnalyticsProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AnalyticsProvider>
      </body>
    </html>
  );
}