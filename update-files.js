// Script para actualizar todos los archivos HTML
const fs = require('fs');

const files = [
    { name: 'suma-angulos.html', class: 'suma-angulos', js: 'suma-angulos.js' },
    { name: 'circunferencia.html', class: 'circunferencia', js: 'circunferencia.js' },
    { name: 'numero-pi.html', class: 'numero-pi', js: 'numero-pi.js' },
    { name: 'figuras-circulares.html', class: 'figuras-circulares', js: 'figuras-circulares.js' },
    { name: 'posiciones-rectas.html', class: 'posiciones-rectas', js: 'posiciones-rectas.js' }
];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file.name, 'utf8');
        
        // Actualizar head
        content = content.replace(
            /<!-- Bootstrap CSS -->\s*<link[^>]*bootstrap[^>]*>\s*<!-- Estilos personalizados -->\s*<style>[\s\S]*?<\/style>/,
            `<!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Fuentes de Google -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Estilos personalizados -->
    <link rel="stylesheet" href="styles.css">`
        );
        
        // Actualizar body class
        content = content.replace(
            /<body>/,
            `<body class="${file.class}">`
        );
        
        // Actualizar scripts
        content = content.replace(
            /<!-- Scripts -->\s*<script[^>]*bootstrap[^>]*><\/script>\s*<script>[\s\S]*?<\/script>/,
            `<!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="${file.js}"></script>`
        );
        
        fs.writeFileSync(file.name, content);
        console.log(`✅ Actualizado: ${file.name}`);
    } catch (error) {
        console.error(`❌ Error actualizando ${file.name}:`, error.message);
    }
});

console.log('🎉 Proceso completado');