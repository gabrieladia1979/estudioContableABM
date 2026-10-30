export default function PageHeading({ title, description, action }) {
  return <section className="page-heading"><div className="container mx-auto px-6"><div className="page-heading-inner"><div><p className="page-heading-eyebrow">ABM Estudio Contable</p><h1>{title}</h1></div>{(description || action) && <div>{description && <p className="page-heading-description">{description}</p>}{action && <a className="page-heading-action" href={action.href}>{action.label} <span aria-hidden="true">↗</span></a>}</div>}</div></div></section>;
}
