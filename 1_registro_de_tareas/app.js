import * as fs from 'fs'; // Importación simple del módulo fs

const LOG_FILE = 'log.txt'; // Cambiado a 'log.txt' para el ejercicio

/**
 * Obtiene la fecha y hora actual en formato [YYYY-MM-DD HH:MM:SS].
 * @returns {string} El string de la fecha formateada.
 */
function getTimestamp() {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0];
    return `[${date} ${time}]`;
}

/**
 * Agrega una línea al archivo de log (usando método síncrono).
 * NOTA: Para el Ejercicio 1, usamos fs.appendFileSync para añadir contenido.
 * @param {string} message El mensaje a loguear.
 */
function appendLogSync(message) {
    const logEntry = `${getTimestamp()} - ${message}\n`;
    try {
        // Usa fs.appendFileSync para añadir contenido al final del archivo.
        fs.appendFileSync(LOG_FILE, logEntry, 'utf8');
        console.log(`[LOG] -> ${message}`);
    } catch (error) {
        console.error('Error al escribir en el archivo de log:', error);
    }
}

/**
 * Crea una pausa utilizando una Promise que se resuelve después de un tiempo.
 * @param {number} ms Milisegundos a esperar.
 * @returns {Promise<void>}
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Simula la ejecución de una tarea que tarda 5 segundos,
 * siguiendo la estructura del Ejercicio 1.
 */
const tarea5segundos = async() => {
    // 1. Registro de inicio
    appendLogSync("Inicio del programa");
    console.log(`[${getTimestamp()}] - Iniciando programa. Logueando...`);
    
    // 2. Registro de ejecución
    appendLogSync("Ejecutando tarea...");
    console.log("Tarea en ejecución (espera 5 segundos)...");

    // 3. LA PAUSA CORRECTA: await espera a que la Promise se resuelva (después de 5 segundos)
    await delay(5000); 

    // 4. Registro de finalización
    appendLogSync("Tarea completada");
    console.log(`[${getTimestamp()}] - Tarea finalizada.`);

    return;
};

// --- Ejecución ---
tarea5segundos();
