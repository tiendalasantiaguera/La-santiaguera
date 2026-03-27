const fs = require('fs');
const path = require('path');

const baseDir = './img';

let productos = [];

// -------- SÁBANAS (MISMA CARPETA, DIFERENTE PREFIJO) --------
const sabanasFolder = path.join(baseDir, 'sabanas');

if (fs.existsSync(sabanasFolder)) {
    const files = fs.readdirSync(sabanasFolder);

    files.forEach(file => {
        if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) return;

        const codigo = file.split('.')[0];

        let categoria = null;

        if (codigo.startsWith('SBJ')) {
            categoria = 'juego_sabanas';
        } else if (codigo.startsWith('SB')) {
            categoria = 'sabanas';
        }

        if (!categoria) return;

        productos.push({
            codigo: codigo,
            nombre: `Producto ${codigo}`,
            activo: true,
            categoria: categoria,
            imagen: `img/sabanas/${file}`,
            colores: [],
            descripcion: "Producto disponible",
            especificaciones: []
        });
    });
}

// -------- OTRAS CATEGORÍAS --------
const otrasCategorias = ['cristaleria', 'calzado', 'varios'];

otrasCategorias.forEach(cat => {
    const folder = path.join(baseDir, cat);

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
            imagen: `img/${cat}/${file}`,
            colores: [],
            descripcion: "Producto disponible",
            especificaciones: []
        });
    });
});

// -------- ACTUALIZAR INDEX.HTML --------
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    /const productos = \[[\s\S]*?\];/,
    `const productos = ${JSON.stringify(productos, null, 4)};`
);

fs.writeFileSync('index.html', html);

console.log('✅ index.html actualizado correctamente');