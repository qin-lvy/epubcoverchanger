import type { Metadata } from "next";
import Link from "next/link";
import { Cite, SourceList, type BlogSource } from "@/components/BlogSources";
import { localizedAlternates, localizedRoutes, localizedUrl } from "@/lib/localized-routes";

const pageUrl = localizedUrl("changeCover", "es");
const title = "Cambiar portada de EPUB para Kindle y arreglar la que falta";
const description =
  "¿Kindle no muestra la portada de tu EPUB? Descubre por qué pasa y cómo añadir o cambiar la portada gratis en iPhone, Android o computadora.";

export const metadata: Metadata = {
  title,
  description,
  alternates: localizedAlternates("changeCover", "es"),
  openGraph: { title, description, url: pageUrl, type: "article", locale: "es_ES" },
};

const sources: BlogSource[] = [
  {
    label: "The eBook Reader (en inglés): las apps Send to Kindle para PC y Mac ya admiten EPUB",
    url: "https://blog.the-ebook-reader.com/2022/12/20/send-to-kindle-apps-for-pc-and-mac-now-support-epub/",
  },
  {
    label: "alexwlchan (en inglés): añadir portadas a los EPUB descargados de AO3",
    url: "https://alexwlchan.net/2025/ao3-epub-covers/",
  },
  {
    label: "W3C EPUB 3.3 (en inglés): la propiedad cover-image",
    url: "https://www.w3.org/TR/epub-33/#sec-cover-image",
  },
  {
    label: "W3C EPUB 3.3 (en inglés): el archivo mimetype",
    url: "https://www.w3.org/TR/epub-33/#sec-zip-container-mime",
  },
  {
    label: "kindle-epub-fix en GitHub (en inglés): corregir la codificación del EPUB para Send to Kindle",
    url: "https://github.com/innocenat/kindle-epub-fix",
  },
  {
    label: "Calibre-Web-Automated (en inglés): errores E999 de Send to Kindle y metadato de idioma ausente",
    url: "https://github.com/crocodilestick/Calibre-Web-Automated/discussions/147",
  },
  {
    label: "Amazon (en inglés): Send to Kindle, límite de 200 MB por archivo",
    url: "https://www.amazon.com/sendtokindle",
  },
  {
    label: "Amazon Help (en inglés): límites del correo de Send to Kindle, 25 adjuntos y 50 MB",
    url: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G7NECT4B4ZWHQ8WV",
  },
  {
    label: "Amazon KDP: criterios de la imagen de portada del eBook",
    url: "https://kdp.amazon.com/es_ES/help/topic/G200645690",
  },
  {
    label: "Take Control Books (en inglés): el límite de 50 MB de la app Send to Kindle",
    url: "https://www.takecontrolbooks.com/your-kindle-can-finally-read-epub-files/",
  },
];

