# Design Document

## Overview

La PWA de Matemáticas (Figuras Planas) es una aplicación educativa de página única (SPA) construida completamente en un archivo index.html. Utiliza una arquitectura basada en vistas dinámicas con JavaScript vanilla, Tailwind CSS para estilos, y SVG para elementos interactivos geométricos. La aplicación implementa un service worker para funcionalidad offline y está optimizada para estudiantes de 6º grado de primaria.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────┐
│              index.html                 │
├─────────────────────────────────────────┤
│  HTML Structure                         │
│  ├── App Container                      │
│  ├── Home View (Module Selection)      │
│  └── Module View (Theory/Practice/Eval) │
├─────────────────────────────────────────┤
│  CSS Styles (Tailwind)                 │
│  ├── Responsive Layout                  │
│  ├── Interactive Elements              │
│  └── Animation Classes                 │
├─────────────────────────────────────────┤
│  JavaScript Application                 │
│  ├── Content Data Structure            │
│  ├── Navigation Logic                  │
│  ├── Interactive Modules               │
│  └── Evaluation System                 │
├─────────────────────────────────────────┤
│  Service Worker (Existing)             │
│  └── Offline Functionality             │
└─────────────────────────────────────────┘
```

### View Management System

La aplicación utiliza un sistema de vistas basado en visibilidad CSS:

- **homeView**: Vista principal con selección de módulos
- **moduleView**: Vista de contenido con pestañas (Teoría, Práctica, Evaluación)

```javascript
// Vista switching mechanism
function showView(viewName) {
    document.querySelectorAll('.view').forEach(view => {
        view.style.display = 'none';
    });
    document.getElementById(viewName).style.display = 'block';
}
```

## Components and Interfaces

### Content Data Structure

```javascript
const content = {
    [moduleId]: {
        title: "Module Title",
        teoria: "HTML content for theory",
        practica: "HTML content for practice", 
        evaluacion: function() { return "HTML for evaluation"; }
    }
};
```

### Interactive Module Components

#### 1. Suma de Ángulos Module
- **AngleTriangle Component**: SVG interactivo con vértices arrastrables
- **AngleDisplay Component**: Muestra valores de ángulos en tiempo real
- **ShapeToggle Component**: Alterna entre triángulo y cuadrilátero

```javascript
class AngleTriangle {
    constructor(svgElement) {
        this.svg = svgElement;
        this.vertices = [];
        this.angles = [0, 0, 0];
        this.isDragging = false;
    }
    
    calculateAngles() {
        // Calcula ángulos usando vectores
        // Actualiza display en tiempo real
    }
    
    handleDrag(vertex, newPosition) {
        // Actualiza posición del vértice
        // Recalcula ángulos
        // Redibuja triángulo
    }
}
```

#### 2. Circunferencia Module
- **CircleElements Component**: SVG con elementos etiquetados
- **HoverInteraction Component**: Maneja hover/touch para resaltado

```javascript
class CircleElements {
    constructor(svgElement) {
        this.elements = {
            center: { color: '#ff0000', label: 'Centro' },
            radius: { color: '#00ff00', label: 'Radio' },
            diameter: { color: '#0000ff', label: 'Diámetro' },
            chord: { color: '#ffff00', label: 'Cuerda' },
            arc: { color: '#ff00ff', label: 'Arco' },
            tangent: { color: '#00ffff', label: 'Tangente' }
        };
    }
    
    highlightElement(elementName) {
        // Resalta elemento específico
        // Muestra etiqueta
    }
}
```

#### 3. Número π Module
- **PiAnimation Component**: Animación de círculo desenrollándose
- **CircumferenceCalculator Component**: Calculadora interactiva

```javascript
class PiAnimation {
    constructor(containerElement) {
        this.container = containerElement;
        this.circle = null;
        this.unrolledLine = null;
        this.animationState = 'stopped';
    }
    
