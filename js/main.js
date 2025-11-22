/* ==========================================================================
   MAIN.JS - Lógica Principal de Gyulpetale (Versión Completa)
   ========================================================================== */

// --- 1. VARIABLES GLOBALES Y CONFIGURACIÓN INICIAL ---
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Referencias al DOM (Elementos HTML comunes)
const sidebar = document.getElementById('sidebar-carrito');
const overlay = document.getElementById('overlay');
const contadorCarrito = document.getElementById('contador-carrito');
const itemsCarritoContainer = document.getElementById('carrito-items');
const totalCarritoElemento = document.getElementById('carrito-total');


// --- 3. LÓGICA DEL CARRITO DE COMPRAS (Core) ---

// Función para abrir/cerrar el Sidebar Lateral
function toggleCarrito(abrir = null) {
    if (!sidebar || !overlay) return;

    if (abrir === true) {
        sidebar.classList.add('mostrar');
        overlay.classList.add('mostrar');
    } else if (abrir === false) {
        sidebar.classList.remove('mostrar');
        overlay.classList.remove('mostrar');
    } else {
        sidebar.classList.toggle('mostrar');
        overlay.classList.toggle('mostrar');
    }
}

// Agregar producto al array y guardar
function agregarAlCarrito(nombre, precio, imagen) {
    carrito.push({ nombre, precio, imagen });
    guardarYActualizar();
    toggleCarrito(true); // Abre el carrito automáticamente para confirmar
}

// Eliminar producto por su índice
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarYActualizar();
}

// Guardar en LocalStorage y refrescar visuales
function guardarYActualizar() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    renderizarCarritoLateral();
    
    // Si estamos en la página "carrito.html", actualizamos esa tabla también
    if (typeof renderizarPaginaCarrito === 'function') {
        renderizarPaginaCarrito();
    }
}

// Actualizar el numerito rojo
function actualizarContador() {
    if (contadorCarrito) contadorCarrito.innerText = carrito.length;
}

