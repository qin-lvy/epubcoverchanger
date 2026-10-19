import type { Metadata } from "next";
import Link from "next/link";
import { Cite, SourceList, type BlogSource } from "@/components/BlogSources";
import { localizedAlternates, localizedRoutes, localizedUrl } from "@/lib/localized-routes";

const pageUrl = localizedUrl("coverSize", "es");
const title = "Tamaño de portada EPUB: Kindle, Kobo y Apple Books (2026)";
const description =
  "Tamaños oficiales de portada para Kindle (1600 x 2560), Apple Books, Kobo y Google Play Libros en una tabla, con fuentes y el tamaño más seguro.";

export const metadata: Metadata = {
  title,
  description,
  alternates: localizedAlternates("coverSize", "es"),
  openGraph: { title, description, url: pageUrl, type: "article", locale: "es_ES" },
};

const sources: BlogSource[] = [
  {
    label: "Amazon KDP: criterios de la imagen de portada del eBook",
    url: "https://kdp.amazon.com/es_ES/help/topic/G200645690",
  },
  {
    label: "Apple Books Asset Guide (en inglés): imagen de portada",
    url: "https://help.apple.com/itc/booksassetguide/en.lproj/itc1bda991ba.html",
  },
  {
    label: "Kobo Writing Life Help Center (en inglés): configurar un nuevo eBook",
    url: "https://kobowritinglife.zendesk.com/hc/en-us/articles/360058975732-Setting-up-a-New-eBook",
  },
  {
    label: "Google Play Libros, Partner Center: directrices de archivos de libros",
    url: "https://support.google.com/books/partner/answer/3424254?hl=es",
  },
  {
    label: "W3C (en inglés): EPUB 3.3",
    url: "https://www.w3.org/TR/epub-33/",
  },
];

const sizes = [
  {
    platform: "Amazon Kindle (KDP)",
    official:
      "Ideal 2560 x 1600 px (alto x ancho); mín. 1000 x 625; máx. 10 000 px por lado; proporción de al menos 1,6:1; JPEG o TIFF; RGB; menos de 50 MB",
    recommended: "1600 x 2560",
    source: 1,
  },
  {
    platform: "Apple Books",
    official:
      "Al menos 1400 px en el lado más corto; JPEG o PNG; RGB; sin imágenes ampliadas ni borrosas",
    recommended: "1600 x 2400",
    source: 2,
  },
  {
    platform: "Kobo",
    official:
      "300 DPI recomendado; 5 MB como máximo; JPG o PNG. Kobo no publica un tamaño obligatorio en píxeles, y sus lectores tienen una pantalla de 1448 x 1072 (unos 3:4)",
    recommended: "1600 x 2400, o 1500 x 2000 para ajustarse a la forma de la pantalla",
    source: 3,
  },
  {
    platform: "Google Play Libros",
    official: "Al menos 640 px; máx. 7200 px por lado; JPEG, PNG, TIFF o PDF",
    recommended: "1600 x 2400",
    source: 4,
  },
  {
    platform: "EPUB estándar",
    official: "El estándar EPUB no fija un tamaño de portada",
    recommended: "1600 x 2400",
    source: 5,
  },
];

