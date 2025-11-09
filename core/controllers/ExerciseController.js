// === CONTROLLER: Exercise ===
// Controla los ejercicios de un tema
// SOLID: Single Responsibility - Solo maneja lógica de ejercicios
// SOLID: Dependency Inversion - Depende de abstracciones

class ExerciseController {
    constructor(topic, notificationService, animationService) {
        this.topic = topic;
        this.notificationService = notificationService;
        this.animationService = animationService;
        this.minExercisesToComplete = 2;
    }

    /**
     * Verifica la respuesta de un ejercicio
     * @param {string} exerciseId - ID del ejercicio
     * @param {*} userAnswer - Respuesta del usuario
     * @param {HTMLElement} resultElement - Elemento donde mostrar el resultado
     * @returns {boolean} - true si es correcta
     */
    checkAnswer(exerciseId, userAnswer, resultElement = null) {
        const exercise = this.topic.exercises.find(e => e.id === exerciseId);
        
        if (!exercise) {
            console.error(`Ejercicio ${exerciseId} no encontrado`);
            return false;
        }

        const isCorrect = exercise.check(userAnswer);

        if (isCorrect && !exercise.isCompleted) {
            exercise.complete();
            this.showSuccess(resultElement, exercise);
        } else if (!isCorrect) {
            this.showError(resultElement, exercise);
        }

        return isCorrect;
    }

    /**
     * Muestra mensaje de éxito
     * @private
     */
    showSuccess(resultElement, exercise) {
        if (resultElement) {
            resultElement.innerHTML = `
                <div class="alert alert-success">
                    🎉 ¡Correcto! ${this.getSuccessMessage()}
                </div>
            `;
            this.animationService.bounce(resultElement);
        }
        
        this.notificationService.success('¡Respuesta correcta!');
    }

    /**
     * Muestra mensaje de error
     * @private
     */
    showError(resultElement, exercise) {
        if (resultElement) {
            resultElement.innerHTML = `
                <div class="alert alert-danger">
                    ❌ Intenta de nuevo. ${this.getHint(exercise)}
                </div>
            `;
            this.animationService.shake(resultElement);
        }
        
        this.notificationService.error('Respuesta incorrecta, intenta de nuevo');
    }

    /**
     * Obtiene un mensaje de éxito aleatorio
     * @private
     */
    getSuccessMessage() {
        const messages = [
            '¡Excelente trabajo!',
            '¡Muy bien!',
            '¡Perfecto!',
            '¡Eres un genio!',
            '¡Sigue así!',
            '¡Increíble!'
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    /**
     * Obtiene una pista para el ejercicio
     * @private
     */
    getHint(exercise) {
        // Puede ser sobrescrito por controladores específicos
        return 'Revisa tus cálculos.';
    }

    /**
     * Obtiene el número de ejercicios completados
     * @returns {number}
     */
    getCompletedCount() {
        return this.topic.exercises.filter(e => e.isCompleted).length;
    }

    /**
     * Verifica si el tema puede ser completado
     * @returns {boolean}
     */
    canCompleteTopic() {
        return this.getCompletedCount() >= this.minExercisesToComplete;
    }

    /**
     * Intenta completar el tema
     * @param {Function} onComplete - Callback cuando se completa
     * @returns {boolean} - true si se completó
     */
    tryCompleteTopic(onComplete = null) {
        if (this.canCompleteTopic()) {
            if (onComplete) {
                onComplete(this.topic);
            }
            return true;
        } else {
            const remaining = this.minExercisesToComplete - this.getCompletedCount();
            this.notificationService.warning(
                `Completa al menos ${remaining} ejercicio(s) más para terminar la lección`
            );
            return false;
        }
    }

    /**
     * Obtiene el progreso del tema (0-100)
     * @returns {number}
     */
    getProgress() {
        return this.topic.getProgress();
    }

    /**
     * Reinicia todos los ejercicios
     */
    resetExercises() {
        this.topic.exercises.forEach(exercise => exercise.reset());
        this.notificationService.info('Ejercicios reiniciados');
    }

    /**
     * Obtiene estadísticas de los ejercicios
     * @returns {Object}
     */
    getStats() {
        return {
            total: this.topic.exercises.length,
            completed: this.getCompletedCount(),
            progress: this.getProgress(),
            exercises: this.topic.exercises.map(e => e.getStatus())
        };
    }
}
