export const phoneDisplay = '+54 11 6817 2147';
export const phoneHref = 'tel:+541168172147';
export const email = 'abm.estudio.contable.00@gmail.com';
export const whatsappLink = (message = 'Hola, quisiera hacer una consulta al Estudio Contable ABM.') =>
  `https://wa.me/541168172147?text=${encodeURIComponent(message)}`;
