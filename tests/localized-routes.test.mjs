import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

import {
  counterpartPath,
  localizedAlternates,
  localizedRoutes,
} from "../src/lib/localized-routes.ts";

const locales = ["en", "pt", "es"];

function pageFile(path, locale) {
  if (path === "/") return "src/app/(en)/page.tsx";
  return locale === "en" ? `src/app/(en)${path}/page.tsx` : `src/app${path}/page.tsx`;
}

test("every translated route has a page file", async () => {
  for (const paths of Object.values(localizedRoutes)) {
    for (const locale of locales) {
      await access(pageFile(paths[locale], locale));
    }
  }
});

test("hreflang links are identical across a page's languages, with a self canonical", () => {
  for (const id of Object.keys(localizedRoutes)) {
    const english = localizedAlternates(id, "en");
    for (const locale of locales) {
      const alternates = localizedAlternates(id, locale);
      assert.deepEqual(alternates.languages, english.languages);
      const hreflang = locale === "pt" ? "pt-BR" : locale;
      assert.equal(alternates.canonical, alternates.languages[hreflang]);
    }
    assert.equal(english.languages["x-default"], english.languages.en);
  }
});

test("the language switcher keeps readers on the same article", () => {
  assert.equal(counterpartPath("/blog/send-epub-to-kindle", "pt"), "/pt/blog/enviar-epub-para-kindle");
  assert.equal(counterpartPath("/pt/blog/tamanho-capa-epub", "es"), "/es/blog/tamano-portada-epub");
  assert.equal(counterpartPath("/es/blog/cambiar-portada-epub-kindle/", "en"), "/blog/how-to-change-epub-cover");
  assert.equal(counterpartPath("/pt", "en"), "/");
  assert.equal(counterpartPath("/", "es"), "/es");
});

test("pages without a translation fall back to that language's home page", () => {
  assert.equal(counterpartPath("/pricing", "pt"), "/pt");
  assert.equal(counterpartPath(null, "es"), "/es");
});

test("the sitemap lists every translated route", async () => {
  const sitemap = await readFile("src/app/sitemap.ts", "utf8");
  for (const paths of Object.values(localizedRoutes)) {
    for (const locale of locales) {
      const path = paths[locale] === "/" ? "" : paths[locale];
      assert.ok(sitemap.includes(`path: "${path}"`), `${path} missing from sitemap`);
    }
  }
});
