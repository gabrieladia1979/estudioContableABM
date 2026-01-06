const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
  host: config.smtpHost,
  port: config.smtpPort,
  secure: config.smtpSecure,
  auth: {
    user: config.smtpUser,
    pass: config.smtpPass
  }
});

async function sendContactEmail({ name, email, phone, message }) {
  const mailOptions = {
    from: config.fromEmail,
    to: config.toEmail,
    subject: `Contacto desde web: ${name}`,
    text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone || '-'}\n\nMensaje:\n${message}`,
    html: `<p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Teléfono:</strong> ${phone || '-'}</p><p><strong>Mensaje:</strong></p><p>${(message || '').replace(/\n/g, '<br/>')}</p>`
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendContactEmail };
