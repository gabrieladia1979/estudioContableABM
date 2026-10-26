# ABM Estudio Contable

Sitio de presentación y contacto para ABM Estudio Contable, desarrollado con React, Vite y Tailwind CSS.

## Desarrollo local

```bash
npm ci
npm run dev
```

Para generar la versión de producción: `npm run build`. Para revisar el código: `npm run lint`.

## Páginas

- Inicio: propuesta de valor, perfiles de clientes, servicios y forma de trabajo.
- Carrusel de portada: tres motivos de consulta con imágenes locales comprimidas en `public/hero/`; carga una imagen a la vez, permite pausar y respeta la preferencia de movimiento reducido.
- El estudio: presentación del servicio y su enfoque de trabajo.
- Servicios: detalle de las áreas de atención y consultas por servicio.
- Crear sociedad: orientación inicial y alcance del acompañamiento.
- Recursos: información práctica para preparar una consulta.
- Monotributo e intimaciones de ARCA: páginas de entrada para esas consultas.
- Contacto: formulario de consultas con Netlify Forms y alternativas de WhatsApp y correo directo.

## Contenido que conviene revisar antes de publicar

- Teléfono, correo y textos de WhatsApp: `src/data/contact.js`.
- Horario, ubicación y enlaces sociales: `src/components/layout/Footer.jsx` y `src/components/sections/ContactSection.jsx`.
- Descripciones de servicios: `src/data/serviceGroups.js` para las áreas de la portada y `src/data/serviceDetails.js` para la página de servicios.
- Títulos y descripciones de las páginas: `src/data/pageInfo.js`.

Para recibir consultas, activar la detección de formularios y las notificaciones por correo en Netlify siguiendo `NETLIFY_FORM_SETUP.md`. Las consultas quedan guardadas en el panel de Netlify aunque el aviso por correo todavía no esté configurado.

El build genera HTML propio para las ocho rutas en `dist/` y `public/_redirects` hace que Netlify lo sirva directamente. La vista previa de Vite requiere barra final para rutas internas (`/monotributo/`); en Netlify las rutas sin barra se sirven mediante las reglas de redirección.

## Medición

Cuando exista una propiedad GA4, copiar `.env.example` a `.env` en local o configurar `VITE_GA_MEASUREMENT_ID=G-...` en las variables de entorno de Netlify y desplegar otra vez. El sitio pedirá permiso antes de cargar el script de Analytics. Se miden vistas de páginas, clics a WhatsApp/correo/teléfono y envíos exitosos del formulario; nunca se envían nombre, correo, teléfono ni mensaje a GA4. Para Search Console, verificar el dominio desde la cuenta de Google y enviar `sitemap.xml`.

Ver `PLAN_CAPTACION_30_DIAS.md` para los pasos de difusión y seguimiento.
Ver `GESTION_ESTUDIO.md` para el flujo de consultas, el CRM inicial recomendado y los criterios para sumar un sistema de gestión contable.

## Noticias oficiales

La portada y `/novedades` muestran una selección editorial de ARCA y del Consejo Profesional CABA definida en `src/data/officialNews.js`. No es un feed automático. Para actualizarla, verificar cada publicación original, registrar su fecha y enlace, escribir un resumen breve y actualizar `newsReviewedAt`. Las guías del estudio se mantienen aparte de las noticias.

## Franja de cotizaciones

`/api/market` consulta las API públicas del BCRA (minorista vendedor promedio, mayorista de referencia, euro y real) y DolarAPI (blue, MEP, CCL y tarjeta). DolarAPI documenta a DolarHoy y Ámbito como fuentes. Cada registro conserva su fuente y su fecha de publicación; la fecha de consulta no reemplaza la fecha del dato. No se calculan compras ficticias para cotizaciones que solo tienen venta.

La función de Netlify está en `netlify/functions/market.mjs` y la lógica compartida en `server/market-data.mjs`. Vite sirve el mismo endpoint en desarrollo. El navegador consulta al abrir la página, al volver a la pestaña y cada minuto mientras está visible. La caché del servidor y la caché compartida de Netlify duran cinco minutos. Los precios cambian cuando las fuentes publican valores nuevos; no es una conexión de mercado segundo a segundo.

Si una fuente falla, se conserva en memoria su último dato durante un máximo de tres días, identificado como anterior y con su fecha original. Si no existe una cotización verificada, se muestra un enlace a DolarHoy o un mensaje de indisponibilidad, sin rellenar precios con ceros. Las consultas tienen un tiempo máximo de ocho segundos. No requiere claves de API. Pruebas de caché, errores y normalización: `node --test server/market-data.test.mjs`.