    startAnimation() {
        // Anima círculo rodando
        // Desenrolla perímetro
        // Muestra relación π
    }
}

class CircumferenceCalculator {
    constructor(formElement) {
        this.form = formElement;
        this.radiusInput = null;
        this.diameterInput = null;
        this.resultDisplay = null;
    }
    
    calculate(inputType, value) {
        // Calcula L = 2πr o L = πd
        // Actualiza resultado
    }
}
```

#### 4. Círculo y Figuras Module
- **FigureIdentificationGame Component**: Juego de identificación
- **FeedbackSystem Component**: Sistema de retroalimentación

```javascript
class FigureIdentificationGame {
    constructor(gameContainer) {
        this.container = gameContainer;
        this.currentFigure = null;
        this.score = 0;
        this.figures = ['sector', 'segment', 'corona'];
    }
    
    generateQuestion() {
        // Selecciona figura aleatoria
        // Colorea área correspondiente
        // Presenta opciones
    }
    
    checkAnswer(selectedAnswer) {
        // Verifica respuesta
        // Proporciona feedback
        // Actualiza puntuación
    }
}
```

#### 5. Posiciones de Rectas Module
- **LinePositionInteraction Component**: Línea arrastrable
- **PositionDetector Component**: Detecta posición relativa

```javascript
class LinePositionInteraction {
    constructor(svgElement) {
        this.svg = svgElement;
        this.circle = { cx: 200, cy: 200, r: 100 };
        this.line = { x1: 0, y1: 150, x2: 400, y2: 150 };
        this.position = 'exterior';
    }
    
    updateLinePosition(newY) {
        // Actualiza posición de línea
        // Calcula distancia al centro
        // Determina posición relativa
    }
    
    detectPosition() {
        const distance = Math.abs(this.line.y1 - this.circle.cy);
        if (distance > this.circle.r) return 'exterior';
        if (distance === this.circle.r) return 'tangente';
        return 'secante';
    }
}
```

### Evaluation System

```javascript
class EvaluationSystem {
    constructor(moduleId) {
        this.moduleId = moduleId;
        this.questions = [];
        this.currentQuestion = 0;
        this.score = 0;
    }
    
    generateQuestions() {
        // Genera preguntas dinámicas según módulo
        // Usa números aleatorios
        // Crea opciones múltiples
    }
    
    checkAnswer(answer) {
        // Verifica respuesta
        // Actualiza puntuación
        // Proporciona feedback
    }
    
