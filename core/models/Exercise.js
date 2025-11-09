// === MODEL: Exercise ===
// Representa un ejercicio individual
// SOLID: Single Responsibility - Solo maneja datos y validación de ejercicios

class Exercise {
    constructor(id, question, correctAnswer, type = 'numeric') {
        this.id = id;
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.type = type; // 'numeric', 'text', 'multiple-choice'
        this.isCompleted = false;
        this.attempts = 0;
    }

    /**
     * Verifica si la respuesta del usuario es correcta
     * @param {*} userAnswer - Respuesta del usuario
     * @returns {boolean}
     */
    check(userAnswer) {
        this.attempts++;
        
        if (this.type === 'numeric') {
            return parseFloat(userAnswer) === parseFloat(this.correctAnswer);
        }
        
        return userAnswer.toString().toLowerCase().trim() === 
               this.correctAnswer.toString().toLowerCase().trim();
    }

    /**
     * Marca el ejercicio como completado
     */
    complete() {
        this.isCompleted = true;
    }

    /**
     * Reinicia el ejercicio
     */
    reset() {
        this.isCompleted = false;
        this.attempts = 0;
    }

    /**
     * Obtiene el estado del ejercicio
     */
    getStatus() {
        return {
            id: this.id,
            isCompleted: this.isCompleted,
            attempts: this.attempts
        };
    }
}
