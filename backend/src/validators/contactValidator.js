function validateContact(data) {
  const errors = [];
  const value = {
    name: (data.name || '').toString().trim(),
    email: (data.email || '').toString().trim(),
    phone: (data.phone || '').toString().trim(),
    message: (data.message || '').toString().trim()
  };

  if (!value.name) errors.push({ message: 'El nombre es obligatorio.' });
  if (!value.email) {
    errors.push({ message: 'El correo electrónico es obligatorio.' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
    errors.push({ message: 'El correo electrónico no es válido.' });
  }
  if (!value.message) errors.push({ message: 'La consulta es obligatoria.' });

  return { error: errors.length ? { details: errors } : null, value };
}

module.exports = { validateContact };
