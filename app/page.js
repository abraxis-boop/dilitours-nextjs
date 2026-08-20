'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { destinos } from '../data/destinos';
import { testimonios } from '../data/testimonios';
import { agency } from '../data/agency';
import DestinationCard from '../components/DestinationCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useScrollReveal from '../hooks/useScrollReveal';

const stats = [
  { value: `${agency.experience.years}+`, label: 'Año de experiencia' },
  { value: `${agency.experience.destinations}+`, label: 'Destinos disponibles' },
  { value: `${agency.experience.travelersLabel}`, label: 'Viajeros felices' },
  { value: `${agency.experience.rating}★`, label: 'Calificación promedio' },
];

const ventajas = [
  {
    icon: '🛡️',
    titulo: 'Viaje Seguro',
    desc: 'Incluimos seguro de viaje en todos nuestros paquetes para que viajes sin preocupaciones.'
  },
  {
    icon: '💎',
    titulo: 'Mejor Precio',
    desc: 'Garantizamos el mejor precio del mercado. Si encuentras uno más bajo, lo igualamos.'
  },
  {
    icon: '🌍',
    titulo: 'Expertos Locales',
    desc: 'Nuestros guías son expertos locales que conocen cada destino a la perfección.'
  },
  {
    icon: '📞',
    titulo: 'Soporte 24/7',
    desc: 'Estamos contigo durante todo tu viaje. Disponibles las 24 horas, los 7 días.'
  }
];

