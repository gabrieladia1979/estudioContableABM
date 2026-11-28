# Motor de Automatización de Emails y Prospección Local · ABM Estudio Contable

Inventario y vistas previas de mensajes para empresas y pymes en **Parque Patricios**, **Boedo**, **Nueva Pompeya**, **Barracas** y zonas aledañas. Los envíos automáticos están deshabilitados.

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

## Revisión antes de contactar

Los archivos en `outreach/previews/` son borradores locales. Revisá la vigencia del destinatario, el contenido y el historial de contactos antes de considerar cualquier comunicación. Generar una vista previa no cambia el estado del prospecto ni acredita un envío.
