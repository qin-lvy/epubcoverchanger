import type { Locale } from "@/lib/i18n";

const faqByLocale = {
  pt: [
    ["Como trocar a capa de um arquivo EPUB?", "Basta enviar seu arquivo EPUB e depois uma nova imagem de capa (JPG, PNG ou WebP). Você verá uma prévia do antes e depois e poderá baixar o EPUB atualizado com um clique. Todo o processo leva segundos e seus arquivos nunca saem do navegador."],
    ["Vocês enviam meus arquivos para um servidor?", "Não. Seus arquivos são processados inteiramente no navegador usando JavaScript. Eles nunca saem do seu dispositivo. Seus ebooks e imagens permanecem privados; nós não conseguimos vê-los."],
    ["Qual é o tamanho recomendado para uma capa EPUB?", "Não existe um único tamanho obrigatório em todas as plataformas. EPUB padrão, Apple Books e Google Play Books funcionam bem com a predefinição de 1600 x 2400 px; o tamanho ideal de ebook da Amazon KDP é 1600 x 2560 px; e a Kobo não define um tamanho obrigatório. A ferramenta identifica cada predefinição para você saber se é ideal oficial ou recomendada."],
    ["Posso mudar a capa de um EPUB protegido por DRM?", "Não. DRM (Gerenciamento de Direitos Digitais) é uma criptografia que impede a edição. Se o EPUB tiver DRM, normalmente vindo de grandes lojas, nenhuma ferramenta poderá modificá-lo. Arquivos sem DRM de autopublicação, AO3, Project Gutenberg e outras fontes funcionam normalmente."],
    ["É realmente grátis?", "Sim. O Epub Cover Changer é grátis para trocar a capa de um EPUB por vez. Você pode processar um EPUB de até 100 MB, sem marca-d'água e sem criar uma conta. Os futuros recursos Pro serão voltados para processamento em lote, predefinições salvas, exportações para várias plataformas e limites maiores."],
    ["Preciso criar uma conta?", "Não é preciso criar uma conta para usar a ferramenta gratuita atual. O login só fará sentido quando trouxer valor real, como predefinições salvas, acesso antecipado ao Pro, histórico opcional e fluxos repetidos mais rápidos."],
  ],
  es: [
    ["¿Cómo cambio la portada de un archivo EPUB?", "Solo tienes que subir tu archivo EPUB y después una nueva imagen de portada (JPG, PNG o WebP). Verás una vista previa del antes y el después y podrás descargar el EPUB actualizado con un clic. Todo el proceso tarda unos segundos y tus archivos nunca salen del navegador."],
    ["¿Suben mis archivos a un servidor?", "No. Tus archivos se procesan por completo en el navegador mediante JavaScript. Nunca salen de tu dispositivo. Tus ebooks e imágenes permanecen privados; no podemos verlos."],
    ["¿Cuál es el tamaño recomendado para una portada EPUB?", "No existe un único tamaño obligatorio para todas las plataformas. EPUB estándar, Apple Books y Google Play Books funcionan bien con el preajuste de 1600 x 2400 px; el tamaño ideal de ebook de Amazon KDP es 1600 x 2560 px; y Kobo no fija un tamaño obligatorio. La herramienta etiqueta cada preajuste para que sepas si es un ideal oficial o una recomendación."],
    ["¿Puedo cambiar la portada de un EPUB protegido con DRM?", "No. DRM (gestión de derechos digitales) es un cifrado que impide editar el archivo. Si tu EPUB está protegido con DRM, normalmente porque procede de una gran tienda, ninguna herramienta podrá modificarlo. Los archivos sin DRM de autopublicación, AO3, Project Gutenberg y otras fuentes funcionan perfectamente."],
    ["¿De verdad es gratis?", "Sí. Epub Cover Changer es gratis para cambiar la portada de un EPUB cada vez. Puedes procesar un EPUB de hasta 100 MB, sin marca de agua y sin crear una cuenta. Las futuras funciones Pro se centrarán en el procesamiento por lotes, los preajustes guardados, las exportaciones para varias plataformas y límites de uso más altos."],
    ["¿Necesito una cuenta?", "No necesitas una cuenta para usar la herramienta gratuita actual. El inicio de sesión solo tendrá sentido cuando aporte un valor real, como preajustes guardados, acceso anticipado a Pro, historial opcional y flujos repetidos más rápidos."],
  ],
} as const;

export function getServerFaqMessages(locale: Exclude<Locale, "en">) {
  return faqByLocale[locale].map(([question, answer]) => ({ question, answer }));
}
