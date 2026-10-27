# Correcciones de seguridad — 27/10/2026

## Estado del repositorio

| Hallazgo | Corrección preparada | Estado |
| --- | --- | --- |
| SEC-01 — Dependencias | Lockfile actualizado; Vite 7.3.7, PostCSS 8.5.32 y dependencias transitivas corregidas. npm audit completo: 0 avisos. | Corregido y comprobado localmente. |
| SEC-02 — Cabeceras | CSP, bloqueo de marcos, nosniff, Referrer-Policy, Permissions-Policy y HSTS. Las APIs también las devuelven. Los hashes de los scripts JSON-LD se calculan sobre el HTML compilado. | Preparado y probado en una vista previa local con las cabeceras activas; pendiente desplegar y revisar producción. |
| SEC-03 — Editor | Sesiones de 30 minutos en cookies HttpOnly, Secure y SameSite=Strict; cierre con revocación; cambio de clave invalida sesiones; rechazo de otro origen. Cinco ingresos por IP cada 15 minutos mediante contadores compartidos y reglas adicionales de Netlify. Registros de acciones e ingresos en almacenamiento privado. | Controles del código corregidos; MFA de cuentas, identidad individual, rotación operativa y configuración externa siguen pendientes de verificar. |
| SEC-04 — Cuerpo de peticiones | Lectura con límite de bytes, corte del stream, validación de Content-Type y estructura JSON; rechazo temprano por Content-Length sin confiar solamente en él. | Corregido y probado. |

Se agregaron límites compartidos para redacción con IA: dos intentos por minuto y 20 por día UTC por defecto. El límite diario es configurable; no equivale a un límite monetario del proveedor.

El editor dejó de enviar la clave en cada solicitud. La clave solo se usa al ingresar y se limpia del formulario. La cookie contiene un identificador aleatorio; en el almacenamiento se guarda su hash. Se deshabilitó la medición de Analytics en el editor y su CSP restringe scripts y conexiones a recursos propios.

Las acciones editoriales se registran con fecha, identificador de sesión, acción, identificador de nota y resultado. No se copian al registro las claves, cookies o textos privados. Como el acceso actual usa una clave del estudio, el actor se identifica como `editor`, no como una persona determinada. Para varios editores se necesita un proveedor de identidad con usuarios individuales y MFA.

Se agregó un workflow de GitHub con auditoría de dependencias, pruebas, lint y compilación, además de Dependabot. Su ejecución efectiva y la revisión de sus alertas deben comprobarse una vez publicados los archivos del repositorio.

Durante la prueba de navegador se detectó además que una entrada directa al editor intentaba hidratar el HTML de la portada. El HTML generado ahora identifica su ruta y el cliente solo hidrata cuando coincide, evitando ese error en el fallback de rutas dinámicas.

## Comprobaciones

- npm audit completo: cero avisos al completar la actualización.
- Pruebas de seguridad sobre límites, cookies, expiración, rotación, revocación, origen, concurrencia y registros, junto con las pruebas existentes de noticias y cotizaciones.
- Lint y compilación de producción.
- Navegador local con CSP aplicada: portada, formulario de acceso, ingreso con clave ficticia, recarga de sesión y cierre de sesión. El almacenamiento de esa prueba es temporal; no se modificaron notas de producción.

## Pendientes de publicación y cuentas

1. Desplegar el código y comprobar las cabeceras y el acceso al editor en el dominio real. El despliegue no se realizó en esta corrección.
2. Revisar en el log del deploy que Netlify aceptó los límites declarados en las funciones. Las reglas de plataforma pueden tener un breve retraso de aplicación; el límite persistente de la aplicación es adicional.
3. Confirmar NEWS_ADMIN_TOKEN aleatorio y privado en Netlify; opcionalmente definir NEWS_ADMIN_TOKEN_EXPIRES_AT. No cambiar una clave vigente sin comunicar el nuevo acceso a quien administra el sitio.
4. Activar o comprobar MFA y permisos mínimos en GitHub, Netlify y el proveedor de IA. No se tuvo acceso administrativo a esas cuentas.
5. Configurar alertas y presupuesto monetario de IA, copias de seguridad y restauración de Blobs y retención de registros de auditoría. Los registros privados nuevos no tienen un borrado automático configurado en este cambio.

El repositorio queda más protegido, pero estos resultados no equivalen a una certificación de cumplimiento integral de OWASP ASVS ni a una garantía de ausencia de vulnerabilidades.

## Referencias

- [Reglas de límites de solicitudes en Netlify](https://docs.netlify.com/manage/security/secure-access-to-sites/rate-limiting/)
- [OWASP: cabeceras HTTP](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)
- [Configuración del editor](editor-security.md)
