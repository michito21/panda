/* =========================================
   CARRUSEL.JS - Lógica de deslizamiento
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    const track = document.querySelector('.carrusel-track');
    // Si no hay carrusel en esta página, no hacemos nada (evita errores)
    if (!track) return; 

    const slides = Array.from(track.children);
    const btnNext = document.querySelector('.next');
    const btnPrev = document.querySelector('.prev');
    let currentIndex = 0;

    // Función para mover el carrusel a una diapositiva específica
    const moverCarrusel = (index) => {
        // Calculamos cuánto mover: index * 100%
        // Ej: index 1 mueve -100%, index 2 mueve -200%
        const amountToMove = '-' + (index * 100) + '%';
        track.style.transform = 'translateX(' + amountToMove + ')';
        currentIndex = index;
    };

    // Botón Siguiente
    btnNext.addEventListener('click', () => {
        if (currentIndex === slides.length - 1) {
            moverCarrusel(0); // Volver al inicio (Loop infinito)
        } else {
            moverCarrusel(currentIndex + 1);
        }
    });

    // Botón Anterior
    btnPrev.addEventListener('click', () => {
        if (currentIndex === 0) {
            moverCarrusel(slides.length - 1); // Ir al final
        } else {
            moverCarrusel(currentIndex - 1);
        }
    });

    // Movimiento Automático (cada 5 segundos)
    setInterval(() => {
        if (currentIndex === slides.length - 1) {
            moverCarrusel(0);
        } else {
            moverCarrusel(currentIndex + 1);
        }
    }, 5000);
});