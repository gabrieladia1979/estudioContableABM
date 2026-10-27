// Borradores propios de ejemplo. Nunca forman parte del paquete público del sitio.
export const seedDrafts = [
  {
    id: 'ejemplo-ganancias-sociedades', title: 'Ganancias de sociedades: cómo preparar el cambio al servicio web',
    category: 'Impuestos', service: 'asesoramiento-tributario', sourceName: 'ARCA', sourceKind: 'official',
    sourceUrl: 'https://servicioscf.arca.gob.ar/publico/sitio/contenido/novedad/ver.aspx?id=5979', sourceDate: '2026-10-19',
    article: {
      title: 'Ganancias de sociedades: cómo preparar el cambio al servicio web',
      summary: 'El nuevo servicio de ARCA propone una transición en la presentación de Ganancias. Qué información conviene ordenar antes de utilizarlo.',
      sections: [
        { heading: 'Identificar el ejercicio', text: 'La publicación de ARCA distingue el tratamiento según la fecha de cierre comercial. Antes de elegir cómo presentar, revisá con tu contador qué período estás liquidando y por qué vía se presentó la declaración original.' },
        { heading: 'Revisar la información disponible', text: 'Una precarga de datos facilita el trabajo, pero requiere control. Reuní el balance, las declaraciones anteriores y el detalle de retenciones y pagos para identificar diferencias.' },
        { heading: 'Planificar la transición', text: 'En ABM podemos revisar la documentación de tu sociedad y organizar las tareas necesarias para la presentación. El alcance se define según el ejercicio y la situación de cada empresa.' },
      ],
    },
  },
  {
    id: 'ejemplo-monotributo-deuda', title: 'Deuda de monotributo: qué revisar antes de regularizar',
    category: 'Monotributo', service: 'monotributo', sourceName: 'ARCA', sourceKind: 'official',
    sourceUrl: 'https://servicioscf.arca.gob.ar/publico/sitio/contenido/novedad/ver.aspx?id=5980', sourceDate: '2026-10-19',
    article: {
      title: 'Deuda de monotributo: qué revisar antes de regularizar',
      summary: 'Identificar períodos, pagos e intereses ayuda a ordenar la consulta y evaluar cómo ponerse al día.',
      sections: [
        { heading: 'Consultar la cuenta', text: 'ARCA señala la Cuenta Corriente de Monotributistas y Autónomos como una herramienta para consultar la deuda. Revisar el detalle permite distinguir períodos pendientes e intereses.' },
        { heading: 'Reunir los comprobantes', text: 'Guardá los pagos realizados y anotá los meses que querés revisar. Si detectás diferencias, conviene analizarlas antes de volver a pagar o elegir una alternativa de regularización.' },
        { heading: 'Evaluar tu situación', text: 'Una consulta puede servir para ordenar los saldos y revisar cómo continuar con tu actividad. Contanos qué períodos aparecen pendientes; la documentación se solicita luego por un canal acordado con el estudio.' },
      ],
    },
  },
  {
    id: 'ejemplo-recibo-asistido', title: 'Casas particulares: qué controlar en un recibo asistido',
    category: 'Sueldos', service: 'sueldos', sourceName: 'ARCA', sourceKind: 'official',
    sourceUrl: 'https://servicioscf.arca.gob.ar/publico/sitio/contenido/novedad/ver.aspx?id=5978', sourceDate: '2026-10-14',
    article: {
      title: 'Casas particulares: qué controlar en un recibo asistido',
      summary: 'La asistencia del sistema facilita la confección del recibo. Revisar la liquidación y guardar el comprobante de pago sigue siendo necesario.',
      sections: [
        { heading: 'Controlar los conceptos', text: 'ARCA informó que el empleador puede revisar y modificar los importes propuestos por la herramienta. Antes de emitir el recibo, verificá que los conceptos correspondan a la relación laboral.' },
        { heading: 'Organizar los respaldos', text: 'El recibo y la constancia de transferencia cumplen funciones diferentes. Conservar ambos facilita el seguimiento de los haberes abonados.' },
        { heading: 'Preparar la consulta', text: 'Para revisar una liquidación, reuní la información del período, la categoría, la jornada y las novedades que puedan influir. El estudio podrá indicarte qué documentación adicional hace falta.' },
      ],
    },
  },
];
