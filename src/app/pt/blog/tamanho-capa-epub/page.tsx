import type { Metadata } from "next";
import Link from "next/link";
import { Cite, SourceList, type BlogSource } from "@/components/BlogSources";
import { localizedAlternates, localizedRoutes, localizedUrl } from "@/lib/localized-routes";

const pageUrl = localizedUrl("coverSize", "pt");
const title = "Tamanho de capa EPUB: Kindle, Kobo e Apple Books (2026)";
const description =
  "Tamanhos oficiais de capa para Kindle (1600 x 2560), Apple Books, Kobo e Google Play Livros numa tabela, com fontes e o tamanho mais seguro.";

export const metadata: Metadata = {
  title,
  description,
  alternates: localizedAlternates("coverSize", "pt"),
  openGraph: { title, description, url: pageUrl, type: "article", locale: "pt_BR" },
};

const sources: BlogSource[] = [
  {
    label: "Amazon KDP: critérios da imagem de capa do eBook",
    url: "https://kdp.amazon.com/pt_BR/help/topic/G200645690",
  },
  {
    label: "Apple Books Asset Guide (em inglês): arte da capa",
    url: "https://help.apple.com/itc/booksassetguide/en.lproj/itc1bda991ba.html",
  },
  {
    label: "Kobo Writing Life Help Center (em inglês): configurar um novo eBook",
    url: "https://kobowritinglife.zendesk.com/hc/en-us/articles/360058975732-Setting-up-a-New-eBook",
  },
  {
    label: "Google Play Livros, Partner Center: diretrizes de arquivos de livros",
    url: "https://support.google.com/books/partner/answer/3424254?hl=pt-BR",
  },
  {
    label: "W3C (em inglês): EPUB 3.3",
    url: "https://www.w3.org/TR/epub-33/",
  },
];

const sizes = [
  {
    platform: "Amazon Kindle (KDP)",
    official:
      "Ideal 2560 x 1600 px (altura x largura); mín. 1000 x 625; máx. 10.000 px por lado; proporção de pelo menos 1,6:1; JPEG ou TIFF; RGB; menos de 50 MB",
    recommended: "1600 x 2560",
    source: 1,
  },
  {
    platform: "Apple Books",
    official:
      "Pelo menos 1400 px no lado menor; JPEG ou PNG; RGB; sem imagens ampliadas ou borradas",
    recommended: "1600 x 2400",
    source: 2,
  },
  {
    platform: "Kobo",
    official:
      "300 DPI recomendado; no máximo 5 MB; JPG ou PNG. A Kobo não publica um tamanho obrigatório em pixels, e os leitores dela têm tela de 1448 x 1072 (cerca de 3:4)",
    recommended: "1600 x 2400, ou 1500 x 2000 para acompanhar o formato da tela",
    source: 3,
  },
  {
    platform: "Google Play Livros",
    official: "Pelo menos 640 px; máx. 7.200 px por lado; JPEG, PNG, TIFF ou PDF",
    recommended: "1600 x 2400",
    source: 4,
  },
  {
    platform: "EPUB padrão",
    official: "O padrão EPUB não define tamanho de capa",
    recommended: "1600 x 2400",
    source: 5,
  },
];

