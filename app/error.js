'use client';

export default function Error({ error, reset }) {
  return (
    <div className="error-screen">
      <span className="error-screen__icon">!</span>
      <h2>Algo salió mal</h2>
      <p>Ha occurrido un error inesperado. Por favor, intenta de nuevo.</p>
      <button className="btn btn-primary" onClick={() => reset()}>
        Intentar de nuevo
      </button>
    </div>
  );
}
