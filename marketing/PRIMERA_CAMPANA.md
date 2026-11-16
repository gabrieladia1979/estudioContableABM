# Primera campaña de Marketing ABM

Preparada el 02/11/2026. Punto de partida confirmado por el usuario: todavía no hay clientes adquiridos. Públicos elegidos: todos los segmentos de servicios; canales de contenido: Instagram de ABM y Noticias de la web.

## Usar el agente

El agente reutilizable se llama `abm-marketing`. Pedido de ejemplo:

> Usá $abm-marketing para preparar la campaña de esta semana para monotributistas, pymes y nuevas sociedades. Revisá resultados, elegí los temas, prepará las piezas de Canva y dejá registrado qué falta para publicarlas.

Está guardado en `.agents/skills/abm-marketing` dentro de este repositorio para que viaje con el proyecto. Puede usarse mediante su nombre; si no aparece en el selector, actualizar la sesión de Codex. El usuario autorizó ejecución recurrente el 02/11/2026: se creó `marketing-abm-activo`, cada seis horas en este chat. Para el trabajo local se necesita la PC encendida y la aplicación abierta. También existe una definición de GitHub Actions para campañas; su archivo local no acredita despliegue ni ejecuciones remotas.

Actualización del 03/11/2026: las tres versiones web completas, epígrafes, textos alternativos y estados reales están en [la primera tanda](publicaciones/tanda-2026-11-03.md). No se publicaron en esta ejecución. La campaña semanal ya existente no se vuelve a generar ni se trata como otra tanda.

Actualización del 06/11/2026: [la nota sobre nuevos embargos de ARCA](publicaciones/alternativa-pymes-2026-11-06.md) es una alternativa para el lugar de pymes de esa misma tanda. Ya se notificó que está lista para revisión. Si se elige esa versión, ajustar el brief visual pendiente antes de iniciar la generación; no distribuir las dos como parte de la primera tanda.

## Estado comprobado

| Elemento | Estado |
| --- | --- |
| Clientes adquiridos | 0, informado por el usuario |
| Prospectos en archivo | 56 registros, todos marcados pendiente; comprobar vigencia y contacto previo antes de usarlos |
| Consultas, reuniones y propuestas actuales | Sin datos confirmados |
| Teléfono y WhatsApp | +54 11 6817 2147, coincide entre código y página de contacto pública |
| Correo publicado | abm.estudio.contable.00@gmail.com |
| Instagram mencionado por el sitio | https://www.instagram.com/abm.estudiocontable/ |
| Canva | Conexión comprobada; permite buscar, crear y editar diseños |
| Publicador de Instagram | No disponible entre las herramientas conectadas inspeccionadas |
| Publicación de noticias de la web | Hay implementación en el proyecto; verificar despliegue, acceso y flujo actual antes de dar por publicada una nota |
| Presupuesto publicitario, honorarios y disponibilidad | Sin confirmar |
| Perfil de Empresa en Google y estadísticas | Sin acceso o estado verificado en esta ejecución |

No se enviaron correos, mensajes privados ni publicaciones sociales en esta preparación.

Se corrigió el generador de presentaciones para usar los contactos de `src/data/contact.js` y retirar gratuidad, reuniones presenciales y experiencia con clientes no confirmadas. Los CSV y borradores históricos no se reescribieron: revisarlos o regenerarlos antes de usarlos.

## Tres propuestas comerciales

| Público | Necesidad a explorar | Mensaje principal | Destino |
| --- | --- | --- | --- |
| Monotributistas y profesionales | Inicio de actividad o una duda sobre facturación y situación actual | Contanos qué actividad realizás y en qué etapa estás para definir los próximos pasos | /servicios#monotributo |
| Pymes y comercios | Información contable, impuestos o sueldos que necesitan organizar | Conversemos sobre cómo llevás los números y qué apoyo necesitás | /servicios#pymes |
| Nuevas sociedades | Proyecto, socios, documentación y puesta en marcha | Antes de constituir, ordenemos las preguntas de tu proyecto | /servicios#crear-sociedad |

La propuesta es atención directa de Alejandra Mayta. El alcance y los honorarios se conversan según cada caso. No se ofrece gratuidad ni un resultado fiscal garantizado.

## Primera tanda de contenido

Los siguientes materiales son propuestas preparadas, no publicaciones realizadas.

### 1. Monotributo: modalidad de facturación

Objetivo: iniciar consultas de monotributistas sociales y promovidos que necesiten revisar su facturación.

Texto de la pieza:

> ¿Seguís usando talonarios?
>
> Monotributo social y promovido: revisá los cambios en facturación.
>
> Consultá cómo se aplica a tu actividad.
>
> ABM Estudio Contable · Escribinos y contanos tu situación.

