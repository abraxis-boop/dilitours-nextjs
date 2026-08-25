'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useDestinos } from '../../../data/useDestinos';
import { agency } from '../../../data/agency';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import LoadingSpinner from '../../../components/LoadingSpinner';
import useScrollReveal from '../../../hooks/useScrollReveal';

const categoryLabels = {
  'nacional': 'Nacional', 'internacional': 'Internacional', 'luna-de-miel': 'Luna de Miel',
  'aventura': 'Aventura', 'negocios': 'Negocios', 'familiar': 'Familiar', 'local': 'Local', 'crucero': 'Crucero'
};

export default function DetalleDestinoPage() {
  useScrollReveal();
  const params = useParams();
  const { destinos, loading, error } = useDestinos();
  const id = params.id;
  const destino = destinos.find(d => d.id === parseInt(id));
  const [activeImg, setActiveImg] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImgIdx, setModalImgIdx] = useState(0);
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', fecha: '', personas: 1, comentarios: '' });
  const [enviado, setEnviado] = useState(false);

  if (loading) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: 'var(--navbar-h)' }}>
          <LoadingSpinner text="Cargando destino..." subtext="Preparando la información de tu próximo viaje" />
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: 'var(--navbar-h)', textAlign: 'center', padding: '120px 24px' }}>
          <h2>No pudimos cargar este destino</h2>
          <p style={{ color: 'var(--danger, #d33)', marginTop: '8px' }}>Intenta de nuevo más tarde.</p>
          <Link href="/destinos" className="btn btn-primary" style={{ marginTop: '24px' }}>Volver a destinos</Link>
        </main>
        <Footer />
      </>
    );
  }

  if (!destino) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: 'var(--navbar-h)', textAlign: 'center', padding: '120px 24px' }}>
          <h2>Destino no encontrado</h2>
          <Link href="/destinos" className="btn btn-primary" style={{ marginTop: '24px' }}>Volver a destinos</Link>
        </main>
        <Footer />
      </>
    );
  }

  const imagenes = destino.imagenes && destino.imagenes.length > 0 ? destino.imagenes : [destino.imagen];
  const currentImg = imagenes[activeImg] || destino.imagen;

  const openModal = (idx = 0) => {
    setModalImgIdx(idx);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const prevModalImg = () => setModalImgIdx(i => (i === 0 ? imagenes.length - 1 : i - 1));
  const nextModalImg = () => setModalImgIdx(i => (i === imagenes.length - 1 ? 0 : i + 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(
      `${agency.social.whatsapp}?text=${encodeURIComponent(`Hola! Me interesa el paquete "${destino.nombre}" (${destino.duracion}). Quiero viajar con ${form.personas} persona(s). ${form.comentarios}`)}`,
      '_blank'
    );
    setEnviado(true);
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--navbar-h)' }}>
        <div className="detalle-hero" onClick={() => openModal(activeImg)} style={{ cursor: 'pointer' }}>
          <Image src={currentImg} alt={destino.nombre} fill priority className="detalle-hero__img" sizes="100vw" quality={85} />
          <div className="detalle-hero__overlay" />
          <div className="container detalle-hero__content">
            <nav className="breadcrumb animate-fade-up" style={{ justifyContent: 'flex-start' }} onClick={e => e.stopPropagation()}>
              <Link href="/">Inicio</Link><span>›</span>
              <Link href="/destinos">Destinos</Link><span>›</span>
              <span style={{ color: 'white' }}>{destino.nombre}</span>
            </nav>
            <span className={`badge-category badge-${destino.categoria} animate-fade-up-delay-1`} style={{marginBottom: '12px', display: 'inline-block'}}>
              {categoryLabels[destino.categoria] || destino.categoria}
            </span>
            <h1 className="animate-fade-up-delay-2">{destino.nombre}</h1>
            <div className="detalle-hero__meta animate-fade-up-delay-3">
              <span>📍 {destino.pais}</span>
              <span>🕒 {destino.duracion}</span>
              <span>⭐ {destino.rating} / 5.0</span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); openModal(activeImg); }}
              className="btn btn-outline btn-sm animate-fade-up-delay-3"
              style={{ marginTop: '16px', background: 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.6)', color: 'white' }}
            >
              📷 Ampliar imágenes ({imagenes.length})
            </button>
          </div>
        </div>

        {imagenes.length > 1 && (
          <div className="container" style={{ marginTop: '20px' }}>
            <div className="detalle-gallery-thumbs">
              {imagenes.map((img, i) => (
                <button
                  key={i}
                  className={`detalle-gallery-thumb ${i === activeImg ? 'active' : ''}`}
                  onClick={() => { setActiveImg(i); openModal(i); }}
                >
                  <Image src={img} alt={`Vista ${i + 1}`} width={120} height={80} style={{ objectFit: 'cover', borderRadius: '8px' }} />
                </button>
              ))}
            </div>
          </div>
        )}

        <section className="section" style={{ paddingTop: '32px' }} data-reveal>
          <div className="container">
            <div className="detalle-layout">
              <div className="detalle-main">
                <div className="detalle-section-card">
                  <h2>Descripción del paquete</h2>
                  <p>{destino.descripcion}</p>
                </div>

                <div className="detalle-section-card">
                  <h2>¿Qué incluye?</h2>
                  <ul className="detalle-incluye">
                    {destino.incluye.map((item, i) => (
                      <li key={i}><span className="detalle-incluye__check">✓</span>{item}</li>
                    ))}
                  </ul>
                </div>

                {destino.itinerario && destino.itinerario.length > 0 && (
                  <div className="detalle-section-card">
                    <h2>Itinerario detallado</h2>
                    <div className="detalle-itinerario">
                      {destino.itinerario.map((item) => (
                        <div key={item.dia} className="detalle-itinerario__item">
                          <div className="detalle-itinerario__day">Día {item.dia}</div>
                          <div className="detalle-itinerario__content">
                            <h4>{item.titulo}</h4>
                            {item.descripcion && <p>{item.descripcion}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="detalle-sidebar">
                <div className="detalle-price-card">
                  <div className="detalle-price-card__header">
                    <div>
                      <span className="detalle-price-card__from">Desde</span>
                      <div className="detalle-price-card__price">
                        ${destino.precio.toLocaleString()} <span>{destino.moneda}</span>
                      </div>
                      <span className="detalle-price-card__pp">por persona</span>
                    </div>
                    {destino.destacado && <span className="detalle-price-card__badge">Destacado</span>}
                  </div>
                  <div className="detalle-price-card__info">
                    <div><span>🕒</span> Duración: <strong>{destino.duracion}</strong></div>
                    <div><span>📍</span> Destino: <strong>{destino.pais}</strong></div>
                    <div><span>✨</span> Incluye: <strong>{destino.incluye.length} servicios</strong></div>
                  </div>
                </div>

                <div className="detalle-form-card">
                  <h3>Reservar este paquete</h3>
                  <p>Completa tus datos y te contactamos en menos de 24 horas.</p>
                  {enviado ? (
                    <div className="detalle-form-success">
                      <span>✓</span>
                      <h4>¡Solicitud enviada!</h4>
                      <p>Te contactaremos pronto por WhatsApp.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="detalle-form">
                      <div className="form-group">
                        <label>Nombre completo</label>
                        <input type="text" className="form-control" placeholder="Tu nombre" required
                          value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} id="detalle-nombre" />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="tu@email.com" required
                          value={form.email} onChange={e => setForm({...form, email: e.target.value})} id="detalle-email" />
                      </div>
                      <div className="form-group">
                        <label>Teléfono / WhatsApp</label>
                        <input type="tel" className="form-control" placeholder="+52 55 1234 5678"
                          value={form.telefono} onChange={e => setForm({...form, telefono: e.target.value})} id="detalle-telefono" />
                      </div>
                      <div className="detalle-form__row">
                        <div className="form-group">
                          <label>Fecha tentativa</label>
                          <input type="date" className="form-control"
                            value={form.fecha} onChange={e => setForm({...form, fecha: e.target.value})} id="detalle-fecha" />
                        </div>
                        <div className="form-group">
                          <label>Personas</label>
                          <input type="number" min="1" max="20" className="form-control"
                            value={form.personas} onChange={e => setForm({...form, personas: e.target.value})} id="detalle-personas" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Comentarios</label>
                        <textarea className="form-control" rows="3" placeholder="Requerimientos especiales..."
                          value={form.comentarios} onChange={e => setForm({...form, comentarios: e.target.value})} id="detalle-comentarios" />
                      </div>
                      <button type="submit" className="btn btn-primary" style={{width: '100%', justifyContent: 'center'}}>
                        Reservar ahora
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {modalOpen && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box" style={{ maxWidth: '850px', background: '#0d1a4e', color: 'white', borderRadius: '16px' }}>
            <div className="modal-header" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <h3 style={{ color: 'white', fontSize: '18px', margin: 0 }}>
                {destino.nombre} — Foto {modalImgIdx + 1} de {imagenes.length}
              </h3>
              <button className="modal-close" onClick={closeModal} style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                ✕
              </button>
            </div>
            <div className="modal-body" style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '12px', overflow: 'hidden' }}>
                <Image
                  src={imagenes[modalImgIdx]}
                  alt={`${destino.nombre} foto ${modalImgIdx + 1}`}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 1024px) 100vw, 850px"
                />
                {imagenes.length > 1 && (
                  <>
                    <button
                      onClick={prevModalImg}
                      style={{
                        position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%',
                        width: '44px', height: '44px', fontSize: '24px', cursor: 'pointer'
                      }}
                      aria-label="Anterior"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextModalImg}
                      style={{
                        position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%',
                        width: '44px', height: '44px', fontSize: '24px', cursor: 'pointer'
                      }}
                      aria-label="Siguiente"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {imagenes.length > 1 && (
                <div className="detalle-gallery-thumbs" style={{ justifyContent: 'center', marginTop: '16px' }}>
                  {imagenes.map((img, i) => (
                    <button
                      key={i}
                      className={`detalle-gallery-thumb ${i === modalImgIdx ? 'active' : ''}`}
                      onClick={() => setModalImgIdx(i)}
                    >
                      <Image src={img} alt={`Vista ${i + 1}`} width={80} height={55} style={{ objectFit: 'cover', borderRadius: '6px' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
