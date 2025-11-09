// === CONTROLLER: Progress ===
// Controla el progreso del estudiante
// SOLID: Single Responsibility - Solo maneja lógica de progreso
// SOLID: Dependency Inversion - Depende de abstracciones (servicios)

class ProgressController {
    constructor(storageService, notificationService, animationService) {
        this.storageService = storageService;
        this.notificationService = notificationService;
        this.animationService = animationService;
        this.progress = new Progress();
        this.loadProgress();
    }

    /**
     * Carga el progreso desde el storage
     */
    loadProgress() {
        const savedProgress = this.storageService.load('progress', null);
        if (savedProgress) {
            this.progress.fromJSON(savedProgress);
        }
    }

    /**
     * Guarda el progreso en el storage
     */
    saveProgress() {
        const success = this.storageService.save('progress', this.progress.toJSON());
        if (!success) {
            this.notificationService.error('Error al guardar el progreso');
        }
        return success;
    }

    /**
     * Actualiza el progreso de un tema
     * @param {Topic} topic - Tema a actualizar
     */
    updateTopicProgress(topic) {
        const stats = topic.getStats();
        this.progress.updateTopic(topic.id, stats);
        this.saveProgress();
    }

    /**
     * Marca un tema como completado
     * @param {Topic} topic
     */
    completeTopic(topic) {
        topic.complete();
        this.updateTopicProgress(topic);
        
        // Notificar al usuario
        this.notificationService.success(
            `¡Felicidades! Has completado: ${topic.name}`,
            4000
        );
        
        // Efecto de celebración
        this.animationService.confetti();
    }

    /**
     * Obtiene el porcentaje de progreso global
     * @returns {number}
     */
    getGlobalProgress() {
        return this.progress.getPercentage();
    }

    /**
     * Verifica si un tema está completado
     * @param {string} topicId
     * @returns {boolean}
     */
    isTopicCompleted(topicId) {
        return this.progress.isTopicCompleted(topicId);
    }

    /**
     * Obtiene estadísticas completas
     * @returns {Object}
     */
    getStats() {
        return {
            global: this.progress.toJSON(),
            topics: Array.from(this.progress.topics.entries()).map(([id, stats]) => ({
                id,
                ...stats
            }))
        };
    }

    /**
     * Reinicia todo el progreso
     */
    reset() {
        this.progress = new Progress();
        this.storageService.remove('progress');
        this.notificationService.info('Progreso reiniciado');
    }

    /**
     * Actualiza la UI del progreso
     * @param {HTMLElement} progressElement - Elemento del círculo de progreso
     * @param {HTMLElement} textElement - Elemento del texto de porcentaje
     */
    updateProgressUI(progressElement, textElement) {
        const percentage = this.getGlobalProgress();
        
        if (textElement) {
            textElement.textContent = `${percentage}%`;
        }
        
        if (progressElement) {
            this.animationService.animateCircularProgress(
                progressElement,
                percentage,
                'var(--accent)',
                1000
            );
        }
    }
}