Epígrafe propuesto:

> ARCA informó una ampliación de la obligación de emitir comprobantes electrónicos para determinados sujetos, entre ellos monotributistas sociales y promovidos.
>
> Si tenés dudas sobre tu modalidad de facturación, contanos qué actividad realizás y cómo emitís tus comprobantes. En ABM podemos conversar sobre el alcance de la revisión.
>
> Fuente: publicación de ARCA del 31/08/2026, consultada el 02/11/2026. El alcance se revisa según la situación de cada contribuyente.
>
> Más información en nuestra web, desde el enlace de la biografía.

Fuente: https://servicioscf.arca.gob.ar/publico/sitio/contenido/novedad/ver.aspx?id=5881

Texto alternativo: “Placa de ABM Estudio Contable que invita a monotributistas sociales y promovidos a revisar los cambios en su modalidad de facturación”.

Destino de campaña: https://estudiocontableabm.com.ar/servicios?utm_source=instagram&utm_medium=organic_social&utm_campaign=primeros_clientes&utm_content=facturacion_social#monotributo

Versión web propuesta:

**Facturación: qué revisar si usás talonarios**

ARCA comunicó cambios para sujetos que contaban con excepciones al uso de comprobantes electrónicos. Entre los grupos mencionados se encuentran el monotributo social y el promovido.

Para preparar una consulta, anotá tu actividad, el régimen en que estás inscripto y la forma en que facturás actualmente. Eso ayuda a identificar qué información adicional se necesita.

En ABM podemos conversar sobre tu caso y definir el alcance del acompañamiento. La publicación del organismo enlazada al pie permite consultar el detalle y las fechas de aplicación.

Estado: fuente consultada; brief enviado a la preparación de Canva; diseño nuevo todavía no generado. Usar la referencia visual elegida en el widget para continuar. La referencia existente `DAHZP4AJAJs` no debe presentarse como esta pieza nueva.

### 2. Pymes y comercios: información para conversar

Texto de la pieza:

> Tu negocio crece.
>
> ¿La información contable también está ordenada?
>
> Facturas · Movimientos · Obligaciones · Próximos pasos
>
> ABM Estudio Contable · Conversemos sobre tu actividad.

Epígrafe propuesto:

> Llevar un negocio implica decidir todos los días. Tener la información organizada ayuda a conversar a tiempo sobre los números.
>
> En ABM ofrecemos acompañamiento contable e impositivo para pymes y comercios. Contanos qué actividad realizás y qué tarea necesitás ordenar o delegar.
>
> Tu consulta inicial la recibe Alejandra Mayta, titular del estudio. Escribinos desde el enlace de la biografía.

Texto alternativo: “Placa de ABM que invita a negocios y comercios a ordenar su información y consultar por acompañamiento contable”.

Destino: https://estudiocontableabm.com.ar/servicios?utm_source=instagram&utm_medium=organic_social&utm_campaign=primeros_clientes&utm_content=orden_pyme#pymes

Versión web: una guía breve titulada “Qué información preparar para conversar sobre la contabilidad de tu negocio”, con las preguntas actividad, organización actual, tareas que necesitan apoyo y próximos plazos. No requiere inventar una novedad normativa.

Estado: textos preparados; diseño y publicación pendientes.

### 3. Sociedades: preguntas para empezar

Texto de la pieza:

> Una sociedad empieza con un proyecto.
>
> Actividad · Socios · Organización
>
> Contanos qué querés poner en marcha.
>
> ABM Estudio Contable · Sociedades y cooperativas.

Epígrafe propuesto:

> Si están pensando en crear una sociedad, una primera conversación puede ayudar a ordenar el proyecto y las preguntas que necesitan resolver.
>
> ¿Qué actividad van a realizar? ¿Quiénes participan? ¿Dónde van a operar?
>
> En ABM conversamos sobre esas bases para definir el alcance del acompañamiento y la documentación a revisar.
>
> Consultanos desde el enlace de la biografía.

Texto alternativo: “Placa de ABM con tres puntos para iniciar una consulta sobre una sociedad: actividad, socios y organización”.

Destino: https://estudiocontableabm.com.ar/servicios?utm_source=instagram&utm_medium=organic_social&utm_campaign=primeros_clientes&utm_content=proyecto_sociedad#crear-sociedad

Versión web: “Tres preguntas para preparar tu consulta sobre una sociedad”, desarrollando esas preguntas sin recomendar una figura societaria antes de conocer el proyecto.

Estado: textos preparados; diseño y publicación pendientes.

## Acciones de los primeros catorce días