export default function Home() {
  useScrollReveal();
  const destacados = destinos.filter(d => d.destacado).slice(0, 6);
  const [testiIdx, setTestiIdx] = useState(0);

  const prev = () => setTestiIdx(i => (i === 0 ? testimonios.length - 1 : i - 1));
  const next = () => setTestiIdx(i => (i === testimonios.length - 1 ? 0 : i + 1));

  const t = testimonios[testiIdx];

  return (
    <>
      <Navbar />
      <main>
        <section className="home-hero">
          <div className="home-hero__bg">
            <Image
              src="/hero_banner.jpg"
              alt="Destinos de ensueño con Dilitours"
              fill
              priority
              className="home-hero__img"
              sizes="100vw"
              quality={85}
            />
            <div className="home-hero__overlay" />
          </div>
          <div className="container home-hero__content">
            <div className="home-hero__badge animate-fade-up">Tu próxima aventura te espera</div>
            <h1 className="home-hero__title animate-fade-up-delay-1">
              Viajes que se<br />
              <span className="home-hero__title-accent">convierten en recuerdos</span>
            </h1>
            <p className="home-hero__sub animate-fade-up-delay-2">
              Descubre el mundo con Dilitours. Paquetes diseñados para cada tipo de viajero, con la calidad y el servicio que mereces.
            </p>
            <div className="home-hero__actions animate-fade-up-delay-3">
              <Link href="/destinos" className="btn btn-primary btn-lg">
                Explorar destinos
              </Link>
              <Link href="/cotizacion" className="btn btn-outline btn-lg">
                Cotizar mi viaje
              </Link>
            </div>
          </div>
          <div className="home-hero__scroll-line" />
        </section>

        <section className="home-stats" data-reveal>
          <div className="container">
            <div className="home-stats__grid">
              {stats.map((s, i) => (
                <div key={i} className="home-stats__item" data-reveal={'delay-' + (i + 1)}>
                  <span className="home-stats__value">{s.value}</span>
                  <span className="home-stats__label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--light-bg)' }} data-reveal>
          <div className="container">
            <div className="section-header">
              <div className="badge">Destinos Populares</div>
              <h2>Escapes que <span style={{ color: 'var(--primary)' }}>enamoran</span></h2>
              <p>Seleccionamos los mejores destinos para cada tipo de viajero. ¿Cuál es el tuyo?</p>
            </div>
            <div className="grid-3">
              {destacados.map(d => (
                <DestinationCard key={d.id} destino={d} />
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <Link href="/destinos" className="btn btn-outline-dark btn-lg">
                Ver todos los destinos →
              </Link>
            </div>
          </div>
        </section>

        <section className="section" data-reveal>
          <div className="container">
            <div className="section-header">
              <div className="badge">¿Por qué elegirnos?</div>
              <h2>Viaja con <span style={{ color: 'var(--primary)' }}>tranquilidad</span></h2>
              <p>Creamos experiencias perfectas para cada viajero con la atención que mereces.</p>
            </div>
            <div className="grid-4">
              {ventajas.map((v, i) => (
                <div key={i} className="ventaja-card" data-reveal={'delay-' + (i + 1)}>
                  <div className="ventaja-card__icon">{v.icon}</div>
                  <h3>{v.titulo}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="home-cars-banner" data-reveal>
          <div className="home-cars-banner__img">
            <Image
              src="/cars_fleet.jpg"
              alt="Renta de autos Dilitours"
              width={800}
              height={500}
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={80}
            />
          </div>
          <div className="home-cars-banner__content">
            <div className="badge" style={{ background: 'rgba(0,151,178,0.15)', color: '#0097b2', border: '1px solid rgba(0,151,178,0.3)' }}>
              Nuevo servicio
            </div>
            <h2>Renta de Autos con <span style={{ color: 'var(--primary)' }}>Dilitours</span></h2>
            <p>
              Complementa tu viaje con nuestra flota de vehículos premium. Sedanes, SUVs y vans disponibles con conductor o sin conductor.
            </p>
            <ul className="home-cars-banner__list">
              <li>Flota moderna del año</li>
              <li>Seguro incluido</li>
              <li>GPS sin costo adicional</li>
              <li>Entrega en tu hotel</li>
            </ul>
            <Link href="/renta-autos" className="btn btn-primary btn-lg">
              Ver vehículos disponibles
            </Link>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--light-bg)' }} data-reveal>
          <div className="container">
            <div className="section-header">
              <div className="badge">Testimonios</div>
              <h2>Lo que dicen nuestros <span style={{ color: 'var(--primary)' }}>viajeros</span></h2>
              <p>Nuestros clientes ya confiaron en nosotros. Estas son sus historias.</p>
            </div>
            <div className="testi-carousel">
              <button onClick={prev} className="testi-arrow testi-arrow--prev" aria-label="Anterior">‹</button>
              <div className="testi-card">
                <div className="testi-card__top">
                  <div className="testi-card__avatar">{t.avatar}</div>
                  <div>
                    <p className="testi-card__name">{t.nombre}</p>
                    <p className="testi-card__origin">{t.origen}</p>
                    <div className="testi-card__stars">
                      {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                    </div>
                  </div>
                  <div className="testi-card__badge">{t.viaje}</div>
                </div>
                <blockquote className="testi-card__quote">
                  &ldquo;{t.texto}&rdquo;
                </blockquote>
                <p className="testi-card__date">{t.fecha}</p>
              </div>
              <button onClick={next} className="testi-arrow testi-arrow--next" aria-label="Siguiente">›</button>
            </div>
            <div className="testi-dots">
              {testimonios.map((_, i) => (
                <button
                  key={i}
                  className={`testi-dot ${i === testiIdx ? 'active' : ''}`}
                  onClick={() => setTestiIdx(i)}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="home-cta" data-reveal>
          <div className="container">
            <div className="home-cta__box">
              <div className="home-cta__decoration" />
              <h2 className="display">¿Listo para tu próxima aventura?</h2>
              <p>Déjanos diseñar el viaje perfecto para ti. Cotización sin costo y sin compromiso.</p>
              <div className="home-cta__actions">
                <Link href="/cotizacion" className="btn btn-primary btn-lg">
                  Solicitar cotización gratis
                </Link>
                <a href={agency.social.whatsapp} target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">
                  Escribirnos por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
