import { handleEditorSession } from '../../server/editor-security.mjs';
export default (request, context) => handleEditorSession(request, { clientIp: context?.ip });
export const config = { path: '/api/news/session', rateLimit: { windowLimit: 10, windowSize: 180, aggregateBy: ['ip', 'domain'] } };
