import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { email, phoneDisplay, whatsappLink } from '../src/data/contact.js';

const newsPath = resolve('src/data/publishedNews.json');
const campanasDir = resolve('marketing/campanas');

async function loadJson(path, fallback = []) {
  try {
    const text = await readFile(path, 'utf8');
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}

function getWeekMondayDate() {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split('T')[0];
}

async function generateWithAI(prompt, systemPrompt) {
  const openaiKey = process.env.OPENAI_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (openaiKey) {
    const model = process.env.NEWS_AI_MODEL || 'gpt-4o-mini';
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1200,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.choices[0]?.message?.content?.trim();
    }
  }

  if (geminiKey) {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${systemPrompt}\n\n${prompt}` }] }]
      }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    }
  }

  return null;
}

async function main() {
  console.log('\n🚀 Agente Autónomo de Marketing y Contenidos · ABM Estudio Contable');
  console.log('==================================================================');
  
  await mkdir(campanasDir, { recursive: true });
  const weekDate = getWeekMondayDate();
  const campanaFile = resolve(campanasDir, `semana-${weekDate}.md`);

  const news = await loadJson(newsPath, []);
  const latestNews = news.slice(0, 3).map(n => `- ${n.title} (${n.category || 'Novedades'}): ${n.summary || ''}`).join('\n');

  console.log(`📅 Campaña para la semana: ${weekDate}`);
  console.log(`📰 Novedades recientes analizadas: ${news.length > 0 ? news.length : 'Sin notas previas'}`);

  const systemPrompt = `Sos el responsable de contenidos y marketing de ABM Estudio Contable (Parque Patricios, CABA).
Titular: Cra. Alejandra Mayta.
Públicos a atender:
1. Monotributistas y profesionales (inscripción, facturación electrónica, recategorizaciones).
2. PyMEs y comercios (liquidación de sueldos F.931, Libro de Sueldos Digital, IIBB Convenio Multilateral/AGIP, balances).
3. Personas que quieren crear una sociedad (SRL, SAS, SA, encuadre impositivo inicial).
Reglas:
- Español argentino cercano, claro y profesional.
- No prometas resultados milagrosos, gratuidad ni descuentos falsos.
- Siempre incluí el WhatsApp (${phoneDisplay}) y el sitio oficial (https://estudiocontableabm.com.ar).`;

  const userPrompt = `Generá 3 publicaciones listas para Instagram (con Gancho visual, Texto del carrusel/placa, Epígrafe completo con hashtags y CTA) para la semana del ${weekDate}.
Una para cada uno de los 3 públicos.
Novedades fiscales recientes detectadas en el portal de ABM:
${latestNews || 'Cambios en facturación electrónica de ARCA, libro de sueldos digital y recategorizaciones.'}
Formato de salida en Markdown prolijo.`;

  console.log('🤖 Redactando piezas con IA / Motor Editorial de ABM...');
  let aiContent = await generateWithAI(userPrompt, systemPrompt);

  if (!aiContent) {
    console.log('💡 Utilizando plantilla editorial estructurada de ABM (sin consumo de API)...');
    aiContent = `### 1. Monotributistas y Profesionales: Facturación y Modalidad Electrónica
**Placa / Carrusel (Idea Visual):**
> Fondo azul marino / terracota ABM.
> "¿Seguís usando talonarios o tenés dudas con tus facturas?
> Revisá cómo emitir comprobantes electrónicos según tu categoría."

**Epígrafe para Instagram:**
¿Sabías que ARCA amplió los requerimientos de emisión electrónica de comprobantes?
Si tenés dudas sobre tu modalidad de facturación, alta de puntos de venta o recategorizaciones, en **ABM Estudio Contable** podemos acompañarte para que operes con total tranquilidad.

📲 Escribinos directamente por WhatsApp para conversar sobre tu caso: [WhatsApp ABM](${whatsappLink('Hola Alejandra, quisiera consultar por mi facturación como monotributista.')})
🌐 Más información en nuestra web: https://estudiocontableabm.com.ar/servicios#monotributo

#Monotributo #FacturacionElectronica #ARCA #ContadorBuenosAires #ABMEstudioContable #ParquePatricios

---

### 2. PyMEs y Comercios: Sueldos, Cargas Sociales y Convenios
**Placa / Carrusel (Idea Visual):**
> "¿Tu empresa creció pero la administración quedó atrás?
> Liquidación de sueldos F. 931 · Libro de Sueldos Digital · Paritarias al día."

**Epígrafe para Instagram:**
Para las pymes y comercios que emplean personal, cumplir en tiempo y forma con el Libro de Sueldos Digital y las presentaciones de ARCA y sindicatos es la mejor prevención contra contingencias laborales.
En ABM te ofrecemos atención directa con la Cra. Alejandra Mayta para mantener la nómina y las cargas sociales ordenadas.

📲 Consultanos por tu empresa: [WhatsApp ABM](${whatsappLink('Hola, quisiéramos consultar sobre la liquidación de sueldos de nuestra empresa.')})
🌐 Conocé nuestros servicios para PyMEs: https://estudiocontableabm.com.ar/servicios#pymes

#PymesArgentina #LiquidacionDeSueldos #LibroDeSueldosDigital #ComerciosCABA #GestionContable #ParquePatricios

---

### 3. Nuevas Sociedades: El Primer Paso para Emprender
**Placa / Carrusel (Idea Visual):**
> "¿Vas a lanzar tu sociedad?
> SRL, SAS o SA: cómo elegir el tipo societario y encuadre fiscal antes de constituir."

**Epígrafe para Instagram:**
Armar una sociedad con socios requiere definir estatutos, objeto social, distribución de cuotas y encuadre tributario.
Antes de iniciar los trámites ante IGJ, conversemos para estructurar el proyecto con solidez.

📲 Coordinemos una charla de presentación: [WhatsApp ABM](${whatsappLink('Hola, queremos constituir una sociedad y quisiéramos asesoramiento.')})
🌐 Sección sociedades: https://estudiocontableabm.com.ar/servicios#crear-sociedad

#CrearSociedad #SRL #SAS #EmprendedoresArgentina #ConstitucionSocietaria #AsesoramientoFiscal`;
  }

  const fileHeader = `# Campaña Semanal de Marketing y Contenidos · ABM Estudio Contable
**Semana del:** ${weekDate}  
**Generado automáticamente en la nube:** ${new Date().toISOString()}  
**Canales de destino:** Instagram (@abm.estudiocontable) y Novedades de la Web  
**Contacto oficial:** WhatsApp: ${phoneDisplay} | Email: ${email} | Web: https://estudiocontableabm.com.ar

---

## 📢 Piezas de Contenido Preparadas para la Semana

${aiContent}

---

## ✅ Instrucciones de Difusión para Alejandra Mayta
1. **Instagram:** Copiar el epígrafe correspondiente, crear la placa en Canva (usando los colores azul marino #1b324b y terracota #8c2803) y programar o publicar en la cuenta oficial.
2. **Historias destacadas:** Compartir un sticker de preguntas o enlace directo al WhatsApp oficial precargado.
3. **Seguimiento comercial:** Registrar consultas entrantes en \`marketing/seguimiento.csv\`.
`;

  await writeFile(campanaFile, fileHeader, 'utf8');
  console.log(`\n✅ Campaña generada con éxito y guardada en:\n📁 ${campanaFile}\n`);
}

main().catch(err => {
  console.error('\n❌ Error al generar la campaña:', err.message);
  process.exit(1);
});
