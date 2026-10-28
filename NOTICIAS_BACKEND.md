# Portal y Automatización de Noticias de ABM Estudio Contable

El sistema cuenta con un motor integral de búsqueda, extracción, redacción y publicación de noticias contables, impositivas y económicas con foco en **Blog del Contador**, **ARCA (ex-AFIP)**, **Consejo Profesional CABA** y principales medios económicos.

---

## ⚡ Comandos Rápidos

* **`npm run news:auto`**: Ejecuta la automatización completa:
  1. Escanea las fuentes en tiempo real.
  2. Prioriza las novedades más relevantes (Blog del Contador, ARCA, Ganancias, Monotributo, etc.).
  3. Extrae la evidencia informativa.
  4. Redacta el artículo explicativo propio de ABM con IA (OpenAI, Gemini o motor editorial).
  5. Publica automáticamente las notas destacadas en el sitio web (`/novedades`).
* **`npm run news:scan`**: Solo escanea y guarda candidatos en la bandeja para revisión manual.
* **`npm test`**: Ejecuta la suite completa de pruebas unitarias y de seguridad.
* **`npm run build`**: Compila el sitio y genera las páginas prerenderizadas.

---

## 🤖 Inteligencia Artificial & Automatización

El sistema soporta múltiples opciones para la generación y síntesis de artículos:

1. **OpenAI (`OPENAI_API_KEY` y `NEWS_AI_MODEL=gpt-4o-mini`)**:
   Utiliza Responses estructurados con JSON Schema estricto.
2. **Google Gemini (`GEMINI_API_KEY`)**:
   Soporte nativo para Gemini 2.0 Flash con structured JSON.
3. **Motor Editorial Inteligente (Fallback asistido)**:
   Si no hay API key o si se supera la cuota temporal, el motor de síntesis genera artículos estructurados basados en los párrafos extraídos de Blog del Contador y ARCA, garantizando que el portal nunca quede desactualizado.

---

## 🌐 Fuentes y Priorización

`server/news-sources.mjs` y `server/news-discovery.mjs`:
- **Blog del Contador**: Artículos técnicos, novedades de ARCA, cambios laborales, Ganancias y actualidad económica general.
- **ARCA (ex-AFIP)**: Novedades directas del organismo tributario nacional.
- **Consejo Profesional CABA**: Resoluciones y eventos de la profesión contable.
- **El Cronista, Ámbito e iProfesional**: Descubrimiento y monitoreo de coyuntura.

Las reglas temáticas (`topicRules`) clasifican automáticamente los contenidos en:
* Monotributo
* Impuestos
* Contabilidad y Balances
* Sueldos y Laboral
* Sociedades
* Pymes
* Finanzas y Divisas
* Actualidad & Reformas

---

## 🚀 Despliegue en Netlify

Variables de entorno a configurar en Netlify (Settings > Environment variables):

```env
# Clave del editor para /editor-noticias
NEWS_ADMIN_TOKEN=clave_secreta_de_al_menos_32_caracteres

# Opciones de IA (una u otra)
OPENAI_API_KEY=sk-...
NEWS_AI_MODEL=gpt-4o-mini
# o bien:
GEMINI_API_KEY=...

# Activar el cron programado (09:00 y 21:00 hs de Buenos Aires)
NEWS_SCAN_ENABLED=true

# Activar la publicación 100% automática de notas destacadas
NEWS_AUTO_PUBLISH=true
```

---

## 🎨 Visualización Pública y Experiencia de Usuario

* **`/novedades`**: Portal rediseñado con buscador en tiempo real, filtro por categorías (con contador de notas), insignias cromáticas temáticas, fecha argentina, tiempo de lectura y fuente respaldatoria.
* **`/novedades/:id`**: Lectura completa de la nota con diseño editorial de alto nivel:
  * Breadcrumbs de navegación.
  * Título de alto impacto y autoría del estudio.
  * Bajada ejecutiva destacada.
  * Secciones numeradas con interlineado optimizado para lectura.
  * Botón para compartir enlace en 1 clic.
  * Tarjeta de conversión directa a consulta contable por WhatsApp.
  * Bloque de respaldo oficial y enlace directo a Blog del Contador / ARCA.
* **`/editor-noticias`**: Panel privado con botón de **«⚡ Auto-publicar novedades»** para ejecutar la automatización en cualquier momento desde el navegador.
