import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getSeoForPath, SEO_ROUTES, SITE_URL } from "../src/data/seo.js";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(projectRoot, "dist");
const baseHtml = await readFile(join(distDir, "index.html"), "utf8");

for (const route of SEO_ROUTES) {
  const seo = getSeoForPath(route);
  const html = applySeo(baseHtml, seo);
  const outputPath =
    route === "/"
      ? join(distDir, "index.html")
      : join(distDir, route.slice(1), "index.html");

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...SEO_ROUTES.map((route) => {
    const url = `${SITE_URL}${route === "/" ? "/" : route}`;
    return `  <url><loc>${escapeXml(url)}</loc></url>`;
  }),
  "</urlset>",
  "",
].join("\n");

await writeFile(join(distDir, "sitemap.xml"), sitemap, "utf8");

function applySeo(html, seo) {
  let result = html.replace(/<html\s+lang="[^"]*"/i, '<html lang="zh-CN"');
  result = result.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);
  result = replaceMeta(result, "name", "description", seo.description);
  result = replaceMeta(result, "name", "robots", "index, follow");
  result = replaceMeta(result, "property", "og:locale", "zh_CN");
  result = replaceMeta(result, "property", "og:site_name", seo.siteName);
  result = replaceMeta(result, "property", "og:type", seo.type);
  result = replaceMeta(result, "property", "og:title", seo.title);
  result = replaceMeta(result, "property", "og:description", seo.description);
  result = replaceMeta(result, "property", "og:url", seo.canonical);
  result = replaceMeta(result, "property", "og:image", seo.imageUrl);
  result = replaceMeta(result, "property", "og:image:alt", seo.imageAlt);
  result = replaceMeta(result, "name", "twitter:card", "summary_large_image");
  result = replaceMeta(result, "name", "twitter:title", seo.title);
  result = replaceMeta(result, "name", "twitter:description", seo.description);
  result = replaceMeta(result, "name", "twitter:image", seo.imageUrl);
  return result.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`,
  );
}

function replaceMeta(html, attribute, key, content) {
  const pattern = new RegExp(
    `<meta\\s+${attribute}="${escapeRegExp(key)}"\\s+content="[^"]*"\\s*\\/?>`,
    "i",
  );
  return html.replace(
    pattern,
    `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`,
  );
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeXml(value) {
  return escapeHtml(value).replaceAll("'", "&apos;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
