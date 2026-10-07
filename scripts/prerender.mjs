import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const outputDir = resolve('dist');
const serverDir = resolve('dist-ssr');
const template = await readFile(join(outputDir, 'index.html'), 'utf8');
const { render, pageInfo } = await import(pathToFileURL(join(serverDir, 'entry-server.js')).href);
const origin = 'https://estudiocontableabm.com.ar';

const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

for (const [pathname, [title, description]] of Object.entries(pageInfo)) {
  const url = `${origin}${pathname}`;
  let html = template.replace('<div id="root"></div>', `<div id="root">${render(pathname)}</div>`);
  if (html === template) throw new Error('No se encontró el contenedor de React en el HTML generado');
  html = html
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*("\s*\/?>)/, `$1${escapeHtml(description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*("\s*\/?>)/, `$1${escapeHtml(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*("\s*\/?>)/, `$1${escapeHtml(description)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*("\s*\/?>)/, `$1${escapeHtml(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*("\s*\/?>)/, `$1${escapeHtml(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/, `$1${escapeHtml(url)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*("\s*\/?>)/, `$1${escapeHtml(url)}$2`);

  const pageDir = pathname === '/' ? outputDir : join(outputDir, pathname.slice(1));
  await mkdir(pageDir, { recursive: true });
  await writeFile(join(pageDir, 'index.html'), html, 'utf8');
}

console.log(`Se generaron ${Object.keys(pageInfo).length} páginas HTML.`);
