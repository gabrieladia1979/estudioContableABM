# Sincronización de noticias

Las notas se guardan en Netlify Blobs (`abm-newsroom`) en producción y `.news-cache` en desarrollo.
Al iniciar el servidor se importan las publicaciones incluidas en `src/data/publishedNews.json` únicamente si no existen; se migran los registros planos antiguos sin borrar borradores, archivadas ni ediciones posteriores.

La función programada `news-scan` busca a las 09:00 y 21:00 de Buenos Aires. Está activada por defecto; `NEWS_SCAN_ENABLED=false` la desactiva. `NEWS_AUTO_PUBLISH=false` deja la búsqueda en modo candidatos; de lo contrario procesa hasta cuatro candidatos nuevos por ejecución.

La redacción requiere las claves del proveedor configuradas como variables de Functions en Netlify. Una síntesis de emergencia sin IA queda como borrador, nunca como publicación revisada. Las noticias sin fecha verificable no se publican automáticamente. El límite diario global lo controla `NEWS_AI_DAILY_LIMIT` (20 por defecto).

La búsqueda no regenera noticias publicadas, archivadas ni borradores editados. La fecha del último escaneo y sus fuentes quedan en `last-scan`; el resultado de la automatización queda en `last-auto`. El listado del sitio consulta las publicaciones guardadas cada cinco minutos.
