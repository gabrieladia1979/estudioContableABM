# Guía de Automatización en la Nube · ABM Estudio Contable
## Cómo ejecutar los agentes y campañas de marketing sin tener la PC encendida

> **Actualización 21/11/2026:** Las instrucciones de envío de correos que siguen son históricas y ya no corresponden al código actual. El script de Apps Script solo crea hasta 10 borradores de filas marcadas `APROBADO_BORRADOR`; el workflow de outreach solo admite vista previa manual. Para detener el script ya instalado en Google, eliminá sus activadores en [Mis activadores](https://script.google.com/home/triggers). Cambiar este repositorio no modifica automáticamente una copia instalada en Apps Script ni lo publicado en GitHub.

**Uso actual del CSV:** importá sus nueve columnas sin modificar los títulos. El script agrega `Estado`, `Fecha` y `Draft_ID`. Revisá cada destinatario y texto y escribí `APROBADO_BORRADOR` únicamente en las filas que quieras convertir en borradores. `BORRADOR_CREADO` guarda el ID de Gmail; `ERROR_VALIDACION` señala datos incompletos y `REVISAR_BORRADOR` requiere comprobar Gmail antes de cualquier reintento. Ninguno de estos estados autoriza un envío.

Esta guía explica cómo quedaron configurados y mejorados los agentes de captación, prospección por email y generación de contenidos de **ABM Estudio Contable** para operar de forma 100% autónoma en la nube, sin depender de que tu computadora personal esté encendida.

---

## 1. Diagnóstico de lo que había creado ChatGPT

En la auditoría del proyecto detectamos tres sistemas:

1. **Agente de Marketing en prompts/skills (`.agents/skills/abm-marketing`)**:
   - Orientado a los 3 públicos del estudio: Monotributistas, PyMEs y Nuevas Sociedades.
   - *Limitación:* Era una instrucción de chat local (para Codex / Antigravity). Solo se ejecutaba si abrías la terminal en esta PC y escribías `$abm-marketing`.

2. **Motor de Prospección Local por Email (`scripts/outreach-*.mjs` y `outreach/prospects.json`)**:
   - Genera correos personalizados para 56 comercios e industrias de Parque Patricios, Boedo, Barracas y Pompeya.
   - *Limitación:* El envío (`npm run outreach:send`) requería ejecutar Node.js en esta PC. Al apagar la PC, no se enviaba nada.

3. **Sincronizador de Noticias (`scripts/news-auto.mjs`)**:
   - Ya contaba con un workflow en GitHub Actions (`.github/workflows/news-sync.yml`), el cual sí corre en la nube dos veces al día.

---

## 2. Las Mejoras Implementadas

Hemos transformado los componentes locales en **sistemas autónomos en la nube** mediante dos vías complementarias:

### Vía A: Google Apps Script + Google Sheets (La más simple y segura para Gmail)
Permite que **Google ejecute los envíos desde sus propios servidores** en un horario fijo o a demanda, usando la bandeja de Gmail oficial de Alejandra Mayta.

**Pasos para activarlo en 3 minutos:**
1. Entrá a [Google Drive](https://drive.google.com) y creá una nueva **Hoja de cálculo de Google (Google Sheets)**.
2. Hacé clic en **Archivo > Importar > Subir** y elegí el archivo generado:
   `outreach/contactos_para_gmail_sheets.csv`
3. En el menú superior de la hoja, andá a **Extensiones > Apps Script**.
4. Borrá cualquier código que aparezca y pegá el contenido de:
   [`outreach/google-apps-script-gmail.js`](../outreach/google-apps-script-gmail.js).
5. Guardá con `Ctrl + S`.
6. Recargá la hoja de cálculo. Vas a ver un nuevo menú arriba llamado: **📮 ABM Marketing**.
7. Hacé clic en:
   - **👁️ Crear borradores en Gmail**: Si querés que primero queden en tu bandeja de borradores para revisarlos antes de enviar.
   - **⏰ Activar envío automático diario (Sin PC prendida)**: Activa el reloj en la nube de Google. Enviará 10 correos por día de forma controlada a las 10:00 AM, marcando en la columna de la hoja cuáles ya fueron enviados.
   - **⏹️ Pausar / Desactivar envío automático**: Para pausarlo en cualquier momento.

> **¿Por qué funciona con la PC apagada?**  
> Porque el script vive en los servidores de Google Cloud, no en tu computadora. Podés apagar tu máquina, irte de viaje o cerrar todo, y Google ejecutará la tanda en su horario.

---

### Vía B: GitHub Actions (Automatización en los servidores de GitHub)
Creamos dos nuevos workflows automáticos gratuitos en GitHub Actions:

1. **`.github/workflows/outreach-campaign.yml` (Envío de prospección programado)**:
   - **Cuándo corre:** De lunes a viernes a las 10:00 AM hora argentina (13:00 UTC).
   - **O a demanda:** Podés entrar desde tu celular o cualquier navegador a GitHub > pestaña **Actions** > **Campaña de Outreach y Prospección Local** > **Run workflow** y elegir cuántos correos enviar (por ejemplo, 5 correos con 15 segundos de pausa).
   - **Persistencia:** Al terminar la tanda, el bot de GitHub actualiza `outreach/prospects.json` y `outreach/campaign-log.json`, guardando el registro de los que ya recibieron el correo para no repetir nunca a la misma empresa.

2. **`.github/workflows/news-sync.yml` + `npm run instagram:auto` (Noticias + Kits de Instagram diarios)**:
   - **Cuándo corre:** Todos los días a las **08:30 y 18:30 hs** hora argentina (o manualmente desde GitHub Actions).
   - **Qué hace:** Escanea y publica las noticias nuevas en `src/data/publishedNews.json` y, acto seguido, convierte automáticamente las novedades reales en **carruseles de 5 placas para Instagram, epígrafe limpio, historia con enlace UTM, texto alternativo y respuesta rápida DM**.
   - **Dónde copiarlos fácil:**
     - En GitHub (PC o celular): abriendo [`marketing/instagram/PARA_COPIAR.md`](../marketing/instagram/PARA_COPIAR.md), donde cada bloque tiene botón nativo de copiar.
     - En la web privada del estudio (`/editor-noticias`): en la pestaña **📸 Instagram · Para copiar**, con botones de copia en 1 clic y descarga de placas PNG (`1080 × 1350`).

3. **`.github/workflows/marketing-content.yml` (Campaña semanal por los 3 públicos)**:
   - **Cuándo corre:** Todos los lunes a las 08:00 AM hora argentina.
   - **Qué hace:** Toma los kits generados a partir de las novedades reales y arma una selección semanal cubriendo **Monotributo**, **PyMEs / Sueldos / Impuestos** y **Sociedades**, guardándola en `marketing/campanas/semana-<fecha>.md` (sin repetir plantillas fijas aunque no haya clave de IA configurada).

---

## 3. Configuración de Credenciales en GitHub (Solo si usás GitHub Actions)

Para que GitHub Actions pueda enviar los correos por vos, solo necesitás cargar las credenciales de correo en los secretos del repositorio:

1. En tu repositorio de GitHub, andá a **Settings** > **Secrets and variables** > **Actions**.
2. Hacé clic en **New repository secret** y agregá:
   - `SMTP_HOST`: `smtp.gmail.com`
   - `SMTP_PORT`: `465`
   - `SMTP_USER`: `abm.estudio.contable.00@gmail.com`
   - `SMTP_PASS`: Tu **contraseña de aplicación** de Google (generada en [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)).
   - `SMTP_FROM`: `"Alejandra Mayta · ABM Estudio Contable" <abm.estudio.contable.00@gmail.com>`
   - `OPENAI_API_KEY` o `GEMINI_API_KEY`: *(Opcional)* Para redacción avanzada con IA. Si no se configuran, el sistema usa el motor editorial de respaldo sin costo.

---

## 4. Cuadro Comparativo de Opciones

| Canal / Tarea | Dónde se ejecuta | ¿Requiere PC encendida? | Cómo se controla |
| --- | --- | --- | --- |
| **Envío de correos a empresas (Sheets)** | Servidores de Google | **NO** | Menú "📮 ABM Marketing" en tu Google Sheet |
| **Envío de correos por GitHub** | Servidores de GitHub | **NO** | Pestaña Actions en GitHub (o cron automático) |
| **Generación de copys para Instagram** | GitHub Actions | **NO** | En `marketing/instagram/PARA_COPIAR.md`, `marketing/campanas/` y `/editor-noticias` |
| **Publicación de noticias en la web** | GitHub Actions | **NO** | Automático 2 veces al día (08:30 y 18:30 hs) |
| **Diseño gráfico en Canva** | Web de Canva | **NO** | Diseñar con las referencias oficiales de ABM |
