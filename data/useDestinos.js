'use client';

import { useEffect, useState } from 'react';
import { fetchTable } from '../services/api';
import { destinos as destinosEstaticos } from './destinos';

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
  
  const rawStr = String(raw).trim();
  if (!rawStr) return [];

  const splitPattern = rawStr.includes('\n') ? /[\n\r;•]+/ : /[,;\n\r•]+/;
  
  return rawStr
    .split(splitPattern)
    .map(s => s.trim().replace(/^[-•*✓\s]+/, ''))
    .filter(Boolean);
}

function parseItinerario(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw !== 'string') return [];

  const lineas = raw
    .split(/[\n\r]+/)
    .map(linea => linea.trim())
    .filter(Boolean);

  if (lineas.length === 0) return [];

  return lineas.map((linea, i) => {
    const partesPipe = linea.split('|').map(p => p.trim());
    if (partesPipe.length >= 3) {
      const matchDia = partesPipe[0].match(/\d+/);
      return {
        dia: matchDia ? parseInt(matchDia[0], 10) : i + 1,
        titulo: partesPipe[1],
        descripcion: partesPipe.slice(2).join(' | ')
      };
    }
    if (partesPipe.length === 2) {
      const matchDia = partesPipe[0].match(/^(?:Día|Day)?\s*(\d+)$/i);
      if (matchDia) {
        return { dia: parseInt(matchDia[1], 10), titulo: partesPipe[1], descripcion: '' };
      }
      return { dia: i + 1, titulo: partesPipe[0], descripcion: partesPipe[1] };
    }

    const matchDia = linea.match(/^(?:Día\s*(\d+)|Day\s*(\d+)|(\d+))\s*[:\-\.]\s*(.*)$/i);
    if (matchDia) {
      const diaNum = parseInt(matchDia[1] || matchDia[2] || matchDia[3], 10);
      const resto = matchDia[4].trim();
      const partesResto = resto.split(/[\-\–\:]\s*/);
      if (partesResto.length > 1) {
        return {
          dia: diaNum || i + 1,
          titulo: partesResto[0].trim(),
          descripcion: partesResto.slice(1).join(' - ').trim()
        };
      }
      return { dia: diaNum || i + 1, titulo: resto, descripcion: '' };
    }

    return { dia: i + 1, titulo: linea, descripcion: '' };
  });
}

function mapDestino(row, index) {
  const imagenesOriginales = collectImages(row);
  const imagenes = imagenesOriginales.length
    ? imagenesOriginales.map(url => resizedImage(url, 1200, 800))
    : ['/destinations_grid.jpg'];

  const parsedId = parseNumero(row.id, index + 1);
  const rawIncluye = 
    row.incluye ?? row.Incluye ?? row.INCLUYE ?? row.incluidos ?? row.Incluidos ??
    row.servicios ?? row.que_incluye ?? row.incluido ?? row['¿Qué incluye?'] ?? row['Que incluye'] ?? row['incluye'];

  let incluyeFinal = parseIncluye(rawIncluye);
  if (!incluyeFinal || incluyeFinal.length === 0) {
    const estatico = destinosEstaticos.find(d => d.id === parsedId || d.nombre.toLowerCase().trim() === String(row.nombre || '').toLowerCase().trim());
    if (estatico && estatico.incluye && estatico.incluye.length) {
      incluyeFinal = estatico.incluye;
    } else {
      incluyeFinal = [];
    }
  }

  const rawItinerario = 
    row.itinerario ?? row.Itinerario ?? row.ITINERARIO ?? row.itinerarios ?? 
    row.Itinerarios ?? row.itinerario_detallado ?? row.Itinerario_Detallado ?? row['Itinerario'] ?? row['itinerario'];

  let itinerarioFinal = parseItinerario(rawItinerario);

  if (!itinerarioFinal || itinerarioFinal.length === 0) {
    const estatico = destinosEstaticos.find(d => d.id === parsedId || d.nombre.toLowerCase().trim() === String(row.nombre || '').toLowerCase().trim());
    if (estatico && estatico.itinerario && estatico.itinerario.length > 0) {
      itinerarioFinal = estatico.itinerario;
    } else {
      itinerarioFinal = [];
    }
  }

  const duracionFinal = row.duracion ?? row['duracion '] ?? row.Duracion ?? row.DURACION ?? '';
  const ratingFinal = parseNumero(row.raiting ?? row.rating ?? row.Raiting ?? row.Rating, 4.5);

  return {
    id: parsedId,
    nombre: row.nombre || 'Destino',
    pais: row.pais || '',
    categoria: normalizarCategoria(row.categoria),
    imagen: imagenes[0],
    imagenes,
    precio: parseNumero(row.precio, 0),
    moneda: row.moneda || 'USD',
    duracion: duracionFinal,
    descripcion: row.descripcion || '',
    destacado: esVerdadero(row.destacado),
    activo: row.activo == null || row.activo === '' ? true : esVerdadero(row.activo),
    rating: ratingFinal,
    incluye: incluyeFinal,
    itinerario: itinerarioFinal,
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
