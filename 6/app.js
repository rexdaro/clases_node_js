import * as fs from 'fs/promises';
import * as path from 'path'; // Usamos 'path' para construir rutas de manera segura

// Definición de las rutas
const LOGS_DIR = 'logs';
const LOG_FILE = path.join(LOGS_DIR, 'app.log'); // logs/app.log

/**
 * Obtiene la fecha y hora actual en formato [YYYY-MM-DD HH:MM:SS].
 * @returns {string} El string de la fecha formateada.
 */
function getTimestamp() {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0];
    return `${date} ${time}`;
}

/**
 * 1. Crea el directorio 'logs' si no existe y agrega una línea de ejecución al app.log.
 */
async function registrarEjecucion() {
    try {
        // Crea el directorio 'logs' si no existe
        // 'recursive: true' asegura que si la carpeta padre tampoco existe, la cree.
        await fs.mkdir(LOGS_DIR, { recursive: true });
        console.log(`Directorio '${LOGS_DIR}' verificado/creado con éxito.`);

        // Crea el mensaje de log
        const logEntry = `[${getTimestamp()}] - Ejecución exitosa\n`;

        // Agrega la línea al archivo app.log (creándolo si no existe)
        await fs.appendFile(LOG_FILE, logEntry, 'utf8');
        console.log(`Línea de log registrada en '${LOG_FILE}'.`);

    } catch (error) {
        console.error("Error al registrar la ejecución:", error.message);
    }
}

/**
 * 2. Lee el archivo 'app.log' y muestra en consola las últimas 5 ejecuciones.
 */
async function mostrarUltimasEjecuciones(numLineas = 5) {
    console.log(`\n--- ÚLTIMAS ${numLineas} EJECUCIONES ---`);
    try {
        // Leemos el contenido completo del archivo
        const contenido = await fs.readFile(LOG_FILE, 'utf8');

        // Dividimos el contenido en líneas
        // filter(Boolean) elimina cualquier línea vacía que pueda quedar (ej. al final del archivo)
        const lineas = contenido.split('\n').filter(Boolean);

        if (lineas.length === 0) {
            console.log("El archivo de log está vacío.");
            return;
        }

        // Determinamos el punto de inicio para mostrar las últimas 'numLineas'
        // Si hay menos de 5 líneas, mostramos todas. Si hay 10, empezamos en el índice 5 (10 - 5 = 5)
        const inicio = Math.max(0, lineas.length - numLineas);

        // Obtenemos las últimas N líneas
        const ultimasLineas = lineas.slice(inicio);

        console.log(`Mostrando ${ultimasLineas.length} de ${lineas.length} registros totales:`);
        
        // Imprimimos las líneas
        ultimasLineas.forEach(linea => {
            console.log(linea);
        });

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`El archivo de log '${LOG_FILE}' aún no existe o la carpeta logs no existe.`);
        } else {
            console.error("Error al leer el archivo de log:", error.message);
        }
    }
}

/**
 * Función que orquesta los pasos del Ejercicio 6.
 */
async function ejecutarEjercicio6() {
    await registrarEjecucion();
    await mostrarUltimasEjecuciones(5);
}

// Ejecutamos la función principal
ejecutarEjercicio6();
