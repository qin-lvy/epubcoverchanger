import RootDocument from "@/components/RootDocument";
import "../globals.css";

export default function PortugueseRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootDocument lang="pt-BR">
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9657817590042201"
        crossOrigin="anonymous"
      />
      {children}
    </RootDocument>
  );
}
