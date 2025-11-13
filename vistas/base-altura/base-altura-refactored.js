// === MODULE: Base y Altura ===
// Módulo específico para el tema de Base y Altura
// SOLID: Hereda de BaseTopicModule (Open/Closed, Liskov Substitution)

class BaseAlturaModule extends BaseTopicModule {
  constructor() {
    super(
      "base-altura",
      "Base y Altura",
      "vistas/base-altura/base-altura.html",
      "📐"
    );
  }

  /**
   * Configura los ejercicios específicos de este tema
   * @override
   */
  setupExercises() {
    // Pool de ejercicios tipo 1: Identificar base y altura
    this.exercisePool1 = [
      { base: 12, altura: 8, svg: 'triangle1' },
      { base: 15, altura: 10, svg: 'triangle2' },
      { base: 18, altura: 12, svg: 'triangle3' },
      { base: 20, altura: 14, svg: 'triangle4' }
    ];

    // Pool de ejercicios tipo 2: Calcular área de rectángulo
    this.exercisePool2 = [
      { base: 6, altura: 4, area: 24 },
      { base: 8, altura: 5, area: 40 },
      { base: 10, altura: 7, area: 70 },
      { base: 12, altura: 6, area: 72 }
    ];

    // Pool de ejercicios tipo 3: Problemas de la vida real
    this.exercisePool3 = [
      { 
        texto: "María quiere pintar una pared rectangular. La pared mide 3 metros de base y 2.5 metros de altura. ¿Cuántos metros cuadrados debe pintar?",
        area: 7.5 
      },
      { 
        texto: "Juan tiene un jardín triangular con una base de 8 metros y una altura de 6 metros. ¿Cuál es el área del jardín? (Recuerda: Área = Base × Altura ÷ 2)",
        area: 24 
      },
      { 
        texto: "Una ventana rectangular mide 1.5 metros de base y 2 metros de altura. ¿Cuál es su área?",
        area: 3 
      },
      { 
        texto: "Un cartel triangular tiene una base de 10 metros y una altura de 8 metros. ¿Cuántos metros cuadrados de material se necesitan? (Área = Base × Altura ÷ 2)",
        area: 40 
      }
    ];

    // Seleccionar ejercicios aleatorios al cargar
    this.selectedEx1 = this.exercisePool1[Math.floor(Math.random() * this.exercisePool1.length)];
    this.selectedEx2 = this.exercisePool2[Math.floor(Math.random() * this.exercisePool2.length)];
    this.selectedEx3 = this.exercisePool3[Math.floor(Math.random() * this.exercisePool3.length)];

    // Registrar ejercicios seleccionados
    this.addExercise(
      "ex1-base",
      "¿Cuál es la medida de la base del triángulo?",
      this.selectedEx1.base,
      "numeric"
    );

    this.addExercise(
      "ex1-altura",
      "¿Cuál es la medida de la altura del triángulo?",
      this.selectedEx1.altura,
      "numeric"
    );

    this.addExercise(
      "ex2",
      "Calcula el área del rectángulo (Base × Altura)",
      this.selectedEx2.area,
      "numeric"
    );

    this.addExercise(
      "ex3",
      "Calcula el área",
      this.selectedEx3.area,
      "numeric"
    );
  }

  /**
   * Actualiza el DOM con los ejercicios seleccionados aleatoriamente
   */
  updateExerciseDOM() {
    // Usar setTimeout para asegurar que el DOM esté listo
    setTimeout(() => {
      // Actualizar Ejercicio 2
      const ex2Base = document.getElementById('ex2-base-value');
      const ex2Altura = document.getElementById('ex2-altura-value');
      if (ex2Base) ex2Base.textContent = this.selectedEx2.base;
      if (ex2Altura) ex2Altura.textContent = this.selectedEx2.altura;

      // Actualizar Ejercicio 3
      const ex3Text = document.getElementById('ex3-problem-text');
      if (ex3Text) ex3Text.textContent = this.selectedEx3.texto;
    }, 100);
  }