const faqs = [
  {
    question: "Qual o melhor tamanho de capa de EPUB?",
    answer:
      "Não existe um tamanho único. Use 1600 x 2560 px para Kindle e 1600 x 2400 px (2:3) para Apple Books, Kobo e Google Play Livros. Exporte em JPEG RGB com menos de 5 MB.",
  },
  {
    question: "Qual o tamanho de capa ideal para Kindle?",
    answer:
      "A Amazon KDP indica 2560 px de altura por 1600 px de largura como ideal, com proporção de pelo menos 1,6:1.",
  },
  {
    question: "Posso ampliar uma imagem pequena para chegar ao tamanho?",
    answer:
      "Não é uma boa ideia. Ampliar deixa o arquivo maior sem acrescentar detalhes, e a Apple recusa capas ampliadas.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Tamanho de capa EPUB para Kindle, Kobo, Apple Books e Google Play",
  description,
  url: pageUrl,
  inLanguage: "pt-BR",
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  author: { "@type": "Organization", name: "EpubCoverChanger.com", url: "https://epubcoverchanger.com" },
  publisher: { "@type": "Organization", name: "EpubCoverChanger.com", url: "https://epubcoverchanger.com" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "pt-BR",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const h2 = "text-2xl font-semibold text-gray-950";
const body = "mt-12 space-y-4 text-base leading-8 text-gray-700";

export default function TamanhoCapaEpubPage() {
  return (
    <article className="mx-auto max-w-4xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
        Guia de tamanho de capa
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
        Tamanho de capa EPUB para Kindle, Kobo, Apple Books e Google Play
      </h1>
      <p className="mt-4 text-sm text-gray-500">
        Publicado em outubro de 2026 · Equipe EpubCoverChanger.com
      </p>

      <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-xl font-semibold text-gray-950">Resposta rápida</h2>
        <p className="mt-3 leading-8 text-gray-700">
          Não existe um tamanho único de capa EPUB. Use{" "}
          <strong>1600 x 2560 px</strong> para Kindle, que é o ideal indicado
          pela Amazon. Use <strong>1600 x 2400 px</strong>{" "}(2:3) para Apple
          Books, Kobo e Google Play Livros; ele atende ao mínimo das três lojas.
          Exporte em JPEG RGB, com menos de 5 MB.
        </p>
      </div>

      <section className={body}>
        <h2 className={h2}>Tamanho de capa por plataforma</h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Plataforma</th>
                <th className="px-4 py-3 font-semibold">O que a loja exige oficialmente</th>
                <th className="px-4 py-3 font-semibold">Tamanho que recomendamos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 align-top">
              {sizes.map((item) => (
                <tr key={item.platform}>
                  <td className="px-4 py-4 font-semibold text-gray-950">
                    {item.platform}
                  </td>
                  <td className="px-4 py-4 leading-6">
                    {item.official}
                    <Cite n={item.source} />
                  </td>
                  <td className="px-4 py-4 font-medium text-primary">
                    {item.recommended}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <strong>Um arquivo para todas as lojas:</strong> exporte em 1600 x
          2400 px. Ele passa do mínimo de 1400 px da Apple, do mínimo de 640 px
          do Google e fica abaixo do limite de 5 MB da Kobo. Só para Kindle,
          1600 x 2560 bate exatamente com a proporção ideal de 1,6:1 da Amazon.
          Se a capa sumir depois do Send to Kindle, veja{" "}
          <Link href={localizedRoutes.changeCover.pt} className="text-primary hover:underline">
            como corrigir a capa que não aparece no Kindle
          </Link>
          .
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Por que os tamanhos são diferentes</h2>
        <p>
          Cada loja encaixa a capa em telas e miniaturas diferentes. O formato
          1,6:1 da Amazon é mais alto que o 2:3 (1,5:1) usado pela maioria das
          outras lojas. Uma capa 2:3 continua funcionando no Kindle, mas aparece
          com corte ou margens um pouco diferentes de uma capa 1,6:1.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Mostrar imagem inteira ou preencher a capa</h2>
        <p>
          <em>Mostrar imagem inteira</em> mantém toda a imagem visível e
          preenche o espaço que sobra com uma cor de fundo.{" "}
          <em>Preencher a capa</em> cobre a página de ponta a ponta e pode
          cortar as bordas. Use <em>Mostrar imagem inteira</em> quando houver
          texto perto das bordas, e <em>Preencher a capa</em> para ilustrações
          que ocupam a página toda. Nunca estique a imagem para chegar a um
          tamanho.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Regra de qualidade</h2>
        <p>
          Comece pela maior imagem original que você tiver. Ampliar uma imagem
          pequena até 1600 x 2560 deixa o arquivo maior, mas não acrescenta
          detalhes, e a Apple recusa explicitamente capas ampliadas
          <Cite n={2} />.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Perguntas frequentes</h2>
        {faqs.map((faq) => (
          <div key={faq.question} className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-950">{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
        <p>
          Vai mandar o livro para o Kindle depois? Veja{" "}
          <Link href={localizedRoutes.sendToKindle.pt} className="text-primary hover:underline">
            como enviar EPUB para o Kindle
          </Link>
          .
        </p>
      </section>

      <div className="mt-12 rounded-3xl border border-blue-100 bg-blue-50 p-8">
        <h2 className="text-2xl font-semibold text-gray-950">
          Precisa exportar em um desses tamanhos?
        </h2>
        <p className="mt-3 text-gray-700">
          O EpubCoverChanger.com tem predefinições para Kindle, Apple Books,
          Kobo e Google Play e nunca estica a sua imagem.
        </p>
        <Link
          href="/pt"
          className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Exportar a capa no tamanho certo
        </Link>
      </div>

      <SourceList sources={sources} title="Fontes" />
    </article>
  );
}
