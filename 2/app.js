import * as fs from 'fs/promises'; // Importamos la versión de Promesas para usar async/await
import * as fsSync from 'fs'; // Necesario solo para el chequeo de existencia

const DATA_FILE = 'datos.txt';
const INFO_FILE = 'informacion.txt';

// --- Funciones de Utilidad ---

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
 * Crea una pausa utilizando una Promise que se resuelve después de un tiempo.
 * @param {number} ms Milisegundos a esperar.
 * @returns {Promise<void>}
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- Tarea Principal ---

async function ejecutarEjercicio2() {
    console.log("--- INICIANDO EJERCICIO 2: MANIPULACIÓN DE ARCHIVOS ---");

    try {
        // 1. Crear el archivo datos.txt y escribir contenido inicial
        console.log("Paso 1: Creando y escribiendo en el archivo 'datos.txt'...");
        const contenidoInicial = `Nombre: [Manuel Rivas]
Edad: [27]
Carrera: [Tecnicatura en Programación]
`;
        // fs.writeFile sobrescribe el archivo si ya existe, o lo crea si no.
        await fs.writeFile(DATA_FILE, contenidoInicial, 'utf8');
        console.log("   -> 'datos.txt' creado con éxito.");


        // 2. Leer el archivo datos.txt e imprimir su contenido
        console.log("\nPaso 2: Leyendo el contenido de 'datos.txt' e imprimiéndolo...");
        // fs.readFile lee el contenido y devuelve un Buffer, .toString() lo convierte a texto.
        const contenidoLeido = await fs.readFile(DATA_FILE, 'utf8');
        console.log("   *** CONTENIDO DE datos.txt ***");
        console.log(contenidoLeido);
        console.log("   *******************************");


        // 3. Agregar la fecha y hora actuales al final del archivo
        console.log("\nPaso 3: Agregando la fecha de modificación...");
        const fechaModificacion = `Fecha de modificación: ${getTimestamp()}\n`;
        const contenidoParaAgregar = `\n${fechaModificacion}\n`; // Añadimos un salto de línea para formatear
        
        // fs.appendFile añade contenido al final sin sobrescribir lo existente.
        await fs.appendFile(DATA_FILE, contenidoParaAgregar, 'utf8');
        console.log(`   -> Fecha agregada: ${fechaModificacion.trim()}`);
        
        // Opcional: Volvemos a leer para verificar el contenido
        const contenidoVerificado = await fs.readFile(DATA_FILE, 'utf8');
        console.log("\n   *** Contenido VERIFICADO ***");
        console.log(contenidoVerificado.trim());
        console.log("   ******************************");


        // 4. Renombrar el archivo datos.txt a informacion.txt
        console.log(`\nPaso 4: Renombrando '${DATA_FILE}' a '${INFO_FILE}'...`);
        // fs.rename mueve o renombra el archivo.
        await fs.rename(DATA_FILE, INFO_FILE);
        console.log(`   -> Archivo renombrado a '${INFO_FILE}' con éxito.`);
        
        
        // 5. Eliminar el archivo informacion.txt tras 10 segundos
        console.log("\nPaso 5: Esperando 10 segundos para eliminar el archivo...");
        console.log("   -> Puedes revisar la carpeta, el archivo 'informacion.txt' ya existe.");

        // Esperamos 10 segundos usando la función delay que creamos
        await delay(10000); 

        console.log("\n¡TIEMPO TRANSCURRIDO! Eliminando 'informacion.txt'...");
        // fs.unlink elimina un archivo del sistema.
        await fs.unlink(INFO_FILE);
        console.log(`   -> Archivo '${INFO_FILE}' eliminado con éxito.`);


    } catch (error) {
        console.error("\n*** ¡Ha ocurrido un error durante la ejecución del ejercicio! ***");
        console.error(error.message);
    } finally {
        console.log("\n--- EJERCICIO 2 FINALIZADO ---");
    }
}

ejecutarEjercicio2();
