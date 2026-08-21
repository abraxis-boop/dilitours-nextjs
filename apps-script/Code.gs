/**
 * API multi-tabla para el sitio Dilitours.
 * GitHub Pages llama a esta URL con ?action=getData&table=NOMBRE_TABLA
 * y recibe el arreglo de filas de esa tabla en AppSheet (o {error: "..."}).
 *
 * El App ID y la Access Key viven en Script Properties, nunca en el
 * código del sitio.
 */

/**
 * LISTA BLANCA: solo estas tablas se pueden pedir desde fuera, y de cada
 * una solo se regresan estas columnas. Cualquier tabla o columna que no
 * esté aquí nunca sale del servidor, aunque alguien la pida directamente.
 *
 * Ajusta esto según lo que realmente muestres en cada página del sitio.
 */
const ALLOWED_TABLES = {
  vehiculos: ['tipo_vehiculo', 'nombre_vehiculo', 'marca', 'modelo', 'capacidad', 'km/l', 'imagen1', 'imagen2', 'imagen3', 'imagen4', 'imagen5'],
  Catalogo_tours: ['id', 'nombre', 'pais', 'categoria', 'descripcion', 'notas', 'precio', 'moneda', 'duracion', 'destacado', 'activo', 'rating', 'incluye', 'itinerario', 'imagen1', 'imagen2', 'imagen3', 'imagen4', 'imagen5'],
  Hotel: ['nombre', 'categoria', 'municipio', 'estado', 'pais', 'calle_numero', 'colonia', 'descripcion', 'imagen1', 'imagen2', 'imagen3'],
  catalogo_productos: ['Nombre', 'Precio', 'imagen1', 'imagen2', 'imagen3'],
};

function doGet(e) {
  const params = (e && e.parameter) || {};
  const table = params.table;

  if (!table) {
    return jsonOutput({ error: 'Falta el parámetro "table" en la URL.' });
  }

  if (!Object.prototype.hasOwnProperty.call(ALLOWED_TABLES, table)) {
    return jsonOutput({ error: 'Tabla no permitida.' });
  }

  try {
    const rows = getTableData(table);
    return jsonOutput(rows);
  } catch (err) {
    return jsonOutput({ error: err.message });
  }
}

/**
 * Llama a AppSheet (Action: Find) para la tabla indicada y regresa SOLO
 * las columnas listadas en ALLOWED_TABLES, más _appId y _tableName para
 * que el frontend pueda construir URLs de imágenes.
 */
function getTableData(table) {
  const props = PropertiesService.getScriptProperties();
  const appId = props.getProperty('APPSHEET_APP_ID');
  const accessKey = props.getProperty('APPSHEET_ACCESS_KEY');

  if (!appId || !accessKey) {
    throw new Error('Faltan APPSHEET_APP_ID o APPSHEET_ACCESS_KEY en Project Settings > Script Properties.');
  }

  const url = 'https://api.appsheet.com/api/v2/apps/' + appId + '/tables/' + encodeURIComponent(table) + '/Action';

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: { ApplicationAccessKey: accessKey },
    payload: JSON.stringify({
      Action: 'Find',
      Properties: { Locale: 'es-MX' },
      Rows: [],
    }),
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(url, options);
  const code = response.getResponseCode();
  const text = response.getContentText();

  if (code !== 200) {
    throw new Error('AppSheet devolvió un error (' + code + ') para la tabla "' + table + '": ' + text);
  }

  const rows = JSON.parse(text);
  const allowedColumns = ALLOWED_TABLES[table];

  return rows.map((row) => {
    const filtered = { _appId: appId, _tableName: table };
    allowedColumns.forEach((col) => {
      filtered[col] = row[col];
    });
    return filtered;
  });
}

function jsonOutput(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Verifica que las credenciales estén guardadas SIN mostrarlas.
 * Corre esto desde el editor (▶ Run, selecciona "verificarCredenciales")
 * y revisa el registro (Ejecuciones o Ctrl+Enter).
 *
 * Para guardarlas o cambiarlas ve a:
 * Project Settings (⚙️) > Script Properties > Add property:
 *   APPSHEET_APP_ID      = tu App ID de AppSheet
 *   APPSHEET_ACCESS_KEY  = tu Application Access Key de AppSheet
 */
function verificarCredenciales() {
  const props = PropertiesService.getScriptProperties();
  const appId = props.getProperty('APPSHEET_APP_ID');
  const accessKey = props.getProperty('APPSHEET_ACCESS_KEY');
  Logger.log('APPSHEET_APP_ID: ' + (appId ? 'configurado ✓' : 'FALTA ✗'));
  Logger.log('APPSHEET_ACCESS_KEY: ' + (accessKey ? 'configurado ✓' : 'FALTA ✗'));
}

/**
 * TODO: el formulario de cotización (cotizar.html) hace POST a esta misma URL
 * y espera un JSON con { message: "..." }. Cuando llegues a esa página,
 * se arma el doPost que guarde la cotización (por ejemplo en una
 * tabla "Cotizaciones" de tu AppSheet) y regrese ese mensaje.
 */
