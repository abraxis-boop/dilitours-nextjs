'use client';

import { useEffect, useState } from 'react';
import { fetchTable } from '../services/api';

function buildAppSheetImageUrl(appId, tableName, rutaRelativa) {
  if (!rutaRelativa) return null;
  return `https://www.appsheet.com/template/gettablefileurl?appName=${encodeURIComponent(appId)}&tableName=${encodeURIComponent(tableName)}&fileName=${encodeURIComponent(rutaRelativa)}`;
}

function resizedImage(url, width, height) {
  if (!url) return null;
  const clean = String(url).replace(/^https?:\/\//, '');
  return (
    'https://images.weserv.nl/?url=' +
    encodeURIComponent(clean) +
    '&w=' + width +
    (height ? '&h=' + height + '&fit=cover' : '') +
    '&q=75&output=webp'
  );
}

function collectImages(row, maxImages = 5) {
  const urls = [];
  for (let i = 1; i <= maxImages; i++) {
    const filename = row[`imagen${i}`];
    if (filename) {
      urls.push(buildAppSheetImageUrl(row._appId, row._tableName, filename));
    }
  }
  return urls;
}

function normalizarCategoria(catRaw = '') {
  const slug = catRaw
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  const validas = ['nacional', 'internacional', 'local', 'luna-de-miel', 'familiar', 'negocios', 'aventura', 'crucero'];
  return validas.includes(slug) ? slug : slug || 'internacional';
}

function esVerdadero(valor) {
  if (typeof valor === 'boolean') return valor;
  if (!valor) return false;
  const v = String(valor).toLowerCase().trim();
  return v === 'true' || v === 'si' || v === 'sí' || v === '1' || v === 'x';
}

function parseNumero(valor, porDefecto) {
  const n = parseFloat(String(valor ?? '').replace(/[^0-9.-]/g, ''));
  return Number.isFinite(n) ? n : porDefecto;
}

function parseIncluye(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map(s => String(s).trim()).filter(Boolean);
  return String(raw)
    .split(/[,;\n]/)
    .map(s => s.trim())
    .filter(Boolean);
}

function parseItinerario(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  return String(raw)
    .split('\n')
    .map(linea => linea.trim())
    .filter(Boolean)
    .map((linea, i) => {
      const partes = linea.split('|').map(p => p.trim());
      if (partes.length >= 3) {
        return { dia: parseInt(partes[0], 10) || i + 1, titulo: partes[1], descripcion: partes.slice(2).join(' | ') };
      }
      if (partes.length === 2) {
        return { dia: i + 1, titulo: partes[0], descripcion: partes[1] };
      }
      return { dia: i + 1, titulo: linea, descripcion: '' };
    });
}

function mapDestino(row, index) {
  const imagenesOriginales = collectImages(row);
  const imagenes = imagenesOriginales.length
    ? imagenesOriginales.map(url => resizedImage(url, 1200, 800))
    : ['/destinations_grid.jpg'];

  return {
    id: parseNumero(row.id, index + 1),
    nombre: row.nombre || 'Destino',
    pais: row.pais || '',
    categoria: normalizarCategoria(row.categoria),
    imagen: imagenes[0],
    imagenes,
    precio: parseNumero(row.precio, 0),
    moneda: row.moneda || 'USD',
    duracion: row.duracion || '',
    descripcion: row.descripcion || '',
    destacado: esVerdadero(row.destacado),
    activo: row.activo == null || row.activo === '' ? true : esVerdadero(row.activo),
    rating: parseNumero(row.rating, 4.5),
    incluye: parseIncluye(row.incluye),
    itinerario: parseItinerario(row.itinerario),
  };
}

export function useDestinos(refreshKey = 0) {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;

    setLoading(true);
    setError(null);

    fetchTable('Catalogo_tours')
      .then((rows) => {
        if (!activo) return;
        setDestinos(rows.map(mapDestino).filter(d => d.activo));
      })
      .catch((err) => {
        if (!activo) return;
        setError(err.message);
      })
      .finally(() => {
        if (activo) setLoading(false);
      });

    return () => { activo = false; };
  }, [refreshKey]);

  return { destinos, loading, error };
}
