/* =========================================
   PAGO.JS - Lógica de Pasarela y PayPal
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // 1. OBTENER ELEMENTOS DEL DOM
    const listaResumen = document.getElementById('lista-resumen-pago');
    const totalDisplay = document.getElementById('total-pago-display');
    const btnTarjeta = document.getElementById('btn-tarjeta');
    const btnPaypal = document.getElementById('btn-paypal');
    const formTarjeta = document.getElementById('form-tarjeta');
    const seccionPaypal = document.getElementById('seccion-paypal');
    const modalExito = document.getElementById('success-modal');

    // 2. CARGAR EL CARRITO
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let totalMonto = 0;

    if (carrito.length === 0) {
        window.location.href = 'index.html'; // Si está vacío, expulsar
        return;
    }

    // Renderizar resumen
    carrito.forEach(item => {
        totalMonto += item.precio;
        listaResumen.innerHTML += `
            <div class="item-resumen">
                <div class="info" style="display:flex; align-items:center; gap:10px;">
                    <img src="${item.imagen}" width="40" style="border-radius:4px;">
                    <span>${item.nombre}</span>
                </div>
                <span>$${item.precio.toFixed(2)}</span>
            </div>`;
    });
    totalDisplay.innerText = `$${totalMonto.toFixed(2)}`;

    // 3. LÓGICA DE PESTAÑAS (Tarjeta vs PayPal)
    btnTarjeta.addEventListener('click', () => {
        formTarjeta.classList.remove('oculto');
        seccionPaypal.classList.add('oculto');
        btnTarjeta.classList.add('activo');
        btnPaypal.classList.remove('activo');
    });

    btnPaypal.addEventListener('click', () => {
        formTarjeta.classList.add('oculto');
        seccionPaypal.classList.remove('oculto');
        btnTarjeta.classList.remove('activo');
        btnPaypal.classList.add('activo');
    });

    // 4. INICIALIZAR PAYPAL
    if (window.paypal) {
        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: { value: totalMonto.toFixed(2) }
                    }]
                });
            },
            onApprove: (data, actions) => {
                return actions.order.capture().then(details => {
                    console.log('Pago exitoso:', details);
                    mostrarModalExito();
                });
            },
            onError: (err) => {
                console.error('Error PayPal:', err);
                alert("Hubo un problema conectando con PayPal.");
            }
        }).render('#paypal-button-container');
    } else {
        console.error("El SDK de PayPal no cargó. Revisa tu conexión.");
        document.getElementById('paypal-button-container').innerHTML = "<p style='color:red;'>Error al cargar PayPal</p>";
    }

    // 5. EVENTO DE PAGO CON TARJETA (Simulado)
    const form = document.getElementById('form-tarjeta');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            mostrarModalExito();
        });
    }

    // FUNCIÓN AUXILIAR
    function mostrarModalExito() {
        modalExito.style.display = 'flex';
        localStorage.removeItem('carrito'); // Limpiar carrito
    }
});