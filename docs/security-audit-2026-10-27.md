# Auditoría técnica de seguridad — 27/10/2026

> Actualización: se prepararon correcciones en el repositorio. Este documento conserva los hallazgos originales; consultar el [estado de correcciones](security-remediation-2026-10-27.md). Su aplicación en producción depende del despliegue y de las comprobaciones posteriores.

## Conclusión

El sitio tiene controles útiles, pero **no se puede afirmar que cumple todos los criterios de seguridad**. Se confirmaron faltantes de cabeceras en producción y dependencias de desarrollo con avisos conocidos. La administración usa una clave compartida y requiere controles operativos adicionales.

Esta revisión toma OWASP ASVS como referencia para controles seleccionados; no constituye una verificación completa de ASVS, certificación ni auditoría legal. No se detectó una vulnerabilidad crítica explotable durante las comprobaciones realizadas. Esto no prueba su ausencia.

## Alcance y método

- Código de React, funciones de Netlify, almacenamiento y descubrimiento de noticias, autenticación del editor, analítica y configuración de despliegue.
- `npm audit --json`, `npm audit --omit=dev --json` y versiones instaladas.
- 16 pruebas existentes de noticias y cotizaciones: todas aprobadas.
- Solicitudes GET de bajo impacto al dominio publicado, redirección HTTP y respuestas del administrador sin credenciales. No se enviaron mensajes, publicaciones ni solicitudes administrativas autenticadas; tampoco se realizaron pruebas de carga o fuerza bruta.
- Búsqueda por patrones comunes de claves en los archivos actuales, excluyendo variables locales y directorios generados. Solo `.env.example` está seguido por Git. No se encontraron coincidencias de claves comunes en el alcance revisado. No se hizo un análisis forense completo del historial de Git.
- La copia publicada puede diferir del repositorio. Las comprobaciones HTTP describen lo servido durante esta revisión.

## Hallazgos y prioridades

### SEC-01 — Dependencias de desarrollo con vulnerabilidades conocidas

**Prioridad: alta para el entorno de desarrollo y compilación.** La exposición del sitio público no se deduce de este resultado.

El análisis completo informó 16 paquetes afectados: 11 con severidad alta, 4 moderada y 1 baja; ninguno crítico. El análisis limitado a dependencias de producción informó **0 avisos conocidos**.

Versiones relevantes instaladas: Vite 7.3.0 y PostCSS 8.5.6. Entre los avisos de Vite hay lectura de archivos y evasión de `server.fs.deny`. Configurar exclusiones en `vite.config.js` no sustituye actualizar una versión vulnerable. Otros avisos afectan herramientas como Rollup, Browserslist y sus dependencias.

Evidencia: `package.json:34`, `package.json:36`, `package-lock.json`, salida de npm audit. npm indica correcciones disponibles para los 16 paquetes, lo que debe comprobarse actualizando el árbol y repitiendo las pruebas; no implica que todos los avisos sean explotables en esta aplicación.

Acción: actualizar a versiones corregidas compatibles, revisar el diff del lockfile y ejecutar pruebas, lint y compilación. Mantener el servidor de desarrollo fuera de interfaces públicas. Incorporar revisión automática de dependencias en el repositorio.

### SEC-02 — Faltan cabeceras globales de protección en producción

**Prioridad: media. Confirmado por HTTP y por la configuración del repositorio.**

Las respuestas HTML de `/` y `/contacto` no incluyen Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy ni Permissions-Policy. `public/_headers` solo contiene reglas de caché e indexación para el editor.

La ausencia de CSP y de protección contra marcos deja sin esas defensas adicionales a las páginas, incluido el editor. Esto no demuestra por sí solo una inyección XSS, pero reduce la contención si apareciera una y permite el encuadre por terceros cuando no hay otra política aplicable.

Acción: configurar `frame-ancestors 'none'` mediante CSP y X-Frame-Options DENY; agregar `nosniff`, una política de referentes explícita y restricciones a capacidades que el sitio no usa. Preparar una CSP que contemple fuentes, estilos, imágenes y analítica reales; verificarla antes de imponerla para no romper el sitio. Las funciones deben establecer sus propias cabeceras cuando corresponda.

### SEC-03 — Autenticación administrativa básica y controles operativos sin verificar

**Prioridad: media como mejora de protección; no se comprobó un bypass.**

`server/news-service.mjs:27` valida una clave Bearer compartida, exige al menos 32 caracteres y compara con `timingSafeEqual`. Sin clave, tanto `/api/news/admin` como `/.netlify/functions/news-admin` respondieron 401.

El código no implementa cuentas individuales, segundo factor, expiración automática de credenciales ni límites de intentos de autenticación. Tampoco registra una auditoría estructurada de quién publicó o modificó cada nota. El límite de 15 minutos se aplica a la búsqueda de noticias, no a la autenticación ni a un presupuesto global para IA.

