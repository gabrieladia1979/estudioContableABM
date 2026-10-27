import { handleNewsRequest } from '../../server/news-service.mjs';
export default request => handleNewsRequest(request, { admin: true });
