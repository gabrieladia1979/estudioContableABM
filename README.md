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
- El estudio: presentación del servicio y su enfoque de trabajo.
- Servicios: detalle de las áreas de atención y consultas por servicio.
- Crear sociedad: orientación inicial y alcance del acompañamiento.
- Recursos: información práctica para preparar una consulta.
- Contacto: formulario por correo con alternativas de WhatsApp y correo directo.

## Contenido que conviene revisar antes de publicar

- Teléfono, correo y textos de WhatsApp: `src/data/contact.js`.
- Horario, ubicación y enlaces sociales: `src/components/layout/Footer.jsx` y `src/components/sections/ContactSection.jsx`.
- Descripciones de servicios: `src/data/servicesData.jsx` para la portada y `src/data/serviceDetails.js` para la página de servicios.
- Títulos y descripciones de las páginas: `src/App.jsx`.

El formulario de contacto envía consultas por correo con EmailJS cuando están configuradas sus variables. Para activarlo, seguí la guía `EMAILJS_SETUP.md` y completá `.env.local` desde `.env.example`. Hasta entonces, la página ofrece WhatsApp y correo como alternativas.
