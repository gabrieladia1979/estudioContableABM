export default function PageHeading({ title, description }) {
  return <section className="page-heading"><div className="container mx-auto px-6"><div className="page-heading-inner"><div><p className="page-heading-eyebrow">ABM Estudio Contable</p><h1>{title}</h1></div>{description && <p className="page-heading-description">{description}</p>}</div></div></section>;
}
