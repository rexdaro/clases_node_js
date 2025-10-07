import * as fs from 'fs/promises';

/**
 * Función principal que lee argumentos, cuenta la palabra y muestra el resultado.
 *
 * USO: node ejercicio4_contador_palabras.js <nombre_archivo> <palabra_a_contar>
 */
async function contadorPalabras() {
    // process.argv es un array que contiene: [ruta_node, ruta_script, arg1, arg2, ...]
    const args = process.argv; 

    // Verificamos que se hayan pasado los dos argumentos necesarios
    if (args.length !== 4) {
        console.error("Error: Se requieren dos argumentos.");
        console.log("Uso correcto: node ejercicio4_contador_palabras.js <nombre_archivo> <palabra_a_contar>");
        console.log("Ejemplo: node ejercicio4_contador_palabras.js archivo.txt palabras");
        return; 
    }

    // El primer argumento del usuario (índice 2) es el nombre del archivo
    const nombreArchivo = args[2];
    // El segundo argumento del usuario (índice 3) es la palabra a buscar.
    // Convertimos a minúsculas para un conteo sin distinción de mayúsculas.
    const palabraBuscada = args[3].toLowerCase(); 

    console.log(`\n--- CONTADOR DE PALABRAS ---`);
    
    try {
        // 1. Leer el Contenido del Archivo
        const contenido = await fs.readFile(nombreArchivo, 'utf8');
        
        // 2. Procesar el Contenido y Contar
        
        // Convertimos todo el contenido a minúsculas para igualar la búsqueda
        const contenidoLowerCase = contenido.toLowerCase();

        // Limpiamos la puntuación (puntos, comas, etc.) reemplazándolos con espacios.
        // Esto es crucial para contar "palabra." y "palabra" como iguales.
        const contenidoLimpio = contenidoLowerCase.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ");

        // Dividimos la cadena limpia en un array de palabras usando el espacio como separador.
        // filter(Boolean) elimina posibles cadenas vacías.
        const palabrasDelArchivo = contenidoLimpio.split(/\s+/).filter(Boolean);

        let contador = 0;
        
        // Recorremos el array y comparamos cada palabra con la palabra buscada
        for (const palabra of palabrasDelArchivo) {
            if (palabra === palabraBuscada) {
                contador++;
            }
        }

        // 3. Imprimir el Resultado
        console.log(`Palabra a buscar: "${palabraBuscada}"`);
        console.log(`Archivo procesado: "${nombreArchivo}"`);
        console.log(`\nLa palabra "${palabraBuscada}" aparece ${contador} veces en el archivo "${nombreArchivo}".`);

    } catch (error) {
        // Manejo de errores si el archivo no existe
        if (error.code === 'ENOENT') {
            console.error(`\nError: El archivo "${nombreArchivo}" no fue encontrado. Asegúrate de que existe en esta carpeta.`);
        } else {
            console.error("\nError inesperado al procesar el archivo:", error.message);
        }
    }
}

// Ejecutamos la función principal
contadorPalabras();



//Para probar el script, crea un archivo de texto (por ejemplo, archivo.txt) con contenido y ejecuta el script desde la terminal:
//node app.js archivo.txt palabra_a_contar
//Reemplaza archivo.txt con el nombre de tu archivo y palabra_a_contar con la palabra que deseas contar.