const fs = require('fs');
const path = require('path');

// Define el directorio raíz donde se encuentran tus archivos TypeScript
const rootDir = '/src'; // Cambia esto a tu ruta

// Recibe un directorio y retorna todos los archivos .ts encontrados
const getAllTSFiles = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllTSFiles(file)); // Recursión para subdirectorios
        } else if (file.endsWith('.ts')) {
            results.push(file); // Añade archivos .ts a la lista
        }
    });
    return results;
};

// Reemplaza '@/' en los imports por una ruta relativa a partir del directorio raíz
const replaceAtSymbol = (filePath, rootDir) => {
    let content = fs.readFileSync(filePath, 'utf-8'); // Lee el contenido del archivo
    const importRegex = /import\s+.*\s+from\s+['"]@\/(.*)['"]/g; // Encuentra importaciones con '@/'

    content = content.replace(importRegex, (match, p1) => {
        const relativePath = path.relative(path.dirname(filePath), path.join(rootDir, p1));
        return match.replace(`@/${p1}`, `./${relativePath}`);
    });

    fs.writeFileSync(filePath, content, 'utf-8'); // Guarda el contenido modificado
};

// Encuentra todos los archivos .ts en el directorio raíz
const tsFiles = getAllTSFiles(rootDir);

// Reemplaza el símbolo '@/' por la ruta relativa en todos los archivos encontrados
tsFiles.forEach((file) => {
    replaceAtSymbol(file, rootDir);
});

console.log('Reemplazo completado.');
