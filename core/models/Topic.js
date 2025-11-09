// === MODEL: Topic ===
// Representa un tema completo con sus ejercicios
// SOLID: Single Responsibility - Solo maneja datos del tema

class Topic {
    constructor(id, name, url, icon, exercises = []) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.icon = icon;
        this.exercises = exercises;
        this.isCompleted = false;
        this.completionDate = null;
    }

    /**
     * Agrega un ejercicio al tema
     * @param {Exercise} exercise
     */
    addExercise(exercise) {
        this.exercises.push(exercise);
    }

    /**
     * Obtiene el progreso del tema (0-100)
     * @returns {number}
     */
    getProgress() {
        if (this.exercises.length === 0) return 0;
        
        const completed = this.exercises.filter(e => e.isCompleted).length;
        return Math.round((completed / this.exercises.length) * 100);
    }

    /**
     * Verifica si el tema está completo
     * @param {number} minExercises - Mínimo de ejercicios requeridos
     * @returns {boolean}
     */
    checkCompletion(minExercises = 2) {
        const completed = this.exercises.filter(e => e.isCompleted).length;
        return completed >= minExercises;
    }

    /**
     * Marca el tema como completado
     */
    complete() {
        this.isCompleted = true;
        this.completionDate = new Date().toISOString();
    }

    /**
     * Obtiene estadísticas del tema
     */
    getStats() {
        return {
            id: this.id,
            name: this.name,
            totalExercises: this.exercises.length,
            completedExercises: this.exercises.filter(e => e.isCompleted).length,
            progress: this.getProgress(),
            isCompleted: this.isCompleted,
            completionDate: this.completionDate
        };
    }
}
