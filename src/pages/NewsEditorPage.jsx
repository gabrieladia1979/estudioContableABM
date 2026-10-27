import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const states = { candidate: 'Tema detectado', draft: 'Borrador', generating: 'Generando', published: 'Publicado', archived: 'Archivado' };
const date = value => !value ? 'Fecha por verificar' : /^\d{4}-\d{2}-\d{2}$/.test(value) ? value.split('-').reverse().join('/') : new Date(value).toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });

function EditorDetail({ row, onAction, busy, aiReady }) {
  const [article, setArticle] = useState(row.article || { title: '', summary: '', sections: [{ heading: '', text: '' }, { heading: '', text: '' }] });
  const [officialUrl, setOfficialUrl] = useState(row.verifiedSource?.sourceUrl || (row.sourceKind === 'official' ? row.sourceUrl : ''));
  const [reviewed, setReviewed] = useState(false);
  const dirty = JSON.stringify(article) !== JSON.stringify(row.article || { title: '', summary: '', sections: [{ heading: '', text: '' }, { heading: '', text: '' }] });
  const published = row.status === 'published';
  const updateSection = (index, field, value) => setArticle(current => ({ ...current, sections: current.sections.map((section, i) => i === index ? { ...section, [field]: value } : section) }));
  const action = (name, extra = {}) => onAction({ action: name, id: row.id, version: row.version, ...extra });
  return <article className="news-editor-detail">
    <div className="news-editor-meta"><span>{states[row.status]}</span><span>{row.category}</span><span>Prioridad temática: {row.score || 0}/100</span></div>
    <h2>{row.title}</h2>
    <p className="text-sm text-primary-700">Detectado en {row.sourceName} · {date(row.sourceDate)}</p>
    <a href={row.sourceUrl} target="_blank" rel="noopener noreferrer" className="news-editor-source">Abrir publicación de referencia ↗</a>
    <p className="mt-2 text-xs text-primary-600">Palabras detectadas: {row.keywords?.join(', ') || 'Ejemplo preparado para revisión'}. La prioridad es una estimación de relevancia, no una medición de visitas.</p>
    <div className="news-editor-source-box">
      <h3>1. Vincular la fuente oficial</h3>
      <label>Enlace de la publicación del organismo<input type="url" value={officialUrl} onChange={event => setOfficialUrl(event.target.value)} placeholder="https://servicioscf.arca.gob.ar/..." disabled={busy || published} /></label>
      <button type="button" onClick={() => action('verify', { officialUrl })} disabled={busy || published || !officialUrl.trim()}>Verificar fuente</button>
      {row.verifiedSource && <div className="mt-3 text-sm text-primary-800"><strong>{row.verifiedSource.title}</strong><p>Publicación: {date(row.verifiedSource.sourceDate)}</p><details className="mt-2"><summary className="cursor-pointer">Ver extracto de respaldo</summary><p className="mt-2 leading-relaxed">{row.verifiedSource.evidence}</p></details></div>}
    </div>
    <div className="mt-7 flex flex-wrap items-center justify-between gap-3"><h3>2. Preparar y revisar el borrador</h3><button type="button" onClick={() => action('generate')} disabled={busy || published || !aiReady || !row.verifiedSource}>Redactar con IA</button></div>
    {!aiReady && <p className="mt-2 text-sm text-primary-600">La redacción automática se habilita al configurar la clave y el modelo de IA en el servidor. Podés escribir y editar manualmente.</p>}
    {!!row.reviewNotes?.length && <div className="news-editor-checks"><strong>Para revisar</strong><ul>{row.reviewNotes.map((note, index) => <li key={index}>{note}</li>)}</ul></div>}
    <fieldset disabled={busy || published} className="mt-5 grid gap-4">
      <label>Título propio<input maxLength={180} value={article.title} onChange={event => setArticle({ ...article, title: event.target.value })} /></label>
      <label>Resumen<textarea rows={3} maxLength={600} value={article.summary} onChange={event => setArticle({ ...article, summary: event.target.value })} /></label>
      {article.sections.map((section, index) => <div key={index} className="news-editor-section"><label>Sección {index + 1}<input maxLength={140} value={section.heading} onChange={event => updateSection(index, 'heading', event.target.value)} /></label><label>Texto<textarea rows={4} maxLength={2500} value={section.text} onChange={event => updateSection(index, 'text', event.target.value)} /></label></div>)}
      {article.sections.length < 6 && <button type="button" onClick={() => setArticle({ ...article, sections: [...article.sections, { heading: '', text: '' }] })}>Agregar sección</button>}
      <button type="button" className="is-primary" onClick={() => action('save', { article })}>Guardar borrador</button>
    </fieldset>
    <div className="news-editor-publish">
      <h3>3. Publicación</h3>
      {published ? <><p>Visible en Noticias desde el {date(row.publishedAt)}.</p><Link className="news-editor-source" to={'/novedades/' + row.id}>Ver nota publicada</Link><button type="button" onClick={() => action('unpublish')} disabled={busy}>Retirar y volver a borrador</button></> : <><label className="news-editor-confirm"><input type="checkbox" checked={reviewed} onChange={event => setReviewed(event.target.checked)} />Revisé el texto, la fuente oficial, el alcance y la vigencia de la información.</label>{dirty && <p className="text-sm">Guardá los cambios antes de publicar.</p>}<button type="button" className="is-primary" onClick={() => action('publish', { reviewed })} disabled={busy || dirty || !reviewed || !row.article || !row.verifiedSource}>Publicar nota revisada</button><button type="button" onClick={() => action('archive')} disabled={busy}>Archivar</button></>}
    </div>
  </article>;
}

