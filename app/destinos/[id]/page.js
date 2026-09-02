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
  const destino = destinos.find(d => String(d.id) === String(id));
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
    const lineas = [
      `RESERVA DE PAQUETE`,
      '',
      `Paquete: ${destino.nombre}`,
      `Duración: ${destino.duracion}`,
      '',
      `Nombre: ${form.nombre}`,
      `Email: ${form.email}`,
      `Tel: ${form.telefono || 'No proporcionado'}`,
      `Fecha tentativa: ${form.fecha || 'Por definir'}`,
      `Personas: ${form.personas}`,
      `Comentarios: ${form.comentarios || 'Ninguno'}`,
    ];
    const msg = lineas.join('\n');
    window.open(
      `${agency.social.whatsapp}?text=${encodeURIComponent(msg)}`,
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
            {(destino.categorias || [destino.categoria]).map((cat) => (
              <span key={cat} className={`badge-category badge-${cat} animate-fade-up-delay-1`} style={{marginBottom: '8px', marginRight: '6px', display: 'inline-block'}}>
                {categoryLabels[cat] || cat}
              </span>
            ))}
            <h1 className="animate-fade-up-delay-2">{destino.nombre}</h1>
            <div className="detalle-hero__meta animate-fade-up-delay-3">
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {destino.pais}
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {destino.duracion}
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px', color: '#ffb400' }}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {destino.rating} / 5.0
              </span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); openModal(activeImg); }}
              className="btn btn-outline btn-sm animate-fade-up-delay-3"
              style={{ marginTop: '16px', background: 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.6)', color: 'white' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Ampliar imágenes ({imagenes.length})
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
                      <li key={i}>
                        <span className="detalle-incluye__check">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="12" height="12">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {destino.itinerario && destino.itinerario.length > 0 && (
                  <div className="detalle-section-card">
                    <h2>Itinerario detallado</h2>
                    <div className="detalle-itinerario">
                      {destino.itinerario.map((item, idx) => (
                        <div key={idx} className="detalle-itinerario__item">
                          <div className="detalle-itinerario__day">{item.etiqueta || (typeof item.dia === 'number' ? `Día ${item.dia}` : item.dia)}</div>
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
                    <div>
                      <span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      </span> Duración: <strong>{destino.duracion}</strong>
                    </div>
                    <div>
                      <span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </span> Destino: <strong>{destino.pais}</strong>
                    </div>
                    <div>
                      <span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span> Incluye: <strong>{destino.incluye.length} servicios</strong>
                    </div>
                  </div>
                </div>

                <div className="detalle-form-card">
                  <h3>Reservar este paquete</h3>
                  <p>Completa tus datos y te contactamos en menos de 24 horas.</p>
                  {enviado ? (
                    <div className="detalle-form-success">
                      <span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="24" height="24">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
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
