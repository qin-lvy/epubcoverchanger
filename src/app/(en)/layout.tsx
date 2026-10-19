import type { Metadata } from "next";
import RootDocument from "@/components/RootDocument";
import "../globals.css";

export const metadata: Metadata = {
  title: "Epub Cover Changer - Change EPUB Book Cover Online Free",
  description:
    "Free online tool to change your EPUB ebook cover instantly. No upload to server, before/after preview, works on all devices. Replace epub cover in seconds.",
};

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
