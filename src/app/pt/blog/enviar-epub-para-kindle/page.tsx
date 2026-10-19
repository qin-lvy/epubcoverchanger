import type { Metadata } from "next";
import Link from "next/link";
import { Cite, SourceList, type BlogSource } from "@/components/BlogSources";
import { localizedAlternates, localizedRoutes, localizedUrl } from "@/lib/localized-routes";

const pageUrl = localizedUrl("sendToKindle", "pt");
const imageUrl = "https://epubcoverchanger.com/blog/enviar-epub-para-kindle.svg";
const title = "Como enviar EPUB para o Kindle (sem perder a capa)";
const description =
  "Envie um EPUB para o Kindle pelo site, e-mail, iPhone, Android ou computador. Limite de tamanho de cada método e como garantir que a capa apareça.";

export const metadata: Metadata = {
  title,
  description,
  alternates: localizedAlternates("sendToKindle", "pt"),
  openGraph: {
    title,
    description,
    url: pageUrl,
    type: "article",
    locale: "pt_BR",
    images: [{ url: "https://epubcoverchanger.com/og-image.png", width: 1200, height: 630 }],
  },
};

const sources: BlogSource[] = [
  {
    label: "Amazon.com.br: Send to Kindle (tipos de arquivo compatíveis e limite de 200 MB)",
    url: "https://www.amazon.com.br/sendtokindle",
  },
  {
    label: "Amazon.com.br: Send to Kindle para e-mail (passo a passo)",
    url: "https://www.amazon.com.br/sendtokindle/email",
  },
  {
    label: "Amazon Help (em inglês): limites do e-mail Send to Kindle — 25 anexos, 50 MB",
    url: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G7NECT4B4ZWHQ8WV",
  },
  {
    label: "The eBook Reader (em inglês): os apps Send to Kindle para PC e Mac agora aceitam EPUB",
    url: "https://blog.the-ebook-reader.com/2022/12/20/send-to-kindle-apps-for-pc-and-mac-now-support-epub/",
  },
  {
    label: "Take Control Books (em inglês): o limite de 50 MB do app Send to Kindle (2022)",
    url: "https://www.takecontrolbooks.com/your-kindle-can-finally-read-epub-files/",
  },
  {
    label: "Manual do calibre (em inglês): conversão de e-books",
    url: "https://manual.calibre-ebook.com/conversion.html",
  },
];

