import type { Metadata } from "next";
import Link from "next/link";
import { Cite, SourceList, type BlogSource } from "@/components/BlogSources";
import { localizedAlternates, localizedRoutes, localizedUrl } from "@/lib/localized-routes";

const pageUrl = localizedUrl("changeCover", "pt");
const title = "Trocar a capa de EPUB para Kindle e corrigir capa que some";
const description =
  "A capa do EPUB não aparece no Kindle? Veja por que isso acontece e como adicionar ou trocar a capa grátis no iPhone, Android ou computador.";

export const metadata: Metadata = {
  title,
  description,
  alternates: localizedAlternates("changeCover", "pt"),
  openGraph: { title, description, url: pageUrl, type: "article", locale: "pt_BR" },
};

const sources: BlogSource[] = [
  {
    label: "The eBook Reader (em inglês): os apps Send to Kindle para PC e Mac agora aceitam EPUB",
    url: "https://blog.the-ebook-reader.com/2022/12/20/send-to-kindle-apps-for-pc-and-mac-now-support-epub/",
  },
  {
    label: "alexwlchan (em inglês): adicionar capa a EPUBs baixados do AO3",
    url: "https://alexwlchan.net/2025/ao3-epub-covers/",
  },
  {
    label: "W3C EPUB 3.3 (em inglês): a propriedade cover-image",
    url: "https://www.w3.org/TR/epub-33/#sec-cover-image",
  },
  {
    label: "W3C EPUB 3.3 (em inglês): o arquivo mimetype",
    url: "https://www.w3.org/TR/epub-33/#sec-zip-container-mime",
  },
  {
    label: "kindle-epub-fix no GitHub (em inglês): corrigir a codificação do EPUB para o Send to Kindle",
    url: "https://github.com/innocenat/kindle-epub-fix",
  },
  {
    label: "Calibre-Web-Automated (em inglês): erros E999 no Send to Kindle e metadado de idioma ausente",
    url: "https://github.com/crocodilestick/Calibre-Web-Automated/discussions/147",
  },
  {
    label: "Amazon.com.br: Send to Kindle (limite de 200 MB por arquivo)",
    url: "https://www.amazon.com.br/sendtokindle",
  },
  {
    label: "Amazon Help (em inglês): limites do e-mail Send to Kindle — 25 anexos, 50 MB",
    url: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G7NECT4B4ZWHQ8WV",
  },
  {
    label: "Amazon KDP: critérios da imagem de capa do eBook",
    url: "https://kdp.amazon.com/pt_BR/help/topic/G200645690",
  },
  {
    label: "Take Control Books (em inglês): o limite de 50 MB do app Send to Kindle",
    url: "https://www.takecontrolbooks.com/your-kindle-can-finally-read-epub-files/",
  },
];

