
class EvaluacionBaseAlturaModule extends BaseTopicModule {
  constructor() {
    super(
      "base-altura-eval", // ID único para esta evaluación
      "Evaluación: Base y Altura",
      "vistas/base-altura/evaluacion.html",
      "🎓"
    );
  }

  /**
   * Configura los ejercicios específicos de esta evaluación
   * @override
   */
  setupExercises() {
    // Pregunta 1: Área de triángulo obtuso (10 * 7) / 2 = 35
    this.addExercise(
      "eval1",
      "Calcula el área del triángulo obtuso",
      35,
      "numeric"
    );

    // Pregunta 2: Área de rombo (15 * 11) = 165
    this.addExercise(
      "eval2",
      "Calcula el área del rombo",
      165,
      "numeric"
    );

    // Pregunta 3: Problema de la vela (4 * 6) / 2 = 12
    this.addExercise(
      "eval3",
      "Calcula el área de la vela",
      12,
      "numeric"
    );
  }

  /**
   * Configura UI específica de este módulo
   * @override
   */
  setupUI() {
    // Llamar al método padre (aunque en este caso no hace mucho, es buena práctica)
    super.setupUI();

    // Configurar botones de ejercicios de evaluación
    this.setupEvaluationButtons();
  }

  /**
   * Configura los botones de verificación de ejercicios
   */
  setupEvaluationButtons() {
    // Pregunta 1
    const btnEval1 = document.getElementById("checkEval1");
    if (btnEval1) {
      btnEval1.addEventListener("click", () =>
        this.checkEvaluation1()
      );
    }

    // Pregunta 2
    const btnEval2 = document.getElementById("checkEval2");
    if (btnEval2) {
      btnEval2.addEventListener("click", () =>
        this.checkEvaluation2()
      );
    }

    // Pregunta 3
    const btnEval3 = document.getElementById("checkEval3");
    if (btnEval3) {
      btnEval3.addEventListener("click", () =>
        this.checkEvaluation3()
      );
    }
  }

  /**
   * Verifica evaluación 1
   */
  checkEvaluation1() {
    // Usamos el método genérico 'checkExercise' heredado de BaseTopicModule
    this.checkExercise("eval1", "eval1Area", "resultEval1");
  }

  /**
   * Verifica evaluación 2
   */
  checkEvaluation2() {
    this.checkExercise("eval2", "eval2Area", "resultEval2");
  }

  /**
   * Verifica evaluación 3
   */
  checkEvaluation3() {
    this.checkExercise("eval3", "eval3Area", "resultEval3");
  }
}

// === INICIALIZACIÓN ===
// Crear instancia y inicializar cuando el DOM esté listo
let evaluacionModule;

document.addEventListener("DOMContentLoaded", function () {
  evaluacionModule = new EvaluacionBaseAlturaModule();
  evaluacionModule.init();
});