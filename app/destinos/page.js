'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { categorias } from '../../data/destinos';
import { useDestinos } from '../../data/useDestinos';
import DestinationCard from '../../components/DestinationCard';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LoadingSpinner from '../../components/LoadingSpinner';
import useScrollReveal from '../../hooks/useScrollReveal';

function DestinosContent() {
  useScrollReveal();
  const params = useSearchParams();
  const { destinos, loading, error } = useDestinos();
  const [catActiva, setCatActiva] = useState(params.get('cat') || 'todos');
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('destacados');

  const filtrados = useMemo(() => {
    let res = [...destinos];
    if (catActiva !== 'todos') res = res.filter(d => Array.isArray(d.categorias) ? d.categorias.includes(catActiva) : d.categorias === catActiva);
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      res = res.filter(d =>
        d.nombre.toLowerCase().includes(q) ||
        d.pais.toLowerCase().includes(q) ||
        d.descripcion.toLowerCase().includes(q)
      );
    }
    if (orden === 'precio-asc') res.sort((a, b) => a.precio - b.precio);
    else if (orden === 'precio-desc') res.sort((a, b) => b.precio - a.precio);
    else if (orden === 'rating') res.sort((a, b) => b.rating - a.rating);
    else res.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
    return res;
  }, [destinos, catActiva, busqueda, orden]);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--navbar-h)' }}>
        <div className="page-hero">
          <div className="container page-hero-content">
            <div className="badge animate-fade-up">Nuestros Destinos</div>
            <h1 className="animate-fade-up-delay-1">Encuentra tu <span style={{color: 'var(--primary)'}}>destino ideal</span></h1>
            <p className="animate-fade-up-delay-2">Explora nuestra colección de paquetes de viaje cuidadosamente seleccionados.</p>
          </div>
        </div>

        <div className="destinos-filters-wrap">
          <div className="container">
            <div className="destinos-filters">
              <div className="destinos-search">
                <input
                  type="text"
                  placeholder="Buscar destino o país..."
                  value={busqueda}
                  onChange={e => setBusqueda(e.target.value)}
                  className="form-control destinos-search__input"
                  id="destinos-search"
                />
              </div>
              <select
                value={orden}
                onChange={e => setOrden(e.target.value)}
                className="form-control destinos-sort"
                id="destinos-sort"
              >
                <option value="destacados">Destacados primero</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="rating">Mejor calificados</option>
              </select>
              <div className="destinos-cats">
                {categorias.map(c => (
                  <button
                    key={c.id}
                    className={`destinos-cat-btn ${catActiva === c.id ? 'active' : ''}`}
                    onClick={() => setCatActiva(c.id)}
                    id={`cat-btn-${c.id}`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="section" style={{ paddingTop: '40px' }} data-reveal>
          <div className="container">
            {loading && (
              <LoadingSpinner text="Cargando destinos..." subtext="Buscando los mejores paquetes para ti" />
            )}

            {error && (
              <p style={{ textAlign: 'center', padding: '48px 0', color: 'var(--danger, #d33)' }}>
                No pudimos cargar los destinos en este momento. Intenta de nuevo más tarde.
              </p>
            )}

            {!loading && !error && (
              <>
            <p className="destinos-count">
              {filtrados.length === 0
                ? 'No se encontraron destinos'
                : `Mostrando ${filtrados.length} destino${filtrados.length > 1 ? 's' : ''}`}
            </p>
            {filtrados.length > 0 ? (
              <div className="grid-3">
                {filtrados.map(d => <DestinationCard key={d.id} destino={d} />)}
              </div>
            ) : (
              <div className="destinos-empty">
                <h3>No encontramos resultados</h3>
                <p>Prueba con otro término de búsqueda o categoría.</p>
                <button className="btn btn-primary" onClick={() => { setBusqueda(''); setCatActiva('todos'); }}>
                  Ver todos los destinos
                </button>
              </div>
            )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function DestinosPage() {
  return (
    <Suspense fallback={
      <>
        <Navbar />
        <main style={{ paddingTop: 'var(--navbar-h)', textAlign: 'center', padding: '120px 24px' }}>
          <p>Cargando destinos...</p>
        </main>
        <Footer />
      </>
    }>
      <DestinosContent />
    </Suspense>
  );
}
