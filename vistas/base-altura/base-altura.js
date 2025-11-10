// === VARIABLES PARA BASE Y ALTURA ===
let exercisesCompleted = 0;
const totalExercises = 3;

// === INICIALIZACIÓN ===
document.addEventListener("DOMContentLoaded", function () {
  initializeBaseAlturaModule();
});

function initializeBaseAlturaModule() {
  // Agregar animaciones de entrada
  const elements = document.querySelectorAll(
    ".concept-box, .interactive-area, .exercise-card"
  );
  elements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";

    setTimeout(() => {
      element.style.transition = "all 0.6s ease";
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 200);
  });
}

// === MOSTRAR INFORMACIÓN DE TRIÁNGULOS ===
function showTriangleInfo(type) {
  hideAllMeasurements();

  if (type === "rectangulo") {
    showElements(["base1", "baseLabel1", "height1", "heightLabel1"]);
    document.getElementById("triangleDetails").innerHTML = `
            <h5>🔺 Triángulo Rectángulo</h5>
            <p><span style="color: var(--error);">Base (roja):</span> 15 cm</p>
            <p><span style="color: var(--primary);">Altura (azul):</span> 10 cm</p>
            <p><strong>Área = Base × Altura ÷ 2 = 15 × 10 ÷ 2 = 75 cm²</strong></p>
        `;
  } else if (type === "isosceles") {
    showElements(["base2", "baseLabel2", "height2", "heightLabel2"]);
    document.getElementById("triangleDetails").innerHTML = `
            <h5>🔺 Triángulo Isósceles</h5>
            <p><span style="color: var(--error);">Base (roja):</span> 14 cm</p>
            <p><span style="color: var(--primary);">Altura (azul):</span> 12 cm</p>
            <p><strong>Área = Base × Altura ÷ 2 = 14 × 12 ÷ 2 = 84 cm²</strong></p>
        `;
  }

  document.getElementById("triangleInfo").style.display = "block";
}

// === MOSTRAR INFORMACIÓN DE PARALELOGRAMOS ===
function showParallelogramInfo(type) {
  hideAllMeasurements();

  if (type === "rectangulo") {
    showElements([
      "rectBase1",
      "rectBaseLabel1",
      "rectHeight1",
      "rectHeightLabel1",
    ]);
    document.getElementById("parallelogramDetails").innerHTML = `
            <h5>🔷 Rectángulo</h5>
            <p><span style="color: var(--error);">Base (roja):</span> 15 cm</p>
            <p><span style="color: var(--primary);">Altura (azul):</span> 8 cm</p>
            <p><strong>Área = Base × Altura = 15 × 8 = 120 cm²</strong></p>
        `;
  } else if (type === "cuadrado") {
    showElements([
      "squareBase1",
      "squareBaseLabel1",
      "squareHeight1",
      "squareHeightLabel1",
    ]);
    document.getElementById("parallelogramDetails").innerHTML = `
            <h5>🔷 Cuadrado</h5>
            <p><span style="color: var(--error);">Base (roja):</span> 10 cm</p>
            <p><span style="color: var(--primary);">Altura (azul):</span> 10 cm</p>
            <p><strong>Área = Base × Altura = 10 × 10 = 100 cm²</strong></p>
        `;
  } else if (type === "rombo") {
    showElements([
      "rhombusBase1",
      "rhombusBaseLabel1",
      "rhombusHeight1",
      "rhombusHeightLabel1",
    ]);
    document.getElementById("parallelogramDetails").innerHTML = `
            <h5>🔷 Rombo</h5>
            <p><span style="color: var(--error);">Base (roja):</span> 15 cm</p>
            <p><span style="color: var(--primary);">Altura (azul):</span> 11 cm</p>
            <p><strong>Área = Base × Altura = 15 × 11 = 165 cm²</strong></p>
        `;
  }

  document.getElementById("parallelogramInfo").style.display = "block";
}

// === FUNCIONES AUXILIARES ===
function hideAllMeasurements() {
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

function showElements(elementIds) {
  elementIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.style.display = "block";
  });
}

// === EJERCICIOS ===
function checkExercise1() {
  const base = parseInt(document.getElementById("exercise1Base").value);
  const height = parseInt(document.getElementById("exercise1Height").value);
  const result = document.getElementById("result1");

  if (base === 12 && height === 8) {
    result.innerHTML =
      '<div class="alert alert-success">🎉 ¡Correcto! Base = 12 cm, Altura = 8 cm</div>';
    exercisesCompleted++;
  } else {
    result.innerHTML =
      '<div class="alert alert-danger">❌ Revisa las medidas. La línea roja es la base y la línea azul punteada es la altura.</div>';
  }
}

function checkExercise2() {
  const area = parseInt(document.getElementById("exercise2Area").value);
  const result = document.getElementById("result2");

  if (area === 24) {
    result.innerHTML =
      '<div class="alert alert-success">🎉 ¡Perfecto! Área = 6 × 4 = 24 cm²</div>';
    exercisesCompleted++;
  } else {
    result.innerHTML =
      '<div class="alert alert-danger">❌ Recuerda: Área = Base × Altura = 6 × 4</div>';
  }
}

function checkExercise3() {
  const area = parseFloat(document.getElementById("exercise3Area").value);
  const result = document.getElementById("result3");

  if (area === 7.5) {
    result.innerHTML =
      '<div class="alert alert-success">🎉 ¡Excelente! María tiene que pintar 7.5 m² (3 × 2.5 = 7.5)</div>';
    exercisesCompleted++;
  } else {
    result.innerHTML =
      '<div class="alert alert-danger">❌ Calcula: 3 metros × 2.5 metros</div>';
  }
}

function completeLesson() {
  if (exercisesCompleted >= 2) {
    // Marcar como completado en el sistema principal
    if (window.markTopicCompleted) {
      window.markTopicCompleted("base-altura.html");
    }

    alert(
      "🎉 ¡Felicidades! Has completado la lección de Base y Altura. ¡Eres un experto en geometría!"
    );
    window.location.href = "index.html";
  } else {
    alert(
      "💪 ¡Casi lo tienes! Completa al menos 2 ejercicios antes de terminar la lección."
    );
  }
}
