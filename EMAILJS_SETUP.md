# Activar el formulario de contacto por correo

El formulario de Contacto usa EmailJS para mandar la consulta a la casilla del estudio desde el navegador, sin un servidor propio. La integración ya está en el código; falta vincularla con la cuenta de EmailJS.

## 1. Conectar la casilla del estudio

1. Creá o abrí una cuenta en [EmailJS](https://www.emailjs.com/).
2. En **Email Services**, conectá la casilla que va a recibir las consultas. El sitio muestra actualmente `abm.estudio.contable.00@gmail.com` como contacto.
3. Copiá el **Service ID** del servicio conectado.

## 2. Crear la plantilla de correo

En **Email Templates**, creá una plantilla con estos campos:

- **To Email:** la casilla que recibirá las consultas (por ejemplo, la dirección del estudio).
- **Reply To:** `{{from_email}}`, para poder responder directamente a quien escribió.
- **Subject:** `Consulta web: {{topic}} — {{from_name}}`.
- **Contenido:**

```text
Nueva consulta desde el sitio de ABM

Nombre: {{from_name}}
Correo: {{from_email}}
Tema: {{topic}}

Mensaje:
{{message}}
```

Copiá el **Template ID**.

## 3. Configurar el proyecto

Copiá `.env.example` como `.env.local` en la carpeta principal del proyecto y completá los tres valores:

```env
VITE_EMAILJS_SERVICE_ID=service_...
VITE_EMAILJS_TEMPLATE_ID=template_...
VITE_EMAILJS_PUBLIC_KEY=...
```

El **Public Key** está en la sección **Account** de EmailJS. Reiniciá `npm run dev` después de editar `.env.local`. En el sitio publicado, agregá estas mismas tres variables en la configuración de variables de entorno del proveedor de hosting y volvé a desplegar.

El Public Key está pensado para usarse desde el navegador. No agregues una Private Key a variables `VITE_` ni al código del sitio.

## 4. Probar el envío

Completá el formulario en `/contacto`. Si el correo no aparece, revisá Spam y los registros de envío en EmailJS. El formulario muestra un mensaje de éxito o un aviso si falla. Mientras falte la configuración, la página ofrece WhatsApp y correo como alternativas.

## Documentación oficial

- [Ejemplo oficial de EmailJS para React](https://www.emailjs.com/docs/examples/reactjs/)
- [Método `sendForm`](https://www.emailjs.com/docs/sdk/send-form/)
- [¿Es seguro exponer el Public Key?](https://www.emailjs.com/docs/faq/is-it-okay-to-expose-my-public-key/)
