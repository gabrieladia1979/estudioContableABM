import test from 'node:test';
import assert from 'node:assert/strict';
import { buildEmail } from './outreach-generator.mjs';
import { email, phoneDisplay, phoneHref, whatsappLink } from '../src/data/contact.js';

test('las presentaciones usan los contactos de ABM sin ofertas no confirmadas ni HTML del prospecto', () => {
  for (const angulo of ['sueldos_laboral', 'ingresos_brutos_iva', 'distrito_tech', 'asesoramiento_general']) {
    const prospect = { empresa: '<img src=x onerror=alert(1)>', barrio: 'Barracas', rubro: 'servicios & comercio', angulo };
    const draft = buildEmail(prospect);
    assert.ok(draft.html.includes(phoneHref));
    assert.ok(draft.html.includes(phoneDisplay));
    assert.ok(draft.text.includes(phoneDisplay));
    assert.ok(draft.html.includes(email) && draft.text.includes(email));
    assert.ok(draft.html.includes(whatsappLink().split('?')[0]));
    assert.ok(!draft.html.includes(prospect.empresa));
    assert.ok(draft.html.includes('&lt;img'));
    assert.doesNotMatch(draft.html + draft.text, /sin cargo|3843.?0796|contacto@estudiocontableabm|trabajamos con empresas|nuestras oficinas/i);
  }
});
