const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchTable(table) {
    if (!API_URL) {
        throw new Error('Falta NEXT_PUBLIC_API_URL en tu archivo .env.local');
    }

    const url = `${API_URL}?action=getData&table=${encodeURIComponent(table)}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Error de red (${res.status}) al pedir la tabla "${table}"`);
    }

    const data = await res.json();

    if (data && data.error) {
        throw new Error(data.error);
    }

    return data;
}
