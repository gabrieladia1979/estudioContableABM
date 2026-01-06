# Configuración de EmailJS - Guía Paso a Paso

Este proyecto usa **EmailJS** para enviar correos desde el formulario de contacto sin necesidad de servidor backend.

## ✅ Instalación Completada

El paquete `@emailjs/browser` ya está instalado (`npm install @emailjs/browser`).

---

## 🚀 Paso 1: Crear Cuenta en EmailJS (5 minutos)

1. Ve a [emailjs.com](https://www.emailjs.com/)
2. Haz clic en **"Sign Up Free"**
3. Crea tu cuenta con Google o tu email
4. Verifica tu correo

---

## 🔧 Paso 2: Conectar tu Proveedor de Email

1. En el dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor:
   - **Gmail** (recomendado para empezar)
   - Outlook
   - Yahoo
   - O cualquier otro SMTP

### Para Gmail:
- Se abrirá una ventana de Google para autorizar
- Haz clic en "Autorizar"
- **Copiar el Service ID** que aparece (se ve como `service_xxxxxxx`)

---

## 📧 Paso 3: Crear una Plantilla de Email

1. Ve a **"Email Templates"** en el menú izquierdo
2. Haz clic en **"Create New Template"**
3. Usa este ejemplo:

### Template Details:
- **Template Name:** Contact Form (o lo que prefieras)
- **From Name:** {{from_name}} o dejar vacío
- **From Email:** {{user_email}}
- **To Email:** tu-email@tudominio.com (donde recibes los mensajes)
- **Subject:** Nuevo contacto desde web: {{user_name}}

### Email Content (puedes copiar esto):
```
Nombre: {{user_name}}
Email: {{user_email}}
Mensaje:
{{message}}
```

4. Haz clic en **"Save Template"**
5. **Copiar el Template ID** (se ve como `template_xxxxxxx`)

---

## 🔑 Paso 4: Obtener tu Public API Key

1. Ve a **"Account"** → **"API Keys"**
2. Busca la sección **"Public Key"**
3. **Copiar tu Public Key** (es una cadena larga)

---

## 💻 Paso 5: Actualizar el Código

Abre el archivo `src/components/sections/ContactSection.jsx` y reemplaza estos valores:

```javascript
const SERVICE_ID = 'service_xxxxxxx';      // Tu Service ID
const TEMPLATE_ID = 'template_xxxxxxx';    // Tu Template ID
const PUBLIC_KEY = 'xxxxxxxxxxxxxxx';      // Tu Public Key
```

Con los valores que copiaste en los pasos anteriores.

---

## ✨ Paso 6: Probar el Formulario

1. En la terminal, ejecuta:
   ```bash
   npm run dev
   ```

2. Abre tu sitio en el navegador
3. Ve a la sección "Contacto"
4. Completa el formulario y haz clic en "Enviar Mensaje"
5. Deberías recibir un email en tu bandeja de entrada

---

## 📊 Plan Gratuito de EmailJS

- **Límite:** 200 emails/mes (≈ 7 consultas/día)
- **Perfecto para:** Una página que recién arranca
- **Si necesitas más:** Plan Pro a partir de $9/mes

---

## 🐛 Solucionar Problemas

### No recibo los emails
- Verifica que el **Service ID**, **Template ID** y **Public Key** sean correctos
- Revisa la carpeta de **Spam**
- En EmailJS dashboard, ve a **"Logs"** para ver si hay errores

### Mensaje de error en la consola del navegador
- Abre el navegador (F12) → Console
- Copia el error y búscalo en la documentación de [EmailJS](https://www.emailjs.com/docs/)

### El formulario no responde
- Asegúrate de recargar la página después de cambiar los IDs
- Si usas Vite en desarrollo, a veces es necesario hace Ctrl+Shift+R para limpiar caché

---

## 🗑️ Eliminar el Backend (Opcional)

Una vez que EmailJS funcione, ya no necesitas la carpeta `backend/`:

```bash
rm -r backend
```

Esto reduce el tamaño de tu proyecto y facilita el despliegue (puedes usar Vercel o Netlify gratis).

---

## ¿Preguntas?

Consulta la documentación oficial: https://www.emailjs.com/docs/

¡Felicidades! Tu formulario está listo para usar 🎉
