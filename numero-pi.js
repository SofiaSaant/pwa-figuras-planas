// === VARIABLES PARA NÚMERO PI ===
let exercisesCompleted = 0;
const PI = 3.14;

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', function() {
    initializeNumeroPiModule();
});

function initializeNumeroPiModule() {
    // Animaciones de entrada
    const elements = document.querySelectorAll('.concept-box, .interactive-area, .exercise-card, .calculator-area');
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

// === MOSTRAR DEMOSTRACIÓN DE π ===
function showPiDemo() {
    const demo = document.getElementById('piDemo');
    if (demo.style.display === 'none') {
        demo.style.display = 'block';
        demo.scrollIntoView({ behavior: 'smooth' });
    } else {
        demo.style.display = 'none';
    }
}

// === CALCULADORA DESDE RADIO ===
function calculateFromRadius() {
    const radius = parseFloat(document.getElementById('radiusInput').value);
    const result = document.getElementById('calculatorResult');
    const steps = document.getElementById('calculationSteps');
    
    if (radius > 0) {
        const circumference = (2 * PI * radius).toFixed(2);
        const diameter = (2 * radius).toFixed(1);
        
        steps.innerHTML = `
            <h5>📊 Resultados para radio = ${radius} cm</h5>
            <div class="mb-2"><strong>Diámetro:</strong> d = 2 × r = 2 × ${radius} = ${diameter} cm</div>
            <div class="mb-2"><strong>Circunferencia:</strong> C = 2 × π × r</div>
            <div class="mb-2">C = 2 × 3.14 × ${radius} = <strong>${circumference} cm</strong></div>
        `;
        result.style.display = 'block';
    } else {
        alert('Por favor, ingresa un radio válido mayor que 0.');
    }
}

// === CALCULADORA DESDE DIÁMETRO ===
function calculateFromDiameter() {
    const diameter = parseFloat(document.getElementById('diameterInput').value);
    const result = document.getElementById('calculatorResult');
    const steps = document.getElementById('calculationSteps');
    
    if (diameter > 0) {
        const circumference = (PI * diameter).toFixed(2);
        const radius = (diameter / 2).toFixed(1);
        
        steps.innerHTML = `
            <h5>📊 Resultados para diámetro = ${diameter} cm</h5>
            <div class="mb-2"><strong>Radio:</strong> r = d ÷ 2 = ${diameter} ÷ 2 = ${radius} cm</div>
            <div class="mb-2"><strong>Circunferencia:</strong> C = π × d</div>
            <div class="mb-2">C = 3.14 × ${diameter} = <strong>${circumference} cm</strong></div>
        `;
        result.style.display = 'block';
    } else {
        alert('Por favor, ingresa un diámetro válido mayor que 0.');
    }
}

// === EJERCICIOS ===
function checkExercise1() {
    const answer = parseFloat(document.getElementById('exercise1').value);
    const result = document.getElementById('result1');
    const expected = 2 * PI * 30; // 188.4
    
    if (Math.abs(answer - expected) < 1) {
        result.innerHTML = '<div class="alert alert-success">🎉 ¡Correcto! C = 2 × 3.14 × 30 = 188.4 cm</div>';
        exercisesCompleted++;
    } else {
        result.innerHTML = '<div class="alert alert-danger">❌ Usa la fórmula: C = 2 × π × r = 2 × 3.14 × 30</div>';
    }
}

function checkExercise2() {
    const answer = parseFloat(document.getElementById('exercise2').value);
    const result = document.getElementById('result2');
    const expected = PI * 40; // 125.6
    
    if (Math.abs(answer - expected) < 1) {
        result.innerHTML = '<div class="alert alert-success">🎉 ¡Perfecto! C = π × d = 3.14 × 40 = 125.6 cm</div>';
        exercisesCompleted++;
    } else {
        result.innerHTML = '<div class="alert alert-danger">❌ Usa la fórmula: C = π × d = 3.14 × 40</div>';
    }
}

function checkExercise3() {
    const answer = parseFloat(document.getElementById('exercise3').value);
    const result = document.getElementById('result3');
    const expected = 31.4 / (2 * PI); // 5
    
    if (Math.abs(answer - expected) < 0.5) {
        result.innerHTML = '<div class="alert alert-success">🎉 ¡Excelente! Si C = 31.4, entonces r = C ÷ (2π) = 31.4 ÷ 6.28 = 5 cm</div>';
        exercisesCompleted++;
    } else {
        result.innerHTML = '<div class="alert alert-danger">❌ Despeja r de la fórmula: C = 2 × π × r, entonces r = C ÷ (2 × π)</div>';
    }
}

function checkExercise4() {
    const answer = document.getElementById('exercise4').value;
    const result = document.getElementById('result4');
    
    if (answer === '3.14') {
        result.innerHTML = '<div class="alert alert-success">🎉 ¡Correcto! El diámetro cabe exactamente π veces (3.14 veces) en la circunferencia</div>';
        exercisesCompleted++;
    } else {
        result.innerHTML = '<div class="alert alert-danger">❌ Recuerda que π = Circunferencia ÷ Diámetro, por lo que el diámetro cabe π veces</div>';
    }
}

function completeLesson() {
    if (exercisesCompleted >= 3) {
        // Marcar como completado en el sistema principal
        if (window.markTopicCompleted) {
            window.markTopicCompleted('numero-pi.html');
        }
        
        alert('🎉 ¡Increíble! Has dominado el número π. ¡Ahora puedes calcular cualquier circunferencia!');
        window.location.href = 'index.html';
    } else {
        alert('💪 ¡Casi lo tienes! Completa al menos 3 ejercicios antes de terminar la lección.');
    }
}