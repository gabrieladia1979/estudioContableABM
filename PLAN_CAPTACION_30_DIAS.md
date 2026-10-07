# Plan de captación de ABM · primeros 30 días

Objetivo: recibir consultas pertinentes y saber de dónde llegan. El formulario de la web recopila nombre, correo, motivo, plazo y origen de campaña; no da de alta a nadie en una lista de publicidad. La consulta puede entrar a cualquier hora, y Alejandra responde durante el horario de atención.

## Antes de difundir

1. Publicar el sitio y completar la prueba real del formulario descrita en `NETLIFY_FORM_SETUP.md`.
2. Revisar con Alejandra los textos de monotributo, intimaciones de ARCA, servicios, horario, teléfono y ubicación. Incorporar matrícula y credenciales solo si se verifican.
3. Crear una propiedad GA4 y configurar su ID de medición en Netlify como `VITE_GA_MEASUREMENT_ID`; desplegar de nuevo. La web pide permiso antes de cargar Analytics. Comprobar `page_view`, `contact_click` y `generate_lead` en los informes en tiempo real, aceptando medición en una sesión de prueba. No se envían nombre, correo ni el texto de la consulta a GA4.
4. Verificar el dominio en Search Console y enviar `https://estudiocontableabm.com.ar/sitemap.xml`. Inspeccionar las URL `/monotributo` y `/intimaciones-arca` después de publicar.
5. Revisar si existe una ficha de Perfil de Empresa en Google. Si existe, completar horarios y enlace web. Si no existe, crearla solo con los datos y modalidad de atención que Alejandra confirme. No inventar reseñas.

## Semana 1: poner el sitio en circulación

- Enlazar desde la biografía de Instagram a la página que mejor corresponda a la publicación, no siempre a la portada.
- Compartir la página de monotributo con contactos que trabajan por cuenta propia y la de intimaciones con quienes suelen recibir comunicaciones de ARCA, sin enviar mensajes masivos no solicitados.
- Registrar cada consulta en una planilla simple: fecha, canal, tema, si hubo respuesta, si se acordó reunión y si se convirtió en cliente. Evitar copiar documentación o datos fiscales sensibles.

## Semanas 2 y 3: contenido útil

Publicar dos piezas por semana y responder comentarios o mensajes durante el horario de atención. Borradores:

1. **Monotributo — antes de consultar:** “¿Estás por empezar una actividad? Contanos qué hacés, si ya facturás y qué duda tenés. Con esa información podemos orientarte sobre los próximos pasos.” Enlace: `https://estudiocontableabm.com.ar/monotributo?utm_source=instagram&utm_medium=social&utm_campaign=monotributo`.
2. **Monotributo — algo cambió:** “Si cambió tu actividad o facturación, vale la pena revisar tu situación. No compartas tu clave fiscal por mensajes. Escribinos brevemente qué cambió.” Mismo enlace.
3. **ARCA — llegó una comunicación:** “Guardá la comunicación completa y fijate si indica un plazo. En una primera consulta podemos ordenar la información y definir qué revisión corresponde.” Enlace: `https://estudiocontableabm.com.ar/intimaciones-arca?utm_source=instagram&utm_medium=social&utm_campaign=arca`.
4. **Pymes — cierre mensual:** “Tener facturas, movimientos y obligaciones organizados ayuda a conversar a tiempo sobre los números del negocio. Si necesitás apoyo contable, contanos cómo trabajás hoy.” Enlace: `https://estudiocontableabm.com.ar/servicios?utm_source=instagram&utm_medium=social&utm_campaign=pymes`.

Cada pieza debería usar el lenguaje y los ejemplos que Alejandra quiera respaldar profesionalmente. Revisar fechas y normativa vigente antes de publicar afirmaciones técnicas.

## Semana 4: decidir con datos

Contar visitas por página, clics de contacto, formularios recibidos, consultas pertinentes y clientes. Si hay visitas sin consultas, probar una explicación más concreta del servicio y un llamado a la acción más visible. Si no hay visitas, dedicar el siguiente mes a búsqueda local, difusión y alianzas. Considerar un asistente solo si el volumen de preguntas repetidas justifica configurarlo y supervisarlo.

## Costos y mantenimiento

El sitio puede seguir en Netlify con el plan que tenga la cuenta; revisar en el panel los límites y precios vigentes de Forms y despliegues. GA4 y Search Console requieren cuentas y configuración de Alejandra. El formulario deja entradas en Netlify, pero la notificación por correo debe activarse en el panel. Nadie debe prometer atención profesional automática ni respuesta inmediata fuera de horario.