  /**
   * Configura UI específica de este módulo
   * @override
   */
  setupUI() {
    super.setupUI(); // Llamar al método padre

    // Actualizar el DOM con los ejercicios seleccionados
    this.updateExerciseDOM();

    // Configurar botones de triángulos
    this.setupTriangleButtons();

    // Configurar botones de paralelogramos (Aunque no estén en el HTML, es para el futuro)
    this.setupParallelogramButtons();

    // Configurar botones de ejercicios
    this.setupExerciseButtons();
  }

  /**
   * Configura los botones de triángulos interactivos
   */
  setupTriangleButtons() {
    const btnRectangulo = document.getElementById("btnTrianguloRectangulo");
    const btnIsosceles = document.getElementById("btnTrianguloIsosceles");

    if (btnRectangulo) {
      btnRectangulo.addEventListener("click", () => {
        this.showTriangleInfo("rectangulo");
        this.animationService.buttonPress(btnRectangulo);
      });
    }

    if (btnIsosceles) {
      btnIsosceles.addEventListener("click", () => {
        this.showTriangleInfo("isosceles");
        this.animationService.buttonPress(btnIsosceles);
      });
    }
  }

  /**
   * Configura los botones de paralelogramos interactivos
   */
  setupParallelogramButtons() {
    const buttons = [
      { id: "btnRectangulo", type: "rectangulo" },
      { id: "btnCuadrado", type: "cuadrado" },
      { id: "btnRombo", type: "rombo" },
    ];

    buttons.forEach(({ id, type }) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener("click", () => {
          this.showParallelogramInfo(type);
          this.animationService.buttonPress(btn);
        });
      }
    });
  }

  /**
   * Configura los botones de verificación de ejercicios
   */
  setupExerciseButtons() {
    // Ejercicio 1
    const btnEx1 = document.getElementById("checkExercise1");
    if (btnEx1) {
      btnEx1.addEventListener("click", () => this.checkExercise1());
    }

    // Ejercicio 2
    const btnEx2 = document.getElementById("checkExercise2");
    if (btnEx2) {
      btnEx2.addEventListener("click", () => this.checkExercise2());
    }

    // Ejercicio 3
    const btnEx3 = document.getElementById("checkExercise3");
    if (btnEx3) {
      btnEx3.addEventListener("click", () => this.checkExercise3());
    }
  }

  /**
   * Muestra información de triángulos
   */
  showTriangleInfo(type) {
    this.hideAllMeasurements();

    const details = document.getElementById("triangleDetails");
    const info = document.getElementById("triangleInfo");

    if (type === "rectangulo") {
      this.showElements(["base1", "baseLabel1", "height1", "heightLabel1"]);
      if (details) {
        details.innerHTML = `
                <h5 class="font-bold mb-2">🔺 Triángulo Rectángulo</h5>
                <p><span class="text-red-600 dark:text-red-400 font-semibold">Base (roja):</span> 15 cm</p>
                <p><span class="text-blue-600 dark:text-blue-400 font-semibold">Altura (azul):</span> 10 cm</p>
                <p class="mt-2"><strong>Área = Base × Altura ÷ 2 = 15 × 10 ÷ 2 = 75 cm²</strong></p>
              `;
      }
    } else if (type === "isosceles") {
      this.showElements(["base2", "baseLabel2", "height2", "heightLabel2"]);
      if (details) {
        details.innerHTML = `
                <h5 class="font-bold mb-2">🔺 Triángulo Isósceles</h5>
                <p><span class="text-red-600 dark:text-red-400 font-semibold">Base (roja):</span> 14 cm</p>
                <p><span class="text-blue-600 dark:text-blue-400 font-semibold">Altura (azul):</span> 12 cm</p>
                <p class="mt-2"><strong>Área = Base × Altura ÷ 2 = 14 × 12 ÷ 2 = 84 cm²</strong></p>
              `;
      }
    }

    if (info) {
      info.style.display = "block";
      this.animationService.fadeInElements([info], 0);
    }
  }

  /**
   * Muestra información de paralelogramos
   */
  showParallelogramInfo(type) {
    this.hideAllMeasurements();

    const details = document.getElementById("parallelogramDetails");
    const info = document.getElementById("parallelogramInfo");

    const infoMap = {
      rectangulo: {
        elements: [
          "rectBase1",
          "rectBaseLabel1",
          "rectHeight1",
          "rectHeightLabel1",
        ],
        html: `
                  <h5>🔷 Rectángulo</h5>
                  <p><span style="color: var(--error);">Base (roja):</span> 15 cm</p>
                  <p><span style="color: var(--primary);">Altura (azul):</span> 8 cm</p>
                  <p><strong>Área = Base × Altura = 15 × 8 = 120 cm²</strong></p>
                `,
      },
      cuadrado: {
        elements: [
          "squareBase1",
          "squareBaseLabel1",
          "squareHeight1",
          "squareHeightLabel1",
        ],
        html: `
                  <h5>🔷 Cuadrado</h5>
                  <p><span style="color: var(--error);">Base (roja):</span> 10 cm</p>
                  <p><span style="color: var(--primary);">Altura (azul):</span> 10 cm</p>
                  <p><strong>Área = Base × Altura = 10 × 10 = 100 cm²</strong></p>
                `,
      },
      rombo: {
        elements: [
          "rhombusBase1",
          "rhombusBaseLabel1",
          "rhombusHeight1",
          "rhombusHeightLabel1",
        ],
        html: `
                  <h5>🔷 Rombo</h5>
                  <p><span style="color: var(--error);">Base (roja):</span> 15 cm</p>
                  <p><span style="color: var(--primary);">Altura (azul):</span> 11 cm</p>
                  <p><strong>Área = Base × Altura = 15 × 11 = 165 cm²</strong></p>
                `,
      },
    };

    const typeInfo = infoMap[type];
    if (typeInfo) {
      this.showElements(typeInfo.elements);
      if (details) {
        details.innerHTML = typeInfo.html;
      }
    }

    if (info) {
      info.style.display = "block";
      this.animationService.fadeInElements([info], 0);
    }
  }

  /**
   * Oculta todas las mediciones
   */
  hideAllMeasurements() {
    const elements = [
      "base1",
      "baseLabel1",
      "height1",
      "heightLabel1",
      "base2",
      "baseLabel2",
      "height2",
      "heightLabel2",
      "rectBase1",
      "rectBaseLabel1",
      "rectHeight1",
      "rectHeightLabel1",
      "squareBase1",
      "squareBaseLabel1",
      "squareHeight1",
      "squareHeightLabel1",
      "rhombusBase1",
      "rhombusBaseLabel1",
      "rhombusHeight1",
      "rhombusHeightLabel1",
    ];

    elements.forEach((id) => {
      const element = document.getElementById(id);
      if (element) element.style.display = "none";
    });
  }

  /**
   * Muestra elementos por ID
   */
  showElements(elementIds) {
    elementIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) element.style.display = "block";
    });
  }

  /**
   * Verifica ejercicio 1
   * *** SOLUCIÓN: Este método ahora maneja su propia lógica
   * de "campo vacío" y de éxito/error. ***
   */
  checkExercise1() {
    const baseInput = document.getElementById("exercise1Base");
    const heightInput = document.getElementById("exercise1Height");
    const result = document.getElementById("result1");

    const base = baseInput?.value;
    const height = heightInput?.value;

    // 1. Verificar campos vacíos
    if (!base || !height) {
      this.notificationService.warning("Completa ambos campos");
      if (!base && baseInput) this.animationService.shake(baseInput);
      if (!height && heightInput) this.animationService.shake(heightInput);
      return;
    }

    // 2. Verificar ambas respuestas con los valores seleccionados aleatoriamente
    const baseCorrect = parseFloat(base) === this.selectedEx1.base;
    const heightCorrect = parseFloat(height) === this.selectedEx1.altura;

    if (baseCorrect && heightCorrect) {
      // 3. Lógica de Éxito
      if (result) {
        result.innerHTML =
          `<div class="alert alert-success">🎉 ¡Correcto! Base = ${this.selectedEx1.base} cm, Altura = ${this.selectedEx1.altura} cm</div>`;
        this.animationService.bounce(result);
      }
    } else {
      // 4. Lógica de Error
      if (result) {
        result.innerHTML =
          '<div class="alert alert-danger">❌ Revisa las medidas. La línea roja es la base y la línea azul punteada es la altura.</div>';
        this.animationService.shake(result);
      }
    }
  }

  /**
   * Verifica ejercicio 2
   * (Este ya funcionaba bien, usa el método base 'checkExercise')
   */
  checkExercise2() {
    this.checkExercise("ex2", "exercise2Area", "result2");
  }

  /**
   * Verifica ejercicio 3
   * (Este ya funcionaba bien, usa el método base 'checkExercise')
   */
  checkExercise3() {
    this.checkExercise("ex3", "exercise3Area", "result3");
  }
}