const faqs = [
  {
    question: "¿Kindle puede leer archivos EPUB?",
    answer:
      "Sí, con Send to Kindle. Amazon convierte el EPUB a un formato de Kindle durante el envío.",
  },
  {
    question: "¿Por qué el libro aparece con el nombre del archivo en lugar del título?",
    answer:
      "Kindle puede usar el nombre del archivo cuando el metadato de título del EPUB falta o no se reconoce. Cambiar el nombre del archivo por el título del libro lo soluciona rápido.",
  },
  {
    question: "¿Puedo cambiar la portada de un libro que compré en Amazon?",
    answer:
      "No. Los libros comprados en la tienda Kindle tienen DRM y ninguna herramienta puede editarlos.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Cómo cambiar la portada de un EPUB para Kindle (y arreglar la portada que no aparece)",
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
const steps = "list-decimal space-y-2 pl-6";
const code = "rounded bg-gray-100 px-1 py-0.5 text-sm";

export default function CambiarPortadaEpubKindlePage() {
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
        Guía de Kindle
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
        Cómo cambiar la portada de un EPUB para Kindle (y arreglar la portada que no aparece)
      </h1>
      <p className="mt-4 text-sm text-gray-500">
        Publicado en octubre de 2026 · Equipo de EpubCoverChanger.com
      </p>

      <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-xl font-semibold text-gray-950">Respuesta rápida</h2>
        <p className="mt-3 leading-8 text-gray-700">
          Kindle solo muestra la portada de un EPUB cuando el archivo marca
          claramente una imagen como portada. Para cambiar o añadir la portada,
          sustituye la imagen dentro del EPUB, asegúrate de que esté declarada
          como portada y después envía el archivo con Send to Kindle.{" "}
          <Link href="/es" className="font-medium text-primary hover:underline">
            EpubCoverChanger.com
          </Link>{" "}
          hace los dos pasos en tu navegador, en la computadora o en el móvil,
          sin subir tu libro a ningún servidor.
        </p>
      </div>

      <section className={body}>
        <h2 className={h2}>Por qué Kindle no muestra la portada después de Send to Kindle</h2>
        <p>
          Send to Kindle convierte tu EPUB a un formato de Kindle antes de
          entregarlo
          <Cite n={1} />. Durante esa conversión, Kindle busca la imagen que el
          EPUB declara como portada. La portada desaparece cuando:
        </p>
        <ol className={steps}>
          <li>
            <strong>El EPUB no tiene portada.</strong> Es más habitual de lo que
            parece. Entre el 7 y el 12 de octubre de 2026, 195 personas subieron
            archivos EPUB a nuestra herramienta 610 veces; 147 de esas subidas
            no tenían una imagen de portada que pudiéramos detectar, y 91 de las
            195 personas se encontraron con al menos un archivo así. Los fanfics
            son un caso típico: los EPUB descargados de AO3 vienen sin imagen de
            portada
            <Cite n={2} />.
          </li>
          <li>
            <strong>La portada solo está declarada de una de las dos formas estándar.</strong>{" "}
            EPUB 3 marca la portada con la propiedad{" "}
            <code className={code}>cover-image</code> en el archivo de paquete
            <Cite n={3} />. Los lectores y conversores más antiguos buscan en su
            lugar la etiqueta{" "}
            <code className={code}>&lt;meta name=&quot;cover&quot;&gt;</code>.
            Un archivo que solo tiene una de las dos puede mostrar la portada en
            una app y no en otra.
          </li>
          <li>
            <strong>La imagen no es del tipo que dice el archivo.</strong> Por
            ejemplo, datos PNG guardados con nombre y tipo de JPEG. Algunas apps
            lo toleran y otras no.
          </li>
          <li>
            <strong>El archivo incumple una regla de empaquetado.</strong> El
            estándar EPUB exige que el primer archivo del paquete,{" "}
            <code className={code}>mimetype</code>, se guarde sin comprimir
            <Cite n={4} />. La falta del metadato de idioma y una codificación de
            texto incorrecta son otros motivos conocidos por los que Send to
            Kindle rechaza un archivo o desordena el texto
            <Cite n={5} />
            <Cite n={6} />.
          </li>
        </ol>
      </section>

      <section className={body}>
        <h2 className={h2}>Cómo cambiar la portada de un EPUB para Kindle (computadora)</h2>
        <ol className={steps}>
          <li>
            Abre{" "}
            <Link href="/es" className="text-primary hover:underline">
              EpubCoverChanger.com
            </Link>{" "}
            y haz clic en <strong>Subir EPUB</strong> para elegir el archivo. Se
            procesa en tu navegador y no se sube a ningún servidor.
          </li>
          <li>
            Haz clic en <strong>Subir nueva portada</strong> y elige la imagen
            (JPG, PNG o WebP).
          </li>
          <li>
            Elige <strong>Amazon Kindle KDP (1600 x 2560)</strong> como tamaño
            de salida.
          </li>
          <li>
            Elige <em>Mostrar la imagen completa</em> para conservar toda la
            imagen, o <em>Rellenar portada</em> para cubrir la página de borde a
            borde, y confirma.
          </li>
          <li>
            Haz clic en <strong>Descargar EPUB actualizado</strong>. La
            herramienta sustituye la imagen, la marca como portada de las dos
            formas estándar y la guarda en el formato que declara el libro.
          </li>
          <li>Envía el nuevo archivo a tu Kindle (mira las tres opciones más abajo).</li>
        </ol>
      </section>

      <section className={body}>
        <h2 className={h2}>Cómo cambiar la portada de un EPUB en iPhone</h2>
        <ol className={steps}>
          <li>Abre epubcoverchanger.com/es en Safari.</li>
          <li>
            Toca <strong>Subir EPUB</strong> y elige el libro en la app Archivos.
          </li>
          <li>
            Toca <strong>Subir nueva portada</strong> y elige una foto o imagen.
          </li>
          <li>
            Ajusta la portada y toca <strong>Descargar EPUB actualizado</strong>.
          </li>
          <li>
            Toca <strong>Guardar o abrir EPUB</strong>. Elige{" "}
            <strong>Guardar en Archivos</strong> o compártelo directamente con
            la app de Kindle, que envía los EPUB a tu biblioteca de Kindle
            <Cite n={1} />.
          </li>
        </ol>
      </section>

      <section className={body}>
        <h2 className={h2}>Cómo cambiar la portada de un EPUB en Android</h2>
        <ol className={steps}>
          <li>Abre epubcoverchanger.com/es en Chrome.</li>
          <li>
            Elige el EPUB desde Descargas o la app Archivos y después la nueva
            imagen de portada.
          </li>
          <li>Descarga el EPUB actualizado. Se guarda en la carpeta Descargas.</li>
          <li>
            Abre el menú de compartir del archivo y envíalo a la app de Kindle,
            o usa una de las opciones de abajo.
          </li>
        </ol>
      </section>

      <section className={body}>
        <h2 className={h2}>Tres formas de enviar el EPUB a Kindle</h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Método</th>
                <th className="px-4 py-3 font-semibold">Límite de tamaño</th>
                <th className="px-4 py-3 font-semibold">Ideal para</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3">Página web de Send to Kindle (amazon.es/sendtokindle, amazon.com.mx/sendtokindle…)</td>
                <td className="px-4 py-3">200 MB<Cite n={7} /></td>
                <td className="px-4 py-3">Libros grandes o ilustrados</td>
              </tr>
              <tr>
                <td className="px-4 py-3">App Send to Kindle (computadora) o compartir desde la app de Kindle</td>
                <td className="px-4 py-3">50 MB<Cite n={10} /></td>
                <td className="px-4 py-3">Uso diario</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Correo a tu dirección @kindle.com</td>
                <td className="px-4 py-3">50 MB<Cite n={8} /></td>
                <td className="px-4 py-3">Envíos rápidos desde cualquier dispositivo</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Amazon cambia estos límites de vez en cuando; si un archivo se
          rechaza, revisa su página de Send to Kindle. Para el paso a paso
          completo, consulta{" "}
          <Link href={localizedRoutes.sendToKindle.es} className="text-primary hover:underline">
            cómo enviar un EPUB a Kindle
          </Link>
          . Los lectores Kindle no abren un EPUB copiado por USB; usa Send to
          Kindle para que el archivo se convierta.
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>¿Sigue sin aparecer la portada? Lista de comprobación</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Vuelve a enviar el archivo corregido</strong> y borra la
            copia antigua de tu biblioteca, para que Kindle no siga mostrando la
            versión anterior.
          </li>
          <li>
            <strong>El EPUB debe estar libre de DRM.</strong> Los libros
            comprados en tiendas suelen tener DRM y ninguna herramienta puede
            editarlos.
          </li>
          <li>
            <strong>Revisa el tamaño del archivo</strong> con los límites de
            arriba.
          </li>
          <li>
            <strong>Si el texto sale desordenado,</strong> el problema es la
            codificación del archivo, no la portada
            <Cite n={5} />.
          </li>
        </ul>
      </section>

      <section className={body}>
        <h2 className={h2}>¿Qué tamaño debe tener una portada para Kindle?</h2>
        <p>
          El tamaño ideal de portada de eBook en Amazon KDP es de{" "}
          <strong>2560 píxeles de alto por 1600 píxeles de ancho</strong>, una
          proporción de al menos 1,6:1. El mínimo es 1000 x 625 píxeles, y el
          archivo debe pesar menos de 50 MB y estar en RGB
          <Cite n={9} />. Para los tamaños de Kobo, Apple Books y Google Play,
          consulta nuestra{" "}
          <Link href={localizedRoutes.coverSize.es} className="text-primary hover:underline">
            guía de tamaños de portada EPUB
          </Link>
          .
        </p>
      </section>

      <section className={body}>
        <h2 className={h2}>Preguntas frecuentes</h2>
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
        <h2 className="text-2xl font-semibold">Arregla tu portada ahora</h2>
        <p className="mt-3 text-white/75">
          EpubCoverChanger.com funciona en tu navegador, en iPhone y Android, y
          marca la nueva portada para que Kindle la encuentre.
        </p>
        <Link
          href="/es"
          className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Cambiar la portada del EPUB
        </Link>
      </div>

      <SourceList sources={sources} title="Fuentes" />
    </article>
  );
}
