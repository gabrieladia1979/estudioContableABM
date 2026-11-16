# ABM Estudio Contable

Sitio de presentación y contacto para ABM Estudio Contable, desarrollado con React, Vite y Tailwind CSS.

El agente de captación del proyecto está en `.agents/skills/abm-marketing`. Se invoca con `$abm-marketing`; la primera campaña y el estado de los canales están en [marketing/PRIMERA_CAMPANA.md](marketing/PRIMERA_CAMPANA.md). Para ejecutar las campañas de marketing, envíos de correos y novedades de forma 100% autónoma en la nube (sin tener la PC encendida), consultá la [Guía de Automatización en la Nube](docs/GUIA_AUTOMATIZACION_NUBE.md).

## Desarrollo local

```bash
npm ci
npm run dev
```

Para generar la versión de producción: `npm run build`. Para revisar el código: `npm run lint`.

## Automatización y Campañas en la Nube (Sin PC prendida)

- **Envío de correos por Google Sheets / Gmail:** [`outreach/google-apps-script-gmail.js`](outreach/google-apps-script-gmail.js) vinculado con [`outreach/contactos_para_gmail_sheets.csv`](outreach/contactos_para_gmail_sheets.csv).
- **Prospección por GitHub Actions:** [`.github/workflows/outreach-campaign.yml`](.github/workflows/outreach-campaign.yml).
- **Generación semanal de contenidos:** [`.github/workflows/marketing-content.yml`](.github/workflows/marketing-content.yml).
- **Sincronización diaria de noticias:** [`.github/workflows/news-sync.yml`](.github/workflows/news-sync.yml).

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
- Novedades y notas: `src/data/publishedNews.json`.

## Verificación previa

El comando `npm run build` confirma que los tipos, el marcado prerenderizado y las cabeceras de seguridad se generen sin advertencias.
