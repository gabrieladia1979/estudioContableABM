// src/components/sections/Hero.jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    fade: true,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ],
  };

  const slides = [
    {
      title: "SERVICIO PROFESIONAL",
      subtitle: "ESTUDIO CONTABLE",
      description: "Impuestos - Auditoría y Contabilidad - Sueldos y Cargas Sociales",
      backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "¿POR QUÉ ELEGIRNOS?",
      subtitle: "PROFESIONALISMO",
      description: "Brindamos soluciones impositivas y contables con profesionalismo, responsabilidad y alta dedicación hacia el cliente.",
      backgroundImage: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80"
    },
    {
      title: "SOLUCIONES A MEDIDA",
      subtitle: "EXPERIENCIA",
      description: "Utilizamos las técnicas profesionales impositivas y contables con alta calidad, adaptándolas a las necesidades particulares de cada cliente.",
      backgroundImage: "/icons/image2.png"
    }
  ];

  return (
    <section className="relative hero-carousel-wrapper">
      {/* Estilos específicos para react-slick que son difíciles de sobreescribir con Tailwind */}
      <style>{`
        .hero-carousel-wrapper .slick-dots {
          bottom: 40px;
        }
        .hero-carousel-wrapper .slick-dots li button:before {
          font-size: 14px;
          color: white;
          opacity: 0.6;
        }
        .hero-carousel-wrapper .slick-dots li.slick-active button:before {
          opacity: 1;
          color: #ef4444; /* red-500 */
        }
        .hero-carousel-wrapper .slick-prev, .hero-carousel-wrapper .slick-next {
          z-index: 20;
          width: 60px;
          height: 60px;
        }
        .hero-carousel-wrapper .slick-prev { left: 25px; }
        .hero-carousel-wrapper .slick-next { right: 25px; }
        .hero-carousel-wrapper .slick-prev:before, .hero-carousel-wrapper .slick-next:before {
          font-size: 30px;
          opacity: 0.8;
        }
        @media (max-width: 768px) {
          .hero-carousel-wrapper .slick-prev, .hero-carousel-wrapper .slick-next {
            display: none !important;
          }
          .hero-carousel-wrapper .slick-dots {
            bottom: 20px;
          }
        }
      `}</style>

      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <div className="relative h-[80vh] overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[0.4]"
                style={{ backgroundImage: `url(${slide.backgroundImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto text-center">
                    <p className="text-white text-sm md:text-lg mb-6 tracking-[0.2em] animate-fade-in-up font-inter uppercase">
                      {slide.title}
                    </p>
                    <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight animate-fade-in-up-delay font-inter tracking-tight">
                      {slide.subtitle}
                    </h1>
                    <div className="w-24 h-1 bg-red-500 mb-8 animate-fade-in-up-delay mx-auto"></div>
                    <p className="text-white text-lg md:text-xl mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-in-up-delay font-inter">
                      {slide.description}
                    </p>
                    <div className="animate-fade-in-up-delay-2">
                      <a
                        href="https://beacons.ai/abm_mayta?fbclid=PAZXh0bgNhZW0CMTEAAafbrnFvlsV9KYwBnfTszOCwUp0e-tDdSe9UJfXN1A2Z3C_NZzUECu2CTIQvtw_aem_Y1SwIHQWqhgxnUUErb3sDQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-semibold py-4 px-10 transition-all duration-300 text-lg tracking-[0.1em] hover:scale-105 transform font-inter uppercase"
                      >
                        CONTACTAR AHORA
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Hero;