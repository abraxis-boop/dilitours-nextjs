'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { agency } from '../../data/agency';
import useScrollReveal from '../../hooks/useScrollReveal';

const equipo = [
  { nombre: 'Andrea Díaz', cargo: 'Directora General', initials: 'AD' },
  { nombre: 'Carlos Lara', cargo: 'Jefe de Operaciones', initials: 'CL' },
  { nombre: 'Sofía Mora', cargo: 'Especialista en Destinos', initials: 'SM' },
  { nombre: 'Miguel Torres', cargo: 'Asesor de Viajes', initials: 'MT' },
];

const valores = [
  { icon: '01', titulo: 'Pasión', desc: 'Amamos viajar tanto como tú. Eso nos hace diferentes.' },
  { icon: '02', titulo: 'Confianza', desc: 'Somos transparentes en todo momento. Sin letra pequeña.' },
  { icon: '03', titulo: 'Responsabilidad', desc: 'Promovemos el turismo sostenible y responsable.' },
  { icon: '04', titulo: 'Excelencia', desc: 'Nunca paramos de buscar la mejor experiencia para ti.' },
];

export default function NosotrosPage() {
  useScrollReveal();
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--navbar-h)' }}>
        <div className="page-hero">
          <div className="container page-hero-content">
            <div className="badge animate-fade-up">Conocenos</div>
            <h1 className="animate-fade-up-delay-1">Haciendo <span style={{ color: 'var(--primary)' }}>sueños realidad</span></h1>
            <p className="animate-fade-up-delay-2">Somos una agencia de viajes con pasión, experiencia y un equipo que te acompaña en cada paso.</p>
          </div>
        </div>

        <section className="section" data-reveal>
          <div className="container">
            <div className="nosotros-historia">
              <div className="nosotros-historia__img">
                <Image src="/hero_banner.jpg" alt="Historia de Dilitours" fill sizes="(max-width: 1024px) 100vw, 50vw" quality={80} />
                <div className="nosotros-historia__badge">
                  <span className="nosotros-historia__badge-num">{agency.experience.years}+</span>
                  <span>Año de experiencia</span>
                </div>
              </div>
              <div className="nosotros-historia__content">
                <div className="badge" style={{ marginBottom: '16px', display: 'inline-block' }}>Nuestra Historia</div>
                <h2>De una pasión por viajar a una <span style={{ color: 'var(--primary)' }}>agencia de confianza</span></h2>
                <p>DiliTours nació en 2015 con un sueño: hacer que viajar sea accesible, seguro y memorable para todos. Lo que empezó como una pequeña oficina con mucha ilusión, se convirtió en una de las agencias de viajes más confiables de la región.</p>
                <p>Hoy, con más de {agency.experience.travelers} viajeros felices y más de {agency.experience.destinations} destinos en nuestro catálogo, seguimos trabajando con la misma pasión del primer día: que cada viaje supere las expectativas de nuestros clientes.</p>
                <div className="nosotros-stats">
                  <div><strong>{agency.experience.travelers}+</strong><span>Viajeros felices</span></div>
                  <div><strong>{agency.experience.destinations}+</strong><span>Destinos</span></div>
                  <div><strong>{agency.experience.rating}★</strong><span>Calificación</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--dark)' }} data-reveal>
          <div className="container">
            <div className="nosotros-mv-grid">
              <div className="nosotros-mv-card">
                <span className="nosotros-mv-num">01</span>
                <h3>Misión</h3>
                <p>Crear experiencias de viaje únicas e inolvidables, ofreciendo el mejor servicio, los mejores precios y el acompañamiento personalizado que cada cliente merece.</p>
              </div>
              <div className="nosotros-mv-card nosotros-mv-card--primary">
                <span className="nosotros-mv-num">02</span>
                <h3>Visión</h3>
                <p>Ser la agencia de viajes #1 en México y Latinoamérica, reconocida por la calidad de nuestros paquetes, la confianza de nuestros clientes y nuestro compromiso con el turismo sostenible.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--light-bg)' }} data-reveal>
          <div className="container">
            <div className="section-header">
              <div className="badge">Nuestros Valores</div>
              <h2>Lo que nos <span style={{ color: 'var(--primary)' }}>define</span></h2>
            </div>
            <div className="grid-4">
              {valores.map((v, i) => (
                <div key={i} className="ventaja-card">
                  <div className="ventaja-card__icon">{v.icon}</div>
                  <h3>{v.titulo}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" data-reveal>
          <div className="container">
            <div className="section-header">
              <div className="badge">Nuestro Equipo</div>
              <h2>Las personas detrás de <span style={{ color: 'var(--primary)' }}>DiliTours</span></h2>
              <p>Un equipo apasionado por los viajes, listo para ayudarte a planear la aventura perfecta.</p>
            </div>
            <div className="nosotros-equipo">
              {equipo.map((m, i) => (
                <div key={i} className="equipo-card">
                  <div className="equipo-card__avatar">{m.initials}</div>
                  <h4>{m.nombre}</h4>
                  <p>{m.cargo}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="home-cta" style={{ background: 'linear-gradient(135deg, var(--dark) 0%, #1a2d6b 100%)' }} data-reveal>
          <div className="container" style={{ textAlign: 'center', color: 'var(--white)' }}>
            <h2 style={{ color: 'var(--white)', fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: '16px' }}>
              ¿Listo para trabajar juntos?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', marginBottom: '40px' }}>
              Contáctanos y diseñemos juntos el viaje de tus sueños.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/cotizacion" className="btn btn-primary btn-lg">Solicitar cotización</Link>
              <Link href={agency.social.whatsapp} className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">Contactar</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
