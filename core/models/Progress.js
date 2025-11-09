// === MODEL: Progress ===
// Representa el progreso global del estudiante
// SOLID: Single Responsibility - Solo maneja datos de progreso

class Progress {
    constructor() {
        this.topics = new Map(); // Map<topicId, topicStats>
        this.totalTopics = 0;
        this.completedTopics = 0;
        this.lastUpdated = null;
    }

    /**
     * Actualiza el progreso de un tema
     * @param {string} topicId
     * @param {Object} topicStats
     */
    updateTopic(topicId, topicStats) {
        this.topics.set(topicId, topicStats);
        this.lastUpdated = new Date().toISOString();
        this.recalculate();
    }

    /**
     * Recalcula el progreso total
     */
    recalculate() {
        this.totalTopics = this.topics.size;
        this.completedTopics = Array.from(this.topics.values())
            .filter(topic => topic.isCompleted).length;
    }

    /**
     * Obtiene el porcentaje de progreso global (0-100)
     * @returns {number}
     */
    getPercentage() {
        if (this.totalTopics === 0) return 0;
        return Math.round((this.completedTopics / this.totalTopics) * 100);
    }

    /**
     * Obtiene el progreso de un tema específico
     * @param {string} topicId
     * @returns {Object|null}
     */
    getTopicProgress(topicId) {
        return this.topics.get(topicId) || null;
    }

    /**
     * Verifica si un tema está completado
     * @param {string} topicId
     * @returns {boolean}
     */
    isTopicCompleted(topicId) {
        const topic = this.topics.get(topicId);
        return topic ? topic.isCompleted : false;
    }

    /**
     * Exporta el progreso a un objeto plano
     * @returns {Object}
     */
    toJSON() {
        return {
            topics: Array.from(this.topics.entries()),
            totalTopics: this.totalTopics,
            completedTopics: this.completedTopics,
            percentage: this.getPercentage(),
            lastUpdated: this.lastUpdated
        };
    }

    /**
     * Importa progreso desde un objeto plano
     * @param {Object} data
     */
    fromJSON(data) {
        if (data.topics) {
            this.topics = new Map(data.topics);
        }
        this.totalTopics = data.totalTopics || 0;
        this.completedTopics = data.completedTopics || 0;
        this.lastUpdated = data.lastUpdated || null;
    }
}
