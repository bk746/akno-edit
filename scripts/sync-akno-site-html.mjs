#!/usr/bin/env node
/**
 * Regénère les exports HTML depuis le dossier local « akno-site 6 ».
 * Usage: node scripts/sync-akno-site-html.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const ref = join(root, "akno-site 6");

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
];

function extractBody(html) {
  const m = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (!m) throw new Error("body not found");
  return m[1].replace(/<script[\s\S]*?<\/script>/gi, "");
}

function patch(body) {
  return body
    .replace(/\bhref="assets\//g, 'href="/assets/')
    .replace(/\bsrc="assets\//g, 'src="/assets/')
    .replace(/\bdata-src="\/assets\//g, 'data-src="/assets/')
    .replace(/assets\//g, "/assets/")
    .replace(/\/\/assets\//g, "/assets/")
    .replace('href="site-web.html"', 'href="/site-web"')
    .replace('href="seo-performance.html"', 'href="/seo-performance"')
    .replace('href="index.html"', 'href="/"');
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
