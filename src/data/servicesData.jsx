// src/data/servicesData.jsx

// Ya no necesitamos importar los íconos de react-icons
// import React from 'react';
// import { FaCalculator, FaBuilding, FaUserFriends, FaHandHoldingUsd, FaStore, FaMoneyBillWave } from 'react-icons/fa';

// Asumimos que has guardado los nuevos íconos en la carpeta `public/icons`
export const servicesData = [
  {
    id: 'tributario',
    icon: '/icons/asesoramiento-tributario.png', // Ruta a la imagen del ícono
    title: 'Asesoramiento Tributario',
    description: 'Ganancias, bienes, IVA, ingresos brutos.'
  },
  {
    id: 'contabilidad',
    icon: '/icons/contabilidad-balances.png', // Ruta a la imagen del ícono
    title: 'Contabilidad y Balances',
    description: 'Auditoría y servicios contables para empresas.'
  },
  {
    id: 'sueldos',
    icon: '/icons/sueldos.png', // Ruta a la imagen del ícono
    title: 'Sueldos',
    description: 'Liquidación de sueldos y cargas sociales.'
  },
  {
    id: 'sociedades',
    icon: '/icons/empresas-sociedades.png', // Ruta a la imagen del ícono
    title: 'Empresas y Sociedades',
    description: 'Asesoramiento integral a empresas grandes y medianas.'
  },
  {
    id: 'pymes',
    icon: '/icons/pymes.png', // Ruta a la imagen del ícono
    title: 'Pymes',
    description: 'Asesoramiento integral a empresas pequeñas y familiares.'
  },
  {
    id: 'personas',
    icon: '/icons/personas.png', // Ruta a la imagen del ícono
    title: 'Personas',
    description: 'Físicas, Autónomos, Ganancias y Bienes Personales.'
  }
];