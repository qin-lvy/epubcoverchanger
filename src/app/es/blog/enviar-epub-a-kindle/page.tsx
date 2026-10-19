import type { Metadata } from "next";
import Link from "next/link";
import { Cite, SourceList, type BlogSource } from "@/components/BlogSources";
import { localizedAlternates, localizedRoutes, localizedUrl } from "@/lib/localized-routes";

const pageUrl = localizedUrl("sendToKindle", "es");
const imageUrl = "https://epubcoverchanger.com/blog/enviar-epub-a-kindle.svg";
const title = "Cómo enviar un EPUB a Kindle (sin perder la portada)";
const description =
  "Envía un EPUB a Kindle desde la web, el correo, iPhone, Android o la computadora: el límite de cada método y cómo conservar la portada.";

export const metadata: Metadata = {
  title,
  description,
  alternates: localizedAlternates("sendToKindle", "es"),
  openGraph: {
    title,
    description,
    url: pageUrl,
    type: "article",
    locale: "es_ES",
    images: [{ url: "https://epubcoverchanger.com/og-image.png", width: 1200, height: 630 }],
  },
};

const sources: BlogSource[] = [
  {
    label: "Amazon: Send to Kindle (tipos de archivo admitidos y límite de 200 MB, en inglés)",
    url: "https://www.amazon.com/sendtokindle",
  },
  {
    label: "Amazon Help (en inglés): cómo usar la dirección de correo de Send to Kindle",
    url: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G7NECT4B4ZWHQ8WV",
  },
  {
    label: "The eBook Reader (en inglés): las apps Send to Kindle para PC y Mac ya admiten EPUB",
    url: "https://blog.the-ebook-reader.com/2022/12/20/send-to-kindle-apps-for-pc-and-mac-now-support-epub/",
  },
  {
    label: "Take Control Books (en inglés): el límite de 50 MB de la app Send to Kindle (2022)",
    url: "https://www.takecontrolbooks.com/your-kindle-can-finally-read-epub-files/",
  },
  {
    label: "Manual de calibre (en inglés): conversión de libros electrónicos",
    url: "https://manual.calibre-ebook.com/conversion.html",
  },
];

