'use client';

import { useEffect, useState } from 'react';
import { fetchTable } from '../services/api';
import { destinos as destinosEstaticos } from './destinos';

function buildAppSheetImageUrl(appId, tableName, rutaRelativa) {
  if (!rutaRelativa) return null;
  return `https://www.appsheet.com/template/gettablefileurl?appName=${encodeURIComponent(appId)}&tableName=${encodeURIComponent(tableName)}&fileName=${encodeURIComponent(rutaRelativa)}`;
}

function fixGoogleDriveUrl(url) {
  if (!url || typeof url !== 'string') return url;
  const trimmed = url.trim();
  const match = trimmed.match(/(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)|lh3\.googleusercontent\.com\/d\/)([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}=w1600`;
  }
  return trimmed;
}

function resizedImage(url, width = 1600) {
  if (!url || typeof url !== 'string') return null;
  const fixed = fixGoogleDriveUrl(url.trim());
  if (!fixed) return null;

  if (fixed.includes('googleusercontent.com') || fixed.startsWith('/')) {
    return fixed;
  }
  if (!fixed.includes('appsheet.com')) {
    return fixed;
  }
  const clean = fixed.replace(/^https?:\/\//, '');
  return `https://images.weserv.nl/?url=${encodeURIComponent(clean)}&w=${width}&q=85&output=webp`;
}

function collectImages(row, maxImages = 10) {
  if (!row) return [];
  const urls = [];

  const addUrl = (val) => {
    if (!val || typeof val !== 'string') return;
    const trimmed = val.trim();
    if (!trimmed) return;
    let fullUrl = null;
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) {
      fullUrl = fixGoogleDriveUrl(trimmed);
    } else {
      fullUrl = buildAppSheetImageUrl(row._appId, row._tableName, trimmed);
    }
    if (fullUrl && !urls.includes(fullUrl)) {
      urls.push(fullUrl);
    }
  };

  // Check single keys
  const singleKeys = [
    'imagen', 'Imagen', 'IMAGEN',
    'foto', 'Foto', 'FOTO',
    'image', 'Image', 'IMAGE',
    'url_imagen', 'URL_Imagen', 'Url_Imagen',
    'portada', 'Portada'
  ];
  for (const k of singleKeys) {
    addUrl(row[k]);
  }

  // Check numbered keys (imagen1 ... imagen10)
  for (let i = 1; i <= maxImages; i++) {
    const keysToTry = [
      `imagen${i}`, `Imagen${i}`, `imagen_${i}`, `Imagen_${i}`,
      `foto${i}`, `Foto${i}`, `foto_${i}`, `Foto_${i}`,
      `image${i}`, `Image${i}`, `image_${i}`, `Image_${i}`
    ];
    for (const k of keysToTry) {
      addUrl(row[k]);
    }
  }

  return urls;
}

function normalizarCategorias(catRaw = '') {
  const validas = ['nacional', 'internacional', 'local', 'luna-de-miel', 'familiar', 'negocios', 'aventura', 'crucero'];

  // Support arrays already
  const partes = Array.isArray(catRaw)
    ? catRaw
    : String(catRaw).split(/[,;|]+/);

  const slugs = partes
    .map(p =>
      p.toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .replace(/\s+/g, '-')
    )
    .filter(slug => validas.includes(slug));

  return slugs.length > 0 ? slugs : ['internacional'];
}

