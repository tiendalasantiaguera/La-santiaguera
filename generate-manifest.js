const fs = require('fs');
const path = require('path');

// Carpetas a escanear
const carpetas = [
    'img/sabanas',
    'img/cristaleria',
    'img/calzado',
    'img/varios'
];

const manifest = {};

carpetas.forEach(carpeta => {
    if (fs.existsSync(carpeta)) {
        const archivos = fs.readdirSync(carpeta);
        const imagenes = archivos.filter(archivo => 
            /\.(jpg|jpeg|png|gif|webp)$/i.test(archivo)
        );
        manifest[carpeta + '/'] = imagenes.sort();
    } else {
        manifest[carpeta + '/'] = [];
        console.warn(`⚠️ Carpeta no encontrada: ${carpeta}`);
    }
});

fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2));
console.log('✅ manifest.json generado correctamente');
console.log(`📊 Total de imágenes encontradas: ${Object.values(manifest).flat().length}`);