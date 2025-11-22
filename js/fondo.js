/* =========================================
   FONDO.JS - Lógica para generar pétalos
   ========================================= */

function iniciarFondoAnimado() {
    // Verificar si ya existe para no duplicar
    if (document.getElementById('fondo-animado')) return;

    const contenedor = document.createElement('div');
    contenedor.id = 'fondo-animado';
    document.body.prepend(contenedor);
    
    // Cantidad de pétalos (ajustable)
    const numeroPetalos = 25; 
    
    for (let i = 0; i < numeroPetalos; i++) {
        crearPetalo(contenedor);
    }
}

function crearPetalo(contenedor) {
    const petalo = document.createElement('div');
    petalo.classList.add('petalo');
    
    // Aleatoriedad
    const left = Math.random() * 100;
    const size = Math.random() * 15 + 10;
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 10;

    petalo.style.left = `${left}%`;
    petalo.style.width = `${size}px`;
    petalo.style.height = `${size}px`;
    petalo.style.animationDuration = `${duration}s`;
    petalo.style.animationDelay = `${delay}s`;

    contenedor.appendChild(petalo);
}

// --- AUTO-EJECUCIÓN ---
// Esto hace que el fondo inicie solo al cargar la página
document.addEventListener('DOMContentLoaded', iniciarFondoAnimado);