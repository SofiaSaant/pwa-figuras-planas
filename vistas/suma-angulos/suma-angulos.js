// === VARIABLES PARA SUMA DE ÁNGULOS ===
let exercisesCompleted = 0;
const totalExercises = 4;
let isDragging = false;
let currentTriangle = null;
let currentVertex = null;

// Coordenadas de los triángulos
let triangles = {
    1: [
        {x: 150, y: 50},
        {x: 80, y: 180},
        {x: 220, y: 180}
    ],
    2: [
        {x: 100, y: 60},
        {x: 60, y: 180},
        {x: 240, y: 180}
    ]
};

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', function() {
    initializeSumaAngulosModule();
});

function initializeSumaAngulosModule() {
    setupDragAndDrop();
    updateTriangles();
    
    // Animaciones de entrada
    const elements = document.querySelectorAll('.concept-box, .interactive-area, .exercise-card');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// === CONFIGURAR ARRASTRAR Y SOLTAR ===
function setupDragAndDrop() {
    document.querySelectorAll('.draggable-vertex').forEach(vertex => {
        vertex.addEventListener('mousedown', startDrag);
        vertex.addEventListener('touchstart', startDrag);
    });

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
}

function startDrag(e) {
    isDragging = true;
    currentTriangle = parseInt(e.target.dataset.triangle);
    currentVertex = parseInt(e.target.dataset.vertex);
    e.preventDefault();
}

function drag(e) {
    if (!isDragging || currentTriangle === null || currentVertex === null) return;

    const svg = document.getElementById(`triangle${currentTriangle}`);
    const rect = svg.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    const x = ((clientX - rect.left) / rect.width) * 300;
    const y = ((clientY - rect.top) / rect.height) * 250;

    // Limitar el movimiento dentro del SVG
    const constrainedX = Math.max(20, Math.min(280, x));
    const constrainedY = Math.max(20, Math.min(230, y));

    triangles[currentTriangle][currentVertex] = {x: constrainedX, y: constrainedY};
    updateTriangles();
}

function stopDrag() {
    isDragging = false;
    currentTriangle = null;
    currentVertex = null;
}

// === ACTUALIZAR TRIÁNGULOS Y CALCULAR ÁNGULOS ===
function updateTriangles() {
    [1, 2].forEach(triangleNum => {
        const triangle = triangles[triangleNum];
        const shape = document.getElementById(`triangleShape${triangleNum}`);
        const vertices = document.querySelectorAll(`[data-triangle="${triangleNum}"]`);

        // Actualizar forma del triángulo
        const points = triangle.map(p => `${p.x},${p.y}`).join(' ');
        shape.setAttribute('points', points);

        // Actualizar posición de vértices
        vertices.forEach((vertex, index) => {
            vertex.setAttribute('cx', triangle[index].x);
            vertex.setAttribute('cy', triangle[index].y);
        });

        // Calcular y mostrar ángulos
        const angles = calculateAngles(triangle);
        updateAngleDisplay(triangleNum, angles);
    });
}

// === CALCULAR ÁNGULOS DEL TRIÁNGULO ===
function calculateAngles(triangle) {
    const angles = [];
    
    for (let i = 0; i < 3; i++) {
        const prev = triangle[(i - 1 + 3) % 3];
        const current = triangle[i];
        const next = triangle[(i + 1) % 3];

        // Vectores
        const v1 = {x: prev.x - current.x, y: prev.y - current.y};
        const v2 = {x: next.x - current.x, y: next.y - current.y};

        // Calcular ángulo usando producto punto
        const dot = v1.x * v2.x + v1.y * v2.y;
        const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
        const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
        
        let angle = Math.acos(dot / (mag1 * mag2)) * (180 / Math.PI);
        angles.push(Math.round(angle));
    }
    
    return angles;
}

// === ACTUALIZAR DISPLAY DE ÁNGULOS ===
function updateAngleDisplay(triangleNum, angles) {
    // Actualizar etiquetas en el SVG
    angles.forEach((angle, index) => {
        const label = document.getElementById(`angle${triangleNum}_${index}`);
        if (label) {
            label.textContent = `${angle}°`;
            
            // Posicionar etiqueta cerca del vértice
            const vertex = triangles[triangleNum][index];
            label.setAttribute('x', vertex.x);
            label.setAttribute('y', vertex.y + (index === 0 ? 20 : -10));
        }
    });

    // Actualizar display de información
    document.getElementById(`angleA${triangleNum}`).textContent = `${angles[0]}°`;
    document.getElementById(`angleB${triangleNum}`).textContent = `${angles[1]}°`;
    document.getElementById(`angleC${triangleNum}`).textContent = `${angles[2]}°`;
    
    const sum = angles.reduce((a, b) => a + b, 0);
    document.getElementById(`sum${triangleNum}`).textContent = `${sum}°`;
    
    // Cambiar color si la suma no es exactamente 180°
    const sumElement = document.getElementById(`sum${triangleNum}`);
    if (Math.abs(sum - 180) < 2) {
        sumElement.style.color = 'var(--accent)';
    } else {
        sumElement.style.color = 'var(--error)';
    }
}

// === EJERCICIOS ===
function checkExercise1() {
    const answer = parseInt(document.getElementById('exercise1').value);
    const result = document.getElementById('result1');
    
    if (answer === 45) {
        result.innerHTML = '<div class="alert alert-success">🎉 ¡Correcto! 180° - 45° - 90° = 45°</div>';
        exercisesCompleted++;
    } else {
        result.innerHTML = '<div class="alert alert-danger">❌ Piensa: 45° + 90° + ? = 180°</div>';
    }
}

function checkExercise2() {
    const answer = parseInt(document.getElementById('exercise2').value);
    const result = document.getElementById('result2');
    
    if (answer === 90) {
        result.innerHTML = '<div class="alert alert-success">🎉 ¡Perfecto! 360° - 80° - 100° - 90° = 90°</div>';
        exercisesCompleted++;
    } else {
        result.innerHTML = '<div class="alert alert-danger">❌ Recuerda: 80° + 100° + 90° + ? = 360°</div>';
    }
}

function checkExercise3() {
    const answer = parseInt(document.getElementById('exercise3').value);
    const result = document.getElementById('result3');
    
    if (answer === 60) {
        result.innerHTML = '<div class="alert alert-success">🎉 ¡Excelente! 180° ÷ 3 = 60° cada ángulo</div>';
        exercisesCompleted++;
    } else {
        result.innerHTML = '<div class="alert alert-danger">❌ Si los 3 ángulos son iguales y suman 180°, divide 180 ÷ 3</div>';
    }
}

function checkExercise4() {
    const answer = parseInt(document.getElementById('exercise4').value);
    const result = document.getElementById('result4');
    
    if (answer === 70) {
        result.innerHTML = '<div class="alert alert-success">🎉 ¡Genial! Ana necesita un ángulo de 70° (180° - 70° - 40° = 70°)</div>';
        exercisesCompleted++;
    } else {
        result.innerHTML = '<div class="alert alert-danger">❌ Calcula: 180° - 70° - 40° = ?</div>';
    }
}

function completeLesson() {
    if (exercisesCompleted >= 3) {
        // Marcar como completado en el sistema principal
        if (window.markTopicCompleted) {
            window.markTopicCompleted('suma-angulos.html');
        }
        
        alert('🎉 ¡Increíble! Has dominado la suma de ángulos. ¡Eres un maestro de la geometría!');
        window.location.href = 'index.html';
    } else {
        alert('💪 ¡Casi lo tienes! Completa al menos 3 ejercicios antes de terminar la lección.');
    }
}