    showResults() {
        // Muestra puntuación final
        // Proporciona retroalimentación
    }
}
```

## Data Models

### Module Content Model
```javascript
const ModuleContent = {
    id: String,           // Identificador único del módulo
    title: String,        // Título del módulo
    teoria: String,       // HTML content para teoría
    practica: String,     // HTML content para práctica
    evaluacion: Function  // Función que retorna HTML de evaluación
};
```

### Question Model
```javascript
const Question = {
    id: String,
    type: String,         // 'multiple-choice', 'calculation', 'identification'
    question: String,     // Texto de la pregunta
    options: Array,       // Opciones para multiple choice
    correctAnswer: String,
    explanation: String,  // Explicación de la respuesta
    difficulty: Number    // 1-3 nivel de dificultad
};
```

### Interactive Element Model
```javascript
const InteractiveElement = {
    id: String,
    type: String,         // 'draggable', 'clickable', 'hoverable'
    position: Object,     // {x, y} coordinates
    properties: Object,   // Propiedades específicas del elemento
    eventHandlers: Object // Event listeners
};
```

## Error Handling

### User Input Validation
```javascript
function validateInput(input, type) {
    switch(type) {
        case 'number':
            if (isNaN(input) || input <= 0) {
                showError('Por favor ingresa un número válido mayor que 0');
                return false;
            }
            break;
        case 'angle':
            if (isNaN(input) || input < 0 || input >= 180) {
                showError('El ángulo debe estar entre 0° y 180°');
                return false;
            }
            break;
    }
    return true;
}
```

### Interactive Element Error Handling
```javascript
function handleInteractionError(element, error) {
    console.warn(`Error en elemento interactivo ${element.id}:`, error);
    
    // Resetear elemento a estado inicial
    resetElement(element);
    
    // Mostrar mensaje amigable al usuario
    showUserMessage('Algo salió mal. Intentemos de nuevo.');
}
```

### Graceful Degradation
- Si SVG no es soportado, mostrar imágenes estáticas
- Si touch events no están disponibles, usar mouse events
- Si animaciones fallan, mostrar contenido estático

## Testing Strategy

### Unit Testing Approach
Aunque no se implementarán tests automatizados, el diseño permite testing manual sistemático:

#### 1. Component Testing
- **Angle Calculation**: Verificar que la suma de ángulos sea correcta
- **Distance Calculation**: Validar cálculos de circunferencia
- **Position Detection**: Confirmar detección correcta de posiciones de recta

#### 2. Interaction Testing
- **Drag Operations**: Verificar que elementos se muevan correctamente
- **Touch Events**: Confirmar funcionalidad en dispositivos móviles
- **Hover Effects**: Validar resaltado de elementos

#### 3. Evaluation Testing
- **Question Generation**: Verificar que preguntas sean válidas
- **Answer Validation**: Confirmar que respuestas correctas sean aceptadas
- **Feedback System**: Validar que feedback sea apropiado

### Manual Testing Checklist

#### Funcionalidad Básica
- [ ] Navegación entre vistas funciona correctamente
- [ ] Todos los módulos cargan sin errores
- [ ] Service worker mantiene funcionalidad offline

#### Módulos Interactivos
- [ ] Suma de Ángulos: Vértices arrastrables, cálculos correctos
- [ ] Circunferencia: Elementos resaltables, etiquetas visibles
- [ ] Número π: Animación fluida, calculadora funcional
- [ ] Figuras Circulares: Juego interactivo, feedback correcto
- [ ] Posiciones de Rectas: Línea arrastrable, detección precisa

#### Evaluaciones
- [ ] Preguntas generadas correctamente
- [ ] Respuestas validadas apropiadamente
- [ ] Feedback proporcionado consistentemente

#### Responsividad
- [ ] Funciona en móviles (320px+)
- [ ] Funciona en tablets (768px+)
- [ ] Funciona en desktop (1024px+)

### Performance Considerations

#### Optimization Strategies
- **Lazy Loading**: Cargar contenido de módulos solo cuando se necesite
- **Event Delegation**: Usar delegación de eventos para elementos dinámicos
- **Debouncing**: Aplicar debounce a eventos de drag para mejor performance
- **Memory Management**: Limpiar event listeners al cambiar de módulo

#### Resource Management
```javascript
// Cleanup function para cambio de módulos
function cleanupModule(moduleId) {
    // Remover event listeners
    // Cancelar animaciones
    // Limpiar timers
    // Resetear variables globales
}
```

## Implementation Notes

### SVG Best Practices
- Usar viewBox para escalabilidad
- Implementar coordenadas relativas
- Optimizar paths para mejor performance
- Incluir fallbacks para navegadores antiguos

### Accessibility Considerations
- Incluir atributos ARIA apropiados
- Proporcionar alternativas de teclado para interacciones
- Usar colores con suficiente contraste
- Incluir descripciones de texto para elementos visuales

### Mobile Optimization
- Usar touch events además de mouse events
- Implementar áreas de toque apropiadas (44px mínimo)
- Optimizar animaciones para dispositivos de menor potencia
- Considerar orientación de pantalla

Esta arquitectura permite una implementación modular y mantenible mientras mantiene toda la funcionalidad en un archivo único, cumpliendo con los requerimientos técnicos específicos del proyecto.