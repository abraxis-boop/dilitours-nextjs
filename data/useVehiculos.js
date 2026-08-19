'use client';

import { useEffect, useState } from 'react';
import { fetchTable } from '../services/api';

function normalizarTipo(tipoRaw = '') {
  const t = tipoRaw.toLowerCase();
  if (t.includes('suv')) return 'suv';
  if (t.includes('van') || t.includes('minivan')) return 'van';
  if (t.includes('sedan') || t.includes('sedán')) return 'sedan';
  return 'otro';
}

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

function mapVehiculo(row, index) {
  const imagenesOriginales = collectImages(row);
  const imagenes = imagenesOriginales.length
    ? imagenesOriginales.map(url => resizedImage(url, 800, 500))
    : ['/cars_fleet.jpg'];

  return {
    id: index,
    nombre: row.nombre_vehiculo || 'Vehículo',
    marca: row.marca || '',
    modelo: row.modelo || '',
    tipo: normalizarTipo(row.tipo_vehiculo),
    tipoLabel: row.tipo_vehiculo || 'Vehículo',
    capacidad: row.capacidad || '—',
    rendimiento: row['km/l'] || null,
    imagenes,
  };
}

export function useVehiculos() {
  const [autos, setAutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;

    fetchTable('vehiculos')
      .then((rows) => {
        if (!activo) return;
        setAutos(rows.map(mapVehiculo));
      })
      .catch((err) => {
        if (!activo) return;
        setError(err.message);
      })
      .finally(() => {
        if (activo) setLoading(false);
      });

    return () => { activo = false; };
  }, []);

  return { autos, loading, error };
}
