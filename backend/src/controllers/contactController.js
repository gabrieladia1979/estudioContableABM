const mailService = require('../services/mailService');
const { validateContact } = require('../validators/contactValidator');

exports.sendEmail = async (req, res) => {
  const { error, value } = validateContact(req.body || {});
  if (error) {
    return res.status(400).json({ ok: false, error: error.details.map(d => d.message).join(', ') });
  }

  try {
    const info = await mailService.sendContactEmail(value);
    return res.json({ ok: true, info });
  } catch (err) {
    console.error('sendEmail error:', err);
    return res.status(500).json({ ok: false, error: 'Error al enviar email' });
  }
};
