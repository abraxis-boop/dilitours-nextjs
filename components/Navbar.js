'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/destinos', label: 'Destinos' },
  { to: '/galeria', label: 'Galería' },
  { to: '/renta-autos', label: 'Renta de Autos' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const transparent = isHome && !scrolled;

  return (
    <header className={`navbar ${transparent ? 'navbar--transparent' : 'navbar--solid'} ${menuOpen ? 'navbar--open' : ''}`}>
      <div className="container navbar__inner">
        <Link href="/" className="navbar__logo">
          <div className="navbar__logo-icon">
            <img src="/logo.png" alt="" width={40} height={40} style={{ borderRadius: '100%' }} />
          </div>
          <span className="navbar__logo-text">Dili<strong>Tours</strong></span>
        </Link>

        <nav className="navbar__nav">
          {links.map(l => (
            <Link
              key={l.to}
              href={l.to}
              className={`navbar__link ${pathname === l.to ? 'navbar__link--active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="navbar__actions">
          <Link href="/cotizacion" className="btn btn-primary btn-sm navbar__cta">
            Cotizar ahora
          </Link>
          <button
            className={`navbar__hamburger ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menú"
            id="navbar-menu-toggle"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        <nav>
          {links.map(l => (
            <Link
              key={l.to}
              href={l.to}
              className={`navbar__mobile-link ${pathname === l.to ? 'active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/cotizacion" className="btn btn-primary" style={{ marginTop: '16px', justifyContent: 'center', display: 'flex' }}>
            Cotizar ahora
          </Link>
        </nav>
      </div>
    </header>
  );
}
