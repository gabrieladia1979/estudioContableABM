# Backend para estudioContableABM

Servidor Express mínimo para recibir consultas desde el frontend y enviar un email usando SMTP (Nodemailer).

1. Instalar dependencias

```bash
cd backend
npm install
```

2. Configurar variables de entorno

Copiar `.env.example` a `.env` y completar los valores:

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `FROM_EMAIL`, `TO_EMAIL`

3. Ejecutar

```bash
npm start
```

El servidor correrá en `http://localhost:4000` por defecto.

Endpoint disponible:

- `POST /api/send-email` - body JSON: `{ name, email, phone, message }`.

Nota: protege las credenciales y considera añadir captcha/protección ante abuso en producción.

Arquitectura propuesta (capas)

- `index.js`: arranque de la aplicación (delegando a `src/app.js`).
- `src/app.js`: configuración de middleware y ruteo.
- `src/routes/*`: rutas express (p. ej. `routes/contact.js`).
- `src/controllers/*`: lógica de orquestación (validación, llamadas a servicios).
- `src/services/*`: responsabilidades concretas (p. ej. `mailService` que envía emails).
- `src/validators/*`: validadores de entrada.
- `src/config/*` y `src/utils/*`: configuración y utilidades.

Esto facilita mantener y escalar la aplicación; la lógica de envío de email está encapsulada en `mailService`.

Cómo ejecutar

```bash
cd backend
npm install
# copiar .env.example a .env y completar credenciales SMTP
npm start
```

Durante desarrollo puedes usar `npm run dev` si instalas `nodemon`:

```bash
npm run dev
```
