#!/usr/bin/env node
/**
 * Extrait les blocs <style> de akno-site 11/index.html → app/akno.css
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const html = readFileSync(join(root, "akno-site 11", "index.html"), "utf8");
const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(
  (m) => m[1],
);
if (!styles.length) throw new Error("No <style> blocks found");
let css = styles.join("\n\n");
css = css.replace(/\burl\(assets\//g, "url(/assets/");
css = css.replace(/@font-face\{font-family:Mona;src:url\(assets\//g, "@font-face{font-family:Mona;src:url(/assets/");
writeFileSync(join(root, "app/akno.css"), css);
console.log("app/akno.css", css.length);
