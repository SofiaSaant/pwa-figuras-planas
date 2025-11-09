// === SERVICE: Storage ===
// Maneja la persistencia de datos en localStorage
// SOLID: Single Responsibility - Solo maneja almacenamiento
// SOLID: Open/Closed - Fácil extender para usar IndexedDB u otro storage

class StorageService {
    constructor(storageKey = 'matematicas-app') {
        this.storageKey = storageKey;
    }

    /**
     * Guarda datos en localStorage
     * @param {string} key - Clave del dato
     * @param {*} data - Datos a guardar
     * @returns {boolean} - true si se guardó correctamente
     */
    save(key, data) {
        try {
            const fullKey = `${this.storageKey}-${key}`;
            const serialized = JSON.stringify(data);
            localStorage.setItem(fullKey, serialized);
            return true;
        } catch (error) {
            console.error('Error guardando en localStorage:', error);
            return false;
        }
    }

    /**
     * Carga datos desde localStorage
     * @param {string} key - Clave del dato
     * @param {*} defaultValue - Valor por defecto si no existe
     * @returns {*} - Datos cargados o valor por defecto
     */
    load(key, defaultValue = null) {
        try {
            const fullKey = `${this.storageKey}-${key}`;
            const serialized = localStorage.getItem(fullKey);
            
            if (serialized === null) {
                return defaultValue;
            }
            
            return JSON.parse(serialized);
        } catch (error) {
            console.error('Error cargando desde localStorage:', error);
            return defaultValue;
        }
    }

    /**
     * Elimina un dato de localStorage
     * @param {string} key - Clave del dato
     * @returns {boolean}
     */
    remove(key) {
        try {
            const fullKey = `${this.storageKey}-${key}`;
            localStorage.removeItem(fullKey);
            return true;
        } catch (error) {
            console.error('Error eliminando de localStorage:', error);
            return false;
        }
    }

    /**
     * Limpia todos los datos de la app
     * @returns {boolean}
     */
    clear() {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.storageKey)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (error) {
            console.error('Error limpiando localStorage:', error);
            return false;
        }
    }

    /**
     * Verifica si existe un dato
     * @param {string} key
     * @returns {boolean}
     */
    exists(key) {
        const fullKey = `${this.storageKey}-${key}`;
        return localStorage.getItem(fullKey) !== null;
    }

    /**
     * Obtiene el tamaño aproximado del storage usado (en KB)
     * @returns {number}
     */
    getStorageSize() {
        let total = 0;
        const keys = Object.keys(localStorage);
        
        keys.forEach(key => {
            if (key.startsWith(this.storageKey)) {
                total += localStorage.getItem(key).length;
            }
        });
        
        return Math.round(total / 1024 * 100) / 100; // KB con 2 decimales
    }
}
