# Operación segura del editor

El editor usa `/api/news/session` para ingresar y cerrar sesión. Las operaciones de noticias se realizan en `/api/news/admin` mediante una cookie de sesión; el endpoint administrativo ya no admite la clave como Bearer. Los borradores y publicaciones continúan guardándose en Netlify Blobs.

## Variables privadas de Netlify

- `NEWS_ADMIN_TOKEN`: clave aleatoria de al menos 32 caracteres y como máximo 512, solo en el servidor. Mantenerla fuera del repositorio y de variables `VITE_`.
- `NEWS_ADMIN_TOKEN_EXPIRES_AT`: opcional, fecha ISO 8601 UTC de vencimiento de la clave. Si se configura una fecha inválida o vencida, se bloquea el ingreso. Cambiar o vencer la clave invalida las sesiones existentes.
- `OPENAI_API_KEY` y `NEWS_AI_MODEL`: necesarias solo para redactar con IA.
- `NEWS_AI_DAILY_LIMIT`: máximo de intentos de redacción por día UTC para todo el sitio, entre 1 y 1000; por defecto, 20. También hay un límite de dos intentos por minuto. No reemplaza el presupuesto del proveedor.

## Sesiones y límites

Las sesiones duran 30 minutos y no se renuevan automáticamente. La cookie es HttpOnly, Secure y SameSite=Strict. Cerrar sesión revoca el identificador en el servidor. Los cambios requieren un origen coincidente y JSON válido.

Se permiten cinco solicitudes de ingreso cada 15 minutos por IP, con contadores en almacenamiento compartido. La IP proviene del contexto de Netlify; no de un header elegido por el cliente. Si el contexto no la proporciona, se aplica un grupo conservador compartido. Los límites adicionales declarados en las funciones deben aparecer como aceptados en los logs del deploy.

Las escrituras administrativas están limitadas a 30 por minuto. Los registros se guardan bajo `security/audit/`, las sesiones bajo `security/sessions/` y los contadores bajo `security/limits/`. Ninguna de esas rutas se expone a través del API de noticias públicas. Los registros expirados requieren una política de retención operativa.

La vista local de Vite sigue usando el modo de edición local, restringido por dirección de conexión y Host a localhost. Los controles de producción se prueban con almacenamiento temporal en las pruebas automatizadas. Nunca publicar Vite como servidor del sitio.

## Al publicar

Ejecutar `npm ci`, `npm run audit:security`, `npm test`, `npm run lint` y `npm run build`. Publicar `dist`, no la raíz ni `dist-ssr`. La compilación reemplaza el marcador de hashes en las cabeceras CSP; no copiar `public/_headers` directamente como versión final.

Comprobar un ingreso real, cierre de sesión, rechazo sin credenciales y acceso normal a las páginas públicas. Confirmar MFA y permisos mínimos de las cuentas de Netlify y GitHub; para varios editores, migrar a identidades individuales con MFA.
