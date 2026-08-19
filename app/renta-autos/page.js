'use client';

import { useMemo, useState } from 'react';
import { useVehiculos } from '../../data/useVehiculos';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TIPO_EMOJI = { sedan: '🚗', suv: '🚙', van: '🚐', otro: '🚘' };

function DetailModal({ auto, onClose, onCotizar }) {
  const [imgIndex, setImgIndex] = useState(0);
  const total = auto.imagenes.length;

  const anterior = () => setImgIndex(i => (i - 1 + total) % total);
  const siguiente = () => setImgIndex(i => (i + 1) % total);

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box modal-box--detail">
        <div className="modal-header">
          <div>
            <h3 style={{ color: 'var(--dark)', fontSize: '18px', marginBottom: '4px' }}>
              {auto.nombre}
            </h3>
            <p style={{ color: 'var(--gray-400)', fontSize: '13px' }}>
              {TIPO_EMOJI[auto.tipo]} {auto.tipoLabel}
            </p>
          </div>
          <button className="modal-close" onClick={onClose} id="car-detail-close">✕</button>
        </div>

        <div className="modal-body">
          <div className="car-gallery">
            <img src={auto.imagenes[imgIndex]} alt={`${auto.nombre} foto ${imgIndex + 1}`} className="car-gallery__img" />
            {total > 1 && (
              <>
                <button className="car-gallery__arrow car-gallery__arrow--prev" onClick={anterior} id="car-gallery-prev" aria-label="Foto anterior">‹</button>
                <button className="car-gallery__arrow car-gallery__arrow--next" onClick={siguiente} id="car-gallery-next" aria-label="Foto siguiente">›</button>
                <div className="car-gallery__dots">
                  {auto.imagenes.map((_, i) => (
                    <button
                      key={i}
                      className={`car-gallery__dot ${i === imgIndex ? 'active' : ''}`}
                      onClick={() => setImgIndex(i)}
                      id={`car-gallery-dot-${i}`}
                      aria-label={`Ver foto ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="car-detail-specs">
            {auto.marca && (
              <div className="car-detail-spec"><span>🏷️</span><div><strong>Marca</strong><p>{auto.marca}</p></div></div>
            )}
            {auto.modelo && (
              <div className="car-detail-spec"><span>📅</span><div><strong>Modelo</strong><p>{auto.modelo}</p></div></div>
            )}
            <div className="car-detail-spec"><span>👤</span><div><strong>Capacidad</strong><p>{auto.capacidad} personas</p></div></div>
            {auto.rendimiento && (
              <div className="car-detail-spec"><span>⛽</span><div><strong>Rendimiento</strong><p>{auto.rendimiento} km/l</p></div></div>
            )}
          </div>

          <p style={{ color: 'var(--gray-600)', fontSize: '14px', marginTop: '8px' }}>
            Todos nuestros viajes incluyen chofer, gasolina y casetas. Cotizamos según tu ruta.
          </p>

          <button
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}
            onClick={() => onCotizar(auto)}
            id="car-detail-cotizar"
          >
            📩 Cotizar este vehículo
          </button>
        </div>
      </div>
    </div>
  );
}

function QuoteModal({ auto, onClose }) {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', recogida: '', devolucion: '', lugar: '' });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <div>
            <h3 style={{ color: 'var(--dark)', fontSize: '18px', marginBottom: '4px' }}>
              Cotizar: {auto.nombre}
            </h3>
            <p style={{ color: 'var(--gray-400)', fontSize: '13px' }}>
              {auto.marca} {auto.modelo} · Capacidad: {auto.capacidad} personas
            </p>
          </div>
          <button className="modal-close" onClick={onClose} id="car-modal-close">✕</button>
        </div>
        <div className="modal-body">
          {enviado ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <span style={{ fontSize: '56px', display: 'block', marginBottom: '16px' }}>🎉</span>
              <h4 style={{ fontSize: '20px', color: 'var(--dark)', marginBottom: '8px' }}>¡Solicitud enviada!</h4>
              <p style={{ color: 'var(--gray-600)' }}>
                Te enviaremos tu cotización (incluye chofer, gasolina, casetas y viáticos) en menos de 2 horas.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label>Nombre completo *</label>
                <input type="text" className="form-control" required placeholder="Tu nombre"
                  value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} id="car-modal-nombre" />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" className="form-control" required placeholder="tu@email.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} id="car-modal-email" />
              </div>
              <div className="form-group">
                <label>Teléfono / WhatsApp</label>
                <input type="tel" className="form-control" placeholder="+52 55 1234 5678"
                  value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} id="car-modal-tel" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Fecha de inicio *</label>
                  <input type="date" className="form-control" required
                    value={form.recogida} onChange={e => setForm({ ...form, recogida: e.target.value })} id="car-modal-recogida" />
                </div>
                <div className="form-group">
                  <label>Fecha de regreso *</label>
                  <input type="date" className="form-control" required
                    value={form.devolucion} onChange={e => setForm({ ...form, devolucion: e.target.value })} id="car-modal-devolucion" />
                </div>
              </div>
              <div className="form-group">
                <label>Ruta / destino</label>
                <input type="text" className="form-control" placeholder="Ej. Tepic - Puerto Vallarta"
                  value={form.lugar} onChange={e => setForm({ ...form, lugar: e.target.value })} id="car-modal-lugar" />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                📩 Solicitar cotización
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RentaAutosPage() {
  const { autos, loading, error } = useVehiculos();
  const [filtro, setFiltro] = useState('todos');
  const [autoDetalle, setAutoDetalle] = useState(null);
  const [autoCotizar, setAutoCotizar] = useState(null);

  const tipos = useMemo(() => {
    const presentes = new Set(autos.map(a => a.tipo));
    const base = [{ id: 'todos', label: 'Todos los vehículos' }];
    if (presentes.has('sedan')) base.push({ id: 'sedan', label: 'Sedán' });
    if (presentes.has('suv')) base.push({ id: 'suv', label: 'SUV' });
    if (presentes.has('van')) base.push({ id: 'van', label: 'Van / Minivan' });
    if (presentes.has('otro')) base.push({ id: 'otro', label: 'Otros' });
    return base;
  }, [autos]);

  const filtrados = filtro === 'todos' ? autos : autos.filter(a => a.tipo === filtro);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--navbar-h)' }}>
        <div className="page-hero">
          <div className="container page-hero-content">
            <div className="badge">Renta de Autos</div>
            <h1>Nuestra <span style={{ color: 'var(--primary)' }}>Flota Premium</span></h1>
            <p>Vehículos con chofer incluido. Cotizamos según tu ruta, incluyendo gasolina, casetas y viáticos.</p>
          </div>
        </div>

        <div className="renta-benefits">
          <div className="container">
            <div className="renta-benefits__grid">
              <div className="renta-benefit"><span>🧑‍✈️</span><p>Chofer <strong>incluido</strong></p></div>
              <div className="renta-benefit"><span>⛽</span><p>Gasolina <strong>incluida</strong></p></div>
              <div className="renta-benefit"><span>🛣️</span><p>Casetas <strong>incluidas</strong></p></div>
              <div className="renta-benefit"><span>🧾</span><p>Cotización <strong>sin compromiso</strong></p></div>
            </div>
          </div>
        </div>

        {!loading && !error && tipos.length > 1 && (
          <div className="renta-filters">
            <div className="container">
              <div className="destinos-cats">
                {tipos.map(t => (
                  <button
                    key={t.id}
                    className={`destinos-cat-btn ${filtro === t.id ? 'active' : ''}`}
                    onClick={() => setFiltro(t.id)}
                    id={`renta-cat-${t.id}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <section className="section" style={{ paddingTop: '32px' }}>
          <div className="container">
            {loading && <p style={{ textAlign: 'center', padding: '48px 0' }}>Cargando flota...</p>}

            {error && (
              <p style={{ textAlign: 'center', padding: '48px 0', color: 'var(--danger, #d33)' }}>
                No pudimos cargar la flota en este momento. Intenta de nuevo más tarde.
              </p>
            )}

            {!loading && !error && filtrados.length === 0 && (
              <p style={{ textAlign: 'center', padding: '48px 0' }}>No hay vehículos en esta categoría por ahora.</p>
            )}

            {!loading && !error && filtrados.length > 0 && (
              <div className="grid-3">
                {filtrados.map(auto => (
                  <div
                    key={auto.id}
                    className="car-card card car-card--clickable"
                    onClick={() => setAutoDetalle(auto)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="card-img-wrap">
                      <img src={auto.imagenes[0]} alt={auto.nombre} className="car-card__img" loading="lazy" />
                      <span className="car-card__type-badge">
                        {TIPO_EMOJI[auto.tipo]} {auto.tipoLabel}
                      </span>
                      {auto.imagenes.length > 1 && (
                        <span className="car-card__photo-count">📷 {auto.imagenes.length}</span>
                      )}
                    </div>
                    <div className="car-card__body">
                      <h3 className="car-card__name">{auto.nombre}</h3>
                      {(auto.marca || auto.modelo) && (
                        <p className="car-card__desc">{auto.marca} {auto.modelo}</p>
                      )}

                      <div className="car-card__specs">
                        <div className="car-card__spec"><span>👤</span>{auto.capacidad} personas</div>
                        {auto.rendimiento && (
                          <div className="car-card__spec"><span>⛽</span>{auto.rendimiento} km/l</div>
                        )}
                      </div>

                      <div className="car-card__footer">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={(e) => { e.stopPropagation(); setAutoCotizar(auto); }}
                          id={`car-quote-${auto.id}`}
                        >
                          📩 Cotizar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {autoDetalle && (
          <DetailModal
            auto={autoDetalle}
            onClose={() => setAutoDetalle(null)}
            onCotizar={(auto) => { setAutoDetalle(null); setAutoCotizar(auto); }}
          />
        )}
        {autoCotizar && (
          <QuoteModal auto={autoCotizar} onClose={() => setAutoCotizar(null)} />
        )}
      </main>
      <Footer />
    </>
  );
}
