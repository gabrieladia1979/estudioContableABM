import { createLocalNewsStore } from '../server/news-store.mjs';
import { addNewsExamples, scanNews } from '../server/news-service.mjs';
const store = createLocalNewsStore();
await addNewsExamples(store);
const scan = await scanNews(store);
console.log(JSON.stringify(scan, null, 2));
console.log('Bandeja local: http://localhost:5173/editor-noticias');
