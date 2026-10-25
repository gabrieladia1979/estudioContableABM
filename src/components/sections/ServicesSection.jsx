import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { serviceGroups } from '../../data/serviceGroups';

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const track = useRef(null);
  const selected = serviceGroups[active];
  const select = index => {
    const next = (index + serviceGroups.length) % serviceGroups.length;
    setActive(next);
    const card = track.current?.children[next];
    if (card) track.current.scrollTo({ left: card.offsetLeft - track.current.offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return <section id="servicios" className="py-20 md:py-24">
    <div className="container mx-auto px-6">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-3xl"><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent-700">Servicios · 5 áreas</p><h2 className="text-3xl font-bold tracking-tight text-primary-950 md:text-4xl">Encontrá el área que necesitás.</h2><p className="mt-4 text-lg text-primary-700">Explorá nuestros servicios y las consultas que podemos acompañar.</p></div>
        <div className="flex gap-2"><button type="button" onClick={() => select(active - 1)} aria-label="Área de servicio anterior" className="rounded-full border border-primary-300 bg-white p-3 text-primary-900 hover:bg-primary-50"><ArrowLeft size={20} /></button><button type="button" onClick={() => select(active + 1)} aria-label="Área de servicio siguiente" className="rounded-full bg-primary-900 p-3 text-white hover:bg-primary-800"><ArrowRight size={20} /></button></div>
      </div>
      <div ref={track} className="service-carousel" role="tablist" aria-label="Áreas de servicios" onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); const next = (active + (event.key === 'ArrowRight' ? 1 : -1) + serviceGroups.length) % serviceGroups.length; select(next); track.current.children[next].focus(); } }}>
        {serviceGroups.map((group, index) => <button key={group.id} id={`service-tab-${group.id}`} type="button" role="tab" aria-selected={active === index} aria-controls="service-area-panel" tabIndex={active === index ? 0 : -1} onClick={() => select(index)} className={`service-photo-card group ${active === index ? 'is-active' : ''}`}>
          <img src={group.image} alt="" loading="lazy" style={{ objectPosition: group.position }} />
          <span className="service-card-shade" />
          <span className="relative z-10 flex h-full flex-col justify-between p-6 text-left text-white"><span className="text-xs font-semibold tracking-[0.16em]">0{index + 1} / 05</span><span><span className="mb-4 block text-2xl font-bold leading-tight">{group.title}</span><span className="inline-flex items-center gap-2 text-sm font-semibold">Explorar área <ArrowUpRight size={18} /></span></span></span>
        </button>)}
      </div>
      <div id="service-area-panel" role="tabpanel" aria-labelledby={`service-tab-${selected.id}`} className="mt-6 grid gap-6 rounded-2xl border border-primary-100 bg-white/95 p-7 md:grid-cols-[0.8fr_1.2fr] md:p-9">
        <div><h3 className="text-2xl font-bold text-primary-950">{selected.title}</h3><p className="mt-3 leading-relaxed text-primary-700">{selected.description}</p></div>
        <div className="grid content-center gap-3">{selected.links.map(([label, to]) => <Link key={label} to={to} className="flex items-center justify-between gap-4 border-b border-primary-100 py-3 font-semibold text-primary-900 transition hover:text-accent-700">{label}<ArrowUpRight size={18} className="shrink-0" /></Link>)}</div>
      </div>
    </div>
  </section>;
}
