# Auditoría de ABM Estudio Contable — 7 de octubre de 2026

Sitio revisado: https://estudiocontableabm.com.ar/  
Alcance: web pública, código de este repositorio, prueba móvil puntual con Lighthouse y referencias externas. No hubo acceso a Netlify, Search Console, Analytics ni estadísticas de Instagram; por eso no es posible atribuir la falta de clientes a un canal ni confirmar conversiones.

## Diagnóstico ejecutivo

La prioridad es hacer que todas las páginas puedan abrirse desde un enlace externo y que las consultas queden registradas. Después conviene dar a cada público una entrada concreta: hoy la portada enumera muchos servicios, pero no responde en profundidad consultas con intención clara, como monotributo o un requerimiento de ARCA. Un asistente puede servir más adelante para clasificar contactos; no reemplaza distribución, posicionamiento ni una oferta fácil de entender.

## Hallazgos comprobados

| Prioridad | Hallazgo | Evidencia | Acción |
| --- | --- | --- | --- |
| Alta | Las cinco rutas internas devuelven 404 al entrar directamente. | Se comprobaron `/estudio`, `/servicios`, `/crear-sociedad`, `/novedades` y `/contacto` el 7/10/2026. La portada devuelve 200 y el servidor responde como Netlify. | Agregar la reescritura SPA y verificar cada URL después del deploy. Implementado en `public/_redirects`, pendiente de publicar. |
| Alta | El formulario anterior dependía de tres variables de EmailJS y quedaba desactivado sin ellas. | `src/components/sections/ContactForm.jsx` en la versión publicada del proyecto. | Preparado el reemplazo con Netlify Forms, campos útiles para clasificar la consulta y respaldo de WhatsApp/correo. Falta activar Forms, notificaciones y hacer un envío real en Netlify. |
| Alta | No hay medición de captación en el código. | No se encontró configuración de Analytics, Search Console ni eventos de conversión. Una integración externa en Netlify no se pudo descartar. | Configurar Search Console y medir visitas, clics a WhatsApp, formularios, reuniones y clientes. |
| Media | El contenido es amplio, con pocas páginas enfocadas en problemas específicos. | Portada con seis áreas; `/servicios` agrupa seis temas en una URL; `/novedades` contiene dos tarjetas generales. | Priorizar dos páginas por necesidad real, por ejemplo monotributo e intimaciones de ARCA, con alcance, proceso, preguntas frecuentes y CTA. Los textos técnicos deben aprobarlos profesionales de ABM. |
| Media | La sección “El estudio” tiene afirmaciones genéricas y poca identificación profesional visible. | `src/components/sections/AboutSection.jsx`. | Incorporar personas reales, credenciales verificadas, matrícula si corresponde, modalidad de atención y ejemplos de trabajo autorizados. Evitar testimonios inventados. |
| Media | La portada carga un PNG de unos 6 MB y el carrusel incluye todas las imágenes en el DOM. | `public/icons/image2.png` pesa aproximadamente 6 MB. Lighthouse móvil estimó 5.1 s de LCP y unos 5 MB de ahorro posible al servir imágenes del tamaño adecuado. | Redimensionar/comprimir imágenes y considerar una portada fija centrada en una oferta principal. Medir de nuevo tras el cambio. |
| Media | Hay contrastes insuficientes. | Lighthouse marcó texto naranja sobre fondo claro, numeración de pasos muy clara y texto blanco sobre botón naranja. | Oscurecer los colores usados para texto y botones; verificar contraste en móvil y escritorio. |
| Media | Las páginas comparten inicialmente el mismo HTML vacío; títulos y descripciones cambian con JavaScript. | `index.html` y `src/App.jsx`. Google puede renderizar JavaScript, pero el contenido y metadatos dependen de esa fase. | Para páginas de captación, evaluar prerenderizado o HTML por ruta; probar la URL inspeccionada en Search Console. |
| Baja | No existían `robots.txt` ni `sitemap.xml`. | Ambas URL devolvían 404 el 7/10/2026. | Archivos agregados en `public/`; pendiente publicar y registrar el sitemap en Search Console. |
| Técnica | `npm audit` detectó avisos en herramientas de desarrollo. | Con el archivo de dependencias que compila, hay 21 avisos (16 altos, 4 moderados, 1 bajo); `npm audit --omit=dev` devuelve cero. Un `npm audit fix` redujo el número, pero la compilación quedó detenida y se revirtió. | Tratar la actualización de Vite/Tailwind y otras herramientas por separado, con compilación y revisión visual después de cada cambio. |