const faqs = [
  {
    question: "O Kindle lê arquivos EPUB?",
    answer:
      "Sim, pelo Send to Kindle. A Amazon converte o EPUB para um formato do Kindle durante o envio.",
  },
  {
    question: "Por que o livro aparece com o nome do arquivo em vez do título?",
    answer:
      "O Kindle pode usar o nome do arquivo quando o metadado de título do EPUB está ausente ou não é reconhecido. Renomear o arquivo com o título do livro resolve rápido.",
  },
  {
    question: "Posso trocar a capa de um livro que comprei na Amazon?",
    answer:
      "Não. Livros comprados na loja Kindle têm DRM, e nenhuma ferramenta consegue editá-los.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Como trocar a capa de um EPUB para Kindle (e corrigir a capa que não aparece)",
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
const steps = "list-decimal space-y-2 pl-6";
const code = "rounded bg-gray-100 px-1 py-0.5 text-sm";

export default function TrocarCapaEpubKindlePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
        Guia do Kindle
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
        Como trocar a capa de um EPUB para Kindle (e corrigir a capa que não aparece)
      </h1>
      <p className="mt-4 text-sm text-gray-500">
        Publicado em outubro de 2026 · Equipe EpubCoverChanger.com
      </p>

      <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-xl font-semibold text-gray-950">Resposta rápida</h2>
        <p className="mt-3 leading-8 text-gray-700">
          O Kindle só mostra a capa de um EPUB quando o arquivo marca
          claramente uma imagem como capa. Para trocar ou adicionar a capa,
          substitua a imagem dentro do EPUB, garanta que ela esteja declarada
          como capa e depois envie o arquivo pelo Send to Kindle. O{" "}
          <Link href="/pt" className="font-medium text-primary hover:underline">
            EpubCoverChanger.com
          </Link>{" "}
          faz as duas coisas no navegador, no computador ou no celular, sem
          enviar seu livro para nenhum servidor.
        </p>
      </div>

      <section className={body}>
        <h2 className={h2}>Por que o Kindle não mostra a capa depois do Send to Kindle</h2>
        <p>
          O Send to Kindle converte o EPUB para um formato do Kindle antes da
          entrega
          <Cite n={1} />. Nessa conversão, o Kindle procura a imagem que o EPUB
          declara como capa. A capa some quando:
        </p>
        <ol className={steps}>
          <li>
            <strong>O EPUB não tem capa nenhuma.</strong> Isso é mais comum do
            que parece. Entre 7 e 12 de outubro de 2026, 195 pessoas enviaram
            arquivos EPUB para a nossa ferramenta 610 vezes; 147 desses envios
            não tinham uma imagem de capa que conseguíssemos detectar, e 91 das
            195 pessoas encontraram pelo menos um arquivo assim. Fanfics são um
            caso típico: EPUBs baixados do AO3 vêm sem imagem de capa
            <Cite n={2} />.
          </li>
          <li>
            <strong>A capa está declarada só de um dos dois jeitos padrão.</strong>{" "}
            O EPUB 3 marca a capa com a propriedade{" "}
            <code className={code}>cover-image</code> no arquivo de pacote
            <Cite n={3} />. Leitores e conversores mais antigos procuram a tag{" "}
            <code className={code}>&lt;meta name=&quot;cover&quot;&gt;</code>.
            Um arquivo que só tem uma delas pode mostrar a capa em um app e não
            em outro.
          </li>
          <li>
            <strong>A imagem não é do tipo que o arquivo diz ser.</strong> Por
            exemplo, dados PNG salvos com nome e tipo de JPEG. Alguns apps
            aceitam, outros não.
          </li>
          <li>
            <strong>O arquivo quebra uma regra de empacotamento.</strong> O
            padrão EPUB exige que o primeiro arquivo do pacote,{" "}
            <code className={code}>mimetype</code>, fique sem compressão
            <Cite n={4} />. Metadado de idioma ausente e codificação de texto
            errada são outros motivos conhecidos para o Send to Kindle recusar
            o arquivo ou embaralhar o texto
            <Cite n={5} />
            <Cite n={6} />.
          </li>
        </ol>
      </section>

      <section className={body}>
        <h2 className={h2}>Como trocar a capa de um EPUB para Kindle (computador)</h2>
        <ol className={steps}>
          <li>
            Abra o{" "}
            <Link href="/pt" className="text-primary hover:underline">
              EpubCoverChanger.com
            </Link>{" "}
            e clique em <strong>Enviar EPUB</strong> para escolher o arquivo.
            Ele é processado no navegador e não vai para nenhum servidor.
          </li>
          <li>
            Clique em <strong>Enviar nova capa</strong> e escolha a imagem (JPG,
            PNG ou WebP).
          </li>
          <li>
            Escolha <strong>Amazon Kindle KDP (1600 x 2560)</strong> como
            tamanho de saída.
          </li>
          <li>
            Escolha <em>Mostrar imagem inteira</em> para manter a imagem toda,
            ou <em>Preencher a capa</em> para cobrir a página de ponta a ponta,
            e confirme.
          </li>
          <li>
            Clique em <strong>Baixar EPUB atualizado</strong>. A ferramenta
            troca a imagem, marca a capa dos dois jeitos padrão e salva a imagem
            no formato que o livro declara.
          </li>
          <li>Envie o novo arquivo para o Kindle (veja as três opções abaixo).</li>
        </ol>
      </section>

      <section className={body}>
        <h2 className={h2}>Como trocar a capa de um EPUB no iPhone</h2>
        <ol className={steps}>
          <li>Abra epubcoverchanger.com/pt no Safari.</li>
          <li>
            Toque em <strong>Enviar EPUB</strong> e escolha o livro no app
            Arquivos.
          </li>
          <li>
            Toque em <strong>Enviar nova capa</strong> e escolha uma foto ou
            imagem.
          </li>
          <li>
            Ajuste a capa e toque em <strong>Baixar EPUB atualizado</strong>.
          </li>
          <li>
            Toque em <strong>Salvar ou abrir EPUB</strong>. Escolha{" "}
            <strong>Salvar em Arquivos</strong> ou compartilhe direto com o app
            Kindle, que envia EPUBs para a sua biblioteca Kindle
            <Cite n={1} />.
          </li>
        </ol>
      </section>

      <section className={body}>
        <h2 className={h2}>Como trocar a capa de um EPUB no Android</h2>
        <ol className={steps}>
          <li>Abra epubcoverchanger.com/pt no Chrome.</li>
          <li>
            Escolha o EPUB na pasta Downloads ou no app Arquivos e depois a nova
            imagem de capa.
          </li>
          <li>Baixe o EPUB atualizado. Ele fica salvo na pasta Downloads.</li>
          <li>
            Abra o menu de compartilhar do arquivo e envie para o app Kindle, ou
            use uma das opções abaixo.
          </li>
        </ol>
      </section>

      <section className={body}>
        <h2 className={h2}>Três formas de enviar o EPUB para o Kindle</h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Método</th>
                <th className="px-4 py-3 font-semibold">Limite de tamanho</th>
                <th className="px-4 py-3 font-semibold">Melhor para</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3">Página Send to Kindle (amazon.com.br/sendtokindle)</td>
                <td className="px-4 py-3">200 MB<Cite n={7} /></td>
                <td className="px-4 py-3">Livros grandes ou ilustrados</td>
              </tr>
              <tr>
                <td className="px-4 py-3">App Send to Kindle (computador) ou compartilhar no app Kindle</td>
                <td className="px-4 py-3">50 MB<Cite n={10} /></td>
                <td className="px-4 py-3">Uso do dia a dia</td>
              </tr>
              <tr>
                <td className="px-4 py-3">E-mail para o seu endereço @kindle.com</td>
                <td className="px-4 py-3">50 MB<Cite n={8} /></td>
                <td className="px-4 py-3">Envios rápidos de qualquer aparelho</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          A Amazon muda esses limites de vez em quando; se um arquivo for
          recusado, confira a página do Send to Kindle. Para o passo a passo
          completo, veja{" "}
          <Link href={localizedRoutes.sendToKindle.pt} className="text-primary hover:underline">
            como enviar EPUB para o Kindle
          </Link>
          . O Kindle não abre EPUB copiado pelo cabo USB; use o Send to Kindle
          para o arquivo ser convertido.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>A capa ainda não aparece? Checklist</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Envie de novo o arquivo corrigido</strong> e apague a cópia
            antiga da biblioteca, para o Kindle não continuar mostrando a
            versão antiga.
          </li>
          <li>
            <strong>O EPUB precisa estar sem DRM.</strong> Livros comprados em
            lojas normalmente têm DRM e não podem ser editados por nenhuma
            ferramenta.
          </li>
          <li>
            <strong>Confira o tamanho do arquivo</strong> com os limites acima.
          </li>
          <li>
            <strong>Se o texto aparecer embaralhado,</strong> o problema é a
            codificação do arquivo, não a capa
            <Cite n={5} />.
          </li>
        </ul>
      </section>

      <section className={body}>
        <h2 className={h2}>Qual o tamanho ideal da capa para Kindle?</h2>
        <p>
          O tamanho ideal de capa de eBook no Amazon KDP é{" "}
          <strong>2.560 pixels de altura por 1.600 pixels de largura</strong>,
          uma proporção de pelo menos 1,6:1. O mínimo é 1.000 x 625 pixels, e o
          arquivo precisa ter menos de 50 MB, em RGB
          <Cite n={9} />. Para os tamanhos da Kobo, Apple Books e Google Play,
          veja o nosso{" "}
          <Link href={localizedRoutes.coverSize.pt} className="text-primary hover:underline">
            guia de tamanho de capa de EPUB
          </Link>
          .
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Perguntas frequentes</h2>
        <h3 className="text-lg font-semibold text-gray-950">{faqs[0].question}</h3>
        <p>
          {faqs[0].answer}
          <Cite n={1} />
        </p>
        <h3 className="text-lg font-semibold text-gray-950">{faqs[1].question}</h3>
        <p>{faqs[1].answer}</p>
        <h3 className="text-lg font-semibold text-gray-950">{faqs[2].question}</h3>
        <p>{faqs[2].answer}</p>
      </section>

      <div className="mt-12 rounded-3xl bg-gray-950 p-8 text-white">
        <h2 className="text-2xl font-semibold">Corrija sua capa agora</h2>
        <p className="mt-3 text-white/75">
          O EpubCoverChanger.com funciona no navegador, no iPhone e no Android,
          e marca a nova capa para o Kindle encontrá-la.
        </p>
        <Link
          href="/pt"
          className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Trocar a capa do EPUB
        </Link>
      </div>

      <SourceList sources={sources} title="Fontes" />
    </article>
  );
}
