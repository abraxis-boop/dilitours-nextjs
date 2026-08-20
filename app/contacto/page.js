'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { agency } from '../../data/agency';
import useScrollReveal from '../../hooks/useScrollReveal';

export default function ContactoPage() {
  useScrollReveal();
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hola! Soy ${form.nombre}. ${form.asunto}: ${form.mensaje}. Mi email es ${form.email} y mi teléfono ${form.telefono || 'no disponible'}.`;
    window.open(`${agency.social.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    setEnviado(true);
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--navbar-h)' }}>
        <div className="page-hero">
          <div className="container page-hero-content">
            <div className="badge animate-fade-up">Contacto</div>
            <h1 className="animate-fade-up-delay-1">Estamos aquí para <span style={{ color: 'var(--primary)' }}>ayudarte</span></h1>
            <p className="animate-fade-up-delay-2">Escríbenos, llámanos o visítanos. Con gusto te atenderemos.</p>
          </div>
        </div>

        <section className="section" data-reveal>
          <div className="container">
            <div className="contacto-layout">
              <div className="contacto-info">
                <h2>Información de <span style={{ color: 'var(--primary)' }}>Contacto</span></h2>
                <p>Nuestro equipo está listo para atenderte. También puedes visitarnos en nuestras oficinas.</p>

                <div className="contacto-info__items">
                  <div className="contacto-info__item">
                    <div className="contacto-info__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
                    <div>
                      <strong>Oficina Principal</strong>
                      <p>{agency.contact.address}<br/>{agency.contact.city}</p>
                    </div>
                  </div>
                  <div className="contacto-info__item">
                    <div className="contacto-info__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
                    <div>
                      <strong>Teléfono</strong>
                      <p><a href={agency.contact.phoneRaw}>{agency.contact.phone}</a></p>
                      <p><a href={agency.contact.whatsappLink}>{agency.contact.whatsapp}</a> (WhatsApp)</p>
                    </div>
                  </div>
                  <div className="contacto-info__item">
                    <div className="contacto-info__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
                    <div>
                      <strong>Email</strong>
                      <p><a href={agency.contact.emailMailto}>{agency.contact.email}</a></p>
                    </div>
                  </div>
                  <div className="contacto-info__item">
                    <div className="contacto-info__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
                    <div>
                      <strong>Horario de atención</strong>
                      <p>{agency.contact.hours}</p>
                    </div>
                  </div>
                </div>

                <div className="contacto-social">
                  <h4>Síguenos en redes</h4>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <a href={agency.social.facebook} target="_blank" rel="noreferrer" className="contacto-social-btn">Facebook</a>
                    <a href={agency.social.tiktok} target="_blank" rel="noreferrer" className="contacto-social-btn">TikTok</a>
                  </div>
                </div>

                <div className="contacto-map">
                  <div className="contacto-map__inner">
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" width="48" height="48"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <p>{agency.contact.address}, {agency.contact.city}</p>
                    <a href={`https://maps.google.com/?q=${encodeURIComponent(agency.contact.address + ', ' + agency.contact.city)}`} target="_blank" rel="noreferrer" className="btn btn-outline-dark btn-sm">
                      Ver en Google Maps
                    </a>
                  </div>
                </div>
              </div>

              <div className="contacto-form-card">
                <h3>Envíanos un mensaje</h3>
                <p>Te respondemos en menos de 24 horas.</p>
                {enviado ? (
                  <div className="contacto-success">
                    <span style={{ fontSize: '48px' }}>✓</span>
                    <h4>¡Mensaje enviado!</h4>
                    <p>Te responderemos pronto por WhatsApp.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contacto-form">
                    <div className="contacto-form__row">
                      <div className="form-group">
                        <label>Nombre *</label>
                        <input type="text" className="form-control" required placeholder="Tu nombre"
                          value={form.nombre} onChange={e => upd('nombre', e.target.value)} id="contacto-nombre" />
                      </div>
                      <div className="form-group">
                        <label>Email *</label>
                        <input type="email" className="form-control" required placeholder="tu@email.com"
                          value={form.email} onChange={e => upd('email', e.target.value)} id="contacto-email" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Teléfono</label>
                      <input type="tel" className="form-control" placeholder="+52 55 1234 5678"
                        value={form.telefono} onChange={e => upd('telefono', e.target.value)} id="contacto-telefono" />
                    </div>
                    <div className="form-group">
                      <label>Asunto *</label>
                      <select className="form-control" required value={form.asunto} onChange={e => upd('asunto', e.target.value)} id="contacto-asunto">
                        <option value="">— Selecciona un asunto —</option>
                        <option value="cotizacion">Solicitar cotización</option>
                        <option value="reserva">Modificar o cancelar reserva</option>
                        <option value="renta">Renta de autos</option>
                        <option value="informacion">Información general</option>
                        <option value="queja">Queja o sugerencia</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Mensaje *</label>
                      <textarea className="form-control" rows="5" required
                        placeholder="Escribe tu mensaje aquí..."
                        value={form.mensaje} onChange={e => upd('mensaje', e.target.value)} id="contacto-mensaje" />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                      Enviar mensaje
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
