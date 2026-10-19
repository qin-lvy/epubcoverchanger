import RootDocument from "@/components/RootDocument";
import "../globals.css";

export default function SpanishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootDocument lang="es">{children}</RootDocument>;
}
