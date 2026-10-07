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
- Descripciones de servicios: `src/data/servicesData.jsx` para la portada y `src/data/serviceDetails.js` para la página de servicios.
- Títulos y descripciones de las páginas: `src/data/pageInfo.js`.

Para recibir consultas, activar la detección de formularios y las notificaciones por correo en Netlify siguiendo `NETLIFY_FORM_SETUP.md`. Las consultas quedan guardadas en el panel de Netlify aunque el aviso por correo todavía no esté configurado.

El build genera HTML propio para las ocho rutas en `dist/` y `public/_redirects` hace que Netlify lo sirva directamente. La vista previa de Vite requiere barra final para rutas internas (`/monotributo/`); en Netlify las rutas sin barra se sirven mediante las reglas de redirección.

## Medición

Cuando exista una propiedad GA4, copiar `.env.example` a `.env` en local o configurar `VITE_GA_MEASUREMENT_ID=G-...` en las variables de entorno de Netlify y desplegar otra vez. El sitio pedirá permiso antes de cargar el script de Analytics. Se miden vistas de páginas, clics a WhatsApp/correo/teléfono y envíos exitosos del formulario; nunca se envían nombre, correo, teléfono ni mensaje a GA4. Para Search Console, verificar el dominio desde la cuenta de Google y enviar `sitemap.xml`.

Ver `PLAN_CAPTACION_30_DIAS.md` para los pasos de difusión y seguimiento.
Ver `GESTION_ESTUDIO.md` para el flujo de consultas, el CRM inicial recomendado y los criterios para sumar un sistema de gestión contable.
