import * as fs from 'fs/promises';

/**
 * Función principal para copiar un archivo de origen a un destino.
 * * USO: node ejercicio5_copiar_archivo.js <archivo_origen> <archivo_destino>
 */
async function copiarArchivo() {
    // 1. Recibir dos parámetros desde la línea de comandos
    const args = process.argv; 

    // Verificamos que se hayan pasado exactamente 4 argumentos (node, script, origen, destino)
    if (args.length !== 4) {
        console.error("Error: Se requieren dos argumentos.");
        console.log("Uso correcto: node ejercicio5_copiar_archivo.js <origen.txt> <destino.txt>");
        return; 
    }

    const archivoOrigen = args[2];
    const archivoDestino = args[3];

    console.log(`\n--- COPIADOR DE ARCHIVOS ---`);
    console.log(`Origen: ${archivoOrigen}`);
    console.log(`Destino: ${archivoDestino}`);

    try {
        // 2. Verificar si el archivo de origen existe.
        
        // fs.access() verifica si el proceso de Node.js puede acceder a un archivo.
        // Si el archivo NO existe, esta llamada lanza un error que será capturado por el 'catch'.
        await fs.access(archivoOrigen);
        console.log("Estado: Archivo de origen encontrado. Iniciando copia...");
        
        // 3. Copiar el contenido al archivo de destino
        
        // fs.copyFile() copia de forma eficiente el archivo de origen al destino.
        // Sobrescribirá el destino si ya existe.
        await fs.copyFile(archivoOrigen, archivoDestino);

        // Mostrar el mensaje de confirmación
        console.log(`\n✅ ¡Copia completada con éxito!`);
        console.log(`Contenido de "${archivoOrigen}" copiado a "${archivoDestino}".`);

    } catch (error) {
        // Manejo de errores
        if (error.code === 'ENOENT') {
            // Este es el error específico que lanza fs.access si el archivo no existe.
            console.error(`\n🛑 Error: El archivo de origen "${archivoOrigen}" no existe.`);
            console.log("Por favor, verifica la ruta y el nombre del archivo.");
        } else {
            // Otros errores (permisos, etc.)
            console.error("\n🛑 Error inesperado durante la operación de copia:", error.message);
        }
    }
}

// Ejecutamos la función principal
copiarArchivo();
