import { agency } from '../data/agency';

export default function sitemap() {
  const baseUrl = agency.seo.siteUrl;

  const routes = [
    '',
    '/destinos',
    '/galeria',
    '/renta-autos',
    '/nosotros',
    '/contacto',
    '/cotizacion',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
