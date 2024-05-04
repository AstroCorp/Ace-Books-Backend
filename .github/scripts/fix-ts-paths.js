const fs = require('fs');
const path = require('path');

const rootDir = './src';

// Buscamos todos los archivos .ts para poder reemplazar los imports con '@/'
const getAllTSFiles = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);

    list.forEach((file) => {
        file = path.join(dir, file);

        const stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(getAllTSFiles(file));
        } else if (file.endsWith('.ts')) {
            results.push(file);
        }
    });

    return results;
};

// Reemplaza '@/' en los imports por una ruta relativa a partir del directorio raíz
const replaceAtSymbol = (filePath, rootDir) => {
    let content = fs.readFileSync(filePath, 'utf-8');

	// Regex: Busca todos los imports que contengan '@/'
    const importRegex = /import\s+.*\s+from\s+['"]@\/(.*)['"]/g;

    content = content.replace(importRegex, (match, p1) => {
        const relativePath = path.relative(path.dirname(filePath), path.join(rootDir, p1)).replace(/\\/g, '/');

		console.log(`Replacing @/${p1} with ./${relativePath}`);

        return match.replace(`@/${p1}`, `./${relativePath}`);
    });

    fs.writeFileSync(filePath, content, 'utf-8');
};

const tsFiles = getAllTSFiles(rootDir);

tsFiles.forEach((file) => {
    replaceAtSymbol(file, rootDir);
});

console.log('Paths fixed!');
