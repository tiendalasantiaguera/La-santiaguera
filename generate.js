const fs = require('fs');
const path = require('path');

const baseDir = './img';

const categorias = {
    sabanas: 'sabanas',
    juego_sabanas: 'sabanas',
    cristaleria: 'cristaleria',
    calzado: 'calzado',
    varios: 'varios'
};

let productos = [];

Object.keys(categorias).forEach(cat => {
    const folder = path.join(baseDir, categorias[cat]);

    if (!fs.existsSync(folder)) return;

    const files = fs.readdirSync(folder);

    files.forEach(file => {
        if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) return;

        const codigo = file.split('.')[0];

        productos.push({
            codigo: codigo,
            nombre: `Producto ${codigo}`,
            activo: true,
            categoria: cat,
            imagen: `${folder}/${file}`,
            colores: [],
            descripcion: "Producto disponible",
            especificaciones: []
        });
    });
});

// Leer index.html
let html = fs.readFileSync('index.html', 'utf8');

// Reemplazar el array productos completo
html = html.replace(
    /const productos = \[[\s\S]*?\];/,
    `const productos = ${JSON.stringify(productos, null, 4)};`
);

// Guardar cambios
fs.writeFileSync('index.html', html);

console.log('✅ index.html actualizado automáticamente');