// Dibujar los productos dentro del Sidebar Lateral
function renderizarCarritoLateral() {
    if (!itemsCarritoContainer) return;

    itemsCarritoContainer.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        itemsCarritoContainer.innerHTML = '<p style="text-align:center; margin-top:20px; color:#777;">Tu carrito está vacío 🍃</p>';
    } else {
        carrito.forEach((item, index) => {
            total += item.precio;
            itemsCarritoContainer.innerHTML += `
                <div class="item-carrito">
                    <div class="item-info" style="display:flex; align-items:center; gap:10px;">
                        <img src="${item.imagen}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;">
                        <div>
                            <h4>${item.nombre}</h4>
                            <p>$${item.precio.toFixed(2)}</p>
                        </div>
                    </div>
                    <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });
    }

    if (totalCarritoElemento) {
        totalCarritoElemento.innerText = `$${total.toFixed(2)}`;
    }
}


// --- 4. RENDERIZADO DE PRODUCTOS (Generación de HTML) ---

// Genera el HTML de una tarjeta con lógica de ofertas
function crearTarjetaHTML(producto) {
    let precioHTML = '';

    // Lógica: Si existe precioOriginal y es mayor al precio actual
    if (producto.precioOriginal && producto.precioOriginal > producto.precio) {
        precioHTML = `
            <span class="precio-original">$${producto.precioOriginal.toFixed(2)}</span>
            <span class="precio-oferta">$${producto.precio.toFixed(2)}</span>
        `;
    } else {
        precioHTML = `<span class="precio">$${producto.precio.toFixed(2)}</span>`;
    }

    return `
        <div class="producto-card" data-categoria="${producto.categoria}">
            <div class="img-container">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="overlay">
                    <a href="producto.html?id=${producto.id}" class="btn-lupa"><i class="fas fa-search-plus"></i></a>
                </div>
            </div>
            <h3>${producto.nombre}</h3>
            <div class="precios-container">${precioHTML}</div>
            <button class="btn-agregar" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio}, '${producto.imagen}')">Añadir al Carrito</button>
        </div>
    `;
}


// --- 5. DETALLE DE PRODUCTO (Zoom y Carga de Datos) ---

// Función Zoom (Lupa)
function hacerZoom(e) {
    const imgContainer = document.getElementById('img-container');
    const img = document.getElementById('imagen-principal');
    if(!imgContainer || !img) return;

    const x = e.clientX - imgContainer.offsetLeft;
    const y = e.clientY - imgContainer.offsetTop;
    const xPercent = (x / imgContainer.offsetWidth) * 100;
    const yPercent = (y / imgContainer.offsetHeight) * 100;

    img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    img.style.transform = "scale(2.5)";
}

function resetZoom() {
    const img = document.getElementById('imagen-principal');
    if(img) img.style.transform = "scale(1)";
}

// Cargar datos en la página producto.html
function cargarDetalleProducto() {
    const nombreProdHTML = document.getElementById('nombre-producto');
    
    // Si no existe este elemento, no estamos en la página de detalle
    if (!nombreProdHTML) return;

    // Obtener ID de la URL
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));

    

    // Verificar si db.js cargó
    if (typeof productos === 'undefined') {
        console.error("Error: No se encontró la base de datos.");
        return;
    }

    const producto = productos.find(p => p.id === id);

    if (producto) {
        // Llenar datos
        nombreProdHTML.innerText = producto.nombre;
        document.getElementById('imagen-principal').src = producto.imagen;
        
        // Descripción (si existe el elemento)
        const descHTML = document.getElementById('descripcion-producto');
        if(descHTML) descHTML.innerText = producto.descripcion;

        // Precios con oferta
        const precioDiv = document.getElementById('precio-producto');
        if (producto.precioOriginal && producto.precioOriginal > producto.precio) {
            precioDiv.innerHTML = `
                <span class="precio-original" style="font-size:1.2rem;">$${producto.precioOriginal.toFixed(2)}</span>
                <span class="precio-oferta" style="font-size:2rem;">$${producto.precio.toFixed(2)}</span>
            `;
        } else {
            precioDiv.innerText = `$${producto.precio.toFixed(2)}`;
        }
        
        // --- NUEVA LÓGICA DE CÁLCULO AUTOMÁTICO ---
        const inputCantidad = document.getElementById('cantidad');
        const spanTotalCalculado = document.getElementById('total-calculado');

        // Función interna para calcular
        const actualizarTotal = () => {
            let cantidad = parseInt(inputCantidad.value);
            if(cantidad < 1 || isNaN(cantidad)) cantidad = 1; // Evitar negativos
            
            let total = cantidad * producto.precio;
            
            // Actualizamos el texto del nuevo h3 que creamos
            if(spanTotalCalculado) {
                spanTotalCalculado.innerText = `$${total.toFixed(2)}`;
            }
        };

        // Ejecutar una vez al inicio
        actualizarTotal();

        // Ejecutar cada vez que el usuario escriba o cambie el número
        inputCantidad.oninput = actualizarTotal;
        inputCantidad.onchange = actualizarTotal;

        // Configurar botón "Añadir al Carrito" de esta página
        const btnAgregarDetalle = document.querySelector('.btn-agregar'); // El primer btn-agregar que encuentre
        if(btnAgregarDetalle) {
            btnAgregarDetalle.onclick = function() {
                const cantidadInput = document.getElementById('cantidad');
                let cantidad = cantidadInput ? parseInt(cantidadInput.value) : 1;
                
                // Agregar N veces según la cantidad
                for(let i=0; i<cantidad; i++) {
                    agregarAlCarrito(producto.nombre, producto.precio, producto.imagen);
                }
            };
        }
        // --- LÓGICA DE REDES SOCIALES (NUEVO) ---
        
        // 1. Preparamos los datos para compartir
        // encodeURIComponent sirve para convertir espacios y símbolos en formato web
        const urlActual = encodeURIComponent(window.location.href); 
        const textoCompartir = encodeURIComponent(`¡Mira este hermoso ramo "${producto.nombre}" que encontré en Gyulpetale! 🌸`);

        // 2. Configurar botón Facebook
        const btnFb = document.getElementById('share-fb');
        if (btnFb) {
            btnFb.onclick = function() {
                // Abre la ventana de publicar de Facebook
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${urlActual}`, 'facebook-share-dialog', 'width=800,height=600');
            };
        }

        // 3. Configurar botón X (Twitter) - REEMPLAZO DE WHATSAPP
        const btnX = document.getElementById('share-x');
        if (btnX) {
            btnX.onclick = function() {
                // Generamos el enlace para twittear
                // Nota: Aunque se llame X, la API técnica sigue respondiendo a twitter.com
                window.open(`https://x.com/intent/tweet?text=${textoCompartir}&url=${urlActual}`, 'twitter-share-dialog', 'width=600,height=400');
            };
        }

        // 4. Configurar botón Instagram
        // NOTA: Instagram NO permite crear publicaciones desde una web externa por seguridad.
        // Lo estándar es dirigir al perfil de la tienda.
        const btnIg = document.getElementById('share-ig');
        if (btnIg) {
            btnIg.onclick = function() {
                window.open('https://www.instagram.com/gyulpetale_oficial', '_blank'); // Pon aquí tu usuario real
            };
        }

    } else {
        nombreProdHTML.innerText = "Producto no encontrado";
    }
}


// --- 6. UTILIDADES (Buscador y Pago) ---

// --- BUSCADOR INTELIGENTE ---

