# Noticias propias de ABM

La búsqueda y la redacción se ejecutan en el servidor. El navegador solo recibe las notas publicadas o, dentro del editor privado, los temas y borradores a revisar.

## Probar ahora

1. Ejecutar `npm run news:scan` para consultar las fuentes y cargar tres borradores editoriales de ejemplo.
2. Ejecutar `npm run dev` y abrir `http://localhost:5173/editor-noticias`.
3. Elegir una nota y vincular la publicación oficial que respalda el tema.
4. Editar el borrador o usar **Redactar con IA** si está configurada.
5. Guardar, comprobar el contenido y confirmar la revisión para publicar.

En desarrollo el editor funciona únicamente desde loopback (localhost, 127.0.0.1 o ::1), con comprobación del origen. Las notas se guardan en `.news-cache/`, excluido de Git y del servidor de archivos de Vite. Las publicaciones de esta vista son locales: no cambian la web en Internet.

Los tres ejemplos son textos preparados para esta implementación, no resultados de una llamada a la API de IA ni notas aprobadas por Alejandra.

## Fuentes y relevancia

`server/news-sources.mjs` define:

- ARCA: publicaciones oficiales y enlaces del bloque **Últimas novedades**. La publicación de arranque es una noticia conocida que enlaza ese bloque actualizado; no es un rastreo completo de su archivo.
- Consejo Profesional CABA: titulares disponibles en el listado público.
- Blog del Contador: títulos y enlaces disponibles en su portada. Su ruta /feed/ devolvió HTML en la prueba, por eso no se presupone un RSS.
- El Cronista, iProfesional y Ámbito: descubrimiento mediante búsquedas RSS de Google News limitadas a esos dominios y temas. El enlace puede abrir primero Google News.

No se descargan los artículos completos de los medios. Sus títulos sirven para detectar temas; para generar un borrador se exige un enlace de un organismo habilitado. Una fuente que no responde se muestra con error y no elimina lo guardado.

El filtrado reconoce términos de monotributo, impuestos, contabilidad, sueldos, sociedades y pymes; evita coincidencias parciales como “IVA” dentro de “privada”. Da más peso a organismos y fechas recientes, excluye noticias fechadas hace más de 45 días y algunos términos fiscales de otros países. Las fechas no disponibles se marcan **por verificar**; la fecha de búsqueda nunca se usa como fecha de la noticia.

La puntuación estima afinidad con los servicios de ABM. No mide popularidad, exactitud ni visitas probables. Se deduplican URL y titulares iguales; distintas notas sobre un mismo asunto todavía pueden necesitar agrupación editorial.

## IA opcional

Configurar en el servidor, sin prefijo VITE_:

- `OPENAI_API_KEY`: clave de una cuenta de API con acceso y facturación habilitados.
- `NEWS_AI_MODEL`: modelo de esa cuenta compatible con Responses y salidas estructuradas.

La búsqueda y la edición manual funcionan sin IA. Cada clic en **Redactar con IA** hace una solicitud; la búsqueda programada no realiza llamadas de IA. El contenido enviado incluye título, categoría y un extracto oficial limitado a 180 palabras, sin datos de clientes. La clave permanece en el servidor.

La IA devuelve un título propio, resumen, secciones, evaluación de relevancia y puntos para revisar. El servidor fija la fuente y mantiene el estado **borrador**. Las instrucciones incluidas en los artículos se tratan como datos no confiables y no se habilitan herramientas para el modelo.

La verificación técnica comprueba que el enlace pertenece a un organismo habilitado y permite extraer texto y fecha. No certifica que la noticia de un diario coincida con ese documento, que la norma siga vigente ni que el análisis sea correcto. Eso se comprueba en la revisión editorial.

## Activar en Netlify

1. Configurar `NEWS_ADMIN_TOKEN` con una clave aleatoria de al menos 32 caracteres, solo en el entorno de funciones. No escribirla en el repositorio ni compartirla por chat.
2. Configurar la clave y el modelo si se quiere redacción con IA.
3. Configurar `NEWS_SCAN_ENABLED=true` para habilitar las búsquedas programadas.
4. Desplegar los cambios. Netlify Blobs conserva las notas por sitio entre despliegues.
5. Abrir `/editor-noticias` e ingresar la clave privada. Se mantiene en memoria mientras la página está abierta.

La función programada consulta las fuentes a las 09:00 y 21:00 de Buenos Aires. Fuera de Netlify no se ejecuta sola: `npm run news:scan` es una búsqueda manual. La función queda inactiva mientras `NEWS_SCAN_ENABLED` no sea exactamente `true`. Las fuentes nuevas, la IA y las consultas pueden estar sujetas a límites o costos de sus proveedores y del alojamiento.

## Publicación y lectura

- `GET /api/news`: solo notas con estado publicado; no incluye extractos internos, notas de revisión, candidatos ni borradores.
- `GET/POST /api/news/admin`: requiere la clave privada en producción. Permite buscar, verificar fuente, redactar, editar, publicar, retirar y archivar.
- `/editor-noticias`: editor con noindex y sin enlace en la navegación pública.
- `/novedades` y el inicio: muestran las notas de ABM cuando hay publicaciones; conservan la selección oficial existente.
- `/novedades/:id`: lectura completa dentro de ABM con fuente, fecha y enlace al servicio relacionado.

El navegador comprueba las notas al abrir y volver a la pestaña, y cada cinco minutos mientras está visible. No consulta los medios directamente. La búsqueda de nuevas noticias es una tarea distinta que ocurre en el backend.

Las modificaciones usan versiones para evitar que una búsqueda o una edición simultánea sobrescriba otra. Publicar exige una fuente oficial con fecha y la confirmación expresa de revisión. **Retirar y volver a borrador** elimina la nota del listado público.

Las notas dinámicas se cargan desde la API al abrir la ruta; el prerender actual sigue generando las ocho páginas institucionales. Si las notas pasan a ser un canal importante de captación orgánica, conviene extender el prerender o agregar renderizado en servidor, sitemap y metadatos de artículo para las notas publicadas.

## Verificación

`npm run test:news` comprueba filtrado, fechas, fuentes caídas, URL y redirecciones permitidas, versiones concurrentes, separación entre borradores y publicaciones, y el contrato de la IA con una respuesta simulada. No llama a una API paga.

`npm run lint` y `npm run build` verifican la integración del sitio.

Documentación de referencia:

- https://developers.openai.com/api/docs/guides/structured-outputs
- https://docs.netlify.com/build/data-and-storage/netlify-blobs/
- https://docs.netlify.com/build/functions/scheduled-functions/
- https://siap.blogdelcontador.com.ar/terminos-y-condiciones/
