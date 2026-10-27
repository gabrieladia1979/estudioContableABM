import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const hashes = new Set();
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await inspect(path);
    else if (entry.name.endsWith('.html')) {
      const html = await readFile(path, 'utf8');
      for (const [, attributes, content] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
        if (!/\bsrc\s*=/i.test(attributes) && content.trim()) hashes.add(`'sha256-${createHash('sha256').update(content).digest('base64')}'`);
      }
    }
  }
}
await inspect('dist');
const template = await readFile('public/_headers', 'utf8');
if (!template.includes('__INLINE_SCRIPT_HASHES__')) throw new Error('Falta el marcador de hashes de CSP');
await writeFile('dist/_headers', template.replaceAll('__INLINE_SCRIPT_HASHES__', [...hashes].join(' ')));
console.log('Cabeceras de seguridad generadas para producción.');