// === INICIALIZACIÓN ===
// Crear instancia y inicializar cuando el DOM esté listo
let baseAlturaModule;

// === EVALUACIÓN: Ejercicios aleatorios ===
class BaseAlturaEvaluacion extends BaseAlturaModule {
  constructor() {
    super();
  }

  setupExercises() {
    // Pool de preguntas tipo 1: Identificar base y altura de triángulos
    this.evalPool1 = [
      { base: 14, altura: 9, figura: 'Triángulo Obtuso' },
      { base: 16, altura: 11, figura: 'Triángulo Acutángulo' },
      { base: 18, altura: 13, figura: 'Triángulo Escaleno' },
      { base: 20, altura: 15, figura: 'Triángulo Isósceles' }
    ];

    // Pool de preguntas tipo 2: Calcular área de paralelogramos
    this.evalPool2 = [
      { base: 12, altura: 9, area: 108, figura: 'Rombo' },
      { base: 15, altura: 8, area: 120, figura: 'Romboide' },
      { base: 10, altura: 10, area: 100, figura: 'Cuadrado' },
      { base: 14, altura: 7, area: 98, figura: 'Rectángulo' }
    ];

    // Pool de preguntas tipo 3: Problemas de la vida real
    this.evalPool3 = [
      { 
        texto: "Pedro tiene una vela triangular para su barco. La vela mide 6 metros de base y 8 metros de altura. ¿Cuál es el área de la vela? (Recuerda: Área del triángulo = Base × Altura ÷ 2)",
        area: 24 
      },
      { 
        texto: "Ana quiere alfombrar su sala rectangular que mide 5 metros de base y 4 metros de altura. ¿Cuántos metros cuadrados de alfombra necesita?",
        area: 20 
      },
      { 
        texto: "Un letrero triangular de tránsito tiene una base de 10 metros y una altura de 12 metros. ¿Cuál es su área? (Área = Base × Altura ÷ 2)",
        area: 60 
      },
      { 
        texto: "Luis tiene un terreno rectangular de 8 metros de base y 6 metros de altura. ¿Cuál es el área total del terreno?",
        area: 48 
      }
    ];

    // Seleccionar preguntas aleatorias
    this.selectedEval1 = this.evalPool1[Math.floor(Math.random() * this.evalPool1.length)];
    this.selectedEval2 = this.evalPool2[Math.floor(Math.random() * this.evalPool2.length)];
    this.selectedEval3 = this.evalPool3[Math.floor(Math.random() * this.evalPool3.length)];
  }

