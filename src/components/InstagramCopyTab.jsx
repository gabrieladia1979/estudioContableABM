import { useMemo, useState } from 'react';
import { Check, Copy, Download, ExternalLink, Instagram, Sparkles } from 'lucide-react';
import pregeneratedKits from '../data/instagramKits.json';
import {
  ABM_INSTAGRAM_HANDLE,
  ABM_SITE_ORIGIN,
  PINNED_POST_KITS,
  buildDeterministicInstagramKit,
  formatKitCarouselBlock,
} from '../utils/instagramKitFormatter';

const PROFILE_UPGRADES = [
  {
    id: 'profile-name',
    title: 'Nombre del perfil (SEO en Instagram)',
    text: 'Estudio Contable ABM · Contadora CABA',
  },
  {
    id: 'profile-bio',
    title: 'Biografía optimizada (copiar y pegar)',
    text: [
      '📊 Impuestos · Contabilidad · Sueldos',
      '👤 Monotributo · PyMEs · Sociedades',
      '📍 Parque Patricios, CABA | Atención directa de Alejandra Mayta',
      '📲 Consultas por DM o desde el link 👇',
    ].join('\n'),
  },
  {
    id: 'profile-link',
    title: 'Enlace de la biografía (reemplazar netlify.app)',
    text: `${ABM_SITE_ORIGIN}/?utm_source=instagram&utm_medium=bio&utm_campaign=perfil_abm`,
  },
];

const SLIDE_PALETTES = [
  { bg: '#1b324b', accent: '#F4E6CD', accentText: '#2B211D', text: '#FFFFFF', muted: '#BFD3E6', card: 'rgba(10, 22, 36, 0.45)' },
  { bg: '#102a43', accent: '#8c2803', accentText: '#FFFFFF', text: '#FFFFFF', muted: '#C8D8E6', card: 'rgba(255, 255, 255, 0.08)' },
  { bg: '#8c2803', accent: '#F4E6CD', accentText: '#2B211D', text: '#FFFFFF', muted: '#F7DCD0', card: 'rgba(27, 50, 75, 0.35)' },
];