No se pudo inspeccionar si Netlify agrega controles externos, ni comprobar la aleatoriedad y rotación de NEWS_ADMIN_TOKEN. Una clave larga puede ser fuerte si se genera aleatoriamente; la longitud por sí sola no lo garantiza.

Acción: verificar token aleatorio y rotación, MFA en GitHub y Netlify, permisos mínimos, límites persistentes a solicitudes y operaciones costosas. Para varios editores, incorporar identidad individual y un registro de acciones. Configurar límites de gasto y alertas del servicio de IA.

### SEC-04 — El límite del cuerpo administrativo se comprueba después de leerlo

**Prioridad: baja. Requiere autenticación y está condicionado por los límites de Netlify.**

En `server/news-service.mjs:55` se ejecuta `request.text()` antes de rechazar cuerpos mayores a 30.000 caracteres. Por lo tanto, el límite de aplicación no evita su lectura completa ni mide bytes. No se realizó una prueba de agotamiento de recursos.

Acción: aplicar un límite durante la lectura del stream, validar Content-Type y tratar Content-Length solo como una comprobación preliminar. Mantener la autorización antes de procesar el cuerpo.

## Controles con resultado favorable

| Control | Evidencia y alcance |
| --- | --- |
| HTTPS | HTTP redirige con 301 a HTTPS; las respuestas comprobadas incluyen HSTS con max-age de 31536000. |
| Acceso al editor | Los dos endpoints comprobados responden 401 sin credenciales. Los tests cubren rechazo de origen ajeno y clave insuficiente. |
| Borradores privados | El DTO público selecciona artículos publicados y no devuelve evidencia editorial interna; pruebas aprobadas. |
| Protección al obtener noticias | Lista de hosts HTTPS permitidos, validación de redirecciones, timeout y límite de respuesta; los tests rechazan redirecciones a localhost. |
| Renderizado de noticias | React presenta texto y no se encontró uso de `dangerouslySetInnerHTML` o `eval` en el código revisado. No se hizo una prueba exhaustiva de XSS. |
| Secretos | Variables privadas usadas en servidor, exclusiones de Git y publicación de `dist`. No se encontraron claves con los patrones usados. |
| Rutas de archivos sensibles | `/.env` y `/.git/config` devuelven el HTML de la aplicación, no los archivos solicitados. El estado 200 corresponde al fallback SPA. |
| Almacenamiento del token del editor | Se conserva en estado de React, sin persistencia del token en localStorage o sessionStorage. |
| Contacto | Prepara un mensaje en WhatsApp; el sitio no registra el formulario en una base de datos propia. El visitante confirma el envío allí. |
| Analítica | El código carga Google Analytics solo después de aceptación. No se evaluó cumplimiento legal de privacidad. |
| Publicación de noticias | Exige fuente verificada, validación de contenido, revisión humana y control de versiones concurrentes. |
| Dependencias de producción | npm audit --omit=dev: 0 avisos conocidos al momento de la revisión. |

## Comprobaciones externas pendientes

- MFA, roles y miembros de Netlify, GitHub y el proveedor de IA.
- Variables de producción, rotación de secretos y permisos efectivos.
- Reglas del firewall, límites de solicitudes y alertas de consumo.
- Copias de seguridad de Netlify Blobs y prueba de restauración.
- Registro y alertas de acciones administrativas e incidentes.
- Inventario y mantenimiento de dependencias en CI.
- Revisión legal de privacidad, retención y tratamiento de datos; no se certifica en esta auditoría técnica.

## Orden recomendado

1. Corregir dependencias del entorno de desarrollo y compilación.
2. Incorporar y probar cabeceras globales y de funciones, incluida CSP.
3. Verificar seguridad de las cuentas de publicación y endurecer el acceso administrativo.
4. Mejorar límites de cuerpo y automatizar controles de seguridad.
5. Repetir las comprobaciones en producción tras desplegar y cerrar los pendientes de infraestructura.

## Referencias

- [OWASP ASVS 5.0](https://asvs.owasp.org/)
- [OWASP: HTTP Security Headers](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)
- [OWASP: Clickjacking Defense](https://cheatsheetseries.owasp.org/cheatsheets/Clickjacking_Defense_Cheat_Sheet.html)
- [Aviso de Vite: evasión de server.fs.deny](https://github.com/advisories/GHSA-v2wj-q39q-566r)
- [Aviso de Vite: lectura de archivos mediante WebSocket](https://github.com/advisories/GHSA-p9ff-h696-f583)
- [Netlify: funciones programadas y ausencia de invocación directa por URL](https://docs.netlify.com/build/functions/scheduled-functions/)

La auditoría original fue de lectura. Las correcciones posteriores y sus límites están documentados en el informe de remediación enlazado al principio.
