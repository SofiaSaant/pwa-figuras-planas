// === MODULE: Base y Altura ===
// Módulo específico para el tema de Base y Altura
// SOLID: Hereda de BaseTopicModule (Open/Closed, Liskov Substitution)

class BaseAlturaModule extends BaseTopicModule {
    constructor() {
        super(
            'base-altura',
            'Base y Altura',
            'vistas/base-altura/base-altura.html',
            '📐'
        );
    }

    /**
     * Configura los ejercicios específicos de este tema
     * @override
     */
    setupExercises() {
        // Ejercicio 1: Identificar base y altura
        this.addExercise(
            'ex1-base',
            '¿Cuál es la medida de la base del triángulo?',
            12,
            'numeric'
        );

        this.addExercise(
            'ex1-altura',
            '¿Cuál es la medida de la altura del triángulo?',
            8,
            'numeric'
        );

        // Ejercicio 2: Calcular área de rectángulo
        this.addExercise(
            'ex2',
            'Calcula el área del rectángulo (Base × Altura)',
            24,
            'numeric'
        );

        // Ejercicio 3: Problema de la vida real
        this.addExercise(
            'ex3',
            'Calcula el área de la pared que María debe pintar',
            7.5,
            'numeric'
        );
    }

    /**
     * Configura UI específica de este módulo
     * @override
     */
    setupUI() {
        super.setupUI(); // Llamar al método padre

        // Configurar botones de triángulos
        this.setupTriangleButtons();

        // Configurar botones de paralelogramos
        this.setupParallelogramButtons();

        // Configurar botones de ejercicios
        this.setupExerciseButtons();
    }

    /**
     * Configura los botones de triángulos interactivos
     */
    setupTriangleButtons() {
        const btnRectangulo = document.getElementById('btnTrianguloRectangulo');
        const btnIsosceles = document.getElementById('btnTrianguloIsosceles');

        if (btnRectangulo) {
            btnRectangulo.addEventListener('click', () => {
                this.showTriangleInfo('rectangulo');
                this.animationService.buttonPress(btnRectangulo);
            });
        }

        if (btnIsosceles) {
            btnIsosceles.addEventListener('click', () => {
                this.showTriangleInfo('isosceles');
                this.animationService.buttonPress(btnIsosceles);
            });
        }
    }

