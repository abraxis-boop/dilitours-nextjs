import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ paddingTop: '120px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: '80px', marginBottom: '24px', display: 'block', color: 'var(--gray-400)' }}>404</span>
      <h1 style={{ color: 'var(--dark)', marginBottom: '12px' }}>Página no encontrada</h1>
      <p style={{ color: 'var(--gray-600)', marginBottom: '32px' }}>La página que buscas no existe o fue movida.</p>
      <Link href="/" className="btn btn-primary btn-lg">Volver al inicio</Link>
    </div>
  );
}
