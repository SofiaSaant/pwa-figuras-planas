// === VARIABLES PARA CIRCUNFERENCIA ===
let gameScore = 0;
let gameTotal = 0;
let currentGameElement = '';
let exercisesCompleted = 0;

// Información de elementos
const elementInfo = {
    centro: {
        title: '🎯 Centro (O)',
        description: 'Es el punto central de la circunferencia. Todos los puntos de la circunferencia están a la misma distancia del centro.',
        color: 'var(--text-main)'
    },
    radio: {
        title: '📏 Radio (r)',
        description: 'Es la distancia desde el centro hasta cualquier punto de la circunferencia. Todos los radios miden lo mismo.',
        color: 'var(--accent)'
    },
    diametro: {
        title: '↔️ Diámetro (d)',
        description: 'Es la cuerda más larga. Pasa por el centro y mide el doble del radio (d = 2r).',
        color: 'var(--primary)'
    },
    cuerda: {
        title: '📐 Cuerda',
        description: 'Es un segmento que une dos puntos cualesquiera de la circunferencia. El diámetro es la cuerda más larga.',
        color: 'var(--secondary)'
    },
    arco: {
        title: '🌙 Arco',
        description: 'Es una parte de la circunferencia comprendida entre dos puntos. ¡Como un trozo de la línea curva!',
        color: 'var(--purple)'
    },
    tangente: {
        title: '📍 Tangente',
        description: 'Es una recta que toca la circunferencia en un solo punto. ¡Como si la rozara suavemente!',
        color: 'var(--orange)'
    },
    secante: {
        title: '✂️ Secante',
        description: 'Es una recta que corta la circunferencia en dos puntos. ¡La atraviesa completamente!',
        color: 'var(--turquoise)'
    }
};

// Elementos del juego
const gameElements = [
    {
        name: 'radio',
        svg: '<line x1="150" y1="125" x2="230" y2="125" stroke="var(--accent)" stroke-width="4"/><circle cx="230" cy="125" r="4" fill="var(--accent)"/>',
        options: ['Radio', 'Diámetro', 'Cuerda', 'Centro']
    },
    {
        name: 'diametro',
        svg: '<line x1="70" y1="125" x2="230" y2="125" stroke="var(--primary)" stroke-width="4" stroke-dasharray="6,3"/><circle cx="70" cy="125" r="4" fill="var(--primary)"/><circle cx="230" cy="125" r="4" fill="var(--primary)"/>',
        options: ['Diámetro', 'Radio', 'Tangente', 'Arco']
    },
    {
        name: 'cuerda',
        svg: '<line x1="100" y1="80" x2="200" y2="170" stroke="var(--secondary)" stroke-width="4"/><circle cx="100" cy="80" r="4" fill="var(--secondary)"/><circle cx="200" cy="170" r="4" fill="var(--secondary)"/>',
        options: ['Cuerda', 'Diámetro', 'Tangente', 'Secante']
    },
    {
        name: 'tangente',
        svg: '<line x1="200" y1="60" x2="250" y2="160" stroke="var(--orange)" stroke-width="4"/><circle cx="225" cy="110" r="4" fill="var(--orange)"/>',
        options: ['Tangente', 'Secante', 'Cuerda', 'Radio']
    }
];

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', function() {
    initializeCircunferenciaModule();
});