const faqs = [
  {
    question: "Dá para ler EPUB no Kindle?",
    answer:
      "Sim. O Kindle não abre o arquivo EPUB diretamente, mas depois que você envia pelo Send to Kindle a Amazon converte o livro, e ele funciona como qualquer outro livro do Kindle.",
  },
  {
    question: "Preciso converter EPUB para MOBI ou AZW3 antes?",
    answer: "Não. O Send to Kindle aceita EPUB e faz a conversão para você.",
  },
  {
    question: "Posso enviar vários EPUBs de uma vez?",
    answer: "Sim, por e-mail: até 25 anexos e 50 MB por e-mail.",
  },
  {
    question: "Qual o tamanho ideal da capa para o Kindle?",
    answer: "O ideal da Amazon é 1600 x 2560 pixels (largura x altura).",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  url: pageUrl,
  inLanguage: "pt-BR",
  image: imageUrl,
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

export default function EnviarEpubParaKindlePage() {
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
        Como enviar um EPUB para o Kindle (sem perder a capa)
      </h1>
      <p className="mt-4 text-sm text-gray-500">
        Publicado em outubro de 2026 · Equipe EpubCoverChanger.com
      </p>

      <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-xl font-semibold text-gray-950">Resposta rápida</h2>
        <p className="mt-3 leading-8 text-gray-700">
          O Kindle aceita arquivos EPUB pelo serviço Send to Kindle da Amazon.
          O jeito mais fácil é a página amazon.com.br/sendtokindle: faça login,
          arraste o EPUB (até 200 MB) e ele aparece na sua biblioteca Kindle
          <Cite n={1} />. Você também pode enviar por e-mail ou compartilhar
          pelo app Kindle no iPhone e no Android. Antes de enviar, confira se o
          EPUB tem capa. Se não tiver, o Kindle mostra uma miniatura em branco
          ou genérica.
        </p>
      </div>

      <figure className="mt-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/blog/enviar-epub-para-kindle.svg"
          width={960}
          height={420}
          alt="Um EPUB sem capa, o mesmo EPUB depois de adicionar a capa no EpubCoverChanger.com e o livro com a capa na biblioteca do Kindle depois do Send to Kindle"
          className="h-auto w-full rounded-3xl border border-gray-200"
        />
        <figcaption className="mt-3 text-center text-sm text-gray-500">
          Primeiro adicione a capa, depois envie. O Kindle só mostra a capa que
          o EPUB declara.
        </figcaption>
      </figure>

      <nav aria-label="Nesta página" className="mt-10 rounded-2xl border border-gray-200 p-5 text-sm">
        <p className="font-semibold text-gray-950">Nesta página</p>
        <ul className="mt-2 space-y-1 text-primary">
          <li><a href="#metodos" className="hover:underline">Formas de enviar EPUB para o Kindle</a></li>
          <li><a href="#capa" className="hover:underline">Antes de enviar: confira a capa</a></li>
          <li><a href="#site" className="hover:underline">Enviar pelo site</a></li>
          <li><a href="#email" className="hover:underline">Enviar por e-mail</a></li>
          <li><a href="#iphone" className="hover:underline">Enviar pelo iPhone</a></li>
          <li><a href="#android" className="hover:underline">Enviar pelo Android</a></li>
          <li><a href="#usb" className="hover:underline">Usar cabo USB</a></li>
          <li><a href="#problemas" className="hover:underline">Se o livro não chegar</a></li>
          <li><a href="#perguntas" className="hover:underline">Perguntas frequentes</a></li>
        </ul>
      </nav>

      <section id="metodos" className={body}>
        <h2 className={h2}>Formas de enviar EPUB para o Kindle</h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Método</th>
                <th className="px-4 py-3 font-semibold">Limite de tamanho</th>
                <th className="px-4 py-3 font-semibold">Melhor para</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3">Página Send to Kindle (site)</td>
                <td className="px-4 py-3">200 MB por arquivo<Cite n={1} /></td>
                <td className="px-4 py-3">Qualquer computador; livros grandes ou ilustrados</td>
              </tr>
              <tr>
                <td className="px-4 py-3">E-mail para o seu endereço Send to Kindle</td>
                <td className="px-4 py-3">50 MB por e-mail, até 25 arquivos<Cite n={3} /></td>
                <td className="px-4 py-3">Enviar vários livros de uma vez</td>
              </tr>
              <tr>
                <td className="px-4 py-3">App Kindle no iPhone ou Android (Compartilhar)</td>
                <td className="px-4 py-3">A Amazon não publica; para arquivos grandes, use o site</td>
                <td className="px-4 py-3">Livros salvos no celular</td>
              </tr>
              <tr>
                <td className="px-4 py-3">App Send to Kindle para Windows ou Mac</td>
                <td className="px-4 py-3">50 MB (informado em 2022)<Cite n={5} /></td>
                <td className="px-4 py-3">Enviar com o botão direito do mouse</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          O Send to Kindle converte o EPUB para um formato do Kindle durante o
          envio
          <Cite n={4} />. Copiar um EPUB para o Kindle pelo cabo USB não
          funciona sem converter antes; veja{" "}
          <a href="#usb" className="text-primary hover:underline">
            usar cabo USB
          </a>
          .
        </p>
      </section>

      <section id="capa" className={body}>
        <h2 className={h2}>Antes de enviar: confira a capa</h2>
        <p>
          O Kindle mostra a imagem que o EPUB declara como capa, e muitos EPUBs
          não declaram nenhuma. Fanfics baixadas e arquivos gerados por
          conversores simples são exemplos comuns. Entre as pessoas que usaram
          nossa ferramenta de 7 a 14 de outubro de 2026, 125 de 265 (47%)
          enviaram pelo menos um EPUB sem capa detectável. Esse número não vale
          para todos os EPUBs, porque muita gente chega até nós justamente por
          falta de capa, mas mostra com que frequência isso atrapalha os
          leitores.
        </p>
        <p>
          Para adicionar ou trocar a capa, abra o{" "}
          <Link href="/pt" className="text-primary hover:underline">
            EpubCoverChanger.com
          </Link>
          , escolha o EPUB e a nova imagem de capa, selecione o tamanho{" "}
          <strong>Amazon Kindle KDP (1600 x 2560)</strong> e baixe o arquivo
          atualizado. Tudo roda no navegador, então seu livro nunca é enviado
          para um servidor. Se a capa continuar sumindo depois do envio, veja{" "}
          <Link href={localizedRoutes.changeCover.pt} className="text-primary hover:underline">
            como corrigir a capa que não aparece no Kindle
          </Link>
          .
        </p>
      </section>

      <section id="site" className={body}>
        <h2 className={h2}>Enviar EPUB para o Kindle pelo site (mais fácil)</h2>
        <ol className={steps}>
          <li>Acesse amazon.com.br/sendtokindle e faça login com sua conta Amazon.</li>
          <li>Arraste o EPUB para a área de upload ou clique para escolher o arquivo.</li>
          <li>Escolha a sua biblioteca Kindle ou os dispositivos para onde quer enviar.</li>
          <li>Clique em enviar. O livro aparece na biblioteca depois que a Amazon termina a conversão.</li>
        </ol>
        <p>
          Se a sua conta é de outro país, use o Send to Kindle da loja Amazon
          desse país, por exemplo amazon.com/sendtokindle.
        </p>
      </section>

      <section id="email" className={body}>
        <h2 className={h2}>Enviar EPUB para o Kindle por e-mail</h2>
        <ol className={steps}>
          <li>
            Encontre seu endereço de e-mail Send to Kindle em{" "}
            <strong>Gerencie seu conteúdo e dispositivos</strong> &gt;{" "}
            <strong>Preferências</strong> &gt;{" "}
            <strong>Configurações de documentos pessoais</strong>
            <Cite n={2} />.
          </li>
          <li>
            Na mesma página, coloque o e-mail que você vai usar na{" "}
            <strong>Lista de e-mails aprovados para documentos pessoais</strong>.
            Só endereços aprovados conseguem enviar arquivos
            <Cite n={2} />.
          </li>
          <li>
            Anexe o EPUB e envie. Não precisa de assunto. Cabem até 25 arquivos
            e 50 MB por e-mail; para lotes maiores, compacte em .zip
            <Cite n={3} />.
          </li>
        </ol>
      </section>

      <section id="iphone" className={body}>
        <h2 className={h2}>Enviar EPUB para o Kindle pelo iPhone</h2>
        <ol className={steps}>
          <li>Instale o app Kindle e faça login.</li>
          <li>
            Abra o app Arquivos, toque e segure o EPUB, toque em{" "}
            <strong>Compartilhar</strong> e escolha <strong>Kindle</strong>. Se
            o Kindle não aparecer, toque em <strong>Mais</strong> e ative.
          </li>
          <li>
            Confirme o envio. O livro entra na sua biblioteca Kindle
            <Cite n={1} />.
          </li>
        </ol>
        <p>
          O livro ainda não tem capa? Abra epubcoverchanger.com/pt no Safari,
          adicione a capa, toque em <strong>Salvar ou abrir EPUB</strong> e
          compartilhe o novo arquivo com o Kindle a partir dali.
        </p>
      </section>

      <section id="android" className={body}>
        <h2 className={h2}>Enviar EPUB para o Kindle pelo Android</h2>
        <ol className={steps}>
          <li>Instale o app Kindle e faça login.</li>
          <li>
            No app Arquivos ou Downloads, abra o menu de compartilhar do EPUB e
            escolha <strong>Kindle</strong>.
          </li>
          <li>
            Confirme o envio. A Amazon lista iOS e Android entre as formas de
            usar o Send to Kindle
            <Cite n={1} />.
          </li>
        </ol>
      </section>

      <section id="usb" className={body}>
        <h2 className={h2}>Usar cabo USB</h2>
        <p>
          O Kindle não abre um EPUB copiado pelo cabo USB. Se preferir o cabo,
          converta o livro para AZW3 antes, por exemplo com o conversor
          gratuito do calibre
          <Cite n={6} />, e copie o arquivo AZW3 para a pasta documents do
          Kindle. Para a maioria das pessoas, o Send to Kindle é mais simples e
          ainda sincroniza o livro entre dispositivos.
        </p>
      </section>

      <section id="problemas" className={body}>
        <h2 className={h2}>Se o livro não chegar</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Enviou por e-mail?</strong> Confira se o endereço de envio
            está na lista de e-mails aprovados. A Amazon continua tentando
            entregar por até 60 dias
            <Cite n={3} />.
          </li>
          <li>
            <strong>Confira o tamanho</strong> com os limites da tabela acima.
          </li>
          <li>
            <strong>O EPUB precisa estar sem DRM.</strong>{" "}Livros comprados em
            lojas, com DRM, não podem ser enviados assim.
          </li>
          <li>
            <strong>Foi recusado ou o texto saiu estranho?</strong> Veja causas
            e soluções no nosso{" "}
            <Link href={localizedRoutes.changeCover.pt} className="text-primary hover:underline">
              guia de capa e problemas de EPUB no Kindle
            </Link>
            .
          </li>
        </ul>
      </section>

      <section id="perguntas" className={body}>
        <h2 className={h2}>Perguntas frequentes</h2>
        <h3 className="text-lg font-semibold text-gray-950">{faqs[0].question}</h3>
        <p>
          {faqs[0].answer}
          <Cite n={1} />
          <Cite n={4} />
        </p>
        <h3 className="text-lg font-semibold text-gray-950">{faqs[1].question}</h3>
        <p>
          {faqs[1].answer}
          <Cite n={1} />
          <Cite n={4} />
        </p>
        <h3 className="text-lg font-semibold text-gray-950">{faqs[2].question}</h3>
        <p>
          {faqs[2].answer}
          <Cite n={3} />
        </p>
        <h3 className="text-lg font-semibold text-gray-950">{faqs[3].question}</h3>
        <p>
          {faqs[3].answer} Veja o nosso{" "}
          <Link href={localizedRoutes.coverSize.pt} className="text-primary hover:underline">
            guia de tamanho de capa de EPUB
          </Link>{" "}
          para outras lojas.
        </p>
      </section>

      <div className="mt-12 rounded-3xl bg-gray-950 p-8 text-white">
        <h2 className="text-2xl font-semibold">Adicione a capa antes de enviar</h2>
        <p className="mt-3 text-white/75">
          O EpubCoverChanger.com adiciona ou troca a capa do EPUB no navegador,
          no computador, iPhone ou Android, e marca a capa para o Kindle
          encontrá-la.
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
