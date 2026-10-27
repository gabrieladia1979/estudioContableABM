import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, readdir, rename, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

const etagOf = text => createHash('sha256').update(text).digest('hex');
export function createLocalNewsStore(directory = resolve('.news-cache')) {
  let queue = Promise.resolve();
  const pathFor = key => {
    if (!/^[a-z0-9/-]+$/.test(key) || key.includes('..')) throw new Error('Clave inválida');
    return join(directory, key + '.json');
  };
  const store = {
    async read(key) {
      try {
        const text = await readFile(pathFor(key), 'utf8');
        return { data: JSON.parse(text), etag: etagOf(text) };
      } catch (error) { if (error.code === 'ENOENT') return null; throw error; }
    },
    write(key, value, conditions = {}) {
      const operation = queue.then(async () => {
        const previous = await store.read(key);
        if ((conditions.onlyIfNew && previous) || (conditions.onlyIfMatch && previous?.etag !== conditions.onlyIfMatch)) return { modified: false };
        const path = pathFor(key);
        await mkdir(dirname(path), { recursive: true });
        const temporary = path + '.' + randomUUID() + '.tmp';
        await writeFile(temporary, JSON.stringify(value), { mode: 0o600 });
        await rename(temporary, path);
        return { modified: true };
      });
      queue = operation.catch(() => {});
      return operation;
    },
    async articles() {
      let files;
      try { files = await readdir(join(directory, 'articles')); }
      catch (error) { if (error.code === 'ENOENT') return []; throw error; }
      const rows = await Promise.all(files.filter(file => file.endsWith('.json')).map(file => store.read('articles/' + file.slice(0, -5))));
      return rows.filter(Boolean).map(row => row.data);
    },
  };
  return store;
}

export async function createNewsStore({ local = false } = {}) {
  if (local) return localStore;
  const { getStore } = await import('@netlify/blobs');
  const blobs = getStore({ name: 'abm-newsroom', consistency: 'strong' });
  return {
    read: key => blobs.getWithMetadata(key, { type: 'json' }),
    write: (key, data, conditions) => blobs.setJSON(key, data, conditions),
    async articles() {
      const { blobs: records } = await blobs.list({ prefix: 'articles/' });
      const rows = await Promise.all(records.map(record => blobs.get(record.key, { type: 'json' })));
      return rows.filter(Boolean);
    },
  };
}
const localStore = createLocalNewsStore();
