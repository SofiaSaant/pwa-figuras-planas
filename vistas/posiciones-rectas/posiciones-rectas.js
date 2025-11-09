// === VARIABLES PARA POSICIONES DE RECTAS ===
let isDragging = false;
let showingDistance = false;
let exercisesCompleted = 0;
const centerX = 200;
const centerY = 175;
const radius = 80;

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', function() {
    initializePosicionesRectasModule();
});

function initializePosicionesRectasModule() {
    setupSimulator();
    updateSimulatorStatus(50);
    
    // Animaciones de entrada
    const elements = document.querySelectorAll('.concept-box, .interactive-area, .exercise-card, .simulator-area');
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

// === MOSTRAR INFORMACIÓN DE POSICIONES ===
function showPositionInfo(positionType) {
    const info = {
        exterior: {
            title: '🚫 Recta Exterior',
            description: 'La recta NO toca la circunferencia en ningún punto. Están separadas.',
            condition: 'La distancia del centro a la recta es MAYOR que el radio.',
            example: 'Como una carretera que pasa lejos de una rotonda.'
        },
        tangente: {
            title: '👆 Recta Tangente',
            description: 'La recta toca la circunferencia en EXACTAMENTE UN punto.',
            condition: 'La distancia del centro a la recta es IGUAL al radio.',
            example: 'Como una regla que toca apenas el borde de una moneda.'
        },
        secante: {
            title: '✂️ Recta Secante',
            description: 'La recta corta la circunferencia en DOS puntos. La atraviesa.',
            condition: 'La distancia del centro a la recta es MENOR que el radio.',
            example: 'Como una espada que atraviesa un escudo redondo.'
        }
    };
    
    const positionData = info[positionType];
    if (positionData) {
        document.getElementById('positionDetails').innerHTML = `
            <h5>${positionData.title}</h5>
            <p><strong>¿Qué es?</strong> ${positionData.description}</p>
            <p><strong>Condición:</strong> ${positionData.condition}</p>
            <p><strong>Ejemplo:</strong> ${positionData.example}</p>
        `;
        document.getElementById('positionInfo').style.display = 'block';
    }
}

// === CONFIGURAR SIMULADOR ===
function setupSimulator() {
    const line = document.getElementById('movableLine');
    
    line.addEventListener('mousedown', startDrag);
    line.addEventListener('touchstart', startDrag);
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
}

function startDrag(e) {
    isDragging = true;
    e.preventDefault();
}

function drag(e) {
    if (!isDragging) return;
    
    const simulator = document.getElementById('simulator');
    const rect = simulator.getBoundingClientRect();
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const y = ((clientY - rect.top) / rect.height) * 350;
    
    // Limitar el movimiento
    const constrainedY = Math.max(20, Math.min(330, y));
    
    const line = document.getElementById('movableLine');
    line.setAttribute('y1', constrainedY);
    line.setAttribute('y2', constrainedY);
    
    updateSimulatorStatus(constrainedY);
}

function stopDrag() {
    isDragging = false;
}

// === ACTUALIZAR ESTADO DEL SIMULADOR ===
function updateSimulatorStatus(lineY) {
    const distance = Math.abs(lineY - centerY);
    let position, info, color;
    
    // Ocultar puntos por defecto
    document.getElementById('point1').style.display = 'none';
    document.getElementById('point2').style.display = 'none';
    
    if (distance > radius + 5) {
        position = 'Exterior';
        info = `Distancia (${Math.round(distance)}) > Radio (${radius})`;
        color = 'var(--error)';
    } else if (Math.abs(distance - radius) <= 5) {
        position = 'Tangente';
        info = `Distancia (${Math.round(distance)}) ≈ Radio (${radius})`;
        color = 'var(--secondary)';
        
        // Mostrar punto de tangencia
        const point1 = document.getElementById('point1');
        point1.setAttribute('cx', centerX);
        point1.setAttribute('cy', lineY);
        point1.style.display = 'block';
    } else {
        position = 'Secante';
        info = `Distancia (${Math.round(distance)}) < Radio (${radius})`;
        color = 'var(--accent)';
        
        // Calcular y mostrar puntos de intersección
        const dx = Math.sqrt(radius * radius - distance * distance);
        const point1 = document.getElementById('point1');
        const point2 = document.getElementById('point2');
        
        point1.setAttribute('cx', centerX - dx);
        point1.setAttribute('cy', lineY);
        point1.style.display = 'block';
        
        point2.setAttribute('cx', centerX + dx);
        point2.setAttribute('cy', lineY);
        point2.style.display = 'block';
    }
    
    document.getElementById('currentPosition').textContent = position;
    document.getElementById('currentPosition').style.color = color;
    document.getElementById('distanceInfo').textContent = info;
    
    // Actualizar línea de distancia si está visible
    if (showingDistance) {
        const distanceLine = document.getElementById('distanceLine');
        distanceLine.setAttribute('y2', lineY);
        document.getElementById('distanceText').setAttribute('y', (centerY + lineY) / 2);
    }
}

function resetSimulator() {
    const line = document.getElementById('movableLine');
    line.setAttribute('y1', '50');
    line.setAttribute('y2', '50');
    updateSimulatorStatus(50);
}

function toggleDistance() {
    showingDistance = !showingDistance;
    const distanceLine = document.getElementById('distanceLine');
    const distanceText = document.getElementById('distanceText');
    
    if (showingDistance) {
        distanceLine.style.display = 'block';
        distanceText.style.display = 'block';
        const lineY = parseFloat(document.getElementById('movableLine').getAttribute('y1'));
        distanceLine.setAttribute('y2', lineY);
        distanceText.setAttribute('y', (centerY + lineY) / 2);
    } else {
        distanceLine.style.display = 'none';
        distanceText.style.display = 'none';
    }
}

// === EJERCICIOS ===
function checkExercise1() {
    const answer = document.getElementById('exercise1').value;
    const result = document.getElementById('result1');
    
    if (answer === 'secante') {
        result.innerHTML = '<div class="alert alert-success">🎉 ¡Correcto! Si la distancia (4 cm) es menor que el radio (6 cm), la recta es secante</div>';
        exercisesCompleted++;
    } else {
        result.innerHTML = '<div class="alert alert-danger">❌ Compara: distancia = 4 cm, radio = 6 cm. Como 4 < 6, la recta es secante</div>';
    }
}

function checkExercise2() {
    const answer = document.querySelector('input[name="q2"]:checked');
    const result = document.getElementById('result2');
    
    if (answer && answer.value === '1') {
        result.innerHTML = '<div class="alert alert-success">🎉 ¡Perfecto! Una recta tangente toca la circunferencia en exactamente 1 punto</div>';
        exercisesCompleted++;
    } else {
        result.innerHTML = '<div class="alert alert-danger">❌ Recuerda: "tangente" significa que toca en un solo punto</div>';
    }
}

function checkExercise3() {
    const answer = document.getElementById('exercise3').value.toLowerCase().trim();
    const result = document.getElementById('result3');
    
    if (answer.includes('tangente')) {
        result.innerHTML = '<div class="alert alert-success">🎉 ¡Excelente! Si la distancia (5 m) es igual al radio (5 m), la carretera es tangente al túnel</div>';
        exercisesCompleted++;
    } else {
        result.innerHTML = '<div class="alert alert-danger">❌ Cuando la distancia es igual al radio, la posición es tangente</div>';
    }
}

function checkExercise4() {
    const answer = document.getElementById('exercise4').value;
    const result = document.getElementById('result4');
    
    if (answer === 'exterior-tangente-secante') {
        result.innerHTML = '<div class="alert alert-success">🎉 ¡Correcto! Exterior (0 puntos) → Tangente (1 punto) → Secante (2 puntos)</div>';
        exercisesCompleted++;
    } else {
        result.innerHTML = '<div class="alert alert-danger">❌ Piensa en cuántos puntos de contacto tiene cada posición: Exterior=0, Tangente=1, Secante=2</div>';
    }
}

function completeLesson() {
    if (exercisesCompleted >= 3) {
        // Marcar como completado en el sistema principal
        if (window.markTopicCompleted) {
            window.markTopicCompleted('posiciones-rectas.html');
        }
        
        alert('🎉 ¡Increíble! Has dominado las posiciones de rectas y circunferencias. ¡Ahora puedes identificar exterior, tangente y secante en cualquier situación!');
        window.location.href = 'index.html';
    } else {
        alert('💪 ¡Casi lo tienes! Completa al menos 3 ejercicios antes de terminar la lección.');
    }
}