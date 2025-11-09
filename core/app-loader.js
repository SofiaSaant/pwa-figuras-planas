// === APP LOADER ===
// Carga todos los módulos necesarios de la arquitectura
// Este archivo debe ser incluido en el HTML antes de los módulos específicos

(function() {
    'use strict';
    
    // Lista de scripts del core que deben cargarse
    const coreScripts = [
        // Models
        'core/models/Exercise.js',
        'core/models/Topic.js',
        'core/models/Progress.js',
        
        // Services
        'core/services/StorageService.js',
        'core/services/NotificationService.js',
        'core/services/AnimationService.js',
        
        // Controllers
        'core/controllers/ProgressController.js',
        'core/controllers/ExerciseController.js',
        
        // Base Module
        'core/BaseTopicModule.js'
    ];
    
    /**
     * Carga un script de forma síncrona
     */
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            // Detectar si estamos en una subcarpeta (vistas/)
            const isInSubfolder = window.location.pathname.includes('/vistas/');
            const prefix = isInSubfolder ? '../../' : '../';
            script.src = prefix + src;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Error cargando: ${src}`));
            document.head.appendChild(script);
        });
    }
    
    /**
     * Carga todos los scripts del core
     */
    async function loadCoreScripts() {
        try {
            for (const src of coreScripts) {
                await loadScript(src);
            }
            console.log('✅ Core scripts cargados correctamente');
            
            // Disparar evento personalizado cuando todo esté listo
            window.dispatchEvent(new Event('core-loaded'));
        } catch (error) {
            console.error('❌ Error cargando core scripts:', error);
        }
    }
    
    // Iniciar carga cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadCoreScripts);
    } else {
        loadCoreScripts();
    }
})();
