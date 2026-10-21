#!/usr/bin/env node
/**
 * Regénère les exports HTML depuis le dossier local « akno-site 11 ».
 * Usage: node scripts/sync-akno-site-html.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const ref = join(root, "akno-site 11");

const jobs = [
  { src: "index.html", out: "akno-home-html.ts", exportName: "AKNO_HOME_HTML" },
  {
    src: "site-web.html",
    out: "akno-site-web-html.ts",
    exportName: "AKNO_SITE_WEB_HTML",
  },
  {
    src: "seo-performance.html",
    out: "akno-site-seo-html.ts",
    exportName: "AKNO_SEO_PERF_HTML",
  },
  {
    src: "geo.html",
    out: "akno-geo-html.ts",
    exportName: "AKNO_GEO_HTML",
  },
];

function extractBody(html) {
  const m = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (!m) throw new Error("body not found");
  return m[1].replace(/<script[\s\S]*?<\/script>/gi, "");
}

function patch(body) {
  return servicesHeaderLeft(
    stripSectionNumbers(
      body
        .replace(/\bhref="assets\//g, 'href="/assets/')
        .replace(/\bsrc="assets\//g, 'src="/assets/')
        .replace(/\bdata-src="\/assets\//g, 'data-src="/assets/')
        .replace(/assets\//g, "/assets/")
        .replace(/\/\/assets\//g, "/assets/")
        .replaceAll('href="site-web.html"', 'href="/site-web"')
        .replaceAll('href="seo-performance.html"', 'href="/seo-performance"')
        .replaceAll('href="geo.html"', 'href="/geo"')
        .replaceAll('href="index.html"', 'href="/"')
        .replaceAll('href="index.html#', 'href="/#'),
    ),
  );
}

/** Retire 01/02… des libellés de section (.eb, menu mobile). Garde .m1n en Méthode. */
function stripSectionNumbers(body) {
  return body
    .replace(/<p class="eb"><b>\d+<\/b>\s*/g, '<p class="eb">')
    .replace(/<\/span><small>\d+<\/small><\/a>/g, "</span></a>")
    .replace(/<span class="n">\d+<\/span>/g, "")
    .replace(
      /<input aria-hidden="true" autocomplete="off" class="sr" name="_gotcha" tabindex="-1" type="text"\/>/g,
      '<input autocomplete="off" class="hidden" name="botcheck" tabindex="-1" type="checkbox"/>',
    );
}

/** Accueil v11 : titre Services à gauche, sans eyebrow « Services ». */
function servicesHeaderLeft(body) {
  return body.replace(
    /<div class="h11"><p class="eb">Services<\/p>/g,
    '<div class="h11 h11-left">',
  );
}

function toTs(exportName, body) {
  const esc = body
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
  return `export const ${exportName} = \`${esc}\`;\n`;
}

for (const { src, out, exportName } of jobs) {
  const html = readFileSync(join(ref, src), "utf8");
  const body = patch(extractBody(html));
  writeFileSync(join(root, "components/akno", out), toTs(exportName, body));
  console.log(out, body.length);
}
