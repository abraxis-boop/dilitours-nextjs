'use client';

import Link from 'next/link';

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
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`star ${i <= Math.floor(rating) ? 'star--filled' : i - 0.5 <= rating ? 'star--half' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z"/>
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
        <img src={destino.imagen} alt={destino.nombre} className="card-img" loading="lazy" />
        <span className={`badge-category badge-${destino.categoria} dest-card__badge`}>
          {categoryLabels[destino.categoria] || destino.categoria}
        </span>
        {destino.destacado && (
          <span className="dest-card__featured">⭐ Destacado</span>
        )}
      </div>
      <div className="dest-card__body">
        <div className="dest-card__meta">
          <span className="dest-card__country">📍 {destino.pais}</span>
          <span className="dest-card__duration">🕐 {destino.duracion}</span>
        </div>
        <h3 className="dest-card__name">{destino.nombre}</h3>
        <p className="dest-card__desc">{destino.descripcion}</p>
        <Stars rating={destino.rating} />
        <span className="dest-card__reviews">({destino.reviews} reseñas)</span>

        <div className="dest-card__footer">
          <div className="dest-card__price">
            <span className="dest-card__price-label">Desde</span>
            <span className="dest-card__price-value">
              ${destino.precio.toLocaleString()} <small>{destino.moneda}</small>
            </span>
            <span className="dest-card__price-pp">por persona</span>
          </div>
          <Link href={`/destinos/${destino.id}`} className="btn btn-primary btn-sm dest-card__btn" id={`dest-card-btn-${destino.id}`}>
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
}