  updateEvaluacionDOM() {
    // Usar setTimeout para asegurar que el DOM esté listo
    setTimeout(() => {
      // Actualizar Pregunta 1
      const eval1Title = document.querySelector('h3');
      if (eval1Title && eval1Title.textContent.includes('Pregunta 1')) {
        eval1Title.textContent = `Pregunta 1: ${this.selectedEval1.figura}`;
      }
      const eval1Base = document.getElementById('eval1-base-value');
      const eval1Altura = document.getElementById('eval1-altura-value');
      if (eval1Base) eval1Base.textContent = this.selectedEval1.base;
      if (eval1Altura) eval1Altura.textContent = this.selectedEval1.altura;

      // Actualizar Pregunta 2
      const eval2Title = document.querySelectorAll('h3')[1];
      if (eval2Title && eval2Title.textContent.includes('Pregunta 2')) {
        eval2Title.textContent = `Pregunta 2: Área del ${this.selectedEval2.figura}`;
      }
      const eval2Base = document.getElementById('eval2-base-value');
      const eval2Altura = document.getElementById('eval2-altura-value');
      if (eval2Base) eval2Base.textContent = this.selectedEval2.base;
      if (eval2Altura) eval2Altura.textContent = this.selectedEval2.altura;

      // Actualizar Pregunta 3
      const eval3Text = document.getElementById('eval3-problem-text');
      if (eval3Text) eval3Text.textContent = this.selectedEval3.texto;
    }, 100);
  }

