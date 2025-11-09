// === SERVICE: Animation ===
// Maneja animaciones y efectos visuales
// SOLID: Single Responsibility - Solo maneja animaciones
// SOLID: Open/Closed - Fácil agregar nuevas animaciones

class AnimationService {
    /**
     * Anima la entrada de elementos con fade y slide
     * @param {NodeList|Array} elements - Elementos a animar
     * @param {number} delay - Delay entre elementos (ms)
     */
    fadeInElements(elements, delay = 200) {
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * delay);
        });
    }

    /**
     * Efecto de bounce en un elemento
     * @param {HTMLElement} element
     */
    bounce(element) {
        element.style.animation = 'bounce 0.6s ease';
        
        setTimeout(() => {
            element.style.animation = '';
        }, 600);
    }

    /**
     * Efecto de shake (sacudir) para errores
     * @param {HTMLElement} element
     */
    shake(element) {
        element.style.animation = 'shake 0.5s ease';
        
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }

    /**
     * Efecto de pulso
     * @param {HTMLElement} element
     * @param {number} duration - Duración en ms
     */
    pulse(element, duration = 1000) {
        element.style.animation = `pulse ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }

    /**
     * Anima un botón al ser presionado
     * @param {HTMLElement} button
     */
    buttonPress(button) {
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

    /**
     * Resalta un elemento temporalmente
     * @param {HTMLElement} element
     * @param {string} color - Color del resaltado
     * @param {number} duration - Duración en ms
     */
    highlight(element, color = '#FFD54F', duration = 1000) {
        const originalBg = element.style.backgroundColor;
        const originalTransition = element.style.transition;
        
        element.style.transition = 'background-color 0.3s ease';
        element.style.backgroundColor = color;
        
        setTimeout(() => {
            element.style.backgroundColor = originalBg;
            setTimeout(() => {
                element.style.transition = originalTransition;
            }, 300);
        }, duration);
    }

    /**
     * Anima una barra de progreso
     * @param {HTMLElement} progressBar - Elemento .progress-bar
     * @param {number} targetPercent - Porcentaje objetivo (0-100)
     * @param {number} duration - Duración de la animación en ms
     */
    animateProgress(progressBar, targetPercent, duration = 1000) {
        const start = parseFloat(progressBar.style.width) || 0;
        const end = Math.min(100, Math.max(0, targetPercent));
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * eased;
            
            progressBar.style.width = `${current}%`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    /**
     * Anima un círculo de progreso (conic-gradient)
     * @param {HTMLElement} element
     * @param {number} targetPercent - Porcentaje objetivo (0-100)
     * @param {string} color - Color del progreso
     * @param {number} duration - Duración en ms
     */
    animateCircularProgress(element, targetPercent, color = 'var(--accent)', duration = 1000) {
        const start = 0;
        const end = Math.min(100, Math.max(0, targetPercent));
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * eased;
            const degrees = (current / 100) * 360;
            
            element.style.background = `conic-gradient(${color} ${degrees}deg, var(--border-color) ${degrees}deg)`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    /**
     * Efecto de confetti para celebraciones
     * @param {HTMLElement} container - Contenedor donde mostrar el confetti
     */
    confetti(container = document.body) {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background-color: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                opacity: 1;
                transform: rotate(${Math.random() * 360}deg);
                pointer-events: none;
                z-index: 10000;
            `;
            
            container.appendChild(confetti);
            
            // Animar caída
            const duration = 2000 + Math.random() * 1000;
            const endY = window.innerHeight + 10;
            const endX = (Math.random() - 0.5) * 200;
            
            confetti.animate([
                { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
                { transform: `translate(${endX}px, ${endY}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            // Eliminar después de la animación
            setTimeout(() => {
                confetti.remove();
            }, duration);
        }
    }
}