function wrapCanvasLines(ctx, text, maxWidth) {
  const paragraphs = String(text || '').split('\n');
  const lines = [];
  for (const paragraph of paragraphs) {
    const words = paragraph.trim().split(/\s+/).filter(Boolean);
    if (!words.length) {
      lines.push('');
      continue;
    }
    let current = words[0];
    for (let i = 1; i < words.length; i += 1) {
      const candidate = `${current} ${words[i]}`;
      if (ctx.measureText(candidate).width <= maxWidth) {
        current = candidate;
      } else {
        lines.push(current);
        current = words[i];
      }
    }
    lines.push(current);
  }
  return lines;
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function renderSlidePngBlob(kit, slideIndex, paletteIndex = 0) {
  return new Promise((resolve, reject) => {
    const width = 1080;
    const height = 1350;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('El navegador no pudo crear el lienzo visual.'));
      return;
    }

    const palette = SLIDE_PALETTES[paletteIndex % SLIDE_PALETTES.length];
    const placa = kit.placas?.[slideIndex];
    if (!placa) {
      reject(new Error('Placa no disponible.'));
      return;
    }

    // Fondo principal de marca
    ctx.fillStyle = palette.bg;
    ctx.fillRect(0, 0, width, height);

    // Franja decorativa superior e inferior
    ctx.fillStyle = palette.accent;
    ctx.fillRect(0, 0, width, 16);

    // Encabezado con marca e indicador de placa
    ctx.fillStyle = palette.muted;
    ctx.font = '700 28px Inter, Segoe UI, Arial, sans-serif';
    ctx.fillText('ABM ESTUDIO CONTABLE', 84, 102);

    ctx.textAlign = 'right';
    ctx.fillText(`${slideIndex + 1} / ${kit.placas.length}`, width - 84, 102);
    ctx.textAlign = 'left';

    // Sticker / etiqueta superior
    ctx.font = '700 28px Inter, Segoe UI, Arial, sans-serif';
    const badgeLabel = String(placa.label || 'ABM').toUpperCase();
    const badgeWidth = Math.min(width - 168, ctx.measureText(badgeLabel).width + 64);
    drawRoundedRect(ctx, 84, 152, badgeWidth, 64, 18);
    ctx.fillStyle = palette.accent;
    ctx.fill();
    ctx.fillStyle = palette.accentText;
    ctx.fillText(badgeLabel, 116, 194);

    // Tarjeta central de alto contraste para lectura en celular
    drawRoundedRect(ctx, 72, 260, width - 144, 880, 32);
    ctx.fillStyle = palette.card;
    ctx.fill();

    // Título principal
    ctx.fillStyle = palette.text;
    ctx.font = '800 56px Inter, Segoe UI, Arial, sans-serif';
    const titleLines = wrapCanvasLines(ctx, placa.title, width - 220).slice(0, 5);
    let y = 368;
    for (const line of titleLines) {
      ctx.fillText(line, 116, y);
      y += 72;
    }

    // Separador sutil
    y += 18;
    ctx.fillStyle = palette.accent;
    ctx.fillRect(116, y, 120, 6);
    y += 66;

    // Cuerpo de texto
    ctx.fillStyle = palette.muted;
    ctx.font = '500 38px Inter, Segoe UI, Arial, sans-serif';
    const bodyLines = wrapCanvasLines(ctx, placa.body, width - 220).slice(0, 10);
    for (const line of bodyLines) {
      if (line) ctx.fillText(line, 116, y);
      y += 54;
    }

    // Pie de placa
    ctx.fillStyle = palette.text;
    ctx.font = '600 28px Inter, Segoe UI, Arial, sans-serif';
    const footerLines = wrapCanvasLines(ctx, placa.footer, width - 170).slice(0, 2);
    let fy = 1235;
    for (const line of footerLines) {
      ctx.fillText(line, 84, fy);
      fy += 38;
    }

    ctx.textAlign = 'right';
    ctx.fillStyle = palette.muted;
    ctx.font = '600 26px Inter, Segoe UI, Arial, sans-serif';
    ctx.fillText(ABM_INSTAGRAM_HANDLE, width - 84, 1270);
    ctx.textAlign = 'left';

    canvas.toBlob(blob => {
      if (blob) resolve(blob);
      else reject(new Error('No se pudo exportar la imagen PNG.'));
    }, 'image/png');
  });
}

