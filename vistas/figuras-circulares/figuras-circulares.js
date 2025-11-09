// === VARIABLES PARA FIGURAS CIRCULARES ===
let gameScore = 0;
let gameTotal = 0;
let currentGameFigure = '';
let exercisesCompleted = 0;

// Figuras del juego
const gameFigures = [
    {
        name: 'sector',
        svg: `
            <circle cx="150" cy="125" r="80" fill="none" stroke="var(--border-color)" stroke-width="1"/>
            <path d="M 150 125 L 150 45 A 80 80 0 0 1 220 175 Z" 
                  fill="color-mix(in srgb, var(--secondary) 40%, transparent)" stroke="var(--secondary)" stroke-width="3"/>
            <circle cx="150" cy="125" r="3" fill="var(--secondary)"/>
        `,
        hint: 'Parece una rebanada de pizza 🍕'
    },
    {
        name: 'segmento',
        svg: `
            <circle cx="150" cy="125" r="80" fill="none" stroke="var(--border-color)" stroke-width="1"/>
            <path d="M 90 90 A 80 80 0 0 1 210 90 Z" 
                  fill="color-mix(in srgb, var(--primary) 40%, transparent)" stroke="var(--primary)" stroke-width="3"/>
            <line x1="90" y1="90" x2="210" y2="90" stroke="var(--primary)" stroke-width="3"/>
        `,
        hint: 'Es la parte que queda al cortar con una línea recta 🌙'
    },
    {
        name: 'corona',
        svg: `
            <circle cx="150" cy="125" r="80" fill="color-mix(in srgb, var(--accent) 40%, transparent)" stroke="var(--accent)" stroke-width="3"/>
            <circle cx="150" cy="125" r="45" fill="var(--surface)" stroke="var(--accent)" stroke-width="3"/>
            <circle cx="150" cy="125" r="3" fill="var(--accent)"/>
        `,
        hint: 'Parece una dona o un anillo 💍'
    },
    {
        name: 'circulo',
        svg: `
            <circle cx="150" cy="125" r="80" fill="color-mix(in srgb, var(--purple) 40%, transparent)" stroke="var(--purple)" stroke-width="3"/>
            <circle cx="150" cy="125" r="3" fill="var(--purple)"/>
        `,
        hint: 'Es un círculo completo 🔴'
    }
];

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', function() {
    initializeFigurasCircularesModule();
});

