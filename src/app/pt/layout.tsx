import RootDocument from "@/components/RootDocument";
import "../globals.css";

export default function PortugueseRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootDocument lang="pt-BR">{children}</RootDocument>;
}