const faqs = [
  {
    question: "¿Se pueden leer libros EPUB en Kindle?",
    answer:
      "Sí. Kindle no abre el archivo EPUB directamente, pero cuando lo envías con Send to Kindle, Amazon lo convierte y se lee como cualquier otro libro de Kindle.",
  },
  {
    question: "¿Tengo que convertir el EPUB a MOBI o AZW3 antes?",
    answer: "No. Send to Kindle acepta EPUB directamente y lo convierte por ti.",
  },
  {
    question: "¿Puedo enviar varios EPUB a la vez?",
    answer: "Sí, por correo: hasta 25 archivos adjuntos y 50 MB por correo.",
  },
  {
    question: "¿Qué tamaño debe tener la portada para Kindle?",
    answer: "El tamaño ideal según Amazon es 1600 x 2560 píxeles (ancho x alto).",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  url: pageUrl,
  inLanguage: "es",
  image: imageUrl,
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

export default function EnviarEpubAKindlePage() {
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
        Cómo enviar un EPUB a Kindle (sin perder la portada)
      </h1>
      <p className="mt-4 text-sm text-gray-500">
        Publicado en octubre de 2026 · Equipo de EpubCoverChanger.com
      </p>

      <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-xl font-semibold text-gray-950">Respuesta rápida</h2>
        <p className="mt-3 leading-8 text-gray-700">
          Kindle acepta archivos EPUB a través del servicio Send to Kindle de
          Amazon. Lo más fácil es la página web de Send to Kindle de tu tienda
          Amazon (por ejemplo amazon.es/sendtokindle o
          amazon.com.mx/sendtokindle): inicia sesión, arrastra el EPUB (hasta
          200 MB) y aparecerá en tu biblioteca de Kindle
          <Cite n={1} />. También puedes enviarlo por correo o compartirlo
          desde la app de Kindle en iPhone y Android. Antes de enviarlo,
          comprueba que el EPUB tenga portada. Si no la tiene, tu Kindle
          mostrará una miniatura en blanco o genérica.
        </p>
      </div>

      <figure className="mt-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/blog/enviar-epub-a-kindle.svg"
          width={960}
          height={420}
          alt="Un EPUB sin portada, el mismo EPUB después de añadir la portada en EpubCoverChanger.com y el libro con su portada en la biblioteca de Kindle después de Send to Kindle"
          className="h-auto w-full rounded-3xl border border-gray-200"
        />
        <figcaption className="mt-3 text-center text-sm text-gray-500">
          Primero añade la portada y después envía el libro. Kindle solo muestra
          la portada que el EPUB declara.
        </figcaption>
      </figure>

      <nav aria-label="En esta página" className="mt-10 rounded-2xl border border-gray-200 p-5 text-sm">
        <p className="font-semibold text-gray-950">En esta página</p>
        <ul className="mt-2 space-y-1 text-primary">
          <li><a href="#metodos" className="hover:underline">Formas de enviar un EPUB a Kindle</a></li>
          <li><a href="#portada" className="hover:underline">Antes de enviar: revisa la portada</a></li>
          <li><a href="#web" className="hover:underline">Enviar desde la web</a></li>
          <li><a href="#correo" className="hover:underline">Enviar por correo</a></li>
          <li><a href="#iphone" className="hover:underline">Enviar desde iPhone</a></li>
          <li><a href="#android" className="hover:underline">Enviar desde Android</a></li>
          <li><a href="#usb" className="hover:underline">Usar un cable USB</a></li>
          <li><a href="#problemas" className="hover:underline">Si el libro no llega</a></li>
          <li><a href="#preguntas" className="hover:underline">Preguntas frecuentes</a></li>
        </ul>
      </nav>

      <section id="metodos" className={body}>
        <h2 className={h2}>Formas de enviar un EPUB a Kindle</h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Método</th>
                <th className="px-4 py-3 font-semibold">Límite de tamaño</th>
                <th className="px-4 py-3 font-semibold">Ideal para</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3">Página web de Send to Kindle</td>
                <td className="px-4 py-3">200 MB por archivo<Cite n={1} /></td>
                <td className="px-4 py-3">Cualquier computadora; libros grandes o ilustrados</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Correo a tu dirección de Send to Kindle</td>
                <td className="px-4 py-3">50 MB por correo, hasta 25 archivos<Cite n={2} /></td>
                <td className="px-4 py-3">Enviar varios libros a la vez</td>
              </tr>
              <tr>
                <td className="px-4 py-3">App de Kindle en iPhone o Android (Compartir)</td>
                <td className="px-4 py-3">Amazon no lo publica; para archivos grandes usa la web</td>
                <td className="px-4 py-3">Libros guardados en el móvil</td>
              </tr>
              <tr>
                <td className="px-4 py-3">App Send to Kindle para Windows o Mac</td>
                <td className="px-4 py-3">50 MB (según un informe de 2022)<Cite n={4} /></td>
                <td className="px-4 py-3">Enviar con clic derecho desde el escritorio</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Send to Kindle convierte el EPUB a un formato de Kindle durante el
          envío
          <Cite n={3} />. Copiar un EPUB al Kindle por USB no funciona sin
          convertirlo antes; consulta{" "}
          <a href="#usb" className="text-primary hover:underline">
            usar un cable USB
          </a>
          .
        </p>
      </section>

      <section id="portada" className={body}>
        <h2 className={h2}>Antes de enviar: revisa la portada</h2>
        <p>
          Kindle muestra la imagen que el EPUB declara como portada, y muchos
          EPUB no declaran ninguna. Los fanfics descargados y los archivos
          creados con conversores sencillos son ejemplos habituales. Entre las
          personas que usaron nuestra herramienta del 7 al 14 de octubre de
          2026, 125 de 265 (47 %) subieron al menos un EPUB sin portada
          detectable. No es una cifra para todos los EPUB, porque mucha gente
          llega a nosotros precisamente porque le falta la portada, pero muestra
          lo a menudo que este problema afecta a los lectores.
        </p>
        <p>
          Para añadir o cambiar la portada, abre{" "}
          <Link href="/es" className="text-primary hover:underline">
            EpubCoverChanger.com
          </Link>
          , elige tu EPUB y la nueva imagen de portada, selecciona el tamaño{" "}
          <strong>Amazon Kindle KDP (1600 x 2560)</strong> y descarga el archivo
          actualizado. Todo funciona en tu navegador, así que tu libro nunca se
          sube a un servidor. Si la portada sigue sin aparecer después de
          enviarlo, consulta{" "}
          <Link href={localizedRoutes.changeCover.es} className="text-primary hover:underline">
            cómo arreglar la portada que no aparece en Kindle
          </Link>
          .
        </p>
      </section>

      <section id="web" className={body}>
        <h2 className={h2}>Enviar un EPUB a Kindle desde la web (lo más fácil)</h2>
        <ol className={steps}>
          <li>
            Abre la página Send to Kindle de tu tienda Amazon (amazon.es,
            amazon.com.mx, amazon.com…) y añade <strong>/sendtokindle</strong>{" "}
            al final. Inicia sesión con tu cuenta.
          </li>
          <li>Arrastra el EPUB a la zona de carga o haz clic para elegir el archivo.</li>
          <li>Elige tu biblioteca de Kindle o los dispositivos a los que quieres enviarlo.</li>
          <li>Haz clic en enviar. El libro aparece en tu biblioteca cuando Amazon termina de convertirlo.</li>
        </ol>
      </section>

      <section id="correo" className={body}>
        <h2 className={h2}>Enviar un EPUB a Kindle por correo</h2>
        <p>
          Según el idioma de tu cuenta, Amazon puede mostrar estos menús en
          inglés; por eso ponemos el nombre original entre paréntesis.
        </p>
        <ol className={steps}>
          <li>
            Busca tu dirección de correo de Send to Kindle en{" "}
            <strong>Gestionar contenido y dispositivos</strong> (Manage Your
            Content and Devices) &gt; <strong>Preferencias</strong>{" "}
            (Preferences) &gt;{" "}
            <strong>Configuración de documentos personales</strong> (Personal
            Document Settings)
            <Cite n={2} />.
          </li>
          <li>
            En esa misma página, añade la dirección desde la que vas a enviar a
            la <strong>lista de correos aprobados para documentos personales</strong>{" "}
            (Approved Personal Document Email List). Los correos de otras
            direcciones no se entregan
            <Cite n={2} />.
          </li>
          <li>
            Adjunta el EPUB y envíalo. No hace falta asunto. Puedes adjuntar
            hasta 25 archivos y 50 MB por correo; comprime los lotes más grandes
            en un .zip
            <Cite n={2} />.
          </li>
        </ol>
      </section>

      <section id="iphone" className={body}>
        <h2 className={h2}>Enviar un EPUB a Kindle desde iPhone</h2>
        <ol className={steps}>
          <li>Instala la app de Kindle e inicia sesión.</li>
          <li>
            Abre la app Archivos, mantén pulsado el EPUB, toca{" "}
            <strong>Compartir</strong> y elige <strong>Kindle</strong>. Si
            Kindle no aparece, toca <strong>Más</strong> y actívalo.
          </li>
          <li>
            Confirma el envío. El libro se añade a tu biblioteca de Kindle
            <Cite n={1} />.
          </li>
        </ol>
        <p>
          ¿Todavía no tiene portada? Abre epubcoverchanger.com/es en Safari,
          añade la portada, toca <strong>Guardar o abrir EPUB</strong> y
          comparte el nuevo archivo con Kindle desde ahí.
        </p>
      </section>

      <section id="android" className={body}>
        <h2 className={h2}>Enviar un EPUB a Kindle desde Android</h2>
        <ol className={steps}>
          <li>Instala la app de Kindle e inicia sesión.</li>
          <li>
            En la app Archivos o Descargas, abre el menú de compartir del EPUB y
            elige <strong>Kindle</strong>.
          </li>
          <li>
            Confirma el envío. Amazon incluye iOS y Android entre las formas de
            usar Send to Kindle
            <Cite n={1} />.
          </li>
        </ol>
      </section>

      <section id="usb" className={body}>
        <h2 className={h2}>Usar un cable USB</h2>
        <p>
          Los lectores Kindle no abren un EPUB copiado por USB. Si prefieres el
          cable, convierte antes el libro a AZW3, por ejemplo con el conversor
          gratuito de calibre
          <Cite n={5} />, y copia el archivo AZW3 a la carpeta documents del
          Kindle. Para la mayoría de la gente, Send to Kindle es más sencillo y
          además sincroniza el libro entre dispositivos.
        </p>
      </section>

      <section id="problemas" className={body}>
        <h2 className={h2}>Si el libro no llega</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>¿Lo enviaste por correo?</strong> Comprueba que la dirección
            de envío esté en tu lista aprobada. Amazon sigue intentando
            entregarlo durante un máximo de 60 días
            <Cite n={2} />.
          </li>
          <li>
            <strong>Revisa el tamaño</strong> con los límites de la tabla de
            arriba.
          </li>
          <li>
            <strong>El EPUB debe estar libre de DRM.</strong>{" "}Los libros
            comprados en tiendas con DRM no se pueden enviar así.
          </li>
          <li>
            <strong>¿Rechazado o con el texto desordenado?</strong> Consulta las
            causas y soluciones en nuestra{" "}
            <Link href={localizedRoutes.changeCover.es} className="text-primary hover:underline">
              guía de portadas y problemas de EPUB en Kindle
            </Link>
            .
          </li>
        </ul>
      </section>

      <section id="preguntas" className={body}>
        <h2 className={h2}>Preguntas frecuentes</h2>
        <h3 className="text-lg font-semibold text-gray-950">{faqs[0].question}</h3>
        <p>
          {faqs[0].answer}
          <Cite n={1} />
          <Cite n={3} />
        </p>
        <h3 className="text-lg font-semibold text-gray-950">{faqs[1].question}</h3>
        <p>
          {faqs[1].answer}
          <Cite n={1} />
          <Cite n={3} />
        </p>
        <h3 className="text-lg font-semibold text-gray-950">{faqs[2].question}</h3>
        <p>
          {faqs[2].answer}
          <Cite n={2} />
        </p>
        <h3 className="text-lg font-semibold text-gray-950">{faqs[3].question}</h3>
        <p>
          {faqs[3].answer} Consulta nuestra{" "}
          <Link href={localizedRoutes.coverSize.es} className="text-primary hover:underline">
            guía de tamaños de portada EPUB
          </Link>{" "}
          para otras tiendas.
        </p>
      </section>

      <div className="mt-12 rounded-3xl bg-gray-950 p-8 text-white">
        <h2 className="text-2xl font-semibold">Añade la portada antes de enviarlo</h2>
        <p className="mt-3 text-white/75">
          EpubCoverChanger.com añade o cambia la portada de tu EPUB en el
          navegador, en la computadora, iPhone o Android, y la marca para que
          Kindle la encuentre.
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