const faqs = [
  {
    question: "¿Cuál es el mejor tamaño de portada para un EPUB?",
    answer:
      "No hay un tamaño único. Usa 1600 x 2560 px para Kindle y 1600 x 2400 px (2:3) para Apple Books, Kobo y Google Play Libros. Exporta en JPEG RGB de menos de 5 MB.",
  },
  {
    question: "¿Qué tamaño de portada es el ideal para Kindle?",
    answer:
      "Amazon KDP indica como ideal 2560 px de alto por 1600 px de ancho, con una proporción de al menos 1,6:1.",
  },
  {
    question: "¿Puedo ampliar una imagen pequeña para llegar al tamaño?",
    answer:
      "No es buena idea. Ampliarla hace el archivo más pesado sin añadir detalle, y Apple rechaza las portadas ampliadas.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Tamaño de portada EPUB para Kindle, Kobo, Apple Books y Google Play",
  description,
  url: pageUrl,
  inLanguage: "es",
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  author: { "@type": "Organization", name: "EpubCoverChanger.com", url: "https://epubcoverchanger.com" },
  publisher: { "@type": "Organization", name: "EpubCoverChanger.com", url: "https://epubcoverchanger.com" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const h2 = "text-2xl font-semibold text-gray-950";
const body = "mt-12 space-y-4 text-base leading-8 text-gray-700";

export default function TamanoPortadaEpubPage() {
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
        Guía de tamaños de portada
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
        Tamaño de portada EPUB para Kindle, Kobo, Apple Books y Google Play
      </h1>
      <p className="mt-4 text-sm text-gray-500">
        Publicado en octubre de 2026 · Equipo de EpubCoverChanger.com
      </p>

      <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-xl font-semibold text-gray-950">Respuesta rápida</h2>
        <p className="mt-3 leading-8 text-gray-700">
          No existe un único tamaño de portada EPUB. Usa{" "}
          <strong>1600 x 2560 px</strong> para Kindle, que es el ideal que
          indica Amazon. Usa <strong>1600 x 2400 px</strong>{" "}(2:3) para Apple
          Books, Kobo y Google Play Libros; cumple el mínimo de las tres
          tiendas. Exporta en JPEG RGB de menos de 5 MB.
        </p>
      </div>

      <section className={body}>
        <h2 className={h2}>Tamaño de portada por plataforma</h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Plataforma</th>
                <th className="px-4 py-3 font-semibold">Lo que exige oficialmente la tienda</th>
                <th className="px-4 py-3 font-semibold">Tamaño que recomendamos</th>
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
          <strong>Un archivo para todas las tiendas:</strong> exporta en 1600 x
          2400 px. Supera el mínimo de 1400 px de Apple y el de 640 px de
          Google, y queda por debajo del límite de 5 MB de Kobo. Solo para
          Kindle, 1600 x 2560 coincide exactamente con la proporción ideal de
          1,6:1 de Amazon. Si la portada desaparece después de Send to Kindle,
          consulta{" "}
          <Link href={localizedRoutes.changeCover.es} className="text-primary hover:underline">
            cómo arreglar la portada que no aparece en Kindle
          </Link>
          .
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Por qué los tamaños son distintos</h2>
        <p>
          Cada tienda adapta la portada a pantallas y miniaturas diferentes. La
          forma 1,6:1 de Amazon es más alta que la 2:3 (1,5:1) que usan la
          mayoría de las demás tiendas. Una portada 2:3 sigue funcionando en
          Kindle, pero se mostrará con un recorte o unos márgenes algo distintos
          a los de una portada 1,6:1.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Mostrar la imagen completa o rellenar la portada</h2>
        <p>
          <em>Mostrar la imagen completa</em> mantiene visible toda la imagen y
          rellena el espacio sobrante con un color de fondo.{" "}
          <em>Rellenar portada</em> cubre la página de borde a borde y puede
          recortar los bordes. Usa <em>Mostrar la imagen completa</em> cuando
          haya texto cerca de los bordes, y <em>Rellenar portada</em> para
          ilustraciones a sangre. Nunca estires la imagen para llegar a un
          tamaño.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Regla de calidad</h2>
        <p>
          Parte de la imagen original más grande que tengas. Ampliar una imagen
          pequeña hasta 1600 x 2560 hace el archivo más pesado pero no añade
          detalle, y Apple rechaza expresamente las portadas ampliadas
          <Cite n={2} />.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Preguntas frecuentes</h2>
        {faqs.map((faq) => (
          <div key={faq.question} className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-950">{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
        <p>
          ¿Luego vas a pasar el libro a tu Kindle? Consulta{" "}
          <Link href={localizedRoutes.sendToKindle.es} className="text-primary hover:underline">
            cómo enviar un EPUB a Kindle
          </Link>
          .
        </p>
      </section>

      <div className="mt-12 rounded-3xl border border-blue-100 bg-blue-50 p-8">
        <h2 className="text-2xl font-semibold text-gray-950">
          ¿Necesitas exportar en uno de estos tamaños?
        </h2>
        <p className="mt-3 text-gray-700">
          EpubCoverChanger.com incluye ajustes predefinidos para Kindle, Apple
          Books, Kobo y Google Play, y nunca estira tu imagen.
        </p>
        <Link
          href="/es"
          className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Exportar la portada en el tamaño correcto
        </Link>
      </div>

      <SourceList sources={sources} title="Fuentes" />
    </article>
  );
}
