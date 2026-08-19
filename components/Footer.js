'use client';

import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <div className="footer__logo">
                <div className="footer__logo-icon">✈</div>
                <span>Dili<strong>Tours</strong></span>
              </div>
              <p>Tu agencia de viajes de confianza. Más de 10 años creando experiencias inolvidables para miles de familias y viajeros.</p>
              <div className="footer__social">
                <a href="#" aria-label="Facebook" id="footer-facebook" className="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
                <a href="#" aria-label="Instagram" id="footer-instagram" className="social-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                </a>
                <a href="#" aria-label="WhatsApp" id="footer-whatsapp" className="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                </a>
                <a href="#" aria-label="TikTok" id="footer-tiktok" className="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3 6.34 6.34 0 0 0 9.49 21.6a6.34 6.34 0 0 0 6.34-6.34V8.63a8.16 8.16 0 0 0 4.74 1.5V6.69a4.85 4.85 0 0 1-.98-.0z" /></svg>
                </a>
              </div>
            </div>

            <div className="footer__links-col">
              <h4>Navegación</h4>
              <ul>
                <li><Link href="/">Inicio</Link></li>
                <li><Link href="/destinos">Destinos</Link></li>
                <li><Link href="/galeria">Galería</Link></li>
                <li><Link href="/renta-autos">Renta de Autos</Link></li>
                <li><Link href="/nosotros">Nosotros</Link></li>
                <li><Link href="/contacto">Contacto</Link></li>
              </ul>
            </div>

            <div className="footer__links-col">
              <h4>Categorías</h4>
              <ul>
                <li><Link href="/destinos?cat=nacional">Nacionales</Link></li>
                <li><Link href="/destinos?cat=internacional">Internacionales</Link></li>
                <li><Link href="/destinos?cat=luna-de-miel">Luna de Miel</Link></li>
                <li><Link href="/destinos?cat=familiar">Viajes Familiares</Link></li>
                <li><Link href="/destinos?cat=aventura">Aventura</Link></li>
                <li><Link href="/destinos?cat=negocios">Negocios</Link></li>
              </ul>
            </div>

            <div className="footer__contact-col">
              <h4>Contacto</h4>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">📍</span>
                <span>Av. Reforma 123, Col. Centro<br />Ciudad de México, CDMX</span>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">📞</span>
                <a href="tel:+525512345678">+52 55 1234 5678</a>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">✉️</span>
                <a href="mailto:hola@dilitours.com">hola@dilitours.com</a>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">🕐</span>
                <span>Lun–Sáb: 9:00–19:00</span>
              </div>
              <Link href="/cotizacion" className="btn btn-primary btn-sm" style={{ marginTop: '16px' }}>
                Cotiza tu viaje
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} DiliTours. Todos los derechos reservados.</p>
          <div className="footer__bottom-links">
            <a href="#">Términos y condiciones</a>
            <a href="#">Política de privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
