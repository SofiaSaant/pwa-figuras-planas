
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
    // Pool de preguntas tipo 1: Triángulos
    this.evalPool1 = [
      { base: 14, altura: 9 },
      { base: 16, altura: 11 },
      { base: 18, altura: 13 },
      { base: 20, altura: 15 },
      { base: 12, altura: 10 },
      { base: 22, altura: 14 }
    ];

    // Pool de preguntas tipo 2: Paralelogramos (rombos)
    this.evalPool2 = [
      { base: 12, altura: 9 },
      { base: 15, altura: 11 },
      { base: 10, altura: 8 },
      { base: 14, altura: 10 },
      { base: 16, altura: 12 },
      { base: 13, altura: 9 }
    ];

    // Pool de preguntas tipo 3: Problemas de la vida real
    this.evalPool3 = [
      { 
        texto: "Pedro tiene una vela triangular para su barco. La vela mide 6 metros de base y 8 metros de altura. ¿Cuál es el área de la vela? (Recuerda: Área del triángulo = Base × Altura ÷ 2)",
        base: 6,
        altura: 8,
        esTriangulo: true
      },
      { 
        texto: "Ana quiere alfombrar su sala rectangular que mide 5 metros de base y 4 metros de altura. ¿Cuántos metros cuadrados de alfombra necesita?",
        base: 5,
        altura: 4,
        esTriangulo: false
      },
      { 
        texto: "Un letrero triangular de tránsito tiene una base de 10 metros y una altura de 12 metros. ¿Cuál es su área? (Área = Base × Altura ÷ 2)",
        base: 10,
        altura: 12,
        esTriangulo: true
      },
      { 
        texto: "Luis tiene un terreno rectangular de 8 metros de base y 6 metros de altura. ¿Cuál es el área total del terreno?",
        base: 8,
        altura: 6,
        esTriangulo: false
      },
      { 
        texto: "Una cometa triangular tiene una base de 4 metros y una altura de 5 metros. ¿Cuál es su área? (Área = Base × Altura ÷ 2)",
        base: 4,
        altura: 5,
        esTriangulo: true
      },
      { 
        texto: "Un piso rectangular mide 7 metros de base y 5 metros de altura. ¿Cuántos metros cuadrados tiene?",
        base: 7,
        altura: 5,
        esTriangulo: false
      }
    ];

    // Seleccionar preguntas aleatorias
    this.selectedEval1 = this.evalPool1[Math.floor(Math.random() * this.evalPool1.length)];
    this.selectedEval2 = this.evalPool2[Math.floor(Math.random() * this.evalPool2.length)];
    this.selectedEval3 = this.evalPool3[Math.floor(Math.random() * this.evalPool3.length)];

    // Calcular áreas correctas
    const area1 = (this.selectedEval1.base * this.selectedEval1.altura) / 2;
    const area2 = this.selectedEval2.base * this.selectedEval2.altura;
    const area3 = this.selectedEval3.esTriangulo 
      ? (this.selectedEval3.base * this.selectedEval3.altura) / 2 
      : this.selectedEval3.base * this.selectedEval3.altura;

    // Registrar ejercicios
    this.addExercise(
      "eval1",
      "Calcula el área del triángulo obtuso",
      area1,
      "numeric"
    );

    this.addExercise(
      "eval2",
      "Calcula el área del rombo",
      area2,
      "numeric"
    );

    this.addExercise(
      "eval3",
      "Calcula el área de la vela",
      area3,
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

    // Actualizar el DOM con los ejercicios seleccionados
    this.updateEvaluacionDOM();

    // Configurar botones de ejercicios de evaluación
    this.setupEvaluationButtons();
  }

  /**
   * Actualiza el DOM con los ejercicios seleccionados aleatoriamente
   */
  updateEvaluacionDOM() {
    setTimeout(() => {
      // Actualizar Pregunta 1
      const eval1Base = document.getElementById('eval1-base-value');
      const eval1Altura = document.getElementById('eval1-altura-value');
      if (eval1Base) eval1Base.textContent = this.selectedEval1.base;
      if (eval1Altura) eval1Altura.textContent = this.selectedEval1.altura;

      // Actualizar Pregunta 2
      const eval2Base = document.getElementById('eval2-base-value');
      const eval2Altura = document.getElementById('eval2-altura-value');
      if (eval2Base) eval2Base.textContent = this.selectedEval2.base;
      if (eval2Altura) eval2Altura.textContent = this.selectedEval2.altura;

      // Actualizar Pregunta 3
      const eval3Text = document.getElementById('eval3-problem-text');
      if (eval3Text) eval3Text.textContent = this.selectedEval3.texto;
    }, 100);
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