    /**
     * Configura los botones de paralelogramos interactivos
     */
    setupParallelogramButtons() {
        const buttons = [
            { id: 'btnRectangulo', type: 'rectangulo' },
            { id: 'btnCuadrado', type: 'cuadrado' },
            { id: 'btnRombo', type: 'rombo' }
        ];

        buttons.forEach(({ id, type }) => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', () => {
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
        const btnEx1 = document.getElementById('checkExercise1');
        if (btnEx1) {
            btnEx1.addEventListener('click', () => this.checkExercise1());
        }

        // Ejercicio 2
        const btnEx2 = document.getElementById('checkExercise2');
        if (btnEx2) {
            btnEx2.addEventListener('click', () => this.checkExercise2());
        }

        // Ejercicio 3
        const btnEx3 = document.getElementById('checkExercise3');
        if (btnEx3) {
            btnEx3.addEventListener('click', () => this.checkExercise3());
        }
    }

    /**
     * Muestra información de triángulos
     */
    showTriangleInfo(type) {
        this.hideAllMeasurements();

        const details = document.getElementById('triangleDetails');
        const info = document.getElementById('triangleInfo');

        if (type === 'rectangulo') {
            this.showElements(['base1', 'baseLabel1', 'height1', 'heightLabel1']);
            if (details) {
                details.innerHTML = `
                    <h5>🔺 Triángulo Rectángulo</h5>
                    <p><span style="color: var(--error);">Base (roja):</span> 15 cm</p>
                    <p><span style="color: var(--primary);">Altura (azul):</span> 10 cm</p>
                    <p><strong>Área = Base × Altura ÷ 2 = 15 × 10 ÷ 2 = 75 cm²</strong></p>
                `;
            }
        } else if (type === 'isosceles') {
            this.showElements(['base2', 'baseLabel2', 'height2', 'heightLabel2']);
            if (details) {
                details.innerHTML = `
                    <h5>🔺 Triángulo Isósceles</h5>
                    <p><span style="color: var(--error);">Base (roja):</span> 14 cm</p>
                    <p><span style="color: var(--primary);">Altura (azul):</span> 12 cm</p>
                    <p><strong>Área = Base × Altura ÷ 2 = 14 × 12 ÷ 2 = 84 cm²</strong></p>
                `;
            }
        }

        if (info) {
            info.style.display = 'block';
            this.animationService.fadeInElements([info], 0);
        }
    }

    /**
     * Muestra información de paralelogramos
     */
    showParallelogramInfo(type) {
        this.hideAllMeasurements();

        const details = document.getElementById('parallelogramDetails');
        const info = document.getElementById('parallelogramInfo');

        const infoMap = {
            rectangulo: {
                elements: ['rectBase1', 'rectBaseLabel1', 'rectHeight1', 'rectHeightLabel1'],
                html: `
                    <h5>🔷 Rectángulo</h5>
                    <p><span style="color: var(--error);">Base (roja):</span> 15 cm</p>
                    <p><span style="color: var(--primary);">Altura (azul):</span> 8 cm</p>
                    <p><strong>Área = Base × Altura = 15 × 8 = 120 cm²</strong></p>
                `
            },
            cuadrado: {
                elements: ['squareBase1', 'squareBaseLabel1', 'squareHeight1', 'squareHeightLabel1'],
                html: `
                    <h5>🔷 Cuadrado</h5>
                    <p><span style="color: var(--error);">Base (roja):</span> 10 cm</p>
                    <p><span style="color: var(--primary);">Altura (azul):</span> 10 cm</p>
                    <p><strong>Área = Base × Altura = 10 × 10 = 100 cm²</strong></p>
                `
            },
            rombo: {
                elements: ['rhombusBase1', 'rhombusBaseLabel1', 'rhombusHeight1', 'rhombusHeightLabel1'],
                html: `
                    <h5>🔷 Rombo</h5>
                    <p><span style="color: var(--error);">Base (roja):</span> 15 cm</p>
                    <p><span style="color: var(--primary);">Altura (azul):</span> 11 cm</p>
                    <p><strong>Área = Base × Altura = 15 × 11 = 165 cm²</strong></p>
                `
            }
        };

        const typeInfo = infoMap[type];
        if (typeInfo) {
            this.showElements(typeInfo.elements);
            if (details) {
                details.innerHTML = typeInfo.html;
            }
        }

        if (info) {
            info.style.display = 'block';
            this.animationService.fadeInElements([info], 0);
        }
    }

    /**
     * Oculta todas las mediciones
     */
    hideAllMeasurements() {
        const elements = [
            'base1', 'baseLabel1', 'height1', 'heightLabel1',
            'base2', 'baseLabel2', 'height2', 'heightLabel2',
            'rectBase1', 'rectBaseLabel1', 'rectHeight1', 'rectHeightLabel1',
            'squareBase1', 'squareBaseLabel1', 'squareHeight1', 'squareHeightLabel1',
            'rhombusBase1', 'rhombusBaseLabel1', 'rhombusHeight1', 'rhombusHeightLabel1'
        ];

        elements.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.style.display = 'none';
        });
    }

    /**
     * Muestra elementos por ID
     */
    showElements(elementIds) {
        elementIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.style.display = 'block';
        });
    }

    /**
     * Verifica ejercicio 1
     */
    checkExercise1() {
        const base = document.getElementById('exercise1Base')?.value;
        const height = document.getElementById('exercise1Height')?.value;
        const result = document.getElementById('result1');

        if (!base || !height) {
            this.notificationService.warning('Completa ambos campos');
            return;
        }

        // Verificar ambas respuestas
        const baseCorrect = parseFloat(base) === 12;
        const heightCorrect = parseFloat(height) === 8;

        if (baseCorrect && heightCorrect) {
            this.exerciseController.checkAnswer('ex1-base', base, result);
            this.exerciseController.checkAnswer('ex1-altura', height, result);

            if (result) {
                result.innerHTML = '<div class="alert alert-success">🎉 ¡Correcto! Base = 12 cm, Altura = 8 cm</div>';
                this.animationService.bounce(result);
            }
        } else {
            if (result) {
                result.innerHTML = '<div class="alert alert-danger">❌ Revisa las medidas. La línea roja es la base y la línea azul punteada es la altura.</div>';
                this.animationService.shake(result);
            }
        }
    }

    /**
     * Verifica ejercicio 2
     */
    checkExercise2() {
        this.checkExercise('ex2', 'exercise2Area', 'result2');
    }

    /**
     * Verifica ejercicio 3
     */
    checkExercise3() {
        this.checkExercise('ex3', 'exercise3Area', 'result3');
    }
}

// === INICIALIZACIÓN ===
// Crear instancia y inicializar cuando el DOM esté listo
let baseAlturaModule;

document.addEventListener('DOMContentLoaded', function () {
    baseAlturaModule = new BaseAlturaModule();
    baseAlturaModule.init();
});
