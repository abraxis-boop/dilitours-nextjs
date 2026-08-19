'use client';

import { useState } from 'react';
import { destinos, categorias } from '../../data/destinos';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const pasos = ['Destino', 'Fechas & Grupo', 'Tus datos', 'Confirmar'];

export default function CotizacionPage() {
  const [paso, setPaso] = useState(0);
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({
    destino: '', destino_personalizado: '', categoria: 'todos',
    fecha_salida: '', fecha_regreso: '',
    adultos: 1, ninos: 0, tipo_habitacion: 'doble',
    nombre: '', email: '', telefono: '', ciudad: '',
    comentarios: '', como_nos_conocio: ''
  });

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  if (enviado) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: 'var(--navbar-h)' }}>
          <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
            <div className="container" style={{ textAlign: 'center' }}>
              <div className="cotizacion-success">
                <span>🎉</span>
                <h2>¡Solicitud enviada con éxito!</h2>
                <p>Gracias, <strong>{form.nombre}</strong>. Hemos recibido tu solicitud de cotización para <strong>{form.destino || 'tu destino seleccionado'}</strong>.</p>
                <p style={{ marginTop: '8px' }}>Nuestro equipo se pondrá en contacto contigo en menos de <strong>24 horas</strong> al correo <strong>{form.email}</strong>.</p>
                <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="/" className="btn btn-primary btn-lg">Ir al inicio</a>
                  <a href="/destinos" className="btn btn-outline-dark btn-lg">Explorar más destinos</a>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--navbar-h)' }}>
        <div className="page-hero page-hero--sm">
          <div className="container page-hero-content">
            <div className="badge">Cotización Gratuita</div>
            <h1>Cotiza tu <span style={{ color: 'var(--primary)' }}>viaje ideal</span></h1>
            <p>Sin costo, sin compromiso. Te respondemos en menos de 24 horas.</p>
          </div>
        </div>

        <section className="section" style={{ paddingTop: '40px', background: 'var(--light-bg)' }}>
          <div className="container">
            <div className="cotizacion-progress">
              {pasos.map((p, i) => (
                <div key={i} className={`cotizacion-step ${i === paso ? 'active' : i < paso ? 'done' : ''}`}>
                  <div className="cotizacion-step__circle">
                    {i < paso ? '✓' : i + 1}
                  </div>
                  <span>{p}</span>
                  {i < pasos.length - 1 && <div className="cotizacion-step__line" />}
                </div>
              ))}
            </div>

            <div className="cotizacion-box">
              <form onSubmit={handleSubmit}>
                {paso === 0 && (
                  <div className="cotizacion-form-step animate-fade-up">
                    <h3>¿A dónde quieres viajar?</h3>
                    <div className="form-group">
                      <label>Categoría de viaje</label>
                      <select className="form-control" value={form.categoria} onChange={e => upd('categoria', e.target.value)} id="cotiz-categoria">
                        {categorias.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Selecciona un destino de nuestro catálogo (opcional)</label>
                      <select className="form-control" value={form.destino} onChange={e => upd('destino', e.target.value)} id="cotiz-destino">
                        <option value="">— Seleccionar destino —</option>
                        {destinos
                          .filter(d => form.categoria === 'todos' || d.categoria === form.categoria)
                          .map(d => <option key={d.id} value={d.nombre}>{d.nombre} — desde ${d.precio} {d.moneda}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>O escribe tu destino personalizado</label>
                      <input type="text" className="form-control" placeholder="Ej: Paris, Roma, Maldivas..."
                        value={form.destino_personalizado} onChange={e => upd('destino_personalizado', e.target.value)} id="cotiz-destino-custom" />
                    </div>
                    <button type="button" className="btn btn-primary btn-lg" onClick={() => setPaso(1)}
                      disabled={!form.destino && !form.destino_personalizado}
                      style={{ marginTop: '8px' }}>
                      Continuar →
                    </button>
                  </div>
                )}

                {paso === 1 && (
                  <div className="cotizacion-form-step animate-fade-up">
                    <h3>Fechas y composición del grupo</h3>
                    <div className="cotizacion-row">
                      <div className="form-group">
                        <label>Fecha de salida</label>
                        <input type="date" className="form-control" value={form.fecha_salida}
                          onChange={e => upd('fecha_salida', e.target.value)} id="cotiz-salida" />
                      </div>
                      <div className="form-group">
                        <label>Fecha de regreso</label>
                        <input type="date" className="form-control" value={form.fecha_regreso}
                          onChange={e => upd('fecha_regreso', e.target.value)} id="cotiz-regreso" />
                      </div>
                    </div>
                    <div className="cotizacion-row">
                      <div className="form-group">
                        <label>Adultos</label>
                        <input type="number" min="1" max="20" className="form-control"
                          value={form.adultos} onChange={e => upd('adultos', e.target.value)} id="cotiz-adultos" />
                      </div>
                      <div className="form-group">
                        <label>Niños (0–11 años)</label>
                        <input type="number" min="0" max="10" className="form-control"
                          value={form.ninos} onChange={e => upd('ninos', e.target.value)} id="cotiz-ninos" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Tipo de habitación preferida</label>
                      <select className="form-control" value={form.tipo_habitacion} onChange={e => upd('tipo_habitacion', e.target.value)} id="cotiz-habitacion">
                        <option value="sencilla">Sencilla (1 cama matrimonial)</option>
                        <option value="doble">Doble (2 camas)</option>
                        <option value="suite">Suite Junior</option>
                        <option value="penthouse">Penthouse / Suite Master</option>
                      </select>
                    </div>
                    <div className="cotizacion-nav">
                      <button type="button" className="btn btn-outline-dark" onClick={() => setPaso(0)}>← Atrás</button>
                      <button type="button" className="btn btn-primary btn-lg" onClick={() => setPaso(2)}>Continuar →</button>
                    </div>
                  </div>
                )}

                {paso === 2 && (
                  <div className="cotizacion-form-step animate-fade-up">
                    <h3>Tus datos de contacto</h3>
                    <div className="cotizacion-row">
                      <div className="form-group">
                        <label>Nombre completo *</label>
                        <input type="text" className="form-control" required placeholder="Tu nombre completo"
                          value={form.nombre} onChange={e => upd('nombre', e.target.value)} id="cotiz-nombre" />
                      </div>
                      <div className="form-group">
                        <label>Ciudad de origen</label>
                        <input type="text" className="form-control" placeholder="Ciudad, País"
                          value={form.ciudad} onChange={e => upd('ciudad', e.target.value)} id="cotiz-ciudad" />
                      </div>
                    </div>
                    <div className="cotizacion-row">
                      <div className="form-group">
                        <label>Email *</label>
                        <input type="email" className="form-control" required placeholder="tu@email.com"
                          value={form.email} onChange={e => upd('email', e.target.value)} id="cotiz-email" />
                      </div>
                      <div className="form-group">
                        <label>Teléfono / WhatsApp *</label>
                        <input type="tel" className="form-control" required placeholder="+52 55 1234 5678"
                          value={form.telefono} onChange={e => upd('telefono', e.target.value)} id="cotiz-telefono" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>¿Cómo nos conociste?</label>
                      <select className="form-control" value={form.como_nos_conocio} onChange={e => upd('como_nos_conocio', e.target.value)} id="cotiz-origen">
                        <option value="">— Seleccionar —</option>
                        <option value="instagram">Instagram</option>
                        <option value="facebook">Facebook</option>
                        <option value="google">Google</option>
                        <option value="recomendacion">Recomendación de amigo/familiar</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Comentarios adicionales</label>
                      <textarea className="form-control" rows="4"
                        placeholder="Cuéntanos más sobre tu viaje ideal: presupuesto aproximado, actividades favoritas, necesidades especiales..."
                        value={form.comentarios} onChange={e => upd('comentarios', e.target.value)} id="cotiz-comentarios" />
                    </div>
                    <div className="cotizacion-nav">
                      <button type="button" className="btn btn-outline-dark" onClick={() => setPaso(1)}>← Atrás</button>
                      <button type="button" className="btn btn-primary btn-lg"
                        disabled={!form.nombre || !form.email || !form.telefono}
                        onClick={() => setPaso(3)}>Revisar solicitud →</button>
                    </div>
                  </div>
                )}

                {paso === 3 && (
                  <div className="cotizacion-form-step animate-fade-up">
                    <h3>Confirmar solicitud</h3>
                    <div className="cotizacion-summary">
                      <div className="cotizacion-summary__item">
                        <span>🌍 Destino</span>
                        <strong>{form.destino || form.destino_personalizado}</strong>
                      </div>
                      <div className="cotizacion-summary__item">
                        <span>📅 Fechas</span>
                        <strong>{form.fecha_salida || '—'} → {form.fecha_regreso || '—'}</strong>
                      </div>
                      <div className="cotizacion-summary__item">
                        <span>👥 Viajeros</span>
                        <strong>{form.adultos} adultos, {form.ninos} niños</strong>
                      </div>
                      <div className="cotizacion-summary__item">
                        <span>🛏️ Habitación</span>
                        <strong>{form.tipo_habitacion}</strong>
                      </div>
                      <div className="cotizacion-summary__item">
                        <span>👤 Nombre</span>
                        <strong>{form.nombre}</strong>
                      </div>
                      <div className="cotizacion-summary__item">
                        <span>📧 Email</span>
                        <strong>{form.email}</strong>
                      </div>
                      <div className="cotizacion-summary__item">
                        <span>📞 Teléfono</span>
                        <strong>{form.telefono}</strong>
                      </div>
                    </div>
                    <p className="cotizacion-legal">
                      Al enviar esta solicitud, aceptas que Dilitours procese tus datos para ofrecerte la mejor cotización posible. No compartimos tu información con terceros.
                    </p>
                    <div className="cotizacion-nav">
                      <button type="button" className="btn btn-outline-dark" onClick={() => setPaso(2)}>← Atrás</button>
                      <button type="submit" className="btn btn-primary btn-lg">✈ Enviar solicitud</button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
