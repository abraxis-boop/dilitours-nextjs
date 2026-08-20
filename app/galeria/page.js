'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import useScrollReveal from '../../hooks/useScrollReveal';

const fotos = [
  { id: 1, src: '/hero_banner.jpg', titulo: 'Playa Tropical Paradisíaca', lugar: 'Caribe' },
  { id: 2, src: '/destinations_grid.jpg', titulo: 'Riviera Maya', lugar: 'México' },
  { id: 3, src: '/hero_banner.jpg', titulo: 'Isla Privada', lugar: 'República Dominicana' },
  { id: 4, src: '/destinations_grid.jpg', titulo: 'Chichén Itzá', lugar: 'México' },
  { id: 5, src: '/hero_banner.jpg', titulo: 'Puesta de Sol en el Caribe', lugar: 'Cancún' },
  { id: 6, src: '/destinations_grid.jpg', titulo: 'Cartagena Colonial', lugar: 'Colombia' },
  { id: 7, src: '/hero_banner.jpg', titulo: 'Torres del Paine', lugar: 'Argentina' },
  { id: 8, src: '/destinations_grid.jpg', titulo: 'Cancún Zona Hotelera', lugar: 'México' },
  { id: 9, src: '/hero_banner.jpg', titulo: 'Atardecer Pacífico', lugar: 'Huatulco' },
];

export default function GaleriaPage() {
  useScrollReveal();
  const [lightbox, setLightbox] = useState(null);

  const prev = () => setLightbox(i => (i === 0 ? fotos.length - 1 : i - 1));
  const next = () => setLightbox(i => (i === fotos.length - 1 ? 0 : i + 1));

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setLightbox(null);
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--navbar-h)' }}>
        <div className="page-hero">
          <div className="container page-hero-content">
            <div className="badge animate-fade-up">Galería</div>
            <h1 className="animate-fade-up-delay-1">Momentos <span style={{ color: 'var(--primary)' }}>Inolvidables</span></h1>
            <p className="animate-fade-up-delay-2">Inspírate con las fotos de los destinos y experiencias que Dilitours tiene para ti.</p>
          </div>
        </div>

        <section className="section" data-reveal>
          <div className="container">
            <div className="galeria-grid">
              {fotos.map((foto, idx) => (
                <div
                  key={foto.id}
                  className="galeria-item"
                  onClick={() => setLightbox(idx)}
                  id={`galeria-item-${foto.id}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setLightbox(idx)}
                  aria-label={`Ver ${foto.titulo}`}
                >
                  <Image src={foto.src} alt={foto.titulo} width={600} height={400} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  <div className="galeria-item__overlay">
                    <div className="galeria-item__info">
                      <h4>{foto.titulo}</h4>
                      <p>{foto.lugar}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {lightbox !== null && (
          <div
            className="galeria-lightbox"
            onClick={e => e.target === e.currentTarget && setLightbox(null)}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
          >
            <button className="galeria-lightbox__close" onClick={() => setLightbox(null)} id="lightbox-close">✕</button>
            <button className="galeria-lightbox__nav galeria-lightbox__nav--prev" onClick={prev} id="lightbox-prev">‹</button>
            <div className="galeria-lightbox__box">
              <Image src={fotos[lightbox].src} alt={fotos[lightbox].titulo} width={900} height={600} className="galeria-lightbox__img" />
              <div className="galeria-lightbox__caption">
                <h3>{fotos[lightbox].titulo}</h3>
                <p>{fotos[lightbox].lugar}</p>
              </div>
            </div>
            <button className="galeria-lightbox__nav galeria-lightbox__nav--next" onClick={next} id="lightbox-next">›</button>
            <div className="galeria-lightbox__counter">{lightbox + 1} / {fotos.length}</div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
