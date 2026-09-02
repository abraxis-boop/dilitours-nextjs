const API_URL = process.env.NEXT_PUBLIC_API_URL;
const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutos de caché por defecto

// Caché en memoria para respuesta instantánea entre navegaciones
const memoryCache = new Map();

/**
 * Pide datos de una tabla con caché automático (Memoria + sessionStorage)
 * @param {string} table Nombre de la tabla a consultar
 * @param {object} options Opciones { forceRefresh?: boolean, ttlMs?: number }
 */
export async function fetchTable(table, options = {}) {
    const { forceRefresh = false, ttlMs = DEFAULT_TTL_MS } = options;
    const cacheKey = `dilitours_cache_${table}`;
    const now = Date.now();

    if (!API_URL) {
        throw new Error('Falta NEXT_PUBLIC_API_URL en tu archivo .env.local');
    }

    // 1. Revisar caché en memoria (0ms latencia)
    if (!forceRefresh && memoryCache.has(cacheKey)) {
        const entry = memoryCache.get(cacheKey);
        if (now - entry.timestamp < ttlMs) {
            return entry.data;
        }
    }

    // 2. Revisar sessionStorage (mantiene el caché al recargar la pestaña)
    if (!forceRefresh && typeof window !== 'undefined') {
        try {
            const stored = sessionStorage.getItem(cacheKey);
            if (stored) {
                const entry = JSON.parse(stored);
                if (now - entry.timestamp < ttlMs) {
                    memoryCache.set(cacheKey, entry);
                    return entry.data;
                }
            }
        } catch (e) {
            // Ignorar errores de lectura de storage
        }
    }

    // 3. Consultar la API si no hay caché o si caducó
    const url = `${API_URL}?action=getData&table=${encodeURIComponent(table)}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Error de red (${res.status}) al pedir la tabla "${table}"`);
    }

    const data = await res.json();

    if (data && data.error) {
        throw new Error(data.error);
    }

    // 4. Guardar en memoria y sessionStorage
    const cacheEntry = { data, timestamp: now };
    memoryCache.set(cacheKey, cacheEntry);

    if (typeof window !== 'undefined') {
        try {
            sessionStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
        } catch (e) {
            // Ignorar límite de almacenamiento
        }
    }

    return data;
}

/**
 * Limpia el caché de una tabla específica o de todas las tablas
 */
export function clearApiCache(table) {
    if (table) {
        const cacheKey = `dilitours_cache_${table}`;
        memoryCache.delete(cacheKey);
        if (typeof window !== 'undefined') {
            try {
                sessionStorage.removeItem(cacheKey);
            } catch (e) {}
        }
    } else {
        memoryCache.clear();
        if (typeof window !== 'undefined') {
            try {
                Object.keys(sessionStorage).forEach((k) => {
                    if (k.startsWith('dilitours_cache_')) {
                        sessionStorage.removeItem(k);
                    }
                });
            } catch (e) {}
        }
    }
}