function initializeFigurasCircularesModule() {
    // Animaciones de entrada
    const elements = document.querySelectorAll('.concept-box, .interactive-area, .exercise-card, .game-area');
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

// === MOSTRAR INFORMACIÓN DE FIGURAS ===
function showFigureInfo(figureType) {
    const info = {
        sector: {
            title: '🍕 Sector Circular',
            description: 'Es una porción del círculo limitada por dos radios y un arco. ¡Como una rebanada de pizza! Se forma desde el centro hacia afuera.',
            examples: 'Ejemplos: rebanadas de pizza, porciones de pastel, gráficos de torta.'
        },
        segmento: {
            title: '🌙 Segmento Circular',
            description: 'Es la parte del círculo que queda entre una cuerda y el arco correspondiente. ¡Como si cortaras un trozo con una línea recta!',
            examples: 'Ejemplos: la parte superior de una ventana arqueada, un trozo cortado de una galleta redonda.'
        },
        corona: {
            title: '💍 Corona Circular',
            description: 'Es la región entre dos círculos concéntricos (que tienen el mismo centro). ¡Como una dona o un anillo!',
            examples: 'Ejemplos: donas, anillos, CDs, arandelas, marcos circulares.'
        }
    };
    
    const figureData = info[figureType];
    if (figureData) {
        document.getElementById('figureDetails').innerHTML = `
            <h5>${figureData.title}</h5>
            <p>${figureData.description}</p>
            <p><strong>${figureData.examples}</strong></p>
        `;
        document.getElementById('figureInfo').style.display = 'block';
    }
}

// === NUEVO ROUND DEL JUEGO ===
function newGameRound() {
    const randomFigure = gameFigures[Math.floor(Math.random() * gameFigures.length)];
    currentGameFigure = randomFigure.name;
    
    // Mostrar figura en el canvas
    document.getElementById('gameCanvas').innerHTML = randomFigure.svg;
    
    // Mostrar pregunta
    document.getElementById('gameQuestion').innerHTML = `
        <h5>🎯 ¿Qué figura es?</h5>
        <p>${randomFigure.hint}</p>
    `;
    
    document.getElementById('gameOptions').style.display = 'block';
}

// === VERIFICAR RESPUESTA DEL JUEGO ===
function guessAnswer(answer) {
    gameTotal++;
    const isCorrect = answer === currentGameFigure;
    
    if (isCorrect) {
        gameScore++;
        document.getElementById('gameQuestion').innerHTML = `
            <div class="alert alert-success">🎉 ¡Correcto! Es un ${getFigureName(answer)}</div>
        `;
    } else {
        document.getElementById('gameQuestion').innerHTML = `
            <div class="alert alert-danger">❌ Incorrecto. Era un ${getFigureName(currentGameFigure)}</div>
        `;
    }
    
    // Actualizar puntuación
    document.getElementById('gameScore').textContent = gameScore;
    document.getElementById('gameTotal').textContent = gameTotal;
    
    const percentage = gameTotal > 0 ? (gameScore / gameTotal) * 100 : 0;
    document.getElementById('gameProgress').style.width = percentage + '%';
    
    document.getElementById('gameOptions').style.display = 'none';
    
    // Nueva figura después de 2 segundos
    setTimeout(() => {
        newGameRound();
    }, 2000);
}

function getFigureName(figureType) {
    const names = {
        'sector': 'sector circular',
        'segmento': 'segmento circular',
        'corona': 'corona circular',
        'circulo': 'círculo completo'
    };
    return names[figureType] || figureType;
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
        feedback.push('✅ Pregunta 1: Correcto, un sector SÍ es como una rebanada de pizza');
    } else {
        feedback.push('❌ Pregunta 1: Un sector circular SÍ es como una rebanada de pizza');
    }
    
    if (q2 && q2.value === 'true') {
        correct++;
        feedback.push('✅ Pregunta 2: Correcto, una corona SÍ tiene un agujero en el centro');
    } else {
        feedback.push('❌ Pregunta 2: Una corona circular SÍ tiene un agujero en el centro');
    }
    
    if (correct === 2) {
        exercisesCompleted++;
        result.innerHTML = `<div class="alert alert-success">${feedback.join('<br>')}</div>`;
    } else {
        result.innerHTML = `<div class="alert alert-warning">${feedback.join('<br>')}</div>`;
    }
}

function checkMatching() {
    const match1 = document.getElementById('match1').value;
    const match2 = document.getElementById('match2').value;
    const result = document.getElementById('resultMatch');
    
    let correct = 0;
    let feedback = [];
    
    if (match1 === 'corona') {
        correct++;
        feedback.push('✅ Pregunta 1: Correcto, la corona circular parece una dona');
    } else {
        feedback.push('❌ Pregunta 1: La corona circular es la que parece una dona');
    }
    
    if (match2 === 'segmento') {
        correct++;
        feedback.push('✅ Pregunta 2: Correcto, el segmento se forma al cortar con una cuerda');
    } else {
        feedback.push('❌ Pregunta 2: El segmento circular se forma al cortar con una cuerda');
    }
    
    if (correct === 2) {
        exercisesCompleted++;
        result.innerHTML = `<div class="alert alert-success">${feedback.join('<br>')}</div>`;
    } else {
        result.innerHTML = `<div class="alert alert-warning">${feedback.join('<br>')}</div>`;
    }
}

function checkPractical() {
    const answer = document.getElementById('practical').value;
    const result = document.getElementById('resultPractical');
    
    if (answer === 'sector') {
        exercisesCompleted++;
        result.innerHTML = '<div class="alert alert-success">🎉 ¡Perfecto! Cada parte es un sector circular, como las rebanadas de pizza</div>';
    } else {
        result.innerHTML = '<div class="alert alert-danger">❌ Cuando cortas un círculo desde el centro, cada parte es un sector circular</div>';
    }
}

function completeLesson() {
    if (exercisesCompleted >= 2 || gameScore >= 3) {
        // Marcar como completado en el sistema principal
        if (window.markTopicCompleted) {
            window.markTopicCompleted('figuras-circulares.html');
        }
        
        alert('🎉 ¡Fantástico! Has dominado las figuras circulares. ¡Ahora puedes reconocer sectores, segmentos y coronas en todas partes!');
        window.location.href = 'index.html';
    } else {
        alert('💪 ¡Casi lo tienes! Completa al menos 2 ejercicios o consigue 3 puntos en el juego antes de terminar.');
    }
}