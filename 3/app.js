import * as fs from 'fs/promises';

const CONTACTS_FILE = 'contactos.json';

// ----------------------------------------------------------------------
// Función de Utilidad: Leer y convertir JSON
// ----------------------------------------------------------------------

/**
 * Lee el archivo JSON de contactos, lo parsea y devuelve el array de contactos.
 * Si el archivo no existe, devuelve un array vacío.
 * @returns {Promise<Array<Object>>} Array de contactos.
 */
async function leerContactos() {
    try {
        // Leemos el contenido del archivo como texto
        const data = await fs.readFile(CONTACTS_FILE, 'utf8');
        // Usamos JSON.parse para convertir el string JSON en un objeto JavaScript (array)
        return JSON.parse(data);
    } catch (error) {
        // Si el archivo no existe (código 'ENOENT'), devolvemos un array vacío.
        if (error.code === 'ENOENT') {
            console.log(`[AVISO] El archivo ${CONTACTS_FILE} no existe. Se inicializará con un array vacío.`);
            return [];
        }
        console.error("Error al leer o parsear el archivo JSON:", error.message);
        throw error; // Lanzamos el error para detener la ejecución si el problema es grave
    }
}

// ----------------------------------------------------------------------
// Función de Utilidad: Escribir JSON
// ----------------------------------------------------------------------

/**
 * Escribe el array de contactos de vuelta al archivo JSON.
 * @param {Array<Object>} contactos El array de contactos a guardar.
 */
async function escribirContactos(contactos) {
    try {
        // Usamos JSON.stringify para convertir el array de JS en un string JSON.
        // El '2' al final es para que el JSON quede formateado y legible (con indentación).
        const jsonString = JSON.stringify(contactos, null, 2);
        // Escribimos el string de vuelta al archivo, sobrescribiendo el contenido anterior.
        await fs.writeFile(CONTACTS_FILE, jsonString, 'utf8');
    } catch (error) {
        console.error("Error al escribir el archivo JSON:", error.message);
    }
}

// ----------------------------------------------------------------------
// 1. Agregar Contacto
// ----------------------------------------------------------------------

/**
 * Agrega un nuevo contacto al archivo contactos.json.
 * @param {string} nombre
 * @param {string} telefono
 * @param {string} email
 */
async function agregarContacto(nombre, telefono, email) {
    console.log(`\n--- AGREGANDO CONTACTO: ${nombre} ---`);
    
    // 1. Leemos el array actual
    const contactos = await leerContactos();

    // 2. Creamos el nuevo objeto de contacto
    const nuevoContacto = { nombre, telefono, email };

    // 3. Añadimos el nuevo contacto al array
    contactos.push(nuevoContacto);

    // 4. Escribimos el array modificado de vuelta al archivo
    await escribirContactos(contactos);
    console.log(`   -> Contacto '${nombre}' agregado con éxito.`);
}

// ----------------------------------------------------------------------
// 2. Mostrar Contactos
// ----------------------------------------------------------------------

/**
 * Lee y muestra en la consola todos los contactos almacenados en contactos.json.
 */
async function mostrarContactos() {
    console.log("\n--- MOSTRANDO TODOS LOS CONTACTOS ---");
    
    // 1. Leemos el array actual
    const contactos = await leerContactos();

    if (contactos.length === 0) {
        console.log("   -> No hay contactos registrados.");
        return;
    }

    // 2. Iteramos y mostramos cada contacto
    contactos.forEach((c, index) => {
        console.log(`   [${index + 1}] Nombre: ${c.nombre} | Tel: ${c.telefono} | Email: ${c.email}`);
    });
}

// ----------------------------------------------------------------------
// 3. Eliminar Contacto
// ----------------------------------------------------------------------

/**
 * Elimina un contacto dado su nombre.
 * @param {string} nombre Nombre del contacto a eliminar.
 */
async function eliminarContacto(nombre) {
    console.log(`\n--- ELIMINANDO CONTACTO: ${nombre} ---`);
    
    // 1. Leemos el array actual
    const contactos = await leerContactos();
    const longitudInicial = contactos.length;

    // Filtramos el array: mantenemos todos los contactos cuyo nombre NO sea el que queremos eliminar
    const contactosFiltrados = contactos.filter(c => c.nombre !== nombre);

    if (contactosFiltrados.length === longitudInicial) {
        // Si la longitud no cambió, significa que no se encontró el contacto
        console.log(`   -> Contacto '${nombre}' NO encontrado. El archivo permanece sin cambios.`);
        return;
    }

    // 2. Escribimos el array filtrado de vuelta al archivo
    await escribirContactos(contactosFiltrados);
    console.log(`   -> Contacto '${nombre}' eliminado con éxito.`);
}

// ----------------------------------------------------------------------
// Código de Prueba Requerido
// ----------------------------------------------------------------------

async function main() {
    console.log("\n*** INICIO DE PRUEBAS DEL GESTOR DE CONTACTOS ***");
    
    // 1. Agrega Carlos López
    await agregarContacto('Carlos López', '987-654-3210', 'carlos@example.com');
    
    // 2. Muestra los contactos (deberían estar Juan y Carlos)
    await mostrarContactos();
    
    // 3. Elimina a Juan Pérez (el contacto inicial)
    await eliminarContacto('Juan Pérez');
    
    // 4. Muestra los contactos (solo debería quedar Carlos)
    await mostrarContactos();
    
    console.log("\n*** FIN DE PRUEBAS ***");
}

main();
