import { handleNewsRequest } from '../../server/news-service.mjs';
export default request => handleNewsRequest(request, { admin: true });
export const config = { path: '/api/news/admin', rateLimit: { windowLimit: 120, windowSize: 60, aggregateBy: ['ip', 'domain'] } };
