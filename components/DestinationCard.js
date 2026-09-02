'use client';

import Link from 'next/link';
import Image from 'next/image';

const categoryLabels = {
  'nacional': 'Nacional',
  'internacional': 'Internacional',
  'luna-de-miel': 'Luna de Miel',
  'aventura': 'Aventura',
  'negocios': 'Negocios',
  'familiar': 'Familiar',
  'local': 'Local',
  'crucero': 'Crucero'
};

function Stars({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} className={`star ${i <= Math.floor(rating) ? 'star--filled' : i - 0.5 <= rating ? 'star--half' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span>{rating}</span>
    </div>
  );
}

export default function DestinationCard({ destino }) {
  return (
    <div className="dest-card card">
      <div className="card-img-wrap">
        <Image
          src={destino.imagen}
          alt={destino.nombre}
          className="card-img"
          width={400}
          height={300}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="dest-card__badges">
          {(destino.categorias || [destino.categoria]).map((cat) => (
            <span key={cat} className={`badge-category badge-${cat} dest-card__badge`}>
              {categoryLabels[cat] || cat}
            </span>
          ))}
        </div>
        {destino.destacado && (
          <span className="dest-card__featured">
            <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" style={{ color: '#ffb400' }}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Destacado
          </span>
        )}
      </div>
      <div className="dest-card__body">
        <div className="dest-card__meta">
          {destino.pais && (
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {destino.pais}
            </span>
          )}
          {destino.duracion && (
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {destino.duracion}
            </span>
          )}
        </div>
        <h3 className="dest-card__name">{destino.nombre}</h3>
        <p className="dest-card__desc">{destino.descripcion}</p>

        {destino.incluye && destino.incluye.length > 0 && (
          <div className="dest-card__chips">
            {destino.incluye.slice(0, 3).map((item, idx) => (
              <span key={idx} className="dest-card__chip">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </span>
            ))}
            {destino.incluye.length > 3 && (
              <span className="dest-card__chip dest-card__chip--more">+{destino.incluye.length - 3} más</span>
            )}
          </div>
        )}

        <div className="dest-card__footer">
          <div className="dest-card__price">
            <span className="dest-card__price-label">Desde</span>
            <span className="dest-card__price-value">
              ${destino.precio.toLocaleString()} <small>{destino.moneda}</small>
            </span>
            <span className="dest-card__price-pp">por persona</span>
          </div>
          <div className="dest-card__action">
            <Stars rating={destino.rating} />
            <Link href={`/destinos/${destino.id}`} className="btn btn-primary btn-sm dest-card__btn">
              Ver detalles →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
