'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { destinos } from '../../../data/destinos';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const categoryLabels = {
  'nacional': 'Nacional', 'internacional': 'Internacional', 'luna-de-miel': 'Luna de Miel',
  'aventura': 'Aventura', 'negocios': 'Negocios', 'familiar': 'Familiar', 'local': 'Local', 'crucero': 'Crucero'
};

export default function DetalleDestinoPage() {
  const params = useParams();
  const id = params.id;
  const destino = destinos.find(d => d.id === parseInt(id));
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', fecha: '', personas: 1, comentarios: '' });
  const [enviado, setEnviado] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--navbar-h)' }}>
        <div className="detalle-hero">
          <img src={destino.imagen} alt={destino.nombre} className="detalle-hero__img" />
          <div className="detalle-hero__overlay" />
          <div className="container detalle-hero__content">
            <nav className="breadcrumb" style={{ justifyContent: 'flex-start' }}>
              <Link href="/">Inicio</Link><span>›</span>
              <Link href="/destinos">Destinos</Link><span>›</span>
              <span style={{ color: 'white' }}>{destino.nombre}</span>
            </nav>
            <span className={`badge-category badge-${destino.categoria}`} style={{marginBottom: '12px', display: 'inline-block'}}>
              {categoryLabels[destino.categoria]}
            </span>
            <h1>{destino.nombre}</h1>
            <div className="detalle-hero__meta">
              <span>📍 {destino.pais}</span>
              <span>🕐 {destino.duracion}</span>
              <span>⭐ {destino.rating} ({destino.reviews} reseñas)</span>
            </div>
          </div>
        </div>

        <section className="section" style={{ paddingTop: '48px' }}>
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
                    <h2>Itinerario</h2>
                    <div className="detalle-itinerario">
                      {destino.itinerario.map((item) => (
                        <div key={item.dia} className="detalle-itinerario__item">
                          <div className="detalle-itinerario__day">Día {item.dia}</div>
                          <div className="detalle-itinerario__content">
                            <h4>{item.titulo}</h4>
                            <p>{item.descripcion}</p>
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
                    {destino.destacado && <span className="detalle-price-card__badge">⭐ Destacado</span>}
                  </div>
                  <div className="detalle-price-card__info">
                    <div><span>📅</span>{destino.duracion}</div>
                    <div><span>📍</span>{destino.pais}</div>
                    <div><span>✅</span>{destino.incluye.length} servicios incluidos</div>
                  </div>
                </div>

                <div className="detalle-form-card">
                  <h3>Reservar este paquete</h3>
                  <p>Completa tus datos y te contactamos en menos de 24 horas.</p>
                  {enviado ? (
                    <div className="detalle-form-success">
                      <span>🎉</span>
                      <h4>¡Solicitud enviada!</h4>
                      <p>Nos pondremos en contacto contigo muy pronto.</p>
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
                        ✈ Reservar ahora
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
