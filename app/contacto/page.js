'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--navbar-h)' }}>
        <div className="page-hero">
          <div className="container page-hero-content">
            <div className="badge">Contacto</div>
            <h1>Estamos aquí para <span style={{ color: 'var(--primary)' }}>ayudarte</span></h1>
            <p>Escríbenos, llámanos o visítanos. Con gusto te atenderemos.</p>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="contacto-layout">
              <div className="contacto-info">
                <h2>Información de <span style={{ color: 'var(--primary)' }}>Contacto</span></h2>
                <p>Nuestro equipo está listo para atenderte. También puedes visitarnos en nuestras oficinas.</p>

                <div className="contacto-info__items">
                  <div className="contacto-info__item">
                    <div className="contacto-info__icon">📍</div>
                    <div>
                      <strong>Oficina Principal</strong>
                      <p>Av. Reforma 123, Col. Centro<br/>Ciudad de México, CDMX 06600</p>
                    </div>
                  </div>
                  <div className="contacto-info__item">
                    <div className="contacto-info__icon">📞</div>
                    <div>
                      <strong>Teléfono</strong>
                      <p><a href="tel:+525512345678">+52 55 1234 5678</a></p>
                      <p><a href="tel:+525587654321">+52 55 8765 4321</a> (WhatsApp)</p>
                    </div>
                  </div>
                  <div className="contacto-info__item">
                    <div className="contacto-info__icon">✉️</div>
                    <div>
                      <strong>Email</strong>
                      <p><a href="mailto:hola@dilitours.com">hola@dilitours.com</a></p>
                      <p><a href="mailto:reservas@dilitours.com">reservas@dilitours.com</a></p>
                    </div>
                  </div>
                  <div className="contacto-info__item">
                    <div className="contacto-info__icon">🕐</div>
                    <div>
                      <strong>Horario de atención</strong>
                      <p>Lunes – Viernes: 9:00 – 19:00</p>
                      <p>Sábado: 10:00 – 15:00</p>
                    </div>
                  </div>
                </div>

                <div className="contacto-social">
                  <h4>Síguenos en redes</h4>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    {['📘 Facebook', '📷 Instagram', '🎵 TikTok', '💬 WhatsApp'].map((s, i) => (
                      <a key={i} href="#" className="contacto-social-btn">{s.split(' ')[0]}</a>
                    ))}
                  </div>
                </div>

                <div className="contacto-map">
                  <div className="contacto-map__inner">
                    <span>🗺️</span>
                    <p>Av. Reforma 123, CDMX</p>
                    <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn btn-outline-dark btn-sm">
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
                    <span>🎉</span>
                    <h4>¡Mensaje enviado!</h4>
                    <p>Gracias por contactarnos. Nuestro equipo te responderá a la brevedad posible.</p>
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
                      📨 Enviar mensaje
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
