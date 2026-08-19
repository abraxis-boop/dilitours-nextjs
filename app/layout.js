import './globals.css';

export const metadata = {
  title: 'Dilitours - Tu agencia de viajes de confianza',
  description: 'Paquetes de viaje, destinos, renta de autos y más. Más de 10 años creando experiencias inolvidables.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