async function copyTextSafe(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

export default function InstagramCopyTab({ liveArticles = [] }) {
  const [selectedId, setSelectedId] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [copiedKey, setCopiedKey] = useState('');
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [downloading, setDownloading] = useState('');

  const kits = useMemo(() => {
    const map = new Map();
    for (const item of Array.isArray(pregeneratedKits) ? pregeneratedKits : []) {
      if (item?.id) map.set(item.id, item);
    }
    for (const row of Array.isArray(liveArticles) ? liveArticles : []) {
      if (!row?.id || !['published', 'draft'].includes(row.status)) continue;
      if (!map.has(row.id)) {
        const normalized = {
          id: row.id,
          slug: row.slug || row.id,
          title: row.article?.title || row.title,
          summary: row.article?.summary || row.summary,
          sections: row.article?.sections || row.sections || [],
          category: row.category,
          service: row.service,
          publishedAt: row.publishedAt || row.updatedAt || row.createdAt,
          sources: row.verifiedSource
            ? [{ title: row.verifiedSource.title, url: row.verifiedSource.sourceUrl, date: row.verifiedSource.sourceDate }]
            : (row.sourceUrl ? [{ title: row.sourceName || row.title, url: row.sourceUrl, date: row.sourceDate }] : []),
        };
        if (normalized.title) map.set(row.id, buildDeterministicInstagramKit(normalized));
      }
    }
    for (const item of PINNED_POST_KITS) {
      if (item?.id && !map.has(item.id)) map.set(item.id, item);
    }
    return [...map.values()].sort((a, b) => String(b.publishedAt || '').localeCompare(String(a.publishedAt || '')));
  }, [liveArticles]);

  const categories = useMemo(
    () => ['Todas', ...new Set(kits.map(item => item.category).filter(Boolean))],
    [kits],
  );

  const visibleKits = useMemo(
    () => kits.filter(item => categoryFilter === 'Todas' || item.category === categoryFilter),
    [kits, categoryFilter],
  );

  const kit = visibleKits.find(item => item.id === selectedId) || visibleKits[0] || null;

  const handleCopy = async (key, text) => {
    try {
      await copyTextSafe(text);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(current => (current === key ? '' : current)), 2200);
    } catch {
      setCopiedKey('');
    }
  };

  const downloadSlide = async slideIndex => {
    if (!kit) return;
    setDownloading(`slide-${slideIndex}`);
    try {
      const blob = await renderSlidePngBlob(kit, slideIndex, paletteIndex);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `abm-${(kit.slug || 'post').slice(0, 14)}-placa-${slideIndex + 1}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } finally {
      setDownloading('');
    }
  };

  const downloadAllSlides = async () => {
    if (!kit?.placas?.length) return;
    setDownloading('all');
    try {
      for (let i = 0; i < kit.placas.length; i += 1) {
        const blob = await renderSlidePngBlob(kit, i, paletteIndex);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `abm-${(kit.slug || 'post').slice(0, 14)}-placa-${i + 1}.png`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    } finally {
      setDownloading('');
    }
  };

  return (
    <section aria-label="Kits de Instagram listos para copiar">
      <details className="ig-profile-card">
        <summary>
          <span>✨ Mejoras recomendadas para el perfil {ABM_INSTAGRAM_HANDLE} (bio, nombre y enlace listos para copiar)</span>
        </summary>
        <div className="ig-profile-grid">
          {PROFILE_UPGRADES.map(item => (
            <article key={item.id} className="ig-copy-box">
              <div className="ig-copy-box-head">
                <strong>{item.title}</strong>
                <button type="button" onClick={() => handleCopy(item.id, item.text)}>
                  {copiedKey === item.id ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedKey === item.id ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
              <pre>{item.text}</pre>
            </article>
          ))}
        </div>
      </details>

      <div className="news-editor-layout">
        <aside className="news-editor-list">
          <label>
            Categoría
            <select value={categoryFilter} onChange={event => setCategoryFilter(event.target.value)}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </label>
          {visibleKits.map(item => (
            <button
              type="button"
              key={item.id}
              className={kit?.id === item.id ? 'is-selected' : ''}
              onClick={() => setSelectedId(item.id)}
            >
              <small>{item.category} · {item.publishedDateAr}</small>
              <strong>{item.title}</strong>
              <span>{item.generatedBy}</span>
            </button>
          ))}
          {!visibleKits.length && <p className="p-4">No hay noticias cargadas para esta categoría.</p>}
        </aside>

        {kit ? (
          <article className="news-editor-detail">
            <div className="news-editor-meta">
              <span><Instagram size={12} className="inline mr-1" />Carrusel 5 placas</span>
              <span>{kit.category}</span>
              <span>Fuente: {kit.sourceName} ({kit.sourceDateAr})</span>
              <span>{kit.generatedBy}</span>
            </div>
            <h2>{kit.title}</h2>
            <div className="ig-top-actions">
              <button
                type="button"
                className="is-primary"
                onClick={() => handleCopy('epigrafe-top', kit.epigrafe)}
              >
                {copiedKey === 'epigrafe-top' ? <Check size={15} /> : <Copy size={15} />}
                <span>{copiedKey === 'epigrafe-top' ? 'Epígrafe copiado' : 'Copiar epígrafe completo'}</span>
              </button>
              <button
                type="button"
                onClick={() => handleCopy('carousel-all', formatKitCarouselBlock(kit))}
              >
                {copiedKey === 'carousel-all' ? <Check size={15} /> : <Copy size={15} />}
                <span>{copiedKey === 'carousel-all' ? '5 placas copiadas' : 'Copiar texto de las 5 placas'}</span>
              </button>
              <button
                type="button"
                disabled={Boolean(downloading)}
                onClick={downloadAllSlides}
              >
                <Download size={15} />
                <span>{downloading === 'all' ? 'Generando PNG…' : 'Descargar 5 placas PNG (1080×1350)'}</span>
              </button>
              <a href={kit.articleUrl} target="_blank" rel="noopener noreferrer" className="news-editor-source">
                Ver nota en la web <ExternalLink size={13} className="inline ml-1" />
              </a>
            </div>

            <div className="ig-palette-bar">
              <span><Sparkles size={14} className="inline mr-1" />Estilo visual para descarga PNG:</span>
              {['Azul ABM', 'Oscuro Clásico', 'Terracota ABM'].map((label, idx) => (
                <button
                  type="button"
                  key={label}
                  className={paletteIndex === idx ? 'is-primary' : ''}
                  onClick={() => setPaletteIndex(idx)}
                >
                  {label}
                </button>
              ))}
            </div>

            <h3 className="mt-6 mb-3">1. Textos del carrusel (placa por placa para Canva o PNG directo)</h3>
            <div className="ig-slides-grid">
              {kit.placas.map((placa, idx) => {
                const fullSlide = [placa.title, placa.body, placa.footer].filter(Boolean).join('\n\n');
                const key = `slide-${kit.id}-${idx}`;
                return (
                  <div key={key} className="ig-copy-box">
                    <div className="ig-copy-box-head">
                      <strong>Placa {idx + 1} · {placa.label}</strong>
                      <div className="ig-copy-btn-row">
                        <button type="button" onClick={() => handleCopy(key, fullSlide)}>
                          {copiedKey === key ? <Check size={14} /> : <Copy size={14} />}
                          <span>{copiedKey === key ? 'Copiado' : 'Copiar'}</span>
                        </button>
                        <button
                          type="button"
                          disabled={Boolean(downloading)}
                          onClick={() => downloadSlide(idx)}
                        >
                          <Download size={14} />
                          <span>{downloading === `slide-${idx}` ? '…' : 'PNG'}</span>
                        </button>
                      </div>
                    </div>
                    <pre>{fullSlide}</pre>
                  </div>
                );
              })}
            </div>

            <h3 className="mt-7 mb-3">2. Epígrafe listo para Instagram ({kit.epigrafe.length} caracteres)</h3>
            <div className="ig-copy-box">
              <div className="ig-copy-box-head">
                <strong>Texto + fuente + hashtags (sin enlaces rotos)</strong>
                <button type="button" onClick={() => handleCopy('epigrafe-main', kit.epigrafe)}>
                  {copiedKey === 'epigrafe-main' ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedKey === 'epigrafe-main' ? 'Copiado' : 'Copiar epígrafe'}</span>
                </button>
              </div>
              <pre>{kit.epigrafe}</pre>
            </div>

            <div className="ig-extras-grid mt-6">
              <div className="ig-copy-box">
                <div className="ig-copy-box-head">
                  <strong>3. Historia (Story) + Sticker con UTM</strong>
                  <div className="ig-copy-btn-row">
                    <button type="button" onClick={() => handleCopy('story-text', kit.historia?.texto || '')}>
                      {copiedKey === 'story-text' ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedKey === 'story-text' ? 'Copiado' : 'Texto'}</span>
                    </button>
                    <button type="button" onClick={() => handleCopy('story-url', kit.historia?.url || kit.articleUrl)}>
                      {copiedKey === 'story-url' ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedKey === 'story-url' ? 'Copiado' : 'Link UTM'}</span>
                    </button>
                  </div>
                </div>
                <pre>{`${kit.historia?.texto || ''}\n\nLink del sticker ("${kit.historia?.stickerTexto || 'Leer más'}"):\n${kit.historia?.url || kit.articleUrl}`}</pre>
              </div>

              <div className="ig-copy-box">
                <div className="ig-copy-box-head">
                  <strong>4. Texto alternativo y respuesta rápida DM</strong>
                  <div className="ig-copy-btn-row">
                    <button type="button" onClick={() => handleCopy('alt-text', kit.altText)}>
                      {copiedKey === 'alt-text' ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedKey === 'alt-text' ? 'Copiado' : 'Alt'}</span>
                    </button>
                    <button type="button" onClick={() => handleCopy('dm-reply', kit.dmReply)}>
                      {copiedKey === 'dm-reply' ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedKey === 'dm-reply' ? 'Copiado' : 'Respuesta DM'}</span>
                    </button>
                  </div>
                </div>
                <pre>{`ALT: ${kit.altText}\n\nRespuesta rápida DM / WhatsApp:\n${kit.dmReply}`}</pre>
              </div>
            </div>
          </article>
        ) : (
          <div className="news-editor-detail">
            <p>No hay kits de Instagram disponibles todavía.</p>
          </div>
        )}
      </div>
    </section>
  );
}
