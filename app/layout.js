import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { agency } from '../data/agency';
import WhatsAppFloat from '../components/WhatsAppFloat';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['600', '700', '800'],
});

export const metadata = {
  metadataBase: new URL(agency.seo.siteUrl),
  title: {
    default: `${agency.name} - Agencia de Viajes en Tepic, Nayarit`,
    template: `%s | ${agency.name}`,
  },
  description: agency.description,
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  keywords: [
    'agencia de viajes',
    'viajes Tepic',
    'paquetes de viaje',
    'renta de autos',
    'cotización viajes',
    'Nayarit',
    'México',
    'turismo',
    'DiliTours',
  ],
  authors: [{ name: agency.name }],
  creator: agency.name,
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: agency.name,
    title: `${agency.name} - Tu agencia de viajes de confianza`,
    description: agency.description,
    images: [
      {
        url: agency.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${agency.name} - Destinos de viaje`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${agency.name} - Agencia de Viajes`,
    description: agency.description,
    images: [agency.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
