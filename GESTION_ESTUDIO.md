# Gestión de ABM Estudio Contable

Propuesta para Alejandra Myta, que hoy trabaja sola y busca sus primeros clientes desde la web. Revisada el 7/10/2026. Los precios y límites de los proveedores pueden cambiar.

## Decisión recomendada

Empezar con un **CRM gratuito para las consultas y el seguimiento comercial**, sin desarrollar todavía un sistema contable propio. El problema inmediato es saber quién consultó, cuándo responder, qué propuesta se hizo y de qué canal llegó. Un sistema fiscal completo agregaría mantenimiento, resguardo de datos y controles antes de tener un volumen que lo justifique.

[HubSpot CRM gratuito](https://www.hubspot.es/products/crm) publica un plan sin vencimiento para hasta dos usuarios y 1.000 contactos, con contactos, negocios y tareas. Es una opción para probar con Alejandra como única usuaria. Comprobar los límites actuales al crear la cuenta. ABM no tiene una cuenta creada desde este proyecto ni una integración activa.

Para tareas de clientes, obligaciones y vencimientos, evaluar más adelante un producto específico argentino:

| Opción | Para qué sirve | Condición publicada |
| --- | --- | --- |
| [Mi Estudio Premium](https://www.contadoresargentinos.com.ar/mi-estudio-premium) | Clientes, tareas recurrentes, recordatorios, agenda ARCA asistida y exportaciones CSV/ICS | Prueba de 7 días; ARS 25.000/mes según la página consultada |
| [Kontari](https://kontari.com.ar/) | Clientes, tareas, documentos y módulos de gestión fiscal | Prueba y plan Solo publicados; verificar precio y alcance al contratar |

Estas plataformas no sustituyen el criterio profesional. Una fecha o sugerencia de ARCA se confirma en la fuente oficial antes de actuar. Antes de cargar datos reales, revisar términos, control de acceso, exportación, respaldo y tratamiento de documentos.

## Flujo diario, desde la primera consulta

1. **Entrada:** sitio, WhatsApp, Instagram, correo o referido. Registrar una sola ficha por persona o negocio.
2. **Clasificación:** tema, plazo, canal de origen, fecha de ingreso y próxima acción. Si hay una intimación con vencimiento cercano, Alejandra la revisa con prioridad.
3. **Respuesta:** ofrecer una conversación o pedir únicamente los datos mínimos para delimitar el trabajo. Registrar fecha y resultado.
4. **Propuesta:** anotar servicio, alcance, honorarios y fecha de seguimiento en el canal privado elegido.
5. **Resultado:** marcar ganada, perdida o pendiente. Si se convierte en cliente, pasar a un proceso separado de alta y tareas.
6. **Revisión semanal:** mirar consultas sin respuesta, propuestas pendientes, temas frecuentes y canal que trajo contactos pertinentes.

Estados sugeridos del embudo: **Nueva → Contactada → Reunión acordada → Propuesta enviada → Cliente / No avanzó**. Toda ficha abierta debe tener una próxima acción con fecha.

Campos mínimos: nombre, correo o teléfono, canal de origen, tema, fecha de ingreso, estado, próxima acción y fecha. Usar el campo de notas con moderación; no copiar claves fiscales, contraseñas, documentos ni texto íntegro de intimaciones al CRM de prospectos.

## Configuración inicial del CRM

1. Alejandra crea la cuenta y activa autenticación de dos factores.
2. Crea los estados anteriores y una tarea de seguimiento para cada consulta nueva.
3. Carga manualmente las primeras consultas provenientes de Netlify, correo, WhatsApp e Instagram. El formulario web **todavía no está conectado al CRM**; no asumir sincronización automática.
4. Agenda una revisión diaria breve de nuevas consultas y otra semanal de propuestas y origen.
5. Tras un mes, mide: consultas recibidas, respondidas, reuniones, propuestas, clientes y canal de origen. Si el problema es que no llegan consultas, concentrar tiempo en difusión y contenido; si llegan pero se pierden, mejorar el seguimiento.

## Cuándo sumar un sistema específico

Probar uno cuando ya haya clientes recurrentes y aumenten los vencimientos y tareas mensuales. Hacer una prueba con datos ficticios y verificar que se puedan importar y exportar clientes y tareas, marcar responsables, registrar historial, configurar recordatorios y corregir fechas. Confirmar costo real, soporte y cómo recuperar los datos antes de pagar.

Un desarrollo propio tendría sentido solo si hay un flujo particular que ninguna herramienta cubra. En ese caso, el primer alcance sería un panel privado de clientes, tareas, vencimientos y seguimiento, con acceso autenticado, permisos, registro de cambios, copias de seguridad y exportación. No se deben guardar datos de clientes en el navegador ni publicar un panel administrativo sin autenticación. El hosting de la web pública en Netlify no constituye por sí solo ese sistema privado.

## Pendientes de cuentas externas

- **Netlify:** activar Form detection, publicar de nuevo y configurar la notificación por correo como indica [NETLIFY_FORM_SETUP.md](NETLIFY_FORM_SETUP.md). Hasta entonces, el sitio ofrece WhatsApp y correo si falla el envío.
- **GA4:** Alejandra aún no creó la propiedad. Cuando exista el ID G-, configurar la variable de entorno y comprobar eventos.
- **CRM:** la cuenta debe crearla Alejandra. Este proyecto no solicita contraseñas ni vincula datos personales con un tercero sin su decisión.
