// src/data/servicesData.jsx

// Ya no necesitamos importar los íconos de react-icons
// import React from 'react';
// import { FaCalculator, FaBuilding, FaUserFriends, FaHandHoldingUsd, FaStore, FaMoneyBillWave } from 'react-icons/fa';

// Asumimos que has guardado los nuevos íconos en la carpeta `public/icons`
export const servicesData = [
  {
    id: 'asesoramiento-tributario',
    icon: '/icons/asesoramiento-tributario.png', // Ruta a la imagen del ícono
    title: 'Asesoramiento Tributario',
    description: 'Orientación y gestión de impuestos según tu actividad y situación.'
  },
  {
    id: 'contabilidad-balances',
    icon: '/icons/contabilidad-balances.png', // Ruta a la imagen del ícono
    title: 'Contabilidad y Balances',
    description: 'Información contable ordenada para cumplir obligaciones y tomar decisiones.'
  },
  {
    id: 'sueldos',
    icon: '/icons/sueldos.png', // Ruta a la imagen del ícono
    title: 'Sueldos',
    description: 'Liquidación de haberes y seguimiento de las obligaciones laborales.'
  },
  {
    id: 'empresas-sociedades',
    icon: '/icons/empresas-sociedades.png', // Ruta a la imagen del ícono
    title: 'Empresas y Sociedades',
    description: 'Acompañamiento contable e impositivo para la operación de tu empresa.'
  },
  {
    id: 'pymes',
    icon: '/icons/pymes.png', // Ruta a la imagen del ícono
    title: 'Pymes',
    description: 'Soporte para ordenar procesos y tener más claridad sobre el negocio.'
  },
  {
    id: 'personas',
    icon: '/icons/personas.png', // Ruta a la imagen del ícono
    title: 'Personas',
    description: 'Asesoramiento para profesionales, autónomos y otras personas físicas.'
  }
];
