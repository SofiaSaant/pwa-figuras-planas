// === SERVICE: Notification ===
// Maneja notificaciones y mensajes al usuario
// SOLID: Single Responsibility - Solo maneja notificaciones
// SOLID: Dependency Inversion - No depende de implementación específica de UI

class NotificationService {
    constructor() {
        this.container = null;
        this.defaultDuration = 3000;
    }

    /**
     * Inicializa el servicio de notificaciones
     */
    init() {
        // Crear contenedor si no existe
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'notification-container';
            this.container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                max-width: 400px;
            `;
            document.body.appendChild(this.container);
        }
    }

    /**
     * Muestra una notificación
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo: 'success', 'error', 'warning', 'info'
     * @param {number} duration - Duración en ms (0 = no auto-cerrar)
     */
    show(message, type = 'info', duration = null) {
        this.init();
        
        const notification = this.createNotification(message, type);
        this.container.appendChild(notification);
        
        // Animación de entrada
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto-cerrar si tiene duración
        const finalDuration = duration !== null ? duration : this.defaultDuration;
        if (finalDuration > 0) {
            setTimeout(() => {
                this.close(notification);
            }, finalDuration);
        }
        
        return notification;
    }

    /**
     * Crea el elemento de notificación
     * @private
     */
    createNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show mb-2`;
        notification.style.cssText = `
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;
        
        const icon = this.getIcon(type);
        
        notification.innerHTML = `
            <span>${icon} ${message}</span>
            <button type="button" class="btn-close" aria-label="Close"></button>
        `;
        
        // Evento de cerrar
        const closeBtn = notification.querySelector('.btn-close');
        closeBtn.addEventListener('click', () => this.close(notification));
        
        return notification;
    }

    /**
     * Cierra una notificación
     * @private
     */
    close(notification) {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    /**
     * Obtiene el icono según el tipo
     * @private
     */
    getIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    /**
     * Métodos de conveniencia
     */
    success(message, duration = null) {
        return this.show(message, 'success', duration);
    }

    error(message, duration = null) {
        return this.show(message, 'danger', duration);
    }

    warning(message, duration = null) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration = null) {
        return this.show(message, 'info', duration);
    }

    /**
     * Limpia todas las notificaciones
     */
    clearAll() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}
