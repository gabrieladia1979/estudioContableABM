# Motor de Automatización de Emails y Prospección Local · ABM Estudio Contable

Sistema integral para búsqueda, segmentación, generación y envío automatizado de correos electrónicos a empresas y pymes en **Parque Patricios**, **Boedo**, **Nueva Pompeya**, **Barracas** y zonas aledañas.

---

## ⚡ Comandos Rápidos

```bash
# 1. Ver estadísticas de empresas por barrio y estado
npm run outreach:search -- stats

# 2. Listar empresas filtrando por barrio
npm run outreach:search -- list --barrio="parque patricios"
npm run outreach:search -- list --barrio=boedo

# 3. Generar vista previa de los correos (simulación sin enviar)
npm run outreach:preview -- --limit=5
npm run outreach:preview -- --barrio=boedo --limit=3

# 4. Enviar correos reales (controlado con cadencia anti-spam)
npm run outreach:send -- --limit=5 --delay=15
npm run outreach:send -- --barrio="parque patricios" --limit=3
```

---

## 📍 Base de Datos Local (`outreach/prospects.json`)

Contiene **56 empresas verificadas** de la zona con sus rubros, sitios web, correos públicos y ángulos contables específicos:

| Barrio | Cantidad | Rubros destacados |
| --- | --- | --- |
| **Parque Patricios** | 19 | Software/Distrito Tech, imprentas, insumos gráficos, textil, ferretería |
| **Boedo** | 12 | Distribuidoras, maquinaria industrial, imprentas, marroquinería, maestranza |
| **Barracas** | 12 | Muebles, válvulas, uniformes, cortinas, logística y fletes, química |
| **Nueva Pompeya** | 9 | Grúas y transporte, metalúrgicas, rodamientos, mayoristas |
| **Otras zonas contiguas** | 4 | Constitución, San Cristóbal, Almagro |

Para agregar manualmente una nueva empresa:
```bash
node scripts/outreach-search.mjs add "Nombre Empresa" "Boedo" "imprenta" "info@empresa.com.ar" "https://web.com"
```

---

## 🎯 Ángulos de Personalización del Email

El generador ([`scripts/outreach-generator.mjs`](scripts/outreach-generator.mjs)) adapta el mensaje según el rubro de la empresa:

1. **Industrias / Talleres / Fábricas:** Enfoque en **liquidación de sueldos**, Libro de Sueldos Digital, Formulario 931 de ARCA, paritarias y prevención de contingencias laborales.
2. **Distribuidoras / Mayoristas / Logística:** Enfoque en **Convenio Multilateral**, retenciones/percepciones de AGIP y ARBA, y presentación mensual de IVA.
3. **Tecnología / Distrito Tecnológico:** Enfoque en **encuadre impositivo del polo tecnológico**, facturación de servicios y sociedades/monotributo.
4. **Comercios y Servicios Generales:** Enfoque en **orden contable, balances anuales y atención personalizada directa** con la Cra. Alejandra Mayta.

Cada correo incluye:
- Presentación de cercanía (estudio físico en Parque Patricios, Comuna 4/5).
- Botón directo de **WhatsApp** con mensaje precargado.
- Enlace al portal web oficial.
- Pie de correo profesional con opción de baja inmediata (cumplimiento Ley 25.326 y buenas prácticas anti-spam).

---

## 🚀 Configuración para Envíos Reales (SMTP)

Para enviar correos reales, configurar en `.env.local` (o variables de entorno):

```env
# Ejemplo con cuenta Gmail de ABM
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=tu_correo@gmail.com
# Contraseña de aplicación generada en myaccount.google.com > Seguridad > Contraseñas de aplicaciones
SMTP_PASS=xxxx xxxx xxxx xxxx
SMTP_FROM="Alejandra Mayta · ABM Estudio Contable <tu_correo@gmail.com>"
REPLY_TO=contacto@estudiocontableabm.com.ar
```

---

## 🛡️ Buenas Prácticas Anti-Spam
- **Límite sugerido:** No enviar más de 20 a 30 correos por día.
- **Espera entre envíos (`--delay=15`):** Pausa de 15 a 30 segundos entre cada correo para no alertar a los filtros de Gmail o del destinatario.
- **Registro y no duplicación:** Cada envío exitoso se marca como `enviado` en `prospects.json` y se audita en `campaign-log.json`, garantizando que ninguna empresa reciba correos duplicados.
