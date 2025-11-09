// === BASE CLASS: Topic Module ===
// Clase base para todos los módulos de temas
// SOLID: Open/Closed - Abierta para extensión, cerrada para modificación
// SOLID: Liskov Substitution - Cualquier módulo puede sustituir a esta clase base

class BaseTopicModule {
    constructor(topicId, topicName, topicUrl, topicIcon) {
        // Servicios (Dependency Injection)
        this.storageService = new StorageService();
        this.notificationService = new NotificationService();
        this.animationService = new AnimationService();
        
        // Modelo del tema
        this.topic = new Topic(topicId, topicName, topicUrl, topicIcon);
        
        // Controladores
        this.exerciseController = null;
        this.progressController = null;
        
        // Estado
        this.isInitialized = false;
    }

    /**
     * Inicializa el módulo
     * Debe ser llamado en DOMContentLoaded
     */
    init() {
        if (this.isInitialized) return;
        
        // Inicializar servicios
        this.notificationService.init();
        
        // Crear controladores
        this.exerciseController = new ExerciseController(
            this.topic,
            this.notificationService,
            this.animationService
        );
        
        this.progressController = new ProgressController(
            this.storageService,
            this.notificationService,
            this.animationService
        );
        
        // Configurar ejercicios (debe ser implementado por subclases)
        this.setupExercises();
        
        // Configurar UI
        this.setupUI();
        
        // Animaciones de entrada
        this.animateEntrance();
        
        this.isInitialized = true;
    }

    /**
     * Configura los ejercicios del tema
     * DEBE ser implementado por las subclases
     * @abstract
     */
    setupExercises() {
        throw new Error('setupExercises() debe ser implementado por la subclase');
    }

    /**
     * Configura la interfaz de usuario
     * Puede ser sobrescrito por subclases
     */
    setupUI() {
        // Configurar botón de completar lección
        const completeBtn = document.getElementById('completeLesson');
        if (completeBtn) {
            completeBtn.addEventListener('click', () => this.completeLessonHandler());
        }
        
        // Configurar botón de volver
        const backBtn = document.getElementById('backToHome');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.goBack());
        }
    }

    /**
     * Anima la entrada de elementos
     */
    animateEntrance() {
        const elements = document.querySelectorAll('.concept-box, .interactive-area, .exercise-card');
        this.animationService.fadeInElements(elements, 200);
    }

    /**
     * Maneja el evento de completar lección
     */
    completeLessonHandler() {
        const success = this.exerciseController.tryCompleteTopic((topic) => {
            this.progressController.completeTopic(topic);
            
            setTimeout(() => {
                this.goBack();
            }, 2000);
        });
        
        if (!success) {
            // Ya se mostró la notificación en tryCompleteTopic
        }
    }

    /**
     * Vuelve a la página principal
     */
    goBack() {
        window.location.href = '../../index.html';
    }

    /**
     * Método auxiliar para verificar respuestas
     * @param {string} exerciseId
     * @param {string} inputId - ID del input con la respuesta
     * @param {string} resultId - ID del elemento donde mostrar resultado
     */
    checkExercise(exerciseId, inputId, resultId) {
        const input = document.getElementById(inputId);
        const result = document.getElementById(resultId);
        
        if (!input || !result) {
            console.error('Input o resultado no encontrado');
            return;
        }
        
        const userAnswer = input.value.trim();
        
        if (!userAnswer) {
            this.notificationService.warning('Por favor ingresa una respuesta');
            this.animationService.shake(input);
            return;
        }
        
        const isCorrect = this.exerciseController.checkAnswer(
            exerciseId,
            userAnswer,
            result
        );
        
        if (isCorrect) {
            this.animationService.highlight(input, '#AED581');
        } else {
            this.animationService.shake(input);
        }
    }

    /**
     * Agrega un ejercicio al tema
     * @param {string} id
     * @param {string} question
     * @param {*} correctAnswer
     * @param {string} type
     */
    addExercise(id, question, correctAnswer, type = 'numeric') {
        const exercise = new Exercise(id, question, correctAnswer, type);
        this.topic.addExercise(exercise);
    }

    /**
     * Obtiene estadísticas del módulo
     */
    getStats() {
        return {
            topic: this.topic.getStats(),
            exercises: this.exerciseController.getStats()
        };
    }
}