function esVerdadero(valor) {
  if (typeof valor === 'boolean') return valor;
  if (!valor) return false;
  const v = String(valor).toLowerCase().trim();
  return v === 'true' || v === 'si' || v === 'sí' || v === '1' || v === 'x' || v === 'y' || v === 'yes';
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

function formatLabelAndDay(part, defaultIndex) {
  if (!part) return { dia: defaultIndex + 1, etiqueta: `Día ${defaultIndex + 1}` };
  
  const trimmed = String(part).trim();
  
  // 1. Check for time format (e.g. 12:00 PM, 03:30 AM, 14:00, 7:00 pm)
  if (/\b\d{1,2}:\d{2}\s*(?:[ap]\.?m\.?)?/i.test(trimmed) || /\b\d{1,2}\s*(?:[ap]\.?m\.)/i.test(trimmed)) {
    return { dia: trimmed, etiqueta: trimmed };
  }

  // 2. Check for "Día X" or "Day X"
  const matchDiaWord = trimmed.match(/^(?:Día|Day)\s*(\d+)$/i);
  if (matchDiaWord) {
    const num = parseInt(matchDiaWord[1], 10);
    return { dia: num, etiqueta: `Día ${num}` };
  }

  // 3. Check if purely a number
  if (/^\d+$/.test(trimmed)) {
    const num = parseInt(trimmed, 10);
    return { dia: num, etiqueta: `Día ${num}` };
  }

  // 4. Any custom string label (e.g. "Tarde", "Mañana", "Salida", "Check-in")
  return { dia: trimmed, etiqueta: trimmed };
}

function parseItinerario(raw) {
  if (!raw) return [];

  if (Array.isArray(raw)) {
    return raw.map((item, i) => {
      if (typeof item === 'object' && item !== null) {
        const { dia, etiqueta } = formatLabelAndDay(item.etiqueta || item.dia || item.label, i);
        return {
          dia,
          etiqueta,
          titulo: item.titulo || item.title || etiqueta,
          descripcion: item.descripcion || item.description || item.detalle || ''
        };
      }
      const parsedStr = parseItinerario(String(item));
      return parsedStr[0] || { dia: i + 1, etiqueta: `Día ${i + 1}`, titulo: String(item), descripcion: '' };
    });
  }

  if (typeof raw !== 'string') return [];

  const rawStr = raw.trim();
  if (!rawStr) return [];

  if (rawStr.startsWith('[') && rawStr.endsWith(']')) {
    try {
      const parsed = JSON.parse(rawStr);
      if (Array.isArray(parsed)) {
        return parseItinerario(parsed);
      }
    } catch (e) {
      // Continue to line parsing
    }
  }

  const lineas = rawStr
    .replace(/\\n/g, '\n')
    .split(/[\n\r]+/)
    .map(linea => linea.trim())
    .filter(Boolean);

  if (lineas.length === 0) return [];

  return lineas.map((linea, i) => {
    const partesPipe = linea.split('|').map(p => p.trim());

    if (partesPipe.length >= 3) {
      const { dia, etiqueta } = formatLabelAndDay(partesPipe[0], i);
      return {
        dia,
        etiqueta,
        titulo: partesPipe[1] || etiqueta,
        descripcion: partesPipe.slice(2).join(' | ')
      };
    }

    if (partesPipe.length === 2) {
      const isTimeOrDay = /^(?:Día|Day)?\s*\d+/i.test(partesPipe[0]) || /\b\d{1,2}:\d{2}/i.test(partesPipe[0]);
      if (isTimeOrDay) {
        const { dia, etiqueta } = formatLabelAndDay(partesPipe[0], i);
        return {
          dia,
          etiqueta,
          titulo: partesPipe[1],
          descripcion: ''
        };
      }
      const { dia, etiqueta } = formatLabelAndDay(null, i);
      return {
        dia,
        etiqueta,
        titulo: partesPipe[0],
        descripcion: partesPipe[1]
      };
    }

    const matchDia = linea.match(/^(?:Día\s*(\d+)|Day\s*(\d+)|(\d{1,2}:\d{2}\s*(?:[ap]\.?m\.?)?)|(\d+))\s*[:\-\.]\s*(.*)$/i);
    if (matchDia) {
      const matchedPart = matchDia[1] || matchDia[2] || matchDia[3] || matchDia[4];
      const { dia, etiqueta } = formatLabelAndDay(matchedPart, i);
      const resto = matchDia[5].trim();
      const partesResto = resto.split(/[\-\–\:]\s*/);
      if (partesResto.length > 1) {
        return {
          dia,
          etiqueta,
          titulo: partesResto[0].trim(),
          descripcion: partesResto.slice(1).join(' - ').trim()
        };
      }
      return {
        dia,
        etiqueta,
        titulo: resto,
        descripcion: ''
      };
    }

    const { dia, etiqueta } = formatLabelAndDay(null, i);
    return {
      dia,
      etiqueta,
      titulo: linea,
      descripcion: ''
    };
  });
}

function mapDestino(row, index) {
  const imagenesOriginales = collectImages(row);
  const imagenes = imagenesOriginales.length
    ? imagenesOriginales.map(url => resizedImage(url, 1600))
    : ['/destinations_grid.jpg'];

  const parsedId = row.id != null && String(row.id).trim() !== '' ? String(row.id).trim() : index + 1;
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
    categorias: normalizarCategorias(row.categorias ?? row.categoria),
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

    fetchTable('Catalogo_tours', { forceRefresh: refreshKey > 0 })
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