La corrida de Lighthouse fue una simulación móvil puntual del sitio público y no representa datos reales de usuarios. FCP: 3.1 s; LCP: 5.1 s; CLS: 0.003; TBT: 0 ms. La API pública de PageSpeed respondió 429, por lo que no se obtuvo una medición independiente adicional.

## Cambios preparados después de la auditoría

El repositorio ahora incluye las ocho páginas prerenderizadas, reglas de rutas para Netlify, sitemap y robots, un formulario corto con clasificación de consultas y las páginas de monotributo e intimaciones. La portada dejó de usar el carrusel y el PNG de 6 MB. La presentación identifica a Alejandra Myta como titular sin atribuirle credenciales aún no verificadas. Se preparó GA4 con permiso de medición, pero todavía no hay propiedad ni ID; tampoco se pudo activar Search Console desde este repositorio. El plan de difusión está en `PLAN_CAPTACION_30_DIAS.md`. Los cambios requieren publicar y comprobar el formulario real en el panel de Netlify antes de considerarlos operativos.

Después del despliegue, las ocho rutas, `robots.txt` y `sitemap.xml` respondieron 200 en el dominio público. El POST de prueba con datos ficticios respondió 404: la recepción con Netlify Forms queda pendiente de activar en la cuenta.

## Comparación con ejemplos actuales

- [Bertora Brown, página de monotributo](https://estudiobertorabrown.com.ar/monotributo): una página para una intención específica, con perfiles de cliente, alcance del servicio, preguntas frecuentes y una consulta clara. Para ABM tomaría la estructura, no sus promesas ni contenido técnico.
- [Mi Contadora](https://micontadora.ar/): muestra un siguiente paso concreto para quien quiere conversar. ABM debería definir si ofrece una llamada inicial, cuánto dura y cuándo responde antes de prometerlo en la web.
- [Contadores Argentinos, agenda ARCA](https://www.contadoresargentinos.com.ar/mi-agenda): ejemplo de interacción útil que resuelve una duda específica. Un recurso así exige mantenimiento y verificación de datos; para ABM comenzaría con guías simples o un selector de motivos de consulta.
- [AidaForm, cuestionario de captación contable](https://aidaform.com/templates/bookkeeping-client-intake-form.html): demuestra preguntas condicionales. Para primer contacto de ABM conviene un formulario corto; la recolección extensa corresponde a una segunda etapa.
- [Plantilla de servicios profesionales en GitHub](https://github.com/FinalTouch-Web/ft-template-professional-services): contiene páginas individuales de servicios, equipo y casos. Es referencia de arquitectura y contenido; reemplazar todo el proyecto por esta plantilla implicaría migrar de Vite a Next.js y no resuelve por sí solo la captación.
- [Repositorio oficial de Netlify con guía de Forms](https://github.com/netlify/context-and-tools/blob/main/codex/skills/netlify-forms/SKILL.md): referencia técnica para el formulario React con HTML estático de detección.

## Recomendación de producto y captación

1. **Ahora:** publicar la reparación de rutas y el formulario, activar las notificaciones y confirmar una consulta real en el panel y en el correo.
2. **Semana siguiente:** configurar Search Console y una medición básica de consultas. Elegir dos servicios prioritarios según margen, capacidad del equipo y frecuencia de consultas.
3. **Contenido:** crear dos páginas centradas en problemas concretos. Cada una debe responder qué casos atiende ABM, qué pasa después de escribir, qué información inicial necesita y cómo consultar. Hacer que las publicaciones de Instagram apunten a esas páginas.
4. **Confianza:** sustituir frases genéricas e imágenes de stock donde sea posible por presentación real del equipo y su forma de trabajo, siempre con datos aprobados.
5. **Iteración:** tras 30 días, revisar impresiones, clics, consultas calificadas, reuniones y clientes. Si llegan visitas pero no consultas, mejorar la oferta y el contacto; si no llegan visitas, trabajar distribución y búsqueda local antes de agregar un chatbot.

## Fuentes técnicas

- [Netlify: formularios React](https://docs.netlify.com/manage/forms/setup/#work-with-javascript-rendered-forms), [notificaciones](https://docs.netlify.com/manage/forms/notifications/), [reescritura SPA](https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/#history-pushstate-and-single-page-apps), [facturación de Forms](https://docs.netlify.com/manage/forms/usage-and-billing/).
- [Google: JavaScript y SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [Search Console y Analytics](https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console).