function buscarProducto() {
    const input = document.getElementById('buscador');
    const contenedorResultados = document.getElementById('resultados-busqueda');
    const texto = input.value.toLowerCase().trim();

    // 1. Si no hay texto, ocultamos la lista y salimos
    if (texto.length === 0) {
        contenedorResultados.style.display = 'none';
        contenedorResultados.innerHTML = '';
        return;
    }

    // 2. Filtrar productos de la base de datos (db.js)
    // Verificamos si existe la variable productos antes de filtrar
    if (typeof productos !== 'undefined') {
        const encontrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));

        // 3. Generar el HTML de la lista
        if (encontrados.length > 0) {
            contenedorResultados.style.display = 'block';
            contenedorResultados.innerHTML = ''; // Limpiar resultados anteriores

            encontrados.forEach(p => {
                // Creamos el enlace directo al producto
                const itemHTML = `
                    <a href="producto.html?id=${p.id}" class="item-busqueda">
                        <img src="${p.imagen}" alt="${p.nombre}">
                        <div class="info-busqueda">
                            <h4>${p.nombre}</h4>
                            <span>$${p.precio.toFixed(2)}</span>
                        </div>
                    </a>
                `;
                contenedorResultados.innerHTML += itemHTML;
            });
        } else {
            // Si escribe algo raro y no hay coincidencias
            contenedorResultados.style.display = 'block';
            contenedorResultados.innerHTML = `
                <div style="padding:15px; text-align:center; color:#777;">
                    No encontramos flores con ese nombre 🍃
                </div>`;
        }
    }
}

// Extra: Cerrar el buscador si hago clic fuera de él
document.addEventListener('click', function(event) {
    const contenedorResultados = document.getElementById('resultados-busqueda');
    const input = document.getElementById('buscador');
    
    if (contenedorResultados && input) {
        // Si el clic NO fue en el input NI en los resultados
        if (!input.contains(event.target) && !contenedorResultados.contains(event.target)) {
            contenedorResultados.style.display = 'none';
        }
    }
});

// Función para redirigir a la pasarela de pago profesional
function pagarPaypal() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío 🍃");
        return;
    }
    // Redirige a la nueva página de pago
    window.location.href = 'pago.html';
}


// --- 7. INICIALIZACIÓN MAESTRA (OPTIMIZADA) ---

// Cambiamos window.onload por DOMContentLoaded para que no espere a las imágenes
document.addEventListener('DOMContentLoaded', () => {
    
    // A. Inicializar UI Básica
    actualizarContador();
    // Renderizamos el carrito lateral solo si existe el contenedor
    if(document.getElementById('carrito-items')) renderizarCarritoLateral();
    
    const iconoCarrito = document.querySelector('.carrito-icono');
    if (iconoCarrito) iconoCarrito.onclick = function() { toggleCarrito(); };

    // --- FUNCIÓN HELPER PARA RENDERIZADO RÁPIDO ---
    // Esta función evita que el navegador recalcule el diseño por cada producto
    const renderizarListaRapida = (contenedorId, listaProductos) => {
        const contenedor = document.getElementById(contenedorId);
        if (contenedor && listaProductos.length > 0) {
            // Creamos todo el HTML en una variable de texto primero
            let htmlAcumulado = ''; 
            listaProductos.forEach(p => {
                htmlAcumulado += crearTarjetaHTML(p);
            });
            // Inyectamos todo de golpe (mucho más rápido)
            contenedor.innerHTML = htmlAcumulado;
        } else if (contenedor && listaProductos.length === 0) {
            contenedor.innerHTML = '<p style="grid-column:1/-1; text-align:center;">No se encontraron productos.</p>';
        }
    };

    // B. Detectar en qué página estamos y renderizar

    // 1. HOME: Productos Destacados
    if (typeof productos !== 'undefined') {
        const destacados = productos.filter(p => p.esDestacado);
        renderizarListaRapida('lista-destacados', destacados);
    }

    // 2. HOME: Productos Nuevos
    if (typeof productos !== 'undefined') {
        const nuevos = productos.filter(p => p.esNuevo);
        renderizarListaRapida('lista-nuevos', nuevos);
    }

    // 3. DETALLE: Cargar info del producto único
    // Esta función es ligera, la dejamos igual
    cargarDetalleProducto();

    // 4. OFERTAS: Productos con descuento
    if (typeof productos !== 'undefined') {
        const ofertas = productos.filter(p => p.precioOriginal && p.precioOriginal > p.precio);
        renderizarListaRapida('lista-ofertas', ofertas);
    }

    // 5. PÁGINA DE CATEGORÍA
    const contenedorCategoria = document.getElementById('lista-categoria');
    const tituloCategoria = document.getElementById('titulo-categoria');

    if (contenedorCategoria && typeof productos !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const tipo = params.get('tipo');

        if (tipo) {
            tituloCategoria.innerText = `Colección: ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;
            const filtrados = productos.filter(p => p.categoria === tipo);
            renderizarListaRapida('lista-categoria', filtrados);
        } else {
            // Si no hay filtro, mostrar todo
            if(tituloCategoria) tituloCategoria.innerText = "Todas las Flores";
            renderizarListaRapida('lista-categoria', productos);
        }
    }
});
    