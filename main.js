// === VARIABLES GLOBALES ===
let completedTopics = JSON.parse(localStorage.getItem('completedTopics') || '[]');

// === INICIALIZACIÓN DE LA APLICACIÓN ===
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    setupPWA();
    addFunAnimations();
});

// === CONFIGURACIÓN PWA ===
function setupPWA() {
    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(registration => console.log('SW registrado'))
            .catch(error => console.log('Error SW:', error));
    }
    
    // Detectar modo offline
    window.addEventListener('online', () => {
        document.body.classList.remove('offline');
        showNotification('¡Conexión restaurada!', 'success');
    });
    
    window.addEventListener('offline', () => {
        document.body.classList.add('offline');
        showNotification('Modo offline activado', 'info');
    });
}

// === SISTEMA DE PROGRESO ===
function updateProgress() {
    const totalTopics = 6;
    const completed = completedTopics.length;
    const percentage = Math.round((completed / totalTopics) * 100);
    
    const progressText = document.getElementById('progressText');
    if (progressText) {
        progressText.textContent = percentage + '%';
    }
    
    // Actualizar círculo de progreso
    const progressCircle = document.querySelector('.progress-circle');
    if (progressCircle) {
        const degrees = (percentage / 100) * 360;
        progressCircle.style.background = `conic-gradient(var(--accent) ${degrees}deg, var(--border-color) ${degrees}deg)`;
    }
    
    // Marcar temas completados
    completedTopics.forEach(topic => {
        const card = document.querySelector(`[onclick="goToTopic('${topic}')"]`);
        if (card) {
            card.style.borderColor = 'var(--accent)';
            const icon = card.querySelector('.topic-icon');
            if (icon && !icon.textContent.includes('✅')) {
                icon.textContent += ' ✅';
            }
        }
    });
}

// === NAVEGACIÓN ===
function goToTopic(topicFile) {
    // Agregar efecto de clic
    if (event && event.currentTarget) {
        event.currentTarget.style.transform = 'scale(0.95)';
        setTimeout(() => {
            event.currentTarget.style.transform = '';
            window.location.href = topicFile;
        }, 150);
    } else {
        window.location.href = topicFile;
    }
}

// === MARCAR TEMA COMO COMPLETADO ===
function markTopicCompleted(topicFile) {
    if (!completedTopics.includes(topicFile)) {
        completedTopics.push(topicFile);
        localStorage.setItem('completedTopics', JSON.stringify(completedTopics));
        updateProgress();
    }
}

// === SISTEMA DE NOTIFICACIONES ===
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
    notification.style.zIndex = '9999';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, duration);
}

// === ANIMACIONES ===
function addFunAnimations() {
    // Animación de entrada para las tarjetas
    const cards = document.querySelectorAll('.topic-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Efecto de hover en los iconos
    document.querySelectorAll('.topic-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Animación del círculo de progreso
    const progressCircle = document.querySelector('.progress-circle');
    if (progressCircle) {
        progressCircle.addEventListener('click', function() {
            this.style.animation = 'bounce 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    }
}

// === UTILIDADES GENERALES ===

// Agregar efecto visual a elementos interactivos
function addVisualFeedback(element, type = 'success') {
    element.classList.add(`feedback-${type}`);
    setTimeout(() => {
        element.classList.remove(`feedback-${type}`);
    }, 600);
}

// Resaltar elementos SVG
function highlightSVGElement(element) {
    element.classList.add('element-highlight');
    setTimeout(() => {
        element.classList.remove('element-highlight');
    }, 1000);
}

// Animación de botón presionado
function animateButtonPress(button) {
    button.style.transform = 'scale(0.95)';
    button.style.transition = 'transform 0.1s ease-in-out';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
        setTimeout(() => {
            button.style.transform = '';
            button.style.transition = '';
        }, 100);
    }, 100);
}

// Estado de carga
function showLoadingState(element, text = 'Cargando...') {
    const originalContent = element.innerHTML;
    element.dataset.originalContent = originalContent;
    
    element.innerHTML = `
        <div class="d-flex align-items-center justify-content-center">
            <div class="spinner-border text-primary me-2" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <span>${text}</span>
        </div>
    `;
    element.classList.add('loading');
    
    return () => {
        element.innerHTML = originalContent;
        element.classList.remove('loading');
        delete element.dataset.originalContent;
    };
}

// Barra de progreso animada
function animateProgressBar(container, progress, duration = 1000) {
    let progressBar = container.querySelector('.progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'progress mb-3';
        progressBar.innerHTML = '<div class="progress-bar" style="width: 0%"></div>';
        container.insertBefore(progressBar, container.firstChild);
    }
    
    const progressFill = progressBar.querySelector('.progress-bar');
    
    // Animar al progreso objetivo
    setTimeout(() => {
        progressFill.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }, 50);
    
    // Remover barra de progreso después de la animación
    if (progress >= 100) {
        setTimeout(() => {
            progressBar.style.opacity = '0';
            setTimeout(() => {
                if (progressBar.parentNode) {
                    progressBar.remove();
                }
            }, 300);
        }, duration);
    }
}

// === EXPONER FUNCIONES GLOBALMENTE ===
window.markTopicCompleted = markTopicCompleted;
window.goToTopic = goToTopic;
window.showNotification = showNotification;
window.addVisualFeedback = addVisualFeedback;
window.highlightSVGElement = highlightSVGElement;
window.animateButtonPress = animateButtonPress;
window.showLoadingState = showLoadingState;
window.animateProgressBar = animateProgressBar;