Cadencia propuesta, no programada. Distribuir tres piezas por semana entre los tres públicos, si Alejandra puede atender las consultas.

| Momento | Acción | Evidencia de avance |
| --- | --- | --- |
| Días 1–2 | Confirmar modalidad de atención, honorarios a presupuestar, disponibilidad, acceso a Instagram y recepción real de consultas del formulario | Canales y oferta confirmados |
| Días 1–3 | Revisar el Perfil de Empresa de Google si existe y la modalidad permite usarlo; preparar descripción, servicios y enlace correctos | Ficha revisada o faltantes identificados |
| Días 2–4 | Terminar la primera tanda: una pieza por público, epígrafes y destinos específicos | Tres piezas completas con ID y estado |
| Días 3–7 | Distribuir por los canales autorizados que estén accesibles, con enlaces de campaña | URL real de cada publicación |
| Días 3–7 | Identificar cinco oportunidades por público entre red conocida, negocios pertinentes y posibles colaboradores | Quince oportunidades investigadas, con evidencia y próxima acción; esta cantidad es una meta de trabajo |
| Días 5–10 | Preparar presentaciones para contactos pertinentes y propuestas de colaboración | Borradores personalizados; enviar únicamente a destinatarios autorizados |
| Días 8–12 | Segunda tanda: una pregunta frecuente real por público o una novedad oficialmente verificada | Tres piezas ajustadas a consultas o evidencia |
| Días 12–14 | Revisar contactos, conversaciones, propuestas y clientes; priorizar el canal que aporta consultas pertinentes | Decisión de siguiente ciclo basada en resultados reales |

Google explica que la información precisa y completa ayuda al posicionamiento local y que intervienen relevancia, distancia y prominencia. El perfil requiere una modalidad elegible: atención en un lugar al que los clientes puedan ir o visitas a los clientes. Verificar la modalidad real de ABM antes de crear o modificar la ficha.

Fuentes consultadas el 02/11/2026:

- https://support.google.com/business/answer/7091?hl=es
- https://support.google.com/business/answer/3038177?hl=es

## Respuesta inicial a consultas recibidas

Estos textos se usan para responder a quien ya consultó; no se enviaron.

**Monotributo:** “Hola, gracias por escribir a ABM. ¿Qué actividad realizás y estás por empezar o ya estás inscripto? Contanos brevemente qué necesitás revisar y si hay algún plazo cercano.”

**Pymes:** “Hola, gracias por tu consulta. ¿A qué se dedica el negocio y en qué área necesitás apoyo: impuestos, contabilidad, sueldos o una consulta puntual? Con esa información podemos conversar sobre el alcance.”

**Sociedades:** “Hola, gracias por escribirnos. ¿Qué proyecto quieren desarrollar, cuántas personas participarían y dónde operarían? Con esa base podemos preparar la primera conversación.”

Después de delimitar la necesidad: proponer una conversación y luego una propuesta con alcance, honorarios y condiciones confirmados. No registrar un presupuesto como aceptado sin una respuesta real.

## Seguimiento

Usar `marketing/seguimiento.csv` para oportunidades concretas. Está vacío porque en esta preparación no se verificaron conversaciones comerciales nuevas.

Estados: investigada, consulta_recibida, conversacion, reunion_acordada, propuesta_enviada, cliente_confirmado, no_avanza. Cada oportunidad abierta necesita una próxima acción. No guardar claves fiscales, documentación ni detalles tributarios privados en este archivo; usar referencias al canal privado acordado.

La revisión semanal cuenta consultas pertinentes, conversaciones, propuestas y clientes. Los porcentajes se calculan cuando hay un denominador válido. Los registros de prospectos, los envíos, los clics y las impresiones no equivalen a clientes.

## Para publicar automáticamente

El usuario eligió Instagram y la web como canales. Eso no configura por sí solo una integración.

- Canva: preparar diseños y seguir el flujo del conector. La herramienta de generación de marca abre un selector que necesita una selección del usuario; las transacciones de edición requieren mostrar la vista previa y obtener la aprobación específica que pide la herramienta antes de guardar.
- Instagram: conectar un publicador autorizado para la cuenta de ABM. La conexión de Canva inspeccionada no ofrece una herramienta de publicación social.
- Web: comprobar el backend desplegado y la vía de publicación actualmente operativa. Un archivo o borrador local no modifica el sitio público.
- Ejecución recurrente: `marketing-abm-activo` fue creada y activada en este chat el 02/11/2026, cada seis horas. El trabajo de marketing está autorizado; las conexiones y las aprobaciones específicas de las herramientas siguen siendo necesarias para publicar.