function initializeCircunferenciaModule() {
    setupElementClicks();
    
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

// === CONFIGURAR CLICS EN ELEMENTOS ===
function setupElementClicks() {
    document.querySelectorAll('.clickable-element').forEach(element => {
        element.addEventListener('click', function() {
            const elementType = this.dataset.element;
            showElementInfo(elementType);
            highlightElement(this);
        });
    });
}

// === MOSTRAR INFORMACIÓN DEL ELEMENTO ===
function showElementInfo(elementType) {
    const info = elementInfo[elementType];
    if (info) {
        document.getElementById('elementInfo').innerHTML = `
            <h5 style="color: ${info.color}">${info.title}</h5>
            <p>${info.description}</p>
        `;
    }
}

// === RESALTAR ELEMENTO ===
function highlightElement(element) {
    // Quitar resaltado anterior
    document.querySelectorAll('.element-highlight').forEach(el => {
        el.classList.remove('element-highlight');
    });
    
    // Agregar resaltado al elemento actual
    element.classList.add('element-highlight');
    
    // Quitar resaltado después de 2 segundos
    setTimeout(() => {
        element.classList.remove('element-highlight');
    }, 2000);
}

// === MOSTRAR TODOS LOS ELEMENTOS ===
function showAllElements() {
    document.getElementById('elementInfo').innerHTML = `
        <h5>🌟 Todos los elementos</h5>
        <p><span style="color: var(--text-main);">●</span> Centro | 
        <span style="color: var(--accent);">●</span> Radio | 
        <span style="color: var(--primary);">●</span> Diámetro | 
        <span style="color: var(--secondary);">●</span> Cuerda</p>
        <p><span style="color: var(--purple);">●</span> Arco | 
        <span style="color: var(--orange);">●</span> Tangente | 
        <span style="color: var(--turquoise);">●</span> Secante</p>
    `;
}

// === OCULTAR ELEMENTOS ===
function hideAllElements() {
    document.getElementById('elementInfo').innerHTML = `
        <h5>👁️ Elementos ocultos</h5>
        <p>Haz clic en cualquier elemento coloreado para ver su información.</p>
    `;
}

// === JUEGO: NUEVA PREGUNTA ===
function newGameQuestion() {
    const randomElement = gameElements[Math.floor(Math.random() * gameElements.length)];
    currentGameElement = randomElement.name;
    
    // Mostrar elemento en el SVG
    document.getElementById('gameElement').innerHTML = randomElement.svg;
    
    // Mostrar pregunta y opciones
    document.getElementById('gameQuestion').innerHTML = `
        <h5>🎯 ¿Qué elemento es?</h5>
        <p>Observa el elemento resaltado en la circunferencia</p>
    `;
    
    const optionsHtml = randomElement.options.map(option => 
        `<button class="btn btn-outline-primary" onclick="checkGameAnswer('${option.toLowerCase()}')">${option}</button>`
    ).join('');
    
    document.getElementById('gameOptions').innerHTML = optionsHtml;
    document.getElementById('gameOptions').style.display = 'block';
}

// === VERIFICAR RESPUESTA DEL JUEGO ===
function checkGameAnswer(answer) {
    gameTotal++;
    const isCorrect = answer === currentGameElement;
    
    if (isCorrect) {
        gameScore++;
        document.getElementById('gameQuestion').innerHTML = `
            <div class="alert alert-success">🎉 ¡Correcto! Es un ${answer}</div>
        `;
    } else {
        document.getElementById('gameQuestion').innerHTML = `
            <div class="alert alert-danger">❌ Incorrecto. Era un ${currentGameElement}</div>
        `;
    }
    
    document.getElementById('score').textContent = gameScore;
    document.getElementById('total').textContent = gameTotal;
    document.getElementById('gameOptions').style.display = 'none';
    
    setTimeout(() => {
        newGameQuestion();
    }, 2000);
}

// === EJERCICIOS ===
function checkTrueFalse() {
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const result = document.getElementById('resultTF');
    
    let correct = 0;
    let feedback = [];
    
    if (q1 && q1.value === 'true') {
        correct++;
        feedback.push('✅ Pregunta 1: Correcto');
    } else {
        feedback.push('❌ Pregunta 1: El radio SÍ es la mitad del diámetro');
    }
    
    if (q2 && q2.value === 'false') {
        correct++;
        feedback.push('✅ Pregunta 2: Correcto');
    } else {
        feedback.push('❌ Pregunta 2: Una cuerda NO siempre pasa por el centro (solo el diámetro)');
    }
    
    if (correct === 2) {
        exercisesCompleted++;
        result.innerHTML = `<div class="alert alert-success">${feedback.join('<br>')}</div>`;
    } else {
        result.innerHTML = `<div class="alert alert-warning">${feedback.join('<br>')}</div>`;
    }
}

function checkComplete() {
    const answers = [
        document.getElementById('complete1').value.toLowerCase().trim(),
        document.getElementById('complete2').value.toLowerCase().trim(),
        document.getElementById('complete3').value.toLowerCase().trim()
    ];
    
    const correct = ['centro', 'diámetro', 'tangente'];
    const result = document.getElementById('resultComplete');
    
    let score = 0;
    let feedback = [];
    
    answers.forEach((answer, index) => {
        if (answer === correct[index]) {
            score++;
            feedback.push(`✅ ${index + 1}. Correcto: ${correct[index]}`);
        } else {
            feedback.push(`❌ ${index + 1}. Respuesta correcta: ${correct[index]}`);
        }
    });
    
    if (score === 3) {
        exercisesCompleted++;
        result.innerHTML = `<div class="alert alert-success">🎉 ¡Perfecto! ${feedback.join('<br>')}</div>`;
    } else {
        result.innerHTML = `<div class="alert alert-warning">${feedback.join('<br>')}</div>`;
    }
}

function checkPractical() {
    const answer = parseFloat(document.getElementById('practical').value);
    const result = document.getElementById('resultPractical');
    
    if (answer === 6) {
        exercisesCompleted++;
        result.innerHTML = '<div class="alert alert-success">🎉 ¡Excelente! Si el radio es 3 metros, el diámetro es 6 metros (d = 2 × r = 2 × 3 = 6)</div>';
    } else {
        result.innerHTML = '<div class="alert alert-danger">❌ Recuerda: diámetro = 2 × radio. Si r = 3m, entonces d = 2 × 3 = 6m</div>';
    }
}

function completeLesson() {
    if (exercisesCompleted >= 2) {
        // Marcar como completado en el sistema principal
        if (window.markTopicCompleted) {
            window.markTopicCompleted('circunferencia.html');
        }
        
        alert('🎉 ¡Fantástico! Has dominado todos los elementos de la circunferencia. ¡Eres un genio de la geometría!');
        window.location.href = 'index.html';
    } else {
        alert('💪 ¡Casi lo tienes! Completa al menos 2 ejercicios antes de terminar la lección.');
    }
}