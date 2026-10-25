const photo = name => ({
  src: `/accounting/${name}-1672.webp`,
  srcSet: `/accounting/${name}-960.webp 960w, /accounting/${name}-1672.webp 1672w`,
  width: 1672,
  height: 941,
});

export const accountingImages = {
  contabilidad: photo('contabilidad'),
  monotributo: photo('monotributo'),
  asesoramiento: photo('asesoramiento'),
};