export default function NewsEditorPage() {
  const [accessKey, setAccessKey] = useState('');
  const [sessionExpiresAt, setSessionExpiresAt] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [selected, setSelected] = useState('');
  const [filter, setFilter] = useState('pending');
  const [refresh, setRefresh] = useState(0);
  const [loginNeeded, setLoginNeeded] = useState(false);
  const pendingRead = useRef(null);
  const endSession = () => { pendingRead.current?.abort(); setData(null); setSelected(''); setSessionExpiresAt(null); setAccessKey(''); setLoginNeeded(true); };
  useEffect(() => {
    const tag = document.createElement('meta'); tag.name = 'robots'; tag.content = 'noindex,nofollow'; document.head.appendChild(tag);
    return () => tag.remove();
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    pendingRead.current = controller;
    fetch('/api/news/admin', { credentials: 'same-origin', cache: 'no-store', signal: controller.signal }).then(async response => {
      const result = await response.json();
      if (controller.signal.aborted) return;
      if (!response.ok) { if (response.status === 401) { setData(null); setLoginNeeded(true); } throw new Error(result.error || 'No se pudo abrir la bandeja'); }
      const expiresAt = Number(response.headers.get('X-Editor-Session-Expires')) || null;
      if (expiresAt && expiresAt <= Date.now()) { setData(null); setLoginNeeded(true); return; }
      setSessionExpiresAt(expiresAt);
      setData(result); setLoginNeeded(false);
    }).catch(failure => { if (failure.name !== 'AbortError') setError(failure.message); });
    return () => controller.abort();
  }, [refresh]);
  useEffect(() => {
    if (!sessionExpiresAt) return;
    const timer = window.setTimeout(() => { pendingRead.current?.abort(); setData(null); setSessionExpiresAt(null); setLoginNeeded(true); setAccessKey(''); setError('La sesión venció. Volvé a ingresar.'); }, Math.max(0, sessionExpiresAt - Date.now()));
    return () => window.clearTimeout(timer);
  }, [sessionExpiresAt]);
  const login = async event => {
    event.preventDefault(); setBusy(true); setError('');
    try {
      const response = await fetch('/api/news/session', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: accessKey }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'No se pudo ingresar');
      setLoginNeeded(false); setRefresh(value => value + 1);
    } catch (failure) { setError(failure.message); }
    finally { setAccessKey(''); setBusy(false); }
  };
  const logout = async () => {
    try {
      const response = await fetch('/api/news/session', { method: 'DELETE', credentials: 'same-origin' });
      if (!response.ok) throw new Error('No se pudo cerrar la sesión. Volvé a intentar.');
      endSession(); setError('');
    } catch (failure) { setError(failure.message); }
  };
  const act = async body => {
    setBusy(true); setError('');
    try {
      const response = await fetch('/api/news/admin', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const result = await response.json();
      if (!response.ok) { if (response.status === 401) endSession(); throw new Error(result.error || 'No se pudo completar la operación'); }
      setRefresh(value => value + 1);
    } catch (failure) { setError(failure.message); }
    finally { setBusy(false); }
  };
  const rows = data?.articles.filter(row => filter === 'pending' ? !['published', 'archived'].includes(row.status) : row.status === filter) || [];
  const row = rows.find(item => item.id === selected) || rows[0];
  return <main className="news-editor">
    <header className="news-editor-header"><div><Link to="/">ABM · Volver al sitio</Link><h1>Editor de noticias</h1><p>Búsqueda de temas y borradores propios para revisar antes de publicar.</p></div>{data && <div className="flex flex-wrap gap-2"><button disabled={busy} onClick={() => act({ action: 'scan' })}>{busy ? 'Procesando…' : 'Buscar novedades'}</button><button disabled={busy} onClick={() => { setError(''); setRefresh(value => value + 1); }}>Recargar bandeja</button>{!data.local && <button disabled={busy} onClick={logout}>Cerrar sesión</button>}</div>}</header>
    {error && <p role="alert" className="news-editor-error">{error}</p>}
    {loginNeeded && <form className="news-editor-login" onSubmit={login}><label>Clave privada del editor<input type="password" required maxLength={512} autoComplete="current-password" value={accessKey} onChange={event => setAccessKey(event.target.value)} /></label><button disabled={busy} className="is-primary">{busy ? 'Ingresando…' : 'Ingresar'}</button></form>}
    {data && <><div className="news-editor-status">{data.local && <strong>Vista local · las publicaciones se guardan solo en esta PC.</strong>}<span>Última búsqueda: {data.scan ? date(data.scan.checkedAt) : 'Todavía no se realizó'}</span><span>{data.aiReady ? 'IA configurada' : 'Redacción manual disponible'}</span></div>
      {data.scan && <details className="mb-5 rounded-xl border border-primary-100 bg-white p-4"><summary className="cursor-pointer">Estado de las fuentes consultadas</summary><ul className="mt-3 grid gap-2 text-sm">{data.scan.sources.map(source => <li key={source.name}>{source.name}: {source.ok ? source.count + ' publicaciones detectadas' : source.error}</li>)}</ul></details>}
      <div className="news-editor-layout"><aside className="news-editor-list"><label>Mostrar<select value={filter} onChange={event => setFilter(event.target.value)}><option value="pending">Pendientes</option><option value="draft">Borradores</option><option value="published">Publicadas</option><option value="archived">Archivadas</option></select></label>{rows.map(item => <button key={item.id} className={row?.id === item.id ? 'is-selected' : ''} onClick={() => setSelected(item.id)}><small>{states[item.status]} · {item.sourceName}</small><strong>{item.article?.title || item.title}</strong><span>{item.category} · {date(item.sourceDate)}</span></button>)}{!rows.length && <p className="p-4">No hay notas en esta vista.</p>}</aside>{row ? <EditorDetail key={row.id + row.version} row={row} onAction={act} busy={busy} aiReady={data.aiReady} /> : <div className="news-editor-detail"><p>Buscá novedades o cargá los ejemplos editoriales.</p><button className="mt-4" onClick={() => act({ action: 'examples' })} disabled={busy}>Cargar tres ejemplos</button></div>}</div>
    </>}
  </main>;
}