  setupUI() {
    super.setupUI();
    // Actualizar el DOM con las preguntas seleccionadas
    this.updateEvaluacionDOM();
  }

  setupExerciseButtons() {
    // Pregunta 1
    const btnEval1 = document.getElementById("checkEval1");
    if (btnEval1) {
      btnEval1.addEventListener("click", () => this.checkEval1());
    }

    // Pregunta 2
    const btnEval2 = document.getElementById("checkEval2");
    if (btnEval2) {
      btnEval2.addEventListener("click", () => this.checkEval2());
    }

    // Pregunta 3
    const btnEval3 = document.getElementById("checkEval3");
    if (btnEval3) {
      btnEval3.addEventListener("click", () => this.checkEval3());
    }
  }

  checkEval1() {
    const areaInput = document.getElementById("eval1Area");
    const result = document.getElementById("resultEval1");

    const area = areaInput?.value;

    if (!area) {
      this.notificationService.warning("Completa el campo");
      if (areaInput) this.animationService.shake(areaInput);
      return;
    }

    // Calcular área correcta: (base × altura) / 2
    const areaCorrecta = (this.selectedEval1.base * this.selectedEval1.altura) / 2;
    const areaCorrect = parseFloat(area) === areaCorrecta;

    if (areaCorrect) {
      if (result) {
        result.innerHTML =
          `<div class="alert alert-success">🎉 ¡Correcto! El área es ${areaCorrecta} cm²</div>`;
        this.animationService.bounce(result);
      }
    } else {
      if (result) {
        result.innerHTML =
          `<div class="alert alert-danger">❌ Incorrecto. Recuerda: Área del triángulo = (Base × Altura) ÷ 2 = (${this.selectedEval1.base} × ${this.selectedEval1.altura}) ÷ 2</div>`;
        this.animationService.shake(result);
      }
    }
  }

  checkEval2() {
    const areaInput = document.getElementById("eval2Area");
    const result = document.getElementById("resultEval2");

    const area = areaInput?.value;

    if (!area) {
      this.notificationService.warning("Completa el campo");
      if (areaInput) this.animationService.shake(areaInput);
      return;
    }

    const areaCorrect = parseFloat(area) === this.selectedEval2.area;

    if (areaCorrect) {
      if (result) {
        result.innerHTML =
          `<div class="alert alert-success">🎉 ¡Correcto! El área es ${this.selectedEval2.area} cm²</div>`;
        this.animationService.bounce(result);
      }
    } else {
      if (result) {
        result.innerHTML =
          `<div class="alert alert-danger">❌ Incorrecto. Recuerda: Área = Base × Altura = ${this.selectedEval2.base} × ${this.selectedEval2.altura}</div>`;
        this.animationService.shake(result);
      }
    }
  }

  checkEval3() {
    const areaInput = document.getElementById("eval3Area");
    const result = document.getElementById("resultEval3");

    const area = areaInput?.value;

    if (!area) {
      this.notificationService.warning("Completa el campo");
      if (areaInput) this.animationService.shake(areaInput);
      return;
    }

    const areaCorrect = parseFloat(area) === this.selectedEval3.area;

    if (areaCorrect) {
      if (result) {
        result.innerHTML =
          `<div class="alert alert-success">🎉 ¡Correcto! El área es ${this.selectedEval3.area} m²</div>`;
        this.animationService.bounce(result);
      }
    } else {
      if (result) {
        result.innerHTML =
          '<div class="alert alert-danger">❌ Incorrecto. Revisa tu cálculo.</div>';
        this.animationService.shake(result);
      }
    }
  }
}

// Detectar si estamos en evaluación y usar la clase apropiada
document.addEventListener("DOMContentLoaded", function () {
  const isEvaluacion = window.location.pathname.includes('evaluacion.html');
  
  if (isEvaluacion) {
    baseAlturaModule = new BaseAlturaEvaluacion();
  } else if (!baseAlturaModule) {
    baseAlturaModule = new BaseAlturaModule();
  }
  
  baseAlturaModule.init();
});
