'use client';

export default function LoadingSpinner({ text = 'Cargando...', subtext = '' }) {
  return (
    <div className="api-loading">
      <div className="api-loading__spinner">
        <div className="api-loading__ring" />
        <div className="api-loading__ring api-loading__ring--inner" />
      </div>
      <div className="api-loading__dots">
        <span /><span /><span />
      </div>
      <p className="api-loading__text">{text}</p>
      {subtext && <p className="api-loading__subtext">{subtext}</p>}
    </div>
  );
}
