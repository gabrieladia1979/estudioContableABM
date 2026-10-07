# Activar las consultas de la web en Netlify

El formulario de `/contacto` usa Netlify Forms. Cada envío se guarda en **Netlify > sitio de ABM > Forms**. No requiere EmailJS ni variables de entorno.

## Activación

1. En el panel de Netlify del sitio, abrir **Forms** y activar **Form detection**.
2. Publicar un deploy nuevo de este proyecto. Netlify registra el formulario `consulta-abm` al procesar el HTML generado.
3. En **Forms > Submission notifications**, agregar una notificación por correo para `consulta-abm` dirigida a `abm.estudio.contable.00@gmail.com` o a la casilla que use el estudio. Revisar también Spam.
4. Desde la web publicada, enviar una consulta de prueba con un correo propio y verificar **ambas cosas**: que aparece en **Forms > Submissions** y que llega la notificación al correo. Si aparece en Netlify pero no en el correo, revisar la notificación; si no aparece, revisar Form detection y desplegar de nuevo.
5. Revisar **Forms > Usage** en el plan de Netlify de la cuenta. La facturación de Forms depende de si el plan es por créditos o uno heredado.

El envío no funciona en `localhost`; el formulario informa esa limitación y ofrece WhatsApp o correo. No ingresar claves fiscales ni documentación sensible en las pruebas.

**Estado del 7/10/2026:** las ocho páginas se publicaron y respondieron 200. Un POST técnico al formulario con datos ficticios recibió 404 de Netlify; por lo tanto, la recepción todavía no está activa. Alejandra debe iniciar sesión en Netlify para activar Form detection y volver a desplegar. Hasta completar ese paso, usar WhatsApp o correo directo para las consultas.

## Rutas internas

`public/_redirects` sirve el HTML generado para cada ruta al abrir directamente `/contacto`, `/servicios` y las otras páginas. Después del deploy, probar esas URLs en una ventana privada y confirmar que devuelven 200 y muestran el título y el contenido correspondientes incluso antes de cargar JavaScript.

## Referencias

- [Formularios React en Netlify](https://docs.netlify.com/manage/forms/setup/#work-with-javascript-rendered-forms)
- [Notificaciones por correo](https://docs.netlify.com/manage/forms/notifications/)
- [Rutas de aplicaciones de una página](https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/#history-pushstate-and-single-page-apps)
