// === MAIN APP ===
// Controlador principal para la página index.html
// Maneja el menú de temas y el progreso global

class MainApp {
    constructor() {
        // Servicios
        this.storageService = new StorageService();
        this.notificationService = new NotificationService();
        this.animationService = new AnimationService();
        
        // Controlador de progreso
        this.progressController = new ProgressController(
            this.storageService,
            this.notificationService,
            this.animationService
        );
        
        // Configuración de temas
        this.topics = this.initializeTopics();
    }

    /**
     * Inicializa la configuración de todos los temas
     */
    initializeTopics() {
        return [
            new Topic('base-altura', 'Base y Altura', 'vistas/base-altura/base-altura.html', '📐'),
            new Topic('suma-angulos', 'Suma de Ángulos', 'vistas/suma-angulos/suma-angulos.html', '📏'),
            new Topic('circunferencia', 'La Circunferencia', 'vistas/circunferencia/circunferencia.html', '⭕'),
            new Topic('numero-pi', 'El Número π', 'vistas/numero-pi/numero-pi.html', '🥧'),
            new Topic('figuras-circulares', 'Figuras Circulares', 'vistas/figuras-circulares/figuras-circulares.html', '🍕'),
            new Topic('posiciones-rectas', 'Posiciones de Rectas', 'vistas/posiciones-rectas/posiciones-rectas.html', '📍')
        ];
    }

    /**
     * Inicializa la aplicación
     */
    init() {
        this.notificationService.init();
        this.setupPWA();
        this.updateProgressDisplay();
        this.markCompletedTopics();
        this.animateEntrance();
        this.setupEventListeners();
    }

    /**
     * Configura PWA (Service Worker y detección offline)
     */
    setupPWA() {
        // Registrar Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('✅ Service Worker registrado');
                })
                .catch(error => {
                    console.error('❌ Error registrando Service Worker:', error);
                });
        }
        
        // Detectar modo offline/online
        window.addEventListener('online', () => {
            document.body.classList.remove('offline');
            this.notificationService.success('¡Conexión restaurada!');
        });
        
        window.addEventListener('offline', () => {
            document.body.classList.add('offline');
            this.notificationService.info('Modo offline activado');
        });
    }

    /**
     * Actualiza el display de progreso
     */
    updateProgressDisplay() {
        const progressCircle = document.querySelector('.progress-circle');
        const progressText = document.getElementById('progressText');
        
        this.progressController.updateProgressUI(progressCircle, progressText);
    }

    /**
     * Marca visualmente los temas completados
     */
    markCompletedTopics() {
        this.topics.forEach(topic => {
            if (this.progressController.isTopicCompleted(topic.id)) {
                const card = document.querySelector(`[href="${topic.url}"]`)?.closest('.topic-card');
                
                if (card) {
                    card.style.borderColor = 'var(--accent)';
                    card.style.borderWidth = '3px';
                    
                    const icon = card.querySelector('.topic-icon');
                    if (icon && !icon.textContent.includes('✅')) {
                        icon.textContent += ' ✅';
                    }
                }
            }
        });
    }

    /**
     * Anima la entrada de elementos
     */
    animateEntrance() {
        const cards = document.querySelectorAll('.topic-card');
        this.animationService.fadeInElements(cards, 200);
        
        // Efecto hover en iconos
        document.querySelectorAll('.topic-icon').forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        });
        
        // Click en círculo de progreso
        const progressCircle = document.querySelector('.progress-circle');
        if (progressCircle) {
            progressCircle.addEventListener('click', () => {
                this.animationService.bounce(progressCircle);
                this.showProgressStats();
            });
        }
    }

    /**
     * Configura event listeners
     */
    setupEventListeners() {
        // Agregar efecto de click a las tarjetas
        document.querySelectorAll('.topic-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.animationService.buttonPress(card);
            });
        });
    }

    /**
     * Muestra estadísticas de progreso
     */
    showProgressStats() {
        const stats = this.progressController.getStats();
        const percentage = this.progressController.getGlobalProgress();
        
        this.notificationService.info(
            `Progreso: ${stats.global.completedTopics}/${stats.global.totalTopics} temas completados (${percentage}%)`,
            5000
        );
    }

    /**
     * Reinicia todo el progreso (útil para testing)
     */
    resetProgress() {
        if (confirm('¿Estás seguro de que quieres reiniciar todo el progreso?')) {
            this.progressController.reset();
            location.reload();
        }
    }

    /**
     * Exporta el progreso como JSON
     */
    exportProgress() {
        const stats = this.progressController.getStats();
        const json = JSON.stringify(stats, null, 2);
        
        // Crear blob y descargar
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `progreso-matematicas-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.notificationService.success('Progreso exportado correctamente');
    }
}

// === INICIALIZACIÓN ===
let mainApp;

document.addEventListener('DOMContentLoaded', () => {
    mainApp = new MainApp();
    mainApp.init();
});

// Exponer funciones globalmente para debugging
window.mainApp = mainApp;
window.resetProgress = () => mainApp?.resetProgress();
window.exportProgress = () => mainApp?.exportProgress();
